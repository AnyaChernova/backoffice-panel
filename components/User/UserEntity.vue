<template>
	<DBEntity
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:link="`/users/${entity.id}`"
		:caption="`Пользователь #${ entity.id }`"
		:title="entity.name"
		:active="!entity.is_disabled"
	>

		<template #actions>
			<DButton outline @click="onClickUpdate">Изменить</DButton>
			<DButton outline success @click="onClickEnable" :loading="disableLoading" v-if="entity.is_disabled">
				Разблокировать
			</DButton>
			<DButton outline danger @click="onClickDisable" :loading="disableLoading" v-if="!entity.is_disabled">
				Заблокировать
			</DButton>
			<DButton outline danger @click="onClickDelete" :loading="deleteLoading">Удалить</DButton>
		</template>

		<UserInfo :user="entity" v-if="activeTab === 'Информация'"/>
		<UserProjectBrowserSmall :user="entity" v-if="activeTab === 'Проекты'"/>

	</DBEntity>
</template>

<script>
import UserInfo from '@/components/User/UserInfo';
import UserDemo from '@/components/User/UserDemo';
import BaseEntity from '@/components/Base/BaseEntity';
import UserProjectBrowserSmall from "./UserProjectBrowserSmall";

export default {
	name: 'UserEntity',
	extends: BaseEntity,
	props: {},
	components: {
		UserProjectBrowserSmall,
		UserDemo,
		UserInfo
	},
	data() {
		return {
			tabs: ['Информация', 'Проекты'],
			activeTab: 'Информация',
			entityResource: this.$api.user,
			entityModalForm: 'ModalFormUser',
			disableLoading: false,
			deleteLoading: false,
		};
	},
	computed: {},
	methods: {
		async onClickEnable() {
			await this.runAction({
				action: 'enable',
				confirmTitle: 'Снятие блокировки пользователя',
				confirmSubTitle: 'Вы уверены, что хотите разблокировать пользователя?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
			});
		},

		async onClickDisable() {
			await this.runAction({
				action: 'disable',
				confirmTitle: 'Блокировка пользователя',
				confirmSubTitle: 'Вы уверены, что хотите заблокировать пользователя?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
			});
		},
		async onClickDelete() {
			const confirm = await this.$dModal.load('ModalConfirm', {
				lock: true,
				title: 'Удаление пользователя',
				subTitle: 'Вы уверены, что хотите удалить пользователя?'
			});
			if (!confirm) return;
			await this.$api.user.delete({id: this.entity.id}).then(() => {
				this.$emit('delete');
			}).catch(({response}) => {
				console.log(response)
				if (response?.data?.error) {
					this.$dNotice.error(response.data.error);
				} else {
					this.$dNotice.error('Ошибка удаления');
				}
			});
		},
	},
	mounted() {},
};
</script>

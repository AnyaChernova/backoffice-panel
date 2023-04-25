<template>
	<DBEntity
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:link="`/language/${ entity.id }`"
		:caption="`Язык #${ entity.id }`"
		:title="entity.name"
		:active="!entity.is_disabled"
	>

		<template #actions>
			<DButton outline @click="onClickUpdate">Изменить</DButton>
			<DButton outline success @click="onClickEnable" :loading="disableLoading" v-if="entity.is_disabled">
				Разблокировать
			</DButton>
			<DButton outline accent @click="onClickDisable" :loading="disableLoading" v-else>Заблокировать</DButton>
			<DButton outline danger @click="onClickDelete" :loading="deleteLoading">Удалить</DButton>
		</template>

		<LanguageInfo :language="entity" v-if="activeTab === 'Информация'"/>

	</DBEntity>
</template>

<script>
import LanguageInfo from '@/components/Language/LanguageInfo';
import BaseEntity from '@/components/Base/BaseEntity';

export default {
	name: 'LanguageEntity',
	extends: BaseEntity,
	props: {},
	components: {
		LanguageInfo
	},
	data() {
		return {
			entityResource: this.$api.language,
			entityModalForm: 'ModalFormLanguage',
			tabs: ['Информация'],
			activeTab: 'Информация',
			disableLoading: false,
			deleteLoading: false,
		};
	},
	computed: {},
	methods: {
		onClickDisable() {
			this.runAction({
				action: 'disable',
				confirmTitle: 'Блокировка',
				confirmSubTitle: 'Вы уверены, что хотите заблокировать ENTITY?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
			});
		},

		onClickEnable() {
			this.runAction({
				action: 'enable',
				confirmTitle: 'Разблокировка',
				confirmSubTitle: 'Вы уверены, что хотите разблокировать ENTITY?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
			});
		},

		onClickDelete() {
			this.runAction({
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить ENTITY?',
				errorTitle: 'Ошибка удаления',
				loading: 'deleteLoading',
			});
		},
	},
	mounted() {},
};
</script>

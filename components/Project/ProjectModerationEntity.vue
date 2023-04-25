<template>
	<DBEntity
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:link="`/project/${ entity.id }`"
		:caption="`Проект #${ entity.id }`"
		:title="entity.name"
		:status="entity.public_moderation_state"
	>

		<template #actions>
			<template v-if="isNeedModeration">
				<DButton outline success @click="onClickAccept" :loading="acceptLoading">Принять</DButton>
				<DButton outline accent @click="onClickDecline" :loading="acceptLoading">Отклонить</DButton>
			</template>
		</template>

		<ProjectInfo :project="entity" v-if="activeTab === 'Информация'"/>
	</DBEntity>
</template>

<script>
import ProjectInfo from '@/components/Project/ProjectInfo';
import BaseEntity from '@/components/Base/BaseEntity';
export default {
	name: 'ProjectModerationEntity',
	extends: BaseEntity,
	props: {},
	components: {
		ProjectInfo
	},
	data() {
		return {
			entityResource: this.$api.project,
			entityModalForm: 'ModalFormProject',
			tabs: [
				'Информация',
			],
			activeTab: 'Информация',
			acceptLoading: false,
		};
	},
	computed: {
		isNeedModeration() {
			return this.entity.public_moderation_state_id === 'PENDING';
		}
	},
	methods: {
		onClickAccept() {
			this.runAction({
				action: 'accept',
				confirmTitle: 'Модерация',
				confirmSubTitle: 'Вы уверены, что хотите принять проект?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
			});
		},

		onClickDecline() {
			this.runAction({
				action: 'decline',
				confirmTitle: 'Модерация',
				confirmSubTitle: 'Вы уверены, что хотите отклонить проект?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
				messageField: 'public_moderation_message',
				messageTitle: 'Комментарий',
			});
		},
	},
	mounted() {
	},
};
</script>

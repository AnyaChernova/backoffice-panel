<template>
	<DBEntity
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:link="`/projects/${ entity.id }`"
		:caption="`Проект #${ entity.id }`"
		:title="entity.name"
		:status="entity.access_mode_id === 'PUBLIC' ? entity.public_moderation_state : ''"
	>

		<template #actions>
			<DButton outline @click="onClickUpdate">Изменить</DButton>
			<d-button outline success @click="onClickEnable" :loading="disableLoading" v-if="entity.is_disabled">
				Разблокировать
			</d-button>
			<d-button outline accent @click="onClickDisable" :loading="disableLoading" v-else>Заблокировать</d-button>
			<d-button outline danger @click="onClickDelete" :loading="deleteLoading">Удалить</d-button>
		</template>

		<ProjectInfo :project="entity" v-if="activeTab === 'Инфо'"/>
		<ProjectGlossaryBrowserSmall :project="entity" v-if="activeTab === 'Глоссарий'"/>
		<ProjectTextBrowserSmall :project="entity" v-if="activeTab === 'Тексты проекта'"/>
		<ProjectFileBrowserSmall :project="entity" v-if="activeTab === 'Файлы проекта'"/>
		<ProjectMediaBrowserSmall :project="entity" v-if="activeTab === 'Медиа проекта'"/>
		<ProjectLinkBrowserSmall :project="entity" v-if="activeTab === 'Ссылки проекта'"/>
		<!-- <template v-if="activeTab === 'Дискуссии'">
			<ProjectDiscussionMessageBrowserSmall :discussion="discussion" @clickBack="onClickBack" v-if="discussion"/>
			<ProjectDiscussionBrowserSmall :project="entity" @clickRow="onClickRow" v-else/>
		</template> -->
		<ProjectUserBrowserSmall :project="entity" v-if="activeTab === 'Пользователи'"/>
		<ProjectEventBrowserSmall :project="entity" v-if="activeTab === 'Журнал'"/>
	</DBEntity>
</template>

<script>
import ProjectInfo from '@/components/Project/ProjectInfo';
import BaseEntity from '@/components/Base/BaseEntity';
import ProjectTextBrowserSmall from "@/components/Project/ProjectText/ProjectTextBrowserSmall.vue";
import ProjectFileBrowserSmall from "@/components/Project/ProjectFile/ProjectFileBrowserSmall.vue";
import ProjectMediaBrowserSmall from "@/components/Project/ProjectMedia/ProjectMediaBrowserSmall.vue";
import ProjectLinkBrowserSmall from "@/components/Project/ProjectLink/ProjectLinkBrowserSmall.vue";
import ProjectGlossaryBrowserSmall from "@/components/Project/ProjectGlossary/ProjectGlossaryBrowserSmall.vue";
// import ProjectDiscussionBrowserSmall from "@/components/Project/ProjectDiscussion/ProjectDiscussionBrowserSmall";
import ProjectEventBrowserSmall from "@/components/Project/ProjectEvent/ProjectEventBrowserSmall";
import ProjectUserBrowserSmall from "@/components/Project/ProjectUser/ProjectUserBrowserSmall";
// import ProjectDiscussionMessageBrowserSmall from "@/components/Project/ProjectDiscussion/ProjectDiscussionMessageBrowserSmall";

export default {
	name: 'ProjectEntity',
	extends: BaseEntity,
	props: {},
	components: {
		// ProjectDiscussionMessageBrowserSmall,
		ProjectUserBrowserSmall,
		ProjectEventBrowserSmall,
		// ProjectDiscussionBrowserSmall,
		ProjectGlossaryBrowserSmall,
		ProjectLinkBrowserSmall,
		ProjectMediaBrowserSmall,
		ProjectFileBrowserSmall,
		ProjectTextBrowserSmall,
		ProjectInfo
	},
	data() {
		return {
			entityResource: this.$api.project,
			entityModalForm: 'ModalFormProject',
			tabs: [
				'Инфо',
				[
					'Материалы',
					'Глоссарий',
					'Тексты проекта',
					'Файлы проекта',
					'Медиа проекта',
					'Ссылки проекта'
				],
				// 'Дискуссии',
				'Пользователи',
				'Журнал',
			],
			activeTab: 'Инфо',
			// discussion: null,
			deleteLoading: false,
			disableLoading: false,
		};
	},
	computed: {},
	methods: {
		// onClickRow(discussion) {
		// 	this.discussion = discussion;
		// },
		// onClickBack() {
		// 	this.discussion = null;
		// },
		onClickDelete() {
			this.runAction({
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Проект будет удален вместе со всеми материалами. Вы уверены?',
				errorTitle: 'Ошибка удаления',
				loading: 'deleteLoading',
			});
		},
		onClickDisable() {
			this.runAction({
				action: 'disable',
				confirmTitle: 'Блокировка проекта',
				confirmSubTitle: 'Вы уверены, что хотите заблокировать проект?',
				errorTitle: 'Ошибка смены статуса',
			});
		},

		onClickEnable() {
			this.runAction({
				action: 'enable',
				confirmTitle: 'Разблокировка проекта',
				confirmSubTitle: 'Вы уверены, что хотите разблокировать проект?',
				errorTitle: 'Ошибка смены статуса',
			});
		},
	},
	mounted() {
	},
};
</script>

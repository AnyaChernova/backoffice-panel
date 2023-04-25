<template>
	<DBBrowserSmall
		api-url="/projects/users/browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Пользователи проекта</div>
		</template>

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th>Пользователь</th>
			<th class="text-right">Тип связи</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>
				<UserDemo :user="item.user"/>
			</td>
			<td class="text-right">
				<DLabel>{{ item.type.title }}</DLabel>
			</td>
			<UiActionMenu table-cell>
				<DListItem @click="onUpdateClick(item)">Изменить</DListItem>
			</UiActionMenu>
		</template>

	</DBBrowserSmall>
</template>

<script>
import BaseBrowserSmall from "@/components/Base/BaseBrowserSmall.vue";
import UserDemo from "@/components/User/UserDemo.vue";
import UiActionMenu from "@/components/Ui/UiActionMenu";

export default {
	name: "ProjectUserBrowserSmall",
	extends: BaseBrowserSmall,
	props: {
		project: {
			type: Object,
			default: null,
		}
	},
	components: {UiActionMenu, UserDemo},
	data() {
		return {
			entityModalForm: 'ModalFormProjectUser',
			entityModalFormParams: {
				project: this.project,
			},
			entityResource: this.$api.projectUser,
			filters: {
				project_id: this.project?.id,
			},
		};
	},
	computed: {},
	methods: {
		async onUpdateClick(user) {
			const res = await this.$dModal.load('ModalFormProjectUser', {
				projectUser: user,
				projectUsers: this.$refs.browser.apiData.items
			});

			if (res) this.fetchData();
		}
	},
	created() {
	},
	mounted() {
	},
}
</script>

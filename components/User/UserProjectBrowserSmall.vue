<template>
	<DBBrowserSmall
		class="fz-12"
		data-class="--small"
		api-url="/projects/browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Проекты пользователя</div>
		</template>
		<template #headerRight>
			<UiButtonPlus simple @click="onClickCreate">Добавить</UiButtonPlus>
		</template>

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th>Название</th>
			<th>Язык</th>
			<th>Статус</th>
			<th>Тип связи</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>{{ item.name }}</td>
			<td>{{ item.language.title }}</td>
			<td>
				<DBStatusLabel class="--small ws-pre-wrap" :status="item.public_moderation_state"/>
			</td>
			<td>{{ getUserType(item) }}</td>
			<td class="text-right">
				<DBMenuDropdown>
					<DBMenuItem :to="`/projects/${item.id}`">Перейти в проект</DBMenuItem>
					<DBMenuItem @click="onClickUpdate(item)">Изменить</DBMenuItem>
					<DBMenuItem color="danger" @click="onClickDelete(item)">Удалить</DBMenuItem>
				</DBMenuDropdown>
			</td>
		</template>

	</DBBrowserSmall>
</template>

<script>
import BaseBrowserSmall from "~/components/Base/BaseBrowserSmall.vue";
import UserDemo from "~/components/User/UserDemo.vue";
export default {
	name: "UserProjectBrowserSmall",
	extends: BaseBrowserSmall,
	props: {
		user: {
			type: Object,
			default: null,
		}
	},
	components: {UserDemo},
	data() {
		return {
			entityModalForm: 'ModalFormProject',
			entityModalFormParams: {
				user: this.user,
			},
			entityResource: this.$api.project,
			filters: {
				'projects_users.user_id': this.user?.id,
			},
		};
	},
	computed: {},
	methods: {
		getUserType({project_users}) {
			const user = project_users.find(({user_id}) => user_id === this.user.id);
			return user?.type?.title;
		},
		onClickDelete(item) {
			this.runAction({
				entity: item,
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить проект пользователя?',
				errorTitle: 'Ошибка удаления',
				loading: item.id,
			})
		},
	},
	created() {},
	mounted() {},
}
</script>

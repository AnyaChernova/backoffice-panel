<template>
	<DBBrowserSmall
		api-url="/projects/glossary/browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Глоссарий проекта</div>
		</template>
		<template #headerRight>
			<UiButtonPlus simple @click="onClickCreate">Добавить</UiButtonPlus>
		</template>

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th>Слово</th>
			<th>Перевод</th>
			<th>Автор</th>
			<th class="text-right">Дата создания</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>{{ item.word }} ({{ item.source_language.title }})</td>
			<td>{{ item.definition }} ({{ item.destination_language.title }})</td>
			<td class="w-150">
				<UserDemo x-small :user="item.user"/>
			</td>
			<td class="text-right">
				{{ $formatDate(item.created_at) }}
			</td>
			<td class="text-right">
				<DBMenuDropdown>
					<DBMenuItem @click="onClickUpdate(item)">Редактировать</DBMenuItem>
					<DBMenuItem color="danger" @click="onClickDelete(item)">Удалить</DBMenuItem>
				</DBMenuDropdown>
			</td>
		</template>

	</DBBrowserSmall>
</template>

<script>
import BaseBrowserSmall from "@/components/Base/BaseBrowserSmall.vue";
import UserDemo from "@/components/User/UserDemo.vue";
export default {
	name: "ProjectGlossaryBrowserSmall",
	extends: BaseBrowserSmall,
	props: {
		project: {
			type: Object,
			default: null,
		}
	},
	components: {UserDemo},
	data() {
		return {
			entityModalForm: 'ModalFormProjectGlossary',
			entityModalFormParams: {
				project: this.project,
			},
			entityResource: this.$api.projectGlossary,
			filters: {
				project_id: this.project?.id,
			},
		};
	},
	computed: {},
	methods: {
		onClickDelete(item) {
			this.runAction({
				entity: item,
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить слово?',
				errorTitle: 'Ошибка удаления',
				loading: item.id,
			})
		},
	},
	created() {},
	mounted() {},
}
</script>

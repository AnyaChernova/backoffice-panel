<template>
	<DBBrowserSmall
		api-url="/projects/medias/browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Медиа проекта</div>
		</template>
<!--		<template #headerRight>-->
<!--			<UiButtonPlus simple @click="onClickCreate">Добавить</UiButtonPlus>-->
<!--		</template>-->

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th>Название</th>
			<th>Файл</th>
			<th>Тип</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>{{ item.name }}</td>
			<td>
				<a class="d-link" :href="item.file || item.url" target="_blank">Файл</a>
			</td>
			<td>{{ item.type.title }}</td>
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
	name: "ProjectMediaBrowserSmall",
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
			entityModalForm: 'ModalFormProjectMedia',
			entityModalFormParams: {
				project: this.project,
			},
			entityResource: this.$api.projectMedia,
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
				confirmSubTitle: 'Вы уверены, что хотите удалить медиа проекта?',
				errorTitle: 'Ошибка удаления',
				loading: item.id,
			})
		},
	},
	created() {},
	mounted() {},
}
</script>

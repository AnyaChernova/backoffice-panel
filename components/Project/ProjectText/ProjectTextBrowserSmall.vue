<template>
	<DBBrowserSmall
		api-url="/projects/texts/browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Тексты проекта</div>
		</template>
<!--		<template #headerRight>-->
<!--			<UiButtonPlus simple @click="onClickCreate">Добавить</UiButtonPlus>-->
<!--		</template>-->

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th>Название</th>
			<th>Автор</th>
			<th class="text-right">Дата создания</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td class="ws-no-wrap">{{ item.id }}</td>
			<td class="wb-break-word">{{ item.name }}</td>
			<td class="w-150">
				<UserDemo x-small :user="item.author"/>
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
	name: "ProjectTextBrowserSmall",
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
			entityModalForm: 'ModalFormProjectText',
			entityModalFormParams: {
				project: this.project,
			},
			entityResource: this.$api.projectText,
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
				confirmSubTitle: 'Вы уверены, что хотите удалить текст проекта?',
				errorTitle: 'Ошибка удаления',
				loading: item.id,
			})
		},
	},
	created() {},
	mounted() {},
}
</script>

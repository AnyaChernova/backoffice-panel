<template>
	<DBBrowserSmall
		api-url="/projects/subjects/browse"
		:api-params="apiParams"
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Тематики</div>
		</template>
		<template #headerRight>
			<UiButtonPlus small @click="onClickCreate">Добавить</UiButtonPlus>
		</template>

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th>Название</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>{{ item.name }}</td>
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
export default {
	name: "SubjectBrowserSmall",
	extends: BaseBrowserSmall,
	props: {},
	components: {},
	data() {
		return {
			entityModalForm: 'ModalFormSubject',
			entityResource: this.$api.subject,
		};
	},
	computed: {},
	methods: {
		onClickDelete(item) {
			this.runAction({
				entity: item,
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить тематику?',
				errorTitle: 'Ошибка удаления',
				loading: item.id,
			})
		},
	},
	created() {},
	mounted() {},
}
</script>

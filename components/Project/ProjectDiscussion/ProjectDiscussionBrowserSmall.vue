<template>
	<DBBrowserSmall
		api-url="/projects/discussions/browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Дискуссии проекта</div>
		</template>
<!--		<template #headerRight>-->
<!--			<UiButtonPlus simple @click="onClickCreate">Добавить</UiButtonPlus>-->
<!--		</template>-->

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th class="w-1px">Статус</th>
			<th>Тема</th>
			<th>Автор</th>
			<th class="text-right">Дата создания</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>
				<DIcon size="18" class="d-text-c-danger mr-s" name="lock" v-if="item.state_id === 'CLOSED'"/>
				<DIcon size="18" class="d-text-c-primary mr-s" name="message-square" v-if="item.state_id === 'ACTIVE'"/>
			</td>
			<td>{{ item.subject }}</td>
			<td class="w-150">
				<UserDemo x-small :user="item.user"/>
			</td>
			<td class="text-right">
				{{ $formatDate(item.created_at) }}
			</td>
			<td class="text-right">
				<DBMenuDropdown @click.stop.prevent="">
<!--					<DBMenuItem @click="onClickUpdate(item)">Редактировать</DBMenuItem>-->
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
	name: "ProjectDiscussionBrowserSmall",
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
			entityModalForm: 'ModalFormProjectDiscussion',
			entityModalFormParams: {
				project: this.project,
			},
			entityResource: this.$api.projectDiscussion,
			filters: {
				project_id: this.project?.id,
			},
		};
	},
	computed: {},
	methods: {
		onClickRow(item) {
			this.$emit('clickRow', item);
		},
		onClickDelete(item) {
			this.runAction({
				entity: item,
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить дискуссию?',
				errorTitle: 'Ошибка удаления',
				loading: item.id,
			})
		},
	},
	created() {},
	mounted() {},
}
</script>

<template>
	<DBBrowserSmall
		api-url="/projects/discussions/message-browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<DButton class="-ty-m" simple small @click="onClickBack">
				<DIcon class="mr-m -ml-s" name="arrow-left" size="16"/>
				назад
			</DButton>
			<div class="d-text-title-xs">Сообщения дискуссии {{ discussion.subject }}</div>
		</template>

		<template #dataHead>
			<th class="w-1px">ID</th>
			<th>Автор</th>
			<th>Сообщение</th>
			<th class="text-right">Дата создания</th>
			<th class="w-1px"></th>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td class="w-150">
				<UserDemo x-small :user="item.user"/>
			</td>
			<td>{{ item.message }}</td>
			<td class="text-right">
				{{ $formatDate(item.created_at) }}
			</td>
			<td class="text-right">
				<DBMenuDropdown>
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
	name: "ProjectDiscussionMessageBrowserSmall",
	extends: BaseBrowserSmall,
	props: {
		discussion: {
			type: Object,
			default: () => null,
		}
	},
	components: {UserDemo},
	data() {
		return {
			entityResource: this.$api.projectDiscussion,
			filters: {
				discussion_id: this.discussion.id,
			},
		};
	},
	computed: {},
	methods: {
		onClickBack() {
			this.$emit('clickBack');
		},
		onClickDelete(item) {
			this.runAction({
				entity: item,
				action: 'messageDelete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить сообщение?',
				errorTitle: 'Ошибка удаления',
				loading: item.id,
			})
		},
	},
	created() {},
	mounted() {},
}
</script>

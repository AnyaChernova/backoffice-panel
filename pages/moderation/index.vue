<template>
	<DBBrowser
		api-url="/projects/moderation-browse"
		:api-params="{filters: {public_moderation_state_id: ['PENDING']}}"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-s">Модерация публичных проектов</div>
		</template>

		<template #headerRight>
			<UiButtonPlus small @click="onClickCreate">Добавить</UiButtonPlus>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh>Статус</DBBrowserTh>
			<DBBrowserTh>Проект</DBBrowserTh>
			<DBBrowserTh>Владелец</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap" sort="created_at">Создан</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>
				<DBStatusLabel :status="item.public_moderation_state"/>
			</td>
			<td>
				<ProjectDemo :project="item"/>
			</td>
			<td>
				<UserDemo :user="item.user" v-if="item.user"/>
			</td>
			<td class="text-right">
				{{ $formatDate(item.created_at) }}
			</td>
		</template>

	</DBBrowser>
</template>

<script>

import BasePageBrowser from '@/components/Base/BasePageBrowser';
import ProjectModerationEntity from "@/components/Project/ProjectModerationEntity";
import UserDemo from "~/components/User/UserDemo.vue";
import ProjectDemo from "~/components/Project/ProjectDemo.vue";

export default {
	name: 'PageProjectModerationBrowser',
	extends: BasePageBrowser,
	entityComponent: ProjectModerationEntity,
	props: {},
	components: {ProjectDemo, UserDemo},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

<template>
	<DBBrowser
		api-url="/projects/browse"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-s">Проекты</div>
		</template>

		<template #headerRight>
			<UiButtonPlus small @click="onClickCreate">Добавить</UiButtonPlus>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh>Тип</DBBrowserTh>
			<DBBrowserTh>Проект</DBBrowserTh>
			<DBBrowserTh>Владелец</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap" sort="created_at">Создан</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>
				<DIcon class="d-text-c-success" name="lock" :title="item.access_mode.title" v-if="item.access_mode.id === 'PRIVATE'"/>
				<DIcon class="d-text-c-danger" name="eye" :title="item.access_mode.title" v-if="item.access_mode.id === 'PUBLIC'"/>
				<DIcon class="d-text-c-accent" name="users" :title="item.access_mode.title" v-if="item.access_mode.id === 'SHARED'"/>
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
import ProjectEntity from '@/components/Project/ProjectEntity';
import UserDemo from "~/components/User/UserDemo.vue";
import ProjectDemo from "~/components/Project/ProjectDemo.vue";

export default {
	name: 'PageProjectBrowser',
	extends: BasePageBrowser,
	entityComponent: ProjectEntity,
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

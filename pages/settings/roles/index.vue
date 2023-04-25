<template>
	<DBBrowser
		class="_PageManagers"
		api-url="/managers/roles/browse"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-s">Менеджеры</div>
		</template>

		<template #headerRight>
			<d-button small @click="onClickCreate">
				<d-icon class="mr-s -ml-xs" name="plus" size="15"/>
				Добавить
			</d-button>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh sort="name">Название</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>{{ item.name }}</td>
		</template>
	</DBBrowser>
</template>

<script>
import BasePageBrowser from '@/components/Base/BasePageBrowser';
import RoleEntity from '@/components/Role/RoleEntity';

export default {
	name: 'PageRoleBrowser',
	extends: BasePageBrowser,
	entityComponent: RoleEntity,
	props: {},
	components: {},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

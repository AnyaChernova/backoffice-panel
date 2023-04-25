<template>
	<DBBrowser
		class="_PageManagers"
		api-url="/managers/browse"
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
			<DBBrowserTh sort="name">Имя</DBBrowserTh>
			<DBBrowserTh>Email</DBBrowserTh>
			<DBBrowserTh>Роль</DBBrowserTh>
			<DBBrowserTh>Статус</DBBrowserTh>
			<DBBrowserTh sort="created_at">Дата создания</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>{{ item.name }}</td>
			<td>{{ item.email }}</td>
			<td>
				<d-label color="primary" v-if="item.role">{{ item.role.name }}</d-label>
			</td>
			<td>
				<DBStatusLabel :active="!item.is_disabled"/>
			</td>
			<td>
				{{ $formatDate(item.created_at) }}
			</td>
		</template>
	</DBBrowser>
</template>

<script>
import BasePageBrowser from '@/components/Base/BasePageBrowser';
import ManagerEntity from '@/components/Manager/ManagerEntity';

export default {
	name: 'PageManagerBrowser',
	extends: BasePageBrowser,
	entityComponent: ManagerEntity,
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

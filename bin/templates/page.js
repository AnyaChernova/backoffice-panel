export const templatePageIndex = (entityName) => (`<template>
	<DBBrowser
		api-url="/"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-s">${entityName}</div>
		</template>

		<template #headerRight>
			<UiButtonPlus small @click="onClickCreate">Добавить</UiButtonPlus>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap" sort="created_at">Дата создания</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td class="text-right">
				{{ $formatDate(item.created_at) }}
			</td>
		</template>

	</DBBrowser>
</template>

<script>

import BasePageBrowser from '@/components/Base/BasePageBrowser';
import ${entityName}Entity from '@/components/${entityName}/${entityName}Entity';

export default {
	name: 'Page${entityName}Browser',
	extends: BasePageBrowser,
	entityComponent: ${entityName}Entity,
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
`)

export const templatePageId = (entityName) => (`<script>
import BasePageEntity from '@/components/Base/BasePageEntity';
import ${entityName}Entity from '@/components/${entityName}/${entityName}Entity';

export default {
	name: 'Page${entityName}',
	extends: BasePageEntity,
	entityComponent: ${entityName}Entity,
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
`)

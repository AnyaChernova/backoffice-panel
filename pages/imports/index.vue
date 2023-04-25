<template>
	<DBBrowser
		api-url="/matrix/browse-import"
        @clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-flex align-center">
				<div class="d-text-title-s mr-m">История импортов</div>
			</div>
		</template>

		<template #dataHead>
			<DBBrowserTh>Тип задания</DBBrowserTh>
			<DBBrowserTh>Идентификатор матрицы</DBBrowserTh>
			<DBBrowserTh>Номер части файла</DBBrowserTh>
            <DBBrowserTh>Состояние загрузки</DBBrowserTh>
            <DBBrowserTh>Количество строк</DBBrowserTh>
            <DBBrowserTh>Количество обработанных строк</DBBrowserTh>
            <DBBrowserTh>Всего строк в файле</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
            <td>{{ item.type.title }}</td>
            <td>{{ item.ident.title }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.state.title }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.processed }}</td>
            <td>{{ item.total }}</td>
		</template>
	</DBBrowser>
</template>

<script>

import BasePageBrowser from '@/components/Base/BasePageBrowser';
import ImportEntity from '@/components/Import/ImportEntity';

export default {
	name: 'PageImportBrowser',
	extends: BasePageBrowser,
    entityComponent: ImportEntity,
	props: {},
	components: {},
	computed: {},
	methods: {},
	watch: {},
	mounted() {},
};
</script>

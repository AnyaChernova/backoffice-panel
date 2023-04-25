<template>
	<DBBrowser
		api-url="/matrix/browse"
		:api-params="{ident: matrixIdent}"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-flex align-center">
				<div class="d-text-title-s mr-m">Матрица</div>
				<DFormSelect
					small
					option-value="id"
					option-label="title"
					:options="matrixList"
					v-model="matrixId"
				/>
			</div>
		</template>

		<template #headerRight>
			<UiButtonPlus small class="mr-s" @click="onClickCreate">Добавить</UiButtonPlus>
			<DButton small accent :loading="exportLoading" class="mr-s" @click="onExportClick">Экспорт</DButton>
			<a class="visually-hidden" ref="exportFile" :href="file" download></a>
			<DButton small success @click="onImportClick">Импорт</DButton>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh>Слово</DBBrowserTh>
			<DBBrowserTh>Значение</DBBrowserTh>
			<DBBrowserTh>Тип</DBBrowserTh>
			
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>{{ item.source_value }}</td>
			<td>{{ item.destination_value }}</td>
			<td>{{ item.type.title }}</td>
		</template>

	</DBBrowser>
</template>

<script>

import BasePageBrowser from '@/components/Base/BasePageBrowser';
import MatrixEntity from '@/components/Matrix/MatrixEntity';
import {mapState} from "vuex";

export default {
	name: 'PageMatrixBrowser',
	extends: BasePageBrowser,
	entityComponent: MatrixEntity,
	props: {},
	components: {},
	data() {
		return {
			exportLoading: false,
			file: ''
		};
	},
	async asyncData({$api, error, store}) {
		try {
			const res = await $api.matrix.list();
			const matrixList = res.data;
			const matrixId = res.data[0].id;
			if (!store.state.matrixIdent) {
				store.commit('SET_MATRIX_IDENT', matrixId);
			}

			return {
				matrixList,
			}
		} catch(e) {
			error({
				message: 'Упс',
			})
		}
	},
	computed: {
		entityParams() {
			return {ident: this.matrixIdent};
		},
		...mapState({
			matrixIdent: state => state.matrixIdent,
		}),
		matrixId: {
			get() {
				return this.matrixIdent;
			},
			set(val) {
				this.$store.commit('SET_MATRIX_IDENT', val);
			}
		}
	},
	methods: {
		async onExportClick() {
			this.exportLoading = true;
			try {
				const res = await this.$api.matrix.export({ident: this.matrixIdent});
				this.file = res.path;
				this.$nextTick(() => {
					this.$refs.exportFile.click();
				});
			} catch(e) {
				console.error(e);
				this.$dNotice.error('Ошибка загрузки');
			}
			this.exportLoading = false;
		},
		async onImportClick() {
			const res = await this.$dModal.load('ModalFormMatrixImport');
			if (res) this.fetchData();
		}
	},
	watch: {},
	mounted() {},
};
</script>

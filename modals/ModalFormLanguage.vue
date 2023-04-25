<template>
	<DBModal :title="isCreate ? 'Создание' : 'Редактирование'">
		<DCells gap="xl">
			<DCell span="12">
				<DFormInput
					label="Название"
					v-model="formData.title"
					:errors="formError.fields.title"
				/>
			</DCell>
			<DCell span="12">
				<DFormInput
					label="Перевод"
					v-model="formData.title_en"
					:errors="formError.fields.title_en"
				/>
			</DCell>
			<DCell span="12">
				<DFormSelect
					label="Идентификатор"
					option-value="id"
					option-label="title"
					:options="formRelations.idents"
					v-model="formData.ident"
					:errors="formError.fields.ident"
				/>
			</DCell>
			<DCell span="12">
				<DFormCheck
					label="Исходный язык текста"
					:true-value="1"
					:false-value="0"
					v-model="formData.source" />
			</DCell>
		</DCells>
		<template #footer>
			<d-button class="mr-l" :loading="loading" @click="onClickSubmit">Сохранить</d-button>
			<d-button :disabled="loading" @click="onClickCancel" outline>Отмена</d-button>
		</template>
	</DBModal>
</template>

<script>
import BaseFormComponent from '@/components/Base/BaseFormComponent';

export default {
	name: 'ModalFormLanguage',
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.language,
			formData: {
				title: '',
				title_en: '',
				ident: '',
				source: 1,
			},
			formRelations: {
				idents: []
			},
		};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

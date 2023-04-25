<template>
	<DBModal :title="isCreate ? 'Создание матрицы' : 'Редактирование матрицы'">
		<DCells gap="xl">
			<DCell span="6">
				<DFormInput
					label="Исходное значение"
					v-model="formData.source_value"
					:errors="formError.fields.source_value"
				/>
			</DCell>
			<DCell span="6">
				<DFormInput
					label="Конечное значение"
					v-model="formData.destination_value"
					:errors="formError.fields.destination_value"
				/>
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
	name: 'ModalFormMatrix',
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.matrix,
			formParams: {
				ident: this.$store.state.matrixIdent
			},
			formData: {
				ident: this.$store.state.matrixIdent,
				source_value: '',
				destination_value: '',
			},
			formRelations: {},
		};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

<template>
	<DBModal :title="isCreate ? 'Создание темы' : 'Редактирование темы'">
		<DCells gap="xl">
			<DCell span="12">
				<DFormInput
					label="Название"
					v-model="formData.name"
					:errors="formError.fields.name"
				/>
			</DCell>
			<DCell span="12">
				<DFormInput
					label="Перевод"
					v-model="formData.name_en"
					:errors="formError.fields.name_en"
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
	name: 'ModalFormSubject',
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.subject,
			formData: {
				name: '',
				name_en: '',
			},
			formRelations: {},
		};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

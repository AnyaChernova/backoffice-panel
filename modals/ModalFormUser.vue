<template>
	<DBModal :title="isCreate ? 'Создание' : 'Редактирование'">
		<DCells gap="xl">
			<DCell span="12">
				<DFormInput
					label="Имя пользователя"
					v-model="formData.name"
					:errors="formError.fields.name"
				/>
			</DCell>
			<DCell span="12">
				<DFormInput
					label="E-mail"
					autocomplete="new-user"
					v-model="formData.email"
					:errors="formError.fields.email"
				/>
			</DCell>
			<DCell span="12">
				<DFormInput
					label="Описание"
					v-model="formData.description"
					:errors="formError.fields.description"
				/>
			</DCell>
			<DCell span="12">
				<DBFormUploaderImage
					label="Обложка"
					:file-formats="fileConfig.fileFormats"
					:file-max-size="fileConfig.fileMaxSize"
					v-model="formData.picture"
					:errors="formError.fields.picture"
					width="100"
					height="100"
					field="200"
					field2x="400"
				/>
			</DCell>
			<DCell span="12">
				<DFormSelect
					multiple
					label="Языки пользователя"
					option-value="id"
					option-label="title"
					:options="formRelations.language"
					v-model="formData.language_ids"
					:errors="formError.fields.language_ids"
				/>
			</DCell>
			<DCell span="12">
				<DFormSelect
					label="Тема пользователя"
					option-value="id"
					option-label="title"
					:options="formRelations.subjects"
					v-model="formData.subject_id"
					:errors="formError.fields.subject_id"
				/>
			</DCell>
			<DCell span="6">
				<DFormPassword
					label="Пароль"
					autocomplete="new-password"
					v-model="formData.password"
					:errors="formError.fields.password"
				/>
			</DCell>
			<DCell span="6">
				<DFormPassword
					label="Подтверждение пароля"
					autocomplete="new-password"
					v-model="formData.password_confirmation"
					:errors="formError.fields.password_confirmation"
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
	name: 'ModalFormUser',
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.user,
			formData: {
				name: '',
				email: '',
				description: '',
				subject_id: '',
				picture: undefined,
				password: undefined,
				password_confirmation: undefined,
				language_ids: []
			},
			formRelations: {
				language: [],
				subjects: [],
			},
			fileConfig: {
				fileFormats: 'jpg, jpeg, png',
				fileMaxSize: 10 * this.$dUtils.fileSize.MB,
			},
		};
	},
	computed: {},
	methods: {
		formRelationCallback() {
			if (this.formEntity.languages && this.formEntity.languages.length) {
				this.formData.language_ids = this.formEntity.languages.map(({id}) => id);
			}
		},
	},
	mounted() {},
};
</script>

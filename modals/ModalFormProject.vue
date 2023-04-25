<template>
	<DBModal :title="isCreate ? 'Создание проекта' : 'Редактирование проекта'">
		<DCells gap="xl">
			<DCell span="12">
				<FormSelectUser
					v-model="formData.user_id"
					:options="formRelations.users"
					:errors="formError.fields.user_id"
				/>
			</DCell>
			<DCell span="12">
				<DBFormUploaderImage
					label="Обложка"
					:file-formats="fileConfig.fileFormats"
					:file-max-size="fileConfig.fileMaxSize"
					v-model="formData.cover_picture"
					:errors="formError.fields.cover_picture"
					width="100"
					height="100"
					field="200"
					field2x="400"
				/>
			</DCell>
			<DCell span="12">
				<DFormInput
					label="Название проекта"
					v-model="formData.name"
					:errors="formError.fields.name"
				/>
			</DCell>
			<DCell span="12">
				<DFormSelect
					label="Тематика"
					option-value="id"
					option-label="name"
					:options="formRelations.subjects"
					v-model="formData.subject_id"
					:errors="formError.fields.subject_id"
				/>
			</DCell>
			<DCell span="12">
				<FormSelectKeywords
					v-model="formData.keywords"
					:options="formRelations.keywords"
					:errors="formError.fields.keywords"
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
import FormSelectKeywords from "@/components/Form/FormSelectKeywords.vue";
import FormSelectUser from "@/components/Form/FormSelectUser.vue";

export default {
	name: 'ModalFormProject',
	extends: BaseFormComponent,
	props: {
		user: {
			type: Object,
			default: () => null
		}
	},
	components: {FormSelectUser, FormSelectKeywords},
	data() {
		return {
			formApi: this.$api.project,
			formData: {
				name: '',
				description: '',
				user_id: '',
				subject_id: '',
				keywords: [],
				cover_picture: undefined,
			},
			formRelations: {
				languages: [],
				subjects: [],
				keywords: [],
				users: [],
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
			if (this.formEntity.user) {
				this.formRelations.users = [this.formEntity.user];
			}
			if (this.user) {
				this.formRelations.users = [this.user];
				this.formData.user_id = this.user.id;
			}
		},
		prepareFormData() {
			return {
				...this.formData,
				keywords: this.formData.keywords.map(i => i.name),
			};
		},
	},
	mounted() {},
};
</script>

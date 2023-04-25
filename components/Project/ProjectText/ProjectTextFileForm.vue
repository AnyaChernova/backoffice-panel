<template>
	<DCells gap="xl">
		<DCell span="12">
			<DBFormUploaderFile
				label="Файл"
				field-name="name"
				:file-formats="fileConfig.fileFormats"
				:file-max-size="fileConfig.fileMaxSize"
				:errors="formError.fields.file"
				v-model="formData.file"
			/>
		</DCell>
		<DCell span="12">
			<FormSelectUser
				v-model="formData.author_user_id"
				:options="formRelations.users"
				:errors="formError.fields.author_user_id"
			/>
		</DCell>
		<DCell span="12">
			<d-button class="mr-l" :loading="loading" @click="onClickSubmit">Сохранить</d-button>
			<d-button :disabled="loading" @click="onClickCancel" outline>Отмена</d-button>
		</DCell>
	</DCells>
</template>

<script>
import FormSelectUser from "@/components/Form/FormSelectUser.vue";
import BaseFormComponent from "@/components/Base/BaseFormComponent.vue";
export default {
	name: "ProjectTextFileForm",
	extends: BaseFormComponent,
	props: {
		project: {
			type: Object,
			default: null,
		},
	},
	components: {FormSelectUser},
	data() {
		return {
			formApi: this.$api.projectText,
			formCreateMethod: 'createFile',
			formData: {
				file: undefined,
				author_user_id: '',
				project_id: this.project?.id,
			},
			formRelations: {
				users: []
			},
			fileConfig: {
				fileFormats: 'pdf, txt, html, doc',
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
		},
	},
	created() {},
	mounted() {},
}
</script>

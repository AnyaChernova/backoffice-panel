<template>
	<DBModal :title="isCreate ? 'Создание файла' : 'Редактирование файла'">
		<DCells gap="xl">
			<template v-if="isCreate">
				<DCell span="12">
					<FormSelectUser
						v-model="formData.user_id"
						:options="formRelations.users"
						:errors="formError.fields.user_id"
					/>
				</DCell>
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
			</template>
			<template v-else>
				<DCell span="12">
					<DFormInput
						label="Название"
						v-model="formData.name"
						:errors="formError.fields.name"
					/>
				</DCell>
				<DCell span="12">
					<DFormTextarea
						label="Описание"
						v-model="formData.description"
						:errors="formError.fields.description"
					/>
				</DCell>
			</template>
		</DCells>
		<template #footer>
			<d-button class="mr-l" :loading="loading" @click="onClickSubmit">Сохранить</d-button>
			<d-button :disabled="loading" @click="onClickCancel" outline>Отмена</d-button>
		</template>
	</DBModal>
</template>

<script>
import BaseFormComponent from "@/components/Base/BaseFormComponent.vue";
import FormSelectUser from "@/components/Form/FormSelectUser.vue";

export default {
	name: "ModalFormProjectFile",
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
			formApi: this.$api.projectFile,
			formData: {
				file: undefined,
				user_id: undefined,
				name: undefined,
				description: undefined,
				project_id: this.project?.id,
			},
			formRelations: {
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
			if (this.formEntity.file) {
				this.formData.file = {
					name: this.formEntity.name,
					type: this.formEntity.type,
					link: this.formEntity.link,
				};
			}
		},
	},
	created() {
	},
	mounted() {
	},
}
</script>

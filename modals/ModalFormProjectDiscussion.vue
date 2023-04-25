<template>
	<DBModal :title="isCreate ? 'Создание дискуссии' : 'Редактирование дискуссии'">
		<DCells gap="xl">
			<DCell span="12">
				<DFormInput
					label="Тема"
					v-model="formData.subject"
					:errors="formError.fields.subject"
				/>
			</DCell>
			<DCell span="12">
				<DFormInput
					label="Сообщение"
					v-model="formData.message"
					:errors="formError.fields.message"
				/>
			</DCell>
			<DCell span="12">
				<FormSelectUser
					v-model="formData.user_id"
					:options="formRelations.users"
					:errors="formError.fields.user_id"
				/>
			</DCell>
			<DCell span="12" v-if="formData.files">
				<d-list gap-y="s">
					<d-list-item v-for="(file, i) in formData.files" :key="i">
						<DMedia>
							<template #aside>
								<DIcon name="file" size="20"/>
							</template>
							<div class="dib-middle text-ellipsis ml-m w-100p">{{ file.name }}</div>
						</DMedia>
					</d-list-item>
				</d-list>
			</DCell>
			<DCell span="12">
				<DFormUploader
					multiple
					:file-formats="fileConfig.fileFormats"
					:file-max-size="fileConfig.fileMaxSize"
					@upload="onFilesUpload"/>
			</DCell>
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
	name: "ModalFormProjectDiscussion",
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
			formApi: this.$api.projectDiscussion,
			formData: {
				subject: '',
				message: '',
				files: undefined,
				user_id: '',
				project_id: this.project?.id,
			},
			formRelations: {
				users: [],
			},
			fileConfig: {
				fileFormats: 'pdf,docx,txt',
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
			if (this.formEntity.files) {
				this.formData.files = [...this.formEntity.files];
			}
		},
		onFilesUpload(files) {
			if (this.formData.files) {
				this.formData.files = this.formData.files.concat(files);
			} else {
				this.formData.files = files;
			}
		}
	},
	created() {
	},
	mounted() {
	},
}
</script>

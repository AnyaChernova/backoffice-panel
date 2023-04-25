<template>
	<DBModal title="Импорт матрицы">
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
		</DCells>
		<template #footer>
			<div class="d-flex">
				<d-button class="mr-l" :loading="loading" @click="onClickSubmit">Сохранить</d-button>
				<d-button :disabled="loading" @click="onClickCancel" outline>Отмена</d-button>
				<nuxt-link to="/imports" class="d-text-c-primary d-flex ml-auto align-self-center" target="_blank">История импортов</nuxt-link>
			</div>
			
		</template>
	</DBModal>
</template>

<script>
import BaseFormComponent from "@/components/Base/BaseFormComponent.vue";

export default {
	name: "ModalFormMatrixImport",
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.matrix,
			formCreateMethod: 'import',
			formData: {
				file: undefined,
				ident_id: this.$store.state.matrixIdent,
			},
			fileConfig: {
				fileFormats: 'csv',
			},
			disableFormRequest: true,
		};
	},
	computed: {},
	methods: {
		onClickSubmit() {
			this.submitForm().then(() => {
				this.$emit('update');
				this.$close && this.$close(true);
			}).catch((res) => {
				if (res?.data?.error) {
					this.$dNotice.error(res.data.error);
				}
			});
		},
	},
	created() {
	},
	mounted() {
	},
}
</script>

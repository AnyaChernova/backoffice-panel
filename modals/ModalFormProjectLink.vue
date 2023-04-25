<template>
	<DBModal :title="isCreate ? 'Создание ссылки' : 'Редактирование ссылки'">
		<DCells gap="xl">
			<DCell span="12">
				<DFormInput
					label="Название"
					v-model="formData.name"
					:errors="formError.fields.name"
				/>
			</DCell>
			<DCell span="12" v-if="!isCreate">
				<DFormTextarea
					label="Описание"
					v-model="formData.description"
					:errors="formError.fields.description"
				/>
			</DCell>
			<DCell span="12">
				<DFormInput
					label="Ссылка"
					v-model="formData.url"
					:errors="formError.fields.url"
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
			formApi: this.$api.projectLink,
			formData: {
				name: '',
				url: '',
				description: undefined,
				project_id: this.project?.id,
			},
		};
	},
	computed: {},
	methods: {
		formRelationCallback() {},
	},
	created() {
	},
	mounted() {
	},
}
</script>

<template>
	<DBModal :title="isCreate ? 'Создание глоссария' : 'Редактирование глоссария'">
		<DCells gap="xl">
			<DCell span="12">
				<FormSelectUser
					label="Пользователь"
					v-model="formData.user_id"
					:options="formRelations.users"
					:errors="formError.fields.user_id"
				/>
			</DCell>
			<DCell span="6">
				<DFormInput
					label="Слово"
					:errors="formError.fields.word"
					v-model="formData.word"
				/>
			</DCell>
			<DCell span="6">
				<DFormSelect
					label="Исходный язык"
					option-label="title"
					option-value="id"
					:options="formRelations.source_languages"
					:errors="formError.fields.source_language_id"
					v-model="formData.source_language_id"
				/>
			</DCell>
			<DCell span="6">
				<DFormInput
					label="Перевод"
					v-model="formData.definition"
					:errors="formError.fields.definition"
				/>
			</DCell>
			<DCell span="6">
				<DFormSelect
					label="Целевой язык"
					option-label="title"
					option-value="id"
					:options="formRelations.destination_languages"
					:errors="formError.fields.destination_language_id"
					v-model="formData.destination_language_id"
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
	name: "ModalFormProjectGlossary",
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
			formApi: this.$api.projectGlossary,
			formData: {
				word: '',
				definition: '',
				source_language_id: '',
				destination_language_id: '',
				word_cases: [],
				user_id: null,
				project_id: this.project?.id,
			},
			formRelations: {
				users: [],
				destination_languages: [],
				source_languages: []
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
	created() {
	},
	mounted() {
	},
}
</script>

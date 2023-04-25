<template>
	<DCells gap="xl">
		<DCell span="6">
			<DFormInput
				label="Название"
				v-model="formData.name"
				:errors="formError.fields.name"
			/>
		</DCell>
		<DCell span="6" v-if="isCreate">
			<DFormInput
				label="Текст"
				v-model="formData.text"
				:errors="formError.fields.text"
			/>
		</DCell>
		<DCell span="12">
			<DFormTextarea
				label="Описание"
				v-model="formData.description"
				:errors="formError.fields.description"
			/>
		</DCell>
		<DCell span="12" v-if="isCreate">
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
import BaseFormComponent from '@/components/Base/BaseFormComponent';
import FormSelectUser from "@/components/Form/FormSelectUser.vue";

export default {
	name: 'ProjectTextForm',
	extends: BaseFormComponent,
	props: {
		project: {
			type: Object,
			default: null,
		},
		isCreate: {
			type: Boolean,
			default: false,
		}
	},
	components: {FormSelectUser},
	data() {
		return {
			formApi: this.$api.projectText,
			formData: {
				name: '',
				text: '',
				description: '',
				author_user_id: '',
				project_id: this.project?.id,
			},
			formRelations: {
				users: []
			},
		};
	},
	computed: {},
	methods: {
		formRelationCallback() {
			if (this.formEntity.author) {
				this.formRelations.users = [this.formEntity.author];
			}
		},
	},
	mounted() {},
};
</script>

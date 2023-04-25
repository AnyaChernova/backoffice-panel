<template>
	<DBModal :title="isCreate ? 'Создание жалобы' : 'Обработка жалобы'">
		<DCells gap="xl" v-if="complaint">
			<DCell span="12" v-if="complaint.user">
				<DBDataItem title="Пользователь">
					<UserDemo :user="complaint.user"/>
				</DBDataItem>
			</DCell>
			<DCell span="4">
				<DBDataItem title="Тип жалобы">
					<DLabel>{{ complaint.type.title }}</DLabel>
				</DBDataItem>
			</DCell>
			<DCell span="8" v-if="complaint.base">
				<DBDataItem title="Контент" :content="complaint.base.subject || complaint.base.message"/>
			</DCell>
			<DCell span="12">
				<DBDataItem title="Комментарий пользователя" :content="complaint.description"/>
			</DCell>
			<DCell span="12">
				<DFormTextarea
					label="Комментарий менеджера"
					v-model="formData.manager_description"
					:errors="formError.fields.manager_description"
				/>
			</DCell>
		</DCells>
		<template #footer>
			<d-button class="mr-l" :loading="loading" @click="onClickSubmit">Обработать</d-button>
			<d-button :disabled="loading" @click="onClickCancel" outline>Отмена</d-button>
		</template>
	</DBModal>
</template>

<script>
import BaseFormComponent from '@/components/Base/BaseFormComponent';
import UserDemo from "../components/User/UserDemo";

export default {
	name: 'ModalFormComplaint',
	extends: BaseFormComponent,
	props: {
		complaint: {
			type: Object,
			default: () => null,
		},
	},
	components: {UserDemo},
	data() {
		return {
			formApi: this.$api.complaint,
			formUpdateMethod: 'handle',
			formData: {
				manager_description: '',
			},
			formRelations: {},
		};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

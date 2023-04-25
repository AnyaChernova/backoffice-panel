<template>
	<DBModal :title="isCreate ? 'Новый менеджер' : 'Редактирование менеджера'">
		<DCells gap="xl">
			<DCell span="6">
				<DFormInput
					label="Имя"
					v-model="formData.name"
					:errors="formError.fields.name"
				/>
			</DCell>
			<DCell span="6">
				<DFormInput
					label="E-mail"
					autocomplete="new-user"
					v-model="formData.email"
					:errors="formError.fields.email"
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
import {mapGetters} from 'vuex';

export default {
	name: 'ModalManager',
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.manager,
			formData: {
				name: '',
				email: '',
				password: undefined,
				password_confirmation: undefined,
				phone: '',
				role_id: 1,
			},
			formRelations: {
				roles: [],
			},
		};
	},
	computed: {},
	methods: {
		formRelationCallback() {
			this.formData.role_id = 1;
		},
		async onClickSubmit() {
			try {
				await this.submitForm();
				await this.$auth.fetchUser();
				this.$close(true);
			} catch (e) {}
		},
	},
	watch: {
		'formData.password'(value) {
			if (value === '') {
				this.formData.password = undefined;
			}
		}
	},
	mounted() {},
};
</script>

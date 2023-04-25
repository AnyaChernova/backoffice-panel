<template>
	<DBModal title="Авторизация" tag="form" thin shadow @submit.prevent="onSubmit">
		<div class="d-row-s">
			<DFormInput
				label="Логин"
				v-focus
				v-model="formData.email"
				:errors="formError.fields.email"
			/>
		</div>
		<div class="d-row-s">
			<d-form-password
				label="Пароль"
				v-model="formData.password"
				type="password"
				:errors="formError.fields.password"
			/>
		</div>
		<div class="d-row-s -mb-xl" v-if="formError.global">
			<d-alert danger>{{formError.global}}</d-alert>
		</div>

		<template #footer>
			<d-button class="w-full" type="submit" :loading="loading">Войти</d-button>
			<d-button simple class="w-full mt-l" @click="$emit('toRecover')">Я забыл пароль</d-button>
		</template>
	</DBModal>
</template>

<script>
export default {
	name: 'AuthEmail',
	props: {},
	components: {},
	data() {
		return {
			loading: false,
			formData: {
				email: '',
				password: ''
			},
			formError: {
				global: '',
				fields: {
					email: [],
					password: []
				},
			}
		};
	},
	computed: {},
	methods: {
		async onSubmit() {
			this.loading = true;
			await this.$auth.loginWith('localAuth', {
				data: this.formData,
			}).then(() => {
				this.$router.replace('/');
			}).catch((res) => {
				this.$resetFormErrors({formError: this.formError});
				this.$setFormErrors({
					response: res.response,
					formError: this.formError,
				});
				this.loading = false;
			});
		},
	},
	mounted() {},
};
</script>

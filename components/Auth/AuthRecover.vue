<template>
	<DBModal :title="!done ? 'Восстановление пароля' : ''" tag="form" thin shadow @submit.prevent="onSubmit">
		<template v-if="done">
			<div class="d-text-title text-center py-xl -mx-l">На Вашу почту отправлена инструкция для восстановления пароля</div>
		</template>
		<template v-else>
			<div class="d-row-s">
				<DFormInput
					label="Email"
					caption="На вашу почту будет отправлено письмо с инструкцией"
					v-focus
					v-model="formData.email"
					:errors="formError.fields.email"
				/>
			</div>
			<div class="d-row-s -mb-xl" v-if="formError.global">
				<d-alert danger>{{formError.global}}</d-alert>
			</div>
		</template>
		<template #footer v-if="!done">
			<d-button class="w-full" type="submit" :loading="loading">Отправить</d-button>
			<d-button simple class="w-full mt-l" @click="$emit('toLogin')">Я вспомнил пароль</d-button>
		</template>
	</DBModal>
</template>

<script>
export default {
	name: 'AuthRecover',
	props: {},
	components: {},
	data() {
		return {
			done: false,
			loading: false,
			formData: {
				email: '',
			},
			formError: {
				global: '',
				fields: {
					email: [],
				},
			}
		};
	},
	computed: {},
	methods: {
		async onSubmit() {
			this.loading = true;
			this.$resetFormErrors({formError: this.formError});
			await this.$api.manager.recoverPasswordRequest(this.formData).then(() => {
				this.done = true;
			}).catch((res) => {
				this.$setFormErrors({
					response: res.response,
					formError: this.formError,
				});
			});
			this.loading = false;
		},
	},
	mounted() {},
};
</script>

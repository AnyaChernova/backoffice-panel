<template>
	<div class="_AuthForm">
		<AuthEmail @toRecover="setState('recover')" v-if="state.login"/>
		<AuthRecover @toLogin="setState('login')" v-if="state.recover"/>
	</div>
</template>

<script>
import AuthEmail from '@/components/Auth/AuthEmail';
import AuthRecover from '@/components/Auth/AuthRecover';
export default {
	name: 'AuthForm',
	props: {},
	components: {AuthRecover, AuthEmail},
	data() {
		return {
			state: {
				login: true,
				recover: false,
			}
		};
	},
	computed: {},
	methods: {
		setState(key) {
			Object.keys(this.state).forEach((_k) => {
				this.state[_k] = false;
			});
			this.state[key] = true;
		},
	},
	mounted() {},
};
</script>

<template>
	<DBContent class="DContent--white" inner-gap layout-centred>
		<AuthForm/>
	</DBContent>
</template>

<script>
import AuthForm from '~/components/Auth/AuthForm';

export default {
	name: 'Page_login',
	layout: 'public',
	scrollToTop: true,
	props: {},
	components: {AuthForm},
	data() {
		return {};
	},
	asyncData() {},
	computed: {},
	methods: {},
	created() {
		if (this.$auth.user) {
			this.$router.replace('/');
		}
	},
	mounted() {},
};
</script>

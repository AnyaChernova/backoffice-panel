<template>
	<component :is="link ? 'nuxt-link' : 'div'" to="/" class="_BrandLogo brandLogo" :class="{'brandLogo--large': large}">
		<img src="/logo-dark.svg" alt="logo" width="127" height="42" v-if="dark">
		<img src="/logo.svg" alt="logo" width="127" height="41" v-else>
	</component>
</template>

<script>
export default {
	name: 'BrandLogo',
	props: {
		link: {
			type: Boolean,
			default: false,
		},
		large: {
			type: Boolean,
			default: false,
		},
		dark: {
			type: Boolean,
			default: false,
		}
	},
	components: {},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

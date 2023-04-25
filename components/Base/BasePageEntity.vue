<template>
	<component
		v-if="entityData"
		:is="entityComponent"
		:entity="entityData"
		@update="onUpdate"
		@delete="onDelete"
	/>
</template>

<script>
export default {
	name: 'BasePageBrowser',
	props: {},
	components: {},
	entityComponent: null,
	data() {
		return {
			entityData: null,
		};
	},
	async fetch() {
		try {
			const id = this.$route.params.id;
			this.entityData = await this.entityResource.detail(id);
		} catch(err) {
			const message = err?.data?.message || err?.response?.message || err?.message || 'Упс';
			this.$nuxt.error({ statusCode: 404, message: message })
		}
	},
	computed: {
		entityComponent() {
			return this.$options.entityComponent;
		},
		entityResource() {
			const data = this.entityComponent?.data.call(this);
			return data.entityResource;
		}
	},
	methods: {
		onUpdate() {
			this.$nuxt.refresh();
		},
		onDelete() {
			this.$router.go(-1);
		},
	},
	mounted() {},
	beforeDestroy() {}
};
</script>

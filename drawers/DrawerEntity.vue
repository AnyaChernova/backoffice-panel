<template>
	<component
		v-if="entityData"
		:is="entityComponent"
		:entity="entityData"
		is-drawer
		@update="onUpdate"
		@delete="onDelete"
	/>
</template>

<script>
export default {
	name: 'DrawerEntity',
	props: {
		id: {
			type: Number,
			default: 0,
		},
		entityParams: {
			type: Object,
			default: () => ({}),
		},
		entityComponent: {
			type: null,
			default: null,
		},
	},
	components: {},
	data() {
		return {
			entityData: null,
		}
	},
	computed: {
		entityName() {
			return this.entityComponent?.name;
		}
	},
	methods: {
		async fetchData() {
			try {
				const data = this.entityComponent?.data.call(this);
				const resource = data.entityResource;
				if (Object.keys(this.entityParams).length) {
					this.entityData = await resource.detail({
						id: this.id,
						...this.entityParams
					});
				} else {
					this.entityData = await resource.detail(this.id);
				}
			} catch (e) {
				console.error(e);
				this.$dNotice.error('Ошибка загрузки');
			}
		},
		onUpdate() {
			this.$dDrawer.emit(`${this.entityName}:update`);
			this.fetchData();
		},
		onDelete() {
			this.$dDrawer.emit(`${this.entityName}:update`);
			this.$close();
		},
	},
	async mounted() {
		await this.fetchData();
	},
};
</script>

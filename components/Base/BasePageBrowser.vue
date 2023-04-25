<template>
	<DBBrowser
		api-url="/"
		@clickRow="onClickRow"
		ref="browser"
	>

	</DBBrowser>
</template>

<script>
import UiButtonPlus from "@/components/Ui/UiButtonPlus";
export default {
	name: 'BasePageBrowser',
	entityComponent: null,
	props: {},
	components: {
		UiButtonPlus
	},
	data() {
		return {};
	},
	computed: {
		entityParams() {
			return {}
		},
		entityComponent() {
			return this.$options.entityComponent;
		},
		entityData() {
			return this.entityComponent?.data.call(this);
		},
		entityName() {
			return this.entityComponent.name;
		},
		apiParams() {
			return Object.keys(this.filters).reduce((acc, key) => {
				if (this.filters[key]) {
					acc.filters[key] = [this.filters[key]];
				}
				return acc;
			}, {
				filters: {}
			})
		}
	},
	methods: {
		fetchData() {
			this.$refs.browser.fetchData();
		},
		onClickRow(item) {
			this.$dDrawer.load('DrawerEntity', {
				anchor: '.DBBrowserHeader',
				id: item.id,
				entityParams: this.entityParams,
				entityName: this.entityName,
				entityComponent: this.entityComponent,
			});
		},
		async onClickCreate() {
			if (!this.entityData) return;
			const created = await this.$dModal.load(this.entityData.entityModalForm);
			if (created) this.fetchData();
		},
	},
	mounted() {
		this.$dDrawer.on(`${this.entityName}:update`, this.fetchData);
	},
	beforeDestroy() {
		this.$dDrawer.off(`${this.entityName}:update`, this.fetchData);
	}
};
</script>

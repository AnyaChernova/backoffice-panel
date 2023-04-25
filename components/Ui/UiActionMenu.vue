<template>
	<component :is="tableCell ? 'td' : 'd-button'" class="_UiActionMenu actionMenu" v-bind="buttonAttrs" v-dropdown:[uuid]>
		<slot name="content">
			<d-icon class="d-text-c-primary" name="more-vertical" size="18"/>
		</slot>
		<d-dropdown :name="uuid" :placement="currentPlacement">
			<d-list gap-y="l" gap-x="m" divided space>
				<slot/>
			</d-list>
		</d-dropdown>
	</component>
</template>

<script>
let counter = 0;

export default {
	name: 'UiActionMenu',
	props: {
		tableCell: {
			type: Boolean,
			default: false,
		},
		placement: {
			type: String,
			default: '',
		}
	},
	components: {},
	data() {
		return {
			uuid: `UiActionMenu_${++counter},`
		};
	},
	computed: {
		currentPlacement() {
			const defaultPlacement = this.tableCell ? 'bottom-end' : 'bottom';
			return this.placement || defaultPlacement;
		},
		buttonAttrs() {
			return {
				small: true,
				outline: true,
				icon: true,
				...this.$attrs
			}
		},
	},
	methods: {},
	mounted() {},
};
</script>

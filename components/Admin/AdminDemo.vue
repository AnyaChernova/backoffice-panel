<template functional>
	<DBDemo
		src="40"
		src2x="80"
		:avatar="props.admin.picture"
		:avatar-text="$options.getAvatarText(props)"
		:small="props.small"
		:xSmall="props.xSmall"
	>
		<div class="ws-no-wrap text-ellipsis">
			{{ props.admin.name }}
		</div>

		<div class="d-text-c-secondary d-text-body-s" v-if="props.admin.role && props.admin.role.name">
			{{ props.admin.role.name }}
		</div>
	</DBDemo>
</template>
<script>
export default {
	name: 'AdminDemo',
	props: {
		admin: {
			type: Object,
			default: null,
		},
		small: {
			type: Boolean,
			default: false,
		},
		xSmall: {
			type: Boolean,
			default: false,
		}
	},
	components: {},
	getAvatarText(props) {
		return props?.admin?.name?.slice(0, 1) || 'A';
	}
};
</script>

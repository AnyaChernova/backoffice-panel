<template functional>
	<DBDemo
		:avatar="props.user.picture"
		:avatar-text="$options.getAvatarText(props)"
 		field="40"
 		field2x="80"
		:small="props.small"
		:xSmall="props.xSmall"
		:to="props.to"
	>
		<div class="ws-no-wrap text-ellipsis" v-if="props.user.name">
			{{ props.user.name }}
		</div>
		<div class="ws-no-wrap text-ellipsis d-text-body-s d-text-c-secondary">
			{{ props.user.email }}
		</div>
	</DBDemo>
</template>

<script>
export default {
	name: 'UserDemo',
	props: {
		user: {
			type: Object,
			default: () => ({}),
		},
		small: {
			type: Boolean,
			default: false,
		},
		xSmall: {
			type: Boolean,
			default: false,
		},
		to: {
			type: String,
			default: '',
		}
	},
	getAvatarText(props) {
		return props?.user?.name?.slice(0, 2) || '';
	}
};
</script>

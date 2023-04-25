<template functional>
	<DBDemo
		:avatar="props.project.cover_picture || '/image/placeholder.png'"
 		field="40"
 		field2x="80"
		:small="props.small"
		:xSmall="props.xSmall"
		:to="props.to"
	>
		<div class="ws-no-wrap text-ellipsis" v-if="props.project.name">
			{{ props.project.name }}
		</div>
		<div class="ws-no-wrap text-ellipsis d-text-body-s d-text-c-secondary" v-if="props.project.subject">
			{{ props.project.subject.name }}
		</div>
	</DBDemo>
</template>

<script>
export default {
	name: 'ProjectDemo',
	props: {
		project: {
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
};
</script>

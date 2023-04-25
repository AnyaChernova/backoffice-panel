<script>
import {mergeProps} from '@duotek/ui/helpers/createComponent';

export default {
	name: 'UiButtonPlus',
	functional: true,
	props: {},
	components: {},
	render(createElement, context) {
		const slots = context.slots();
		const content = slots.default;
		return createElement('d-button',
			mergeProps(context, {}),
			[
				createElement('d-icon', {
					class: 'mr-s -ml-xs',
					props: {
						name: 'plus',
						size: '15'
					},
				}),
				content,
			]
		);
	},
};
</script>

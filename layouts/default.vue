<template>
	<DBApp>
		<template #header>
			<MainHeader/>
		</template>

		<Nuxt/>

		<d-modal-root/>
		<d-drawer-root/>
	</DBApp>
</template>
<script>
import MainHeader from '@/components/Common/MainHeader';

export default {
	name: 'LayoutDefault',
	middleware: ['auth', 'permission'],
	props: {},
	components: {
		MainHeader,
	},
	data() {
		return {
			loading: false
		};
	},
	computed: {},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	mounted() {},
}
</script>

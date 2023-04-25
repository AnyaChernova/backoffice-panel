<template>
	<DBSection title="Информация">
		<DCells gap="xl">
			<DCell span="6">
				<DBDataItem title="Слово" :content="matrix.source_value"/>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Значение" :content="matrix.destination_value"/>
			</DCell>
		</DCells>
	</DBSection>
</template>

<script>
export default {
	name: 'MatrixInfo',
	props: {
		matrix: {
			type: Object,
			default: () => ({}),
		},
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

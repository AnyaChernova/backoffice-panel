<template>
	<DBSection title="Информация">

		<template #aside v-if="subject.picture">
			<DBImageBox :image="subject.picture" field="100" field2x="200" size="100" border/>
		</template>

		<DCells gap="xl">
			<DCell span="4">
				<DBDataItem title="Data" content="Content"/>
			</DCell>
		</DCells>

	</DBSection>
</template>

<script>
export default {
	name: 'SubjectInfo',
	props: {
		subject: {
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

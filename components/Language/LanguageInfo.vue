<template>
	<DBSection title="Информация">

		<template #aside v-if="language.picture">
			<DBImageBox :image="language.picture" field="100" field2x="200" size="100" border/>
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
	name: 'LanguageInfo',
	props: {
		language: {
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

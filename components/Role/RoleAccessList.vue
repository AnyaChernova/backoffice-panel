<template>
	<DBSection title="Доступы">
		<d-table :items="accesses" track-by="id">
			<template #head>
				<th>Раздел</th>
				<th class="text-center w-1px">Доступ</th>
			</template>
			<template #row="{item}">
				<td>{{ item.descriptor.title }}</td>
				<td class="text-center" :class="item.access ? 'd-text-c-success' : 'd-text-c-placeholder'">
					<d-icon name="check-circle" v-if="item.access"/>
					<d-icon name="slash" v-else/>
				</td>
			</template>
		</d-table>
	</DBSection>
</template>

<script>
export default {
	name: 'RoleAccessList',
	props: {
		accesses: {
			type: Array,
			default: () => [],
		}
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

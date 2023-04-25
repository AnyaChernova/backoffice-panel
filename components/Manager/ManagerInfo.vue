<template>
	<DBSection title="Информация">
		<d-cells gap="xl">
			<d-cell>
				<DBDataItem title="E-mail" :content="manager.email || '-'"/>
			</d-cell>
			<d-cell>
				<DBDataItem title="Дата создания" :content="$formatDate(manager.created_at)"/>
			</d-cell>
			<d-cell>
				<DBDataItem title="Дата последней активности" :content="$formatDate(manager.last_active_at)"/>
			</d-cell>
		</d-cells>
	</DBSection>
</template>

<script>
export default {
	name: "ManagerInfo",
	components: {},
	props: {
		manager: {
			type: Object,
			required: true,
			default: null,
		}
	},
}
</script>

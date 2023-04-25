<template>
	<DBSection title="Информация">
		<template #aside v-if="user.picture">
			<DBImageBox :image="user.picture" field="100" field2x="200" size="100" border/>
		</template>
		<DCells gap="xl">
			<DCell span="12">
				<DBDataItem title="Полное имя" :content="user.name"/>
			</DCell>
			<DCell span="12" v-if="user.description">
				<DBDataItem title="Комментарий" :content="user.description"/>
			</DCell>
			<DCell span="12">
				<DBDataItem title="Электронная почта" :content="user.email"/>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Количество проектов" :content="user.project_counter"/>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Статус">
					<DBStatusLabel :active="!user.is_disabled"/>
				</DBDataItem>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Последний вход" :content="$formatDate(user.last_used_at)"/>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Последняя активность" :content="$formatDate(user.last_active_at)"/>
			</DCell>
		</DCells>
	</DBSection>
</template>

<script>
export default {
	name: 'UserInfo',
	props: {
		user: {
			type: Object,
			default: () => ({}),
		},
	},
	components: {},
	data() {
		return {};
	},
	computed: {
	},
	methods: {},
	mounted() {},
};
</script>

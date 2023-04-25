<template>
	<DBSection title="Информация">

		<DCells gap="xl">
			<DCell span="12" v-if="complaint.base">
				<DBDataItem title="Пользователь">
					<UserDemo :user="complaint.base.user"/>
				</DBDataItem>
			</DCell>
			<DCell span="4">
				<DBDataItem title="Тип жалобы">
					<DLabel>{{ complaint.type.title }}</DLabel>
				</DBDataItem>
			</DCell>
			<DCell span="8" v-if="complaint.base">
				<DBDataItem title="Контент" :content="complaint.base.subject || complaint.base.message"/>
			</DCell>
			<DCell span="12">
				<DBDataItem title="Комментарий" :content="complaint.description"/>
			</DCell>
			<DCell span="12" v-if="complaint.manager_description">
				<DBDataItem title="Комментарий менеджера" :content="complaint.manager_description"/>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Статус">
					<DBStatusLabel :status="complaint.status"/>
				</DBDataItem>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Дата создания" :content="$formatDate(complaint.created_at)"/>
			</DCell>
		</DCells>

	</DBSection>
</template>

<script>
import UserDemo from "../User/UserDemo";
export default {
	name: 'ComplaintInfo',
	props: {
		complaint: {
			type: Object,
			default: () => ({}),
		},
	},
	components: {UserDemo},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>

<template>
	<DBSection title="Информация">

		<template #aside>
			<DBImageBox
				v-if="project.cover_picture"
				:image="project.cover_picture"
				field="100"
				field2x="200"
				size="100"
				border
			/>
		</template>

		<DCells gap="xl">
			<DCell span="12" v-if="project.public_moderation_message">
				<DBDataItem title="Комментарий менеджера" :content="project.public_moderation_message"/>
			</DCell>
			<DCell span="4" v-if="project.subject">
				<DBDataItem title="Тематика" :content="project.subject.name"/>
			</DCell>
			<DCell span="5" v-if="project.access_mode">
				<DBDataItem title="Тип">
					<DIcon class="d-text-c-success mr-s" name="lock" v-if="project.access_mode.id === 'PRIVATE'"/>
					<DIcon class="d-text-c-danger mr-s" name="eye" v-if="project.access_mode.id === 'PUBLIC'"/>
					<DIcon class="d-text-c-accent mr-s" name="users" v-if="project.access_mode.id === 'SHARED'"/>
					{{ project.access_mode.title }}
				</DBDataItem>
			</DCell>
			<DCell span="12" v-if="project.keywords">
				<DBDataItem title="Теги">
					<DCells gap="s">
						<DCell v-for="keyword in project.keywords" :key="keyword.id">
							<DLabel icon="tag" outline>
								{{ keyword.name }}
							</DLabel>
						</DCell>
					</DCells>
				</DBDataItem>
			</DCell>
			<DCell span="12">
				<DBDataItem title="Описание" :content="project.description"/>
			</DCell>
			<DCell span="12">
				<DBDataItem title="Владелец" v-if="project.user">
					<UserDemo :to="`/users/${project.user.id}`" :user="project.user" small/>
				</DBDataItem>
			</DCell>

			<DCell span="6">
				<DBDataItem title="Создан" :content="$formatDateTime(project.created_at)"/>
			</DCell>
			<DCell span="6">
				<DBDataItem title="Изменен" :content="$formatDateTime(project.created_at)"/>
			</DCell>
		</DCells>

	</DBSection>
</template>

<script>
import UserDemo from "~/components/User/UserDemo.vue";

export default {
	name: 'ProjectInfo',
	props: {
		project: {
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

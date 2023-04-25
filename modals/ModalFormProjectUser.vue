<template>
	<DBModal title="Пользователь проекта">
		<DCells gap="xl">
			<DCell span="12">
				<DCard>
					<DCardRow>
						<ProjectDemo :project="projectUser.project"/>
					</DCardRow>
					<DCardRow>
						<UserDemo :user="projectUser.project.user"/>
					</DCardRow>
					<DCardRow>
						<DCells gap="s">
							<DCell v-for="keyword in projectUser.project.keywords" :key="keyword.id">
								<DLabel icon="tag" outline>{{ keyword.name }}</DLabel>
							</DCell>
						</DCells>
					</DCardRow>
				</DCard>
			</DCell>
			<DCell span="12">
				<DFormSelect
					label="Пользователь"
					option-value="id"
					v-model="formData.id"
					:options="projectUsers"
					:errors="formError.fields.id"
				>
					<template #option="{option}">
						<UserDemo x-small :user="option.user"/>
					</template>
					<template #selected="{selected}">
						<UserDemo x-small :user="selected.user"/>
					</template>
				</DFormSelect>
			</DCell>
			<DCell span="12">
				<DFormSelect
					label="Статус"
					option-value="id"
					option-label="title"
					:options="formRelations.types"
					v-model="formData.type_id"
					:errors="formError.fields.type_id"
				/>
			</DCell>
		</DCells>
		<template #footer>
			<d-button class="mr-l" :loading="loading" @click="onClickSubmit">Сохранить</d-button>
			<d-button :disabled="loading" @click="onClickCancel" outline>Отмена</d-button>
		</template>
	</DBModal>
</template>

<script>
import BaseFormComponent from '@/components/Base/BaseFormComponent';
import ProjectDemo from "@/components/Project/ProjectDemo";
import UserDemo from "@/components/User/UserDemo";

export default {
	name: 'ModalFormProjectUser',
	extends: BaseFormComponent,
	props: {
		projectUser: {
			type: Object,
			default: () => null
		},
		projectUsers: {
			type: Array,
			default: () => []
		},
	},
	components: {UserDemo, ProjectDemo},
	data() {
		return {
			formApi: this.$api.projectUser,
			formCreateMethod: 'update',
			formData: {
				id: this.projectUser.id,
				type_id: this.projectUser.type_id,
			},
			formRelations: {
				types: []
			},
		};
	},
	computed: {},
	methods: {},
	mounted() {
	},
};
</script>

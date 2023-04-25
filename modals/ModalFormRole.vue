<template>
	<DBModal :title="isCreate ? 'Новый менеджер' : 'Редактирование менеджера'">
		<DCells gap="xl">
			<DCell span="12">
				<DFormInput
					label="Название"
					v-model="formData.name"
					:errors="formError.fields.name"
				/>
			</DCell>
			<DCell span="12">
				<div class="d-flex justify-between">
					<div class="d-text-title-xs">Доступы</div>
					<d-form-check
						label="Все"
						v-model="checkAllAccess"
					/>
				</div>
				<d-table :items="formRelations.descriptor_definitions" track-by="id">
					<template #head>
						<th>Раздел</th>
						<th class="text-center w-1px">Доступ</th>
					</template>
					<template #row="{item}">
						<td>{{ item.title }}</td>
						<td class="text-center">
							<d-form-check
								switch
								:true-value="1"
								:false-value="0"
								v-model="formData.role_access[item.id]"
							/>
						</td>
					</template>
				</d-table>
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

export default {
	name: 'ModalManager',
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.role,
			formData: {
				name: '',
				role_access: {},
			},
			formRelations: {
				descriptor_definitions: []
			},
		};
	},
	computed: {
		checkAllAccess: {
			get() {
				return Object.keys(this.formData.role_access).every((key) => this.formData.role_access[key])
			},
			set(value) {
				Object.keys(this.formData.role_access).forEach((key) => {
					this.$set(this.formData.role_access, key, Number(value));
				})
			},
		}
	},
	methods: {
		roleAccessAdapter(role_access = []) {
			if (!role_access) return {};
			return role_access.reduce((acc, i) => (acc[i.descriptor_id] = i) && acc, {})
		},
		formRelationCallback(res) {
			const entityAccess = this.roleAccessAdapter(res?.entity?.role_access);
			res.descriptor_definitions.forEach((descriptor) => {
				const key = descriptor.id;
				const value = entityAccess[key]?.access || 0;
				this.$set(this.formData.role_access, key, value);
			})
		},
		async onClickSubmit() {
			try {
				await this.submitForm();
				await this.$auth.fetchUser();
				this.$close(true);
			} catch (e) {}
		},
	},
	mounted() {},
	watch: {}
};
</script>

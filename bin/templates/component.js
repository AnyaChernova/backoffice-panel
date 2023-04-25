export const templateComponentEntity = (entityName, pageName, lowName) => (`<template>
	<DBEntity
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:link="\`/${pageName}/\${ entity.id }\`"
		:caption="\`Entity #\${ entity.id }\`"
		:title="entity.name"
		:active="!entity.is_disabled"
	>

		<template #actions>
			<DButton outline @click="onClickUpdate">Изменить</DButton>
			<DButton outline success @click="onClickEnable" :loading="disableLoading" v-if="entity.is_disabled">
				Разблокировать
			</DButton>
			<DButton outline accent @click="onClickDisable" :loading="disableLoading" v-else>Заблокировать</DButton>
			<DButton outline danger @click="onClickDelete" :loading="deleteLoading">Удалить</DButton>
		</template>

		<${entityName}Info :${lowName}="entity" v-if="activeTab === 'Информация'"/>

	</DBEntity>
</template>

<script>
import ${entityName}Info from '@/components/${entityName}/${entityName}Info';
import BaseEntity from '@/components/Base/BaseEntity';

export default {
	name: '${entityName}Entity',
	extends: BaseEntity,
	props: {},
	components: {
		${entityName}Info
	},
	data() {
		return {
			entityResource: this.$api.${lowName},
			entityModalForm: 'ModalForm${entityName}',
			tabs: ['Информация'],
			activeTab: 'Информация',
			disableLoading: false,
			deleteLoading: false,
		};
	},
	computed: {},
	methods: {
		onClickDisable() {
			this.runAction({
				action: 'disable',
				confirmTitle: 'Блокировка',
				confirmSubTitle: 'Вы уверены, что хотите заблокировать ENTITY?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
			});
		},

		onClickEnable() {
			this.runAction({
				action: 'enable',
				confirmTitle: 'Разблокировка',
				confirmSubTitle: 'Вы уверены, что хотите разблокировать ENTITY?',
				errorTitle: 'Ошибка смены статуса',
				loading: 'disableLoading',
			});
		},

		onClickDelete() {
			this.runAction({
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить ENTITY?',
				errorTitle: 'Ошибка удаления',
				loading: 'deleteLoading',
			});
		},
	},
	mounted() {},
};
</script>
`)

export const templateComponentInfo = (entityName, routeName, lowName) => (`<template>
	<DBSection title="Информация">

		<template #aside v-if="${lowName}.picture">
			<DBImageBox :image="${lowName}.picture" field="100" field2x="200" size="100" border/>
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
	name: '${entityName}Info',
	props: {
		${lowName}: {
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
`)

export const templateComponentModal = (entityName, routeName, lowName) => (`<template>
	<DBModal :title="isCreate ? 'Создание' : 'Редактирование'">
		<DCells gap="xl">
			<DCell span="6">
				<DFormInput
					label="Имя"
					v-model="formData.name"
					:errors="formError.fields.name"
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

export default {
	name: 'ModalForm${entityName}',
	extends: BaseFormComponent,
	props: {},
	components: {},
	data() {
		return {
			formApi: this.$api.${lowName},
			formData: {
				name: '',
			},
			formRelations: {},
		};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>
`)

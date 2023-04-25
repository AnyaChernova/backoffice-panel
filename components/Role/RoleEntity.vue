<template>
	<DBEntity
		:isDrawer="isDrawer"
		:link="`/managers/${entity.id}`"
		:caption="`Менеджер #${ entity.id }`"
		:title="`${entity.name}`"
		:active="!entity.is_disabled"
	>
		<template #actions>
			<d-button  outline @click="onClickUpdate">Редактировать</d-button>
			<d-button  outline danger @click="onClickDelete">Удалить</d-button>
		</template>

		<RoleAccessList :accesses="entity.role_access"/>
	</DBEntity>
</template>

<script>
import BaseEntity from '~/components/Base/BaseEntity';
import RoleAccessList from '@/components/Role/RoleAccessList';

export default {
	name: 'RoleEntity',
	extends: BaseEntity,
	props: {
		isDrawer: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		RoleAccessList,
	},
	data() {
		return {
			entityResource: this.$api.role,
			entityModalForm: 'ModalFormRole',
		};
	},
	computed: {},
	methods: {
		onClickDelete() {
			this.runAction({
				action: 'delete',
				confirmTitle: 'Удаление роли',
				confirmSubTitle: 'Вы уверены, что хотите удалить роль?',
				errorTitle: 'Ошибка удаления',
			});
		},
	},
};
</script>

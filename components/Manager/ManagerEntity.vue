<template>
	<DBEntity
		:isDrawer="isDrawer"
		:link="`/settings/managers/${entity.id}`"
		:caption="`Менеджер #${ entity.id }`"
		:title="`${entity.name}`"
		:status="entity.status"
	>
		<template #actions>
			<DButton outline @click="onClickUpdate">Изменить</DButton>
			<d-button outline success @click="onClickEnable" :loading="disableLoading" v-if="entity.status.id === 'DISABLED'">
				Разблокировать
			</d-button>
			<d-button outline accent @click="onClickDisable" :loading="disableLoading" v-else>Заблокировать</d-button>
			<d-button outline danger @click="onClickDelete" :loading="deleteLoading">Удалить</d-button>
		</template>

		<ManagerInfo class="d-row-s" :manager="entity" />
		<RoleAccessList class="d-row-s" :accesses="entity.role.role_access" v-if="entity.role && entity.role.role_access"/>
	</DBEntity>
</template>

<script>
import ManagerInfo from "@/components/Manager/ManagerInfo";
import BaseEntity from '@/components/Base/BaseEntity';
import RoleAccessList from '@/components/Role/RoleAccessList';

export default {
	name: 'ManagerEntity',
	extends: BaseEntity,
	props: {
		isDrawer: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		RoleAccessList,
		ManagerInfo,
	},
	data() {
		return {
			entityResource: this.$api.manager,
			entityModalForm: 'ModalFormManager',
			disableLoading: false,
			deleteLoading: false,
		};
	},
	computed: {},
	methods: {
		onClickDisable() {
			this.runAction({
				action: 'disable',
				confirmTitle: 'Блокировка менеджера',
				confirmSubTitle: 'Вы уверены, что хотите заблокировать менеджера?',
				errorTitle: 'Ошибка смены статуса',
			});
		},

		onClickEnable() {
			this.runAction({
				action: 'enable',
				confirmTitle: 'Разблокировка менеджера',
				confirmSubTitle: 'Вы уверены, что хотите разблокировать менеджера?',
				errorTitle: 'Ошибка смены статуса',
			});
		},

		onClickDelete() {
			this.runAction({
				action: 'delete',
				confirmTitle: 'Удаление менеджера',
				confirmSubTitle: 'Вы уверены, что хотите удалить менеджера?',
				errorTitle: 'Ошибка удаления',
			});
		},
	},
};
</script>

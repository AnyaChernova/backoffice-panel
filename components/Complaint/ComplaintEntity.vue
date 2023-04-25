<template>
	<DBEntity
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:link="`/complaints/${ entity.id }`"
		:caption="`Жалоба #${ entity.id }`"
		:title="entity.name"
	>

		<template #actions>
			<DButton outline @click="onClickHandle" v-if="entity.state_id === 'PENDING'">Обработать</DButton>
			<d-button outline danger @click="onClickDelete" :loading="deleteLoading">Удалить</d-button>
		</template>

		<ComplaintInfo :complaint="entity" v-if="activeTab === 'Информация'"/>

	</DBEntity>
</template>

<script>
import ComplaintInfo from '@/components/Complaint/ComplaintInfo';
import BaseEntity from '@/components/Base/BaseEntity';

export default {
	name: 'UserEntity',
	extends: BaseEntity,
	props: {},
	components: {
		ComplaintInfo
	},
	data() {
		return {
			entityResource: this.$api.complaint,
			entityModalForm: 'ModalFormComplaint',
			tabs: ['Информация'],
			activeTab: 'Информация',
			deleteLoading: false,
		};
	},
	computed: {},
	methods: {
		async onClickHandle() {
			const res = await this.$dModal.load(this.entityModalForm, {
				id: this.entity.id,
				complaint: this.entity,
			});
			if (res) this.$emit('update');
		},
		onClickDelete() {
			this.runAction({
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить жалобу?',
				errorTitle: 'Ошибка удаления',
				loading: 'deleteLoading',
			});
		},
	},
	mounted() {},
};
</script>

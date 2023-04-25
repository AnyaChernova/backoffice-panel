<template>
	<DBEntity
		class="--noLink"
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:caption="`Слово #${ entity.id }`"
		:title="entity.name"
		:active="!entity.is_disabled"
	>

		<template #actions>
			<DButton outline @click="onClickUpdate">Изменить</DButton>
			<d-button outline danger @click="onClickDelete" :loading="deleteLoading">Удалить</d-button>
		</template>

		<MatrixInfo :matrix="entity" v-if="activeTab === 'Информация'"/>

	</DBEntity>
</template>

<script>
import MatrixInfo from '@/components/Matrix/MatrixInfo';
import BaseEntity from '@/components/Base/BaseEntity';

export default {
	name: 'MatrixEntity',
	extends: BaseEntity,
	props: {},
	components: {
		MatrixInfo
	},
	data() {
		return {
			entityResource: this.$api.matrix,
			entityModalForm: 'ModalFormMatrix',
			tabs: ['Информация'],
			activeTab: 'Информация',
			disableLoading: false,
			deleteLoading: false,
		};
	},
	computed: {},
	methods: {
		onClickDelete() {
			this.runAction({
				action: 'delete',
				confirmTitle: 'Удаление',
				confirmSubTitle: 'Вы уверены, что хотите удалить слово?',
				errorTitle: 'Ошибка удаления',
				loading: 'deleteLoading',
			});
		},
	},
	mounted() {},
};
</script>

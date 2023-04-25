<template>
	<DBEntity
		:isDrawer="isDrawer"
		:tabs="tabs"
		:activeTab.sync="activeTab"
		:link="`/feedback/${ entity.id }`"
		:caption="`Обратная связь #${ entity.id }`"
	>
		<FeedbackInfo :feedback="entity" v-if="activeTab === 'Информация'"/>
	</DBEntity>
</template>

<script>
import FeedbackInfo from '@/components/Feedback/FeedbackInfo';
import BaseEntity from '@/components/Base/BaseEntity';

export default {
	name: 'FeedbackEntity',
	extends: BaseEntity,
	props: {},
	components: {
		FeedbackInfo
	},
	data() {
		return {
			entityResource: this.$api.feedback,
			tabs: ['Информация'],
			activeTab: 'Информация',
		};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>
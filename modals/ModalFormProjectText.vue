<template>
	<DBModal :title="isCreate ? 'Создание текста' : 'Редактирование текста'" :tabs="isCreate ? tabs : []" :activeTab.sync="activeTab">
		<ProjectTextForm :is-create="isCreate" :id="id" :project="project" @update="onUpdate" @close="onClose" v-if="activeTab === 'Форма'"/>
		<ProjectTextFileForm :id="id" :project="project" @update="onUpdate" @close="onClose" v-if="activeTab === 'Файл'"/>
	</DBModal>
</template>

<script>
import ProjectTextForm from "@/components/Project/ProjectText/ProjectTextForm.vue";
import ProjectTextFileForm from "@/components/Project/ProjectText/ProjectTextFileForm.vue";

export default {
	name: 'ModalFormProjectText',
	props: {
		id: {
			type: [Number, String],
			default: 0,
		},
		project: {
			type: Object,
			default: null,
		}
	},
	components: {ProjectTextFileForm, ProjectTextForm},
	data() {
		return {
			tabs: ['Форма', 'Файл'],
			activeTab: 'Форма',
		};
	},
	computed: {
		isCreate() {
			return !Boolean(this.selfId);
		},
		selfId() {
			return this.id || undefined;
		}
	},
	methods: {
		onUpdate() {
			this.$close(true);
		},
		onClose() {
			this.$close(false);
		}
	},
	mounted() {},
};
</script>

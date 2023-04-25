<template>
	<div>
		<DFormSelect
			class="selectKeyword d-row-xs"
			label="Ключевые слова"
			search-placeholder="Добавить слово"
			general-input
			option-value="id"
			option-label="name"
			:options="options"
			:errors="errors"
			ref="select"
			v-model="fakeModel"
			@select="onSelect"
		>
			<template #searchEmpty>
				<DButton class="selectKeyword__addBtn" simple @click="onClickCreate">Добавить новое слово</DButton>
			</template>
		</DFormSelect>
		<DCells class="d-row-xs" gap="m">
			<DCell v-for="keyword in modelValue" :key="keyword.id">
				<DLabel icon="tag" outline @close="onClickRemove(keyword)">{{ keyword.name }}</DLabel>
			</DCell>
		</DCells>
	</div>
</template>

<script>
let count = 0;
export default {
	name: "FormSelectKeywords",
	inheritAttrs: false,
	model: {
		prop: 'modelValue',
		event: 'modelChange'
	},
	props: {
		modelValue: {
			type: null,
			default: null,
		},
		options: {
			type: Array,
			default: () => ([]),
		},
		errors: {
			type: Array,
			default: () => ([]),
		}
	},
	components: {},
	data() {
		return {
			fakeModel: ''
		};
	},
	computed: {
		elSelect() {
			return this.$refs.select;
		},
	},
	methods: {
		createNewKeyword() {
			return {
				id: 'new_' + count++,
				name: this.elSelect.generalInputModel,
			}
		},
		addKeywords(keyword) {
			const isKeywordExist = this.modelValue.find(_k => _k.id === keyword.id)
			if (!isKeywordExist) {
				this.$emit('modelChange', [...this.modelValue, keyword]);
			}
		},
		onSelect(value) {
			this.addKeywords(value || this.createNewKeyword());
			this.$nextTick(() => {
				this.fakeModel = '';
			})
		},
		onClickRemove(keyword) {
			this.$emit('modelChange', this.modelValue.filter(_k => _k.id !== keyword.id));
		},
		onClickCreate() {
			this.elSelect.selectNOptionFirst();
			this.elSelect.isOpen = false;
		}
	},
	created() {},
	mounted() {},
}
</script>

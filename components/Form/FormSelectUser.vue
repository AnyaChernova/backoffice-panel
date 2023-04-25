<template>
	<d-form-select
		:multiple="multiple"
		:label="label"
		option-value="id"
		option-label="name"
		:search="onSearch"
		:options="options"
		v-model="innerModel"
		:errors="errors"
	>
		<template #option="{option}">
			<UserDemo x-small :user="option"/>
		</template>
		<template #selected="{selected}">
			<template v-if="Array.isArray(selected)">
				{{ selectedText }}
			</template>

			<UserDemo x-small :user="selected" v-else/>
		</template>
	</d-form-select>
</template>

<script>
import UserDemo from "@/components/User/UserDemo.vue";
export default {
	name: "FormSelectUser",
	props: {
		value: {
			default: null
		},
		label: {
			type: String,
			default: "Пользователь"
		},
		options: {
			type: Array,
			default: () => []
		},
		errors: {
			type: Array,
			default: () => []
		},
		statusId: {
			type: String
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		apiOptions: {
			type: Object,
			default: () => ({})
		}
	},
	components: {UserDemo},
	data() {
		return {};
	},
	computed: {
		innerModel: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit('input', value);
			},
		},
		selectedText() {
			const num = this.innerModel.length;
			const part1 = this.$declOfNum(num, ['Выбран', 'Выбрано', 'Выбрано']);
			const part2 = this.$declOfNum(num, ['Пользователь', 'Пользователя', 'Пользователей']);
			return `${part1} ${num} ${part2}`;
		}
	},
	methods: {
		async onSearch(search_string) {
			return await this.$api.user
				.list({ search_string, ...this.apiOptions })
				.then(r => r.data)
				.catch(() => []);
		}
	},
	created() {},
	mounted() {},
}
</script>

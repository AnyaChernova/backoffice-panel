<template>
	<DBModal thin footer-no-gap>
		<div class="d-row d-text-title">{{title}}</div>
		<div class="d-row-xs" v-if="subTitle">{{subTitle}}</div>
		<template v-if="messageField">
			<DFormTextarea
				class="d-row-xs"
				:label="messageTitle"
				v-model="message"
			/>
		</template>
		<template #footer>
			<DCells gap="s">
				<DCell span="6">
					<d-button class="w-full" @click="onClickSubmit">{{successText}}</d-button>
				</DCell>
				<DCell span="6">
					<d-button class="w-full" @click="onClickCancel" outline>{{cancelText}}</d-button>
				</DCell>
			</DCells>
		</template>
	</DBModal>
</template>

<script>
export default {
	name: 'ModalConfirm',
	props: {
		title: {
			type: String,
			default: 'Подтвердите действие',
		},
		subTitle: {
			type: String,
			default: '',
		},
		successText: {
			type: String,
			default: 'Подтвердить',
		},
		cancelText: {
			type: String,
			default: 'Отмена',
		},
		messageField: {
			type: String,
			default: '',
		},
		messageTitle: {
			type: String,
			default: 'Причина',
		}
	},
	components: {},
	data() {
		return {
			message: ''
		};
	},
	computed: {},
	methods: {
		onClickSubmit() {
			if (this.message) {
				this.$close(this.message);
			} else {
				this.$close(true);
			}
		},
		onClickCancel() {
			this.$close(false);
		},
	},
	mounted() {},
};
</script>

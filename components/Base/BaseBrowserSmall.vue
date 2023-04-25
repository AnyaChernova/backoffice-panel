<template>
	<DBBrowserSmall
		api-url="/"
		ref="browser"
	>

	</DBBrowserSmall>
</template>

<script>
import UiButtonPlus from "@/components/Ui/UiButtonPlus";
export default {
	name: 'BaseBrowserSmall',
	props: {},
	components: {
		UiButtonPlus
	},
	data() {
		return {
			entityResource: null,
			entityModalForm: '',
			entityModalFormParams: {},
			filters: {},
			loading: false,
			loadingFields: [],
		};
	},
	computed: {
		apiParams() {
			return Object.keys(this.filters).reduce((acc, key) => {
				if (this.filters[key]) {
					acc.filters[key] = [this.filters[key]];
				}
				return acc;
			}, {
				filters: {}
			})
		}
	},
	methods: {
		fetchData() {
			this.$refs.browser.fetchData();
		},
		loadingStart(key) {
			this[key] = true;
			this.loadingFields.push(key);
		},
		loadingStop() {
			this.loadingFields.forEach(key => {
				if (this[key]) this[key] = false;
			});
			this.loadingFields = [];
		},
		async onClickCreate() {
			if (!this.entityModalForm) return;
			const res = await this.$dModal.load(this.entityModalForm, {
				...this.entityModalFormParams,
			});
			if (res) {
				this.fetchData();
				this.$emit('update');
			}
		},
		async onClickUpdate(entity) {
			if (!this.entityModalForm) return;
			const res = await this.$dModal.load(this.entityModalForm, {
				id: entity.id,
				...this.entityModalFormParams
			});
			if (res) {
				this.fetchData();
				this.$emit('update');
			}
		},
		async runAction(options = {}) {
			const {
				action,
				entity = null,
				confirmTitle = '',
				confirmSubTitle = '',
				messageField = '',
				messageTitle = 'Причина',
				errorTitle = 'Ошибка',
				loading = 'loading',
				params = {}
			} = options;
			if (!this.entityResource) return;
			const confirm = await this.$dModal.load('ModalConfirm', {
				lock: true,
				title: confirmTitle,
				subTitle: confirmSubTitle,
				messageField,
				messageTitle,
			});
			if (confirm) {
				this.loadingStart(loading);
			} else {
				return;
			}
			try {
				const messageParams = messageField ? ({
					[messageField]: confirm || undefined,
				}) : {};
				await this.entityResource[action]({
					id: entity.id,
					...params,
					...messageParams,
				});
				this.$emit('update');
				this.fetchData();
			} catch (e) {
				this.$dNotice.error(errorTitle);
			}
		},
	},
	mounted() {},
	beforeDestroy() {}
};
</script>

<script>
export default {
	name: 'BasePageBrowser',
	props: {
		isDrawer: {
			type: Boolean,
			default: false,
		},
		entity: {
			type: Object,
			default: () => ({}),
		},
	},
	components: {},
	data() {
		return {
			entityResource: null,
			entityModalForm: '',
			entityModalFormParams: {},
			loading: false,
			loadingFields: [],
		};
	},
	computed: {},
	methods: {
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
		async onClickUpdate() {
			const res = await this.$dModal.load(this.entityModalForm, {
				id: this.entity.id,
				...this.entityModalFormParams
			});
			if (res) this.$emit('update');
		},
		async runAction(config = {}) {
			const {
				action,
				confirmTitle = '',
				confirmSubTitle = '',
				messageField = '',
				messageTitle = 'Причина',
				errorTitle = 'Ошибка',
				loading = 'loading',
				params = {}
			} = config;
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
			if (messageField) {
				params[messageField] = String(confirm) || undefined;
			}
			try {
				await this.entityResource[action]({
					id: this.entity.id,
					...params
				});
				this.$emit(action === 'delete' ? 'delete' : 'update');
			} catch (e) {
				this.$dNotice.error(errorTitle);
			}
		},
	},
	watch: {
		entity(newValue, oldValue) {
			if (newValue !== oldValue) {
				this.loadingStop();
			}
		},
	},
	mounted() {},
	beforeDestroy() {}
};
</script>

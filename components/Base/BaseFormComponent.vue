<script>
export default {
	name: 'BaseFormComponent',
	props: {
		id: {
			type: Number,
			default: 0,
		}
	},
	components: {},
	data() {
		return {
			loading: false,
			formApi: null,
			formUpdateMethod: 'update',
			formCreateMethod: 'create',
			formRelationsInit: false,
			formEntity: {},
			formParams: {},
			formData: {},
			formRelations: {},
			formError: {
				global: '',
				fields: {},
			},
		};
	},
	computed: {
		isCreate() {
			return !Boolean(this.selfId);
		},
		selfId() {
			return this.id || this.formEntity?.id || undefined;
		}
	},
	methods: {
		formRelationBeforeCallback() {},
		formRelationCallback() {},

		prepareFormData() {
			return this.formData;
		},
		fillFields(fieldsForm, fieldsResponse) {
			Object.keys(fieldsForm).forEach((key) => {
				if (key in fieldsResponse) {
					if (!Array.isArray(fieldsForm[key]) && typeof fieldsForm[key] === 'object' && fieldsForm[key] !== null) {
						this.fillFields(fieldsForm[key], fieldsResponse[key]);
					} else {
						this.$set(fieldsForm, key, fieldsResponse[key]);
					}
				} else {
					console.log(`skip: ${key}`);
				}
			});
		},

		async requestGetRelations() {
			if (!this.formApi) {
				throw new Error('this.formApi не задан');
			}
			return this.formApi.form({
				id: this.selfId,
				...this.formParams
			})
		},

		async requestPostForm(e) {
			if (!this.formApi) {
				throw new Error('this.formApi не задан');
			}
			const id = this.selfId || undefined;
			const formData = this.prepareFormData();
			const update = this.formUpdateMethod;
			const create = this.formCreateMethod;
			return this.formApi[this.isCreate ? create : update]({
				id: id,
				...formData
			});
		},

		fetchFormRelations() {
			if (this.disableFormRequest) return;
			return this.requestGetRelations().then((res) => {
				this.formRelationBeforeCallback(res);
				Object.keys(this.formRelations).forEach((key) => {
					if (!res[key]) return;
					this.$set(this.formRelations, key, res[key]);
				});
				if (res.entity) {
					this.fillFields(this.formData, res.entity);
					this.formEntity = res.entity;
				}
				if (this.formRelationsInit === false) {
					this.formRelationCallback(res);
				}
				this.$nextTick(() => {
					this.formRelationsInit = true;
				})
			}).catch((response) => {
				this.formError.global = 'При загрузке данных произошла ошибка';
				console.error(response);
			});
		},

		submitForm() {
			this.loading = true;
			return this.requestPostForm().then((res) => {
				this.loading = false;
				return res;
			}).catch((res) => {
				this.$resetFormErrors({
					formError: this.formError,
				});
				if (res.response) {
					this.$setFormErrors({
						response: res.response,
						formError: this.formError,
					});
				}
				this.loading = false;
				throw res.response;
			})
		},

		createFormErrorModel(formData, formError) {
			Object.keys(formData).forEach((key) => {
				if (formData[key] && !Array.isArray(formData[key]) && typeof formData[key] === 'object') {
					if (!formError[key]) {
						this.$set(formError, key, {});
					}
					this.createFormErrorModel(formData[key], formError[key]);
				} else {
					this.$set(formError, key, []);
				}
			});
		},
		onClickSubmit() {
			this.submitForm().then(() => {
				this.$emit('update');
				this.$close && this.$close(true);
			}).catch((res) => {});
		},
		onClickCancel() {
			this.$emit('close');
			this.$close && this.$close();
		},
	},
	async created() {
		this.createFormErrorModel(this.formData, this.formError.fields);
		if (this.formEntity?.id) {
			this.fillFields(this.formData, this.formEntity);
		} else {
			await this.fetchFormRelations();
		}
	},
	mounted() {},
};
</script>

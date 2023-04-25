import bindAll from '@duotek/ui/helpers/bindAll';
import {checkIsHaveFile, clearData, toFormData} from '@/services/api/resource/helpers';

export const statusModel = {
	const: String,
	id: String,
	title: String,
};

export class BaseResource {
	constructor(ctx) {
		this.prefix = '';
		this.URL = {
			list: `/list`,
			form: `/form`,
			detail: `/detail`,
			create: `/create`,
			update: `/update`,
			delete: `/delete`,
		};
		this.fileFields = [];
		this.$axios = ctx.$axios;
		bindAll.call(this);
	}

	get(url, params = {}) {
		return this.$axios.$get(this.prefix + url, {
			params,
		});
	}

	post(url, params, processing = null) {
		const config = (typeof processing === 'function' ? {
			onUploadProgress: processing,
		} : {});
		return this.$axios.$post(this.prefix + url, params, config);
	}

	async form(payload = {}) {
		return this.get(this.URL.form, payload);
	}

	async list({search_string = '', limit = 30, offset = 0} = {}) {
		return this.get(this.URL.list, {
			search_string,
			limit,
			offset,
		});
	}

	async detail(id = 0) {
		return this.get(this.URL.detail, {id}).then(r => r.data);
	}

	async create(payload, processing = null) {
		return this.post(this.URL.create, this._formDataAdapter(payload), processing);
	}

	async update(payload, processing = null) {
		return this.post(this.URL.update, this._formDataAdapter(payload), processing);
	}

	async delete({id = 0} = {}) {
		return this.post(this.URL.delete, {id});
	}

	_formDataAdapter(payload = {}) {
		let data = clearData(payload, this.fileFields);
		if (checkIsHaveFile(data)) {
			const formData = new FormData();
			return toFormData(formData, data);
		}
		return data;
	}
}

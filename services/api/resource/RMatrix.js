import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class RMatrix extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/matrix';
		this.fileFields = ['file'];
		bindAll.call(this);
	}

	async detail(payload) {
		return this.get(this.URL.detail, payload).then(r => r.data);
	}

	export(payload) {
		return this.post('/export', payload);
	}

	import(payload) {
		return this.post('/import', this._formDataAdapter(payload));
	}
}

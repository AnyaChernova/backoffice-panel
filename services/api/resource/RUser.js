import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
	last_name: "",
	email: "",
	description: "",
	active_language: {
		id: 0,
		ident: "",
		title: "",
	},
	active_language_id: 0,
	languages: [],
	picture: {},
	created_at: 0,
	updated_at: 0,
	is_disabled: false,
}

export default class RUser extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/users';
		this.fileFields = ['picture'];
		bindAll.call(this);
	}

	enable(payload) {
		return this.post('/enable', payload);
	}

	disable(payload) {
		return this.post('/disable', payload);
	}
}

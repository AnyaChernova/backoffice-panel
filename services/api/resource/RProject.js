import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
	access_mode: {},
	access_mode_id: "",
	cover_picture: {},
	created_at: 0,
	deleted: false,
	description: "",
	keywords: [],
	language: {},
	language_id: 0,
	name: "",
	public_moderation_message: null,
	public_moderation_state: {},
	public_moderation_state_id: "",
	rating: "",
	state: null,
	state_id: null,
	subject: {},
	subject_id: 0,
	updated_at: 0,
	user: {},
	user_id: 0,
}

export default class RProject extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/projects';
		this.fileFields = ['cover_picture'];
		bindAll.call(this);
	}

	enable(payload) {
		return this.post('/enable', payload);
	}

	disable(payload) {
		return this.post('/disable', payload);
	}

	accept(payload) {
		return this.post('/moderation-accept', payload);
	}

	decline(payload) {
		return this.post('/moderation-decline', payload);
	}
}

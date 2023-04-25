import {BaseResource} from '@/services/api/resource/BaseResource';

const accessModel = {
	access: Boolean,
	id: Number,
	descriptor_id: String,
	role_id: Number,
	title: String
}

const rolesModel = {
	id: Number,
	name: String,
	accesses: [accessModel],
};

const formModel = {
	roleAccess: [],
	objects: [],
	entity: {}
}

export default class RRole extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/managers/roles';
	}
}

import {BaseResource} from '@/services/api/resource/BaseResource';
// import {roleAccessModel, roleModel} from '@/services/api/resource/RRole';

const managerModel = {
	id: '',
	created_at: '',
	email: '',
	is_disabled: '',
	is_owner: '',
	last_activity_at: '',
	last_logged_at: '',
	name: '',
	role: '',
	updated_at: '',
	role_access: [],
}
const dashboardModel = [{
	new: 0,
	newToday: 0,
}]

export default class RManager extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/managers';
	}

	enable(payload) {
		return this.post('/enable', payload);
	}

	disable(payload) {
		return this.post('/disable', payload);
	}

	recoverPasswordRequest(payload = {}) {
		return this.post('/self/recovery-request', {
			email: payload.email,
		})
	}

	dashboard(payload = {}) {
		return this.get('/self/dashboard')
	}
}

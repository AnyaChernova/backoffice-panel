import {BaseResource} from '@/services/api/resource/BaseResource';

export default class RCommon extends BaseResource {
	constructor(ctx) {
		super(ctx);
	}

	statistics() {
		return this.get('/common/get-statistics');
	}

	definitions() {
		return this.get('/common/definitions');
	}

	dashboard() {
		return this.get('/common/dashboard');
	}
}

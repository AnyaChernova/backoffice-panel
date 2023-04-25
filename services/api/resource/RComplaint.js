import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class RComplaint extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/complaints';
		this.fileFields = [''];
		bindAll.call(this);
	}

	handle(payload) {
		return this.post('/handle', payload);
	}
}

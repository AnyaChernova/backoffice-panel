import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class RSubject extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/projects/subjects';
		this.fileFields = [''];
		bindAll.call(this);
	}
}

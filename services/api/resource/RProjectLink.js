import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class RProjectLink extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/projects/links';
		this.fileFields = ['file'];
		bindAll.call(this);
	}
}

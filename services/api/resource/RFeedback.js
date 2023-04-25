import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

export default class RFeedback extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/feedback';
		this.fileFields = [''];
		bindAll.call(this);
	}
}

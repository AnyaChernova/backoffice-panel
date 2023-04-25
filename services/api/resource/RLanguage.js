import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class RLanguage extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/common/languages';
		this.fileFields = [''];
		bindAll.call(this);
	}
}

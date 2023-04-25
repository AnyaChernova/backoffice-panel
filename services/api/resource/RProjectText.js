import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class RProjectText extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/projects/texts';
		this.fileFields = ['file'];
		bindAll.call(this);
	}

	createFile(payload) {
		return this.post('/create-file', this._formDataAdapter(payload));
	}
}

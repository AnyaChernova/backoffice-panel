import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class RProjectDiscussion extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/projects/discussions';
		this.fileFields = ['file'];
		bindAll.call(this);
	}

	messageDelete(id) {
		return this.post('/message-delete', id);
	}
}

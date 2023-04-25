import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

export default class RImport extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/matrix';
		this.fileFields = ['file'];
        this.URL = {
			detail: `/detail-import`,
		};
		bindAll.call(this);
	}
}
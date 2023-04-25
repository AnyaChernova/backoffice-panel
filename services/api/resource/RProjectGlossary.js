import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
	created_at: 0,
	definition: "",
	destination_language: {},
	destination_language_id: 0,
	project: {},
	project_id: 0,
	source_language: {},
	source_language_id: 0,
	updated_at: 0,
	user: {},
	user_id: 0,
	word: "",
	word_cases: [],
}

export default class RProjectGlossary extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/projects/glossary';
		this.fileFields = ['file'];
		bindAll.call(this);
	}
}

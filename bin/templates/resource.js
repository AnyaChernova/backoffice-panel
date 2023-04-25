export const templateResource = (entityName, pageName, lowName) => {
return `import {BaseResource} from '@/services/api/resource/BaseResource';
import bindAll from '@duotek/ui/helpers/bindAll';

const rModel = {
	id: 0,
}

export default class R${entityName} extends BaseResource {
	constructor(ctx) {
		super(ctx);
		this.prefix = '/${lowName}';
		this.fileFields = [''];
		bindAll.call(this);
	}

	enable(payload = {}) {
		return this.post('/enable', payload);
	}

	disable(payload = {}) {
		return this.post('/disable', payload);
	}
}
`};

const _importTemplate = (name) => `import R${name} from '@/services/api/resource/R${name}';`;

const _createInstanceTemplate = (name) => `\t${name.toLocaleLowerCase()}: new R${name}(ctx),`;

export const templateCreateApi = (names) => {
	return `${names.map(_importTemplate).join('\n')}

export default (ctx) => ({
${names.map(_createInstanceTemplate).join('\n')}
});
`
};

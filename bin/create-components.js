import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import {
	templateComponentEntity,
	templateComponentInfo,
	templateComponentModal
} from './templates/component.js';

export default async function (entityName, routeName, lowName) {
	const componentsPath = path.resolve('./components', entityName);
	const modalPath = path.resolve('./modals');
	if (!entityName) {
		console.log(chalk.green(`SKIP Components: entityName is missing`));
		return;
	}
	if (!await fse.exists(componentsPath)) {
		await Promise.all([
			fse.outputFile(`${componentsPath}/${entityName}Entity.vue`, templateComponentEntity(entityName, routeName, lowName)),
			fse.outputFile(`${componentsPath}/${entityName}Info.vue`, templateComponentInfo(entityName, routeName, lowName)),
			fse.outputFile(`${modalPath}/ModalForm${entityName}.vue`, templateComponentModal(entityName, routeName, lowName)),
		]).then(() => {
			console.log(chalk.green(`SUCCESS Components: ${chalk.blue(entityName)} created`))
		}).catch((error) => {
			console.log(error)
		})
	} else {
		console.log(chalk.red(`ERROR Components: ${chalk.blue(entityName)} already exist!`));
		process.exit(1);
	}
};


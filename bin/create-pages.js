import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import {templatePageIndex, templatePageId} from './templates/page.js';

export default async function (entityName, routeName, lowName) {
	const pagesPath = path.resolve('./pages', routeName);
	if (!entityName) {
		console.log(chalk.green(`SKIP Pages: entityName is missing`));
		return;
	}
	if (!await fse.exists(pagesPath)) {
		await Promise.all([
			fse.outputFile(`${pagesPath}/index.vue`, templatePageIndex(entityName)),
			fse.outputFile(`${pagesPath}/_id.vue`, templatePageId(entityName)),
		]).then(() => {
			console.log(chalk.green(`SUCCESS Pages: ${chalk.blue(routeName)} created`))
		}).catch((error) => {
			console.log(error)
		})
	} else {
		console.log(chalk.red(`ERROR Pages: ${chalk.blue(routeName)} already exist!`));
		process.exit(1);
	}
};


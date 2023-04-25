import path from "path";
import chalk from "chalk";
import fse from "fs-extra";
import {templateResource, templateCreateApi} from "./templates/resource.js";
import fs from "fs";

export default async function (entityName, routeName, lowName) {
	const resourceName = 'R' + entityName;
	const resourcePath = path.resolve('./services/api/resource');
	if (!entityName) {
		console.log(chalk.green(`SKIP Components: entityName is missing`));
		return;
	}
	if (!await fse.exists(`${resourcePath}/${resourceName}.js`)) {
		try {
			await fse.outputFile(`${resourcePath}/${resourceName}.js`, templateResource(entityName, routeName, lowName));
			console.log(chalk.green(`SUCCESS Resource: ${chalk.blue(entityName)} created`))
		} catch (error) {
			console.log(error)
		}
	} else {
		console.log(chalk.red(`ERROR Resource: ${chalk.blue(resourceName)} already exist!`));
		process.exit(1);
	}
};

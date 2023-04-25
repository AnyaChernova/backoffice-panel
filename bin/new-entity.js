import path from 'path';
import chalk from 'chalk';
import * as changeCase from "change-case";
import createPages from "./create-pages.js";
import createComponents from "./create-components.js";
import createResource from "./create-resource.js";
import createReExportApi from "./create-re-export-api.js";


const arg = process.argv[2];
const entityName = arg ? changeCase.pascalCase(arg) : '';
const routeName = arg ? changeCase.paramCase(arg) : '';
const lowName = arg ? changeCase.camelCase(arg) : '';

const run = async () => {
	console.log(chalk.cyan(`Entity - ${entityName}`));

	await Promise.all([
		createPages(entityName, routeName, lowName),
		createComponents(entityName, routeName, lowName),
		createResource(entityName, routeName, lowName),
	]);
	await createReExportApi()
}

run().then(() => {
	process.exit(0);
});

import fs from "fs";
import fse from "fs-extra";
import {templateCreateApi} from "./templates/resource.js";
import path from "path";
import chalk from "chalk";

export default async function () {
	const blackList = ['index', 'DS_Store', 'BaseResource.js', 'helpers.js'];
	const apiPath = path.resolve('./services/api/index.js');
	const resourcePath = path.resolve('./services/api/resource');

	const files = fs.readdirSync(resourcePath, { withFileTypes: true });

	const names = Array.from(files).filter((file) => {
		let taboo = blackList.filter((block) => file.name.includes(block));
		return !taboo.length;
	}).map(file => {
		return file.name
			.replace('.js', '')
			.replace('R', '')
	});

	await fse.outputFile(apiPath, templateCreateApi(names))
	console.log(chalk.green(`SUCCESS ReExportApi: generated`))
}

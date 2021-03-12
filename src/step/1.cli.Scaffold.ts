import glob from 'glob';
import fs from 'fs-extra';
import questions from '../questions';
import { ensureDirSync } from 'fs-extra';
import { questioner } from '../util/questioner';
import { getPathSpec } from '../util/getPath';
import { initTpl } from '../template/index';
import { getFromat } from '../util/getDate';
import shelljs from 'shelljs';

export const initProject = async (cliConf: ICliConf): Promise<ICliConf> => {
	const currPjName = await questioner(questions.qs_03_projName);
	if (currPjName) {
		cliConf.NAME_PROJ = currPjName;
		const { PATH_PROJ } = cliConf;
		const usrPath: string = process.env.HOME || process.env.USERPROFILE || '';
		fs.readFileSync(getPathSpec(usrPath, '.tMind'));
		ensureDirSync(getPathSpec(PATH_PROJ, currPjName));
		const _pkgArr: string[] = glob.sync(`${getPathSpec(PATH_PROJ, currPjName)}/*`);
		if (!_pkgArr.length) {
			const currSourceType: string = await questioner(questions.qs_04_TYPE_SOURCE);
			let currInitType: string = IinitTypeOther.OTHER;
			if (currSourceType === IsourceType.APP_FEND) {
				currInitType = await questioner(questions.qs_04_INIT_FEND);
			} else if (currSourceType === IsourceType.APP_SVR) {
				currInitType = await questioner(questions.qs_04_INIT_BEND);
			}
			await initTpl(cliConf, currSourceType, currInitType);
			shelljs.cd(currPjName);
			shelljs.exec('git init');
			shelljs.exec('git add .');
			shelljs.exec(`git commit -m '${getFromat('yyyy-mm-dd hh:mi:ss')}初始化建库'`);
			shelljs.exec('git branch -M main');
			return cliConf;
		} else {
			console.log(`当前路径下的：${currPjName} 文件夹已被其他项目占用，请更换路径后重试。`);
			process.exit(1);
		}
	} else {
		return initProject(cliConf);
	}
};

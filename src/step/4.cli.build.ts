import fs from 'fs-extra';
import shelljs from 'shelljs';
import { questioner } from '../util/questioner';
import { getFromat } from '../util/getDate';
import { getCurrPath, getPathSpec } from '../util/getPath';

const getAnswer = async (question: IObjQuestion): Promise<string> => {
	const asw = await questioner(question);
	if (asw) {
		return asw;
	} else {
		return getAnswer(question);
	}
};

export const runBuild = async (cliConf: ICliConf, questionMemo: IObjQuestion, questionBranch: IObjQuestion): Promise<string> => {
	const commitMemo = await getAnswer(questionMemo);
	if (commitMemo) {
		const commitBranch = await getAnswer(questionBranch) || 'main';
		const pkg = fs.readJsonSync(getPathSpec(getCurrPath(), 'package.json'));
		cliConf.URL_TO_GITHUB = ((pkg && pkg.repository) && pkg.repository.url) || '';
		const cmd = [
			'yarn build',
			'git add .',
			`git commit -m '(${getFromat()})${commitMemo}'`,
			`git branch -M ${commitBranch}`
		];
		if (cliConf.URL_TO_GITHUB) {
			// cmd.push(`git remote add origin ${pkg}`);
			cmd.push('git push -u origin main');
		}
		for (const v of cmd) {
			await shelljs.exec(v);
		}
		return '构建完成!';
	} else {
		return runBuild(cliConf, questionMemo, questionBranch);
	}
};

const shelljs = require('shelljs');
const inquirer = require('inquirer');
const fs = require('fs-extra');

const frm = (str, len = 2) => {
	return `${str}`.padStart(len, '0');
};

const getDate = () => {
	const _dt = new Date();
	return `${_dt.getFullYear()}-${frm(_dt.getMonth() + 1)}-${frm(_dt.getDate())} ${frm(_dt.getHours())}:${frm(_dt.getMinutes())}:${frm(_dt.getSeconds())}`;
};

const getGitCmd = (memo, pkg, branch = 'main') => {
	let urlStr = (pkg && pkg.repository && (pkg.repository.url || '')) || '';
	const _arr = [
		'git add .',
		`git commit -m '(${getDate()})${memo}'`,
		`git branch -M ${branch}`
	];
	if (urlStr) {
		// `git remote add origin git@github.com:fanzouguo/tMind-cli.git`
		urlStr = `${urlStr}`.replace(/^git\+/, '');
		// _arr.push(`git remote add origin ${urlStr}`);
		_arr.push(`git push -u origin ${branch}`);
	}
	return _arr;
};

const execBuild = (async () => {
	const pkg = fs.readJsonSync('./package.json');
	const { commitMemo } = await inquirer.prompt({
		type: 'input',
		message: '请输入提交备注',
		name: 'commitMemo',
	});
	const _arr = getGitCmd(commitMemo, pkg);
	for (const v of _arr) {
		shelljs.exec(v);
	}
})();

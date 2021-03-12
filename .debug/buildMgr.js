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
		`git commit -m "(${getDate()})${memo}"`
	];
	if (urlStr) {
		_arr.push(`git push -u origin ${branch}`);
	}
	const missPrivateDef = (typeof pkg.private === undefined);
	const allowPublish = (!missPrivateDef && !pkg.private);
	if (missPrivateDef) {
		console.log('项目的 package.json 未指定 private 字段，若需要提交 NPM，请先配置该字段');
	} else {
		if (allowPublish) {
			_arr.push('npm login');
			_arr.push('npm publish');
		} else {
			console.log('项目的 package.json 中 private 字段已申明为： false，该项目不允许发布到 npm.');
		}
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
	// console.log(_arr);
	for (const v of _arr) {
		shelljs.exec(v);
	}
})();

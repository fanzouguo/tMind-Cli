// @ts-nocheck
const { Tmind } = require('../lib/index');
const inquirer = require('inquirer');

// const x = new Tmind();
/* eslint-disable */
console.clear();
const x = async () => {
	const y = await inquirer.prompt({
		type: 'confirm',
		name: 'needNpm',
		message: '是否禁止发布到 NPM',
		default: 'No',
		prefix: '*****************\n',
		suffix: '\n*****************'
	});
	console.log(y);
};

x();
// console.log('当前运行在 dev:pre 模式下，\n执行的是 JS 脚本\nDone!');

const { tEcho } = require('tmind-core');
const inquirer = require('inquirer');
const questionObj = require('../@question');
const terminate = require('./terminate');

const checkAnswer = str => {
	if (str === 'exit') {
		terminate();
	}
};

let lastKey = '';

/** 执行命令提示
 *
 * @param {*} queKey 待执行命令的键名
 * @param {*} insertExit 是否添加“退出”选项
 * @param {*} insertBack 是否添加“返回”选项
 * @returns
 */
const execer = async (queKey, insertExit = false, insertBack = false) => {
	try {
		let _obj = questionObj[queKey];
		if (_obj) {
			if (_obj.type === 'list') {
				if (insertExit) {
					_obj.choices.push({
						key: 'q',
						name: '退 出\n',
						value: 'exit'
					});
				}
				if (insertBack) {
					_obj.choices.push({
						key: 'z',
						name: '返 回\n',
						value: 'goToBack'
					});
				}
			}
			const res = await inquirer.prompt([_obj]);
			let answerStr = res[_obj.name];
			checkAnswer(answerStr);
			return answerStr;
		} else {
			terminate('代码级异常，交互问答码有误。');
		}
	} catch (err) {
		terminate(err.message);
	}
};

module.exports = execer;

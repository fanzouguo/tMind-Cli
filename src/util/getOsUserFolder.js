const { tEcho } = require('tmind-core');

/** 获取当前操作系统下的用户文件夹
 */
module.exports = () => {
	const str = process.env.HOME || process.env.USERPROFILE || '';
	if (str) {
		return str;
	} else {
		tEcho('基于系统的用户文件夹获取失败', '异常', 'ERR');
		process.exit();
	}
};

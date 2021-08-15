const fs = require('fs-extra');
const path = require('path');
const glob = require('glob-all');
const { tEcho } = require('tmind-core');
// @ts-ignore
const { initEnv } = require('tmind-builder');
const copyExecer = require('../util/cmd/copy');
const terminate = require('../util/terminate');
const shelljs = require('shelljs');

/** 拷贝静态模版文件到目标目录
 * @param {*} pathMgr 路径管理器
 */
const copyStaticFile = async (pathMgr) => {
	try {
		console.error(__filename);
		console.error(__dirname);
		console.error(process.cwd());
		await copyExecer(pathMgr.getPath(__dirname, 'static'), pathMgr.rootPath);
		tEcho('静态文件创建完毕！\n', '静态', 'SUCC');
	} catch (err) {
		throw err;
	}
};

const createSyncFile = async (config, pathMgr) => {
	try {
		const tplArr = fs.readdirSync(pathMgr.getPath(__dirname, 'sync', config.programType, config.tplVer));
		for (const v of tplArr) {
			const getTpl = require(`./sync/${config.programType}/${config.tplVer}/${v}`);
			const data = getTpl(config, pathMgr);
			const fArr = v.replace(/\.js$/, '').split('_');
			// const [fName, fExt] = fArr.pop().split('.');
			const _tp_ = typeof data;
			if (_tp_ === 'object') {
				fs.writeFileSync(pathMgr.getPath(pathMgr.rootPath, ...fArr), JSON.stringify(data, null, 2));
			} else if (_tp_ === 'string') {
				fs.writeFileSync(pathMgr.getPath(pathMgr.rootPath, ...fArr), data);
			} else {
				fs.writeFileSync(pathMgr.getPath(pathMgr.rootPath, ...fArr), `${data}`);
			}
		}
		tEcho('动态文件创建完毕！\n', '静态', 'SUCC');
	} catch (err) {
		const msg = err.code === 'ENOENT' ? `模版文件夹 ${config.programType} - ${config.tplVer} 不存在` : err.message;
		tEcho(msg, '异常', 'ERR');
		terminate();
	}
};

const tplExecer = async (config, pathMgr) => {
	try {
		await copyStaticFile(pathMgr);
		await createSyncFile(config, pathMgr);
		shelljs.cd(pathMgr.rootPath);
		initEnv();
	} catch (err) {
		throw err;
	}
}

module.exports = tplExecer;

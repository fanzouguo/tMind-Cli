const fs = require('fs-extra');
const path = require('path');
const glob = require('glob-all');

const PATH_TPL = 'src/@tpl';
const fmtPath = (pathStr) => pathStr.replace(/\\\\|\\/g, '/');

class PathMgr {
	#basePath = '';
	/** 启动文件（JS或TS）所在的当前路径
	 * @param startPath CLI 命令行的起始工作路径
	 */
	constructor(...startPath) {
		this.#basePath = fmtPath(path.resolve(...startPath));
		this.makePath(this.#basePath);
	}

	/** 当前实例根路径
	 *
	 */
	get rootPath() {
		return this.#basePath;
	}

	/** 当前实例根路径对应的文件夹名称
	 *
	 */
	get rootFolder() {
		return path.parse(this.rootPath).base;
	}

	/** 模版路径
	 */
	get tplPath() {
		return fmtPath(path.resolve(this.#basePath, PATH_TPL));
	}

	/** 模版路径对应的文件夹名称
	 */
	get tplFolder() {
		return path.parse(this.tplPath).base;
	}

	/** 获取本服务实例中所需的地址构造
	 * @param suffix 基于服务实例根地址的其他路径后缀
	 */
	getPath(...suffix) {
		return fmtPath(path.resolve(...suffix));
	}

	/** 确认路径是否存在，如果不存在，则创建
	 * @param pathStr 要判断的路径字符串
	 */
	makePath(pathStr) {
		fs.ensureDir(pathStr);
	}

	/** 判断指定路径的文件是否存在
	 *
	 * @param pathStr 要判断的文件全路径
	 * @returns
	 */
	isExist(pathStr) {
		return !!(glob.sync(pathStr).length);
	}

	/** 调用 nodejs:path的 parse方法
	 *
	 * @param pathStr 要解析的路径
	 * @returns
	 */
	parse(pathStr) {
		return path.parse(pathStr);
	}
}

module.exports = PathMgr;

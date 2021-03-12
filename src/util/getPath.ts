const path = require('path');

const __formatPath__ = (pathStr: string, splitTag: string = '/'): string => pathStr.replace(/\\\\/g, splitTag).replace(/\\/g, splitTag);

/** 获取基于于项目根目录的路径
 *
 * @param sPath 路径片段
 * @returns 路径地址
 */
export const getPath = (...sPath: string[]): string => {
	if (sPath.length) {
		return __formatPath__(path.resolve(__dirname, ...sPath));
	} else {
		return __formatPath__(path.resolve(__dirname));
	}
};

/** 完全依据指定参数获取路径，不含任何默认前缀地址
 *
 * @param sPath 路径片段
 * @returns 路径地址
 */
export const getPathSpec = (...sPath: string[]): string => {
	try {
		if (sPath.length) {
			return __formatPath__(path.join(...sPath));
		} else {
			throw new Error('路径不能为空');
		}
	} catch (err) {
		throw err;
	}
};

/** 获取当前命令行光标所在位置的路径
 *
 * @returns 路径地址
 */
export const getCurrPath = (): string => {
	return __formatPath__(path.resolve('./'));
};

export const formatPath = (pathStr: string, splitTag: string = '/'): string => __formatPath__(pathStr, splitTag);

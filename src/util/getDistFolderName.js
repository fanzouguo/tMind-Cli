/** 获取本地发布文件的文件夹名称
 *
 * @param {*} config 配置管理器
 * @returns
 */
const getDistFolderName = config => {
	return ['lib'].includes(config.programType) ? 'index' : 'app';
};

module.exports = getDistFolderName;
const getTpl = (config, pathMgr) => {
	return `module.exports = {
	// 构建输出的目标文件夹名称
	destDir: '${config.distDirName || 'lib'}'
};
`;
};

module.exports = getTpl;
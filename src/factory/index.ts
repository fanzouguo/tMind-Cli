import getTpl from './getTpl';

const getCliConf = (): ICliConf => {
	return {
		// 版本号
		VER: '',
		// 当前代码作者
		AUTHOR: '',
		// NPM包的根仓库地址
		ROOT_REPO: '',
		// 当前的项目文件夹名称
		NAME_PROJ: '',
		// 当前项目的路径
		PATH_PROJ: '',
		// 当前项目的目标类型
		JS_TYPE: JS_TYPE.UMD,
		// 当前项目关联到 GitHub 远程仓库的地址
		URL_TO_GITHUB: '',
		// 当前项目是否允许发布 NPM
		ALLOW_NPM: false,
		// 当前项目的GIT仓库地址
		REPO_GIT_URL: '',
		SOURCE_TYPE: IsourceType.APP_FEND
	};
};

export {
	getCliConf,
	getTpl
};

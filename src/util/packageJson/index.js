const fs = require('fs-extra');
const path = require('path');
const getDistFolderName = require('../getDistFolderName');

const PKG_FILE_NAME = 'package.json';

/** 获取指定路径下的 package.json 文件
 *
 * @param {*} basePath 要获取的 package.json 文件路径，默认为当前运行路径
 * @returns
 *  filePath package.json 文件的所在路径
 *  file 通过解析 package.json 得到的 json 对象
 *
 */
const getPkg = (basePath = process.cwd()) => {
	const _fPath = path.resolve(basePath, PKG_FILE_NAME);
	return {
		filePath: _fPath,
		file: fs.readJSONSync(_fPath)
	};
};

/** 获取 tmind-core 和 tmind-svr 的最新发布版
 * @param {*} config 配置管理器
 * @returns
 */
const getTmindVer = config => {
	const { file } = getPkg(config.tFrameRoot);
	return {
		tmindCore: file.dependencies['tmind-core'],
		tmindSvr: file.dependencies['tmind-svr'],
	};
};

/** 创建初始化的 package.json 文件
 *
 * @param {*} config 配置管理器
 * @param {*} pathMgr 路径管理器
 */
const getTpl = (config, pathMgr) => {
	const pkgName = `${config.pkgName}`.includes('-') ? config.pkgName : `${config.pkgName}`.splitCamelCase().toLowerCase();
	const distFolderName = getDistFolderName(config);
	let _descStr = config.pkgDesc.upFirst();
	if (!_descStr.endsWith('.') || !_descStr.endsWith('。')) {
		_descStr = `${_descStr}.`;
	}
	const _obj = {
		name: `${pkgName}`,
		version: '1.0.0',
		description: `${_descStr}`,
		private: config.isPrivate,
		main: config.programType === 'lib' ? 'lib/index.js' : 'index.js',
		type: config.pkgType,
		scripts: {
			dev: "node ./.dev/dev.js",
			build: "cross-env NODE_ENV=prod && node ./.dev/index.js"
		},
		author: config.author || '上海深普软件.Co.David',
		license: config.licenseType,
		keywords: [
			'smpoo',
			'tframe',
			'tFrame',
			'smpoo soft',
			'深普',
			'上海深普',
			'上海深普软件',
			config.pkgName.replace('-', ''),
			config.pkgName,
			pkgName
		],
		homepage: config.githubHome || 'www.smpoo.com',
		dependencies: {},
		devDependencies: {
			'@babel/cli': '^7.13.0',
			'@babel/core': '^7.14.6',
			'@types/jest': '^26.0.22',
			'@babel/plugin-external-helpers': '^7.12.13',
			'@babel/plugin-proposal-class-properties': '^7.13.0',
			'@babel/plugin-syntax-dynamic-import': '^7.8.3',
			'@babel/plugin-transform-modules-commonjs': '^7.14.5',
			'@babel/plugin-transform-runtime': '^7.14.5',
			'@babel/preset-env': '^7.14.7',
			'@babel/preset-typescript': '^7.13.0',
			'@babel/register': '^7.14.5',
			'@babel/runtime': '^7.14.6',
			'@babel/runtime-corejs2': '^7.13.9',
			'@typescript-eslint/eslint-plugin': '^4.17.0',
			'@typescript-eslint/parser': '^4.17.0',
			'@types/ws': '^7.4.0',
			'babel-eslint': '^10.1.0',
			'cross-env': '^7.0.3',
			cssnano: "^5.0.7",
			eslint: '~6.8.0',
			gulp: "^4.0.2",
			"gulp-babel": "^8.0.0",
			"gulp-if": "^3.0.0",
			"gulp-notify": "^4.0.0",
			"gulp-rename": "^2.0.0",
			"gulp-size": "^4.0.1",
			"gulp-sourcemaps": "^3.0.0",
			"gulp-uglify": "^3.0.2",
			'eslint-config-airbnb-base': '^14.2.1',
			'eslint-plugin-import': '^2.20.2',
			'eslint-plugin-node': '^11.1.0',
			'eslint-plugin-promise': '^4.2.1',
			'eslint-plugin-standard': '^4.0.0',
			gulp: "^4.0.2",
			nodemon: '^2.0.7',
			rollup: "^2.56.2",
			shx: '^0.3.3',
			terser: '^5.7.1',
			'ts-node': '^9.1.1',
			'tsconfig-paths': '^3.10.1',
			typescript: '~4.2.2'
		},
		createAt: `${config.currDateYMDHMSss}`,
		lastBuild: `${config.currDateYMDHMSss}`
	};

	if (config.programType === 'lib') {
		_obj.types = 'lib/types/index.d.ts';

		if (config.pkgType !== 'commonjs') {
			_obj.module = 'lib/index.esm.js';
		}
	} else if (config.isBendType) {
		_obj.scripts.run = 'cross-env NODE_ENV=prod yarn ./app/index.js';
	}

	if (config.toGitHub) {
		_obj.repository = {
			type: 'git',
			url: config.githubPath
		};
		_obj.bugs = {
			url: config.githubBugs
		};
	}
	const pkgTmind = getTmindVer(config);
	_obj.dependencies['tmind-core'] = pkgTmind.tmindCore;
	if (config.isBendType) {
		_obj.dependencies['iconv-lite'] = '^0.6.3';
		_obj.dependencies['tmind-svr'] = pkgTmind.tmindSvr;
	}
	return _obj;
};

module.exports = getTpl;

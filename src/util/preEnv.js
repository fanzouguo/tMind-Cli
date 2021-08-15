const fs = require('fs-extra');
const path = require('path');
const { tEcho, tDate } = require('tmind-core');
const pkg = require('../../package.json');
const questionExec = require('./questionExec');
const getOsUserFolder = require('./getOsUserFolder');

// @ts-ignore
const getRepoRoot = () => path.resolve(getOsUserFolder(), '.tMind');

/** 当前项目依赖的根仓库路径
 */
const checkRepoRoot = () => {
	try {
		const [a] = fs.readFileSync(getRepoRoot()).toString().split('\n').filter((v) => v.startsWith('ROOT_REPO='));
		const b = a.split('=');
		return !!(b[1]);
	} catch (err) {
		return false;
	}
};

const preEnv = async () => {
	try {
		const _dt_ = tDate();
		const _obj = {
			/** 程序类型
			 */
			programType: '',
			/** 项目所依赖的 tFrame 平台版本号
			 */
			tFrameVer: '',
			/** 要通过脚手架创建的项目的 Github 仓库地址
			 */
			githubPath: '',
			/** 该 Github 项目仓库中对应的 Bugs 提交地址
			 */
			githubBugs: '',
			/** 该 Github 项目仓库中对应的首页地址
			 */
			githubHome: '',
			/** package.json文件中的 name 字段
			 */
			pkgName: '',
			/** 是否将本项目提交到 GitHub
			 */
			toGitHub: true,
			/** 是否将本项目设为私有项目
			 *  若为 Ture，代表私有，不发布到 NPM
			 */
			isPrivate: true,
			/** 是否采用 rollup 打包
			 */
			useRollup: true,
			/** 项目打包类型： commonJs 还是 'module'
			 */
			pkgType: 'module',
			/** 项目的 package.json 文件的描述
			 */
			pkgDesc: '',
			/** 项目作者
			 */
			author: '',
			/** 开源协议类型
			 */
			licenseType: 'MIT',
			/** tFrame 项目全局依赖包根地址
			 *
			 */
			tFrameRoot: '',
			/** 根仓库中 tmind-core 的当前最新版本号
			 */
			tMindCoreVer: '',
			/** 是否属于后端类型项目
			 */
			isBendType: true,
			/** 根仓库中 tmind-svr 的当前最新版本号
			 */
			tMindSvrVer: '',
			/** 当前时间（年月日）
			 */
			currDateYMD: _dt_.format('YYYY-MM-DD'),
			/** 当前时间（年月日时分秒）
			 */
			currDateYMDHMS: _dt_.format('YYYY-MM-DD hh:mi:ss'),
			/** 当前时间（年月日时分秒/毫秒）
			 */
			currDateYMDHMSss: _dt_.format('YYYY-MM-DD hh:mi:ss.ms'),
			/** 本次构建所采用的模版版本号
			 */
			tplVer: '',
			/** 目标生成文件夹名称（dist/lib)
			 */
			distDirName: ''
		};
		if (!checkRepoRoot()) {
			tEcho('tMind-Cli初始化....', 'Step0 - 初始化：', 'INFO');
			const val = `${await questionExec('00000')}`.replace(/\\\\|\\/g, '/');
			if (!val) {
				await preEnv();
			}
			const verTframe = await questionExec('00001');
			fs.writeFileSync(getRepoRoot(), `ROOT_REPO=${val}\nVER_tFrame=${verTframe}\nVER_CLI=${pkg.version}\nAUTHOR=${pkg.author || '上海深普软件.Co.David'}`);
		}
		const confArr = fs.readFileSync(getRepoRoot(), {
			encoding: 'utf-8'
		}).toString().split(/\r\n|\r|\n/);
		for (const v of confArr) {
			const [a, b] = v.split('=');
			if (a === 'ROOT_REPO') {
				if (!b) {
					fs.removeSync(getRepoRoot());
					tEcho('tMind-Cli配置文件有误，请重新运行', 'tMind-Cli初始化异常', 'ERR');
					process.exit();
				}
				_obj.tFrameRoot = b;
				const tCorePkg = fs.readJsonSync(path.resolve(b, 'package.json'));
				_obj.tMindCoreVer = tCorePkg?.dependencies['tmind-core'];
				_obj.tMindSvrVer = tCorePkg?.dependencies['tmind-svr'];
			} else if (a === 'AUTHOR') {
				_obj.author = b;
			} else if (a === 'VER_tFrame') {
				_obj.tFrameVer = b;
			}
		}
		return _obj;
	} catch (err) {
		tEcho(err, 'tMind-Cli初始化异常', 'ERR');
		process.exit();
	}
};

module.exports = preEnv;

const { tClear, tEcho } = require('tmind-core');
const PathMgr = require('./util/PathMgr');
const preEnv = require('./util/preEnv');
const questionExec = require('./util/questionExec');
const preGitUrl = require('./util/git/preGitUrl');
const constVal = require('./constVal');
const cmdExecer = require('./util/cmd/execer');
const tplExecer = require('./@tpl/index');

const start = async (restartMsg = '', msgTile = '') => {
	try {
		tClear();
		if (restartMsg) {
			tEcho(`${restartMsg}\n`, msgTile, 'WARN');
		}

		/** 1、初始化 CLI 配置
		 */
		const confObj = await preEnv();
		const startPath = [process.cwd()];

		/** 2、确认程序类型
		 */
		const PROGRAM_TYPE = await questionExec('10004', true);
		confObj.programType = PROGRAM_TYPE;
		if (PROGRAM_TYPE === 'lib') {
			/** 2-01、是否服务端应用
			 *
			 */
			const END_TYPE = await questionExec('10006');
			confObj.isBendType = !!(END_TYPE === 'SVR_END');
			confObj.pkgType = 'commonjs';

			/** 2-3、是否用 Rollup 打包该项目
			 */
			const USE_ROLLUP = await questionExec('10003');
			confObj.useRollup = !!(USE_ROLLUP == 'Y');
		} else {
			confObj.isBendType = false;
			confObj.pkgType = 'module';
			confObj.useRollup = false;
		}

		/** 3、选择入口路径
		 */
		const ENV_SELECT = await questionExec('10010', true);
		// 当前路径类型
		if (ENV_SELECT === 'currPath') {
			confObj.toGitHub = false;
			confObj.isPrivate = true;
			// 新文件夹类型
		} else if (ENV_SELECT === 'newFolder') {

			/** 3-1、输入新文件夹名称
			 */
			let NEW_FOLDER_NAME = await questionExec('10011');
			startPath.push(NEW_FOLDER_NAME);
			confObj.toGitHub = false;
			confObj.isPrivate = true;

			// GitHub 仓库类型
		} else if (ENV_SELECT === 'gitPath') {
			try {
				/** 3-2、输入 GitHub 仓库地址
				 */
				const GIT_REPO_URL = await questionExec('10012');
				const { author, pjName, url, githubBugs, githubHome } = preGitUrl(GIT_REPO_URL);
				startPath.push(pjName);
				confObj.author = author;
				confObj.githubPath = url;
				confObj.githubBugs = githubBugs;
				confObj.githubHome = githubHome;
				await cmdExecer(`git clone ${GIT_REPO_URL}`);
				confObj.toGitHub = true;

				/** 2-2、是否发布到 NPM
				 */
				const TO_NPM = await questionExec('10002');
				confObj.isPrivate = !(TO_NPM == 'Y');
			} catch (err) {
				start('无效的 Git Hub 仓库地址', '输入无效');
			}
		} else {
			confObj.toGitHub = false;
			confObj.isPrivate = true;
		}
		const currPath = new PathMgr(...startPath);

		const VER_TPL = await questionExec('10013');
		confObj.tplVer = VER_TPL;

		if (!currPath.isExist(currPath.getPath(currPath.rootPath, 'package.json'))) {
			/** 4、输入 package.json 的描述
			 */
			const PKG_DESC = await questionExec('10014');
			confObj.pkgDesc = PKG_DESC || '';
		}

		confObj.distDirName = confObj.pkgType === 'lib' ? 'lib' : 'dist';

		confObj.pkgName = currPath.rootFolder;
		tEcho(currPath.rootPath, '当前操作路径', 'SUCC');
		tEcho(constVal.splitLine1);
		await tplExecer(confObj, currPath);
		// tEcho(confObj);
		tEcho(constVal.splitLine3);
	} catch (err) {
		tEcho(err, '异常', 'ERR');
	}
}

start();

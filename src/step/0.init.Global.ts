import { readJsonSync } from 'fs-extra';
import { getPathSpec, getCurrPath, formatPath } from '../util/getPath';
import { questioner } from '../util/questioner';
import { getEnvCli, setEnvCli } from '../util/getEnv';

export const initGlobal = async (questionItem: IObjQuestion[]): Promise<ICliConf> => {
	const currEnv = await getEnvCli();
	const _obj = currEnv.obj;
	const _arr = currEnv.arr;
	if (!_obj.ROOT_REPO) {
		const _currRepoPath: string = await questioner(questionItem[0]);
		_arr.push(`ROOT_REPO=${formatPath(_currRepoPath)}`);
		_obj.ROOT_REPO = _currRepoPath;
	}
	try {
		const { version } = readJsonSync(getPathSpec(_obj.ROOT_REPO, 'package.json'));
		if (!_obj.VER) {
			_arr.push(`VER=${version}`);
			_obj.VER = version;
		}
		if (!_obj.AUTHOR) {
			const _currAuthor = await questioner(questionItem[1]);
			_arr.push(`AUTHOR=${_currAuthor}`);
		}
		setEnvCli(_arr);
		_obj.PATH_PROJ = getCurrPath();
		console.log(`  tMind-CLI 版本：V${version}
	当前项目依赖的根仓库位置：${_obj.ROOT_REPO}
	当前项目位置：${_obj.PATH_PROJ}
	当前代码作者名称：${_obj.AUTHOR}\n`);
		return _obj;
	} catch (err) {
		console.error('根仓库的 package.json 文件读取失败');
		console.error(err);
		process.exit(1);
	}
};

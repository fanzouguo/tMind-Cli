"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGlobal = void 0;
const fs_extra_1 = require("fs-extra");
const getPath_1 = require("../util/getPath");
const questioner_1 = require("../util/questioner");
const getEnv_1 = require("../util/getEnv");
const initGlobal = async (questionItem) => {
    const currEnv = await getEnv_1.getEnvCli();
    const _obj = currEnv.obj;
    const _arr = currEnv.arr;
    if (!_obj.ROOT_REPO) {
        const _currRepoPath = await questioner_1.questioner(questionItem[0]);
        _arr.push(`ROOT_REPO=${getPath_1.formatPath(_currRepoPath)}`);
        _obj.ROOT_REPO = _currRepoPath;
    }
    try {
        const { version } = fs_extra_1.readJsonSync(getPath_1.getPathSpec(_obj.ROOT_REPO, 'package.json'));
        if (!_obj.VER) {
            _arr.push(`VER=${version}`);
            _obj.VER = version;
        }
        if (!_obj.AUTHOR) {
            const _currAuthor = await questioner_1.questioner(questionItem[1]);
            _arr.push(`AUTHOR=${_currAuthor}`);
        }
        _obj.URL_TO_GITHUB = await questioner_1.questioner(questionItem[2]);
        const _answer3 = await questioner_1.questioner(questionItem[3]);
        _obj.ALLOW_NPM = !_answer3;
        getEnv_1.setEnvCli(_arr);
        _obj.PATH_PROJ = getPath_1.getCurrPath();
        console.log(`  tMind-CLI 版本：V${version}
	当前项目依赖的根仓库位置：${_obj.ROOT_REPO}
	当前项目位置：${_obj.PATH_PROJ}
	当前代码作者名称：${_obj.AUTHOR}\n`);
        return _obj;
    }
    catch (err) {
        console.error('根仓库的 package.json 文件读取失败');
        console.error(err);
        process.exit(1);
    }
};
exports.initGlobal = initGlobal;

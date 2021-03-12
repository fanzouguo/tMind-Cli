"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProject = void 0;
const glob_1 = __importDefault(require("glob"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const questions_1 = __importDefault(require("../questions"));
const fs_extra_2 = require("fs-extra");
const questioner_1 = require("../util/questioner");
const getPath_1 = require("../util/getPath");
const index_1 = require("../template/index");
const getDate_1 = require("../util/getDate");
const shelljs_1 = __importDefault(require("shelljs"));
const initProject = async (cliConf) => {
    const currPjName = await questioner_1.questioner(questions_1.default.qs_03_projName);
    if (currPjName) {
        cliConf.NAME_PROJ = currPjName;
        const { PATH_PROJ } = cliConf;
        const usrPath = process.env.HOME || process.env.USERPROFILE || '';
        fs_extra_1.default.readFileSync(getPath_1.getPathSpec(usrPath, '.tMind'));
        fs_extra_2.ensureDirSync(getPath_1.getPathSpec(PATH_PROJ, currPjName));
        const _pkgArr = glob_1.default.sync(`${getPath_1.getPathSpec(PATH_PROJ, currPjName)}/*`);
        if (!_pkgArr.length) {
            const currSourceType = await questioner_1.questioner(questions_1.default.qs_04_TYPE_SOURCE);
            let currInitType = "OTHER";
            if (currSourceType === "APP_FEND") {
                currInitType = await questioner_1.questioner(questions_1.default.qs_04_INIT_FEND);
            }
            else if (currSourceType === "APP_SVR") {
                currInitType = await questioner_1.questioner(questions_1.default.qs_04_INIT_BEND);
            }
            await index_1.initTpl(cliConf, currSourceType, currInitType);
            shelljs_1.default.cd(currPjName);
            shelljs_1.default.exec('git init');
            shelljs_1.default.exec('git add .');
            shelljs_1.default.exec(`git commit -m "${getDate_1.getFromat('yyyy-mm-dd hh:mi:ss')} create repo."`);
            shelljs_1.default.exec('git branch -M main');
            shelljs_1.default.exec(`git remote add origin git@github.com:fanzouguo/${currPjName}.git`);
            shelljs_1.default.exec('git push origin main');
            return cliConf;
        }
        else {
            console.log(`当前路径下的：${currPjName} 文件夹已被其他项目占用，请更换路径后重试。`);
            process.exit(1);
        }
    }
    else {
        return exports.initProject(cliConf);
    }
};
exports.initProject = initProject;

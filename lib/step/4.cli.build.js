"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuild = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const shelljs_1 = __importDefault(require("shelljs"));
const questioner_1 = require("../util/questioner");
const getDate_1 = require("../util/getDate");
const getPath_1 = require("../util/getPath");
const getAnswer = async (question) => {
    const asw = await questioner_1.questioner(question);
    if (asw) {
        return asw;
    }
    else {
        return getAnswer(question);
    }
};
const runBuild = async (cliConf, questionMemo, questionBranch) => {
    const commitMemo = await getAnswer(questionMemo);
    if (commitMemo) {
        const pkg = fs_extra_1.default.readJsonSync(getPath_1.getPathSpec(getPath_1.getCurrPath(), 'package.json'));
        cliConf.URL_TO_GITHUB = ((pkg && pkg.repository) && pkg.repository.url) || '';
        const cmd = [
            'yarn build',
            'git add .',
            `git commit -m "(${getDate_1.getFromat()})${commitMemo}"`
        ];
        if (cliConf.URL_TO_GITHUB) {
            cmd.push('git push -u origin main');
        }
        for (const v of cmd) {
            await shelljs_1.default.exec(v);
        }
        return '构建完成!';
    }
    else {
        return exports.runBuild(cliConf, questionMemo, questionBranch);
    }
};
exports.runBuild = runBuild;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuild = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const questioner_1 = require("../util/questioner");
const getDate_1 = require("../util/getDate");
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
    const commitBranch = await getAnswer(questionBranch);
    const cmd = [
        'yarn build',
        'git add .',
        `git commit -m '(${getDate_1.getFromat()})${commitMemo}'`,
        `git branch -M ${commitBranch}`
    ];
    if (cliConf.URL_TO_GITHUB) {
        cmd.push(`git remote add origin ${cliConf.URL_TO_GITHUB}`);
        cmd.push('git push -u origin main');
    }
    for (const v of cmd) {
        await shelljs_1.default.exec(v);
    }
    return '构建完成!';
};
exports.runBuild = runBuild;

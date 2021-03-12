"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questioner = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
async function questioner(question, nullAble = false) {
    const qKey = `${question.name}`;
    const asw = await inquirer_1.default.prompt([question]);
    if (qKey === 'selectFunc') {
        const _currKey = `${asw[qKey]}` || '';
        if (_currKey) {
            return _currKey;
        }
        else {
            console.error(new Error('所选项不在可选范围'));
            process.exit(1);
        }
    }
    else if (qKey === 'needNpm') {
        return asw[qKey] ? '' : `${asw[qKey]}`;
    }
    else {
        return `${asw[qKey]}`;
    }
}
exports.questioner = questioner;

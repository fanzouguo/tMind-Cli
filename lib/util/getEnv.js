"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnvCli = exports.getEnvCli = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const index_1 = require("../factory/index");
const getPath_1 = require("./getPath");
const CONF_FILE_NAME = '.tMind';
const __getEnvPath__ = () => {
    const envAddr = process.env.HOME || process.env.USERPROFILE || '';
    if (envAddr) {
        const envPath = getPath_1.getPathSpec(envAddr, CONF_FILE_NAME);
        fs_extra_1.default.ensureFileSync(envPath);
        return envPath;
    }
    else {
        console.error('获取当前操作系统的用户路径出现异常');
        process.exit(1);
    }
};
const getEnvCli = async () => {
    const obj = index_1.getCliConf();
    const envPath = __getEnvPath__();
    const data = fs_extra_1.default.readFileSync(envPath, 'utf-8');
    const lines = data.split(/\r?\n/);
    const arr = [];
    for (const v of lines) {
        const [a, b] = v.split('=');
        if (a && b) {
            obj[`${a}`] = b || '';
            arr.push(`${a}=${b}`);
        }
    }
    return {
        obj,
        arr
    };
};
exports.getEnvCli = getEnvCli;
const setEnvCli = async (data) => {
    try {
        const envPath = __getEnvPath__();
        if (typeof data === 'string') {
            fs_extra_1.default.writeFileSync(envPath, data, 'utf-8');
        }
        else if (Array.isArray(data)) {
            fs_extra_1.default.writeFileSync(envPath, data.join('\n'), 'utf-8');
        }
    }
    catch (err) {
        console.log('系统初始化失败！');
        console.error(err);
        process.exit(1);
    }
};
exports.setEnvCli = setEnvCli;

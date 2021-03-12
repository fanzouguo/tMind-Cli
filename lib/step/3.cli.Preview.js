"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preview = void 0;
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const preview = async () => {
    const cmdPath = path_1.default.resolve(process.cwd(), 'lib', 'nodeCmd', 'dev.Svr.js');
    const resRun = shelljs_1.default.exec(`node ${cmdPath}`);
    console.log(resRun);
    return resRun;
};
exports.preview = preview;

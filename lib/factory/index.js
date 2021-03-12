"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = exports.getCliConf = void 0;
const getTpl_1 = __importDefault(require("./getTpl"));
exports.getTpl = getTpl_1.default;
const getCliConf = () => {
    return {
        VER: '',
        AUTHOR: '',
        ROOT_REPO: '',
        NAME_PROJ: '',
        PATH_PROJ: '',
        JS_TYPE: "UMD",
        URL_TO_GITHUB: '',
        ALLOW_NPM: false,
        REPO_GIT_URL: '',
        SOURCE_TYPE: "APP_FEND"
    };
};
exports.getCliConf = getCliConf;

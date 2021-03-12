"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `import * as testObj from '../src/index';

console.log('当前运行在 dev 模式下，\n执行的是 TS 脚本\nDone!);
`;
};
exports.getTpl = getTpl;

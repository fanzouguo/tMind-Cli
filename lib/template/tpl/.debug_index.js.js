"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `
console.log('当前运行在 dev:pre 模式下，\n执行的是 JS 脚本\nDone!);
`;
};
exports.getTpl = getTpl;

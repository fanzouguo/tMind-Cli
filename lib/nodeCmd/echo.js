"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.echo = void 0;
const color = {
    bold: ['\x1B[1m', '\x1B[22m'],
    blue: ['\x1B[34m', '\x1B[39m'],
    green: ['\x1B[32m', '\x1B[39m'],
    yellow: ['\x1B[33m', '\x1B[39m'],
    red: ['\x1B[31m', '\x1B[39m'],
    blueBG: ['\x1B[44m', '\x1B[49m'],
    greenBG: ['\x1B[42;30m', '\x1B[49m'],
    yellowBG: ['\x1B[43;30m', '\x1B[49m'],
    redBG: ['\x1B[41m', '\x1B[49m'],
    end: ['\x1B[0m']
};
const msgColor = {
    INFO: ['信息', color.blueBG[0], color.blueBG[1], color.blue[0], color.blue[1]],
    SUCC: ['成功', color.greenBG[0], color.greenBG[1], color.green[0], color.green[1]],
    WARN: ['警告', color.yellowBG[0], color.yellowBG[1], color.yellow[0], color.yellow[1]],
    ERR: ['错误', color.redBG[0], color.redBG[1], color.red[0], color.red[1]]
};
const msgFunc = {
    INFO: console.log,
    SUCC: console.log,
    WARN: console.warn,
    ERR: console.error
};
const echo = (msg, title = '', type = "INFO") => {
    const _func = msgFunc[type] || null;
    if (_func && typeof _func === 'function') {
        const [a, b, c, d, e] = msgColor[type] || ['', '', '', '', ''];
        _func(`${b} ${title || a} ${c} ${d} ${msg} ${e}`);
    }
};
exports.echo = echo;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCwd = exports.portOccupy = void 0;
const echo_1 = require("./echo");
const iconv = require('iconv-lite');
const childProcess = require('child_process').exec;
const os = require('os');
const execCwd = (cmd, exitOnUnsupport = true) => {
    return new Promise((resolve, reject) => {
        const encoding = 'cp936';
        const binaryEncoding = 'binary';
        childProcess(cmd, {
            encoding: binaryEncoding
        }, (err, stdout, stderr) => {
            if (err) {
                echo_1.echo(err);
                if (exitOnUnsupport) {
                    process.exit(1);
                }
                else {
                    reject(err);
                }
            }
            else {
                const buff1 = iconv.decode(Buffer.from(stdout), encoding);
                const buff2 = iconv.decode(Buffer.from(stderr), encoding);
                Buffer.from(stderr);
                if (buff2) {
                    reject(buff2);
                }
                else {
                    resolve(buff1 || '');
                }
            }
        });
    });
};
exports.execCwd = execCwd;
const portOccupy = (port, forceClose = true, exitOnUnsupport = true) => {
    return new Promise((resolve, reject) => {
        if (!port) {
            const _errPortNull = '端口不能为空';
            echo_1.echo(_errPortNull, '端口占用检查错误：', "ERR");
            if (forceClose) {
                process.exit(1);
            }
            else {
                reject(new Error(_errPortNull));
            }
        }
        else {
            const _currPlatform = os.platform();
            let _currCmd = '';
            if (_currPlatform === 'win32') {
                _currCmd = `netstat -ano | findstr ${port}`;
            }
            else if (_currPlatform === 'linux' || _currPlatform === 'darwin') {
                _currCmd = `netstat -lnp | grep ${port}`;
            }
            else {
                const _errStr = `当前操作系统：${_currPlatform} 暂不支持该操作`;
                echo_1.echo(_errStr, '未支持的操作', "ERR");
                if (exitOnUnsupport) {
                    process.exit(1);
                }
                else {
                    reject(new Error(_errStr));
                }
            }
            execCwd(_currCmd, exitOnUnsupport).then(resCmd => {
                if (typeof resCmd === 'string') {
                    const _arrProcess = resCmd.split('\r\n');
                    const _arrPid = [];
                    for (const v of _arrProcess) {
                        const _item = v.split(/\s+/g) || [];
                        const _itemId = _item.pop();
                        if (_itemId && (_itemId !== '0') && !_arrPid.includes(_itemId)) {
                            _arrPid.push(_itemId);
                        }
                    }
                    for (const v of _arrPid) {
                        execCwd(`taskkill /f /t /im ${v}`);
                    }
                }
                resolve();
            })
                .catch(err => {
                reject(err);
            });
        }
    });
};
exports.portOccupy = portOccupy;

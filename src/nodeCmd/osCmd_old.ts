import { echo } from './echo';
const iconv = require('iconv-lite');
const childProcess = require('child_process').exec;
const os = require('os');
// const echo = require('./echo');

/** 执行命令行语句
 * @param {*} cmd 要执行的语句
 * @param {*} exitOnUnsupport 若该函数不受当前操作系统支持，是否强制终止应用程序，默认为 TRUE
 */
const execCwd = (cmd: string, exitOnUnsupport = true): Promise<string> => {
  return new Promise((resolve, reject) => {
    const encoding = 'cp936';
    const binaryEncoding: string = 'binary';
    childProcess(cmd, {
      encoding: binaryEncoding
    }, (err: Error, stdout: Uint8Array, stderr: Uint8Array) => {
      if (err) {
        echo(err);
        if (exitOnUnsupport) {
          process.exit(1);
        } else {
          reject(err);
        }
      } else {
        // const buff1 = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding);
        // const buff2 = iconv.decode(Buffer.from(stderr, binaryEncoding), encoding);
        const buff1 = iconv.decode(Buffer.from(stdout), encoding);
        const buff2 = iconv.decode(Buffer.from(stderr), encoding);
        Buffer.from(stderr);
        if (buff2) {
          reject(buff2);
        } else {
          resolve(buff1 || '');
        }
      }
    });
  });
};

/** 查看指定端口的占用情况
 * @param {*} port 要检查的端口
 * @param {*} forceClose 若端口占用中，是否强制结束进程，默认为 TRUE
 * @param {*} exitOnUnsupport 若该函数不受当前操作系统支持，是否强制终止应用程序，默认为 TRUE
 */
const portOccupy = (port: number | string, forceClose = true, exitOnUnsupport = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!port) {
      const _errPortNull = '端口不能为空';
      echo(_errPortNull, '端口占用检查错误：', MSG_TYPE.ERR);
      if (forceClose) {
        process.exit(1);
      } else {
        reject(new Error(_errPortNull));
      }
    } else {
      const _currPlatform = os.platform();
      let _currCmd = '';
      if (_currPlatform === 'win32') {
        _currCmd = `netstat -ano | findstr ${port}`;
      } else if (_currPlatform === 'linux' || _currPlatform === 'darwin') {
        _currCmd = `netstat -lnp | grep ${port}`;
      } else {
        const _errStr = `当前操作系统：${_currPlatform} 暂不支持该操作`;
        echo(_errStr, '未支持的操作', MSG_TYPE.ERR);
        if (exitOnUnsupport) {
          process.exit(1);
        } else {
          reject(new Error(_errStr));
        }
      }
      execCwd(_currCmd, exitOnUnsupport).then(resCmd => {
        if (typeof resCmd === 'string') {
            const _arrProcess = resCmd.split('\r\n');
            const _arrPid: string[] = [];
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

export {
  portOccupy,
  execCwd
};

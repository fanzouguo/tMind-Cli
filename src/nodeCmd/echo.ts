const color: IObj<string[]> = {
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

const msgColor: IObj<string[]> = {
  INFO: ['信息', color.blueBG[0], color.blueBG[1], color.blue[0], color.blue[1]],
  SUCC: ['成功', color.greenBG[0], color.greenBG[1], color.green[0], color.green[1]],
  WARN: ['警告', color.yellowBG[0], color.yellowBG[1], color.yellow[0], color.yellow[1]],
  ERR: ['错误', color.redBG[0], color.redBG[1], color.red[0], color.red[1]]
};

const msgFunc: IObj<unknown> = {
  INFO: console.log, // eslint-disable-line
  SUCC: console.log, // eslint-disable-line
  WARN: console.warn, // eslint-disable-line
  ERR: console.error // eslint-disable-line
};

export const echo = (msg: string | Error, title: string = '', type: MSG_TYPE = MSG_TYPE.INFO): void => {
  const _func = msgFunc[type] || null;
  // const _func = type ? (msgFunc[type] || msgFunc.info) : msgFunc.info;
  if (_func && typeof _func === 'function') {
    // _func(msg);
    const [a, b, c, d, e] = msgColor[type] || ['', '', '', '', ''];
    _func(`${b} ${title || a} ${c} ${d} ${msg} ${e}`);
  }
};

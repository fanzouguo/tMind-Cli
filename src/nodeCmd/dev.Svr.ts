import 'babel-register';
import { echo } from './echo';
import path from 'path';
import http from 'http';
import https from 'https';
import Koa from 'koa';
import server from 'koa-static';
import compress from 'koa-compress';
import { exec } from 'child_process';

// require('babel-register');

const svrCfg = require(path.resolve(process.cwd(), '.conf/.conf.json'));
const app = new Koa();
const addr = svrCfg.addr;
const port = svrCfg.portDev;
const port443 = svrCfg.portDevHttps;

// 打开默认浏览器
const openDefaultBrowser = (url: string): void => {
  switch (process.platform) {
    case 'darwin':
      exec('open ' + url);
      break;
    case 'win32':
      exec('start ' + url);
      break;
    default:
      // exec('xdg-open', [url]);
      exec('start ' + url);
  }
};

// 开启服务端压缩
app.use(compress({
  threshold: 1024
}));

app.use(server(`./${svrCfg.distPath}`));
app.use(server(path.resolve(process.cwd(), 'example', 'index.html')));

app.on('error', (err: Error): void => {
  echo(err, '异常', MSG_TYPE.ERR);
});

https.createServer(app.callback()).listen(port443, () => {
  echo('\n');
  echo(`[本项目的Build文件]，已在 https://${addr}:${port443} 上可访问！`, '成功', MSG_TYPE.SUCC);
});
http.createServer(app.callback()).listen(port, () => {
  echo('\n');
  echo(`[本项目的Build文件]，已在 http://${addr}:${port} 上可访问！`, '成功', MSG_TYPE.SUCC);
  console.log('运行中');
  openDefaultBrowser(`http://${addr}:${port}`);
  // const _pathBase = path.resolve(process.cwd(), 'example', 'report.html');
  // openDefaultBrowser(path.resolve(process.cwd(), 'example', 'report.html'));
});

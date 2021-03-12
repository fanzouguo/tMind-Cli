"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-register");
const echo_1 = require("./echo");
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_compress_1 = __importDefault(require("koa-compress"));
const child_process_1 = require("child_process");
const svrCfg = require(path_1.default.resolve(process.cwd(), '.conf/.conf.json'));
const app = new koa_1.default();
const addr = svrCfg.addr;
const port = svrCfg.portDev;
const port443 = svrCfg.portDevHttps;
const openDefaultBrowser = (url) => {
    switch (process.platform) {
        case 'darwin':
            child_process_1.exec('open ' + url);
            break;
        case 'win32':
            child_process_1.exec('start ' + url);
            break;
        default:
            child_process_1.exec('start ' + url);
    }
};
app.use(koa_compress_1.default({
    threshold: 1024
}));
app.use(koa_static_1.default(`./${svrCfg.distPath}`));
app.use(koa_static_1.default(path_1.default.resolve(process.cwd(), 'example', 'index.html')));
app.on('error', (err) => {
    echo_1.echo(err, '异常', "ERR");
});
https_1.default.createServer(app.callback()).listen(port443, () => {
    echo_1.echo('\n');
    echo_1.echo(`[本项目的Build文件]，已在 https://${addr}:${port443} 上可访问！`, '成功', "SUCC");
});
http_1.default.createServer(app.callback()).listen(port, () => {
    echo_1.echo('\n');
    echo_1.echo(`[本项目的Build文件]，已在 http://${addr}:${port} 上可访问！`, '成功', "SUCC");
    console.log('运行中');
    openDefaultBrowser(`http://${addr}:${port}`);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPath_1 = require("./util/getPath");
const strFix = '-------------------------------------------------------------';
const quesOpt = {
    qs_01_optRepo: {
        type: 'input',
        name: 'rootRepo',
        message: '请指定根仓库位置：',
        validate: (val) => val ? getPath_1.formatPath(val) : '根仓库位置不能为空'
    },
    qs_01_optAuthor: {
        type: 'input',
        name: 'rootAuthor',
        message: '请指定开发者（中文或英文）名称，用于所有的 author 字段：',
        validate: (val) => val ? `上海深普软件.Co.${val}` : '开发者名称不能为空，您可以输入中文或英文'
    },
    qs_02_optFunctional: {
        type: 'list',
        name: 'selectFunc',
        message: ' 请选择功能\n\n  ',
        default: "INIT",
        prefix: '\n',
        suffix: strFix,
        choices: [
            {
                name: '脚手架',
                value: "INIT"
            },
            {
                name: '调试',
                value: "DEBUG"
            },
            {
                name: '发布预览',
                value: "PREVIEW"
            },
            {
                name: '背景图试用',
                value: "BACKGROUND_PIC"
            },
            {
                name: '构建',
                value: "BUILD"
            },
            {
                name: '开发助理',
                value: "HELPER"
            }
        ],
        pageSize: 20
    },
    qs_03_projName: {
        type: 'input',
        name: 'pjName',
        message: '请输入项目名称：'
    },
    qs_04_TYPE_SOURCE: {
        type: 'list',
        name: 'typeSource',
        message: ' 请选择源码类型\n  ',
        default: "APP_FEND",
        prefix: '\n',
        suffix: strFix,
        choices: [
            {
                name: '前端应用',
                value: "APP_FEND"
            },
            {
                name: '后端应用',
                value: "APP_SVR"
            },
            {
                name: '浏览器端组件',
                value: "LIB_BROWSER"
            },
            {
                name: '服务端组件',
                value: "LIB_CJS"
            },
            {
                name: '前后端共用组件',
                value: "LIB_UMD"
            },
            {
                name: 'UI 组件',
                value: "UI_COMPONENT"
            }
        ]
    },
    qs_04_INIT_FEND: {
        type: 'list',
        name: 'initFend',
        message: ' 请选择前端类型\n  ',
        default: "MPA",
        prefix: '\n',
        suffix: strFix,
        choices: [
            {
                name: 'PC端多页应用（基于VUE 3)',
                value: "MPA"
            },
            {
                name: 'PC端单页页应用（基于VUE 3)',
                value: "SPA"
            },
            {
                name: 'Electron-VUE 应用',
                value: "EVA"
            },
            {
                name: 'Cordova-VUE 应用',
                value: "CVA"
            },
            {
                name: 'React Native + VUE 应用',
                value: "RNA"
            },
            {
                name: '微信小程序',
                value: "WXA"
            },
            {
                name: '飞书应用',
                value: "FSA"
            },
            {
                name: '钉钉应用',
                value: "DTA"
            }
        ]
    },
    qs_04_INIT_BEND: {
        type: 'list',
        name: 'initBend',
        message: ' 请选择后端类型\n  ',
        default: "BIZ",
        prefix: '\n',
        suffix: strFix,
        choices: [
            {
                name: '基础业务服务端',
                value: "BIZ"
            },
            {
                name: '文件上传服务端',
                value: "FILE"
            },
            {
                name: '日志服务端',
                value: "LOGGER"
            },
            {
                name: 'WEB_SOCKET服务端',
                value: "WEBSOCKET"
            },
            {
                name: 'PC端服务端渲染应用（基于VUE 3)',
                value: "SSR"
            }
        ]
    },
    qs_06_commitMemo: {
        type: 'editor',
        name: 'commitMemo',
        message: '请输入Git Commit 备注：',
        validate: (val) => val || 'GIT提交备注不能为空'
    },
    qs_06_commitBranch: {
        type: 'input',
        name: 'commitBranch',
        default: 'main',
        message: '请输入Git 分支（默认为 main）：',
        validate: (val) => val || 'main'
    },
    qs_10_HELP_LIST: {
        type: 'list',
        name: 'selectHelper',
        message: '请选择帮助类型',
        default: "METHODS",
        prefix: '*****************\n',
        suffix: '\n*****************',
        choices: [
            {
                name: '函数方法',
                value: "METHODS"
            },
            {
                name: '资源文档列表',
                value: "RESOURCE_DOC"
            }
        ]
    }
};
exports.default = quesOpt;

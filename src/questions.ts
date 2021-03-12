import { formatPath } from './util/getPath';

const strFix = '-------------------------------------------------------------';

const quesOpt: IObj<IObjQuestion> = {
  // 当配置文件 .tmind 不存在时，手工输入根仓库位置
  qs_01_optRepo: {
    type: 'input',
    name: 'rootRepo',
    message: '请指定根仓库位置：',
    validate: (val: string): string => val ? formatPath(val) : '根仓库位置不能为空'
  },
  // 当配置文件 .tmind 中不存在开发者名称时，手工输入
  qs_01_optAuthor: {
    type: 'input',
    name: 'rootAuthor',
    message: '请指定开发者（中文或英文）名称，用于所有的 author 字段：',
    validate: (val: string): string => val ? `上海深普软件.Co.${val}` : '开发者名称不能为空，您可以输入中文或英文'
  },
  // 选择功能
  qs_02_optFunctional: {
    type: 'list',
    name: 'selectFunc',
    message: ' 请选择功能\n\n  ',
    default: CLI_FUNCTIONAL.INIT,
    prefix: '\n',
    suffix: strFix,
    choices: [
      {
        name: '脚手架',
        value: CLI_FUNCTIONAL.INIT
      },
      {
        name: '调试',
        value: CLI_FUNCTIONAL.DEBUG
      },
      {
        name: '发布预览',
        value: CLI_FUNCTIONAL.PREVIEW
      },
      {
        name: '背景图试用',
        value: CLI_FUNCTIONAL.BACKGROUND_PIC
      },
      {
        name: '构建',
        value: CLI_FUNCTIONAL.BUILD
      },
      {
        name: '开发助理',
        value: CLI_FUNCTIONAL.HELPER
      }
    ],
    pageSize: 20
  },
  // 输入项目名称
  qs_03_projName: {
    type: 'input',
    name: 'pjName',
    message: '请输入项目名称：'
  },
  // 选择项目类型
  qs_04_TYPE_SOURCE: {
    type: 'list',
    name: 'typeSource',
    message: ' 请选择源码类型\n  ',
    default: IsourceType.APP_FEND,
    prefix: '\n',
    suffix: strFix,
    choices: [
      {
        name: '前端应用',
        value: IsourceType.APP_FEND
      },
      {
        name: '后端应用',
        value: IsourceType.APP_SVR
      },
      {
        name: '浏览器端组件',
        value: IsourceType.LIB_BROWSER
      },
      {
        name: '服务端组件',
        value: IsourceType.LIB_CJS
      },
      {
        name: '前后端共用组件',
        value: IsourceType.LIB_UMD
      },
      {
        name: 'UI 组件',
        value: IsourceType.UI_COMPONENT
      }
    ]
  },
  // 选择前端类型
  qs_04_INIT_FEND: {
    type: 'list',
    name: 'initFend',
    message: ' 请选择前端类型\n  ',
    default: IinitTypeFend.MPA,
    prefix: '\n',
    suffix: strFix,
    choices: [
      {
        name: 'PC端多页应用（基于VUE 3)',
        value: IinitTypeFend.MPA
      },
      {
        name: 'PC端单页页应用（基于VUE 3)',
        value: IinitTypeFend.SPA
      },
      {
        name: 'Electron-VUE 应用',
        value: IinitTypeFend.EVA
      },
      {
        name: 'Cordova-VUE 应用',
        value: IinitTypeFend.CVA
      },
      {
        name: 'React Native + VUE 应用',
        value: IinitTypeFend.RNA
      },
      {
        name: '微信小程序',
        value: IinitTypeFend.WXA
      },
      {
        name: '飞书应用',
        value: IinitTypeFend.FSA
      },
      {
        name: '钉钉应用',
        value: IinitTypeFend.DTA
      }
    ]
  },
  // 选择后端类型
  qs_04_INIT_BEND: {
    type: 'list',
    name: 'initBend',
    message: ' 请选择后端类型\n  ',
    default: IinitTypeBend.BIZ,
    prefix: '\n',
    suffix: strFix,
    choices: [
      {
        name: '基础业务服务端',
        value: IinitTypeBend.BIZ
      },
      {
        name: '文件上传服务端',
        value: IinitTypeBend.FILE
      },
      {
        name: '日志服务端',
        value: IinitTypeBend.LOGGER
      },
      {
        name: 'WEB_SOCKET服务端',
        value: IinitTypeBend.WEBSOCKET
      },
      {
        name: 'PC端服务端渲染应用（基于VUE 3)',
        value: IinitTypeBend.SSR
      }
    ]
  },
  // 输入GIT 提交备注
  qs_06_commitMemo: {
    type: 'input',
    name: 'commitMemo',
    message: '请输入Git Commit 备注：'
  },
  // 输入GIT分支
  qs_06_commitBranch: {
    type: 'input',
    name: 'commitBranch',
    default: 'main',
    message: '请输入Git 分支（默认为 main）：'
  },
  qs_10_HELP_LIST: {
    type: 'list',
    name: 'selectHelper',
    message: '请选择帮助类型',
    default: CLI_HELPER_LIST.METHODS,
    prefix: '*****************\n',
    suffix: '\n*****************',
    choices: [
      {
        name: '函数方法',
        value: CLI_HELPER_LIST.METHODS
      },
      {
        name: '资源文档列表',
        value: CLI_HELPER_LIST.RESOURCE_DOC
      }
    ]
  }
};

export default quesOpt;

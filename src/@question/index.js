const constVal = require('../constVal');
const listPageSize = 20;

// 注意！list 类型的子项中，key 要避开 q （对应 exit） 和 g （对应 goToBack）
const _obj = {
	// 工作区根仓库的完整路径
	'00000': {
		type: 'input',
		message: '请输入工作区根仓库的完整路径',
		name: 'ROOT_REPO',
		validate(val) {
			if (val) {
				return val;
			}
			return '路径名称不能为空';
		}
	},
	// 当前的 tFrame 平台版本号
	'00001': {
		type: 'number',
		message: '请输入当前的 tFrame 平台版本号',
		name: 'VER_TFRAME'
	},
	// 是否发布到 NPM
	'10002': {
		type: 'list',
		name: 'TO_NPM',
		message: `该项目是否发布到 NPM：${constVal.splitLine4}`,
		choices: [
			{
				key: 'y',
				name: '发布到 NPM\n',
				value: 'Y'
			},
			{
				key: 'n',
				name: '不发布\n',
				value: 'N'
			}
		]
	},
	// 是否用 Rollup 打包
	'10003': {
		type: 'list',
		name: 'USE_ROLLUP',
		message: `是否用 Rollup 打包该项目：${constVal.splitLine4}`,
		choices: [
			{
				key: 'y',
				name: '需要打包\n',
				value: 'Y'
			},
			{
				key: 'n',
				name: '不打包\n',
				value: 'N'
			}
		]
	},
	// 应用类型
	'10004': {
		type: 'list',
		name: 'PROGRAM_TYPE',
		message: `请选择应用类型：${constVal.splitLine4}`,
		choices: [
			{
				key: 'l',
				name: '类库\n',
				value: 'lib'
			},
			{
				key: 's',
				name: '服务端应用\n',
				value: 'svr'
			},
			{
				key: 'p',
				name: 'PC端网页应用\n',
				value: 'pc'
			},
			{
				key: 'e',
				name: 'Electron应用\n',
				value: 'electron'
			},
			{
				key: 'c',
				name: 'Cordova应用\n',
				value: 'cordova'
			},
			{
				key: 'w',
				name: '微信小程序\n',
				value: 'weichat'
			},
			{
				key: 'f',
				name: '飞书应用\n',
				value: 'feishu'
			},
			{
				key: 'd',
				name: '钉钉应用\n',
				value: 'dingtalk'
			},
			{
				key: 'y',
				name: '企业微信应用\n',
				value: 'eWeichat'
			}
		],
		pageSize: listPageSize
	},
	// 授权类型
	'10005': {
		type: 'input',
		message: '授权类型',
		name: 'LICENSE_TYPE',
		default: 'MIT'
	},
	// 类库适配类型
	'10006': {
		type: 'list',
		name: 'END_TYPE',
		message: `类库适配类型：${constVal.splitLine4}`,
		choices: [
			{
				key: 's',
				name: '服务端\n',
				value: 'SVR_END'
			},
			{
				key: 'b',
				name: '前后端共用\n',
				value: 'BOTH_END'
			},
			{
				key: 'f',
				name: '前端\n',
				value: 'FRONT_END'
			}
		],
		pageSize: listPageSize
	},
	// 后续操作的路径类型
	'10010': {
		type: 'list',
		name: 'ENV_SELECT',
		message: `请选择后续操作的路径类型：${constVal.splitLine4}`,
		choices: [
			{
				key: 'f',
				name: '当前路径下的新文件夹\n',
				value: 'newFolder'
			},
			{
				key: 'g',
				name: 'Github克隆\n',
				value: 'gitPath'
			},
			{
				key: 'c',
				name: '当前路径\n',
				value: 'currPath'
			}
		],
		pageSize: listPageSize
	},
	// 新文件夹名称
	'10011': {
		type: 'input',
		message: '新文件夹名称：',
		name: 'NEW_FOLDER_NAME',
		validate(val) {
			if (!val) {
				return '文件夹名称不能为空';
			}
			return true;
		}
	},
	// GIT HUB 仓库路径
	'10012': {
		type: 'input',
		message: 'GIT HUB 仓库路径：',
		name: 'GIT_REPO_URL'
	},
	// 模版版本号
	'10013': {
		type: 'list',
		name: 'VER_TPL',
		message: `模版版本号：${constVal.splitLine4}`,
		choices: [
			{
				key: 'a',
				name: 'v9.0\n',
				value: 'v9.0'
			},
			{
				key: 'b',
				name: 'V8.0\n',
				value: 'v8.0'
			}
		],
		pageSize: listPageSize
	},
	// 项目描述
	'10014': {
		type: 'input',
		message: '请输入项目描述（package.json - description）：',
		name: 'PKG_DESC'
	}
};

module.exports = _obj;

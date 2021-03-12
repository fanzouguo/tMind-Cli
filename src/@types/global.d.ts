/* eslint-disable no-unused-vars */
declare global {
	// 日志信息枚举
	declare const enum MSG_TYPE {
		INFO = 'INFO',
		SUCC = 'SUCC',
		WARN = 'WARN',
		ERR = 'ERR'
	}

	declare const enum JS_TYPE {
		ESNEXT = 'ESNEXT',
		CJS = 'CJS',
		AMD = 'AMD',
		UMD = 'UMD',
		SYSTEM = 'SYSTEM',
		NONE = 'NONE'
	}

	// CLI功能列表
	declare const enum CLI_FUNCTIONAL {
		// 脚手架
		INIT = 'INIT',
		// 调试
		DEBUG = 'DEBUG',
		// 发布预览
		PREVIEW = 'PREVIEW',
		// 背景图试用
		BACKGROUND_PIC = 'BACKGROUND_PIC',
		// 构建
		BUILD = 'BUILD',
		// 开发助手
		HELPER = 'HELPER',
		// 退出
		EXIT = 'EXIT'
	}

	// 源码类型
	declare const enum IsourceType {
		// 前端应用
		APP_FEND = 'APP_FEND',
		// 后端应用
		APP_SVR = 'APP_SVR',
		// 浏览器端组件
		LIB_BROWSER = 'LIB_BROWSER',
		// 服务端组件
		LIB_CJS = 'LIB_CJS',
		// 前后端共用组件
		LIB_UMD = 'LIB_UMD',
		// UI 组件
		UI_COMPONENT = 'UI_COMPONENT'
	}

	// 前端项目初始化类型
	declare const enum IinitTypeFend {
		// Cordova-VUE 应用
		CVA = 'CVA',
		// 钉钉应用
		DTA = 'DTA',
		// Electron-VUE 应用
		EVA = 'EVA',
		// 飞书应用
		FSA = 'FSA',
		// PC端多页应用（基于VUE 3)
		MPA = 'MPA',
		// React Native + VUE 应用
		RNA = 'RNA',
		// PC端单页页应用（基于VUE 3)
		SPA = 'SPA',
		// 微信小程序
		WXA = 'WXA'
	}

	// 后端项目初始化类型
	declare const enum IinitTypeBend {
		// 基础业务服务端
		BIZ = 'BIZ',
		// 文件上传服务端
		FILE = 'FILE',
		// 日志服务端
		LOGGER = 'LOGGER',
		// WEB_SOCKET服务端
		WEBSOCKET = 'WEBSOCKET',
		// PC端服务端渲染应用（基于VUE 3)
		SSR = 'SSR',
	}

	declare const enum IinitTypeOther {
		OTHER = 'OTHER'
	}

	// CLI助手列表
	declare const enum CLI_HELPER_LIST {
		METHODS = 'METHODS',
		RESOURCE_DOC = 'RESOURCE_DOC'
	}

	declare interface IObj<T> {
		[index: string]: T;
	}

	interface IObjKv {
		[index: string]: string;
	}

	declare interface IOBJT<T> {
		[index: string]: T[keyof T];
	}

	declare interface IOBJT<T, B> {
		[index: keyof T]: B;
	}

	// 可作为日期传参的类型
	declare type dateLike = string | number | Date | null | undefined | false;
	// 可作为 Boolean 传参的类型
	declare type boolLike = boolean | string | number | null | undefined;
	// 函数或类函数类型
	declare type funcLike = funcLike | Promise<unknown> | unknown;

	declare type QuestAnswer = Promise<string | keyof CLI_FUNCTIONAL>

	declare type InitType = IsourceType | IinitTypeFend | IinitTypeBend | IinitTypeOther;

	declare interface IObjQuestion {
		type: string;
		name: string;
		message: string | funcLike;
		default?: string | keyof CLI_FUNCTIONAL;
		prefix?: string;
		suffix?: string;
		choices?: string[] | IObjKv[];
		validate?: funcLike;
		filter?: funcLike;
		transformer?: funcLike;
		when?: funcLike;
		pageSize?: number;
	}

	declare interface IAnswer {
		[index: string]: keyof CLI_FUNCTIONAL | string;
	}

	declare interface ICliConf {
		// 版本号
		VER: string;
		// 当前代码作者
		AUTHOR: string
		// NPM包的根仓库地址
		ROOT_REPO: string;
		// 当前的项目文件夹名称
		NAME_PROJ: string;
		// 当前项目的路径
		PATH_PROJ: string;
		// 当前项目的目标类型
		JS_TYPE: JS_TYPE;
		// 当前项目关联到 GitHub 远程仓库的地址
		URL_TO_GITHUB: string;
		// 当前项目是否允许发布 NPM
		ALLOW_NPM: boolean;
		// 当前项目的GIT仓库地址
		REPO_GIT_URL: string;
		// 源码类型
		SOURCE_TYPE?: IsourceType;
		[index: string]: string | boolean;
	}

	declare type dealFuncType = keyof CLI_FUNCTIONAL;

	declare interface IdealFunc {
		// 脚手架
		INIT: funcLike;
		// 调试
		DEBUG: funcLike;
		// 发布预览
		PREVIEW: funcLike;
		// 背景图试用
		BACKGROUND_PIC: funcLike;
		// 构建
		BUILD: funcLike;
		// 开发助手
		HELPER: funcLike;
		// 退出
		EXIT: funcLike;
		[index: string]: unknown;
	}
}

export = global;

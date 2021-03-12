"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `export {};

declare global {
	// 全局泛型对象接口
	interface IObj<T> {
		[index: string]: T;
	};

	// 全局字典接口
	interface IObjKv {
		[index: string]: string;
	};

	// 全局泛型索引限定的对象接口
	interface IOBJT<T> {
		[index: keyof T]: T;
	};
}
`;
};
exports.getTpl = getTpl;

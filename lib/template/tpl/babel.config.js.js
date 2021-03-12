"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset'
	],
	plugins: ['@babel/plugin-syntax-dynamic-import']
};
`;
};
exports.getTpl = getTpl;

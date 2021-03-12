"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
		transform: {
			'^.+\\.vue$': 'vue-jest'
	}
};
`;
};
exports.getTpl = getTpl;

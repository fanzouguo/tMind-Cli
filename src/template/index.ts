import fs from 'fs-extra';
import path from 'path';
import * as debug_index_js from './tpl/.debug_index.js';
import * as debug_index_ts from './tpl/.debug_index.ts';
import * as debug_preBuild_js from './tpl/.debug_preBuild.js';
import * as debug_postBuild_js from './tpl/.debug_postBuild.js';
import * as editorconfig from './tpl/.editorconfig';
import * as eslintignore from './tpl/.eslintignore';
import * as eslintrc_js from './tpl/.eslintrc.js';
import * as gitignore from './tpl/.gitignore';
import * as npmignore from './tpl/.npmignore';
import * as vscode_launch_json from './tpl/.vscode_launch.json';
import * as vscode_settings_json from './tpl/.vscode_settings.json';
import * as babel_config_js from './tpl/babel.config.js';
import * as cypress_json from './tpl/cypress.json';
import * as example_index_html from './tpl/example_index.html';
import * as example_index_js from './tpl/example_index.js';
import * as jest_config_js from './tpl/jest.config.js';
import * as LICENSE from './tpl/LICENSE';
import * as package_json from './tpl/package.json';
import * as README_md from './tpl/README.md';
import * as rollup_config_js from './tpl/rollup.config.js';
import * as src_factory_index_ts from './tpl/src_factory_index.ts';
import * as src_types_global_d_ts from './tpl/src_@types_global.d.ts';
import * as src_index_ts from './tpl/src_index.ts';
import * as src_util_index_ts from './tpl/src_util_index.ts';
import * as tsconfig_json from './tpl/tsconfig.json';
import * as tsconfig_build_json from './tpl/tsconfig.build.json';
import * as vue_config_js from './tpl/vue.config.js';

interface ItplTask {
	fName: string,
	fullPath?: string,
	getTpl: (conf: ICliConf) => string
}

const tplTask: ItplTask[] = [
	{ fName: '.debug_index.js', getTpl: debug_index_js.getTpl },
	{ fName: '.debug_index.ts', getTpl: debug_index_ts.getTpl },
	{ fName: '.debug_preBuild.js', getTpl: debug_preBuild_js.getTpl },
	{ fName: '.debug_postBuild.js', getTpl: debug_postBuild_js.getTpl },
	{ fName: '.editorconfig', getTpl: editorconfig.getTpl },
	{ fName: '.eslintignore', getTpl: eslintignore.getTpl },
	{ fName: '.eslintrc.js', getTpl: eslintrc_js.getTpl },
	{ fName: '.gitignore', getTpl: gitignore.getTpl },
	{ fName: '.npmignore', getTpl: npmignore.getTpl },
	{ fName: '.vscode_launch.json', getTpl: vscode_launch_json.getTpl },
	{ fName: '.vscode_settings.json', getTpl: vscode_settings_json.getTpl },
	{ fName: 'babel.config.js', getTpl: babel_config_js.getTpl },
	{ fName: 'cypress.json', getTpl: cypress_json.getTpl },
	{ fName: 'example_index.html', getTpl: example_index_html.getTpl },
	{ fName: 'example_index.js', getTpl: example_index_js.getTpl },
	{ fName: 'jest.config.js', getTpl: jest_config_js.getTpl },
	{ fName: 'LICENSE', getTpl: LICENSE.getTpl },
	{ fName: 'package.json', getTpl: package_json.getTpl },
	{ fName: 'README.md', getTpl: README_md.getTpl },
	{ fName: 'rollup.config.js', getTpl: rollup_config_js.getTpl },
	{ fName: 'src_@types_global.d.ts', getTpl: src_types_global_d_ts.getTpl },
	{ fName: 'src_factory_index.ts', getTpl: src_factory_index_ts.getTpl },
	{ fName: 'src_index.ts', getTpl: src_index_ts.getTpl },
	{ fName: 'src_util_index.ts', getTpl: src_util_index_ts.getTpl },
	{ fName: 'tsconfig.json', getTpl: tsconfig_json.getTpl },
	{ fName: 'tsconfig.build.json', getTpl: tsconfig_build_json.getTpl },
	{ fName: 'vue.config.js.ts', getTpl: vue_config_js.getTpl }
];

// 文件排除列表
const tplTaskExclude: IObj<string[]> = {
	// 前端应用
	APP_FEND: ['rollup.config.js'],
	// 后端应用
	APP_SVR: ['example_index.html', 'vue.config.js'],
	// 浏览器端组件
	LIB_BROWSER: ['rollup.config.js'],
	// 服务端组件
	LIB_CJS: ['example_index.html', 'vue.config.js'],
	// 前后端共用组件
	LIB_UMD: ['rollup.config.js'],
	// UI 组件
	UI_COMPONENT: ['rollup.config.js']
};

const wtF = (fPath: string, txt: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fPath, txt, err => {
			if (err) {
				reject(err);
			} else {
				resolve('Done');
			}
		});
	});
};

export const initTpl = async (cliConf: ICliConf, sourceType: string, initType: string): Promise<void> => {
	const _baseAddr: string[] = [cliConf.PATH_PROJ, cliConf.NAME_PROJ];
	const _arrDir: string[] = [];
	const currTask: ItplTask[] = [];
	for (const v of tplTask) {
		if (!tplTaskExclude[sourceType].includes(v.fName)) {
			const _arrFname = v.fName.split('_');
			if (_arrFname.length) {
				v.fName = _arrFname.pop() || '';
				v.fullPath = path.resolve(..._baseAddr, ..._arrFname, v.fName);
				currTask.push(v);
				_arrDir.push([..._baseAddr, ..._arrFname].join('/'));
			}
		}
	}
	const _arrEnsure: string[] = Array.from(new Set(_arrDir));
	for (const v of _arrEnsure) {
		fs.ensureDirSync(v);
	}
	await Promise.all(currTask.map(v => {
		const _strTpl = v.getTpl(cliConf);
		return v.fullPath ? wtF(v.fullPath, _strTpl) : Promise.resolve('Done!');
	}));
};

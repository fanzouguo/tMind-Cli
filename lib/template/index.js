"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTpl = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const debug_index_js = __importStar(require("./tpl/.debug_index.js"));
const debug_index_ts = __importStar(require("./tpl/.debug_index.ts"));
const debug_preBuild_js = __importStar(require("./tpl/.debug_preBuild.js"));
const debug_postBuild_js = __importStar(require("./tpl/.debug_postBuild.js"));
const editorconfig = __importStar(require("./tpl/.editorconfig"));
const eslintignore = __importStar(require("./tpl/.eslintignore"));
const eslintrc_js = __importStar(require("./tpl/.eslintrc.js"));
const gitignore = __importStar(require("./tpl/.gitignore"));
const npmignore = __importStar(require("./tpl/.npmignore"));
const vscode_launch_json = __importStar(require("./tpl/.vscode_launch.json"));
const vscode_settings_json = __importStar(require("./tpl/.vscode_settings.json"));
const babel_config_js = __importStar(require("./tpl/babel.config.js"));
const cypress_json = __importStar(require("./tpl/cypress.json"));
const example_index_html = __importStar(require("./tpl/example_index.html"));
const example_index_js = __importStar(require("./tpl/example_index.js"));
const jest_config_js = __importStar(require("./tpl/jest.config.js"));
const LICENSE = __importStar(require("./tpl/LICENSE"));
const package_json = __importStar(require("./tpl/package.json"));
const README_md = __importStar(require("./tpl/README.md"));
const rollup_config_js = __importStar(require("./tpl/rollup.config.js"));
const src_factory_index_ts = __importStar(require("./tpl/src_factory_index.ts"));
const src_types_global_d_ts = __importStar(require("./tpl/src_@types_global.d.ts"));
const src_index_ts = __importStar(require("./tpl/src_index.ts"));
const src_util_index_ts = __importStar(require("./tpl/src_util_index.ts"));
const tsconfig_json = __importStar(require("./tpl/tsconfig.json"));
const tsconfig_build_json = __importStar(require("./tpl/tsconfig.build.json"));
const vue_config_js = __importStar(require("./tpl/vue.config.js"));
const tplTask = [
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
const tplTaskExclude = {
    APP_FEND: ['rollup.config.js'],
    APP_SVR: ['example_index.html', 'vue.config.js'],
    LIB_BROWSER: ['rollup.config.js'],
    LIB_CJS: ['example_index.html', 'vue.config.js'],
    LIB_UMD: ['rollup.config.js'],
    UI_COMPONENT: ['rollup.config.js']
};
const wtF = (fPath, txt) => {
    return new Promise((resolve, reject) => {
        fs_extra_1.default.writeFile(fPath, txt, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Done');
            }
        });
    });
};
const initTpl = async (cliConf, sourceType, initType) => {
    const _baseAddr = [cliConf.PATH_PROJ, cliConf.NAME_PROJ];
    const _arrDir = [];
    const currTask = [];
    for (const v of tplTask) {
        if (!tplTaskExclude[sourceType].includes(v.fName)) {
            const _arrFname = v.fName.split('_');
            if (_arrFname.length) {
                v.fName = _arrFname.pop() || '';
                v.fullPath = path_1.default.resolve(..._baseAddr, ..._arrFname, v.fName);
                currTask.push(v);
                _arrDir.push([..._baseAddr, ..._arrFname].join('/'));
            }
        }
    }
    const _arrEnsure = Array.from(new Set(_arrDir));
    for (const v of _arrEnsure) {
        fs_extra_1.default.ensureDirSync(v);
    }
    await Promise.all(currTask.map(v => {
        const _strTpl = v.getTpl(cliConf);
        return v.fullPath ? wtF(v.fullPath, _strTpl) : Promise.resolve('Done!');
    }));
};
exports.initTpl = initTpl;

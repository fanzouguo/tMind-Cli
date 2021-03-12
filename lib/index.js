"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tmind = void 0;
const questioner_1 = require("./util/questioner");
const _0_init_Global_1 = require("./step/0.init.Global");
const questions_1 = __importDefault(require("./questions"));
const _1_cli_Scaffold_1 = require("./step/1.cli.Scaffold");
const _3_cli_Preview_1 = require("./step/3.cli.Preview");
const _4_cli_build_1 = require("./step/4.cli.build");
const index_1 = require("./factory/index");
const emptyFunc = async () => {
    console.log('暂未实现');
};
class Tmind {
    constructor() {
        this.cliConf = index_1.getCliConf();
        this.init = async () => {
            console.clear();
            this.cliConf = await _0_init_Global_1.initGlobal([questions_1.default.qs_01_optRepo, questions_1.default.qs_01_optAuthor]);
            const anSwer = await questioner_1.questioner(questions_1.default.qs_02_optFunctional);
            if (anSwer === "INIT") {
                _1_cli_Scaffold_1.initProject(this.cliConf);
            }
            else if (anSwer === "BUILD") {
                _4_cli_build_1.runBuild(this.cliConf, questions_1.default.qs_06_commitMemo, questions_1.default.qs_06_commitBranch);
            }
            else if (anSwer === "PREVIEW") {
                _3_cli_Preview_1.preview();
            }
            else {
                emptyFunc();
            }
        };
        this.init();
    }
}
exports.Tmind = Tmind;

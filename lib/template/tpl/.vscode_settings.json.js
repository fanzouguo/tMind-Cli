"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `{
	"javascript.suggest.autoImports": false,
	"typescript.suggest.autoImports": false,
	"vetur.completion.autoImport": false,
	"prettier.singleQuote": true,
	"eslint.validate": [
		"javascript",
		"vue",
		"html",
		"typescript"
	],
  "typescript.tsdk": "%YARN_Typescript_Lib%"
}
`;
};
exports.getTpl = getTpl;

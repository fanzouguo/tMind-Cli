export const getTpl = (cliConf: any): string => {
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

export const getTpl = (cliConf: any): string => {
	return `.editorconfig
.eslintignore
.gitignore
.npmignore
.vscode/*
babel.config.js
cypress.json
rollup.config.js
**/tsconfig.json
**/webpack.config.js
node_modules
src
eslintrc.js
tsconfig.json
vue.config.js.ts
`;
};

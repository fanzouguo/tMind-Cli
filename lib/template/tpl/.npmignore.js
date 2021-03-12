"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
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
exports.getTpl = getTpl;

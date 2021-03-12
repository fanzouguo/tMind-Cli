"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `import * as testFunc from './lib/index';

	console.los(testFunc);
`;
};
exports.getTpl = getTpl;

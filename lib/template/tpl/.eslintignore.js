"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `/build/
/dist/
/*.dts
/src/assets/
/public/
/0_tobeDel/
/node_modules/
/lib*/
.*
`;
};
exports.getTpl = getTpl;

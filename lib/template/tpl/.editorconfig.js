"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTpl = void 0;
const getTpl = (cliConf) => {
    return `[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
`;
};
exports.getTpl = getTpl;

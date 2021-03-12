"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPath = exports.getCurrPath = exports.getPathSpec = exports.getPath = void 0;
const path = require('path');
const __formatPath__ = (pathStr, splitTag = '/') => pathStr.replace(/\\\\/g, splitTag).replace(/\\/g, splitTag);
const getPath = (...sPath) => {
    if (sPath.length) {
        return __formatPath__(path.resolve(__dirname, ...sPath));
    }
    else {
        return __formatPath__(path.resolve(__dirname));
    }
};
exports.getPath = getPath;
const getPathSpec = (...sPath) => {
    try {
        if (sPath.length) {
            return __formatPath__(path.join(...sPath));
        }
        else {
            throw new Error('路径不能为空');
        }
    }
    catch (err) {
        throw err;
    }
};
exports.getPathSpec = getPathSpec;
const getCurrPath = () => {
    return __formatPath__(path.resolve('./'));
};
exports.getCurrPath = getCurrPath;
const formatPath = (pathStr, splitTag = '/') => __formatPath__(pathStr, splitTag);
exports.formatPath = formatPath;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatWorld = exports.getFormatBh = exports.getFormatLunar = exports.getFormatCn = exports.getFromat = void 0;
;
const __keepLen__ = (val, len = 2) => `${val}`.padStart(len, '0');
const __dateInit__ = (val) => (!val && new Date()) || (val instanceof Date && val) || new Date(`${val}`);
const __getPattern__ = (val) => {
    const _dt = __dateInit__(val);
    const _y = `${_dt.getFullYear()}`;
    return {
        yyyy: _y,
        yy: __keepLen__(_y.slice(-2)),
        mm: __keepLen__(_dt.getMonth() + 1),
        dd: __keepLen__(_dt.getDate()),
        hh: __keepLen__(_dt.getHours()),
        mi: __keepLen__(_dt.getMinutes()),
        ss: __keepLen__(_dt.getSeconds()),
        ms: __keepLen__(_dt.getMilliseconds(), 3)
    };
};
const getFromat = (fmt, date) => {
    const _obj = __getPattern__(date);
    return (fmt || 'yyyy-mm-dd').replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g, (matched) => {
        if (!Array.isArray(matched)) {
            return _obj[matched] || '';
        }
        else {
            return '';
        }
    });
};
exports.getFromat = getFromat;
const getFormatCn = (date, skipYear = true) => {
    const _dt = __dateInit__(date);
    const _val = `${Intl.DateTimeFormat('zh-u-ca-nu-hanidec').format(_dt).replace(/\//, '年').replace(/\//, '月')}日`;
    if (!skipYear) {
        return _val;
    }
    else {
        const _arr = _val.split('年');
        return _arr[1] || '';
    }
};
exports.getFormatCn = getFormatCn;
const getFormatLunar = (date, skipYear = true) => {
    const _dt = __dateInit__(date);
    const _val = Intl.DateTimeFormat('zh-u-ca-chinese-nu-latn').format(_dt);
    if (!skipYear) {
        return _val;
    }
    else {
        const _arr = _val.split('年');
        return _arr[1] || '';
    }
};
exports.getFormatLunar = getFormatLunar;
const getFormatBh = (date) => {
    const _dt = __dateInit__(date);
    return Intl.DateTimeFormat('zh-chinese-u-ca-buddhist').format(_dt).replace(/-/, '年').replace(/-/, '月');
};
exports.getFormatBh = getFormatBh;
const getFormatWorld = (date, languageTag) => {
    const _dt = __dateInit__(date);
    return Intl.DateTimeFormat(languageTag || 'fr-ca').format(_dt);
};
exports.getFormatWorld = getFormatWorld;

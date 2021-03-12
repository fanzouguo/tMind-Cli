/* eslint-disable */
// Useage：
// format()	// 2021-03-07
// format('yyyy-mm-dd hh:mi:ss.ms', Date.now())	// 2021-03-07 12:51:34.775
// format('yyyymmddhhmissms', Date.now())	// 20210307125134775
// format('ms', Date.now())	// 775
// formatAsCn(Date.now())	// 三月七日
// formatAsCn(Date.now(), false)	// 二〇二一年三月七日
// getLunar()	// 正月24
// getLunar(null, false)	// 2021年正月24
// getBh()	// 佛历2564年3月7
// getWorldDateTime()	// 2021-03-07

interface datePattern {
	yyyy: string,
	yy: string,
	mm: string,
	dd: string,
	hh: string,
	mi: string,
	ss: string,
	ms: string,
	[propName: string]: string
};

const __keepLen__ = (val: string | number, len: number = 2): string => `${val}`.padStart(len, '0');

const __dateInit__ = (val: dateLike): Date => (!val && new Date()) || (val instanceof Date && val) || new Date(`${val}`);

const __getPattern__ = (val: dateLike): datePattern => {
	const _dt: Date = __dateInit__(val);
	const _y: string = `${_dt.getFullYear()}`;
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

/** 将指定日期按照提供的模式匹配字符串格式化
 *
 * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'，小写格式化为阿拉伯数字，大写格式化为中文汉字
 * @param {*} date 要格式化的时间 / 日期数据
 * @returns 已格式化的时间 / 日期 字符串
 */
export const getFromat = (fmt?: string, date?:  dateLike): string => {
	const _obj: datePattern = __getPattern__(date);
	return (fmt || 'yyyy-mm-dd').replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g, (matched: string | string[]): string => {
		if (!Array.isArray(matched)) {
			return _obj[matched] || '';
		} else {
			return '';
		}
	});


};

/** 将指定日期按照中文汉字的方式输出
 * @param {*} date 要格式化的日期信息
 * @param {*} skipYear 是否省略年份信息
 * @returns
 */
export const getFormatCn = (date: dateLike, skipYear: boolLike = true): string => {
	const _dt: Date = __dateInit__(date);
	const _val: string = `${Intl.DateTimeFormat('zh-u-ca-nu-hanidec').format(_dt).replace(/\//, '年').replace(/\//, '月')}日`;
	if (!skipYear) {
		return _val;
	} else {
		const _arr: string[] = _val.split('年');
		return _arr[1] || '';
	}
};

/** 将指定日期格式化为农历表示法
 *
 * @param {*} date 要格式化的日期数据，为空时默认为当天
 * @param {boolean} skipYear 是否省略年份信息
 * @returns 已格式化的农历日期
 */
export const getFormatLunar = (date: dateLike, skipYear: boolLike = true): string => {
	const _dt: Date = __dateInit__(date);
	const _val:string = Intl.DateTimeFormat('zh-u-ca-chinese-nu-latn').format(_dt);
	if (!skipYear) {
		return _val;
	} else {
		const _arr: string[] = _val.split('年');
		return _arr[1] || '';
	}
};

/** 将指定日期格式化为佛历表示法
 * @param {*} date 要格式化的日期数据，为空时默认为当天
 * @returns 已格式化的佛历日期
 */
export const getFormatBh = (date: dateLike): string => {
	const _dt: Date = __dateInit__(date);
	return Intl.DateTimeFormat('zh-chinese-u-ca-buddhist').format(_dt).replace(/-/, '年').replace(/-/, '月');
};

/** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
 *
 * @param {*} date 要格式化的日期数据，为空时默认为当天
 * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
 * @returns 已格式化的字符串
 */
export const getFormatWorld = (date: dateLike, languageTag: string | null | undefined): string => {
	const _dt: Date = __dateInit__(date);
	return Intl.DateTimeFormat(languageTag || 'fr-ca').format(_dt);
};

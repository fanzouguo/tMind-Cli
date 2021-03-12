import fs from 'fs-extra';
import { getCliConf } from '../factory/index';
import { getPathSpec } from './getPath';

const CONF_FILE_NAME = '.tMind';

interface IenvTmind {
	obj: ICliConf,
	arr: string[]
}

const __getEnvPath__ = (): string => {
	const envAddr: string = process.env.HOME || process.env.USERPROFILE || '';
	if (envAddr) {
		const envPath: string = getPathSpec(envAddr, CONF_FILE_NAME);
		fs.ensureFileSync(envPath);
		return envPath;
	} else {
		console.error('获取当前操作系统的用户路径出现异常');
		process.exit(1);
	}
};

export const getEnvCli = async (): Promise<IenvTmind> => {
	const obj = getCliConf();
	const envPath = __getEnvPath__();
	const data: string = fs.readFileSync(envPath, 'utf-8');
	const lines: string[] = data.split(/\r?\n/);
	const arr: string[] = [];
	for (const v of lines) {
		const [a, b] = v.split('=');
		if (a && b) {
			obj[`${a}`] = b || '';
			arr.push(`${a}=${b}`);
		}
	}
	return {
		obj,
		arr
	};
};

export const setEnvCli = async (data: string | string[]): Promise<void> => {
	try {
		const envPath = __getEnvPath__();
		if (typeof data === 'string') {
			fs.writeFileSync(envPath, data, 'utf-8');
		} else if (Array.isArray(data)) {
			fs.writeFileSync(envPath, data.join('\n'), 'utf-8');
		}
	} catch (err) {
		console.log('系统初始化失败！');
		console.error(err);
		process.exit(1);
	}
};

import path from 'path';
import shelljs from 'shelljs';

export const preview = async (): Promise<string> => {
	const cmdPath = path.resolve(process.cwd(), 'lib', 'nodeCmd', 'dev.Svr.js');
	const resRun: string = shelljs.exec(`node ${cmdPath}`);

	console.log(resRun);
	return resRun;
};

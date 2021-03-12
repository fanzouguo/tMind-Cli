import inquirer from 'inquirer';

// export async function questioner(question: inquirer.Question, nullAble?: boolean): Promise<string>;
// export async function questioner(question: inquirer.Question, nullAble?: boolean): Promise<boolean>;
export async function questioner(question: inquirer.Question, nullAble: boolean = false): Promise<string> {
	const qKey: string = `${question.name}`;
	const asw = await inquirer.prompt([question]);
	if (qKey === 'selectFunc') {
		const _currKey = `${asw[qKey]}` || '';
		if (_currKey) {
			return _currKey;
		} else {
			console.error(new Error('所选项不在可选范围'));
			process.exit(1);
		}
	} else if (qKey === 'needNpm') {
		return asw[qKey] ? '' : `${asw[qKey]}`;
	}  else {
		return `${asw[qKey]}`;
	}
}

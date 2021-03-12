
import { questioner } from './util/questioner';
import { initGlobal } from './step/0.init.Global';
import questions from './questions';
import { initProject } from './step/1.cli.Scaffold';
import { preview } from './step/3.cli.Preview';
import { runBuild } from './step/4.cli.build';
import { getCliConf } from './factory/index';

const emptyFunc = async (): Promise<void> => {
	console.log('暂未实现');
};

class Tmind {
	private cliConf: ICliConf = getCliConf();
	constructor() {
		this.init();
	}

	init = async (): Promise<void> => {
		console.clear();
		this.cliConf = await initGlobal([questions.qs_01_optRepo, questions.qs_01_optAuthor]);
		const anSwer = (await questioner(questions.qs_02_optFunctional) as CLI_FUNCTIONAL);
		if (anSwer === CLI_FUNCTIONAL.INIT) {
			initProject(this.cliConf);
		} else if (anSwer === CLI_FUNCTIONAL.BUILD) {
			runBuild(this.cliConf, questions.qs_06_commitMemo, questions.qs_06_commitBranch);
		} else if (anSwer === CLI_FUNCTIONAL.PREVIEW) {
			preview();
		} else {
			emptyFunc();
		}
	}
}

export {
	Tmind
};

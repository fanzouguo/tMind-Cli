import { getFromat } from '../../util/getDate';

const scriptFend = `"scripts": {
	"dev": "yarn lint && vue-cli-service serve",
	"build": "yarn lint && vue-cli-service build --modern --report",
	"pkg": "vue-cli-service build --report",
	"test:unit": "vue-cli-service test:unit",
	"test:e2e": "vue-cli-service test:e2e",
	"lint": "vue-cli-service lint",
	"prebuild": "node ./app.dev/preBuild.js",
	"postbuild": "node ./app.dev/postBuild.js",
	"lint": "eslint src --ext .ts"
},`;

const scriptBend = `"scripts": {
	"clean": "shx rm -rf .debug/lib lib",
	"dev": "ts-node --files ./.debug/index.ts",
	"dev:pre": "yarn lint && tsc -p ./.debug && node ./.debug/index.js",
	"build": "yarn lint && yarn clean && cross-env NODE_ENV=prod yarn tsc --build ./tscconfig.build.json",
	"lint": "eslint src --ext .ts"
},`;

const scriptLib = `"scripts": {
		"clean": "shx rm -rf .debug/lib lib",
		"dev": "ts-node --files ./.debug/index.ts",
    "dev:pre": "yarn lint && tsc -p ./.debug && node ./.debug/index.js",
		"build": "yarn lint && yarn clean && cross-env NODE_ENV=prod yarn tsc --build ./tscconfig.build.json",
    "lint": "eslint src --ext .ts"
	},`;

export const getTpl = (cliConf: ICliConf): string => {
	const { NAME_PROJ } = cliConf;
	const currDate: string = getFromat('yyyy-mm-dd hh:mi:ss.ms');
	const isLib = ((cliConf.SOURCE_TYPE === IsourceType.LIB_BROWSER) || (cliConf.SOURCE_TYPE === IsourceType.LIB_CJS) || (cliConf.SOURCE_TYPE === IsourceType.LIB_UMD));
	const mainAndTyping = !isLib ? '' : `\n	"main": "lib/index.js",
	"typings": "lib/index.d.ts",`;
	const scriptStr = ((cliConf.SOURCE_TYPE === IsourceType.APP_FEND) && scriptFend) || ((cliConf.SOURCE_TYPE === IsourceType.APP_SVR && scriptBend)) || scriptLib;
	const gitUrlStr = !cliConf.URL_TO_GITHUB ? '' : `git+${cliConf.URL_TO_GITHUB}`;
	const gitBugStr = !cliConf.URL_TO_GITHUB ? '' : `${cliConf.URL_TO_GITHUB}/issues`;

	return `{
	"name": "${NAME_PROJ.toLowerCase()}",
	"version": "1.0.0",
	"description": "This project is automatic created by tMind-CLI for tFrameV9 of smpoo Co. in ${currDate}",${mainAndTyping}
	"private": ${!cliConf.ALLOW_NPM},
	${scriptStr}
	"repository": {
		"type": "git",
		"url": "${gitUrlStr}"
	},
	"keywords": [
		"Smpoo",
		"tFrame"
	],
	"author": "${cliConf.AUTHOR}",
	"license": "MIT",
	"bugs": {
		"url": "${gitBugStr}"
	},
	"homepage": "www.smpoo.com",
	"dependencies": {
    "core-js": "~3.9.1"
	},
	"devDependencies": {
		"eslint": "~6.8.0",
    "eslint-plugin-import": "~2.20.2",
    "eslint-plugin-node": "~11.1.0",
    "eslint-plugin-promise": "~4.2.1",
    "eslint-plugin-standard": "~4.0.0",
    "typescript": "~4.2.2",
    "ts-node": "~9.1.1"
	},
  "createAt": "${currDate}"
}
`;
};

export const getTpl = (cliConf: any): string => {
	return `{
	// 使用 IntelliSense 了解相关属性。
	// 悬停以查看现有属性的描述。
	// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
	"version": "0.2.0",
	"configurations": [
		{
			"type": "pwa-node",
			"request": "launch",
			"name": "Launch Program",
			"skipFiles": [
				"<node_internals>/**"
			],
			"preLaunchTask": "tsc: watch - tsconfig.json",
			"program": "\${workspaceFolder}\\\\.debug\\\\index.ts",
			"outFiles": [
				"\${workspaceFolder}/lib/index.js"
			]
		}
	]
}
`;
};

export const getTpl = (cliConf: any): string => {
	return `.DS_Store
node_modules
/dist
/0_tobeDel


/tests/e2e/logs/

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;
};

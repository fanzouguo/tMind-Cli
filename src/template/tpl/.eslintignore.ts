export const getTpl = (cliConf: any): string => {
	return `/build/
/dist/
/*.dts
/src/assets/
/public/
/0_tobeDel/
/node_modules/
/lib*/
.*
`;
};

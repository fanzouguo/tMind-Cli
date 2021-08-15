/* Visit https://aka.ms/tsconfig.json to read more about this file */
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// incremental: true,                   /* Enable incremental compilation */
// checkJs: true,                       /* Report errors in .js files. */
// jsx: 'preserve',                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
// declarationMap: false, /* Generates a sourcemap for each corresponding '.d.ts' file. */
// declarationDir: `./${distFolderName}`,
// outFile: './',                       /* Concatenate and emit output to single file. */
// composite: true,                     /* Enable project compilation */
// tsBuildInfoFile: './',               /* Specify file to store incremental compilation information */
// noEmit: true,                        /* Do not emit outputs. */
// importHelpers: true,                 /* Import emit helpers from 'tslib'. */
// downlevelIteration: true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
// isolatedModules: true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// strictNullChecks: true,              /* Enable strict null checks. */
// strictFunctionTypes: true,           /* Enable strict checking of function types. */
// strictBindCallApply: true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
// strictPropertyInitialization: true,  /* Enable strict checking of property initialization in classes. */
// noImplicitReturns: true,             /* Report error when not all code paths in function return a value. */
// noFallthroughCasesInSwitch: true,    /* Report errors for fallthrough cases in switch statement. */
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// rootDirs: [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
// typeRoots: [],                       /* List of folders to include type definitions from. */
// preserveSymlinks: true,              /* Do not resolve the real path of symlinks. */
// allowUmdGlobalAccess: true,          /* Allow accessing UMD globals from modules. */
// --------------------------------------------------------------------------------------------------------------------------------------------------------
/* ---------------------------------------------------------- Source Map Options ---------------------------------------------------------- */
// sourceRoot: '',                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
// mapRoot: '',                         /* Specify the location where debugger should locate map files instead of generated locations. */
// inlineSourceMap: true,               /* Emit a single file with source maps instead of having a separate file. */
// inlineSources: true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

const getDistFolderName = require('../getDistFolderName');

const getTpl = (config, pathMgr) => {
	const distFolderName = getDistFolderName(config);
	const pjName = config.pkgName.camelCase();
	const _pathObj = {};
	_pathObj[pjName] = [`./${distFolderName}/index`];

	const _obj = {
		compilerOptions: {
			/* ---------------------------------------------------------- Basic Options ---------------------------------------------------------- */
			/* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
			target: 'ESNEXT',
			/* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
			module: 'ESNext',
			/* Specify library files to be included in the compilation. */
			lib: [
				'DOM',
				'ESNext'
			],
			/* Allow javascript files to be compiled. */
			allowJs: false,
			/* Generates corresponding '.d.ts' file. */
			declaration: false,
			/* Generates corresponding '.map' file. */
			sourceMap: false,
			/* Redirect output structure to the directory. */
			outDir: config.useRollup ? '' : `../${distFolderName}`,
			/* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
			rootDir: './',
			/* Do not emit comments to output. */
			removeComments: false,
			/* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
			downlevelIteration: true,
			/* ---------------------------------------------------------- Strict Type-Checking Options ---------------------------------------------------------- */
			/* Enable all strict type-checking options. */
			strict: true,
			/* Raise error on expressions and declarations with an implied 'any' type. */
			noImplicitAny: true,
			/* Raise error on 'this' expressions with an implied 'any' type. */
			noImplicitThis: true,
			/* Parse in strict mode and emit 'use strict' for each source file. */
			alwaysStrict: true,
			/* Additional Checks */
			/* Report errors on unused locals. */
			noUnusedLocals: false,
			/* Report errors on unused parameters. */
			noUnusedParameters: false,
			/* ---------------------------------------------------------- Module Resolution Options ---------------------------------------------------------- */
			/* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
			moduleResolution: 'node',
			/* Base directory to resolve non-absolute module names. */
			baseUrl: './',
			/* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
			paths: _pathObj,
			/* Type declaration files to be included in compilation. */
			types: ['node'],
			/* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
			allowSyntheticDefaultImports: true,
			/* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
			esModuleInterop: true,
			/* ---------------------------------------------------------- Experimental Options ---------------------------------------------------------- */
			/* Enables experimental support for ES7 decorators. */
			experimentalDecorators: true,
			/* Enables experimental support for emitting type metadata for decorators. */
			emitDecoratorMetadata: true,
			/* 加载json */
			resolveJsonModule: false,
			/* ---------------------------------------------------------- Advanced Options ---------------------------------------------------------- */
			/* Skip type checking of declaration files. */
			skipLibCheck: true,
			/* Disallow inconsistently-cased references to the same file. */
			forceConsistentCasingInFileNames: true
		},
		include: [
			'./*',
			'./types/*'
		],
		exclude: [
			'node_modules',
			'rollup.config.js',
			'example'
		]
	};
	_obj.exclude.push(`${distFolderName}/**/*`);
	return _obj;
};

module.exports = getTpl;

		// bugs: {
		// 	url: 'https://github.com/fanzouguo/tMind-svr-log/issues'
		// },
		// homepage: 'https://github.com/fanzouguo/tMind-svr-log#readme',

const preGitUrl = urlStr => {
	const _obj = {
		author: '',
		pjName: ''
	};
	if (urlStr.startsWith('git@')) {
		// git@github.com:fanzouguo/fastCli.git
		const [a, b] = urlStr.replace('git@github.com:', '').split('/');
		_obj.author = a;
		_obj.pjName = b.replace(/\.git/, '');
		_obj.url = urlStr;
	} else if (urlStr.startsWith('https://')) {
		// https://github.com/fanzouguo/fastCli.git
		const [a, b] = urlStr.replace('https://github.com/', '').split('/');
		_obj.author = a;
		_obj.pjName = b.replace(/\.git/, '');
		_obj.url = `git@github.com:${a}/${b}`;
	} else if (urlStr.startsWith('gh repo clone')) {
		// gh repo clone fanzouguo/fastCli
		const [a, b] = urlStr.replace(/^gh repo clone /, '').split('/');
		_obj.author = a;
		_obj.pjName = b;
		_obj.url = `git@github.com:${a}/${b}.git`;
	} else {
		throw new Error('无效的 Git Hub 仓库地址');
	}
	_obj.githubBugs = `https://github.com/${_obj.author}/${_obj.pjName}/issues`;
	_obj.githubHome = `https://github.com/${_obj.author}/${_obj.pjName}#readme`;
	return _obj;
};

module.exports = preGitUrl;

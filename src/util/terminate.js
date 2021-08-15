const { tEcho } = require('tmind-core');

const terminate = (msg, title, code = 1) => {
	tEcho(msg || '', title || '', 'ERR');
	process.exit(code);
};

module.exports = terminate
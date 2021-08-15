const shell = require('shelljs');
const { ncp } = require('ncp');
const { promisify } = require('util');

const copyExecer = (from, to) => {
	return new Promise((resolve, reject) => {
		promisify(ncp)(from,  to)
		.then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	});
};

module.exports = copyExecer;

const childProcess = require('child_process');

const execCmd = cmdStr => {
	return new Promise((resolve, reject) => {
		childProcess.exec(cmdStr, (err, stdout, stdeerr) => {
			if (err) {
				reject(err);
			} else {
				resolve(stdout || stdeerr);
			}
		})
	});
};

module.exports = execCmd;

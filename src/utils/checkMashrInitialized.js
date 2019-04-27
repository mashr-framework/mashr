const os = require('os');
const { exists, getMashrPath } = require('./fileUtils');
const { mashrLogger } = require('./mashrLogger');
const ora = require('ora');

const checkMashrInitialized = async(homedir = os.homedir()) => {
  const spinner = ora();

  const mashrPathExists = await exists(getMashrPath(homedir));
  if (!mashrPathExists) {
    mashrLogger(spinner, 'fail', 'Command failed');
    throw new Error(
      '\n\nCannot run command without initialization. ' +
      'Please run "mashr init" first in intended mashr project directoy.\n\n'
    );
  }
};

module.exports = {
  checkMashrInitialized,
};

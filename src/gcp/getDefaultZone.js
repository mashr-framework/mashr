const { exec } = require('../utils/fileUtils');
const { mashrLogger } = require('../utils/mashrLogger');
const ora = require('ora');

const getDefaultZone = async() => {
  const zoneSpinner = ora();

  const {
    stdout,
    stderr
  } = await exec('gcloud config get-value compute/zone');

  const zone = stdout;

  if (stderr) {
    mashrLogger(zoneSpinner, 'fail', 'Unable to get default zone');

    if (stderr.includes('(unset)')) {
      throw new Error(
        'gcloud default zone is unset.\n\n' +
        'run "gcloud config set compute/zone <zoneName>"\n'
      );
    } else {
      throw new Error(stderr);
    }
  }

  return zone.trim();
};

module.exports = {
  getDefaultZone,
};

const { exec } = require('../utils/fileUtils');
const { mashrLogger } = require('../utils/mashrLogger');
const ora = require('ora');

const getDefaultZone = async() => {
  const zoneSpinner = ora();

  let zone;
  try {
    const { stdout } = await exec('gcloud config get-value compute/zone');
    zone = stdout;
  } catch (e) {
    mashrLogger(zoneSpinner, 'fail', 'Unable to get default zone');
    throw (e);
  }
  return zone.trim();
};

module.exports = {
  getDefaultZone,
};

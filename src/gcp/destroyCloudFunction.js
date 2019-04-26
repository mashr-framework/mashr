const ora = require('ora');
const { functionExists } = require('./validateIntegrationNameWithGCP');
const { 
  exec,
  mashrLogger
} = require('../utils');

const destroyCloudFunction = async (integrationName) => {
  const spinner = ora();
  mashrLogger(spinner, 'start', 'Destroying cloud function...');

  const command = `gcloud functions delete ${integrationName} --quiet`;

  if (await functionExists(integrationName)) {
    await exec(command).catch((e) => {
      mashrLogger(spinner, 'fail', 'Cloud function deletion failed');
      throw(e);
    });

    mashrLogger(spinner, 'succeed', `Cloud function "${integrationName}" is destroyed`);
  } else {
    mashrLogger(
      spinner,
      'warn',
      `Cloud function "${integrationName}" does not exist... continuing`
    );
  }
};

module.exports = {
  destroyCloudFunction
};

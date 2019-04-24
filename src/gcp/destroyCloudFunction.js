const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

const { functionExists } = require('./validateIntegrationName');
const { exec } = require('../utils/fileUtils');

module.exports = async (integrationName) => {
  const spinner = ora();
  mashrLogger(spinner, 'start', 'Deleting cloud function...');

  const command = `gcloud functions delete ${integrationName} --quiet`;

  if (await functionExists(integrationName)) {
    const { stdout, stderr } = await exec(command);

    mashrLogger(spinner, 'succeed', `Cloud function "${integrationName}" is destroyed.`);
  } else {
    mashrLogger(
      spinner,
      'warn',
      `Cloud function "${integrationName}" does not exist... continuing`
    );
  }
};

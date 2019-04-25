const ora = require('ora');

const {
  createDataset,
  validateIntegrationNameWithGCP,
  createBuckets,
  createCloudFunction,
  createGCEInstance
} = require('../gcp');

const {
  configureCredentials,
  addIntegrationToDirectory,
  validateMashrConfig,
  mashrLogger,
} = require('../utils');


module.exports = async (args) => {
  const mashrConfigObj = await validateMashrConfig('./mashr_config.yml').catch((e) => {
    const spinner = ora();
    mashrLogger(spinner, 'fail', 'Deploy integration error');
    throw(e);
  });

  await configureCredentials(mashrConfigObj);

  const integrationName = mashrConfigObj.mashr.integration_name.trim();

  await validateIntegrationNameWithGCP(integrationName);

  await addIntegrationToDirectory(mashrConfigObj);
  await Promise.all([
    createGCEInstance(mashrConfigObj),
    createDataset(mashrConfigObj),
    createBuckets(integrationName).then(() => createCloudFunction(mashrConfigObj)),
  ]);
};

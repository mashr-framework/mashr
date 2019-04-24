const yaml = require('js-yaml');
const { readYaml } = require('../utils/fileUtils');
const configureCredentials = require('../utils/configureCredentials');
const { validateIntegrationName } = require('../gcp/validateIntegrationName');
const createBuckets = require('../gcp/createBuckets');
const { createCloudFunction } = require('../gcp/createCloudFunction');
const createGCEInstance = require('../gcp/createGCEInstance');
const addIntegrationToDirectory = require('../utils/addIntegrationToDirectory');
const validateMashrConfig = require('../utils/validateMashrConfig');
const createDataset = require('../gcp/createDataset');

module.exports = async (args) => {
  const mashrConfigObj = await validateMashrConfig('./mashr_config.yml');
  await configureCredentials(mashrConfigObj);

  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  await validateIntegrationName(integrationName);

  // [TODO: createBuckets continue to happen in the background during createCloudFunction. Examine this.]
  await addIntegrationToDirectory(mashrConfigObj);

  await Promise.all([
    createGCEInstance(mashrConfigObj),
    createDataset(mashrConfigObj),
    createBuckets(integrationName).then(() => createCloudFunction(mashrConfigObj)),
  ]);

  // TODO:
  //  - if deploy is run twice on the same mashr_config,
  //  does it provide an error (current action) or does it
  //  overwrite?
  //  - if default region doesn't exist in init, where is the bucket, GCE, and
  //  GCF created? Does it matter?
};

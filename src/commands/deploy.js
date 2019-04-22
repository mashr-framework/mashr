// 3 - Create the archive and staging bucket
// 4 - Check if BigQuery dataset exists, create the dataset
//  if it does not
// 5 - Create the code for the embulk_config.yml and the
//  index.js of the function from the mashr_config.yml
// 6 - Launches a GCS instance with a Mashr Container with our
//  embulk_config.yml in it, and a cron job running
// 7 - Launches a function with the same name

const { readYaml} = require('../utils/fileUtils');
const configureCredentials = require('../utils/configureCredentials');
const { validateIntegrationName } = require('../gcp/validateIntegrationName');
const createBuckets = require('../gcp/createBuckets');
const { createCloudFunction } = require('../gcp/createCloudFunction');
const addIntegrationToDirectory = require('../utils/addIntegrationToDirectory');

// Mat moved functions outside of deploy
const yaml = require('js-yaml');
const createGCEInstance = require('../gcp/createGCEInstance');

module.exports = async (args) => {
  const mashrConfigObj = await readYaml('./mashr_config.yml');

  // TODO: add mashr_config validation
  // - move validateKeyFile from configureCredentials
  // - add embulkRunCommandValidation
  //   - if no embulk_config.yml throw error
  //   - if no '-c...yml' throw warning
  //   - give a warning/error if embulk is undefined, or there is no 'in:type'
  // - add a field to mashrConfigObj: gce_instance_name
  //    - if the integration_name matches (?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?)
  //    then use that as gce_instance_name
  //    - if it does not pass regex, replace uppercase with lowercase, replace non [-a-z0-9] with -
  //    ... in worse case return the error 'Rename your integration...' w/ google's error
  // - validate that the dataset is there (or create it if not?)

  await configureCredentials(mashrConfigObj);

  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  await validateIntegrationName(integrationName);
  // [TODO: add validateGCEInstanceName(integrationName)]
  // [TODO: createBuckets continue to happen in the background during createCloudFunction. Examine this.]
  await createBuckets(integrationName);
  await createCloudFunction(mashrConfigObj);
  await createGCEInstance(mashrConfigObj);

  await addIntegrationToDirectory(mashrConfigObj);

  // TODO:
  //  - if deploy is run twice on the same mashr_config,
  //  does it provide an error (current action) or does it
  //  overwrite?
  //  - if default region doesn't exist in init, where is the bucket, GCE, and
  //  GCF created? Does it matter?
};

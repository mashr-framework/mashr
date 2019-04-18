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

module.exports = async (args) => {
  const mashrConfigObj = await readYaml('./mashr_config.yml');

  await configureCredentials(mashrConfigObj);

  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  await validateIntegrationName(integrationName);
  // [TODO: createBuckets continue to happen in the background during createCloudFunction. Examine this.]
  await createBuckets(integrationName);
  await createCloudFunction(mashrConfigObj);

  // [TODO: createGCEInstance(integrationName)]
  await addIntegrationToDirectory(mashrConfigObj);

  // TODO:
  //  - if deploy is run twice on the same mashr_config,
  //  does it provide an error (current action) or does it
  //  overwrite?
  //  - if default region doesn't exist in init, where is the bucket, GCE, and
  //  GCF created? Does it matter?
};

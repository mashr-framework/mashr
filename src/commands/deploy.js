const yaml = require('js-yaml');
const { readYaml} = require('../utils/fileUtils');
const configureCredentials = require('../utils/configureCredentials');
const { validateIntegrationName } = require('../gcp/validateIntegrationName');
const createBuckets = require('../gcp/createBuckets');
const { createCloudFunction } = require('../gcp/createCloudFunction');
const addIntegrationToDirectory = require('../utils/addIntegrationToDirectory');
const createGCEInstance = require('../gcp/createGCEInstance');
const validateMashrConfig = require('../utils/validateMashrConfig');

module.exports = async (args) => {
  const mashrConfigObj = await validateMashrConfig('./mashr_config.yml');
  await configureCredentials(mashrConfigObj);

  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  // await validateIntegrationName(integrationName);

  // [TODO: createBuckets continue to happen in the background during createCloudFunction. Examine this.]
  await addIntegrationToDirectory(mashrConfigObj);

  await Promise.all([
    createGCEInstance(mashrConfigObj),
    createBuckets(integrationName).then(() => createCloudFunction(mashrConfigObj)),
    createDataset(mashrConfigObj)
  ]);
  
  // TODO:
  //  - if deploy is run twice on the same mashr_config,
  //  does it provide an error (current action) or does it
  //  overwrite?
  //  - if default region doesn't exist in init, where is the bucket, GCE, and
  //  GCF created? Does it matter?
};

const { exec } = require('../utils/fileUtils');

const createDataset = async (mashrConfigObj) => {
  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  const datasetId = mashrConfigObj.mashr.dataset_id.trim();
  const projectId = mashrConfigObj.mashr.project_id.trim();

  // Using bq command line tool because unhelpful error using nodejs client library API
  const command = "bq --location=US mk --dataset " +
                  `--description "The dataset for ${integrationName}." ` +
                  `${projectId}:${datasetId}`;

  try {
    await exec(command);
    console.log(`Created dataset ${datasetId}`);
  } catch (e) {
    if (e.stdout.includes('already exists') || e.stdout.includes("already\nexists")) {
      console.log(`Dataset "${datasetId}" already exists... continuing`);
    } else {
      console.log("E: ", e);
      throw(e);
    }
  }
};

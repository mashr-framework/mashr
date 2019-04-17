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
const addIntegrationToDirectory = require('../utils/addIntegrationToDirectory');

module.exports = async (args) => {
  const mashrConfigObj = await readYaml('./mashr_config.yml');

  await configureCredentials(mashrConfigObj);

  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  await validateIntegrationName(integrationName);
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
}


const { copyFile, mkdir, readFile, writeFile } = require('../utils/fileUtils');

const createCloudFunction = async (mashrConfigObj) => {
  const functionTemplatePath = `${__dirname}/../../templates/functionTemplate`;
  const packageJson = await readFile(`${functionTemplatePath}/package.json`);

  await mkdir('./function');
  await writeFile('./function/package.json', packageJson);
  
  await setupCloudFunction(functionTemplatePath, mashrConfigObj);
  await deployCloudFunction(mashrConfigObj);

  // deploys the function from the function directory with exec
}

const { exec } = require('../utils/fileUtils');
const path = require('path');

const deployCloudFunction = async (mashrConfigObj) => {
  const functionName = mashrConfigObj.mashr.integration_name;
  const bucketName = functionName;

                  
  const command = `gcloud functions deploy ${functionName} --runtime nodejs8 ` + 
                  `--trigger-resource ${bucketName} ` +
                  `--trigger-event google.storage.object.finalize`;
  
  const { stdout, stderr } = await exec(command, {
    cwd: `${path.resolve('./')}/function`,
  });
};


// gcp
const fs = require('fs');

const setupCloudFunction = async (functionTemplatePath, mashrConfigObj) => {
  let content = await readFile(`${functionTemplatePath}/index.js`);
  content = content.toString();

  content = content.replace('_FUNCTION_NAME_', mashrConfigObj.mashr.integration_name)
                   .replace('_PROJECT_ID_', mashrConfigObj.mashr.project_id)
                   .replace('_DATASET_ID_', mashrConfigObj.mashr.dataset_id)
                   .replace('_TABLE_ID_', mashrConfigObj.mashr.table_id);

  await writeFile('./function/index.js', content);

  console.log('Copied and replaced cloud function index.js.');
};

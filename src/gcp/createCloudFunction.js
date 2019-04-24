const {
  copyFile,
  exists,
  mkdir,
  readFile,
  rimraf,
  writeFile,
} = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

const createCloudFunction = async (mashrConfigObj) => {
  const spinner = ora();
  mashrLogger(spinner, 'start', 'Creating cloud function...');

  const functionTemplatePath = `${__dirname}/../../templates/functionTemplate`;
  const packageJson = await readFile(`${functionTemplatePath}/package.json`);

  if (await exists('./function')) {
    mashrLogger(spinner, 'start', 'Deleting previously existing function directory.');
    rimraf.sync('./function');
  }

  mashrLogger(spinner, 'start', 'Creating function directory.');
  await mkdir('./function');

  await writeFile('./function/package.json', packageJson);

  await setupCloudFunction(functionTemplatePath, mashrConfigObj, spinner);
  await deployCloudFunction(mashrConfigObj, spinner);
};

const { exec } = require('../utils/fileUtils');
const path = require('path');

const deployCloudFunction = async (mashrConfigObj, spinner) => {
  mashrLogger(spinner, 'start', 'Deploying cloud function...');

  const functionName = mashrConfigObj.mashr.integration_name;
  const bucketName = functionName;


  const command = `gcloud functions deploy ${functionName} --runtime nodejs8 ` +
                  `--trigger-resource ${bucketName} ` +
                  `--trigger-event google.storage.object.finalize`;

  await exec(command, {
    cwd: `${path.resolve('./')}/function`,
  }).catch((e) => {
    mashrLogger(spinner, 'fail', 'Cloud function creation failed');
    throw(e);
  });

  mashrLogger(spinner, 'succeed', `Cloud function "${functionName}" is created.`);
};


// gcp
const setupCloudFunction = async (functionTemplatePath, mashrConfigObj, spinner) => {
  let content = await readFile(`${functionTemplatePath}/index.js`);
  content = content.toString();

  content = content.replace('_FUNCTION_NAME_', mashrConfigObj.mashr.integration_name)
                   .replace('_PROJECT_ID_', mashrConfigObj.mashr.project_id)
                   .replace('_DATASET_ID_', mashrConfigObj.mashr.dataset_id)
                   .replace('_TABLE_ID_', mashrConfigObj.mashr.table_id);

  await writeFile('./function/index.js', content);

  mashrLogger(spinner,
    'start',
    'Created "./function/index.js" from template');
};

module.exports = {
  createCloudFunction,
  deployCloudFunction,
  setupCloudFunction,
};

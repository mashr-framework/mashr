const { copyFile, mkdir, readFile, writeFile } = require('../utils/fileUtils');

const createCloudFunction = async (mashrConfigObj) => {
  const functionTemplatePath = `${__dirname}/../../templates/functionTemplate`;
  const packageJson = await readFile(`${functionTemplatePath}/package.json`);

  await mkdir('./function');
  await writeFile('./function/package.json', packageJson);
  
  await setupCloudFunction(functionTemplatePath, mashrConfigObj);
  await deployCloudFunction(mashrConfigObj);
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

  console.log(`Cloud function "${functionName}" is created.`);
};


// gcp
const setupCloudFunction = async (functionTemplatePath, mashrConfigObj) => {
  let content = await readFile(`${functionTemplatePath}/index.js`);
  content = content.toString();

  content = content.replace('_FUNCTION_NAME_', mashrConfigObj.mashr.integration_name)
                   .replace('_PROJECT_ID_', mashrConfigObj.mashr.project_id)
                   .replace('_DATASET_ID_', mashrConfigObj.mashr.dataset_id)
                   .replace('_TABLE_ID_', mashrConfigObj.mashr.table_id);

  await writeFile('./function/index.js', content);

  console.log('Created "./function/index.js" from Cloud Function template');
};

module.exports = {
  createCloudFunction,
  deployCloudFunction,
  setupCloudFunction,
};

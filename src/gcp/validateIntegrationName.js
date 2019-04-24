const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const { exec } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

const validateIntegrationName = async (integrationName) => {
  const spinner = ora();

  try {
    await Promise.all([
      bucketsAreAvailable(integrationName),
      functionNameIsAvailable(integrationName),
    ]);
  } catch (e) {
    mashrLogger(spinner, 'fail', 'Integration name validation failed');
    throw(e);
  }
};

const validateBucketName = (bucketName, bucketsSpinner) => {
  mashrLogger(bucketsSpinner, 'start', `Validating bucket name, "${bucketName}"...`);

  if (!bucketName.match(/^[a-z0-9]([a-z0-9_-]|\.)*[a-z0-9]$/)) {
    mashrLogger(bucketsSpinner, 'fail', 'Bucket name is invalid');

    throw new Error(`Bucket name '${bucketName}' invalid, needs to only ` +
      'include lowercase numbers, dashes and underscores. Can only begin ' +
      'and end with number or letter.');
  }
};

const bucketExists = async (bucketName) => {
  const bucket = storage.bucket(bucketName);
  let data;

  try {
    data = await bucket.exists();
  } catch (e) {
      if (!!e.errors && e.errors[0].reason === 'forbidden') {
        return true;
      } else {
        throw(e);
      }
  }

  return data[0];
};

const bucketsAreAvailable = async (bucketName) => {
  const bucketsSpinner = ora();

  validateBucketName(bucketName, bucketsSpinner);

  const results = await Promise.all([
    bucketExists(bucketName),
    bucketExists(bucketName + '_archive'),
  ]);

  const anyExists = results.some(function (result) {
    return result === true;
  });

  if (anyExists) {
    mashrLogger(bucketsSpinner, 'fail', 'Bucket name is unavailable');

    const error = new Error(`Bucket name "${bucketName}" is taken. ` +
                            'Please provide a different integration_name in the ' +
                            'mashr_config.yml file.');
    throw(error);
  } else {
    mashrLogger(bucketsSpinner, 'succeed', 'Bucket name is valid');
  }
};

const functionExists = async (integrationName) => {
  const { stdout, stderr } = await exec('gcloud functions list');
  let lines = stdout.split('\n');

  for (let i = 1; i < lines.length; i++) {
    name = lines[i].split(/\s/)[0].trim();
    if (name === integrationName) { return true; }
  }

  return false;
};

const functionNameIsAvailable = async (integrationName) => {
  const functionSpinner = ora();
  mashrLogger(
    functionSpinner,
    'start', 
    `Validating function name "${integrationName}"...`
  );

  if (await functionExists(integrationName)) {
    mashrLogger(functionSpinner, 'fail', 'Function name is unavailable');

    const error = new Error(`Cloud function name "${integrationName}" is taken. ` +
                            'Please provide a different integration_name in the ' + 
                            'mashr_config.yml file.');
    throw(error);
  } else {
    mashrLogger(functionSpinner, 'succeed', 'Function name is valid');
  }
};

module.exports = {
  validateIntegrationName,
  validateBucketName,
  bucketExists,
  functionExists,
};

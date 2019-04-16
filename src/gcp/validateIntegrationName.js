const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = async (integrationName) => {
  try {
    bucketsAreAvailable(integrationName);
    functionNameIsAvailable(integrationName);
  } catch (e) {
    throw(e);
  }
}

async function functionNameIsAvailable(integrationName) {
  const { stdout, stderr } = await exec('gcloud functions list');
  let lines = stdout.split('\n');
  for (let i = 1; i < lines.length; i++) {
    name = lines[i].split(/\s/)[0].trim();
    if (name === integrationName) {
      throw new Error('Function name is taken. Please provide a different ' +
        'integration_name in the mashr_config.yml file.')
    }
  }
  console.log('Function Name validated.')
}

const bucketsAreAvailable = async (bucketName) => {
  validateBucketName(bucketName);
  bucketExists(bucketName);
  bucketExists(bucketName + '_archive');
  console.log('Bucket Name validated.')
}

const validateBucketName = (bucketName) => {
  if (!bucketName.match(/^[a-z0-9]([a-z0-9_-]|\.)*[a-z0-9]$/)) {
    throw new Error(`Bucket name '${bucketName}' invalid, needs to only ` +
      'include lowercase numbers, dashes and underscores. Can only begin ' +
      'and end with number or letter.');
  }
}

const bucketExists = async (bucketName) => {
  try {
    bucket = storage.bucket(bucketName);
    const data = await bucket.exists();
    if (!data[0]) {
      return true;
    } else {
      throw new Error('Bucket name unavailable. Choose a different ' +
                      'integration_name.');
    }
  } catch(e) {
    throw(e);
  }
}

const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const { bucketExists } = require('./validateIntegrationNameWithGCP');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

const destroyBuckets = async (integrationName) => {
  await Promise.all([destroyBucket(integrationName),
    destroyBucket(integrationName + '_archive')]);
};

const destroyBucket = async (integrationName) => {
  const spinner = ora();

  mashrLogger(spinner, 'start');

  const bucket = storage.bucket(integrationName);
  
  if (await bucketExists(integrationName)) {
    await bucket.deleteFiles({ force: true });
    await bucket.delete();

    mashrLogger(spinner, 'succeed', `Bucket "${integrationName}" is destroyed`);
  } else {
    mashrLogger(spinner, 'warn', `Bucket "${integrationName}" does not exist... continuing`);
  }
};

module.exports = {
  destroyBuckets,
  destroyBucket,
};

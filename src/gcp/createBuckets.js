const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

module.exports = async function createBuckets(integrationName) {
  createBucket(integrationName);
  createBucket(integrationName + '_archive', {isArchive: true});
};

async function createBucket(integrationName, options = {isArchive: false}) {
  const spinner = ora();

  mashrLogger(spinner, 'start');

  const bucketOptions = {};

  if (options.isArchive) {
    bucketOptions.storageClass = 'COLDLINE';
  }

  const bucket = await storage.createBucket(integrationName, bucketOptions).catch((e) => {
    mashrLogger(spinner, 'fail', `Bucket creation for ${integrationName} failed`);
    throw(e);
  });

  mashrLogger(spinner, 'succeed', `Bucket "${integrationName}" is created`);

  return bucket;
}

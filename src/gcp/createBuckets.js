const { Storage } = require('@google-cloud/storage');
const ora = require('ora');
const { mashrLogger } = require('../utils');

const createBuckets = async(integrationName) => {
  await Promise.all([
    createBucket(integrationName),
    createBucket(integrationName + '_archive', {isArchive: true}),
  ]).catch((e) => { throw (e); });
};

const createBucket = async(integrationName, options = {isArchive: false}) => {
  const storage = new Storage();
  const spinner = ora();

  mashrLogger(spinner, 'start');

  const bucketOptions = {};

  if (options.isArchive) {
    bucketOptions.storageClass = 'COLDLINE';
  }

  const bucket = await storage.createBucket(
    integrationName,
    bucketOptions
  ).catch((e) => {
    mashrLogger(
      spinner,
      'fail',
      `Bucket creation for ${integrationName} failed`
    );

    throw (e);
  });

  mashrLogger(spinner, 'succeed', `Bucket "${integrationName}" is created`);

  return bucket;
};

module.exports = {
  createBuckets,
  createBucket,
};

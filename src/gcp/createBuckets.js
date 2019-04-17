const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

module.exports = async function createBuckets(integrationName) {
  createBucket(integrationName);
  createBucket(integrationName + '_archive', {isArchive: true});
}

async function createBucket(integrationName, options = {isArchive: false}) {
  const bucketOptions = {};

  if (options.isArchive) {
    bucketOptions.storageClass = 'COLDLINE';
  }

  const bucket = await storage.createBucket(integrationName, bucketOptions);

  console.log(`Bucket "${integrationName}" is created.`);

  return bucket;
}

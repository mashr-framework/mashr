const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const { bucketExists } = require('./validateIntegrationName');

const destroyBuckets = async (integrationName) => {
  await Promise.all([destroyBucket(integrationName),
    destroyBucket(integrationName + '_archive')]);
}

const destroyBucket = async (integrationName) => {
  const bucket = storage.bucket(integrationName);
  
  if (await bucketExists(integrationName)) {
    await bucket.delete();
    console.log(`Bucket "${integrationName}" is destroyed.`);
  } else {
    console.log(`Bucket "${integrationName}" doesn't exist!`);
  }
}

module.exports = {
  destroyBuckets,
  destroyBucket
}

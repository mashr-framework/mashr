const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const destroyBuckets = async (integrationName) => {
  await Promise.all([destroyBucket(integrationName),
    destroyBucket(integrationName + '_archive')]);
}

const destroyBucket = async (integrationName) => {
  const bucket = storage.bucket(integrationName);
  await bucket.delete();
}

module.exports = {
  destroyBuckets,
  destroyBucket
}
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const { bucketExists } = require('./validateIntegrationName');


// (node:62879) UnhandledPromiseRejectionWarning: Error: The bucket you tried to delete was not empty.
//     at Util.parseHttpRespBody (/Users/jacobcoker-dukowitz/development/launch_school/capstone/mashr/node_modules/@google-cloud/common/build/src/util.js:191:38)
const destroyBuckets = async (integrationName) => {
  await Promise.all([destroyBucket(integrationName),
    destroyBucket(integrationName + '_archive')]);
};

const destroyBucket = async (integrationName) => {
  const bucket = storage.bucket(integrationName);
  
  if (await bucketExists(integrationName)) {
    await bucket.delete();
    console.log(`Bucket "${integrationName}" is destroyed.`);
  } else {
    console.log(`Bucket "${integrationName}" does not exist... continuing`);
  }
};

module.exports = {
  destroyBuckets,
  destroyBucket,
};

// https://cloud.google.com/nodejs/docs/reference/storage/2.3.x/Bucket
// bucket.deleteFiles({
//   force: true
// }, function(errors) {
//   // `errors`:
//   //    Array of errors if any occurred, otherwise null.
// });

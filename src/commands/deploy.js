
// 1 - Check if a staging bucket with the same name exists, 
//  error to provide a different integration_name if it does.
// 2 - Check if an archive bucket with the same name exists, 
//  error to provide a different integration_name if it does.

// 3 - Create the archive and staging bucket
// 4 - Check if BigQuery dataset exists, create the dataset 
//  if it does not
// 5 - Create the code for the embulk_config.yml and the 
//  index.js of the function from the mashr_config.yml
// 6 - Launches a GCS instance with a Mashr Container with our 
//  embulk_config.yml in it, and a cron job running
// 7 - Launches a function with the same name

const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

module.exports = async (args) => {
// gcp functions:
// gcp - bucketsAreAvailable()
//   gcp - bucketExists()

// if buckets are available, continue; if not provide error
// 
  const bucketName = 'asdgadfhg45hweh';
  bucketsAreAvailable(bucketName);
}



function bucketsAreAvailable(bucketName) {
  bucketExists(bucketName);
}

function bucketExists(bucketName) {
  bucket = storage.bucket(bucketName);
  bucket.exists().then(function(data) {
    console.log(data)
  });
  // return storage.get(bucketName, Storage.BucketGetOption.fields()) != null;
}
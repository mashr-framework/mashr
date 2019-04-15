
// 1 - Check if a staging bucket with the same name exists, 
//  error to provide a different integration_name if it does.
// 2 - Check if an archive bucket with the same name exists, 
//  error to provide a different integration_name if it does.

/*
  - it should:
    - it sets up new name: mashr_<name>_<source>_to_<dataset>_<table>
    - checks if name above is available
    - checks if name above + "_archive" is available
    - if not available then provides an error
*/



// 3 - Create the archive and staging bucket
// 4 - Check if BigQuery dataset exists, create the dataset 
//  if it does not
// 5 - Create the code for the embulk_config.yml and the 
//  index.js of the function from the mashr_config.yml
// 6 - Launches a GCS instance with a Mashr Container with our 
//  embulk_config.yml in it, and a cron job running
// 7 - Launches a function with the same name

const { Storage } = require('@google-cloud/storage');
const { configureCredentials } = require('../utils/fileUtils');
const storage = new Storage();

// next step: get bucket name from mashr_config file
// see if it exists for staging/archives
// throw an error if it does

// requires fs::readYaml
const { readYaml } = require('../utils/fileUtils');
function setupBucketName() {

}

module.exports = async (args) => {
  await configureCredentials('./mashr_config.yml');
  const bucketName = setupBucketName(mashrConfig);

  // const bucketName = 'mashr';
  // await bucketsAreAvailable(bucketName);
}

function bucketsAreAvailable(bucketName) {
  bucketExists(bucketName);
}

function bucketExists(bucketName) {
  bucket = storage.bucket(bucketName);
  bucket.exists().then(function(data) {
    if (data[0]) { console.log(data[0]); }
  }).catch(function(error) {
    console.log('ERROR: ', error);
  });
}


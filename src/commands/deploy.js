
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
  configureCredentials('./mashr_config.yml');

  const bucketName = 'mashr';
  await bucketsAreAvailable(bucketName);
}

function bucketsAreAvailable(bucketName) {
  bucketExists(bucketName);
}

function bucketExists(bucketName) {
  bucket = storage.bucket(bucketName);
  bucket.exists().then(function(data) {
    if (data[0]) { return true; }
  }).catch(function(error) {
    console.log('ERROR: ', error);
  });
}

// utils:
const yaml = require('js-yaml');
const fs = require('fs');

function readYaml(path) {
  return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
}

const path = require('path');
function getPathToKeyFile(mashr_config) {
  const keyFile = readYaml(mashr_config).mashr.json_keyfile;
  return `${path.resolve('./')}/${keyFile}`;
}
// gcp:
function setGoogleAppCredentials(keyPath) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
}
// utils
function configureCredentials(path_to_mashr_config) {
  const keyPath = getPathToKeyFile(path_to_mashr_config);
  setGoogleAppCredentials(keyPath);
}

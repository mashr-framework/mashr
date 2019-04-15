
// 1 - Check if a staging bucket with the same name exists, 
//  error to provide a different integration_name if it does.
// 2 - Check if an archive bucket with the same name exists, 
//  error to provide a different integration_name if it does.

/*
  - it should:
    - get the mashr_config file as an object
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
const { configureCredentials, readYaml} = require('../utils/fileUtils');
const storage = new Storage();

// next step: get bucket name from mashr_config file
// see if it exists for staging/archives
// throw an error if it does

// requires fs::readYaml
function setupBucketName(mashrConfig) {

}

module.exports = async (args) => {
  const mashrConfigObj = await readYaml('./mashr_config.yml');
  await configureCredentials(mashrConfigObj);
  const name = mashrConfigObj.mashr.integration_name;
  const source = mashrConfigObj.embulk.in.type;
  const dataset = mashrConfigObj.mashr.dataset_id;
  const table = mashrConfigObj.mashr.table_id;

  const bucketName = `mashr_${name}_${source}_to_${dataset}_${table}`
  bucketsAreAvailable(bucketName);
  // const bucketName = setupBucketName(mashrConfig);

  // const bucketName = 'mashr';
  // await bucketsAreAvailable(bucketName);
}

function bucketsAreAvailable(bucketName) {
  bucketExists(bucketName);
  bucketExists(bucketName + '_archive');
}

const bucketExists = async (bucketName) => {
  try {
    bucket = storage.bucket(bucketName);
    console.log(bucketName);
    const data = await bucket.exists();
    if (!data[0]) {
      return true;
    } else {
      throw new Error('Bucket name unavailable. Choose a different ' +
                      'integration_name.');
    }
  } catch(e) {
    throw(e);
  }
}


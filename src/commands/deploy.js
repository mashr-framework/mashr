
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

module.exports = async (args) => {
  const mashrConfigObj = await readYaml('./mashr_config.yml');
  await configureCredentials(mashrConfigObj);
  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  // validate bucketName
  //  'dataset', 'table', 'intergration_name'
  //  - cannot include '_';
  //  - cannot be uppercase

  // console.log(bucketName);
  await validateName(integrationName)
  // await bucketsAreAvailable(bucketName);
  // TODO:
  //  if deploy is run twice on the same mashr_config,
  //  does it provide an error (current action) or does it 
  //  overwrite?

}

// gcp
const validateName = async (integrationName) => {
  try {
    bucketsAreAvailable(integrationName);
    functionNameIsAvailable(integrationName);
  } catch (e) {
    throw(e);
  }
}

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function functionNameIsAvailable(integrationName) {
  const { stdout, stderr } = await exec('gcloud functions list');
  let lines = stdout.split('\n');
  for (let i = 1; i < lines.length; i++) {
    name = lines[i].split(/\s/)[0].trim();
    if (name === integrationName) { 
      throw new Error('Function name is taken. Please provide a different integration_name in the mashr_config.yml file.') 
    }
  }
  console.log('Function Name validated.')
}

// gcp
// const execSync = require('child_process').execSync;

// async function functionNameIsAvailable(integrationName) {
//   const stdout = execSync('gcloud functions list').toString();
//   let lines = stdout.split('\n');
//   for (let i = 1; i < lines.length; i++) {
//     name = lines[i].split(/\s/)[0];
//     if (name.indexOf(integrationName) > -1) { 
//       throw new Error(`Function name "${integrationName}" is taken, please choose a different integration name.`)
//     }
//   }
//   console.log('Function name is ok!')
// }

const validateBucketName = (bucketName) => {
  // this is not throwing as expected
  if (bucketName !== bucketName.toLowerCase()) {
    throw new Error('Bucket name invalid, must be lower case.')
  }
}
// gcp
const bucketsAreAvailable = async (bucketName) => {
  validateBucketName(bucketName);
  bucketExists(bucketName);
  bucketExists(bucketName + '_archive');
  console.log('Bucket Name validated.')
}

// gcp
const bucketExists = async (bucketName) => {
  try {
    bucket = storage.bucket(bucketName);
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


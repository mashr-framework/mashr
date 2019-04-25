const configureCredentials = require('../src/utils/configureCredentials');
const { readYaml, readFile, writeFile} = require('../src/utils/fileUtils');
const path = require('path');
const fs = require('fs');
const createBuckets = require('../src/gcp/createBuckets');
const { validateIntegrationName, 
        bucketExists,
        validateBucketName } = require('../src/gcp/validateIntegrationName');

describe('mashr deploy', function() {
  // beforeEach(async () => {});

  // afterEach(async () => {});

  describe('configureCredentials()', function() {

    let mashrConfigObj;
    let mashrConfigPath;

    beforeEach(async () => {
      mashrConfigPath = path.resolve('./') + '/tests/templates/mashr_template.yml';
      mashrConfigObj = await readYaml(mashrConfigPath);
    });


    it('Sets the keyfile in the mashr_config.yml to an env variable', async () => {
      mashrConfigObj.mashr.json_keyfile = 'keyfile.json';
      await configureCredentials(mashrConfigObj);
      const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      const expectedPath = path.resolve('./') + '/keyfile.json';
      expect(credentials).toBe(expectedPath);
    });

    // it('Throws an error if there is no mashr_config file', async () => {
    //   const mashrConfig = await readFile(mashrConfigPath);
    //   fs.unlinkSync(mashrConfigPath);
    //   await expect(configureCredentials(m))
    // });
  });

  // describe('validateIntegrationName()', () => {
  //   // [TODO: separate these out into separate it statements]
  //   it('Checks that the bucket name is lowercase, numbers, dashes, ' +
  //     'or underscores', () => {
  //       expect(validateBucketName('AAA')).toThrowError(/invalid/);
  //       // expect(validateBucketName('-aaa')).toThrow(/invalid/);
  //       // expect(validateBucketName('_aaa')).toThrow(/invalid/);
  //       // expect(validateBucketName('aaa-')).toThrow(/invalid/);
  //       // expect(validateBucketName('aaa_')).toThrow(/invalid/);
  //       // expect(validateBucketName('a aa')).toThrow(/invalid/);
  //   });

    // it('Throws an error if a bucket with the same name already exists', async () => {
    //   // const bucketName = ''
    //   // create a bucket
    //   // await expect(bucketExists(bucketName)).rejects.toThrow(//)
    //   // destroy bucket
    // });

  //     - it should:
  //       - [TODO: checks .mashr/info.json if integration name already exists.
  //       error if it exists]
  //       - checks if bucket already exists, throws an error if bucket exists
  //       starts with a number or letter, throws error if
  //       - checks if function name is available, throws error if not
  // });

  // describe('createBuckets()', async () => {
    // it('Creates storage and archive buckets', async () => {
      // const bucketName = 'mashr_test_bucket12345';
      // await createBuckets(bucketName);
      // const errMsg = `Bucket name "${bucketName}" unavailable.`;
      // await expect(bucketExists(bucketName)).rejects.toThrow(errMsg);
    // });

    // it('add integration name to .mashr/info.json', async () => {

    // });

  // describe('addIntegrationToDirectory()', async () = {
  //     - add integration name to info.json file .mashr/ dir
  // })

  /*
    

  */
  // describe('createCloudFunction()', () => {
  //   it('creates the ./function directory', async () => {
      

  //   });


    // it should('copies the function template and replaces it with values from mashrConfigObj')
    // it should('creates function directory inside working directory, saves the function there')
    // it saves path to function in .mashr/info.json
    // it deploys the function from the function directory with exec
  // });

});

// - validateMashrConfig.test.js (do last)
//   (*work with original file, and remove / add values as needed*)
//   (*read a template in and add values to the object*)
//   - describe checkRequiredValues()
//     - it throws an error if there are fields missing (*6 for each value)
//     - doesnt do anything if all the fields are there (1)
//   - describe validateIntegrationName()
//     - throws an error if the name is invalid (*2-3 invalid strings)
//     - does nothing if the name is valid (1 string)
//   - describe validateEmbulkRunCommand()
//     - throws an error if  embulk_config.yml is not in command
//     - doesnt do anything if embulk_config.yml is in command
//   - describe validateBQNames()
//     - throws an error if the name is invalid (*2-3 invalid strings)
//     - does nothing if the name is valid (1 string)
// - configureCredentials.test.js
//   - describe configureCredentials()
//     - it Sets the keyfile in the mashr_config.yml to an env variable
// - mashrResources.test.js;
//   (*homedir is optional arg, check utils/fileUtils to see how to implement*)
//   - describe setupDirectoriesAndFiles 
//     - it creates a .mashr folder (homedir is './')
//     - it creates a info.json in .mashr
//   - writeResources
//     - it adds an integration to the info.json file (* uses checkIntegrationExists())
//   - readResrouces
//     - it reads the integration to the info.json file
//   - removeResource
//     - it removes the integration from the info.json file
//   (*teardown: remove .mashr folder and info.json file)
// - GCEInstance.test.js -Jake
//   - describe createGCEInstance()
//     - expect createGCEInstance to not throw an error
//     - expect getGCEInstance to return a value
//   - describe destroyGCEInstance()
//     - expect destroyGCEInstance to not throw an error
//     - expect getGCEInstance to return undefined (?)
// - createDataset.test.js
//   - describe createDataSet
//     - it creates a dataSet
//     (*use BQ client to test if exist and destroy after*)
// - buckets.test.js - Mat
//   - describe createBuckets()
//     - expect createBuckets to not throw an error
//     - expect bucketExists to return true (x2 for archive)
//   - describe destroyBuckets()
//     - expect destroyBucket to not throw an error
//     - expect bucketExists to return false
// - cloudFunction.test.js - Linus
//   - describe createCloudFunction()
//     - expect createCloudFunction to not throw an error
//     - expect functionExists to return true
//   - describe destroyCloudFunction()
//     - expect destroyCloudFunction to not throw an error
//     - expect functionExists to return false








const configureCredentials = require('../src/utils/configureCredentials');
const { readYaml, readFile, writeFile} = require('../src/utils/fileUtils');
const path = require('path');
const fs = require('fs');
const createBuckets = require('../src/gcp/createBuckets');
const { validateIntegrationName, bucketExists } = require('../src/gcp/validateIntegrationName');

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

    it('Throws an error if there is no key file', async () => {
      await expect(configureCredentials(mashrConfigObj)).rejects.toThrow(/No keyfile/);
    });

    // it('Throws an error if there is no mashr_config file', async () => {
    //   const mashrConfig = await readFile(mashrConfigPath);
    //   fs.unlinkSync(mashrConfigPath);
    //   await expect(configureCredentials(m))
    // });
  });

  describe('validateIntegrationName()', () => {
    it('Checks that the bucket name is lowercase, numbers, dashes, ' +
      'or underscores', async () => {
        const bucketName = 'mashr_test_bucket12345';
        await expect(validateIntegrationName('AAA')).rejects.toThrow('invalid');
        await expect(validateIntegrationName('-aaa')).rejects.toThrow('invalid');
        await expect(validateIntegrationName('_aaa')).rejects.toThrow('invalid');
        await expect(validateIntegrationName('aaa-')).rejects.toThrow('invalid');
        await expect(validateIntegrationName('aaa_')).rejects.toThrow('invalid');
        await expect(validateIntegrationName('a aa')).rejects.toThrow('invalid');
      });

  //     - it should:
  //       - [TODO: checks .mashr/info.json if integration name already exists.
  //       error if it exists]
  //       - checks that bucket name is lowercase, numbers, dashes and underscores,
  //       - checks if bucket already exists, throws an error if bucket exists
  //       starts with a number or letter, throws error if
  //       - checks if function name is available, throws error if not
  });

  // describe('createBuckets()', async () => {
    // it('Creates storage and archive buckets', async () => {
      // const bucketName = 'mashr_test_bucket12345';
      // await createBuckets(bucketName);
      // const errMsg = `Bucket name "${bucketName}" unavailable.`;
      // await expect(bucketExists(bucketName)).rejects.toThrow(errMsg);
    // });

    // it('add integration name to .mashr/info.json', async () => {

    // });
  //   it createStorageBuckets
  //     - it should:
  //       - create storage bucket
  //       - add storage name to .mashr/info.json
  //       - create archive storage bucket
  //       - add archive storage name to .mashr/info.json
  // });

});

  // describe('addIntegrationToDirectory()', async () = {
  //     - add integration name to info.json file .mashr/ dir
  // })
  // test('what we test', async () => {
  //   // code
  // });

const configureCredentials = require('../src/utils/configureCredentials');
const { readYaml, readFile, writeFile} = require('../src/utils/fileUtils');
const path = require('path');
const fs = require('fs');

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

});


  // describe('validateIntegrationName()', async () => {
  //     - it should:
  //       - [TODO: checks .mashr/info.json if integration name already exists.
  //       error if it exists]
  //       - check if buckets are available (bucket and bucket-archive)
  //       - checks if bucket already exists, throws an error if bucket exists
  //       - checks that bucket name is lowercase, numbers, dashes and underscores,
  //       starts with a number or letter, throws error if
  //       - checks if function name is available, throws error if not
  // })
  
  // describe('createBuckets()', async () = {
  //   it createStorageBuckets
  //     - it should:
  //       - create storage bucket
  //       - add storage name to .mashr/info.json
  //       - create archive storage bucket
  //       - add archive storage name to .mashr/info.json
  // })

  // describe('addIntegrationToDirectory()', async () = {
  //     - add integration name to info.json file .mashr/ dir
  // })
  // test('what we test', async () => {
  //   // code
  // });
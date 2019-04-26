// to test, you need your service account keyfile.json
// in the "tests" directory of the npm package

const {
  configureCredentials,
  createBuckets,
  destroyBuckets,
  createCloudFunction,
  destroyCloudFunction,
  functionExists,
} = require('../src/gcp');

const {
  rimraf,
  readYaml,
} = require('../src/utils');

describe('cloud function', () => {
  let mashrConfigObj;
  const integrationName = 'mashr_test_cloud_function';

  beforeAll(async () => {
    const mashrConfigPath = './templates/mashrTemplates/default_config.yml';
    mashrConfigObj = await readYaml(mashrConfigPath);
    mashrConfigObj.mashr.integration_name = integrationName;
    mashrConfigObj.mashr.json_keyfile = './tests/keyfile.json'

    await configureCredentials(mashrConfigObj);
    await createBuckets(integrationName);
  }, 60000);

  afterAll(async () => {
    await destroyBuckets(integrationName);
    rimraf.sync('./function');
  }, 60000);

  describe('createCloudFunction()', () => {
    it('throws error if mashrConfigObj is not passed', async () => {
      await expect(createCloudFunction())
        .rejects
        .toThrow(/Cannot read property 'mashr' of undefined/);
    }, 120000);

    it('successfully returns; does not throw an error', async () => {
      const result = await createCloudFunction(mashrConfigObj);
      expect(result).toBe(undefined);
    }, 120000);

    it('created a function; functionExists returns true', async () => {
      const result = await functionExists(integrationName);
      expect(result).toBe(true);
    }, 120000);
  });

  describe('destroyCloudFunction()', () => {
    it('successfully returns; does not throw an error', async () => {
      const result = await destroyCloudFunction(integrationName);
      expect(result).toBe(undefined);
    }, 120000);

    it('destroyed a function; functionExists returns false', async () => {
      const result = await functionExists(integrationName);
      expect(result).toBe(false);
    }, 120000);
  });
});

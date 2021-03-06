// to test, you need your service account keyfile.json
// in the "tests" directory of the npm package

const { readYaml } = require('../src/utils');
const {
  bucketExists,
  createBuckets,
  configureCredentials,
  destroyBuckets,
} = require('../src/gcp');

describe('GCS buckets', function() {
  let mashrConfigObj;
  let integrationName;

  beforeAll(async() => {
    const mashrConfigPath = './templates/mashrTemplates/default_config.yml';
    const keyfilePath = './tests/keyfile.json';
    mashrConfigObj = await readYaml(mashrConfigPath);
    integrationName = 'mashr-test-buckets';

    mashrConfigObj.mashr.json_keyfile = keyfilePath;
    mashrConfigObj.mashr.integration_name = integrationName;

    await configureCredentials(mashrConfigObj);
  });

  afterAll(async() => {
    await destroyBuckets(integrationName);
  });

  beforeEach(async() => {
    jest.setTimeout(120000);
  });

  describe('createBuckets()', () => {
    it('throws error if mashrConfigObj is not passed', async() => {
      await expect(createBuckets())
        .rejects
        .toThrow(/A name is required to create a bucket/);
    });

    it('successfully returns; does not throw an error', async() => {
      const result = await createBuckets(integrationName);

      expect(result).toBe(undefined);
    });

    it('created a bucket; bucketExists returns true', async() => {
      const result = await bucketExists(integrationName);
      expect(result).toBe(true);
    });

    it('createBuckets throws an error; bucket already exists', async() => {
      await expect(createBuckets(integrationName))
        .rejects
        .toThrow('You already own this bucket. Please select another name.');
    });

  });

  describe('destroyBuckets()', () => {
    it('successfully returns; does not throw an error', async() => {
      const result = await destroyBuckets(integrationName);
      expect(result).toBe(undefined);
    });

    it('destroyed staging bucket; bucketExists returns false', async() => {
      const result = await bucketExists(integrationName);
      expect(result).toBe(false);
    });

    it('destroyed archive bucket; bucketExists returns false', async() => {
      const result = await bucketExists(integrationName + '_archive');
      expect(result).toBe(false);
    });
  });
});

// to test, you need your service account keyfile.json
// in the root directory of the npm package

// TODO: teardown: delete function folder that's created in root dir of project

const { configureCredentials } = require('../src/utils');

const {
  createBuckets,
  destroyBuckets,
  createCloudFunction,
  destroyCloudFunction,
  functionExists,
} = require('../src/gcp');

const { validateMashrConfig } = require('../src/utils');

// unneeded fields for test are commented out
const mashrConfigObj = {
  mashr: {
    // service_account_email: 'user@project.iam.gserviceaccount.com',
    json_keyfile: 'keyfile.json',
    // table_id: 'table',
    // dataset_id: 'dataset',
    // project_id: 'project',
    integration_name: 'mashr_test_cloud_function',
    // embulk_run_command: 'embulk run embulk_config.yml',
    // embulk_gems: [ 'embulk-input-random' ],
  },
  // embulk: {
  //   exec: { min_output_tasks: 1 },
  //   in: {
  //     type: 'random',
  //     rows: 10,
  //     threads: 1,
  //     schema: {
  //       myid: 'primary_key',
  //       name: 'string',
  //       score: 'integer',
  //     },
  //   },
  // },
};

describe('cloud function', () => {
  let integrationName;

  beforeAll(async () => {
    integrationName = mashrConfigObj.mashr.integration_name;

    await configureCredentials(mashrConfigObj);
    await createBuckets(integrationName);
  }, 60000);

  afterAll(async () => {
    await destroyBuckets(integrationName);
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

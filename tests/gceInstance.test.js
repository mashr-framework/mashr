const path = require('path');
const {
  createGCEInstance,
  configureCredentials,
  getGCEInstance,
  destroyGCEInstance,
} = require('../src/gcp');

const {
  readYaml,
  readJsonFile,
} = require('../src/utils');

describe('GCE Instance', () => {

  let mashrConfigObj;
  const integrationName = 'mashr-test-gce-instance';

  beforeAll(async() => {
    const mashrConfigPath = path.resolve('./') +
                            '/templates/mashrTemplates/rand_config.yml';
    const keyfile = await readJsonFile('./tests/keyfile.json');
    const service_account_email = keyfile.client_email;
    const project_id = keyfile.project_id;
    mashrConfigObj = await readYaml(mashrConfigPath);
    mashrConfigObj.mashr.json_keyfile = './tests/keyfile.json';
    mashrConfigObj.mashr.service_account_email = service_account_email;
    mashrConfigObj.mashr.table_id = 'mashr_test_gce_instance';
    mashrConfigObj.mashr.dataset_id = 'mashr_test_gce_instance';
    mashrConfigObj.mashr.project_id = project_id;
    mashrConfigObj.mashr.integration_name = integrationName;
    await configureCredentials(mashrConfigObj);
  }, 60000);

  describe('CreateGCEInstance()', () => {
    it('successfully returns; does not throw an error', async() => {
      const result = await createGCEInstance(mashrConfigObj);
      expect(result).toBe(undefined);
    }, 120000);

    it('creates a new GCE Instance', async() => {

      const gceInstance = await getGCEInstance(integrationName);
      expect(typeof gceInstance).toBe('object');
    }, 120000);
  });

  describe('destroyGCEInstance()', () => {
    it('successfully returns; does not throw an error', async() => {
      const result = await destroyGCEInstance(integrationName);
      expect(result).toBe(undefined);
    }, 120000);

    it('getGCEInstance() returns undefined', async() => {
      const gceInstance = await getGCEInstance(integrationName);
      expect(typeof gceInstance).toBe('undefined');
    }, 120000);
  });
});

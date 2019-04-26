const { BigQuery } = require('@google-cloud/bigquery');
const { readYaml } = require('../src/utils');

const { 
  configureCredentials,
  createDataset,
  destroyDataset,
} = require('../src/gcp');

describe('createDataset()', () => {
  let mashrConfigObj;
  let datasetId = 'mashr_test_dataset';
  let dataset;
  let bigquery;

  beforeAll(async () => {
    const mashrConfigPath = './templates/mashrTemplates/default_config.yml';
    mashrConfigObj = await readYaml(mashrConfigPath);
    mashrConfigObj.mashr.dataset_id = datasetId;
    mashrConfigObj.mashr.json_keyfile = './tests/keyfile.json';

    await configureCredentials(mashrConfigObj);
    bigquery = new BigQuery();
  }, 120000);

  afterAll(async () => {
    await destroyDataset(datasetId);
  }, 120000);

  it('throws an error if mashrConfigObj is not passed', async () => {
    await (expect(createDataset()))
      .rejects
      .toThrow(/Cannot read property 'mashr' of undefined/);
  }, 120000);

  it('successfully returns; does not throw an error', async () => {
    const result = await createDataset(mashrConfigObj);
    expect(result).toBe(undefined);
  }, 120000);

  it('created a dataset; exists() returns true', async () => {
    dataset = bigquery.dataset(datasetId);
    const data = await dataset.exists();
    const result = data[0];

    expect(result).toBe(true);
  }, 120000);

});

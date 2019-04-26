// this script is only used for testing
const { BigQuery } = require('@google-cloud/bigquery');
const ora = require('ora');
const { mashrLogger } = require('../utils');

const destroyDataset = async (datasetId) => {
  const spinner = ora();

  const bigquery = new BigQuery();
  const dataset = bigquery.dataset(datasetId);
  const data = await dataset.exists();
  const exists = data[0];

  if (exists) {
    try {
      await dataset.delete();
      mashrLogger(spinner, 'succeed', `Dataset "${datasetId}" is destroyed`);
    } catch (e) {
      mashrLogger(spinner, 'fail', 'Dataset deletion failed');
      throw(e);
    }
  }
};

module.exports = {
  destroyDataset,
};

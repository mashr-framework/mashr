const { exec } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');
const { BigQuery } = require('@google-cloud/bigquery');

module.exports = async(mashrConfigObj) => {
  const spinner = ora();
  mashrLogger(spinner, 'start');

  const bigquery = new BigQuery();

  const datasetId = mashrConfigObj.mashr.dataset_id.trim();
  const dataset = bigquery.dataset(datasetId);

  const data = await dataset.exists();
  const exists = data[0]

  if (exists) {
    mashrLogger(spinner, 'warn', `Dataset "${datasetId}" already exists... continuing`);
  } else {
    try {
      await bigquery.createDataset(datasetId)
      mashrLogger(spinner, 'succeed', `Dataset "${datasetId}" created.`);
    } catch(e) {
      mashrLogger(spinner, 'fail', 'Dataset creation failed.');
      throw(e);
    }
  }
}

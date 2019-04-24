const { exec } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

module.exports = async (mashrConfigObj) => {
  const spinner = ora();

  mashrLogger(spinner, 'start');

  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  const datasetId = mashrConfigObj.mashr.dataset_id.trim();
  const projectId = mashrConfigObj.mashr.project_id.trim();

  const command = "bq --location=US mk --dataset " +
                  `--description "The dataset for ${integrationName}." ` +
                  `${projectId}:${datasetId}`;


  try {
    await exec(command);
    mashrLogger(spinner, 'succeed', `Dataset "${datasetId}" created.`);
  } catch (e) {
    if (e.stdout.includes('already exists') || e.stdout.includes("already\nexists")) {
      mashrLogger(spinner, 'warn', `Dataset "${datasetId}" already exists... continuing`);
    } else {
      mashrLogger(spinner, 'fail', 'Dataset creation failed.');
      throw(e);
    }
  }
};

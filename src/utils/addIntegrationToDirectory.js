const { writeResources } = require('./fileUtils');
const path = require('path');

const addIntegrationToDirectory = async (mashrConfigObj) => {
  const integrationName = mashrConfigObj.mashr.integration_name;
  const object = {
    projectId: mashrConfigObj.mashr.project_id,
    datasetId: mashrConfigObj.mashr.dataset_id,
    tableId: mashrConfigObj.mashr.table_id,
    path: path.resolve('./'),
  }

  await writeResources('integrations', integrationName, object);
}

module.exports = {
  addIntegrationToDirectory,
}

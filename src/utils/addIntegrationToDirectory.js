const { writeResources } = require('./fileUtils');
const path = require('path');

module.exports = async function addIntegrationToDirectory(mashrConfigObj) {
  const integrationName = mashrConfigObj.mashr.integration_name;
  const object = {
    projectId: mashrConfigObj.mashr.project_id,
    datasetId: mashrConfigObj.mashr.dataset_id,
    tableId: mashrConfigObj.mashr.table_id,
    path: path.resolve('./'),
  }

  await writeResources('integrations', integrationName, object);
}

const { readResources } = require('../utils/fileUtils');

module.exports = async (args) => {
  const infoObj = await readResources();
  const integrationNames = Object.keys(infoObj.integrations);

  const result = integrationNames.map(function (name) {
    var integration = infoObj.integrations[name];

    return `
    ${name}:
      projectId: ${integration.projectId}
      datasetId: ${integration.datasetId}
        tableId: ${integration.tableId}
    `;
  });

  console.log(result.join('\n'));
};

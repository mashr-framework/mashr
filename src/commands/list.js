const { readResources } = require('../utils/fileUtils');

module.exports = async (args) => {
  const infoObj = await readResources();
  const integrationNames = Object.keys(infoObj.integrations);

  if (integrationNames.length === 0) {
    console.log(`
      No integrations. Run "mashr init" to start a new` +
     ` integration.
     `);
    return;
  }
  const result = integrationNames.map(function (name) {
    var integration = infoObj.integrations[name];

    return `
    ${name}:
      projectId: ${integration.projectId}
      datasetId: ${integration.datasetId}
        tableId: ${integration.tableId}
           path: ${integration.path}
    `;
  });

  console.log(result.join('\n'));
};

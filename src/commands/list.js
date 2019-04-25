const { readResources } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');
const chalk = require('chalk');

module.exports = async (args) => {
  const spinner = ora();

  const infoObj = await readResources();
  const integrationNames = Object.keys(infoObj.integrations);

  if (integrationNames.length === 0) {
    mashrLogger(
      spinner,
      'fail',
      'No integrations. Run "mashr init" to start a new integration.\n'
    );

    return;
  }
  const result = integrationNames.map(function (name) {
    var integration = infoObj.integrations[name];
    name = chalk.bold.red(name);

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

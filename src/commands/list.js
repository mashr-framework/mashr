const { 
  readResources,
  mashrLogger
 } = require('../utils');
const ora = require('ora');
const chalk = require('chalk');
const { table } = require('table');

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

  let headers = Object.keys(infoObj.integrations[integrationNames[0]]);
  let data = [
    ['integration_name'].concat(headers),
  ];

  integrationNames.forEach((name) => {
    const integration = infoObj.integrations[name];
    const row = [styleField(name)];

    Object.keys(integration).forEach((key) => {
      const val = integration[key];
      row.push(styleField(val));
    });


    data.push(row);
  });

  console.log(table(data));
};

const styleField = (field) => chalk.gray(field);

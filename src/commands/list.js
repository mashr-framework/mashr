const {
  readResources,
  mashrLogger,
} = require('../utils');
const ora = require('ora');
const { table } = require('table');

module.exports = async(args) => {
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
    ['integrationName'].concat(headers),
  ];

  integrationNames.forEach((name) => {
    const integration = infoObj.integrations[name];
    const row = [name];

    Object.keys(integration).forEach((key) => {
      const val = integration[key];
      row.push(val);
    });


    data.push(row);
  });

  const config = {
    columns: {},
  };

  data[0].forEach((col, idx) => {
    switch (col) {
      case 'integration_name':
        config.columns[idx] = {
          width: col.length,
          wrapWord: true,
        };
        break;
      case 'projectId':
        config.columns[idx] = {
          width: col.length,
          wrapWord: true,
        };
        break;
      case 'datasetId':
        config.columns[idx] = {
          width: col.length,
          wrapWord: true,
        };
        break;
      case 'tableId':
        config.columns[idx] = {
          width: col.length,
          wrapWord: true,
        };
        break;
      case 'path':
        config.columns[idx] = {
          width: col.length + 16,
          wrapWord: true,
        };
        break;
    }
  });

  console.log(table(data, config));
};

const path = require('path');
const { copyFile } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

module.exports = async function copyMashrConfigTemplate() {
  const spinner = ora();
  const configTemplate = `${__dirname}/${'../../templates/mashrTemplates/defualt_config.yml'}`

  const workingDir = path.resolve('./');
  const destination = `${workingDir}/mashr_config.yml`;

  await copyFile(configTemplate, destination);
  mashrLogger(spinner, 'succeed', '"mashr_config.yml" template file created.');
}

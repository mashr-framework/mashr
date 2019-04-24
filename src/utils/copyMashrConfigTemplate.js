const path = require('path');
const { copyFile } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

const spinner = ora();

const workingDir = path.resolve('./');
const destination = `${workingDir}/mashr_config.yml`;

module.exports = async function copyMashrConfigTemplate() {
  const configTemplate = `${__dirname}/${'../../templates/mashr_template.yml'}`

  await copyFile(configTemplate, destination);
  mashrLogger(spinner, 'succeed', '"mashr_config.yml" template file created.');
}

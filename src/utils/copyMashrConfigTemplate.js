const path = require('path');
const workingDir = path.resolve('./');
const destination = `${workingDir}/mashr_config.yml`;
const { copyFile } = require('../utils/fileUtils');

module.exports = async function copyMashrConfigTemplate() {
  const configTemplate = `${__dirname}/${'../../templates/mashr_template.yml'}`

  await copyFile(configTemplate, destination);
  console.log('"mashr_config.yml" template file created.');
}


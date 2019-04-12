const path = require('path');
const { copyFile } = require('../utils/fileUtils.js')

module.exports = async (args) => {
  const workingDir = path.resolve('./');
  const destination = `${workingDir}/mashr_config.yml`;
  const configTemplate = `${__dirname}/${'../../templates/mashr_template.yml'}`
  
  await copyFile(configTemplate, destination);
}

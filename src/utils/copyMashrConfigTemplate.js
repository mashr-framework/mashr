const path = require('path');
const { copyFile } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

module.exports = async function copyMashrConfigTemplate(template) {
  
  const spinner = ora();
  const configTemplate = templatePath(template);

  const workingDir = path.resolve('./');
  const destination = `${workingDir}/mashr_config.yml`;

  await copyFile(configTemplate, destination);
  mashrLogger(spinner, 'succeed', '"mashr_config.yml" template file created.');
}

const templatePath = (template) => {
  basePath =`${__dirname}/../../templates/mashrTemplates`;
  
  const templates = {
    default: 'defualt_config.yml',
    random: 'rand_config.yml',
    psql: 'psql_config.yml',
    http: 'http_config.yml'
  };

  if (templates[template]) {
    return `${basePath}/${templates[template]}`;
  } else {
    return `${basePath}/${templates.default}`;
  }
}

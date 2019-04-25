const path = require('path');
const { copyFile } = require('../utils/fileUtils');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

const copyMashrConfigTemplate = async (template) {

  const spinner = ora();
  const configTemplate = templatePath(template);

  const workingDir = path.resolve('./');
  const destination = `${workingDir}/mashr_config.yml`;

  await copyFile(configTemplate, destination);
  mashrLogger(spinner, 'succeed', '"mashr_config.yml" template file created.\n\n' +
 'Please fill out the empty fields in the `mashr_config.yml` ' +
 'file before running `mashr deploy`.\n'
  );
}

const templatePath = (template) => {
  basePath =`${__dirname}/../../templates/mashrTemplates`;

  const templates = {
    default: 'default_config.yml',
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

module.exports {
  copyMashrConfigTemplate,
  templatePath,
};

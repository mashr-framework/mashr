const fs   = require('fs');
const path = require('path');
const { copyFile } = require('../utils/fileUtils');
const workingDir = path.resolve('./');
const destination = `${workingDir}/mashr_config.yml`;

module.exports = async function setupMashrConfig(serviceAccount) {
  await copyMashrConfigTemplate();
  await addServiceAccountEmail(serviceAccount);
}

async function copyMashrConfigTemplate() {
  const configTemplate = `${__dirname}/${'../../templates/mashr_template.yml'}`

  await copyFile(configTemplate, destination);
  console.log('"mashr_config.yml" template file created.');
}

async function addServiceAccountEmail(serviceAccount) {
  const mashrConfig = `${workingDir}/mashr_config.yml`;
  const serviceAccountEmail = serviceAccount.service_account_email;

  fs.readFile(mashrConfig, 'utf8', (e, data) => {
    const result = data.replace('_SERVICE_ACCOUNT_EMAIL_', serviceAccountEmail)
    fs.writeFile(mashrConfig, result, 'utf8', (e) => {
      console.log('Added service account email.')
    })
  });
}


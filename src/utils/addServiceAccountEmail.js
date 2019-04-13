const path = require('path');
const workingDir = path.resolve('./');
const {
  copyFile,
  readFile,
  writeFile,
} = require('./fileUtils');

module.exports = async function addServiceAccountEmail(serviceAccount) {
  const mashrConfig = `${workingDir}/mashr_config.yml`;
  const serviceAccountEmail = serviceAccount.service_account_email;

  readFile(mashrConfig, 'utf8', (e, data) => {
    const result = data.replace('_SERVICE_ACCOUNT_EMAIL_', serviceAccountEmail)
    writeFile(mashrConfig, result, 'utf8', (e) => {
      console.log('Added service account email.')
    })
  });
}

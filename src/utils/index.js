const { addIntegrationToDirectory } = require('./addIntegrationToDirectory');
const { mashrLogger } = require('./mashrLogger');
const { catchSetupAndConfig } = require('./catchSetupAndConfig');
const { setupDirectoriesAndFiles } = require('./setupDirectoriesAndFiles');
const {
  configureCredentials,
  getPathToKeyFile,
} = require('./configureCredentials');
const {
  copyMashrConfigTemplate,
  templatePath,
} = require('./copyMashrConfigTemplate');
const {
  validateMashrConfig,
  checkRequiredValues,
  errorIfMissing,
  checkIntegrationExists,
  validateIntegrationName,
  validateKeyfile,
  validateEmbulkRunCommand,
  validateBQNames,
} = require('./validateMashrConfig');
const {
  copyFile,
  createDirectory,
  createJSONFile,
  exec,
  exists,
  getMashrPath,
  mkdir,
  readFile,
  readResources,
  readYaml,
  removeResource,
  rimraf,
  writeFile,
  writeResources,
 } = require('./fileUtils');

console.log('mashrLogger, index: ', mashrLogger);
console.log('mashrLogger, index: ', typeof mashrLogger);
module.exports = {
  addIntegrationToDirectory,
  mashrLogger,
  catchSetupAndConfig,
  setupDirectoriesAndFiles,
  configureCredentials,
  getPathToKeyFile,
  copyMashrConfigTemplate,
  templatePath,
  validateMashrConfig,
  checkRequiredValues,
  errorIfMissing,
  checkIntegrationExists,
  validateIntegrationName,
  validateKeyfile,
  validateEmbulkRunCommand,
  validateBQNames,
  copyFile,
  createDirectory,
  createJSONFile,
  exec,
  exists,
  getMashrPath,
  mkdir,
  readFile,
  readResources,
  readYaml,
  removeResource,
  rimraf,
  writeFile,
  writeResources,
}

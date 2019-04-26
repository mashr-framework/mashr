const { addIntegrationToDirectory } = require('./addIntegrationToDirectory');
const { mashrLogger } = require('./mashrLogger');
const { catchSetupAndConfig } = require('./catchSetupAndConfig');
const { setupDirectoriesAndFiles } = require('./setupDirectoriesAndFiles');
const { confirmDestroy } = require('./confirmDestroy');

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

module.exports = {
  confirmDestroy,
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
};

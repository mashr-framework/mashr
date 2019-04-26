const path = require('path');
const ora = require('ora');
const { mashrLogger } = require('./mashrLogger');
const {
  readYaml,
  exists,
  readResources,
} = require('./fileUtils');

const validateMashrConfig = async (mashrConfigPath) => {
  const spinner = ora();

  if (!(await exists(mashrConfigPath))) {
    throw new Error(`no mashr_config.yml file at path: ${mashrConfigPath}.`);
  }

  const mashrConfigObj = await readYaml(mashrConfigPath);

  try {
    checkRequiredValues(mashrConfigObj);
    await checkIntegrationExists(mashrConfigObj.mashr.integration_name);
    validateIntegrationName(mashrConfigObj.mashr.integration_name);
    validateBQNames(mashrConfigObj.mashr.table_id);
    validateBQNames(mashrConfigObj.mashr.dataset_id);
    validateKeyfile(mashrConfigObj.mashr.json_keyfile);
    validateEmbulkRunCommand(mashrConfigObj.mashr.embulk_run_command);
  } catch (e) {
    throw(e);
  }

  return mashrConfigObj;
};

const checkRequiredValues = (mashrConfigObj) => {
  errorIfMissing('json_keyfile', mashrConfigObj.mashr.json_keyfile);
  errorIfMissing('dataset_id', mashrConfigObj.mashr.dataset_id);
  errorIfMissing('table_id', mashrConfigObj.mashr.table_id);
  errorIfMissing('project_id', mashrConfigObj.mashr.project_id);
  errorIfMissing('integration_name', mashrConfigObj.mashr.integration_name);
  errorIfMissing('embulk_run_command', mashrConfigObj.mashr.embulk_run_command);
  errorIfMissing('embulk.in.type', mashrConfigObj.embulk.in.type);
};

const errorIfMissing = (key, value) => {
  if (!value) {
    throw new Error(`${key} is missing a value.`);
  }
};

const checkIntegrationExists = async (integrationName) => {
  const infoObj = await readResources();

  if (infoObj.integrations[integrationName]) {
    throw new Error('Integration already exists.');
  }
};

const validateIntegrationName = (integrationName) => {
  if ( !(/^(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?)$/.test(integrationName)) ) {
    throw new Error(`Invalid integration name: ${integrationName}.
Name must match regex: (?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?)`);
  }
};

const validateKeyfile = async (keyfileName) => {
  const keyfilePath = `${path.resolve('./')}/${keyfileName}`;
  const parts = keyfilePath.split('.');
  const hasValidName = parts[parts.length - 1] === 'json' && parts[0].length > 1;

  if (!hasValidName) {
    throw new Error(`${keyfileName} is not a valid keyfile name.`);
  }

  if (!(await exists(keyfilePath))) {
    throw new Error('No keyfile. Keyfile path is required in mashr_config ' +
      'and must be in the root of the working directory.');
  }
};

const validateEmbulkRunCommand = (runCommand) => {
  if (!runCommand.includes(' embulk_config.yml')) {
    throw new Error("Embulk run command is missing, ' embulk_config.yml'.");
  }
};

const validateBQNames = (name) => {
  if ( !(/^[_A-z0-9]{0,1024}$/.test(name)) ) {
    throw new Error(`Invalid dataset or table name: ${name}.
Name must match regex: ^[_A-z0-9]{0,1024}$`);
  }
};

module.exports = {
  validateMashrConfig,
  checkRequiredValues,
  errorIfMissing,
  checkIntegrationExists,
  validateIntegrationName,
  validateKeyfile,
  validateEmbulkRunCommand,
  validateBQNames,
};

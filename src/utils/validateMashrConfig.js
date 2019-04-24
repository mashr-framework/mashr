const {
  readYaml,
  exists,
  readResources,
} = require('./fileUtils');
const path = require('path');
const ora = require('ora');
const mashrLogger = require('./mashrLogger');

module.exports = async function validateMashrConfig(mashrConfigPath) {
  const spinner = ora();

  if (!(await exists(mashrConfigPath))) {
    mashrLogger(spinner, 'fail', '"mashr_config.yml" validation failed');
    throw new Error(`no mashr_config.yml file at path: ${mashrConfigPath}.`);
  }

  const mashrConfigObj = await readYaml(mashrConfigPath);

  checkRequiredValues(mashrConfigObj, spinner);
  await checkIntegrationExists(mashrConfigObj.mashr.integration_name, spinner);
  validateIntegrationName(mashrConfigObj.mashr.integration_name, spinner);
  validateKeyfile(mashrConfigObj.mashr.json_keyfile, spinner);
  validateEmbulkRunCommand(mashrConfigObj.mashr.embulk_run_command, spinner);

  return mashrConfigObj;
};

const checkRequiredValues = (mashrConfigObj, spinner) => {
  errorIfMissing('json_keyfile', mashrConfigObj.mashr.json_keyfile, spinner);
  errorIfMissing('dataset_id', mashrConfigObj.mashr.dataset_id, spinner);
  errorIfMissing('table_id', mashrConfigObj.mashr.table_id, spinner);
  errorIfMissing('project_id', mashrConfigObj.mashr.project_id, spinner);
  errorIfMissing('integration_name', mashrConfigObj.mashr.integration_name, spinner);
  errorIfMissing('embulk_run_command', mashrConfigObj.mashr.embulk_run_command, spinner);
  errorIfMissing('embulk.in.type', mashrConfigObj.embulk.in.type, spinner);
};

const errorIfMissing = (key, value, spinner) => {
  if (!value) {
    mashrLogger(spinner, 'fail', '"mashr_config.yml" validation failed');
    throw new Error(`${key} is missing a value.`);
  }
};

const checkIntegrationExists = async (integrationName, spinner) => {
  const infoObj = await readResources(spinner);

  if (infoObj.integrations[integrationName]) {
    mashrLogger(spinner, 'fail', '"mashr_config.yml" validation failed');
    throw new Error('Integration already exists.');
  }
};

const validateIntegrationName = (integrationName, spinner) => {
  if ( !(/^(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?)$/.test(integrationName)) ) {
    mashrLogger(spinner, 'fail', '"mashr_config.yml" validation failed');
    throw new Error(`Invalid integration name: ${integrationName}.
Name must match regex: (?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?)`);
  }
};

const validateKeyfile = async (keyfileName, spinner) => {
  const keyfilePath = `${path.resolve('./')}/${keyfileName}`;
  const parts = keyfilePath.split('.');
  const hasValidName = parts[parts.length - 1] === 'json' && parts[0].length > 1;

  if (!hasValidName) {
    mashrLogger(spinner, 'fail', '"mashr_config.yml" validation failed');
    throw new Error(`${keyfileName} is not a valid keyfile name`);
  }

  if (!(await exists(keyfilePath))) {
    mashrLogger(spinner, 'fail', '"mashr_config.yml" validation failed');
    throw new Error('No keyfile. Keyfile path is required in mashr_config ' +
      'and must be in the root of the working directory.');
  }
};

const validateEmbulkRunCommand = (runCommand, spinner) => {
  if (!runCommand.includes(' embulk_config.yml')) {
    mashrLogger(spinner, 'fail', '"mashr_config.yml" validation failed');
    throw new Error("Embulk run command is missing, ' embulk_config.yml '.");
  }
};

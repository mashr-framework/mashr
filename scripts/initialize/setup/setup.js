yaml = require('js-yaml');
fs   = require('fs');

var configFiles = (() => {
  const config = yaml.safeLoad(fs.readFileSync('mashr_config.yml', 'utf8'));
  mashrConfig = config.mashr;
  embulkConfig = config.embulk;
  return { mashrConfig, embulkConfig };
})();

var gcs_path_prefix = `staging/${mashrConfig.dataset_id}`;

var functionName = `mashr_${mashrConfig.dataset_id}` +
                   `_${embulkConfig.in.type}` +
                   `_${mashrConfig.table_id}`;

function generateEmbulkConfig() {
  const { mashrConfig, embulkConfig } = configFiles;
  const gcs_full_path = gcs_path_prefix + 
                        `/${embulkConfig.in.type}_to_` +
                        `${mashrConfig.table_id}_{{ env.DATE }}`;

  embulkConfig['out'] = {
    type: 'gcs',
    bucket: mashrConfig.bucket,
    path_prefix: gcs_full_path,
    file_ext: '.json',
    auth_method: 'json_key',
    service_account_email: mashrConfig.service_account_email,
    json_keyfile: mashrConfig.json_keyfile,
    formatter: {
      type: 'jsonl'
    },
  };

  embulkConfigYml = yaml.safeDump(embulkConfig);

  fs.writeFile('./embulk_config\.yml.liquid', embulkConfigYml, (e) => {
    console.log('Generated embulk_config.yml file.')
  });
}
// mashr_datasetId_source_tableName
function generateCloudFunctionInstallScript() {
  const { mashrConfig, embulkConfig } = configFiles;

  let command = `#!/bin/bash\n\n`;
  command += `gcloud functions deploy ${functionName} --runtime nodejs6` +
            `--trigger-resource ${gcs_path_prefix} --trigger-event` +
            `google.storage.object.finalize`;
  fs.writeFile('./cloud_function/install.sh', command, (e) => {
    console.log('Generated install.sh file.');
  });
}

function updateCloudFunctionName() {
  const functionTemplate = './setup/cloud_function_template/index.js'
  const projectId = configFiles.mashrConfig.project_id;
  const datasetId = configFiles.mashrConfig.dataset_id;

  fs.readFile(functionTemplate, 'utf8', (e, data) => {
    const result = data.replace('_FUNCTION_NAME_', functionName)
                       .replace('_PROJECT_ID_', configFiles.mashrConfig.project_id)
                       .replace('_DATASET_ID_', configFiles.mashrConfig.dataset_id)
                       .replace('_TABLE_ID_', configFiles.mashrConfig.table_id)
                       .replace('_GCS_PATH_', gcs_path_prefix);
    const functionFile = './cloud_function/index.js'
    fs.writeFile(functionFile, result, 'utf8', (e) => {
      console.log('Updated function name in index.js.');
    })
  });
}

module.exports = {
  generateEmbulkConfig,
  generateCloudFunctionInstallScript,
  updateCloudFunctionName,
}
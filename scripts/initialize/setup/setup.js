yaml = require('js-yaml');
fs   = require('fs');

var configFiles = (() => {
  const config = yaml.safeLoad(fs.readFileSync('mashr_config.yml', 'utf8'));
  mashrConfig = config.mashr;
  embulkConfig = config.embulk;
  return { mashrConfig, embulkConfig };
})();

const { mashrConfig, embulkConfig } = configFiles;

const name = mashrConfig.integration_name;
const source = embulkConfig.in.type;
const dataset = mashrConfig.dataset_id;
const table = mashrConfig.table_id;

const bucketName = `mashr_${name}_${source}_to_${dataset}_${table}`;
const functionName = bucketName;

function generateEmbulkConfig() {
  embulkConfig['out'] = {
    type: 'gcs',
    bucket: bucketName,
    path_prefix: '{{ env.DATE }}',
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

function generateCloudFunction() {
  const functionTemplate = './setup/cloud_function_template/index.js'
  const projectId = configFiles.mashrConfig.project_id;
  const datasetId = configFiles.mashrConfig.dataset_id;

  fs.readFile(functionTemplate, 'utf8', (e, data) => {
    const result = data.replace('_FUNCTION_NAME_', functionName)
                       .replace('_PROJECT_NAME_', configFiles.mashrConfig.project_id);
    const functionFile = './cloud_function/index.js'
    fs.writeFile(functionFile, result, 'utf8', (e) => {
      console.log('Updated function name in index.js.');
    })
  });
}

module.exports = {
  generateEmbulkConfig,
  generateCloudFunction,
}

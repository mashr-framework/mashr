const yaml = require('js-yaml');

module.exports = (mashrConfigObj) => {
  const mashrConfig = mashrConfigObj.mashr;
  const embulkConfig = mashrConfigObj.embulk;

  const date = '{{ env.DATE }}'; // NOTE: `env.DATE`created by embulkScript.sh
  embulkConfig['out'] = {
    type: 'gcs',
    bucket: mashrConfig.integration_name,
    path_prefix: date,
    file_ext: '.json',
    auth_method: 'json_key',
    service_account_email: mashrConfig.service_account_email,
    json_keyfile: `/root/mashr/${mashrConfig.json_keyfile}`,
    formatter: {
      type: 'jsonl'
    },
  };

  return yaml.safeDump(embulkConfig);
}

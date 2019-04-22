const { readFile } = require('../utils/fileUtils');
const yaml = require('js-yaml');

module.exports = async function generateGCEResources(mashrConfigObj) {
  const dockerfile = await readFile(`${__dirname}/../../templates/docker/Dockerfile`);
  const gemInstallationScript = createGemInstallationScript(mashrConfigObj.mashr.embulk_gems);
  const keyfile = await readFile(`${mashrConfigObj.mashr.json_keyfile}`);
  const embulkScript = createEmbulkScript(mashrConfigObj.mashr.embulk_run_command);
  const crontab = await readFile(`${__dirname}/../../templates/docker/crontab`);
  const embulkConfig = createEmbulkConfig(mashrConfigObj);

  return {
    dockerfile,
    gemInstallationScript,
    keyfile,
    embulkScript,
    crontab,
    embulkConfig,
  };
};

const createEmbulkScript = (runCommand) => {
  // TODO: place logs in stackdriver
  // TODO: what to do with logs? Does the log file get too large?
  // diff file run from root of container. Can't use it after?
  runCommand = runCommand.replace(
    'embulk_config.yml', '/root/mashr/embulk_config.yml.liquid');

  const script =
`#!/bin/bash
export DATE=$(date +"%Y-%m-%dT%H-%M-%S-%3N")

${runCommand} >> /var/log/cron.log 2>&1
`;

  return script;
}

const createGemInstallationScript = (gems) => {
  if (!gems) return '#!/bin/bash';

  const installGemsArray = gems.map((name) => (
      `embulk gem install ${name}`
    )
  );

  return `#!/bin/bash\n${installGemsArray.join('\n')}`;
};


const createEmbulkConfig = (mashrConfigObj) => {
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
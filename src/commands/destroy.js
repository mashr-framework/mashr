const ora = require('ora');
const os = require('os');

const {
  confirmDestroy,
  mashrLogger,
  removeResource,
  readYaml,
  readResources,
} = require('../utils');

const {
  configureCredentials,
  destroyBuckets,
  destroyGCEInstance,
  destroyCloudFunction,
} = require('../gcp');

module.exports = async(args) => {

  const spinner = ora();
  const mashrConfigObj = await readYaml('./mashr_config.yml').catch((e) => {
    mashrLogger(spinner, 'fail', 'Destroy integration error');
    throw (e);
  });

  await configureCredentials(mashrConfigObj);

  const integrationName = args._[1];
  const mashrInfoObj = await readResources();
  const integrations = mashrInfoObj.integrations;

  if (!integrations[integrationName]) {
    const message = `"${integrationName}" is not an integration. Run ` +
                    '"mashr list" to see all integrations.';

    mashrLogger(spinner, 'fail', message);
  } else {
    await confirmDestroy();
    await Promise.all([
      destroyGCEInstance(integrationName),
      destroyBuckets(integrationName),
      destroyCloudFunction(integrationName),
    ]);
    await removeResource('integrations', integrationName);
    const homedir = os.homedir();
    mashrLogger(
      spinner,
      'succeed',
      `Integration is removed from "${homedir}/.mashr/info.json"`
    );
  }
};

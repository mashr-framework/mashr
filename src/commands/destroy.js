const {
  removeResource,
  readYaml,
  readResources,
  exec
} = require('../utils/fileUtils');
const { destroyBuckets } = require('../gcp/destroyBuckets');
const configureCredentials = require('../utils/configureCredentials');
const { functionExists } = require('../gcp/validateIntegrationName');

module.exports = async (args) => {
  const mashrConfigObj = await readYaml('./mashr_config.yml');
  await configureCredentials(mashrConfigObj);

  const integrationName = args._[1];
  const mashrInfoObj = await readResources();
  const integrations = mashrInfoObj.integrations;

  if (!integrations[integrationName]) {
    const message = `"${integrationName}" is not an integration. Run ` + 
                    `"mashr list" to see all integrations.`
    console.log(message);
  } else {
    await Promise.all([
      removeResource('integrations', integrationName),
      destroyBuckets(integrationName),
      destroyCloudFunction(integrationName),
    ]);
  }
}

const destroyCloudFunction = async (integrationName) => {
  const command = `gcloud functions delete ${integrationName} --quiet`;

  if (await functionExists(integrationName)) {
    const { stdout, stderr } = await exec(command);

    console.log(`Cloud function "${integrationName}" is destroyed.`);
  } else {
    console.log(
      `Cloud function "${integrationName}" does not exist ` +
      'and cannot be destroyed.'
    );
  }
};

// gcp
// destroyFunction(integrationName)

//gcp
// destroyGCEInstance(integrationName)
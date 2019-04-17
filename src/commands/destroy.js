const { removeResource, readYaml, readResources } = require('../utils/fileUtils');
const { destroyBuckets } = require('../gcp/destroyBuckets');
const configureCredentials = require('../utils/configureCredentials');

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
    await Promise.all([removeResource('integrations', integrationName),
    destroyBuckets(integrationName)]);
  }
}

// gcp
// destroyFunction(integrationName)

//gcp
// destroyGCEInstance(integrationName)
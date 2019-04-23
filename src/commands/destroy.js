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
      destroyGCEInstance(integrationName),
      destroyBuckets(integrationName),
      destroyCloudFunction(integrationName),
    ]);
    await removeResource('integrations', integrationName);
  }
};


const destroyCloudFunction = async (integrationName) => {
  const command = `gcloud functions delete ${integrationName} --quiet`;

  if (await functionExists(integrationName)) {
    const { stdout, stderr } = await exec(command);

    console.log(`Cloud function "${integrationName}" is destroyed.`);
  } else {
    console.log(
      `Cloud function "${integrationName}" does not exist` +
      '... continuing'
    );
  }
};

const Compute = require('@google-cloud/compute');


const destroyGCEInstance = async (integrationName) => {
  const instance = await getGCEInstance(integrationName);

  if (instance) {
    const compute = new Compute();
    const zone = compute.zone(instance.zone.id);
    const vm = zone.vm(integrationName);
    const [operation] = await vm.delete();
    await operation.promise();
    console.log(`GCE instance ${integrationName} is destroyed.`)
  } else {
    console.log(`GCE Instance "${integrationName}" does not exist` +
      '... continuing')
  }
};

const getGCEInstance = async (integrationName) => {
  const compute = new Compute();
  [instances] = await compute.getVMs({
    filter: `name eq ${integrationName}`,
  });
  return instances[0];
}
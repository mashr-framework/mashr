const {
  removeResource,
  readYaml,
  readResources,
  exec
} = require('../utils/fileUtils');
const { destroyBuckets } = require('../gcp/destroyBuckets');
const configureCredentials = require('../utils/configureCredentials');
const { functionExists } = require('../gcp/validateIntegrationName');
const ora = require('ora');

module.exports = async (args) => {
  await confirmDestroy();

  const spinner = ora().start();
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
  spinner.succeed();
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

const readline = require('readline-sync');

const confirmDestroy = async () => {
  const confirmationMessage = ` You are about to delete these resources:
  * Remove the integration from the list of mashr integrations
  * Destroy all related GCP resources, including:
    - The staging and archive GCS buckets
    - The Cloud Function
    - The GCE instance
Since the archive and staging GCS buckets will be permanently destroyed,
Consider moving your data before running this command.
Continue (y/n)> `

  let response = readline.question(confirmationMessage);
  response = response.trim();

  if (response === 'y') { response = 'yes'}
  if (response === 'n') { response = 'no'}

  switch (response) {
    case 'yes':
      // console.log('goodbye world!');
      // process.exit(0);
      break;
    case 'no':
      // console.log('hello world!');
      process.exit(0);
      break;
    default:
      console.log('');
      console.log(`Please choose 'y' or 'n'.`);
      console.log('');
      confirmDestroy();
      break;
  }
}

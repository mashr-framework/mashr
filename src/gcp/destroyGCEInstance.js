const Compute = require('@google-cloud/compute');
const ora = require('ora');
const mashrLogger = require('../utils/mashrLogger');

const destroyGCEInstance = async (integrationName) => {
  const spinner = ora();
  mashrLogger(spinner, 'start', 'destroying GCE instance...');

  const instance = await getGCEInstance(integrationName);

  if (instance) {
    const compute = new Compute();
    const zone = compute.zone(instance.zone.id);
    const vm = zone.vm(integrationName);
    const [operation] = await vm.delete();
    await operation.promise();

    mashrLogger(spinner, 'succeed', `GCE instance ${integrationName} is destroyed.`);
  } else {
    mashrLogger(
      spinner,
      'warn',
      `GCE Instance "${integrationName}" does not exist... continuing`
    );
  }
};

const getGCEInstance = async (integrationName) => {
  const compute = new Compute();
  [instances] = await compute.getVMs({
    filter: `name eq ${integrationName}`,
  });
  return instances[0];
}

module.exports = {
  destroyGCEInstance,
  getGCEInstance,
};

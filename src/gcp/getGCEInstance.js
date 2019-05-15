const Compute = require('@google-cloud/compute');

const getGCEInstance = async(integrationName) => {
  const compute = new Compute();
  const [instances] = await compute.getVMs({
    filter: `name eq ${integrationName}`,
  });
  return instances[0];
};

module.exports = {
  getGCEInstance
}
const {
  getMashrPath,
  exists,
  createDirectory,
} = require('./fileUtils');
const setupDirectoriesAndFiles = require ('./setupDirectoriesAndFiles');
// const createServiceAccount = require ('../gcp/createServiceAccount');
// const setupMashrConfig = require ('./setupMashrConfig');
const copyMashrConfigTemplate = require('./copyMashrConfigTemplate');

module.exports = async function catchSetupAndConfig(homeDir) {
  const mashrPath = await getMashrPath(homeDir);
  const mashrDirExists = await exists(mashrPath);

  if (!mashrDirExists) {
    await setupDirectoriesAndFiles(homeDir);
  }

  // createServiceAccount, returns {json keyfile, serviceA email}
  // let serviceAccount = await createServiceAccount();
  // await setupMashrConfig(serviceAccount);
  copyMashrConfigTemplate();

  return true;
};

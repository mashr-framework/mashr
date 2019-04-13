const {
  getMashrPath,
  exists,
  createDirectory,
} = require('./fileUtils');
const setupDirectoriesAndFiles = require ('./setupDirectoriesAndFiles');
const createServiceAccount = require ('../gcp/createServiceAccount');
const setupMashrConfig = require ('./setupMashrConfig');

module.exports = async function catchSetupAndConfig(homeDir) {
  const mashrPath = await getMashrPath(homeDir);
  const mashrDirExists = await exists(mashrPath);

  if (!mashrDirExists) {
    await setupDirectoriesAndFiles(homeDir);
  }

  // createServiceAccount, returns {json keyfile, serviceA email}
  let serviceAccount = await createServiceAccount();
  //
  // setupMashrConfig(object)
  // - copy mashr_config template
  // - add serviceA email to mashr_config
  await setupMashrConfig(serviceAccount);

  return true;
};
// save the key file to working directory
// create service account for integreation
//
// add service account email to mashr_config file

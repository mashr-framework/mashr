const {
  getMashrPath,
  exists,
  createDirectory,
} = require('./fileUtils');
const setupDirectoriesAndFiles = require ('./setupDirectoriesAndFiles');

module.exports = async function catchSetupAndConfig(homeDir) {
  const mashrPath = await getMashrPath(homeDir);
  const mashrDirExists = await exists(mashrPath);

  if (!mashrDirExists) {
    await setupDirectoriesAndFiles(homeDir);
  }

  return true;
};
// save the key file to working directory
// create service account for integreation
//
// add service account email to mashr_config file

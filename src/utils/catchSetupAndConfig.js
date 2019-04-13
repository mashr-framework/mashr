const {
  getMashrPath,
  exists,
  createDirectory,
} = require('./fileUtils');

module.exports = async function catchSetupAndConfig(homeDir) {
  const mashrPath = await getMashrPath(homeDir);
  const mashrDirExists = await exists(mashrPath);

  if (!mashrDirExists) {
    await setupDirectoriesAndFiles(homeDir);
  }

  return true;
};

function setupDirectoriesAndFiles(homeDir) {
  createDirectory('.mashr', homeDir);
}
// check if the .mashr directory exists (if not then create it)
//
// create service account for integreation
// save the key file to working directory
//
// add service account email to mashr_config file

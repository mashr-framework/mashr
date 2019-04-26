const {
  createDirectory,
  createJSONFile,
  getMashrPath,
} = require('./fileUtils');

const setupDirectoriesAndFiles = async (homeDir) => {
  await createDirectory('.mashr', homeDir);

  let info = {integrations: {}};
  let integrationPath = `${getMashrPath(homeDir)}`;

  await createJSONFile('info', integrationPath, info);
}

module.exports = {
  setupDirectoriesAndFiles,
};

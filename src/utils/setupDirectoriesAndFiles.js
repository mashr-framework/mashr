const {
        createDirectory,
        createJSONFile,
        getMashrPath,
        writeFile,
       } = require('./fileUtils');

module.exports = async function setupDirectoriesAndFiles(homeDir) {
  await createDirectory('.mashr', homeDir);

  let info = {integrations: {}};
  let integrationPath = `${getMashrPath(homeDir)}`;

  await createJSONFile('info', integrationPath, info);
}

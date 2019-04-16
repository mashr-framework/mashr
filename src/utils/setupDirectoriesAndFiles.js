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
  console.log(integrationPath);
  await createJSONFile('info', integrationPath, info);
}

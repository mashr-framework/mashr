const {
  getMashrPath,
  exists,
  createDirectory,
} = require('./fileUtils');
const { setupDirectoriesAndFiles } = require('./setupDirectoriesAndFiles');
const { copyMashrConfigTemplate } = require('./copyMashrConfigTemplate');

const catchSetupAndConfig = async(homeDir, template) => {
  const mashrPath = await getMashrPath(homeDir);
  const mashrDirExists = await exists(mashrPath);

  if (!mashrDirExists) {
    await setupDirectoriesAndFiles(homeDir);
  }

  copyMashrConfigTemplate(template);

  return true;
};

module.exports = {
  catchSetupAndConfig,
};

const { getDefaultZone } = require('../gcp/getDefaultZone');
const { setupDirectoriesAndFiles } = require('./setupDirectoriesAndFiles');
const { copyMashrConfigTemplate } = require('./copyMashrConfigTemplate');
const {
  getMashrPath,
  exists,
} = require('./fileUtils');

const catchSetupAndConfig = async(homeDir, template) => {
  await getDefaultZone();

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

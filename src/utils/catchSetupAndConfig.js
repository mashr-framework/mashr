const init = require('../commands/init');

const {
  getMashrPath,
  exists,
} = require('./fileUtils');

module.exports = async function catchSetupAndConfig(homedir, command) {
  const mashrPath = await getMashrPath(homedir);
  const mashrDirExists = await exists(mashrPath);

  if (!mashrDirExists && command === 'init') {
    await init(homedir);
  }

  return true;
};
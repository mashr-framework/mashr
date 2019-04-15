const os = require('os');
const catchSetupAndConfig = require('../utils/catchSetupAndConfig');

const homedir = os.homedir();

module.exports = async (args) => {
  await catchSetupAndConfig(homedir);
}


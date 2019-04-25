const os = require('os');
const { catchSetupAndConfig } = require('../utils/');

const homedir = os.homedir();

module.exports = async (args) => {
  const template = args.template;
  await catchSetupAndConfig(homedir, template);
}


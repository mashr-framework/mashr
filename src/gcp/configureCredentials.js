const path = require('path');
const { setGoogleAppCredentials } = require('./setGoogleAppCredentials');

const configureCredentials = async (mashrConfigObj) => {
  const keyPath = await getPathToKeyFile(mashrConfigObj);
  setGoogleAppCredentials(keyPath);
};

const getPathToKeyFile = async (mashrConfigObj) => {
  const filename = mashrConfigObj.mashr.json_keyfile;
  return `${path.resolve('./')}/${filename}`;
};


module.exports = {
  configureCredentials,
  getPathToKeyFile,
};

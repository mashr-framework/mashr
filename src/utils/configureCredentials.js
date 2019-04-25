const path = require('path');
const { exists } = require('./index.js');
const { setGoogleAppCredentials } = require('../gcp/setGoogleAppCredentials');

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

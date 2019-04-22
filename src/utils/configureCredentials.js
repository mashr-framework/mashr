const path = require('path');
const { exists } = require('./fileUtils');
const setGoogleAppCredentials = require('../gcp/setGoogleAppCredentials');

module.exports = async function configureCredentials(mashrConfigObj) {
  const keyPath = await getPathToKeyFile(mashrConfigObj);
  setGoogleAppCredentials(keyPath);
};

const getPathToKeyFile = async (mashrConfigObj) => {
  const filename = mashrConfigObj.mashr.json_keyfile;
  const pathname = `${path.resolve('./')}/${filename}`;

  // return await validateKeyfile(pathname);
};

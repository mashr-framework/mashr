const path = require('path');
const { exists } = require('./fileUtils');
const setGoogleAppCredentials = require('../gcp/setGoogleAppCredentials');

module.exports = async function configureCredentials(mashrConfigObj) {
  const keyPath = await getPathToKeyFile(mashrConfigObj);
  setGoogleAppCredentials(keyPath);
};

const validateKeyfile = async (path) => {
  const parts = path.split('.');
  const hasValidName = parts[parts.length - 1] === 'json' && parts[0].length > 1;

  try {
    const fileExists = await exists(path);
    if (hasValidName && fileExists) {
      return path;
    } else {
      throw new Error('No keyfile. Keyfile path is required in mashr_config ' + 
                      'and must be in the root of the working directory.');
    }
  } catch(e) {
    throw(e);
  }
};

const getPathToKeyFile = async (mashrConfigObj) => {
  const filename = mashrConfigObj.mashr.json_keyfile;
  const pathname = `${path.resolve('./')}/${filename}`;

  return await validateKeyfile(pathname);
};
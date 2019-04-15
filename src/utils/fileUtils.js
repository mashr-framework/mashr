const fs = require('fs');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const setGoogleAppCredentials = require('../gcp/setGoogleAppCredentials');
const yaml = require('js-yaml');
const path = require('path');

// const changePermissions = promisify(fs.chmod);

// // clean up homedir parameters

const exists = async path => (
  new Promise((res) => {
    fs.stat(path, (err) => {
      if (err === null) res(true);
      res(false);
    });
  })
);

const createDirectory = async (name, path) => {
  const dir = `${path}/${name}`;

  const dirExists = await exists(dir);
  if (!dirExists) {
    await mkdir(dir);
  }
};

const createJSONFile = async (fileName, path, json) => {
  const configStr = JSON.stringify(json, null, 2);
  await writeFile(`${path}/${fileName}.json`, configStr);
};

const getMashrPath = homedir => (`${homedir}/.mashr`);

const validateKeyfile = async (path) => {
  const parts = path.split('.');
  const hasValidName = parts[parts.length - 1] === 'json' && parts[0].length > 1;

  try {
    const fileExists = await exists(path);
    if (hasValidName && fileExists) {
      return path;
    } else {
      throw new Error('No keyfile. Keyfile path is required in mashr_config and must be in the root of the working directory.');
    }
  } catch(e) {
    throw(e);
  }
}

const getPathToKeyFile = async (mashr_config) => {
  const filename = readYaml(mashr_config).mashr.json_keyfile;
  const pathname = `${path.resolve('./')}/${filename}`;
  let keyFile;

  keyFile = await validateKeyfile(pathname);

  if (keyFile) { return keyFile; }
}

function mashrConfigExists(path) {

}

const configureCredentials = async (path_to_mashr_config) => {
  const keyPath = await getPathToKeyFile(path_to_mashr_config);
  setGoogleAppCredentials(keyPath);
}

function readYaml(path) {
  return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
}

// const getStagingPath = homedir => (`${getNamiPath(homedir)}/staging`);

// const readConfig = async (homedir) => {
//   const namiPath = getNamiPath(homedir);
//   const config = await readFile(`${namiPath}/config.json`);
//   return JSON.parse(config);
// };

// const readResources = async (homedir) => {
//   const namiPath = getNamiPath(homedir);
//   const resourceInfo = await readFile(`${namiPath}/resources.json`);
//   return JSON.parse(resourceInfo);
// };

// const writeResources = async (homedir, resource, idString) => {
//   const namiPath = getNamiPath(homedir);
//   let resourcesJSON = await readFile(`${namiPath}/resources.json`);

//   resourcesJSON = JSON.parse(resourcesJSON);
//   resourcesJSON[resource] = idString;
//   resourcesJSON = JSON.stringify(resourcesJSON, null, 2);

//   await writeFile(`${namiPath}/resources.json`, resourcesJSON);
// };

// const writeTemplateToStage = async (lambdaName, template, homedir) => {
//   await mkdir(`${getNamiPath(homedir)}/staging/${lambdaName}`);
//   await writeFile(`${getNamiPath(homedir)}/staging/${lambdaName}/${lambdaName}.js`, template);
// };

// const writeTemplateLocally = async(lambdaName, template) => {
//   await mkdir(`${process.cwd()}/${lambdaName}`);
//   await writeFile(`${process.cwd()}/${lambdaName}/${lambdaName}.js`, template);
// };

// const createKeyPairFile = async (homedir, namiKeyPair) => {
//   const namiPath = getNamiPath(homedir);
//   await writeFile(`${namiPath}/${namiKeyPair.KeyName}.pem`, namiKeyPair.KeyMaterial);
//   await writeFile(`${process.cwd()}/${namiKeyPair.KeyName}.pem`, namiKeyPair.KeyMaterial);
//   console.log(`${namiKeyPair.KeyName}.pem key pair file has been saved to your current directory. Do not delete this file. You will need it to connect via SSH to all EC2 instances created by Nami.`);
// };

// const changePermissionsOnKeyPairFile = async (homedir, namiKeyPair) => {
//   const namiPath = getNamiPath(homedir);
//   await changePermissions(`${namiPath}/${namiKeyPair.KeyName}.pem`, 0o400);
//   await changePermissions(`${process.cwd()}/${namiKeyPair.KeyName}.pem`, 0o400);
// };

// const copyEC2SetupScript = async (namiPath, sourceDir) => {
//   const sourceFile = `${sourceDir}/docker_mongo_setup.sh`;
//   const destinationFile = `${namiPath}/docker_mongo_setup.sh`;

//   await copyFile(sourceFile, destinationFile);
// };

// module.exports = {
//   readConfig,
//   createDirectory,
//   getNamiPath,
//   exists,
//   createKeyPairFile,
//   copyFile,
//   mkdir,
//   getStagingPath,
//   copyEC2SetupScript,
//   readResources,
//   writeResources,
//   changePermissionsOnKeyPairFile,
//   writeTemplateToStage,
//   writeTemplateLocally,
// };

module.exports = {
  copyFile,
  createDirectory,
  createJSONFile,
  exists,
  getMashrPath,
  readFile,
  writeFile,
  configureCredentials,
  readYaml
};

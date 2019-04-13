/*
Todos:
  - define catchsetupandconfig to do these:
      // check if the .mashr directory exists (if not then create it)
      // put in .mashr the json file for service account email, service account keyfile
*/


const os = require('os');
const path = require('path');
const { copyFile } = require('../utils/fileUtils.js');
const { getMashrPath, exists } = require('../utils/fileUtils');

const homedir = os.homedir();

module.exports = async (args) => {
  const workingDir = path.resolve('./');
  const destination = `${workingDir}/mashr_config.yml`;
  const configTemplate = `${__dirname}/${'../../templates/mashr_template.yml'}`

  await copyFile(configTemplate, destination);
  console.log('"mashr_config.yml" template file created.');

  await catchSetupAndConfig(homedir);
  // check if the .mashr directory exists (if not then create it)
  //
  // create service account for integreation
  // save the key file to working directory
  //
  // add service account email to mashr_config file

  const mashrPath = await getMashrPath();

  // module.exports = async function catchSetupAndConfig(homedir, command) {
  //   const namiPath = await getNamiPath(homedir);
  //   const namiDirExists = await exists(namiPath);

  //   if (!namiDirExists && command === 'deploy') {
  //     await init(homedir);
  //   }

  //   return true;
  // };

}

// ----------------------------
// // setupNamiDir...
// const { asyncGetCallerIdentity } = require('../aws/awsFunctions');

// const {
//   createDirectory,
//   createJSONFile,
//   getNamiPath,
//   copyEC2SetupScript,
// } = require('./fileUtils');

// module.exports = async function setupNamiDirAndFiles(homePath) {
//   const accountNumber = (await asyncGetCallerIdentity()).Account;
//   const configJSON = {
//     accountNumber,
//   };

//   const resourcesJSON = {
//     restApiId: '',
//   };

//   const namiPath = await getNamiPath(homePath);
//   const scriptLocation = `${__dirname}/../../templates`;
//   try {
//     await createDirectory('.nami', homePath);
//     await createDirectory('staging', namiPath);
//     await createJSONFile('config', namiPath, configJSON);
//     await createJSONFile('resources', namiPath, resourcesJSON);
//     await copyEC2SetupScript(namiPath, scriptLocation);
//   } catch (err) {
//     console.log('Error setting up framework directory and files => ', err.message);
//   }
// };

// // init file
// const setupNamiDirAndFiles = require('./setupNamiDirAndFiles');
// const { createPreLambdaRole, createPostLambdaRole } = require('../aws/createRoles');
// const { doesRoleExist } = require('./../aws/doesResourceExist');
// const sleep = require('./sleep');

// module.exports = async function init(homedir) {
//   await setupNamiDirAndFiles(homedir);

//   const preLambdaRoleName = 'namiPreLambda';
//   const postLambdaRoleName = 'namiPostLambda';
//   const doesPreRoleNameExist = await doesRoleExist(preLambdaRoleName);
//   const doesPostRoleNameExist = await doesRoleExist(postLambdaRoleName);

//   if (!doesPreRoleNameExist) {
//     await createPreLambdaRole(preLambdaRoleName);
//     console.log('Initializing first lambda role.');
//     await sleep(2500);
//   }

//   if (!doesPostRoleNameExist) {
//     await createPostLambdaRole(postLambdaRoleName);
//     console.log('Initializing second lambda role.');
//     await sleep(2500);
//   }

//   return true;
// };


// const init = require('./init');

// const {
//   getNamiPath,
//   exists,
// } = require('./fileUtils');

// module.exports = async function catchSetupAndConfig(homedir, command) {
//   const namiPath = await getNamiPath(homedir);
//   const namiDirExists = await exists(namiPath);

//   if (!namiDirExists && command === 'deploy') {
//     await init(homedir);
//   }

//   return true;
// };


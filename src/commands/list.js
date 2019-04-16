const { readResources } = require('../utils/fileUtils');

module.exports = async (args) => {
  const infoObj = await readResources();
  var result = Object.keys(infoObj.integrations).map(function (name) {

  });


  // ['<name>', '']

  console.log(infoObj);
};

// const readResources = async (homedir) => {
//   const namiPath = getNamiPath(homedir);
//   const resourceInfo = await readFile(`${namiPath}/resources.json`);
//   return JSON.parse(resourceInfo);
// };


/*
main: `
//     outside [command] <options>

//     today.............. show weather for today
//     version............ show package version
//     help............... show help menu for a command
//     `,

*/
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const execute = async (command, callback) => {
  const { stdout, stderr } = await exec(command);
  return callback(stdout, stderr)
          .then((res) => {
            return res;
          }).catch((err) => {
            return err;
          }); 
}

async function functionNameIsAvailable(integrationName) {
  function check(stdout) {
    let result = true;
    let lines = stdout.split('\n');
    for (let i = 1; i < lines.length; i++) {
      name = lines[i].split(/\s/)[0];
      if (name.indexOf(integrationName) > -1) { 
        result = false; 
      }
    }
    return result;      
  }
  execute('gcloud functions list', )
}


async function functionNameIsAvailable(integrationName) {
  const command = 'gcloud functions list'
  var result = true;
  const { stdout, stderr } = await exec(command); 

  function check(stdout) {
    let lines = stdout.split('\n');
    for (let i = 1; i < lines.length; i++) {
      name = lines[i].split(/\s/)[0];
      if (name.indexOf(integrationName) > -1) { 
        result = false; 
      }
    }
    return result;      
  }
  return check(stdout);
}



functionNameIsAvailable('ToBigQuery')
.then((res) => { console.log(res); }).catch((err) => { console.log(err); });
// console.log(result);
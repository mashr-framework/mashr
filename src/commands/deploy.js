// 3 - Create the archive and staging bucket
// 4 - Check if BigQuery dataset exists, create the dataset
//  if it does not
// 5 - Create the code for the embulk_config.yml and the
//  index.js of the function from the mashr_config.yml
// 6 - Launches a GCS instance with a Mashr Container with our
//  embulk_config.yml in it, and a cron job running
// 7 - Launches a function with the same name

const { readYaml} = require('../utils/fileUtils');
const configureCredentials = require('../utils/configureCredentials');
const { validateIntegrationName } = require('../gcp/validateIntegrationName');
const createBuckets = require('../gcp/createBuckets');
const { createCloudFunction } = require('../gcp/createCloudFunction');
const addIntegrationToDirectory = require('../utils/addIntegrationToDirectory');

module.exports = async (args) => {
  const mashrConfigObj = await readYaml('./mashr_config.yml');

  await configureCredentials(mashrConfigObj);

  const integrationName = mashrConfigObj.mashr.integration_name.trim();
  // await validateIntegrationName(integrationName);
  // [TODO: createBuckets continue to happen in the background during createCloudFunction. Examine this.]
  // await createBuckets(integrationName);
  // await createCloudFunction(mashrConfigObj);
  await createGCEInstance(mashrConfigObj);

  // await addIntegrationToDirectory(mashrConfigObj);

  // TODO:
  //  - if deploy is run twice on the same mashr_config,
  //  does it provide an error (current action) or does it
  //  overwrite?
  //  - if default region doesn't exist in init, where is the bucket, GCE, and
  //  GCF created? Does it matter?
};

const installGems = (gems) => {
  const installGemsArray = gems.map((name) => (
      `embulk gem install ${name}`
    )
  );

  return `#!/bin/bash\n${installGemsArray.join('\n')}`;
};

const { readFile } = require('../utils/fileUtils');
const generateGCEResources = async (mashrConfigObj) => {
  const dockerfile = await readFile(`${__dirname}/../../templates/docker/Dockerfile`);
  
  installGems(mashrConfigObj.mashr.embulk_gems);

  /*
    iterate over array of gems
    transform it into embulk gem install commands separated by newlines
    return string
    bin/bash in front of it
  */

  // fs.readFileSync('./mashr/install_gems.sh'); // may do a string here



  // // const embulk_config = fs.readFileSync('./mashr/embulk_config.yml'); // generate embulk_config
  // const keyfile = fs.readFileSync('./keyfile.json');
  // const crontab = fs.readFileSync(`${__dirname}/../../templates/docker/crontab`);

  return {
    dockerfile,
    // install_gems,
    // embulk_config,
    // keyfile,
    // crontab,
  };
};

const Compute = require('@google-cloud/compute');
const createGCEInstance = async (mashrConfigObj) => {
  const compute = new Compute();

  const zone = compute.zone('us-central1-a');

  const {
    dockerfile,
    // install_gems,
    // embulk_config,
    // keyfile,
    // crontab,
  } = await generateGCEResources(mashrConfigObj);

  // const config = {
  //   os: 'debian-9',
  //   http: true,
  //   machineType: 'g1-small',
  //   tags: ["mashr"],
  //   metadata: {
  //     items: [
  //       {
  //         key: 'startup-script',
  //         value: `#! /bin/bash
          
  //         sudo apt-get update
  //         sudo apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common -y
  //         curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
  //         sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
  //         sudo apt update
  //         sudo apt install docker-ce -y

  //         cd /
  //         sudo mkdir app
  //         cd app
  //         echo "${dockerfile.toString()}" > Dockerfile
  //         echo "${crontab.toString()}" > crontab 
  //         sudo mkdir mashr
  //         echo "${install_gems.toString()}" > mashr/install_gems.sh
  //         echo "${embulk_config.toString()}" > mashr/embulk_config.yml
  //         printf "%s\n" '${keyfile.toString()}' > mashr/keyfile.json

  //         sudo docker pull jacobleecd/mashr:latest
  //         sudo docker build -t mashr .
  //         sudo docker run -d -v /mashr --name container1 mashr
  //         `
  //       },
  //     ],
  //   },
  // };

  // const vm = zone.vm('testingjsonpath');

  // console.log(vm);
  // vm.create(config, function(err, vm, operation, apiResponse) {
  //   // `vm` is a VM object.

  //   // `operation` is an Operation object that can be used to check the
  //   // status of the request.
  //   console.log('!!!!!!!!!!!!!!');
  //   console.log('VM: ', vm);
  //   console.log('!!!!!!!!!!!!!!');
  //   console.log('operation: ', operation);
  //   console.log('!!!!!!!!!!!!!!');
  //   console.log('apiResponse: ', apiResponse);
  // });

};

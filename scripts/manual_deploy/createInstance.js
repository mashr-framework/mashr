const path = require('path');
const fs = require('fs');

const pathname = `${path.resolve('./')}/mashr/keyfile.json`;
process.env.GOOGLE_APPLICATION_CREDENTIALS = pathname


const Compute = require('@google-cloud/compute');
const http = require('http');
const exec = require('child_process').exec;

const compute = new Compute();

const zone = compute.zone('us-central1-a');

const dockerfile = fs.readFileSync('./Dockerfile');
const install_gems = fs.readFileSync('./mashr/install_gems.sh');
const embulk_config = fs.readFileSync('./mashr/embulk_config.yml');
const keyfile = fs.readFileSync('./mashr/keyfile.json');
const crontab = fs.readFileSync('./crontab');

// console.log(keyfile.toString());
// exec(`echo "${JSON.stringify(keyfile.toString())}" > keyfile_example.json`)

// exec(`echo '${keyfile.toString()}' > keyfile_example.json`)
// exec(`printf "%s\n" '${keyfile.toString()}' > keyfile_example.json`)

// Machine type
// You must stop the VM instance to edit its machine type
// n1-standard-1 (1 vCPU, 3.75 GB memory)

// debian-9

// serviceAccounts: [
//   {
//     email: 'mashr-888@postgres-233900.iam.gserviceaccount.com',
//     scopes: ["https://www.googleapis.com/auth/cloud-platform"]
//   }
// ],
const config = {
  os: 'debian-9',
  http: true,
  machineType: 'g1-small',
  tags: ["mashr"],
  // change folder setup so it it is all in one folder
  // change Dockerfile to match folder setup

  // add install_gems.sh:
  //  RUN chmod +x mashr/install_gems.sh

  //   Unexpected character ('t' 
  // (code 116)): was expecting double-quote to start field name
  //  at [Source: java.io.FileInputStream@27b505aa; line: 2, column: 4]
  metadata: {
    items: [
      {
        key: 'startup-script',
        value: `#! /bin/bash
        
        sudo apt-get update
        sudo apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common -y
        curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
        sudo apt update
        sudo apt install docker-ce -y

        cd /
        sudo mkdir app
        cd app
        echo "${dockerfile.toString()}" > Dockerfile
        echo "${crontab.toString()}" > crontab 
        sudo mkdir mashr
        echo "${install_gems.toString()}" > mashr/install_gems.sh
        echo "${embulk_config.toString()}" > mashr/embulk_config.yml
        printf "%s\n" '${keyfile.toString()}' > mashr/keyfile.json

        sudo docker pull jacobleecd/mashr:latest
        sudo docker build -t mashr .
        sudo docker run -d -v /mashr --name container1 mashr
        `
        // sudo docker run -d -v /mashr --name container1 mashr
      },
    ],
  },
};

const vm = zone.vm('testings');

console.log(vm);
vm.create(config, function(err, vm, operation, apiResponse) {
  // `vm` is a VM object.

  // `operation` is an Operation object that can be used to check the
  // status of the request.
  console.log('!!!!!!!!!!!!!!');
  console.log('VM: ', vm);
  console.log('!!!!!!!!!!!!!!');
  console.log('operation: ', operation);
  console.log('!!!!!!!!!!!!!!');
  console.log('apiResponse: ', apiResponse);
});
const path = require('path');
const fs = require('fs');

const pathname = `${path.resolve('./')}/mashr/keyfile.json`;
process.env.GOOGLE_APPLICATION_CREDENTIALS = pathname


const Compute = require('@google-cloud/compute');
const http = require('http');

const compute = new Compute();

const zone = compute.zone('us-central1-a');

const dockerfile = fs.readFileSync('./Dockerfile');
const install_gems = fs.readFileSync('./mashr/install_gems.sh');
const embulk_config = fs.readFileSync('./mashr/embulk_config.yml');
const keyfile = fs.readFileSync('./mashr/keyfile.json');
const crontab = fs.readFileSync('./crontab');


// Machine type
// You must stop the VM instance to edit its machine type
// n1-standard-1 (1 vCPU, 3.75 GB memory)
// debian-9
const config = {
  os: 'cos-69-10895-211-0',
  http: true,
  machineType: 'g1-small',
  tags: ["mashr"],
  metadata: {
    items: [
      {
        key: 'startup-script',
        value: `#! /bin/bash
        cd ~
        echo "${dockerfile.toString()}" > Dockerfile
        echo "${crontab.toString()}" > crontab 
        mkdir mashr
        echo "${install_gems.toString()}" > mashr/install_gems.sh
        echo "${embulk_config.toString()}" > mashr/embulk_config.yml
        echo "${keyfile.toString()}" > mashr/keyfile.json

        `
      },
    ],
  },
};

const vm = zone.vm('testingcos');

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
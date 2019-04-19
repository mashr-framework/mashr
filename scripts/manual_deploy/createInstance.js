const path = require('path');
const fs = require('fs');

const pathname = `${path.resolve('./')}/mashr/keyfile.json`;
process.env.GOOGLE_APPLICATION_CREDENTIALS = pathname


const Compute = require('@google-cloud/compute');
const http = require('http');

const compute = new Compute();

const zone = compute.zone('us-central1-a');

const dockerfile = fs.readFileSync('./Dockerfile');

// Create a new VM, using default ubuntu image. The startup script
// installs Node and starts a Node server.

const config = {
  os: 'debian-9-stretch-v20190326',
  http: true,
  metadata: {
    items: [
      {
        key: 'startup-script',
        value: `#! /bin/bash
        echo $(pwd)
        cd /
        sudo touch /text.txt
        sudo echo $(pwd) >> /text.txt
        sudo touch Dockerfile
        sudo echo "${dockerfile.toString()}" >> Dockerfile
        `
      },
    ],
  },
};

const vm = zone.vm('vm-with-node-server');

vm.create(config);
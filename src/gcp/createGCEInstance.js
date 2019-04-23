const Compute = require('@google-cloud/compute');
const { generateGCEResources } = require('./generateGCEResources');

module.exports = async function createGCEInstance(mashrConfigObj) {
  console.log('Creating GCE instance...')
  const compute = new Compute();

  const zone = compute.zone('us-central1-a');

  const {
    dockerfile,
    gemInstallationScript,
    embulkConfig,
    keyfile,
    embulkScript,
    crontab,
  } = await generateGCEResources(mashrConfigObj);

  const config = {
    os: 'debian-9',
    http: true,
    machineType: 'g1-small',
    tags: ["mashr"],
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
          echo '${embulkScript}' > embulkScript.sh
          echo '${crontab.toString()}' > crontab
          sudo mkdir mashr
          echo "${gemInstallationScript}" > mashr/install_gems.sh
          echo "${embulkConfig}" > mashr/embulk_config.yml.liquid
          printf "%s\n" '${keyfile.toString()}' > mashr/keyfile.json

          sudo docker pull jacobleecd/mashr:latest
          sudo docker build -t mashr .
          sudo docker run -d -v /mashr --name embulk-container mashr
          `
        },
      ],
    },
  };

  const vm = zone.vm(mashrConfigObj.mashr.integration_name);

  await vm.create(config);
  // TODO: update this so the the object returned by vm.create's promise method
  // is awaited, not vm.create
  console.log(`GCE instance ${mashrConfigObj.mashr.integration_name} created.`)


};

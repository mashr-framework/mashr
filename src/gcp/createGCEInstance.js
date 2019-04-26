const Compute = require('@google-cloud/compute');
const { generateGCEResources } = require('./generateGCEResources');
const { getDefaultZone } = require('./getDefaultZone');
const ora = require('ora');
const { mashrLogger } = require('../utils');

const createGCEInstance = async(mashrConfigObj) => {
  const spinner = ora();
  mashrLogger(spinner, 'start', 'Creating GCE instance...');

  const compute = new Compute();

  const zone = compute.zone(await getDefaultZone());

  const {
    dockerfile,
    gemInstallationScript,
    embulkConfig,
    embulkScript,
    crontab,
  } = await generateGCEResources(mashrConfigObj);

  const config = {
    os: 'debian-9',
    http: true,
    machineType: 'g1-small',
    tags: ['mashr'],
    serviceAccounts: [
      {
        email: mashrConfigObj.mashr.service_account_email,
        scopes: [
          'https://www.googleapis.com/auth/cloud-platform',
        ],
      },
    ],
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

          sudo docker pull jacobleecd/mashr:latest
          sudo docker build -t mashr .
          sudo docker run -d -v /mashr --name embulk-container \
          --log-driver=gcplogs \
          --log-opt gcp-project=${mashrConfigObj.mashr.project_id} \
          --log-opt mode=non-blocking \
          --label mashr_integration=${mashrConfigObj.mashr.integration_name} \
          mashr
          `,
        },
      ],
    },
  };

  const vm = zone.vm(mashrConfigObj.mashr.integration_name);

  const data = await vm.create(config).catch((e) => {
    mashrLogger(spinner, 'fail', 'GCE Instance creation failed');
    throw (e);
  });

  const operation = data[1];
  await operation.promise();

  mashrLogger(
    spinner,
    'succeed',
    `GCE instance ${mashrConfigObj.mashr.integration_name} is created`
  );
};

module.exports = {
  createGCEInstance,
};

// - buckets.test.js
  // - describe createBuckets()
    // - expect createBuckets to not throw an error
    // - expect bucketExists to return true (x2 for archive)
  // - describe destroyBuckets()
    // - expect destroyBucket to not throw an error
    // - expect bucketExists to return false

const ora = require('ora');
const {
  addIntegrationToDirectory,
  configureCredentials,
  mashrLogger,
  readJsonFile,
  readYaml,
  removeResource,
  validateMashrConfig,
} = require ('../src/utils');
const {
  createBuckets,
  destroyBuckets,
  validateIntegrationNameWithGCP,
} = require ('../src/gcp');
const destroy = require('../src/commands/destroy');

describe('createBuckets()', function() {
  let mashrConfigObj;
  let integrationName;

  beforeAll(async () => {
    const mashrConfigPath = './templates/mashrTemplates/default_config.yml';
    mashrConfigObj = await readYaml(mashrConfigPath);
    const keyfilePath = './tests/keyfile.json';
    // const keyfileObj = await readJsonFile(keyfilePath);
    integrationName = 'matmashr-test';

    // mashrConfigObj.mashr.service_account_email = keyfileObj.client_email;
    mashrConfigObj.mashr.json_keyfile = keyfilePath;
    mashrConfigObj.mashr.integration_name = integrationName;

    await configureCredentials(mashrConfigObj);
  });

  afterAll(async () => {
    await destroyBuckets(integrationName);
  });

  beforeEach(async () => {
    jest.setTimeout(120000);
  });

  it('Create buckets and not throw an error.', async () => {
    let errorThrown = false;

    await createBuckets(integrationName).catch((error) => {
      if (error) { errorThrown = true }
    });

    expect(errorThrown).toBe(false);
  });

  it('Create buckets throw an error.', async () => {
    let errorThrown = false;

    await createBuckets(integrationName).catch((error) => {
      if (error) { errorThrown = true }
    });

    expect(errorThrown).toBe(true);
  });

  // it('Create buckets throw an error. Using `rejects`', async () => {
    // expect(
      // createBuckets(integrationName)
    // ).rejects.toEqual(new Error);
  // });

  // it('Staging bucket created?', async () => {
  // });

  // it('Archive bucket created?', async () => {
  // });
});

// describe('destroyBuckets()', function() {
// }

// describe('createBuckets()', function() {
  // describe('configureCredentials()', function() {

    // let mashrConfigObj;
    // let mashrConfigPath;

    // beforeEach(async () => {
      // mashrConfigPath = path.resolve('./') + '/tests/templates/mashr_template.yml';
      // mashrConfigObj = await readYaml(mashrConfigPath);
    // });

    // it('Sets the keyfile in the mashr_config.yml to an env variable', async () => {
      // mashrConfigObj.mashr.json_keyfile = 'keyfile.json';
      // await configureCredentials(mashrConfigObj);
      // const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      // const expectedPath = path.resolve('./') + '/keyfile.json';
      // expect(credentials).toBe(expectedPath);
    // });

    // it('Throws an error if there is no mashr_config file', async () => {
    //   const mashrConfig = await readFile(mashrConfigPath);
    //   fs.unlinkSync(mashrConfigPath);
    //   await expect(configureCredentials(m))
    // });
  // });
// });

// const path = require('path');
// const fs = require('fs');
// const createBuckets = require('../src/gcp/createBuckets');
  // beforeEach(async () => {
  // some require statements?
    // jest.setTimeout(120000);
  // setup config
  // });

  // afterEach(async () => {
    // need to do this after the entire describe, or maybe
    // let the next test do it?
    // const destroy = require('../src/commands/destroy');
    // await destroy(testIntegrationName);
  // });



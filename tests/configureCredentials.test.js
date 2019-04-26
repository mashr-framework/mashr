// to test, you need your service account keyfile.json
// in the "tests" directory of the npm package


const path = require('path');
const destroy = require('../src/commands/destroy');
const {
  configureCredentials,
} = require ('../src/gcp');

const {
  readJsonFile,
  readYaml,
} = require ('../src/utils');

describe('configureCredentials()', function() {
  let mashrConfigObj;
  const keyfilePath = './tests/keyfile.json';

  beforeAll(async () => {
    const mashrConfigPath = './templates/mashrTemplates/default_config.yml';
    mashrConfigObj = await readYaml(mashrConfigPath);
    const keyfileObj = await readJsonFile(keyfilePath);

    mashrConfigObj.mashr.json_keyfile = keyfilePath;
  });

  beforeEach(async () => {
    jest.setTimeout(120000);
  });

  it('it sets the keyfile in the mashr_config.yml to an env variable', async () => {
    await configureCredentials(mashrConfigObj, path.resolve('./'));

    const envVariable = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    // expect(envVariable).toEqual(keyfilePath);
    expect(envVariable).toEqual(path.resolve('./') + '/' + keyfilePath);
  });

});

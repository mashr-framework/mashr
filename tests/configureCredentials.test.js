// to test, you need your service account keyfile.json
// in the "tests" directory of the npm package

const path = require('path');
const {
  configureCredentials,
} = require('../src/gcp');

const {
  readYaml,
} = require('../src/utils');

describe('configureCredentials()', function() {
  let mashrConfigObj;
  const keyfilePath = './tests/keyfile.json';

  beforeAll(async() => {
    const mashrConfigPath = './templates/mashrTemplates/default_config.yml';
    mashrConfigObj = await readYaml(mashrConfigPath);
    mashrConfigObj.mashr.json_keyfile = keyfilePath;
  });

  beforeEach(async() => {
    jest.setTimeout(120000);
  });

  it('sets the keyfile in the mashr_config.yml to an env variable', async() => {
    await configureCredentials(mashrConfigObj, path.resolve('./'));
    const envVariable = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    expect(envVariable).toEqual(path.resolve('./') + '/' + keyfilePath);
  });

});

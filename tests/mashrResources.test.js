const path = require('path');
const { 
  setupDirectoriesAndFiles,
  exists,
  rimraf,
  writeResources,
  readResources,
  removeResource,
} = require('../src/utils')

describe('mashrResources', () => {

  let testPath;
  let mashrPath;
  let infoObjPath;
  
  beforeAll(() => {
    testPath = path.resolve('./') + '/tests';
    mashrPath = testPath + '/.mashr';
    infoObjPath = mashrPath + '/info.json'
  });

  afterAll(async () => {
    await rimraf.sync(mashrPath);
  });

  describe('setupDirectoriesAndFiles()', () => {
    it('creates a .mashr folder in a given directory', async () => {
      await setupDirectoriesAndFiles(testPath);
      const folderExists = await exists(mashrPath)
      expect(folderExists).toBe(true);
    });
    
    it('creates a info.json file in the .mashr folder', async () => {
      const infoJsonExists = await exists(infoObjPath);
      expect(infoJsonExists).toBe(true);
    });
  });
  
  describe('writeResources()', () => {
    it('returns undefined; does not throw an error', async () => {
      const result = await writeResources(
        'integrations', 'test_integration', {test: test}, testPath
      );
      expect(typeof result).toBe('undefined');
    });
  
    it('adds an integration to the info.json file', async () => {
      const infoObj = await readResources(testPath);
      const resource = infoObj.integrations.test_integration;
      expect(typeof resource).toBe('object');
    })

  });
  
  describe('removeResource()', () => {
    it('returns undefined; does not throw an error', async () => {
      const result = await removeResource(
        'integrations', 'test_integration', testPath
      );
      expect(typeof result).toBe('undefined');
    });

    it('removes a given integration from the info.json file', async () => {
      const infoObj = await readResources(testPath);
      const resource = infoObj.integrations.test_integration;
      expect(typeof resource).toBe('undefined');
    });
  });
});
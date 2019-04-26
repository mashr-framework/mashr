const {
  validateMashrConfig,
  validateIntegrationName,
  validateEmbulkRunCommand,
  validateBQNames,
} = require('../src/utils');

describe('validateMashrConfig()', () => {
  describe('checkRequiredValues()', () => {
    beforeEach(async () => {
      const mashrConfigPath = path.resolve('./') + '/templates/mashrTemplates/rand_config.yml';
      const mashrConfigObj = await readYaml(mashrConfigPath);
      mashrConfigObj.mashr.json_keyfile = './tests/keyfile.json';
      mashrConfigObj.mashr.service_account_email = 'email@email.com';
      mashrConfigObj.mashr.table_id = 'tableId';
      mashrConfigObj.mashr.dataset_id = 'datasetId';
      mashrConfigObj.mashr.project_id = 'projectId';
      mashrConfigObj.mashr.integration_name = 'integrationName';

      console.log(mashrConfigObj);
    });

    it('throws error if missing json_keyfile', () => {
      
    });

    // it('throws error if missing dataset_id', () => {
      
    // });

    // it('throws error if missing table_id', () => {
      
    // });

    // it('throws error if missing project_id', () => {
      
    // });

    // it('throws error if missing integration_name', () => {
      
    // });

    // it('throws error if missing embulk_run_command', () => {
      
    // });

    // it('throws error if missing embulk.in.type', () => {
      
    // });

    // it('successfully returns when there are no missing values', () => {
      
    // });
  });

  describe('validateIntegrationName()', () => {
    it('returns undefined; no error is thrown if given a valid name', () => {
      const name = 'happy-path-1test-name'
      const result = validateIntegrationName(name);
      expect(result).toBe(undefined);
    });

    it('throws an error if the name starts with an uppercase letter', () => {
      const name = 'Unhappy-path-test-name';
      expect(() => { 
        validateIntegrationName(name)
      }).toThrow('Invalid integration name');
    });

    it('throws an error if the name starts with a number', () => {
      const name = '8nhappy-path-test-name';
      expect(() => { 
        validateIntegrationName(name)
      }).toThrow('Invalid integration name');
    });

    it('throws an error if there are underscores', () => {
      const name = 'unhappy_path-test-name';
      expect(() => { 
        validateIntegrationName(name)
      }).toThrow('Invalid integration name');
    });

    it('throws an error if it ends in a dash', () => {
      const name = 'unhappy-path-test-name-';
      expect(() => { 
        validateIntegrationName(name)
      }).toThrow('Invalid integration name');
    });

    it('throws an error if there is an invalid character', () => {
      const name = 'unhappy-path~test-name';
      expect(() => { 
        validateIntegrationName(name)
      }).toThrow('Invalid integration name');
    });
  });

  describe('validateEmbulkRunCommand()', () => {
    const invalidCommand = 'embulk run';
    const validCommand = 'embulk run embulk_config.yml';

    it('throws error if " embulk_config.yml" isn\'t in run command', () => {
      expect(() => {
        validateEmbulkRunCommand(invalidCommand);
      }).toThrow();
    });

    it('successfully returns when " embulk_config.yml" is in run command', () => {
      const result = validateEmbulkRunCommand(validCommand);
      expect(result).toBe(undefined);
    });
  });

  describe('validateBQNames()', () => {
    it('returns undefined for a valid name.', async () => {
      expect(validateBQNames('mashrtest')).toEqual(undefined);
    });

    it('throws an error if there is a dash', async () => {
      expect(() => {
        validateBQNames('mashr-test');
      }).toThrow("Name must match regex: ^[_A-z0-9]{0,1024}$");
    });

    it('throws an error if there is a strange chracter `$`', async () => {
      expect(() => {
        validateBQNames('ma$hr-test');
      }).toThrow("Name must match regex: ^[_A-z0-9]{0,1024}$");
    });
  });
});

// - validateMashrConfig.test.js (do last)
//   (*work with original file, and remove / add values as needed*)
//   (*read a template in and add values to the object*)


//   - describe checkRequiredValues()
//     - it throws an error if there are fields missing (*7 + 1 (passing scenario) for each value)
//     - doesnt do anything if all the fields are there (1)



//   - describe validateIntegrationName()
//     - throws an error if the name is invalid (*2-3 invalid strings)
//     - does nothing if the name is valid (1 string)

//     - doesnt do anything if embulk_config.yml is in command


//   - describe validateBQNames()
//     - throws an error if the name is invalid (*2-3 invalid strings)
//     - does nothing if the name is valid (1 string)

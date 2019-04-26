const {
  validateMashrConfig,
  validateIngrationName,
  validateEmbulkRunCommand,
  validateBQNames,
} = require('../src/utils');

describe('validateMashrConfig()', () => {
  describe('checkRequiredValues()', () => {

  });

  describe('validateIntegrationName()', () => {

  });

  describe('validateEmbulkRunCommand()', () => {
    
  });

  describe('validateBQNames()', () => {
    
  });
});

// - validateMashrConfig.test.js (do last)
//   (*work with original file, and remove / add values as needed*)
//   (*read a template in and add values to the object*)


//   - describe checkRequiredValues()
//     - it throws an error if there are fields missing (*6 for each value)
//     - doesnt do anything if all the fields are there (1)



//   - describe validateIntegrationName()
//     - throws an error if the name is invalid (*2-3 invalid strings)
//     - does nothing if the name is valid (1 string)


//   - describe validateEmbulkRunCommand()
//     - throws an error if  embulk_config.yml is not in command
//     - doesnt do anything if embulk_config.yml is in command


//   - describe validateBQNames()
//     - throws an error if the name is invalid (*2-3 invalid strings)
//     - does nothing if the name is valid (1 string)

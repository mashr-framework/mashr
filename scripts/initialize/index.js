const setup = require('./setup/setup.js');

setup.generateEmbulkConfig();
setup.generateCloudFunctionInstallScript();
setup.updateCloudFunctionName();
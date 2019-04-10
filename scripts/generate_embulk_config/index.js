var yaml = require('js-yaml');
var fs = require('fs');

try {
  var mashrConfigString = fs.readFileSync('my-mashr-config');
  var embulkConfigString = fs.readFileSync('embulk-gcs-output');

  var mashrConfigObject = yaml.safeLoad(mashrConfigString);
  var embulkConfigObject = yaml.safeLoad(embulkConfigString);

  var serviceAccountEmail = mashrConfigObject.mashr.serviceAccountEmail;
  var jsonKeyFile = mashrConfigObject.mashr.jsonKeyFile;

  mashrConfigObject.embulk['out'] = embulkConfigObject.out;
  mashrConfigObject.embulk.out['service_account_email'] = serviceAccountEmail;
  mashrConfigObject.embulk.out['json_keyfile'] = jsonKeyFile;

  var finalEmbulkConfig = yaml.safeDump(mashrConfigObject.embulk);

  // generate the final embulk config file
  fs.writeFile('./config\.yml\.liquid', finalEmbulkConfig, function (error) {
    if (error) {
      return console.log(error);
    } else {
      console.log('The file was saved!');
    }
  });
} catch (error) {
  console.log(error);
}

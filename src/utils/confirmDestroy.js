const readline = require('readline-sync');

const confirmDestroy = async () => {
  const confirmationMessage = `You are about to delete these resources:
  * Remove the integration from the list of mashr integrations
  * Destroy all related GCP resources, including:
    - The staging and archive GCS buckets
    - The Cloud Function
    - The GCE instance
Since the archive and staging GCS buckets will be permanently destroyed,
Consider moving your data before running this command.
Continue (y/n)> `;

  let response = readline.question(confirmationMessage);
  response = response.trim();

  if (response === 'y') { response = 'yes'}
  if (response === 'n') { response = 'no'}

  switch (response) {
    case 'yes':
      // console.log('goodbye world!');
      // process.exit(0);
      break;
    case 'no':
      // console.log('hello world!');
      process.exit(0);
      break;
    default:
      console.log('');
      console.log(`Please choose 'y' or 'n'.`);
      console.log('');
      confirmDestroy();
      break;
  }
};

module.exports = {
  confirmDestroy
}



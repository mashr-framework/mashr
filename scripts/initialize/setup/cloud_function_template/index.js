const {BigQuery} = require('@google-cloud/bigquery');
const {Storage} = require('@google-cloud/storage');

exports.ToBigQuery = (event, callback) => {

  const file = event.data;
  if (file.name.indexOf('staging/dataset/test_data') == -1) { return; }
  const filePath = file.name;
  const [,datasetId,tableId,fileName] = filePath.split('/');
  const context = event.context;

  const projectId = "kinetic-guild-235620";
  const bucketName = file.bucket;

  const gcsFile = `gs://${file.bucket}/${filePath}`;  

  console.log(`Loading ${filePath} into ${tableId}.`);

  const bigquery = new BigQuery({
    projectId: projectId,
  });

  const storage = new Storage({
    projectId: projectId,
  });

  const metadata = {
    sourceFormat: 'NEWLINE_DELIMITED_JSON',
    autodetect: true,
    location: 'US',
  };

  let job;

  bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(storage.bucket(bucketName).file(filePath), metadata)
    .then(results => {
      job = results[0];
      console.log(`Job ${job.id} started.`);

      return job;
    })
    .then(metadata => {
      const errors = metadata.status.errors;
      if (errors && errors.length > 0) {
        throw errors;
      }
    })
    .then(() => {
      console.log(`Job ${job.id} completed.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  callback();
};

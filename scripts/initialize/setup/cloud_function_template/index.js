const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

exports._FUNCTION_NAME_ = (event, callback) => {

  const file = event.data;
  const fileName = file.name;
  const context = event.context;

  const projectId = "_PROJECT_NAME_";

  const bucketName = file.bucket;
  const [,,,, datasetId, tableId] = bucketName.split('_');

  const gcsFile = `gs://${bucketName}/${fileName}`;

  console.log(`Loading ${fileName} into ${tableId}.`);

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
    .load(storage.bucket(bucketName).file(fileName), metadata)
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
      const file = storage.bucket(bucketName).file(fileName);

      const newFilePath = `gs://${bucketName}_archive/${fileName}`;
      file.move(newFilePath, (err) => {
        if (err) {
          console.error('ERROR:', err);
        } else {
          console.log(`${fileName} moved to archives "${newFilePath}"`);
        }
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  callback();
};

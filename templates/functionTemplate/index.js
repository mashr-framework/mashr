const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

exports._FUNCTION_NAME_ = (event, context, callback) => {

  const fileName = event.name;

  const projectId = '_PROJECT_ID_';
  const datasetId = '_DATASET_ID_';
  const tableId = '_TABLE_ID_';

  const bucketName = event.bucket;

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

  if (callback) { callback(); }
};

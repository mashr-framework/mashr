BigQuery = require('@google-cloud/bigquery');
Storage = require('@google-cloud/storage');

exports._FUNCTION_NAME_ = (event, callback) => {

  const file = event.data;
  if (file.name.indexOf('_GCS_PATH_') == -1) { return; }
  const context = event.context;

  const projectId = "_PROJECT_ID_";
  const datasetId = "_DATASET_ID_";
  const bucketName = file.bucket;
  const filename = file.name;

  const gcsFile = `gs://${file.bucket}/${file.name}`;  
  const tableId = "_TABLE_ID_";

  console.log(`Loading ${filename} into ${tableId}.`);

  const bigquery = new BigQuery({
    projectId: projectId,
  });

  const storage = Storage({
    projectId: projectId,
  });

  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1,
    autodetect: true,
    location: 'US',
	};

  let job;

  bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(storage.bucket(bucketName).file(filename), metadata)
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
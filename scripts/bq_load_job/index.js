exports.ToBigQuery = (event, callback) => {
  const file = event.data;
  const context = event.context;

  const BigQuery = require('@google-cloud/bigquery');
  const Storage = require('@google-cloud/storage');

  const projectId = "<PROJECT_ID>";
  const datasetId = "<DATASET_ID";
  const bucketName = file.bucket;
  const filename = file.name;

  const gcsFile = `gs://${file.bucket}/${file.name}`;  
  const tableId = "new_table";

  console.log(`Load ${filename} into ${tableId}.`);

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

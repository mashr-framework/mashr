const { createDataset } = require('./createDataset');
const { createGCEInstance } = require('./createGCEInstance');
const { destroyCloudFunction } = require('./destroyCloudFunction');
const { setGoogleAppCredentials } = require('./setGoogleAppCredentials');

const { 
  createBucket, 
  createBuckets,
} = require('./createBuckets');
const { 
  createCloudFunction,
  deployCloudFunction,
  setupCloudFunction 
} = require('./createCloudFunction');
const {   
  destroyBuckets,
  destroyBucket
} = require('./destroyBuckets');
const {   
  destroyGCEInstance,
  getGCEInstance
} = require('./destroyGCEInstance');
const {   
  generateGCEResources,
  createEmbulkScript,
  createGemInstallationScript,
  createEmbulkConfig 
} = require('./generateGCEResources');
const {   
  validateIntegrationNameWithGCP,
  validateBucketName,
  bucketExists,
  functionExists,
  functionNameIsAvailable,
  bucketsAreAvailable 
} = require('./validateIntegrationNameWithGCP');

module.exports = {
  createBuckets,
  createBucket,
  createCloudFunction,
  deployCloudFunction,
  setupCloudFunction,
  createDataset,
  createGCEInstance,
  destroyBuckets,
  destroyBucket,
  destroyCloudFunction,
  destroyGCEInstance,
  getGCEInstance,
  generateGCEResources,
  createEmbulkScript,
  createGemInstallationScript,
  createEmbulkConfig,
  setGoogleAppCredentials,
  validateIntegrationNameWithGCP,
  validateBucketName,
  bucketExists,
  functionExists,
  functionNameIsAvailable,
  bucketsAreAvailable
}
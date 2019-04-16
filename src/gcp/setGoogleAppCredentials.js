module.exports = function setGoogleAppCredentials(keyPath) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
  console.log('Set Google Application Credentials Environment Variable...');
}

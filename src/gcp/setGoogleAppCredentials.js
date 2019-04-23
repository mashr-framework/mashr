module.exports = function setGoogleAppCredentials(keyPath) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
  console.log('Google Application Credentials Environment Variable is set...');
}

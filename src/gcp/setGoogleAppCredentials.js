module.exports = function setGoogleAppCredentials(keyPath) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
};

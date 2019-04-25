const setGoogleAppCredentials = (keyPath) => {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
};

module.exports = {
  setGoogleAppCredentials
}

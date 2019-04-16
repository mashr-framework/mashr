describe('mashr deploy'), async () => {
  beforeEach(async () => {});

  afterEach(async () => {});
  
  describe('configureCredentials()', async () = {
  //     it should take a mashr_config file and sets google application credentials
  //     to that
  //     it should provide an error if no file at the keyfile path
  //     it should provide an error if mashr_config file does not exist
  });

  describe('validateIntegrationName()', async () = {
  //     - it should:
  //       - [TODO: checks .mashr/info.json if integration name already exists.
  //       error if it exists]
  //       - check if buckets are available (bucket and bucket-archive)
  //       - checks if bucket already exists, throws an error if bucket exists
  //       - checks that bucket name is lowercase, numbers, dashes and underscores,
  //       starts with a number or letter, throws error if
  //       - checks if function name is available, throws error if not
  })
  
  describe('createBuckets()', async () = {
  //   it createStorageBuckets
  //     - it should:
  //       - create storage bucket
  //       - add storage name to .mashr/info.json
  //       - create archive storage bucket
  //       - add archive storage name to .mashr/info.json
  })

  describe('addIntegrationToDirectory()', async () = {
  //     - add integration name to info.json file .mashr/ dir
  })
  // test('what we test', async () => {
  //   // code
  // });

}
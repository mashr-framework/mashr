/*
describe "init"
  it executes catchSetupAndConfig
    it should:
      - checks if existing .mashr and creates it if not
      - copies the mashr_config file template to working directory

describe "deploy"
  it configures credentials
    it should take a mashr_config file and sets google application credentials
    to that
    it should provide an error if no file at the keyfile path
    it should provide an error if mashr_config file does not exist
  it validateIntegrationName
    - it should:
      - [TODO: checks .mashr/info.json if integration name already exists.
      error if it exists]
      - check if buckets are available (bucket and bucket-archive)
      - checks if bucket already exists, throws an error if bucket exists
      - checks that bucket name is lowercase, numbers, dashes and underscores,
      starts with a number or letter, throws error if
      - checks if function name is available, throws error if not
  it add integration name to info.json file .mashr/ dir
  it createStorageBuckets
    - it should:
      - create storage bucket
      - add storage name to .mashr/info.json
      - create archive storage bucket
      - add archive storage name to .mashr/info.json

describe "destroy"
  it should take an integration name as an argument
    - delete storage bucket
    - delete archive storage bucket
*/

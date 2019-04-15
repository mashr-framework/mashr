/*
describe "init"
  it executes catchSetupAndConfig
    it should:
      - checks if existing .mashr and creates it if not
      - copies the mashr_config file template to working directory


describe "deploy"
  it configures credentials
    it should take a mashr_config file and sets google application credentials to that
    it should provide an error if no file at the keyfile path
    it should provide an error if mashr_config file does not exist 
  it manages buckets
    - it should:
      - it sets up new name: mashr_<name>_<source>_to_<dataset>_<table>
      - checks if name above is available
      - checks if name above + "_archive" is available
      - if not available then provides an error
*/
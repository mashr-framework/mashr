const menus = {
  main: function() {
    return Object.keys(this)
      .filter(key => key !== 'main')
      .map(key => this[key]).join('\n\n');
  },
  help: `
    help <command> 
    
    init.............. show init help
    deploy............ show deploy help
    destroy........... show destroy help
    list.............. show list help
  `,
  init: `
    init --template <template_name>

    Initializes your current working directory with a template
    mashr_config.yml file necessary for running 'mashr deploy'.

    Optionally include the --template flag and name of the template.
    Template names include 'http', 'psql', 'random'.
  `,
  deploy: `
    deploy

    Deploys the integration: adds it to the list of mashr
    integrations and creates related GCP resources including
    staging and archive GCS buckets, a cloud function and
    a GCE instance. 

    Creates a 'function' folder that stores the code the cloud
    function used in this integration. You can edit and redeploy
    the cloud function with gcloud using this command:

    gcloud functions deploy <FUNCTION_NAME> \\ 
    --runtime nodejs8 \\
    --trigger-resource <BUCKET_NAME> \\
    --trigger-event google.storage.object.finalize

    A mashr_config.yml file in the user's working directory 
    is required. Run 'mashr init' to see a template file you can 
    use.
  `,
  destroy: `
    destroy <integration name>

    Destroys the integration: removes it from the list of mashr 
    integrations and destroys related GCP resources including 
    the staging and archive GCS buckets, the cloud function and
    the GCE instance.
  `,
  list: `
    list

    Lists all integrations that the user has deployed.
  `,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main());
};

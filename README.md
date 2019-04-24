# mashr

## Steps
* happens on the users machine:
  - create the install_gems.sh
  - create the embulk_config file
* nodejs create a compute instance
  - with a startup script in the nodejs create compute instance, script.
  - cp the install_gems.sh
  - cp the keyfile
  - cp the embulk_config file
  - cp Dockerfile from and build the image
    OR
    pull image from public directory on dockerhub
  - run dockerfile
* when Docker container first runs:
  - copies the install_gems, keyfile, and embulk_config.yml into container
  - installs the embulk gems
  - sets volume for persisting data like a diff file, etc.
  - starts cron job
    - embulk run embulk_config.yml
* need another .sh file for the cron job to run
  - based on what user gives us from mashr_config

  Dockerfile > build > image > start a container from the image

## Getting Started

* Make sure you have a Google Cloud Platform (GCP) account
* Create a new project in your Google Cloud account
* After creating a new project, you will need to enable the Cloud Functions
  API from the web console.
  - Go to the main menu and choose "APIs & Services"
  - Click the "+ Enable APIs and Services" button at the top of the page
  - Search for "Cloud Function" (no 's')
  - Click "Cloud Functions API"
  - Click "enable" to enable the API
* Download and install the [gcloud CLI
  SDK](https://cloud.google.com/sdk/docs/quickstarts) from Google.

## Location considerations for your GCP Services

Consider colocating as many as your services as possible. For example, it's
required that your GCS (Google Cloud Storage) and GBQ (Google Big Query) be
located in the same regions. See the [Locations Considerations
document](./docs/gcp_locations_considerations.md) for more information

![Mashr Header](https://i.imgur.com/nEuJ93S.png?1)

## Overview
Mashr is an easy to use data pipeline framework that orchestrates moving data
from external sources into BigQuery. It’s meant for small software applications
using Google Cloud Platform (GCP) who have their data spread out in a variety
of external sources that they want to be able to aggregate and perform
analysis on.

## Mashr Architecture

Diagram TBD

## The Team

**[Jacob CD Lee](https://)** *Software Engineer* San
Francisco, CA

**[Linus Phan](https://)** *Software Engineer* Los Angeles/Riverside, CA

**[Mat Sachs](https://matsachs.com)** *Software Engineer* Portland, OR

## Getting Started

### Prerequisites

* GCP (Google Cloud Platform) account
* GCP project, service account email, and json keyfile
* [GCP Cloud SDK](https://cloud.google.com/appengine/docs/standard/go/download)
* Node.js >= 8
* NPM

Mashr requires that users have a project with a service account on GCP and have
set up the Cloud SDK CLI on their local machine. If you have not already done
so, please [Download the Cloud
SDK](https://cloud.google.com/appengine/docs/standard/go/download) and use the
["console" to create a
project](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
and a [service
account](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
with a role of "owner". Mashr will use the project id, service account email,
and service account json keyfile to to interact with GCP services.

### Install Mashr

```
npm install -g mashr
```

-------------------------------------------------------------------------------
## Documentation

### The Mashr Process

Starting with a mashr_config.yml file and the terminal command `mashr deploy`,
Mashr creates a Google Compute Engine (GCE) instance, Google Cloud Storage
(GCS) staging and archive buckets, BigQuery dataset and table, and a Google
Cloud Function (GCF) to automate the porting of data between the GCS buckets
and BigQuery table.

The GCE instance hosts a docker container with the
[Embulk](https://www.embulk.org/docs/) data loader running on it. A cron job
runs an embulk job every 10 minutes. The embulk job pulls data from an external
source, like Salesforce or a postgres database, and puts it into a GCS staging
bucket. When data is loaded to the GCS staging bucket, the GCF is triggered.
The GCF moves the data to a coldline storage bucket for archiving and failover,
and then loads the data into the appropriate BigQuery table.

### GCP Project and Service Account Setup

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


### Commands

```
mashr init
```

-------------------------------------------------------------------------------
```
mashr deploy
```

-------------------------------------------------------------------------------
```
mashr list
```

-------------------------------------------------------------------------------
```
mashr destroy
```

-------------------------------------------------------------------------------
```
mashr help
```


-------------------------------------------------------------------------------


### Accessing the BigQuery Table

### Accessing the Compute Engine Instance and Docker Container

-------------------------------------------------------------------------------
## Helpful Tips

### Location considerations for your GCP Services

Consider colocating as many as your services as possible. For example, it's
required that your GCS (Google Cloud Storage) and GBQ (Google Big Query) be
located in the same regions. See the [Locations Considerations
document](./docs/gcp_locations_considerations.md) for more information

-------------------------------------------------------------------------------
### Details / Notes / Delete
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



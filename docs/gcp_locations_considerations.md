# GCP Locations, Regions, and Zones Considerations

## GBQ: Google Big Query, Dataset Regions and Multi-Regions

* https://cloud.google.com/bigquery/docs/locations

### Considerations when choosing Regions
* **Colocate your BigQuery dataset and your external data source.**
* **Colocate your Cloud Storage buckets for loading data.**
  - If your BigQuery dataset is in a multi-regional location, the Cloud Storage
    bucket containing the data you're loading must be in a regional or
    multi-regional bucket in the same location.
  - For example, if your BigQuery dataset is in the EU, the Cloud Storage
    bucket must be in a regional or multi-regional bucket in the EU.
  - If your dataset is in a regional location, your Cloud Storage bucket must
    be a regional bucket in the same location.
  - For example, if your dataset is in the Tokyo region, your Cloud Storage
    bucket must be a regional bucket in Tokyo.
  - Exception: If your dataset is in the US multi-regional location, you can
    load data from a Cloud Storage bucket in any regional or multi-regional
    location.
* **When you query data in an external data source such as Cloud Storage, the
  data you're querying must be in the same [mulit-regional] location as your
  BigQuery dataset.**
  - For example, if your BigQuery dataset is in the EU multi-regional location,
    the Cloud Storage bucket containing the data you're querying must be in a
    multi-regional bucket in the EU. If your dataset is in the US
    multi-regional location, your Cloud Storage bucket must be in a
    multi-regional bucket in the US.
* **If your dataset is in a regional location, the Cloud Storage bucket
  containing the data you're querying must be in a regional bucket in the same
  location.**
  - For example, if your dataset is in the Tokyo region, your Cloud Storage
    bucket must be a regional bucket in Tokyo.
* If your external dataset is in Cloud Bigtable, your dataset must be in the US
  or the EU multi-regional location. Your Cloud Bigtable data must be in one of
  the supported Cloud Bigtable locations.
* Location considerations do not apply to Google Drive external data sources.

* Colocate your Cloud Storage buckets for exporting data.
  - When you export data, the regional or multi-regional Cloud Storage bucket
    must be in the same location as the BigQuery dataset. For example, if your
    BigQuery dataset is in the EU multi-regional location, the Cloud Storage
    bucket containing the data you're exporting must be in a regional or
    multi-regional location in the EU.
* If your dataset is in a regional location, your Cloud Storage bucket must be
  a regional bucket in the same location.
  - For example, if your dataset is in the Tokyo region, your Cloud Storage
    bucket must be a regional bucket in Tokyo.  Exception: If your dataset is
    in the US multi-regional location, you can export data into a Cloud Storage
    bucket in any regional or multi-regional location.  Develop a data
    management plan.
* If you choose a regional storage resource such as a BigQuery dataset or a
  Cloud Storage bucket, develop a plan for geographically managing your data.

* When loading data, querying data, or exporting data, BigQuery determines the
location to run the job based on the datasets referenced in the request. This
can effect the price.
  - For example, if a query references a table in a dataset stored in the
    asia-northeast1 region, the query job will run in that region. If a query
    does not reference any tables or other resources contained within datasets,
    and no destination table is provided, the query job will run in the
    location of the project's flat-rate reservation. If the project does not
    have a flat-rate reservation, the job runs in the US region. If more than
    one flat-rate reservation is associated with the project, the location of
    the reservation with the largest number of slots is where the job runs.
* You can specify the location to run a job explicitly

### Background

* You specify a location for storing your BigQuery data when you create a
  dataset. After you create the dataset, the location cannot be changed.
* There are two types of locations:
  - A regional location is a specific geographic place, such as Tokyo. For more
    information, see Regional resources on the Geography and Regions page.
  - A multi-regional location is a large geographic area, such as the United
    States, that contains at least two geographic places. For more information,
    see Multi-regional resources on the Geography and Regions page.
* For more information on Cloud Storage locations, see Bucket Locations in the
  Cloud Storage documentation.

## GCS: Google Cloud Storage Regions

* Regions only, zones not available for GCS.
* https://cloud.google.com/storage/docs/locations

### How Region effects other services trying to access this service?

* **Compute Engine VM notes**
  - Storing data in the same region as your Compute Engine VM instances can
    provide **better performance and lower network costs.** These advantages
    apply to both regional and dual-regional locations.

  - While you can't specify a Compute Engine zone as a bucket location, all
    Compute Engine VM instances in zones within a certain regional location
    have similar performance when accessing buckets in that regional location.

### Background
* A good location balances latency, availability, and bandwidth costs for data
  consumers.
* Use a **regional** location to help optimize latency, availability, and
  network bandwidth for data consumers grouped in the same region.
* Store frequently accessed data, such as data used for analytics, as **Regional
  Storage.**
* Store data typically accessed less than once a month, such as archived data,
  as **Nearline Storage.**
* Store data typically accessed less than once a year, such as backup and
  disaster recovery data, as **Coldline Storage.**
* Use a **dual-regional** location when you want similar performance advantages
  as regional locations but with added geo-redundancy.
* Use a **general multi-regional** location when you want to serve content to
  data consumers that are outside of the Google network and distributed across
  large geographic areas, or when you need your data to be geo-redundant.
* Store frequently accessed data as **Multi-Regional Storage.**
* Store data typically accessed less than once a month as **Nearline Storage.**
* Store data typically accessed less than once a year as **Coldline Storage.**
* If you're not sure which location type to use or have no scenario in mind,
  use a regional location that is convenient or contains the majority of the
  users of your data.
* The different location types:
  - A regional location is a specific geographic place, such as London.
  - A multi-regional location is a large geographic area, such as the United
    States, that contains at least two geographic places.
  - A dual-regional locationBeta is a special type of multi-regional location
    that consists of two specific regional locations.
* Objects stored in a multi-regional location are geo-redundant.
* Some storage classes can only be used in a certain type of location.
* You must store Regional Storage object data in a regional location, such as
  us-east1.
* You must store Multi-Regional Storage object data in a multi-regional
  location (which includes dual-regional locations) such as eu.
* You can store Nearline Storage and Coldline Storage object data in any
  location.

## GCE: Google Compute Engine, Instance Regions and Zones

* https://cloud.google.com/compute/docs/regions-zones/#choosing_a_region_and_zone

### Considerations when choosing Regions and Zones

* Handling failures:
  - Distribute your resources across multiple zones and regions to tolerate
    outages.
  - if a zone becomes unavailable, you can transfer traffic to another zone in
    the same region to keep your services running. Similarly, if a region
    experiences any disturbances, you should have backup services running in a
    different region.
* Decreased network latency:
  - To decrease network latency, you might want to choose a region or zone that
    is close to your point of service. For example, if you mostly have
    customers on the East Coast of the US, then you might want to choose a
    primary region and zone that is close to that area and a backup region and
    zone that is also close by.
* Communication within and across regions will incur different costs.
  - Generally, communication within regions will always be cheaper and faster
    than communication across different regions.
* Design important systems with redundancy across multiple zones.
  - At some point in time, it is possible that your instances might experience
    an unexpected failure. To mitigate the effects of these possible events,
    you should duplicate important systems in multiple zones and regions.

### Background

* Google designs zones to be independent from each other: a zone usually has
  power, cooling, networking, and control planes that are isolated from other
  zones, and most single failure events will affect only a single zone. Thus,
  if a zone becomes unavailable, you can transfer traffic to another zone in
  the same region to keep your services running. Similarly, if a region
  experiences any disturbances, you should have backup services running in a
  different region. For more information about distributing your resources and
  designing a robust system, see Designing Robust Systems.
* For example, by hosting instances in zones europe-west1-b and europe-west1-c,
  if europe-west1-b fails unexpectedly, your instances in zone europe-west1-c
  will still be available. However, if you host all your instances in
  europe-west1-b, you will not be able to access any instances if
  europe-west1-b goes offline. You should also consider hosting your resources
  across regions.  For example, consider hosting backup instances in a zone in
  europe-west3 in the unlikely scenario that the europe-west1 region
  experiences a failure. For more tips on how to design systems for
  availability, see Designing Robust Systems.

## GCF: Google Cloud Function Regions

* Regions only, zones not available for GCS.
* https://cloud.google.com/functions/docs/locations

### Considerations when choosing Regions

* Using services across multiple locations can affect your app's latency, as
  well as pricing.
* Your primary considerations should be latency and availability.
* You can generally select the region closest to your Cloud Function's users.
* But you should also consider the location of the other GCP products and
  services that your app uses.
* You can deploy functions to different regions within a project, but once the
  region has been selected for a function it cannot be changed.
* Functions in a given region in a given project must have unique (case
  insensitive) names, but functions across regions or across projects can share
  the same name.

### Background

* Cloud Functions is regional, which means the infrastructure that runs your
  Cloud Function is located in a specific region and is managed by Google to be
  redundantly available across all the zones within that region.

## Global, Regional, and Zonal Resources

* https://cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources


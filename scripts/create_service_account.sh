#!/bin/bash

# run ../mashr/scripts/create_service_account.sh to create keyfile in sandbox

PROJECT_ID="postgres-233900"
export PROJECT_ID

gcloud iam service-accounts delete mashr-account@$PROJECT_ID.iam.gserviceaccount.com || echo "No service Account, creating one..."
# gcloud iam service-accounts delete mashr-account@postgres-233900.iam.gserviceaccount.com

gcloud iam service-accounts create mashr-account

gcloud projects add-iam-policy-binding $PROJECT_ID \
--member "serviceAccount:mashr-account@${PROJECT_ID}.iam.gserviceaccount.com" \
--role "roles/editor"

gcloud iam service-accounts keys create keyfile.json \
--iam-account mashr-account@$PROJECT_ID.iam.gserviceaccount.com





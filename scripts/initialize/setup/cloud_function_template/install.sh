#!/bin/bash

#update trigger-resource with source buckety
gcloud functions deploy _FUNCTION_NAME_ --runtime nodejs6 --trigger-resource _BUCKET_NAME_ --trigger-event google.storage.object.finalize
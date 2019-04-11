#!/bin/bash

#update trigger-resource with source buckety
gcloud functions deploy ToBigQuery --runtime nodejs6 --trigger-resource mashr_matochondrion --trigger-event google.storage.object.finalize

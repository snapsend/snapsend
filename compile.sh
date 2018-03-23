#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "dev" ]
then
  # Retrieve our secrets from the CircleCI environment
  echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  gcloud config set project $GCLOUD_PROJECT_DEV

elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  echo $CLIENT_SECRET1 | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  gcloud config set project $GCLOUD_PROJECT
else
  echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  gcloud config set project $GCLOUD_PROJECT_DEV
fi

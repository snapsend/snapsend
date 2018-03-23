#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "dev" ]
then
  gcloud config set project $GCLOUD_PROJECT_DEV
  # Retrieve our secrets from the CircleCI environment
  echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install --upgrade pip
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  

elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  gcloud config set project $GCLOUD_PROJECT
  echo $CLIENT_SECRET1 | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install --upgrade pip
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  
else
  gcloud config set project $GCLOUD_PROJECT_DEV
  echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install --upgrade pip
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  
fi

#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "dev" ]
then
  curl -o $HOME/google_appengine_1.9.30.zip https://storage.googleapis.com/appengine-sdks/featured/google_appengine_1.9.30.zip
  unzip -q -d $HOME $HOME/google_appengine_1.9.30.zip
  echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  gcloud config set project $GCLOUD_PROJECT_ID
  cd front && npm install
elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  export NODE_ENV=production
  export MONGODB_URI=${PRODUCTION_DB}
  npm run build
else
  curl -o $HOME/google_appengine_1.9.30.zip https://storage.googleapis.com/appengine-sdks/featured/google_appengine_1.9.30.zip
  unzip -q -d $HOME $HOME/google_appengine_1.9.30.zip
  echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
  mkdir -p lib
  pip install -r server/requirements.txt -t lib
  gcloud --quiet components update app
  gcloud auth activate-service-account --key-file ${HOME}/client-secret.json
  gcloud config set project $GCLOUD_PROJECT_ID
  cd front && npm install
fi

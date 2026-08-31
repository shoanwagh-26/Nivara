#!/bin/bash

rm -rf ./.amplify-hosting

mkdir -p ./.amplify-hosting/compute/default
mkdir -p ./.amplify-hosting/static

cp -r ./backend/* ./.amplify-hosting/compute/default/

cp -r ./frontend/build/* ./.amplify-hosting/static/

cp ./deploy-manifest.json ./.amplify-hosting/deploy-manifest.json
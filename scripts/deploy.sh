#!/bin/bash

# clean up
rm -rf deploy

# clone repo
git clone https://github.com/nikita-emelianov/word-flow.git deploy

# check environment file .env-bot existence
if ! test -f ".env-bot"; then
  printf '\033[31m'
  echo Error: you have to provide .env-bot file with environment variables
  echo See deploy/bot/.env.defaults file for more info:
  printf '\033[0m'
  exit 1
fi

# copy environment file .env-bot to bot folder
cp .env-bot deploy/bot/.env

# run
docker compose -f deploy/docker-compose.yml up -d --build

#!/bin/bash
# Use this script to run deployment.

# clean up
rm -rf deploy

# download docker compose file
wget -P deploy https://raw.githubusercontent.com/nikita-emelianov/word-flow/main/docker-compose.yml

# check environment file .env-bot existence
if ! test -f ".env-bot"; then
  printf '\033[31m'
  echo Error: you have to provide .env-bot file with environment variables
  echo See https://github.com/nikita-emelianov/word-flow/blob/main/.env.defaults for more info
  printf '\033[0m'
  exit 1
fi

# copy environment file .env-bot to bot folder
cp .env-bot deploy/.env

# pull latest images
docker compose -f deploy/docker-compose.yml pull

# run docker compose
docker compose -f deploy/docker-compose.yml up -d

# clean up
docker system prune -a --volumes -f

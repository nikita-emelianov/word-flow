#!/bin/bash

# clean up
rm -rf word-flow

# clone repo
git clone https://github.com/nikita-emelianov/word-flow.git

# run
docker compose -f ./word-flow/docker-compose.yml up -d

#!/bin/bash

docker build -t opportunity/botman:latest -t opportunity/botman:2.0.0 .
docker run -d --restart unless-stopped -p 3000:3000 --name botman opportunity/botman

#!/bin/bash

docker stop botman
docker rm botman
docker rmi opportunity/botman opportunity/botman:2.0.0
docker build -t opportunity/botman:latest -t opportunity/botman:2.0.0 .
docker run -d --restart unless-stopped -p 3000:3000 --name botman opportunity/botman

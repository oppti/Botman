#!/bin/bash

docker stop botman
docker rm botman
docker rmi opportunity/botman opportunity/botman:2.0.0

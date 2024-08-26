#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

yarn start:prod

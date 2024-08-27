#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

pnpm start:prod

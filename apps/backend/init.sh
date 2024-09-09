#!/bin/bash
set -e

# Set environment variables from azure environment variables
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

echo "Starting SSH ..."
service ssh start

pnpm start:prod

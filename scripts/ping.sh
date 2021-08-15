#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Usage: ping.sh <host>"
  exit 1
fi

statusCode=$(curl -o /dev/null -w "%{http_code}" --no-progress-meter $1)

if [ "$statusCode" -ne "200" ]; then
  echo "Error: got $statusCode code from $1"
  exit 2
fi
echo "Got 200 code from $1"

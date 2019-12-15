#!/usr/bin/env bash
git reset HEAD --hard
git pull
npm run build
echo "DONE"

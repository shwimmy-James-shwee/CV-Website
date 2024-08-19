# @core/db

This package is designed to be consumed internally by apps within this repo. It contains all the types for our database schema, which can be consumed by apps operating in both client/server JS/TS environments.

## How to use this package

1. Build this package by running `pnpm build` directly in this directory
2. Install the package by going to another monorepo package you'd like to use it on, in its`package.json`, add `"@core/db": "workspace:*",` as one of the dependencies, then run `pnpm install`.

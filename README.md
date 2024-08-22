# Monorepo Template

Nte: This repo is stil a WIP

## Project Structure

```
/apps
  /frontend
  /backend
  /functions
  /infrastructure

/libs
  /core-db
  /core-utils
  /eslint-config
  /tsconfig
```

## Prerequisites for setting up the project locally

1. Install Node.js - `v20.15.1`
2. Install npm - `10.7.0`
3. Install pnpm - `9.7.1`
4. Install docker desktop

## How to setup the project locally?

1. Clone the repo
2. In root folder, run `pnpm install`
3. In root folder, run `pnpm build` (for now, build might fail due to eslint issues, but it doesn't prevent apps from running)
4. To run the frontend locally: enter `cd apps/frontend`, then run `pnpm dev`
5. To run the backend locally: enter `cd apps/backend`, then run `pnpm dev`
6. To run the Azure Functions App locally: enter `cd apps/functions` directory, all a `local.settings.json` file, then run `pnpm dev`. You can get a sample of `local.settings.json` file from [Microsoft's docs](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-local#local-settings-file)

# Monorepo Template

Note: This repo is still a WIP

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
3. In root folder, run `pnpm build`
4. To run the frontend locally: enter `cd apps/frontend`, then run `pnpm dev`
5. To run the backend locally: enter `cd apps/backend`, then run `pnpm dev`
6. To run the Azure Functions App locally: enter `cd apps/functions` directory, all a `local.settings.json` file, then run `pnpm dev`. You can get a sample of `local.settings.json` file from [Microsoft's docs](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-local#local-settings-file)

## Which environments are the apps deployed to?

Currently, we deploy to `dev`, `qa`, `staging` environments automatically (every time people push commits to these branches), and we only trigger deployment to `prod` environment via release tags (to be implemented)

Here's a breakdown

| Environment       | Abbreviation | How do we deploy to this environment                                                 |
| :---------------- | :----------- | :----------------------------------------------------------------------------------- |
| Development       | `dev`        | Automatically trigger workflow every time code is being pushed into `dev` branch     |
| Quality Assurance | `qa`         | Automatically trigger workflow every time code is being pushed into `qa` branch      |
| Staging           | `staging`    | Automatically trigger workflow every time code is being pushed into `staging` branch |
| Production        | `prod`       | Manually trigger workflow by creating a **release tag** based on `prod` branch       |

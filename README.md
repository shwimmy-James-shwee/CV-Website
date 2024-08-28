# Monorepo Template

Note: This repo is still a WIP

This template is a ["monorepo"](https://monorepo.tools/) built on top of [Turborepo](https://turbo.build/). It uses **pnpm** as the package manager and **TypeScript** as the primary language.

It contains the following applications:

1. A single-page application (React)
2. A web API (Node.js/NestJS)
3. A Serverless API (Azure Functions V4 - Node.js)
4. Infrastructure-as-Code (Pulumi - TypeScript)

All the apps are setup with some of the most industry-standard toolings and they're configured to be deployed within KPMG NZ's cloud environments, providing you with a smooth developer experience as much as possible.

In addition, this template also makes uses of **shared packages**. With this approach, you'd have the power to use the same variables, functions, classes, and even SDKs across different apps within this repository - without ever publishing anything onto **npm**.

Currently, the shared packages we're using:

1. `@core/utils` - Common type-guards, helpers, non-sensitive variables/constants
2. `@core/db` - Source of truth for the database, exposes everything from `@prisma/client`, as well as any helpers.

## Project Structure (Key parts)

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
6. To run the Azure Functions App locally: enter `cd apps/functions` directory, add a `local.settings.json` file, run `pnpm buils`, then run `pnpm dev`. You can get a sample of `local.settings.json` file from [Microsoft's docs](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-local#local-settings-file)

## Which environments are the apps deployed to?

Currently, we deploy to `dev`, `qa`, `staging` environments automatically (every time people push commits to these branches), and we only trigger deployment to `prod` environment via release tags (to be implemented)

Here's a breakdown

| Environment       | Abbreviation | How do we deploy to this environment                                                 |
| :---------------- | :----------- | :----------------------------------------------------------------------------------- |
| Development       | `dev`        | Automatically trigger workflow every time code is being pushed into `dev` branch     |
| Quality Assurance | `qa`         | Automatically trigger workflow every time code is being pushed into `qa` branch      |
| Staging           | `staging`    | Automatically trigger workflow every time code is being pushed into `staging` branch |
| Production        | `prod`       | Manually trigger workflow by creating a **release tag** based on `prod` branch       |

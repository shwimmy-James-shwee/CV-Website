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
2. In root folder, add an `.env` file according to the `.env.example` file. You may need to ask your team to get the full set of `.env` with proper values
3. In root folder, run `pnpm install`
4. In root folder, run `pnpm build`
5. To run the frontend locally: refer to [this guide](./apps/frontend/README.md)
6. To run the backend locally: refer to [this guide](./apps/backend/README.md)
7. To run the Azure Functions App locally: refer to [this guide](./apps/functions/README.md)

## Which environments are the apps deployed to?

Currently, we deploy to `dev`, `qa`, `staging` environments automatically (every time people push commits to these branches), and we only trigger deployment to `prod` environment via release tags (to be implemented)

Here's a breakdown

| Environment       | Abbreviation | How do we deploy to this environment                                                 |
| :---------------- | :----------- | :----------------------------------------------------------------------------------- |
| Development       | `dev`        | Automatically trigger workflow every time code is being pushed into `dev` branch     |
| Quality Assurance | `qa`         | Automatically trigger workflow every time code is being pushed into `qa` branch      |
| Staging           | `staging`    | Automatically trigger workflow every time code is being pushed into `staging` branch |
| Production        | `prod`       | Manually trigger workflow by creating a **release tag** based on `prod` branch       |

## What environment variables are required to deploy apps to each environment?

All the environments (dev, qa, staging, prod) require the same set of environment variables and environment secrets.

Environment Secrets:

1. `AZURE_CREDENTIALS` - To be setup by the IT/Cloud team

Environment Variables:

1. `AZURE_RESOURCE_GROUP` - ID of the resource group for your apps to be deployed to on Azure
2. `AZURE_RESOURCE_LOCATION`- In most cases, set it to `Australia East`
3. `B2C_CLIENT_ID` -
4. `B2C_POLICY_NAME` -
5. `B2C_TENANT_NAME` -
6. `ENV` - Strictly limit to one of the following: `dev`, `qa`, `staging`, `prod`
7. `INITIAL_PULUMI_CONFIG_PASSPHRASE`
8. `POSTGRES_ADMIN_PASSWORD` -
9. `PRIVATE_ENDPOINT_SUBNET` -
10. `PULUMI_CONFIG_PASSPHRASE` -
11. `SERVICE_ENDPOINT_SUBNET` -
12. `VITE_API_URL` - URL of the backend API for the frontend app
13. `VITE_B2C_CLIENT_ID` -
14. `VITE_B2C_TENANT_NAME` -
15. `VITE_POLICY_NAME_EDIT_PROFILE` -
16. `VITE_POLICY_NAME_RESET` -
17. `VITE_POLICY_NAME_SIGN_IN_UP` -

# Monorepo Template

Note: This is a ongoing WIP repo

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
3. `@core/routes` - Centralized endpoints/routes/paths variables for the all the apps

## Project Structure (Key parts)

```
/apps
  /frontend
  /backend
  /functions
  /infrastructure

/libs
  /core-db
  /core-routes
  /core-utils
  /eslint-config
  /tsconfig
```

## Getting started

> Within KPMG network you will run into restrictions on most of the network request - [To solve ssl issues](https://dlh-portal.kpmg.co.nz/docs/docs/Guides%20and%20Training/KPMG/certs#wsl---ubuntu)
>
> - general ssl problem - `WSL - Ubuntu`
> - general request ssl problem - `Requests/Poetry`
> - nodejs ssl problem - similar to `Requests/Poetry`, but use `NODE_EXTRA_CA_CERTS` instead of `REQUESTS_CA_BUNDLE`

## Prerequisites for setting up the project locally

1. Install [Node.js - `v20.15.1`](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
2. Install npm - `10.7.0`
3. Install pnpm - `9.7.1` (npm install -g pnpm@9.7.1)
4. Install [docker desktop](https://www.docker.com/products/docker-desktop/)

> We recommend you to use [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm) to manage the node versions after installing nodejs above.

## How to setup the project locally?

1. Clone the repo
2. Run `docker compose -f ./libs/core-db/docker-compose-db.yml up -d`

   > Docker is used to setup the required database connection. This command will setup a postgres on port 5432 and with username `postgres` password `postgres`. **You do not need this step if you alread have a postgres database with the same [configuration](./libs/core-db/docker-compose-db.yml)**

3. In root folder, add an `.env` file according to the `.env.example` file. You may need to ask your team to get the full set of `.env` with proper values
4. In root folder, run `pnpm install` **(make sure you are in nodejs v20 in case of any incompatible library)**
5. In root folder, run `pnpm build`
6. To setup the database, run `pushd ./apps/backend`, then `pnpm run dev:db:reset` and then `popd`
7. To run the frontend locally: refer to [this guide](./apps/frontend/README.md)
8. To run the backend locally: refer to [this guide](./apps/backend/README.md)
9. To run the Azure Functions App locally: refer to [this guide](./apps/functions/README.md)

To run the webapp locally on the root level

1. To run the frontend and the backend use the command `pnpm run dev`
2. To run the function app use the command `pnpm run start:dev`

> Packages under [libs](./libs/) is crucial dependencie for any of the apps, make sure test all the apps thoroughly if you made any change to these packages.

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

1. `AZURE_CREDENTIALS` - The credentials for login AZ CLI to make change to the cloud resource group, to be setup by the IT/Cloud team.

> The `AZURE_CREDENTIALS` is a `JSON` string:

```json
{
  "clientId": "***",
  "clientSecret": "***",
  "subscriptionId": "***",
  "tenantId": "***"
}
```

Environment Variables:

> Please note that some of the variable below should be a secret instead, it is only a variable in this repo for demo purpose.
> Changing them to secret will need to update the github workflow files to use `secrets.XXX` instead of `vars.XXX`

1. `PROJECT_NAME_ABBREVIATION` - Determine the all resource names deployed by `IaC` and destination resource name the apps deploying to.
2. `AZURE_RESOURCE_GROUP` - ID of the resource group for your apps to be deployed to on Azure
3. `AZURE_RESOURCE_LOCATION`- In most cases, set it to `Australia East`
4. `ENV` - Strictly limit to one of the following: `dev`, `qa`, `staging`, `prod`
5. `B2C_CLIENT_ID` - The B2C API app registration client id
6. `B2C_POLICY_NAME` - The B2C authentication userflow use by the frontend portal
7. `B2C_TENANT_NAME` - The B2C tenant name
8. `PULUMI_CONFIG_PASSPHRASE` - The passphrase to make change to the IaC via Pulumi
9. `POSTGRES_ADMIN_PASSWORD` - Posgres database password
10. `PRIVATE_ENDPOINT_SUBNET` - Subnet for all the private endpoints to be created in
11. `SERVICE_ENDPOINT_SUBNET` - Subnet for the app service, webapp, function app instance
12. `VITE_API_URL` - URL of the backend API for the frontend app
13. `VITE_B2C_CLIENT_ID` - The B2C Portal app (should setup using the API App Reg exposed endpoitns) regitration client id
14. `VITE_B2C_TENANT_NAME` - The B2C tenant name
15. `VITE_POLICY_NAME_EDIT_PROFILE` - The B2C userflow for profile edit
16. `VITE_POLICY_NAME_RESET` - The B2C userflow for reset password
17. `VITE_POLICY_NAME_SIGN_IN_UP` - The B2C userflow for sign in and sign up

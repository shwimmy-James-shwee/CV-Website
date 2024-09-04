# @core/db

This package is designed to be consumed internally by apps within this repo. It contains all the types for our database schema, which can be consumed by apps operating in both client/server JS/TS environments.

## How to use this package

1. Build this package by running `pnpm build` directly in this directory
2. Install the package by going to another monorepo package you'd like to use it on, in its`package.json`, add `"@core/db": "workspace:*",` as one of the dependencies, then run `pnpm install`.

## Setting up local database
Ensure you are in `./libs/core-db` directory:
1. Add create a .env file in `./apps/backend/.env` file and add the environment variables below
2. Run `nvm use 20.15.1`
3. To build local db run `pnpm docker:db:create`. Can also run `docker compose down` to delete local db. This is to be run in the root directory
4. Change directory into core-db by running `cd ./libs/core-db` in root dir.
5. Run `pnpm db:makemigrate` to intialise migration file.
6. Run `pnpm db:deploy` to deploy migration file to local db.
7. Run `pnpm db:studio` to see if changes have been deployed to local db

Env variables
```bash
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/postgres?schema=twm"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:5432/postgres?schema=twm"
 
NODE_ENV="local"
APP_PORT=8080
 
B2C_POLICY_NAME="B2C_1A_SIGNUP_SIGNIN_TOTP"
B2C_RESPOND_POLICY_NAME="B2C_1A_SIGNUP_SIGNIN_TOTP"
 
B2C_TENANT_ID="5e727e79-8329-40f3-b94c-55459d616442"
B2C_CLIENT_ID="67a8485d-da07-441f-9a23-c697d239d8f8"
B2C_TENANT_NAME="NZKASEB2CDEV001"
B2C_POLICY_NAME="B2C_1_signup_signin"
 
TEMP_UPLOAD_DIR="./tmp"
 
AV_HOST=10.150.73.116
AV_HOST=127.0.0.1
AV_PORT=3310
```

## Making local schema changes
```bash
# To only make the migration file
pnpm db:makemigrate

# To deploy migration changes to the database
pnpm db:deploy

# The client of prisma will also need to be generated to recognise and support the new changes
pnpm db:generate

# To deploy to local db and not generate a migration file (for local development)
pnpm db:push
```

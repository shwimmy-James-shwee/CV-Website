# Azure Functions

This is an Serverless app built using Typescript and Azure Function App V4 Programming Model.

## How to run this app locally?

1. Make sure you have a `.env` file at the root level
2. Make sure the `.env` file has all the required environment variables for this function app
3. Create a `local.settings.json` in this folder (yes, you still need this file!) and pase the following content:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobs.health.Disabled": false
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*",
    "CORSCredentials": false,
    "nodeDebugPort": 5860
  }
}
```

4. Run ``pnpm build`
5. Run `pnpm start:dev`

## How to make changes locally?

#### [Functions](src/handlers)

> Where all the individual functions are defined. each will and should be a complete function itselt without depending on other functions in the same level.

#### [Services](src/services)

> Generic functions that can be reused and is not contain business logic itself. functions here should be focus on doing smart action that can be use by the higher level functions.

All changes will need you to add or modify a respective test file inside the \_\_tests\*\* folder under the same level eg., [emailWatcher.ts](src/handlers/emailWatcher.ts) => [emailWatcher.test.ts](src/handlers/__tests__/emailWatcher.test.ts)

`Once changes has been made, you should run test locally before commit to github for PR`

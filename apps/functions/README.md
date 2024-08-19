# Azure Functions

## Key technologies used:
1. Language: Typescript
2. Framework: Azure Functions V4
3. Error-handling: Neverthrow + built-in toolings from Azure Functions V4
4. API Runtime validation: Zod
5. Logging: ___

## How to setup locally?
1. Add a `local.settings.json` file inside `/aps/functions/` folder - this is the environment variables file. The function app cannot run without it.
2. Run `pnpm build`
3. Run `pnpm dev`

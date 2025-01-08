# Backend

## How to run this app locally?

1. Run `pnpm dev`

## deploying the BE

1. clone the repo in to the VM
2. Run `docker compose -f ./libs/core-db/docker-compose-db.yml up -d`
3. copy .env.example to .env - make changes as needed
4. within the repo, run 'pnpm install --prod'
5. run 'pnpm --filter=backend build'
6. To setup the database, run `pushd ./apps/backend`, then `pnpm run dev:db:reset`
7. run pnpm run start:prod

## Key technologies used:

1. Language: Typescript
2. Framework: Node.js + NestJS
3. Error-handling: Neverthrow + NestJS built-in toolings
4. API Runtime validation: Zod
5. Logging: \_\_\_

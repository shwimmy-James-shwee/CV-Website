# Backend

## How to run this app locally?

1. Run `pnpm dev`

## deploying the BE manually (to be replaced by CI/CD)

1. clone the repo in to the VM and navigate inside the repo
2. Run `docker compose -f ./libs/core-db/docker-compose-db.yml up -d`
3. 'cp .env.example .env' - make changes as needed
4. run 'pnpm install' at repo root

### Free oracle VM struggles to do all these through asych. running one by one works

5. navigate in to ./libs/core-db, run 'pnpm build'
6. navigate in to ./libs/core-routes, run 'pnpm build'
7. navigate in to ./libs/core-utils, run 'pnpm build'
8. navigate in to ./apps/backend, run 'pnpm build'
<!-- 8. run 'pnpm build' at repo root-->

9. To setup the database, run `cd apps/backend`, then `pnpm run dev:db:reset` (this applies migrations and seeds)
10. run pnpm run start:prod - just BE?

## Key technologies used:

1. Language: Typescript
2. Framework: Node.js + NestJS
3. Error-handling: Neverthrow + NestJS built-in toolings
4. API Runtime validation: Zod
5. Logging: \_\_\_

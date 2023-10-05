# Monorepo Template for Typescript Projects

## What is a monorepo?

[Check out this article](https://monorepo.tools/)

## Why monorepo?

When working on client engagements, it's not uncommon that we're required to build different parts of an application, be it UI portals, REST APIs, serverless handlers, CRON jobs, data migration scripts, docker files, IaC, etc, which oftentimes, we end-up with lots of repositories & different coding styles.

There are areas in software engineering that're important to get right, but not tangible enough to deliver client-values. Just to name a few, they are:

1. How do we ensure all of our commits are following an agreed standard without having to manually check them before each commit?
2. How do we to ensure our code follows an unambigious architecture? (folder structure, file naming conventions, etc)
3. How do we know if we forgot to inlcude environment variables before pushing code to production?
4. How can we gracefully handle runtime errors?
5. How do we spend less time on repetitive & indifferentiated code (CRUD logic, API documentation, etc) & deliver more client-value in less time?
6. How do we track what each pull request is doing without having to review the code itself?

And a lot more...

## Features:

1. Shared eslint config
2. Shared prettier config
3. Husky precommit hook
4. Absolute import alias for each workspace package. We use `@`
5. Dedicated `src` folder for each package which helps separating code from config files
6. Template: Next.js + tRPC + Zod + Tailwind
7. Template: NestJS + Zod + Neverthrow
8. Template: Remix?
9. Templatte: Azure Functions?
10. Template: Node + Express?
11. Template: React + Vite?

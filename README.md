# Monorepo Template for Typescript Projects

## 🤔 What is a monorepo?

[Check out this article](https://monorepo.tools/)

## 📚 Why monorepo?

When working on client engagements, it's not uncommon that we're required to build different parts of an application, be it UI portals, REST APIs, serverless handlers, CRON jobs, data migration scripts, docker files, IaC, etc, which oftentimes, we end-up with lots of repositories & different coding styles.

There are areas in software engineering that're important to get right, but not tangible enough to deliver client-values. Just to name a few, they are:

1. How do we ensure all of our commits are following an agreed standard without having to manually check them before each commit?
2. How do we to ensure our code follows an unambigious architecture? (folder structure, file naming conventions, etc)
3. How do we know if we forgot to inlcude environment variables before pushing code to production?
4. How can we gracefully handle runtime errors?
5. How do we spend less time on repetitive & indifferentiated code (CRUD logic, API documentation, etc) & deliver more client-value?
6. How do we track what each pull request is doing without having to review the code itself?

And a lot more...

Setting up a monorepo to address some of these issues not only helps us to build software the proper way (for the most part), but also enables us to focus on work that creates more value to our clients.

## 😎 Who's using monorepo?

Many companies & lots of open-source projects.

Check out some of them:

1. [Polaris](https://github.com/Shopify/polaris) - Shopify's design system
2. [Electron](https://github.com/electron/electron) - Build desktop apps with JS/TS
3. [Amplication](https://github.com/amplication/amplication/) - SaaS platform that generates secure & scalable backend code based on your database schema
4. [Vercel](https://github.com/vercel/vercel) - You don't know Vercel !?
5. [Supabase](https://github.com/supabase/supabase) - Open-source Firebase alternative built for PostgresSQL
6. [APITable](https://github.com/apitable/apitable) - Open-source alternative to Airtable
7. [Grafana](https://github.com/grafana/grafana) - Data visualisation & Observability tool
8. [Cube.dev](https://github.com/cube-js/cube) - Semantic API layer for data analytic apps

## 💸 How can this template help you with YOUR engagements & workflows?

| Areas                                                               | Solutions & Tools we use                                                                                                                                         |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reduce bugs                                                         | Typescript!                                                                                                                                                      |
| Reduce installation time for NPM packages                           | [PNPM](https://pnpm.io/)                                                                                                                                         |
| Scaffolding the monorepo                                            | [Turborepo](https://turbo.build/)                                                                                                                                |
| Shared coding syntax rules                                          | [Eslint]()                                                                                                                                                       |
| Shared code formatting rules                                        | [Prettier]()                                                                                                                                                     |
| Automatic code formatting & linting on each commit                  | [Husky precommit hook]()                                                                                                                                         |
| Seperating code-related files apart from configuration files        | Using dedicated `/src` folder for each project under `/packages` folder                                                                                          |
| Reduce confusion when importing code from other folders/files       | Absolute path-mapping. For e.g, `import { UserService } from '@/services/user.service.ts'` not `import { UserService } from '../../../services/user.service.ts'` |
| Validating environment variables                                    | [Zod](https://github.com/colinhacks/zod) & [t3-env](https://github.com/t3-oss/t3-env)                                                                            |
| Make sure your peers are documenting what they're doing for each PR | Pull Request template in `/.github` folder                                                                                                                       |

## 🎨 Template Recommendations

We are, by no means, forcing you to choose the following tools for your projects. They're simply genuine recommendations (from experience) so that you can be more productive & also produce code that're self-documenting, maintainable & scalable.

If you happen to know any tools we can add to the list of recommendations, make a PR & let's talk:)

| Business need   | Tech stack                                   |
| :-------------- | :------------------------------------------- |
| Simple web-apps | Next.js + tRPC + Zod + Tailwind CSS          |
| Dedicated APIs  | NestJS + Zod + RxJS + Neverthrow             |
| Serverless APIs | Node.js + Azure Functions + Zod + Neverthrow |

## 🙋‍♂️ Reasonings

### 🎨 Simple web-apps

Definition: Web applications that processuser-inputs on a relatively tiny scale with simple business logics (CRUD, etc)
| Tools | Why this tool |
|:--|:--|
| Next.js | React-based framework, provides out-of-box page-routing, SSR allows us building simple APIs without having to deploy separate backends |
| tRPC | REST APIs aren't the easiest document, and enforcing type-safety on them can be an overkill. tRPC allows you to execute backend functions directly from frontend with type-safety built-in by default & it has nice integrations with Next.js, which not only helps bringing simplicity to your APIs, but you're also documenting them automatically |
| Zod | Form entries & API controllers/services require input validations. Instead of writing custom functions for validation on both frontend and backend, you can create a single source-of-truth for validation logic using **Zod schemas** where you can specify custom fields & error messages in one place & infer type definitions, which you can then share them across both frontend and backend on any applications built with Next.js & tRPC|
| Tailwind CSS | Writing inline CSS & having separate CSS files for React components isn't maintainable, it becomes even more troublesome when you had to make them responsive. Tailwind introduces simplicity with inline classes & enables lightweight production build bundles. You're wlesome to use Tailwind with any component library of your choice |

### 🚀 Dedicated APIs

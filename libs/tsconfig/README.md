# A collection of `tsconfig.json`

This folder contains several examples of `tsconfig.json` file which you can copy/paste into new app/packages at their standalone `tsconfig.json`.

Samples can be found in [this folder](./samples/)

Note that this folder does not export anything.

The decisions of not creating a "shared" tsconfig comes down to the following reason: Each project is different. Just because they sometimes share the same tsconfig properties and values, extending and then overriding the base / centralised version of `tsconfig.json` is often over-complicated & making it easy to to create breaking changes.

### To illustrate the complexity of tsconfig,

Projects can be:

1. Package - Pure JS/JS code / functions - suitable for both client/server/mobile apps, needs own tsconfig
2. Package - UI component library that's framework-specific - only usable in specific environment (React / React Native / Angular / Vue / Electron / Ionic / Svelt), needs own tsconfig
3. Application - React app (CRA), needs own tsconfig
4. Application - React app (Vite), needs own tsconfig
5. Application - Next.js app, needs own tsconfig
6. Application - Next.js app (using tRPC), needs own tsconfig
7. Application - Node.js API (plain express), needs own tsconfig
8. Application - Node.js API (NestJS), needs own tsconfig
9. Application - Node.js API (Azure Function V3), needs own tsconfig
10. Application - Node.js API (Azure Function V4), needs own tsconfig
11. Application - Script for seeding database, needs own tsconfig
12. Application - IaC with Azure SDK / AWS CDK / Pulumi (TS), needs own tsconfig

etc etc etc...

There are properties that all of our projects need to have in common, for example:

1. `"strictNullChecks": true,` - for type-safety at runtime
2. `"strict": true,` for strict type-checking
3. `"noUncheckedIndexedAccess": true,` - for ensuring we don't access properties of objects in arrays using indeces that're out of range
4. `"baseUrl": ".",` and `"paths": { "@/*": ["./src/*"] },` - enabling absolute import path using aliases

But, there are more differences between each `tsconfig.json` than what they have in common, so there comes the decision to use separate `tsconfig.json` for each project.

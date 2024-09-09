# @core/utils

This package is designed to be consumed internally by apps within this repo. It contains helper functions, type guards, domain-specific & non-sensitive constants (for UI dropdowns, API validation & DB seedings). The package is purely JS/TS and has zero dependencies, suitable for both all JS/TS environments.

## How to use this package

1. Build this package by running `pnpm build` directly in this directory
2. Install the package by going to another monorepo package you'd like to use it on, in its`package.json`, add `"@core/utils": "workspace:*",` as one of the dependencies, then run `pnpm install`.
3. Optional: If you're making changes to this packakeg, it is a good idea to `pnpm dev` on this package. It'll notify you whenever your changes are breaking things, so that you can address them early-on, instead of only find out about them when this package is used elsewhere.

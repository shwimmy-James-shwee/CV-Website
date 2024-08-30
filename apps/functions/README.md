# Template Function App

This is a template function is built using Typescript and Azure function app programming v4.

## To make changes locally

#### [Functions](src/handlers)

> Where all the individual functions are defined. each will and should be a complete function itselt without depending on other functions in the same level.

#### [Services](src/services)

> Generic functions that can be reused and is not contain business logic itself. functions here should be focus on doing smart action that can be use by the higher level functions.

All changes will need you to add or modify a respective test file inside the \_\_tests\*\* folder under the same level eg., [emailWatcher.ts](src/handlers/emailWatcher.ts) => [emailWatcher.test.ts](src/handlers/__tests__/emailWatcher.test.ts)

`Once changes has been made, you should run test locally before commit to github for PR`

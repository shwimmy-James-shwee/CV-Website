# Template Webapp Frontend

This is a template webapp frontend is built using React in Typescript.

### To use this repo
1. Create repo using this template and select `Include all branches`
2. Settings->Rules->Rulesets then import all the rules from the folder [rulesets](./rulesets)
3. To do development, branch out from `release_candidate`, make changes to the `feature-branch`, push `feature-branch` to dev for development test, push to `UAT` for QA testing, push to `release_candidate` for prod release later and delete `feature-branch`. Once given green light, push `release_candidate` to `prod` to do the release. 

### Setting variables/secrets for github action
1. Repo level 
   - `PROJECT_NAME_ABBREVIATION`(Var): it determine what resource name does the github action deploy the webapp to. It need to be the same as the `IaC` repo
2. Environment level
   - `AZURE_CREDENTIALS`(Secret): from ITS cloud team, which give deployment permission to cloud resource.
   - `AZURE_RESOURCE_GROUP` (Var): from the resource group created by the ITS cloud team.
   - `ENV`(Var): name for the environment (dev,uat,prd...).
   - `VITE_API_URL`(Var): url endpoint to your backend server.
        #### below are use for MSAL login integration
   - `VITE_B2C_CLIENT_ID`(Var): B2C app registration client id.
   - `VITE_B2C_TENANT_NAME`(Var): B2C tenant name.
   - `VITE_POLICY_NAME_EDIT_PROFILE`(Var): Edit profile policy name.
   - `VITE_POLICY_NAME_RESET`(Var): Reset password policy name.
   - `VITE_POLICY_NAME_SIGN_IN_UP`(Var): Signup/Signin policy.


## Getting started
> Within KPMG network you will run into restrictions on most of the network request - [To solve ssl issues](https://dlh-portal.kpmg.co.nz/docs/docs/Guides%20and%20Training/KPMG/certs#wsl---ubuntu)
>  - general ssl problem - `WSL - Ubuntu`
>  - general request ssl problem - `Requests/Poetry`
>  - nodejs ssl problem - similar to `Requests/Poetry`, but use `NODE_EXTRA_CA_CERTS` instead of `REQUESTS_CA_BUNDLE`

> you will need to have [nodejs 20+ LTS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) installed, for nodejs, preferably using [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm) to manage the node versions
> 


```bash

# if you need to use fnm or nvm to get nodejs 18
fnm install 20 # nvm install 20
fnm use 20 # nvm use 20

# 1. update yarn
npm install -g npm@latest
npm install -g yarn@latest

# 2. install dependencies and executables
yarn global add ts-node typescript dotenv-cli
yarn install

# 3. get playright for storybook intergration
yarn playwright install-deps && yarn playwright install


# 4. make a copy of .env.example and rename to .env (keep the .env.sample as it is and dont modify it)
# update the .env with the details obtained from other devs
cp .env.local.example .env.local

# 5. serve
yarn start
```

#

## To make changes locally

### 1. updating Components 

#### Components (Component Library)

> All component should design with the mindset of reusing it. Design and add them to the Storybook

- [Component Folder](src/components)
- All components are generic components, no business logic should be included in here. Each componenent should have their own stories eg., [NavBar.stories.tsx](src/components/global/__stories__/NavBar.stories.tsx)

```bash
# command to start portal, when you can see all the components library object and develop stories for your generic component
yarn storybook
```

#### Page Components (Business UIs)
> When there is new endpoint added, the new [endpoints.ts](src/shared/endpoints.ts) and [schema.ts](src/shared/schema.ts) need to be cloned from the backend repo.

> Components that is not consider generic and pretty much bespoke for a business logic.

- Should handle all creation of functions and pass into `Generic Components`, such as onClick Fetch functions etc. Each page componenets should be tested by including a test file eg., [UserActivityPage.test.tsx](src/pages/__tests__/UserActivityPage.test.tsx)

`Once changes has been made, you should run test locally before commit to github for PR`

```bash
# if there is any error to the test/lint, it will fail the PR Check
# to run full test watch (press `a` after to trigger all test)
yarn test 

# to run test once only
yarn coverage

# to run lint test 
yarn lint

# to run storybook test 
yarn test-storybook
```

##

## To deploy changes to the cloud

### 1. shipping code to Storage Account Static Web Page

- make PR to the target branch, and make sure the test pass and also resolve all comments from reviewers
- merge change

> github action will automatically kick off, which will build the UI, ship it to the designated storage account as static files

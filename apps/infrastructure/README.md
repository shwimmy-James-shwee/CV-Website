# Template Webapp IaC

This is a template iac to deploy the base resources to support the webapp.

## Lite TID and Solution Diagram

- [Editable Draw.io Diagram](./documents/SDTWebAppTemplate.drawio)
- [PNG Diagram](./documents/SDTWebAppTemplate.drawio.png)
- [TID Lite](./documents/TID%20Lite%20WebApp%20Template.docx)

## High level components

### [Code Deploy](./codedeploy/)

This folder includes the basic and core resources that are required for the IaC to run and pre-setup core resources must be used later.

### [Resources Base](./resources_base/)

This folder includes resources that are used to support the operation of the service resources.

eg.

- Azure container registry is required for the app service container images, so the ACR is classified as a resource base.
- App service plan is required for the app service compute, so the ASP is classified as a resource base.

### [Resources](./resources/)

This folder includes resources that are at the service level.

eg. App Service, Postgres, Container Instance, Container Apps, Data Storage Accounts ...

<br>

## Set repo scope PROJECT_NAME_ABBREVIATION

(you should only do this if you haven't deploy any infra resource yet. it will set the resource name prefix)

Github Settings -> Secrets and variables -> Actions -> Variables

Update the `PROJECT_NAME_ABBREVIATION`

**!!! Important `PROJECT_NAME_ABBREVIATION` is strictly `^([a-zA-Z0-9]){1,8}$` ([ here to check project abbreviation ](https://regex101.com/r/wUXqbN/1)), a few of the resources will not taking any special characters at all and have length limit. eg storage account and container registry**

<br>

## Change the PULUMI_CONFIG_PASSPHRASE

(you should only do this if you haven't deploy any infra resource yet, default is `dummypassphrasenew`)

the [loigc](./regenerate_passphrase.sh) is to create another project using the pulumi cli and then copy the `encryptionsalt` over

```bash
bash regenerate_passphrase.sh
```

Check if the correct yaml file is updated.

Update the `PULUMI_CONFIG_PASSPHRASE` in the github environment variables/secrets for it to work.

<br>

## Deployment

### Environment Variables

these values should be set and store in the github environment variable/secret

```yaml
AZURE_CREDENTIALS: ${{ secrets.AZURE_CREDENTIALS }} # come from ITS, they will have to add this for you in different github environment
ENV: ${{ vars.ENV }}
PROJECT_NAME_ABBREVIATION: ${{ vars.PROJECT_NAME_ABBREVIATION }}
AZURE_RESOURCE_GROUP: ${{ vars.AZURE_RESOURCE_GROUP }}
AZURE_STORAGE_CONTAINER: pulumistate
PULUMI_CONFIG_PASSPHRASE: ${{ vars.PULUMI_CONFIG_PASSPHRASE }}
PRIVATE_ENDPOINT_SUBNET: ${{ vars.PRIVATE_ENDPOINT_SUBNET }}
SERVICE_ENDPOINT_SUBNET: ${{ vars.SERVICE_ENDPOINT_SUBNET }}
POSTGRES_ADMIN_PASSWORD: ${{ vars.POSTGRES_ADMIN_PASSWORD }}
AZURE_STORAGE_ACCOUNT: ${{ vars.PROJECT_NAME_ABBREVIATION }}codedeploy${{ vars.ENV }}
# below come from B2C Tenant, leave dummy value until B2C is setup
B2C_TENANT_NAME: ${{ vars.B2C_TENANT_NAME }}
B2C_CLIENT_ID: ${{ vars.B2C_CLIENT_ID }}
B2C_POLICY_NAME: ${{ vars.B2C_POLICY_NAME }}
```

Above have a couple variable that are meant to be `secrets.` instead of `vars.`, this is intentional in the template project but you should make it a secret in your establishing project.

- add as secret instead of variable
- reference in pipeline by `secrets.` instead of `vars.`

```yaml
PULUMI_CONFIG_PASSPHRASE: ${{ secrets.PULUMI_CONFIG_PASSPHRASE }}
POSTGRES_ADMIN_PASSWORD: ${{ secrets.POSTGRES_ADMIN_PASSWORD }}
```

---

### [Initialize IaC](./.github/workflows/InitializeIaC.yml) (Deployment time is around 20 mins for the first time)

(ideally this should be run once only, remmember to tick first time deploy when run it for the first time.)
_Not safe for trial and error, it will create a keyvault that cant be recreated with the same name_

This pipeline should be run in order to setup the pulumi storage backend and also the core resources.

resources created here:

- CodeDeploy Storage Account (pulumi backend state, also use for any code deployment usage)
- Keyvault (for secrets, encryption keys)
- Managed Identities
- Access Policies

_Majority of the wait time is on waiting for the DNS to resolve for the storage account private endpoint first created_

---

### [IaC Deploy](./.github/workflows/IaCDeploy.yml) (Deployment time is around 20 mins for the first time)

_All changes to non codedeploy IaC gets deploy here. it will also import some of the codedeploy resource, safe for trial and error_

#### Run IaC Preview

(preview changes that will make to the infrastructure)

You should check the preview details here before approving the deployment to proceed to the next step

#### ManualApprove

it will call a protected envronment which will prompt for approval before proceeding to the next step.

#### Run IaC Deploy

Deploy changes shown on the IaC Preview

_Majority of the wait time is on waiting for the DNS to resolve for the container registry private endpoint and then build the dummy container image_



##

## Database recovery

(The database will keep the last two day continously backedup and retain for over 35 days. ie. we cant go back further than last 2 days.)

(You will need the help from IT cloud team, your local pc does not able to connect to the cloud postgres on port 5432, docker compose is needed in the operation host. Options are creating a container instance that runs the docker compose image or provision an VM to do so.)

### 1. Create Clone database, Enable access to both database (live, restore)

- go to the live database resource and start the restore process, select point in time to create the restore database (take awhile to create)
- in the restored cosmos postgres resource, enable the public access for the restore resource and also the live database resource.


### 2. (Local PC) Setup and run the restore process

(require docker to be installed and functional)

```bash
# Host Console:
# setup the docker postgres for the pg_dump and psql client, and then enter the container to perform restore actions
docker-compose -f docker-compose-restore.yml up --build -d
docker exec -it postgres_db_restore_container bash

```

```bash
# Container Console:
# setup the variables for the postgres restore commands, these should come from the keyvault and the resource itself

# The password that was set for the database when provision
export PGPASSWORD=xxxxxxx
# LiveHost: the database host which you want to put the data into
export LiveHost=c-tplv1-postgresql-cluster-dev.livexxxcoordinateid.postgres.cosmos.azure.com
# RestoreHost: the database host which you want to get the data from
export RestoreHost=c-restoreddbtplv1dev.restorexxxcoordinateid.postgres.cosmos.azure.com

# make sure this is the right commit/version , use git to compare what you've commited and the message shown

# remove the live db restore schema if exist
PGPASSWORD=$PGPASSWORD psql -U citus -h "$LiveHost" -p "5432" --dbname="citus" -c 'DROP SCHEMA IF EXISTS DBDataRestore CASCADE'

# clone the restore schema to the live database as DBDataRestore schema
PGPASSWORD=$PGPASSWORD pg_dump -Fp -U citus -h "$RestoreHost" -p "5432" --schema="AppDBSchema" --dbname="citus" > restore.sql
cat restore.sql | sed 's/AppDBSchema/DBDataRestore/g' | PGPASSWORD=$PGPASSWORD psql -U citus -h "$LiveHost" -p "5432" --dbname="citus"

# rename the live db AppDBSchema schema is case of reverting back
run_date=$(date +"%Y_%m_%d_%I_%M%p") && PGPASSWORD=$PGPASSWORD psql -U citus -h "$LiveHost" -p "5432" --dbname="citus" -c "ALTER SCHEMA AppDBSchema RENAME TO ex_live_AppDBSchema_${run_date}; ALTER SCHEMA DBDataRestore RENAME TO AppDBSchema"

exit

```

```bash
# Host Console:
# clean up the local setup for the client
docker-compose -f docker-compose-restore.yml down

```

### 3. Disbale public access to both database (live, restore)

- in the restored cosmos postgres resource, disable the public access for the restore resource and also the live database resource.
- base on requirement, delete or leave the restore database

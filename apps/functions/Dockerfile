# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node18-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

RUN corepack enable 

ENV DISABLE_ERD true

# COPY . /home/site/wwwroot

# RUN cd /home/site/wwwroot && \
#     npm install && \
#     npm run build

WORKDIR /src/build 
COPY . /src/build 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --filter="./apps/functions/"  --filter="./libs/**/"
RUN pnpm run build --filter="./apps/functions/" --filter="./libs/**/"
RUN pnpm deploy --filter="./apps/functions/" --prod ./prod/backend 

# setup prisma engine binary to connect to db
WORKDIR /src/build/prod/backend
RUN pnpm db:generate \ 
    && cp -r ./node_modules/@core/db/node_modules/.prisma ./node_modules/


RUN cp -r /src/build/prod/backend /home/site/wwwroot
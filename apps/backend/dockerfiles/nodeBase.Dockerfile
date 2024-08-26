FROM node:lts-slim

ENV WORKDIR /src/app

RUN mkdir -p /src/app 
WORKDIR $WORKDIR
COPY ./package.json ./package.json
COPY ../../../pnpm-lock.yaml ./pnpm-lock.yaml

RUN apt update \
  && apt upgrade -y \
  && apt install -y python3 git curl openssh-server 


RUN yarn global add pm2 ts-node typescript dotenv-cli husky\
  && rm -rf node_modules \
  && yarn install --immutable --immutable-cache --check-cache

# ssh

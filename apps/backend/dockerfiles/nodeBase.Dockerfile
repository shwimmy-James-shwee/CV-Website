FROM node:20-slim

ENV WORKDIR /src/app

RUN mkdir -p /src/app 
WORKDIR $WORKDIR

RUN apt update \
    && apt install -y openssh-server 
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable \
    && apt update -y\
    && apt install -y openssh-server

RUN mkdir -p /src/app 

FROM base AS build
WORKDIR /src
COPY . /src
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --filter="./apps/backend/"  --filter="./libs/**/"
RUN pnpm run build --filter="./apps/backend/" --filter="./libs/**/"
RUN pnpm deploy --filter="./apps/backend/" --prod /prod/backend 

# setup prisma engine binary to connect to db
WORKDIR /prod/backend
RUN pnpm db:generate \ 
    && cp -r ./node_modules/@core/db/node_modules/.prisma ./node_modules/

FROM base AS backend
ENV DISABLE_ERD true
ENV SSH_PASSWD "root:Docker!"
WORKDIR /src/app 
COPY --from=build /prod/backend /src/app 

# setup sshd
RUN echo "$SSH_PASSWD" | chpasswd  \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean -y 

COPY --from=build /src/apps/backend/sshd_config /etc/ssh/
COPY --from=build /src/apps/backend/init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

EXPOSE 8080 2222 80

ENTRYPOINT ["init.sh"]
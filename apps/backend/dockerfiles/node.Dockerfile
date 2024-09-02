FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable \
    && apt update -y\
    && apt install -y openssh-server

WORKDIR /src/build 
COPY . /src/build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --filter="./apps/backend/"  --filter="./libs/**/"

FROM base AS build
WORKDIR /src/build 
RUN pnpm run build --filter="./apps/backend/" --filter="./libs/**/"
RUN pnpm deploy --filter="./apps/backend/" --prod /prod/backend

FROM base AS backend
ENV DISABLE_ERD true
ENV SSH_PASSWD "root:Docker!"
WORKDIR /src/app 
COPY --from=build /prod/backend /src/app 

COPY --from=build /src/build/apps/backend/sshd_config /etc/ssh/
COPY --from=build /src/build/apps/backend/init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

# setup sshd
RUN echo "$SSH_PASSWD" | chpasswd  \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean -y \
    && rm -rf /src/build 

EXPOSE 8080 2222 80

ENTRYPOINT ["init.sh"]
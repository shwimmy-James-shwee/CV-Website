FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable \
    && apt update \
    && apt install -y openssh-server 

RUN mkdir -p /src/app 

FROM base AS build
WORKDIR /src/app
COPY . /src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --filter="./apps/backend/"
RUN npm install -g tsup
RUN pnpm run build --filter="./apps/backend/"
RUN pnpm deploy --filter="./apps/backend/" --prod /prod/backend


FROM base AS backend
WORKDIR /src/app 
COPY --from=build /prod/backend /src/app 
COPY --from=build /src/app/configs/sshd_config /etc/ssh/
COPY --from=build /prod/backend/init.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/init.sh

EXPOSE 8080 2222 80

ENTRYPOINT ["init.sh"]
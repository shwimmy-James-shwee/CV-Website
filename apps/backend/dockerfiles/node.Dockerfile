# Build phase
FROM node:lts-slim AS development

ENV WORKDIR /src/app
ENV DISABLE_ERD true
# ENV NODE_ENV production
# ENV CI false

RUN mkdir -p /src/app 
WORKDIR $WORKDIR
COPY . .

RUN apt update \
  && apt upgrade -y \
  && apt install -y python3 git curl openssh-server 

# Install PNPM globally
RUN npm install -g pnpm

# Use PNPM for installation and building
RUN pnpm install --frozen-lockfile \ 
  && pnpm build

RUN npm install -g pnpm pm2 ts-node typescript dotenv-cli\
  && rm -rf node_modules \
  && pnpm install --frozen-lockfile \ 
  && pnpm build

# Deployment Build
FROM node:lts-slim AS production


ENV WORKDIR /src/app
ENV DISABLE_ERD true
ENV SSH_PASSWD "root:Docker!"

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY . .

RUN apt update \
  && apt upgrade -y \
  && apt install -y python3 git curl openssh-server \
  && echo "$SSH_PASSWD" | chpasswd 

RUN pnpm install --ignore-scripts --production

COPY --from=development /src/app/dist ./dist

# ssh
COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

EXPOSE 8080 2222 80

# CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]

ENTRYPOINT ["init.sh"]
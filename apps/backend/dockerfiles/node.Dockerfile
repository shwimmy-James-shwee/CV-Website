FROM node:lts AS builder

# Set working directory
WORKDIR /app
RUN
RUN npm install pnpm -g
RUN npm install turbo -g
COPY . .
RUN turbo prune --scope=backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:lts AS installer

WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=backend

FROM node:lts AS runner
WORKDIR /app

COPY --from=installer /app .

WORKDIR /app/apps/backend

EXPOSE 8080
CMD ["pnpm", "start"]

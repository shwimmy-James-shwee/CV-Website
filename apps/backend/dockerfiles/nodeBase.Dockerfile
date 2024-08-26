# Specify the base image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /usr/src/app

# Create a temporary stage for the build
FROM base AS build

# Copy the project files to the working directory
COPY . .

# Copy over the package.json from the project folder
COPY package.json /usr/src/app/package.json

# Install pnpm
RUN npx pnpm install --global pnpm

# Install packages at the root level (including shared monorepo packages)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --shamefully-hoist --global

# Run the build commands
RUN pnpm install --filter=backend --prod
RUN pnpm run -r build

# Create the final stage for the backend
FROM base AS backend

# Set the working directory for the backend
WORKDIR /prod/backend

# Expose the necessary port
EXPOSE 8000

# Start the backend service
CMD ["pnpm", "start"]

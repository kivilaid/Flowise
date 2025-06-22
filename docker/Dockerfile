# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 py3-pip make g++ build-base git

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ui/package.json ./packages/ui/
COPY packages/server/package.json ./packages/server/
COPY packages/components/package.json ./packages/components/
COPY packages/api-documentation/package.json ./packages/api-documentation/

# Set build-time environment variables
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV COREPACK_ENABLE_STRICT=0

# Install dependencies with specific pnpm version
RUN npm install -g pnpm@10.11.1
# Use shamefully-hoist to ensure all dependencies are accessible
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Copy source code
COPY . .

# Build packages
RUN pnpm build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache chromium git python3 py3-pip make g++ build-base cairo-dev pango-dev curl

# Install pnpm for production dependency installation
RUN npm install -g pnpm@10.11.1

# Set the environment variable for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Copy workspace configuration files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./

# Copy package.json files for all workspaces
COPY --from=builder /app/packages/server/package.json ./packages/server/
COPY --from=builder /app/packages/ui/package.json ./packages/ui/
COPY --from=builder /app/packages/components/package.json ./packages/components/
COPY --from=builder /app/packages/api-documentation/package.json ./packages/api-documentation/

# Copy built files from builder stage
COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/ui/build ./packages/ui/build
COPY --from=builder /app/packages/components/dist ./packages/components/dist
COPY --from=builder /app/packages/api-documentation/dist ./packages/api-documentation/dist

# Copy scripts and configurations
COPY --from=builder /app/packages/server/bin ./packages/server/bin
COPY --from=builder /app/packages/server/marketplaces ./packages/server/marketplaces

# Set permissions for the run script
RUN chmod +x ./packages/server/bin/run

# Install production dependencies using pnpm
RUN pnpm install --frozen-lockfile

WORKDIR /app/packages/server

# Set default environment variables
ENV PORT=3000
ENV HOST=0.0.0.0
ENV DATABASE_PATH=/app/packages/server/.flowise
ENV APIKEY_PATH=/app/packages/server/.flowise
ENV SECRETKEY_PATH=/app/packages/server/.flowise
ENV LOG_PATH=/app/packages/server/logs
ENV EXECUTION_PATH=/app/packages/server/dist

# Expose port
EXPOSE 3000

# Start the server using the correct command
ENTRYPOINT ["./bin/run", "start"]
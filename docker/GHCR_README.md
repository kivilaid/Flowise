# GitHub Container Registry (ghcr.io) Docker Images

This repository automatically builds and publishes Docker images to GitHub Container Registry on every push to the main branch.

## Available Images

- **Main Application**: `ghcr.io/kivilaid/flowise:latest`

## Pulling Images

The images are publicly available and can be pulled without authentication:

```bash
# Pull the latest main application
docker pull ghcr.io/kivilaid/flowise:latest

# Pull the latest worker
docker pull ghcr.io/kivilaid/flowise-worker:latest

# Pull a specific commit
docker pull ghcr.io/kivilaid/flowise:main-<commit-sha>
```

## Running the Images

### Using Docker Run

```bash
# Run the main application
docker run -d \
  --name flowise \
  -p 3000:3000 \
  -v ~/.flowise:/app/packages/server/.flowise \
  ghcr.io/kivilaid/flowise:latest

# Run with environment variables
docker run -d \
  --name flowise \
  -p 3000:3000 \
  -e FLOWISE_USERNAME=admin \
  -e FLOWISE_PASSWORD=admin \
  -e DATABASE_TYPE=sqlite \
  -v ~/.flowise:/app/packages/server/.flowise \
  ghcr.io/kivilaid/flowise:latest
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  flowise:
    image: ghcr.io/kivilaid/flowise:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ~/.flowise:/app/packages/server/.flowise
    environment:
      - FLOWISE_USERNAME=${FLOWISE_USERNAME:-admin}
      - FLOWISE_PASSWORD=${FLOWISE_PASSWORD:-admin}
      - DATABASE_TYPE=${DATABASE_TYPE:-sqlite}
      - DATABASE_PATH=/app/packages/server/.flowise
      - SECRETKEY_PATH=/app/packages/server/.flowise
      - LOG_PATH=/app/packages/server/logs
```

Then run:

```bash
docker-compose up -d
```

## Available Tags

- `latest` - The latest build from the main branch
- `main-<sha>` - Specific commit builds
- `pr-<number>` - Pull request builds (not pushed to registry)

## Architecture Support

Images are built for both:
- `linux/amd64` (Intel/AMD)
- `linux/arm64` (Apple Silicon, ARM)

Docker will automatically pull the correct architecture for your system.

## Deployment Examples

### Deploy to Cloud Providers

Since these are public images, you can directly use them in your cloud deployments:

**AWS ECS Task Definition:**
```json
{
  "image": "ghcr.io/kivilaid/flowise:latest"
}
```

**Kubernetes Deployment:**
```yaml
spec:
  containers:
  - name: flowise
    image: ghcr.io/kivilaid/flowise:latest
```

**Google Cloud Run:**
```bash
gcloud run deploy flowise \
  --image ghcr.io/kivilaid/flowise:latest \
  --port 3000
```

## Environment Variables

See the main [docker/.env.example](./env.example) file for all available environment variables.

## Volumes

Important directories to mount:
- `/app/packages/server/.flowise` - Database and configuration files
- `/app/packages/server/logs` - Log files

## Health Check

The image includes a health check endpoint at `/api/v1/health`
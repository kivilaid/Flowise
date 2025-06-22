# Docker Deployment Guide

## Quick Start with Pre-built Image (Recommended for Coolify)

The `docker-compose.yaml` file uses pre-built images from GitHub Container Registry for fast deployment:

```bash
docker-compose up -d
```

## Building from Source (Local Development)

Use `docker-compose.build.yaml` to build from source:

```bash
docker-compose -f docker-compose.build.yaml up -d --build
```

## GitHub Actions Workflow

The repository includes a GitHub Actions workflow that automatically:
1. Builds Docker images on push to `feature/coolify-docker-compose` or `main`
2. Pushes images to GitHub Container Registry (ghcr.io)
3. Tags images with branch name and commit SHA

### Image Tags

- `ghcr.io/kivilaid/flowise:feature-coolify-docker-compose` - Latest from feature branch
- `ghcr.io/kivilaid/flowise:main` - Latest from main branch
- `ghcr.io/kivilaid/flowise:latest` - Latest stable release

## Coolify Deployment

1. In Coolify, select "Docker Compose" deployment
2. Set repository: `https://github.com/kivilaid/Flowise`
3. Set branch: `feature/coolify-docker-compose`
4. Set compose file: `/docker-compose.yaml`
5. Configure environment variables as needed
6. Deploy!

The deployment will pull the pre-built image instead of building from source, making it much faster.

## Environment Variables

See `.env.docker.example` for all available configuration options.

Default credentials:
- Username: `flowise`
- Password: `flowise`

**Important**: Change these in production!

## Manual Image Building

To build and push manually:

```bash
# Build the image
docker build -f docker/Dockerfile -t ghcr.io/kivilaid/flowise:local .

# Push to registry (requires authentication)
docker push ghcr.io/kivilaid/flowise:local
```
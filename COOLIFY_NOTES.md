# Coolify Deployment Notes

## Build Issue Fixed

The build was failing with the error:
```
Error: [vite:load-fallback] Could not load /app/node_modules/@uiw/react-codemirror
```

This has been fixed by adding `--shamefully-hoist` flag to the pnpm install command in the Dockerfile. This ensures all dependencies are properly hoisted and accessible during the build process.

## Docker Compose Configuration

The `docker-compose.yaml` file in the root directory is configured for Coolify deployment with:

1. **PostgreSQL 16** database service
2. **Build from source** - builds directly from your repository
3. **Persistent volumes** for both PostgreSQL data and Flowise data
4. **Health checks** for both services
5. **Proper service dependencies** - Flowise waits for PostgreSQL to be healthy

## Environment Variables for Coolify

Required environment variables to set in Coolify:

```env
# Database credentials (CHANGE THESE!)
DATABASE_NAME=flowise_production
DATABASE_USER=flowise_user
DATABASE_PASSWORD=your_secure_password_here

# Optional authentication
FLOWISE_USERNAME=admin
FLOWISE_PASSWORD=your_admin_password
```

## Deployment Steps in Coolify

1. Create new Docker Compose resource
2. Set repository URL to your fork
3. Set branch to `feature/coolify-docker-compose`
4. Set Docker Compose location to `/docker-compose.yaml`
5. Configure the environment variables above
6. Deploy

## Important Security Notes

- Always change the default PostgreSQL password
- Enable Flowise authentication for production
- Use Coolify's automatic SSL certificates
- Consider restricting CORS origins for production

## Troubleshooting

If the build fails again:
1. Check if all dependencies are listed in package.json files
2. Ensure NODE_OPTIONS=--max-old-space-size=8192 is set
3. Verify PostgreSQL connection details
4. Check Coolify build logs for specific errors
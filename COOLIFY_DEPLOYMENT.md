# Deploying Flowise on Coolify

This guide explains how to deploy Flowise on Coolify using the provided Docker Compose configuration with PostgreSQL.

## Prerequisites

- A Coolify instance up and running
- Access to create new resources in Coolify
- Your repository URL (this repository)

## Deployment Steps

### 1. Create New Resource in Coolify

1. Log into your Coolify dashboard
2. Click "New Resource" → "Docker Compose"
3. Select your server and destination

### 2. Configure Source

1. Choose "Public Repository" or "Private Repository" (depending on your setup)
2. Enter your repository URL
3. Set branch to `feature/coolify-docker-compose` (or your branch name)
4. Set "Docker Compose Location" to `/docker-compose.yaml`

### 3. Configure Environment Variables

In Coolify's environment variables section, add these required variables:

```env
# Database Configuration (REQUIRED - Change these!)
DATABASE_NAME=flowise_production
DATABASE_USER=flowise_user
DATABASE_PASSWORD=your_very_secure_password_here

# Optional Authentication
FLOWISE_USERNAME=admin
FLOWISE_PASSWORD=your_admin_password_here

# Optional: Change port if needed
PORT=3000
```

### 4. Advanced Configuration (Optional)

#### Storage Configuration
If using S3 for file storage:
```env
STORAGE_TYPE=s3
S3_STORAGE_BUCKET_NAME=your-bucket
S3_STORAGE_ACCESS_KEY_ID=your-access-key
S3_STORAGE_SECRET_ACCESS_KEY=your-secret-key
S3_STORAGE_REGION=us-east-1
```

#### Queue Mode with Redis
To enable distributed queue mode:
```env
MODE=queue
QUEUE_NAME=flowise-queue
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
```

### 5. Deploy

1. Click "Save" to save your configuration
2. Click "Deploy" to start the deployment
3. Coolify will:
   - Clone your repository
   - Build the Docker image from source
   - Start PostgreSQL database
   - Start Flowise application

### 6. Access Your Application

Once deployed:
- Your application will be available at the domain configured in Coolify
- Default path: `https://your-domain.com`
- API endpoint: `https://your-domain.com/api/v1`

## Important Notes

### Database Persistence
- PostgreSQL data is stored in a Docker volume `postgres_data`
- This ensures your data persists across container restarts
- Regular backups are recommended for production use

### Building from Source
- This configuration builds Flowise from your repository source code
- Build time may take 5-10 minutes on first deployment
- Subsequent deployments use Docker layer caching for faster builds

### Security Recommendations

1. **Change Default Passwords**: Always change the default database password
2. **Enable Authentication**: Set `FLOWISE_USERNAME` and `FLOWISE_PASSWORD`
3. **Use HTTPS**: Coolify should automatically provision SSL certificates
4. **Restrict CORS**: In production, set specific origins instead of `*`:
   ```env
   CORS_ORIGINS=https://your-domain.com
   IFRAME_ORIGINS=https://your-domain.com
   ```

### Monitoring

- Health check endpoint: `/api/v1/ping`
- Logs available in Coolify dashboard
- PostgreSQL includes health checks for reliability

## Troubleshooting

### Build Failures
If the build fails:
1. Check Coolify build logs
2. Ensure sufficient memory (at least 4GB recommended)
3. Try increasing Docker memory limits in Coolify

### Database Connection Issues
If Flowise can't connect to PostgreSQL:
1. Verify environment variables are set correctly
2. Check PostgreSQL container is healthy
3. Review Flowise logs for connection errors

### Performance Tuning
For better performance:
1. Increase `WORKER_CONCURRENCY` for queue mode
2. Configure Redis for distributed deployments
3. Use S3/GCS for file storage in production

## Support

For issues specific to:
- Flowise: Check the main repository issues
- Coolify deployment: Check Coolify documentation
- This configuration: Create an issue in the repository
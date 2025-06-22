# Docker Compose Setup for Flowise

This Docker Compose configuration allows you to run Flowise using Docker with a single command.

> **Note**: This configuration is optimized for Coolify deployment with PostgreSQL. For local development with SQLite, see the previous version.

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/FlowiseAI/Flowise.git
   cd Flowise
   ```

2. (Optional) Create a `.env` file from the example:
   ```bash
   cp .env.docker.example .env
   ```

3. Build and run Flowise:
   ```bash
   docker-compose up -d
   ```

4. Access Flowise at http://localhost:3000

## Configuration

### Environment Variables

The Docker Compose setup uses environment variables for configuration. Key variables include:

- `PORT`: The port Flowise runs on (default: 3000)
- `DATABASE_TYPE`: Database type - sqlite (default), postgres, mysql
- `FLOWISE_USERNAME` & `FLOWISE_PASSWORD`: Optional authentication
- `STORAGE_TYPE`: File storage type - local (default), s3, gcs

See `.env.docker.example` for a complete list of available environment variables.

### Volumes

The setup creates a named volume `flowise_data` to persist:
- SQLite database (if using SQLite)
- API keys and secrets
- Uploaded files
- Logs

### Using PostgreSQL

To use PostgreSQL instead of SQLite:

1. Add PostgreSQL service to docker-compose.yaml:
   ```yaml
   postgres:
     image: postgres:15-alpine
     restart: unless-stopped
     environment:
       POSTGRES_DB: flowise
       POSTGRES_USER: flowise
       POSTGRES_PASSWORD: flowise_password
     volumes:
       - postgres_data:/var/lib/postgresql/data
     networks:
       - flowise_network
   ```

2. Update your `.env` file:
   ```
   DATABASE_TYPE=postgres
   DATABASE_HOST=postgres
   DATABASE_PORT=5432
   DATABASE_NAME=flowise
   DATABASE_USER=flowise
   DATABASE_PASSWORD=flowise_password
   ```

### Development Mode

For development with hot-reloading:

1. Mount your source code:
   ```yaml
   volumes:
     - ./packages:/app/packages
     - flowise_data:/opt/flowise/.flowise
   ```

2. Change the command to use development mode:
   ```yaml
   command: ["pnpm", "dev"]
   ```

## Common Commands

```bash
# Start Flowise
docker-compose up -d

# View logs
docker-compose logs -f flowise

# Stop Flowise
docker-compose down

# Rebuild after code changes
docker-compose build --no-cache

# Clean up everything (including volumes)
docker-compose down -v
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change it in your `.env` file:
```
PORT=3001
```

### Permission Issues
If you encounter permission issues with volumes on Linux:
```bash
sudo chown -R $(id -u):$(id -g) ~/.flowise
```

### Memory Issues
If you encounter out-of-memory errors during build, increase Docker's memory limit or use:
```bash
docker-compose build --no-cache --memory 4g
```
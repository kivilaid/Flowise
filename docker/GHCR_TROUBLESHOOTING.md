# GitHub Container Registry Troubleshooting

## Error: "denied" when pulling images

If you get an error like `denied` when trying to pull images from ghcr.io, follow these steps:

### 1. Check if the workflow has run successfully

1. Go to https://github.com/kivilaid/Flowise/actions
2. Look for "Build and Push to GitHub Container Registry" workflow
3. If it shows as failed:
   - Click on the failed workflow
   - Check the error logs
   - Common issues:
     - Node.js version mismatch
     - Missing dependencies
     - Build timeout

### 2. Manually trigger the workflow

1. Go to https://github.com/kivilaid/Flowise/actions
2. Click on "Build and Push Docker Image (Simple)"
3. Click "Run workflow"
4. Select the main branch and click "Run workflow"

### 3. Make the package public

After the first successful build:

1. Go to https://github.com/kivilaid?tab=packages
2. Find the `flowise` package
3. Click on the package name
4. Click on "Package settings" (gear icon)
5. Scroll down to "Danger Zone"
6. Click "Change visibility"
7. Select "Public" and confirm

### 4. Alternative: Build and push manually

```bash
# Clone the repository
git clone https://github.com/kivilaid/Flowise.git
cd Flowise

# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u kivilaid --password-stdin

# Build and push
./docker/build-and-push.sh ghcr kivilaid
```

### 5. Alternative: Use Docker Hub

1. Create a Docker Hub account at https://hub.docker.com
2. Create a repository named `flowise-insly`
3. Add secrets to your GitHub repository:
   - Go to Settings > Secrets and variables > Actions
   - Add `DOCKERHUB_USERNAME` with your Docker Hub username
   - Add `DOCKERHUB_TOKEN` with your Docker Hub access token
4. The Docker Hub workflow will run automatically on push

### 6. Quick workaround for Coolify

While fixing the issue, you can use:

```yaml
# In your Coolify configuration, temporarily use:
image: flowiseai/flowise:latest

# Or build your own and push to Docker Hub:
image: yourdockerhubusername/flowise-insly:latest
```

## Verifying the image is available

```bash
# Check if image exists (public images)
docker pull ghcr.io/kivilaid/flowise:latest

# Or use curl to check
curl -s https://ghcr.io/v2/kivilaid/flowise/tags/list
```

## Common Issues and Solutions

### Issue: Workflow fails with "permission denied"
**Solution**: Make sure the workflow has `packages: write` permission (already set in our workflow)

### Issue: Build timeout
**Solution**: Use the simple workflow that builds only for linux/amd64 first

### Issue: Package exists but still getting denied
**Solution**: The package visibility might be set to private. Follow step 3 above.

### Issue: Need multi-architecture support
**Solution**: Once the simple build works, you can re-enable multi-platform builds in the workflow
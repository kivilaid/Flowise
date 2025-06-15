#!/bin/bash

# Build and push Docker images to GitHub Container Registry
# Usage: ./build-and-push.sh [username]

USERNAME=${1:-kivilaid}
IMAGE_NAME="flowise"
TAG="latest"

echo "Building Flowise Docker image..."

# Build the image using docker/Dockerfile (multi-stage, more efficient)
docker build -t ${IMAGE_NAME}:${TAG} -f docker/Dockerfile .

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Build successful!"

# Tag for GitHub Container Registry
echo "Tagging for GitHub Container Registry..."
FULL_IMAGE="ghcr.io/${USERNAME}/${IMAGE_NAME}:${TAG}"
docker tag ${IMAGE_NAME}:${TAG} ${FULL_IMAGE}

echo "Pushing to ghcr.io..."
echo "Make sure you're logged in with: docker login ghcr.io -u ${USERNAME}"
docker push ${FULL_IMAGE}

if [ $? -eq 0 ]; then
    echo "Done! Image available at: ${FULL_IMAGE}"
    echo ""
    echo "To use in Coolify or Docker:"
    echo "docker pull ${FULL_IMAGE}"
else
    echo "Push failed! Make sure you're logged in to ghcr.io"
    echo "Run: echo \$GITHUB_TOKEN | docker login ghcr.io -u ${USERNAME} --password-stdin"
fi
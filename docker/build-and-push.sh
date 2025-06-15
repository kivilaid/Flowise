#!/bin/bash

# Build and push Docker images to GitHub Container Registry
# Usage: ./build-and-push.sh [ghcr|dockerhub] [username]

REGISTRY=${1:-ghcr}
USERNAME=${2:-kivilaid}
IMAGE_NAME="flowise-insly"
TAG="latest"

echo "Building Flowise Docker image..."

# Build the image
docker build -t ${IMAGE_NAME}:${TAG} -f docker/Dockerfile .

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Build successful!"

# Tag and push based on registry
if [ "$REGISTRY" = "ghcr" ]; then
    echo "Tagging for GitHub Container Registry..."
    FULL_IMAGE="ghcr.io/${USERNAME}/${IMAGE_NAME}:${TAG}"
    docker tag ${IMAGE_NAME}:${TAG} ${FULL_IMAGE}
    
    echo "Pushing to ghcr.io..."
    echo "Make sure you're logged in with: docker login ghcr.io -u ${USERNAME}"
    docker push ${FULL_IMAGE}
elif [ "$REGISTRY" = "dockerhub" ]; then
    echo "Tagging for Docker Hub..."
    FULL_IMAGE="${USERNAME}/${IMAGE_NAME}:${TAG}"
    docker tag ${IMAGE_NAME}:${TAG} ${FULL_IMAGE}
    
    echo "Pushing to Docker Hub..."
    echo "Make sure you're logged in with: docker login"
    docker push ${FULL_IMAGE}
else
    echo "Unknown registry: $REGISTRY"
    echo "Usage: $0 [ghcr|dockerhub] [username]"
    exit 1
fi

echo "Done! Image available at: ${FULL_IMAGE}"
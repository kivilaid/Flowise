#!/bin/bash

# Test script for Docker builds
# This script tests all Dockerfile configurations to ensure they build correctly

set -e

echo "Testing Docker builds for Flowise..."
echo "=================================="

# Function to test a Docker build
test_build() {
    local dockerfile=$1
    local tag=$2
    local description=$3
    
    echo ""
    echo "Testing: $description"
    echo "Dockerfile: $dockerfile"
    echo "Tag: $tag"
    echo "---"
    
    if docker build --no-cache -t "$tag" -f "$dockerfile" . ; then
        echo "✓ Build successful for $description"
    else
        echo "✗ Build failed for $description"
        exit 1
    fi
}

# Test root Dockerfile
test_build "Dockerfile" "flowise:root-test" "Root Dockerfile"

# Test production Dockerfile
test_build "docker/Dockerfile" "flowise:prod-test" "Production Multi-stage Dockerfile"

# Test worker Dockerfile
test_build "docker/worker/Dockerfile" "flowise:worker-test" "Worker Dockerfile"

# Test Railway Dockerfile
test_build "docker/Dockerfile.railway" "flowise:railway-test" "Railway Platform Dockerfile"

echo ""
echo "=================================="
echo "All Docker builds completed successfully!"
echo ""
echo "Built images:"
docker images | grep flowise | grep test
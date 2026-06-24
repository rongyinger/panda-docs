#!/bin/bash

set -e

IMAGE_NAME="${1:-panda-website}"
IMAGE_TAG="${2:-3_5}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"
REMOTE_IMAGE="crpi-w3yvyj7ja1370zu4.cn-chengdu.personal.cr.aliyuncs.com/zjskcc/pandsite:${IMAGE_TAG}"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  Build Panda Docs Image${NC}"
echo -e "${BLUE}================================${NC}"
echo ""
echo -e "${GREEN}[INFO]${NC} Image: ${FULL_IMAGE_NAME}"
echo -e "${GREEN}[INFO]${NC} Time: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

if ! command -v docker >/dev/null 2>&1; then
    echo "[ERROR] Docker is not installed"
    exit 1
fi

echo -e "${GREEN}[INFO]${NC} Building image..."
docker build -t "${FULL_IMAGE_NAME}" .

echo -e "${GREEN}[INFO]${NC} Tagging and pushing image..."
docker tag "${FULL_IMAGE_NAME}" "${REMOTE_IMAGE}"
docker push "${REMOTE_IMAGE}"

echo ""
echo -e "${GREEN}[SUCCESS]${NC} Image build and push completed"
echo -e "${GREEN}[INFO]${NC} Local image: ${FULL_IMAGE_NAME}"
echo -e "${GREEN}[INFO]${NC} Remote image: ${REMOTE_IMAGE}"
echo ""
echo -e "${GREEN}[INFO]${NC} Run example:"
echo "  docker run -d -p 80:80 --name pandasite ${REMOTE_IMAGE}"

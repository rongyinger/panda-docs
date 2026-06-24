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
echo -e "${BLUE}  构建熊猫知识中心文档镜像${NC}"
echo -e "${BLUE}================================${NC}"
echo ""
echo -e "${GREEN}[INFO]${NC} 镜像名称: ${FULL_IMAGE_NAME}"
echo -e "${GREEN}[INFO]${NC} 构建时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

if ! command -v docker >/dev/null 2>&1; then
    echo "[ERROR] Docker 未安装，请先安装 Docker"
    exit 1
fi

echo -e "${GREEN}[INFO]${NC} 开始构建镜像（内部会自动执行 docs 构建）..."
docker build -t "${FULL_IMAGE_NAME}" .

echo -e "${GREEN}[INFO]${NC} 打标签并推送远端镜像..."
docker tag "${FULL_IMAGE_NAME}" "${REMOTE_IMAGE}"
docker push "${REMOTE_IMAGE}"

echo ""
echo -e "${GREEN}[SUCCESS]${NC} 镜像构建并推送完成"
echo -e "${GREEN}[INFO]${NC} 本地镜像: ${FULL_IMAGE_NAME}"
echo -e "${GREEN}[INFO]${NC} 远端镜像: ${REMOTE_IMAGE}"
echo ""
echo -e "${GREEN}[INFO]${NC} 运行示例:"
echo "  docker run -d -p 80:80 --name pandasite ${REMOTE_IMAGE}"

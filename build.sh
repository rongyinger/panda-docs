#!/bin/bash

# 构建脚本 - 基于nginx的静态网站镜像
# 使用方法: ./build.sh [镜像名称] [标签]

set -e

# 配置变量
IMAGE_NAME="${1:-panda-website}"
IMAGE_TAG="${2:-3_5}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  构建熊猫算力平台Docker镜像${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# 显示构建信息
echo -e "${GREEN}[INFO]${NC} 镜像名称: ${FULL_IMAGE_NAME}"
echo -e "${GREEN}[INFO]${NC} 构建时间: $(date '+\%Y-\%m-\%d \%H:\%M:\%S')"
echo ""

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo -e "[ERROR] Docker未安装，请先安装Docker"
    exit 1
fi

# 构建镜像
echo -e "${GREEN}[INFO]${NC} 开始构建镜像..."
docker build -t "${FULL_IMAGE_NAME}" .
docker tag "${FULL_IMAGE_NAME}" "crpi-w3yvyj7ja1370zu4.cn-chengdu.personal.cr.aliyuncs.com/zjskcc/pandsite:${IMAGE_TAG}"
docker push "crpi-w3yvyj7ja1370zu4.cn-chengdu.personal.cr.aliyuncs.com/zjskcc/pandsite:${IMAGE_TAG}"

# 检查构建结果
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}[SUCCESS]${NC} 镜像构建成功！"
    echo ""
    echo -e "${GREEN}[INFO]${NC} 镜像信息:"
    docker images "${IMAGE_NAME}" | grep "${IMAGE_TAG}"
    echo ""
    echo -e "${GREEN}[INFO]${NC} 运行容器命令:"
    echo "  docker run -d -p 80:80 --name qijutong-web crpi-w3yvyj7ja1370zu4.cn-chengdu.personal.cr.aliyuncs.com/zjskcc/pandsite:${IMAGE_TAG}"
    echo ""
    echo -e "${GREEN}[INFO]${NC} 访问地址: http://localhost"
else
    echo -e "[ERROR] 镜像构建失败！"
    exit 1
fi

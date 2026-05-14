# 基于nginx官方镜像
FROM registry.cn-chengdu.aliyuncs.com/seanly/appset:nginx

# 维护者信息
LABEL maintainer="your-email@example.com"
LABEL description="熊猫算力平台网站"

# 删除nginx默认配置
RUN rm -rf /usr/share/nginx/html/*

# 复制静态文件到nginx目录
COPY . /usr/share/nginx/html/

# 复制自定义nginx配置（可选）
COPY default.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]

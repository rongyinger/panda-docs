FROM node:20-alpine AS docs-builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY docs ./docs
COPY scripts ./scripts

ENV DOCS_BASE=/docs/
RUN npm run build


FROM registry.cn-chengdu.aliyuncs.com/seanly/appset:nginx AS pandasite

LABEL maintainer="your-email@example.com"
LABEL description="熊猫知识中心文档站"

RUN rm -rf /usr/share/nginx/html/*

# 保留现有根路径静态页，避免兼容迁移阶段影响旧入口
COPY index.html guide.html help_index.html chatbox.html cherry-studio.html cursor.html dify.html nextchat.html openclaw.html video.html /usr/share/nginx/html/
COPY static /usr/share/nginx/html/static

# 文档站只发布 VitePress 正式构建产物
COPY --from=docs-builder /app/docs/.vitepress/dist /usr/share/nginx/html/docs

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

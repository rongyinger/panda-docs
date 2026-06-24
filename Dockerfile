FROM registry.cn-chengdu.aliyuncs.com/seanly/appset:nginx AS pandasite

LABEL maintainer="ops@pandatoken.net"
LABEL description="Panda docs static site"

RUN rm -rf /usr/share/nginx/html/*

# Jenkins compatible: image build only packages prebuilt static files.
COPY . /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

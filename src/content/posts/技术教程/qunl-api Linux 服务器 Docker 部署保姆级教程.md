---
title: qunl-api Linux 服务器 Docker 部署保姆级教程
published: 2026-06-02
description: 从零在阿里云 CentOS/Linux 服务器上使用 Docker 部署 qunl-api、PostgreSQL、Redis 与 Nginx 反向代理。
image: ''
tags:
  - Linux
  - Docker
  - qunl-api
  - PostgreSQL
  - Redis
  - Nginx
category: 技术教程
draft: false
---

这篇文章记录一次在全新的阿里云 Linux/CentOS 服务器上，从零部署 `qunl-api` 的完整流程。整体方案使用 Docker 管理基础中间件，包括 PostgreSQL 15、Redis 7 和 Nginx 反向代理，`qunl-api` 主程序则通过二进制文件在宿主机后台运行。

> 说明：本文保留原部署笔记中的密码，方便一键复制复现。正式生产环境建议在部署前改成自己的强密码，并同步更新 `.env` 配置。

## 部署目标

完成后服务器上会运行以下服务：

- PostgreSQL 15：保存 `qunl-api` 主数据库与日志数据库。
- Redis 7：提供缓存或队列能力。
- Nginx：监听服务器 `80` 端口，并反向代理到本机 `6000` 端口。
- qunl-api：监听 `6000` 端口，通过 `.env` 读取数据库与 Redis 配置。

适用环境：

- 阿里云 Linux/CentOS 服务器。
- 已拥有服务器 root 权限或 sudo 权限。
- 已准备好 `qunl-api` 二进制文件。

## 一、安装 Docker 环境

先在阿里云服务器终端依次执行下面的命令，安装 Docker 引擎和基础工具。

```bash
# 1. 更新系统软件包（可选，建议新服务器执行）
yum update -y

# 2. 安装 Docker 所需的基础系统工具
yum install -y yum-utils device-mapper-persistent-data lvm2

# 3. 设置阿里云官方的 Docker Yum 源（国内服务器加速）
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 4. 安装 Docker 社区版
yum install -y docker-ce docker-ce-cli containerd.io

# 5. 启动 Docker 服务并设置开机自启
systemctl start docker
systemctl enable docker

# 6. 验证 Docker 是否安装成功
docker version
```

如果最后能看到 Docker 客户端和服务端版本信息，说明 Docker 已经安装成功。

## 二、清理旧环境并启动基础中间件

下面这段脚本会做三件事：

- 停止并删除旧的 `pg15`、`redis7`、`nginx-proxy` 容器。
- 删除旧的数据挂载目录。
- 重新启动 PostgreSQL、Redis 和 Nginx。

如果你是全新服务器，也可以直接执行。若服务器里已有重要数据库数据，请不要直接运行这段清理脚本。

```bash
# ==========================================
# 1. 环境彻底清理
# ==========================================
docker stop pg15 redis7 nginx-proxy && docker rm pg15 redis7 nginx-proxy
rm -rf /data/postgres /data/redis /data/nginx/conf.d

# ==========================================
# 2. 启动全新 PostgreSQL 15（密码：BbAxy_110goodpg）
# ==========================================
docker run --name pg15 \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=BbAxy_110goodpg \
  -v /data/postgres:/var/lib/postgresql/data \
  -p 5432:5432 \
  -d postgres:15

# ==========================================
# 3. 启动全新 Redis 7（密码：BbAxy_110goodredis）
# ==========================================
docker run --name redis7 \
  -p 6379:6379 \
  -v /data/redis:/data \
  -d redis:7.2 \
  redis-server --appendonly yes --requirepass BbAxy_110goodredis

# ==========================================
# 4. 配置并启动 Nginx 反向代理（映射 80 端口）
# ==========================================
mkdir -p /data/nginx/conf.d

cat << 'EOF' > /data/nginx/conf.d/qunl_api.conf
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://host.docker.internal:6000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 支持 WebSocket 流式传输
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

docker run --name nginx-proxy \
  -p 80:80 \
  -v /data/nginx/conf.d:/etc/nginx/conf.d:ro \
  --add-host=host.docker.internal:host-gateway \
  -d nginx:latest
```

启动完成后，可以用下面的命令确认容器是否正常运行：

```bash
docker ps
```

正常情况下，列表中应该能看到 `pg15`、`redis7` 和 `nginx-proxy` 三个容器。

## 三、初始化数据库

等待中间件容器启动约 5 秒后，执行下面两条命令，分别创建主数据库和日志数据库。

```bash
docker exec -it pg15 psql -U root -c "CREATE DATABASE \"qunl_api\";"
docker exec -it pg15 psql -U root -c "CREATE DATABASE \"qunl_api-logs\";"
```

这里会创建两个数据库：

- `qunl_api`：主业务数据库。
- `qunl_api-logs`：日志数据库。

如果重复执行并提示数据库已存在，说明之前已经创建过，可以继续后续步骤。

## 四、配置 qunl-api 主程序

进入 `qunl-api` 二进制文件所在目录后，执行下面的命令，重写本地 `.env` 配置文件。

```bash
cat << 'EOF' > .env
# 端口号
PORT=3000
# 前端基础URL（留空则使用本机嵌入的 WEB 页面；设为其他域名则访问本机时会被重定向到该地址，易导致白屏）
# FRONTEND_BASE_URL=
FRONTEND_BASE_URL=
REGISTER_DEFAULT_GROUP=default
# 调试相关配置
# 启用pprof
# ENABLE_PPROF=true
# 启用调试模式
DEBUG=true

# 数据库相关配置
SQL_DSN=postgres://root:BbAxy_110goodpg@127.0.0.1:5432/qunl_api?sslmode=disable
LOG_SQL_DSN=postgres://root:BbAxy_110goodpg@127.0.0.1:5432/qunl_api-logs?sslmode=disable
REDIS_CONN_STRING=redis://:BbAxy_110goodredis@127.0.0.1:6379/0
LOG_REQUEST_RESPONSE_ENABLED=true



# PostgreSQL 格式：postgresql://user:password@host:port/dbname（密码含 @ 等需 URL 编码，如 @ → %40）
# MySQL 格式：user:password@tcp(host:port)/dbname?parseTime=true
#SQL_DSN=postgresql://root:new_API%402025@data.qunl.com:14421/new-api
# 日志数据库
#LOG_SQL_DSN=postgresql://root:new_API%402025@data.qunl.com:14421/new-api-logs
# SQLite数据库路径
# SQLITE_PATH=/path/to/sqlite.db
# 数据库最大空闲连接数
# SQL_MAX_IDLE_CONNS=100
# 数据库最大打开连接数
# SQL_MAX_OPEN_CONNS=1000
# 数据库连接最大生命周期（秒）
# SQL_MAX_LIFETIME=60


# 缓存相关配置
# Redis连接字符串
# REDIS_CONN_STRING=redis://user:password@localhost:6379/0
# 同步频率（单位：秒）
# SYNC_FREQUENCY=60
# 内存缓存启用
# MEMORY_CACHE_ENABLED=true
# 渠道更新频率（单位：秒）
# CHANNEL_UPDATE_FREQUENCY=30
# 批量更新启用
# BATCH_UPDATE_ENABLED=true
# 批量更新间隔（单位：秒）
# BATCH_UPDATE_INTERVAL=5

# 任务和功能配置
# 更新任务启用
# UPDATE_TASK=true

# 对话超时设置
# 所有请求超时时间，单位秒，默认为0，表示不限制
# RELAY_TIMEOUT=0
# 流模式无响应超时时间，单位秒，如果出现空补全可以尝试改为更大值
# STREAMING_TIMEOUT=300

# Gemini 识别图片 最大图片数量
# GEMINI_VISION_MAX_IMAGE_NUM=16

# 会话密钥
# SESSION_SECRET=random_string

# 其他配置
# 生成默认token
# GENERATE_DEFAULT_TOKEN=false
# Cohere 安全设置
# COHERE_SAFETY_SETTING=NONE
# 是否统计图片token
# GET_MEDIA_TOKEN=true
# 是否在非流（stream=false）情况下统计图片token
# GET_MEDIA_TOKEN_NOT_STREAM=false
# 设置 Dify 渠道是否输出工作流和节点信息到客户端
# DIFY_DEBUG=true

# LinuxDo相关配置
LINUX_DO_TOKEN_ENDPOINT=https://connect.linux.do/oauth2/token
LINUX_DO_USER_ENDPOINT=https://connect.linux.do/api/user

# 节点类型
# 如果是主节点则为master
# NODE_TYPE=master

EOF
```

因为这里使用的是下划线密码，所以连接字符串里不需要额外加双引号，也不需要做 URL 转义。

## 五、后台启动 qunl-api

为了避免当前终端中残留的全局环境变量影响程序读取 `.env`，先清理可能存在的变量，再用 `nohup` 后台启动主程序。

```bash
# 清理全局缓存
unset SQL_DSN && unset LOG_SQL_DSN && unset REDIS_CONN_STRING

# 后台挂起程序，监听 6000 端口
nohup ./qunl-api --port 6000 > output.log 2>&1 &
```

启动后查看日志：

```bash
tail -f output.log
```

如果看到类似下面的日志，就说明 `qunl-api` 已经启动成功：

```bash
HTTP server started on port :6000
```

此时访问服务器公网 IP，Nginx 会把 `80` 端口请求转发到本机 `6000` 端口的 `qunl-api` 服务。

## 常见问题

### 1. `docker stop` 提示容器不存在怎么办？

如果是新服务器，旧容器本来就不存在，这是正常情况。可以继续执行后面的启动命令。

如果想让清理脚本在容器不存在时也不影响继续执行，可以改成：

```bash
docker stop pg15 redis7 nginx-proxy 2>/dev/null || true
docker rm pg15 redis7 nginx-proxy 2>/dev/null || true
```

### 2. PostgreSQL 或 Redis 连接不上怎么办？

优先检查容器是否运行：

```bash
docker ps
```

再检查端口是否已经监听：

```bash
docker logs pg15
docker logs redis7
```

如果日志里出现权限、端口占用或密码错误，就根据日志提示处理。

### 3. Nginx 能打开，但 qunl-api 无响应怎么办？

先确认 `qunl-api` 是否真的在监听 `6000` 端口：

```bash
tail -f output.log
```

再确认 Nginx 容器是否启动成功：

```bash
docker logs nginx-proxy
```

本文的 Nginx 配置通过 `host.docker.internal` 访问宿主机，并在启动容器时加了：

```bash
--add-host=host.docker.internal:host-gateway
```

如果 Docker 版本较旧，不支持 `host-gateway`，需要升级 Docker，或者改用宿主机网关 IP。

### 4. 修改 `.env` 后没有生效怎么办？

`.env` 修改后需要重启 `qunl-api` 进程。可以先找到旧进程，再重新执行 `nohup` 启动命令。

```bash
ps -ef | grep qunl-api
```

确认进程号后结束旧进程：

```bash
kill <进程号>
```

然后重新启动：

```bash
nohup ./qunl-api --port 6000 > output.log 2>&1 &
```

## 完成

到这里，`qunl-api` 的基础部署就完成了。整体链路是：

```bash
用户请求 -> Nginx:80 -> qunl-api:6000 -> PostgreSQL / Redis
```

后续如果要绑定域名和 HTTPS，可以继续在 Nginx 层配置域名证书，把 `server_name localhost;` 改成自己的域名，并增加 SSL 配置。

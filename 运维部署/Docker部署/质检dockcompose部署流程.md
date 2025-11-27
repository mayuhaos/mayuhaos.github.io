## 🔄 镜像导出与迁移流程

### 1. 查看本地镜像列表

```bash
# 在本地 Windows Docker Desktop 中查看所有镜像
docker images
```

你会看到类似这样的输出：

```bash
REPOSITORY          TAG       IMAGE ID       CREATED        SIZE
my-java-app         v1.0      abc123...      2 hours ago    450MB
mysql               8.0       def456...      3 days ago     520MB
redis               latest    ghi789...      1 week ago     130MB
nginx               latest    jkl012...      2 weeks ago    187MB
frontend-app        latest    mno345...      1 day ago      220MB
```

### 2. 导出镜像到文件

```shell
将需要的镜像逐个导出为 `.tar` 文件：

# 导出你的 Java 应用镜像
docker save -o my-java-app.tar my-java-app:v1.0

# 导出 MySQL
docker save -o mysql-8.0.tar mysql:8.0

# 导出 Redis
docker save -o redis-latest.tar redis:latest

# 导出 Nginx
docker save -o nginx-latest.tar nginx:latest

# 导出前端应用
docker save -o frontend-app.tar frontend-app:latest
#如果还有其他依赖镜像，继续导出
```

### 3. 批量导出（可选）

如果你想一次性导出所有相关镜像：

```bash
# 导出多个镜像到一个文件
docker save -o all-zhijian-images.tar \
  openjdk:17.0.2-jdk \
  chromadb/chroma:1.3.3 \
  mysql:8.0.33 \
  redis:8.2.3 \
  xuxueli/xxl-job-admin:3.2.0 \
  minio/minio:RELEASE.2023-03-20T20-16-18Z \
  nginx:1.24.0 
```

```windows使用
# 导出多个镜像到一个文件
docker save -o all-zhijian-images.tar  openjdk:17.0.2-jdk  chromadb/chroma:1.3.3  mysql:8.0.33  redis:8.2.3 xuxueli/xxl-job-admin:3.2.0  minio/minio:RELEASE.2023-03-20T20-16-18Z  nginx:1.24.0 
```

![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/hj-images/20251127101013406.png)

### 4. 传输镜像文件到内网服务器

将导出的`.tar`文件复制到内网服务器

### 5. 在内网服务器加载镜像

在内网服务器上，进入存放`.tar`文件的目录：

```shell
# 逐个加载镜像
docker load -i my-java-app.tar
docker load -i mysql-8.0.tar
docker load -i redis-latest.tar
docker load -i nginx-latest.tar
docker load -i frontend-app.tar

# 或者如果使用了批量导出
docker load -i all-zhijian-images.tar
```

### 6. 验证镜像加载成功

```shell
# 查看所有已加载的镜像
docker images
```

## 📁 推荐的目录结构

在内网服务器上创建清晰的目录结构：

```text
/data/app/zhijian/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── app.jar
│   ├── config/
│   │   └── application.yml
│   └── entrypoint.sh
├── frontend/
│   ├── Dockerfile
│   └── dist/                    # 前端构建文件
│       ├── index.html
│       ├── css/
│       ├── js/
│       └── assets/
├── nginx/
│   └── conf.d/
│       └── default.conf        # 网关Nginx配置
├── data/
│   ├── mysql/
│   ├── redis/
│   ├── chroma/
│   ├── minio/
│   └── logs/
└── scripts/
    ├── init.sh
    ├── build-backend.sh
    ├── build-frontend.sh
    └── update-backend.sh
```

## ### 1. 创建后端 Dockerfile

```dockerfile
FROM openjdk:17.0.2-jdk

LABEL maintainer="zhijian-team"
LABEL version="1.0.0"

ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV TZ=Asia/Shanghai

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

COPY app.jar app.jar
COPY config/ ./config/

RUN chown -R appuser:appuser /app && \
    chmod -R 755 config/

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:10023/actuator/health || exit 1

EXPOSE 10023

CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar --spring.config.location=file:./config/"]
```

### 2.创建前端 Dockerfile

```dockerfile
FROM nginx:1.24.0

LABEL maintainer="zhijian-team"
LABEL version="1.0.0"

COPY dist/ /usr/share/nginx/html/

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 10022

CMD ["nginx", "-g", "daemon off;"]
```

### 3.创建配置文件

三个配置文件内容保持不变，放在`/data/app/zhijian/backend/config/`目录）

![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/hj-images/20251127112319686.png)

## 🐳 创建 Docker Compose

```yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: app-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword123
      MYSQL_DATABASE: app_db
      MYSQL_USER: app_user
      MYSQL_PASSWORD: userpassword123
    volumes:
      - ./data/mysql:/var/lib/mysql
    networks:
      - app-network
    ports:
      - "3306:3306"

  redis:
    image: redis:latest
    container_name: app-redis
    restart: unless-stopped
    volumes:
      - ./data/redis:/data
    networks:
      - app-network
    ports:
      - "6379:6379"

  backend:
    image: my-java-app:v1.0
    container_name: app-backend
    restart: unless-stopped
    depends_on:
      - mysql
      - redis
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/app_db?useSSL=false
      SPRING_DATASOURCE_USERNAME: app_user
      SPRING_DATASOURCE_PASSWORD: userpassword123
      SPRING_REDIS_HOST: redis
    networks:
      - app-network
    # 注意：后端端口不需要暴露给宿主机，只在 Docker 网络内访问

  frontend:
    image: frontend-app:latest
    container_name: app-frontend
    restart: unless-stopped
    depends_on:
      - backend
    networks:
      - app-network
    # 前端也不需要直接暴露端口，通过 Nginx 访问

  nginx:
    image: nginx:latest
    container_name: app-nginx
    restart: unless-stopped
    depends_on:
      - backend
      - frontend
    ports:
      - "80:80"
      - "443:443"  # 如果需要 HTTPS
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      # 如果前端是静态文件，可以挂载目录而不是用镜像
      # - ./frontend/dist:/usr/share/nginx/html:ro
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mysql_data:
  redis_data:
```

## 🔧 Nginx 配置

创建`nginx/conf.d/default.conf`：

```bash
server {
    listen 80;
    server_name localhost;

    # 前端静态文件服务
    location / {
        proxy_pass http://frontend:80;  # 指向前端容器
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 后端 API 代理
    location /api/ {
        proxy_pass http://backend:8080/;  # 指向后端容器
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 创建部署脚本

**初始化脚本**(`/data/app/zhijian/scripts/init.sh`):

```bash
#!/bin/bash
echo "========================================="
echo "知检系统初始化脚本"
echo "========================================="

echo "1. 检查基础镜像..."
docker images | grep -E "(mysql|redis|chroma|minio|xxl-job|nginx|openjdk)"
echo "✅ 基础镜像已就绪"

echo "2. 构建应用镜像..."
echo "构建后端镜像..."
cd backend
docker build -t zhijian-backend:latest .
cd ..

echo "构建前端镜像..."
cd frontend  
docker build -t zhijian-frontend:latest .
cd ..

echo "3. 启动所有服务..."
docker-compose up -d

echo "4. 等待服务启动..."
sleep 30

echo "5. 检查服务状态..."
docker-compose ps

echo "6. 查看服务日志..."
docker-compose logs --tail=10

echo "========================================="
echo "初始化完成！服务访问地址："
echo " - 主应用: http://服务器IP"
echo " - XXL-Job管理: http://服务器IP/xxl-job-admin"
echo " - MinIO控制台: http://服务器IP/minio"
echo "========================================="
```

**后端更新脚本**(`/data/app/zhijian/scripts/update-backend.sh`):

```bash
#!/bin/bash
echo "========================================="
echo "知检后端更新脚本"
echo "========================================="

# 检查是否有新JAR包
if [ ! -f "backend/app-new.jar" ]; then
    echo "❌ 错误：未找到 backend/app-new.jar"
    echo "请将新JAR包命名为 app-new.jar 并放置在 backend/ 目录下"
    exit 1
fi

echo "发现新JAR包，开始更新流程..."

# 备份当前JAR包
if [ -f "backend/app.jar" ]; then
    BACKUP_NAME="app-backup-$(date +%Y%m%d-%H%M%S).jar"
    cp backend/app.jar backend/$BACKUP_NAME
    echo "✅ 已备份当前版本: $BACKUP_NAME"
fi

# 替换JAR包
mv backend/app-new.jar backend/app.jar
echo "✅ JAR包已更新"

# 构建新镜像
echo "开始构建新镜像..."
cd backend
docker build -t zhijian-backend:latest .
cd ..

# 重启后端服务
echo "重启后端服务..."
docker-compose up -d backend

echo "等待服务重启..."
sleep 20

echo "服务状态检查："
docker-compose ps backend

echo "服务日志（最近20行）："
docker-compose logs backend --tail=20

echo "========================================="
echo "后端更新完成！"
echo "========================================="```

### 前端更新脚本 
(`/data/app/zhijian/scripts/update-frontend.sh`)
```bash
#!/bin/bash
echo "========================================="
echo "知检前端更新脚本"
echo "========================================="

# 检查是否有新前端文件
if [ ! -d "frontend/dist-new" ]; then
    echo "❌ 错误：未找到 frontend/dist-new 目录"
    echo "请将新前端构建文件放在 frontend/dist-new 目录下"
    exit 1
fi

echo "发现新前端文件，开始更新流程..."

# 备份当前文件
if [ -d "frontend/dist" ]; then
    BACKUP_NAME="dist-backup-$(date +%Y%m%d-%H%M%S)"
    mv frontend/dist frontend/$BACKUP_NAME
    echo "✅ 已备份当前版本: $BACKUP_NAME"
fi

# 替换文件
mv frontend/dist-new frontend/dist
echo "✅ 前端文件已更新"

# 构建新镜像
echo "开始构建新镜像..."
cd frontend
docker build -t zhijian-frontend:latest .
cd ..

# 重启前端服务
echo "重启前端服务..."
docker-compose up -d frontend

echo "等待服务重启..."
sleep 10

echo "服务状态检查："
docker-compose ps frontend

echo "========================================="
echo "前端更新完成！"
echo "========================================="
```

### 后续更新：

```bash
# 方法1：交互式更新（推荐）
cd /data/app/zhijian
./scripts/update-backend.sh
# 然后根据提示输入新JAR包的文件名

# 方法2：简化更新（自动查找）
# 上传新JAR包（任意名称）到 backend/ 目录
cp quality-inspection-back-end-2.0.jar /data/app/zhijian/backend/
cd /data/app/zhijian
./scripts/update-backend-simple.sh

# 查看版本信息
./scripts/backend-version.sh
```

## 🚀 第七步：放置应用文件并部署

```bash
# 1. 放置后端JAR包
# 将你的JAR包复制到：
cp /path/to/your-app.jar /data/app/zhijian/backend/app.jar

# 2. 放置前端文件
# 将前端构建的dist目录内容复制到：
cp -r /path/to/your-frontend-dist/* /data/app/zhijian/frontend/dist/

# 3. 设置脚本权限
chmod +x /data/app/zhijian/scripts/*.sh

# 4. 执行初始化部署
cd /data/app/zhijian
./scripts/init.sh
```

## ✅ 第八步：验证部署

```bash
# 检查所有服务状态
docker-compose ps

# 检查构建的应用镜像
docker images | grep zhijian

# 测试服务访问
curl http://localhost/health

# 查看详细日志
docker-compose logs -f
```

## 🔄 后续维护

```bash
# 更新后端
./scripts/update-backend.sh

# 更新前端
./scripts/update-frontend.sh

# 重启所有服务
docker-compose restart

# 查看服务状态
docker-compose ps

# 查看特定服务日志
docker-compose logs -f backend
```

## 🚀 部署命令

```bash
# 1. 进入项目目录
cd /myapp

# 2. 加载所有镜像（如果还没加载）
docker load -i images/my-java-app.tar
docker load -i images/mysql-8.0.tar
docker load -i images/redis-latest.tar
docker load -i images/nginx-latest.tar
docker load -i images/frontend-app.tar

# 3. 启动所有服务
docker-compose up -d

# 4. 查看服务状态
docker-compose ps

# 5. 查看日志
docker-compose logs -f
```

### 一键重启脚本

(`/data/app/zhijian/scripts/restart.sh`)

```bash
#!/bin/bash
echo "========================================="
echo "知检系统重启脚本"
echo "========================================="

echo "重启所有服务..."
docker-compose restart

echo "等待服务启动..."
sleep 20

echo "服务状态："
docker-compose ps

echo "服务日志："
docker-compose logs --tail=10

echo "========================================="
echo "系统重启完成！"
echo "========================================="
```

### 服务状态检查脚本

(`/data/app/zhijian/scripts/status.sh`)

```bash
#!/bin/bash
echo "========================================="
echo "知检系统状态检查"
echo "========================================="

echo "1. 容器状态："
docker-compose ps

echo ""
echo "2. 服务健康检查："
echo "后端服务:"
curl -f http://localhost/api/actuator/health >/dev/null 2>&1 && echo "✅ 后端服务正常" || echo "❌ 后端服务异常"

echo ""
echo "3. 资源使用情况："
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" | head -10

echo ""
echo "4. 最近日志："
docker-compose logs --tail=5
```

## 完整部署流程

### 第一步：创建目录结构

```bash
cd /data/app/zhijian
mkdir -p backend/config frontend/dist nginx/conf.d scripts data/{mysql,redis,chroma,minio,logs/backend}
```

### 第二步：放置应用文件

```bash
# 放置后端JAR包
cp /path/to/your-app.jar /data/app/zhijian/backend/app.jar

# 放置前端文件
cp -r /path/to/your-frontend-dist/* /data/app/zhijian/frontend/dist/
```

### 第三步：创建配置文件

（创建前面提到的三个配置文件：application.yml, application-db.yml, application-dev.yml）

### 第四步：创建 Dockerfile 和 Docker Compose

（使用前面提供的内容）

### 第五步：创建部署脚本

（使用上面修正后的脚本内容）

### 第六步：设置权限并部署

```bash
# 设置脚本权限
chmod +x /data/app/zhijian/scripts/*.sh

# 执行初始化部署
cd /data/app/zhijian
./scripts/init.sh
```

## 🔄 后续维护命令

```bash
# 查看服务状态
./scripts/status.sh

# 更新后端
./scripts/update-backend.sh

# 更新前端  
./scripts/update-frontend.sh

# 重启所有服务
./scripts/restart.sh

# 查看特定服务日志
docker-compose logs -f backend

# 进入容器调试
docker-compose exec backend sh
```

## 💡 优势总结

1. **干净**：只迁移镜像，不包含容器状态

2. **灵活**：可以在内网服务器上重新创建任意容器

3. **版本控制**：清晰的镜像标签管理

4. **可重复**：相同的镜像在不同环境表现一致

5. **易于维护**：可以单独更新某个服务的镜像

这样部署既干净又可靠！

```## 📊 最终端口映射表

|服务|容器内部端口|宿主机端口|访问方式|
|---|---|---|---|
|MySQL|3306|3307|宿主机IP:3307|
|Redis|6379|6389|宿主机IP:6389|
|ChromaDB|8000|8000|宿主机IP:8000|
|MinIO API|9000|9000|宿主机IP:9000|
|MinIO Console|9001|9001|宿主机IP:9001|
|XXL-Job|8080|9888|宿主机IP:9888|
|后端服务|10023|10023|宿主机IP:10023|
|Nginx|80|8088|宿主机IP:8088|
```

# 或者使用命令模式

vim -c "set ff=unix" -c "wq" status.sh

## 记录问题

### 无权限

```bash
OS can't spawn worker thread: Operation not permitted (os error 1) chromadb-1 | note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace chromadb-1 | ========== chromadb-1 | persist_path: "/data" chromadb-1 | ========== chromadb-1 | ((((((((( (((((#### chromadb-1 | ((((((((((((((((((((((######### chromadb-1 | ((((((((((((((((((((((((########### chromadb-1 | ((((((((((((((((((((((((((############ chromadb-1 | (((((((((((((((((((((((((((############# chromadb-1 | (((((((((((((((((((((((((((############# chromadb-1 | (((((((((((((((((((((((((############## chromadb-1 | ((((((((((((((((((((((((############## chromadb-1 | (((((((((((((((((((((############# chromadb-1 | ((((((((((((((((############## chromadb-1 | ((((((((( ######### chromadb-1 | Saving data to: /data chromadb-1 | Connect to Chroma at: http://localhost:8000 chromadb-1 | Getting started guide: https://docs.trychroma.com/docs/overview/getting-started chromadb-1 | ☁️ To deploy your DB - try Chroma Cloud! chromadb-1 | - Sign up: https://trychroma.com/signup chromadb-1 | - Docs: https://docs.trychroma.com/cloud/getting-started chromadb-1 | - Copy your data to Cloud: chroma copy --to-cloud --all chromadb-1 | thread 'main' panicked at /usr/local/cargo/registry/src/index.crates.io-1949cf8c6b5b557f/tokio-1.48.0/src/runtime/scheduler/multi_thread/worker.rs:457:13: chromadb-1 | OS can't spawn worker thread: Operation not permitted (os error 1) chromadb-1 | note: run with `RUST_BACKTRACE=1` environment variable to display a backtrac
```

解决办法 采用单线程强制root

```yml
 chromadb:
    image: chromadb/chroma:1.3.3
    restart: always
    ports:
      - "8000:8000"
    user: "0:0"  # 使用 root 用户
    security_opt:
      - no-new-privileges=false  # 允许新权限
    environment:
      - CHROMA_SERVER_HOST=0.0.0.0
      - CHROMA_SERVER_HTTP_PORT=8000
      - IS_PERSISTENT=TRUE
      - RUST_BACKTRACE=1  # 启用 Rust 回溯
    volumes:
      - ./data/chroma:/data
    networks:
      - zhijian-network
```

### 版本不兼容

![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/hj-images/20251127135725149.png)
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/hj-images/20251127135916030.png)

降级处理

### xxl-job表初始化

```bash
cd /data/app/zhijian

# 创建初始化脚本目录
mkdir -p mysql/init

# 下载 XXL-Job 的 SQL 初始化脚本
wget -O ./xxl_job.sql https://raw.githubusercontent.com/xuxueli/xxl-job/master/doc/db/tables_xxl_job.sql
```

sql为：

```sql
#
# XXL-JOB
# Copyright (c) 2015-present, xuxueli.

CREATE database if NOT EXISTS `xxl_job` default character set utf8mb4 collate utf8mb4_unicode_ci;
use `xxl_job`;

SET NAMES utf8mb4;

## —————————————————————— job group and registry ——————————————————

CREATE TABLE `xxl_job_group`
(
    `id`           int(11)     NOT NULL AUTO_INCREMENT,
    `app_name`     varchar(64) NOT NULL COMMENT '执行器AppName',
    `title`        varchar(12) NOT NULL COMMENT '执行器名称',
    `address_type` tinyint(4)  NOT NULL DEFAULT '0' COMMENT '执行器地址类型：0=自动注册、1=手动录入',
    `address_list` text COMMENT '执行器地址列表，多地址逗号分隔',
    `update_time`  datetime             DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `xxl_job_registry`
(
    `id`             int(11)      NOT NULL AUTO_INCREMENT,
    `registry_group` varchar(50)  NOT NULL,
    `registry_key`   varchar(255) NOT NULL,
    `registry_value` varchar(255) NOT NULL,
    `update_time`    datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `i_g_k_v` (`registry_group`, `registry_key`, `registry_value`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

## —————————————————————— job info ——————————————————

CREATE TABLE `xxl_job_info`
(
    `id`                        int(11)      NOT NULL AUTO_INCREMENT,
    `job_group`                 int(11)      NOT NULL COMMENT '执行器主键ID',
    `job_desc`                  varchar(255) NOT NULL,
    `add_time`                  datetime              DEFAULT NULL,
    `update_time`               datetime              DEFAULT NULL,
    `author`                    varchar(64)           DEFAULT NULL COMMENT '作者',
    `alarm_email`               varchar(255)          DEFAULT NULL COMMENT '报警邮件',
    `schedule_type`             varchar(50)  NOT NULL DEFAULT 'NONE' COMMENT '调度类型',
    `schedule_conf`             varchar(128)          DEFAULT NULL COMMENT '调度配置，值含义取决于调度类型',
    `misfire_strategy`          varchar(50)  NOT NULL DEFAULT 'DO_NOTHING' COMMENT '调度过期策略',
    `executor_route_strategy`   varchar(50)           DEFAULT NULL COMMENT '执行器路由策略',
    `executor_handler`          varchar(255)          DEFAULT NULL COMMENT '执行器任务handler',
    `executor_param`            varchar(512)          DEFAULT NULL COMMENT '执行器任务参数',
    `executor_block_strategy`   varchar(50)           DEFAULT NULL COMMENT '阻塞处理策略',
    `executor_timeout`          int(11)      NOT NULL DEFAULT '0' COMMENT '任务执行超时时间，单位秒',
    `executor_fail_retry_count` int(11)      NOT NULL DEFAULT '0' COMMENT '失败重试次数',
    `glue_type`                 varchar(50)  NOT NULL COMMENT 'GLUE类型',
    `glue_source`               mediumtext COMMENT 'GLUE源代码',
    `glue_remark`               varchar(128)          DEFAULT NULL COMMENT 'GLUE备注',
    `glue_updatetime`           datetime              DEFAULT NULL COMMENT 'GLUE更新时间',
    `child_jobid`               varchar(255)          DEFAULT NULL COMMENT '子任务ID，多个逗号分隔',
    `trigger_status`            tinyint(4)   NOT NULL DEFAULT '0' COMMENT '调度状态：0-停止，1-运行',
    `trigger_last_time`         bigint(13)   NOT NULL DEFAULT '0' COMMENT '上次调度时间',
    `trigger_next_time`         bigint(13)   NOT NULL DEFAULT '0' COMMENT '下次调度时间',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `xxl_job_logglue`
(
    `id`          int(11)      NOT NULL AUTO_INCREMENT,
    `job_id`      int(11)      NOT NULL COMMENT '任务，主键ID',
    `glue_type`   varchar(50) DEFAULT NULL COMMENT 'GLUE类型',
    `glue_source` mediumtext COMMENT 'GLUE源代码',
    `glue_remark` varchar(128) NOT NULL COMMENT 'GLUE备注',
    `add_time`    datetime    DEFAULT NULL,
    `update_time` datetime    DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

## —————————————————————— job log and report ——————————————————

CREATE TABLE `xxl_job_log`
(
    `id`                        bigint(20) NOT NULL AUTO_INCREMENT,
    `job_group`                 int(11)    NOT NULL COMMENT '执行器主键ID',
    `job_id`                    int(11)    NOT NULL COMMENT '任务，主键ID',
    `executor_address`          varchar(255)        DEFAULT NULL COMMENT '执行器地址，本次执行的地址',
    `executor_handler`          varchar(255)        DEFAULT NULL COMMENT '执行器任务handler',
    `executor_param`            varchar(512)        DEFAULT NULL COMMENT '执行器任务参数',
    `executor_sharding_param`   varchar(20)         DEFAULT NULL COMMENT '执行器任务分片参数，格式如 1/2',
    `executor_fail_retry_count` int(11)    NOT NULL DEFAULT '0' COMMENT '失败重试次数',
    `trigger_time`              datetime            DEFAULT NULL COMMENT '调度-时间',
    `trigger_code`              int(11)    NOT NULL COMMENT '调度-结果',
    `trigger_msg`               text COMMENT '调度-日志',
    `handle_time`               datetime            DEFAULT NULL COMMENT '执行-时间',
    `handle_code`               int(11)    NOT NULL COMMENT '执行-状态',
    `handle_msg`                text COMMENT '执行-日志',
    `alarm_status`              tinyint(4) NOT NULL DEFAULT '0' COMMENT '告警状态：0-默认、1-无需告警、2-告警成功、3-告警失败',
    PRIMARY KEY (`id`),
    KEY `I_trigger_time` (`trigger_time`),
    KEY `I_handle_code` (`handle_code`),
    KEY `I_jobid_jobgroup` (`job_id`,`job_group`),
    KEY `I_job_id` (`job_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `xxl_job_log_report`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `trigger_day`   datetime         DEFAULT NULL COMMENT '调度-时间',
    `running_count` int(11) NOT NULL DEFAULT '0' COMMENT '运行中-日志数量',
    `suc_count`     int(11) NOT NULL DEFAULT '0' COMMENT '执行成功-日志数量',
    `fail_count`    int(11) NOT NULL DEFAULT '0' COMMENT '执行失败-日志数量',
    `update_time`   datetime         DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `i_trigger_day` (`trigger_day`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

## —————————————————————— lock ——————————————————

CREATE TABLE `xxl_job_lock`
(
    `lock_name` varchar(50) NOT NULL COMMENT '锁名称',
    PRIMARY KEY (`lock_name`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

## —————————————————————— user ——————————————————

CREATE TABLE `xxl_job_user`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `username`   varchar(50) NOT NULL COMMENT '账号',
    `password`   varchar(100) NOT NULL COMMENT '密码加密信息',
    `token`      varchar(100) DEFAULT NULL COMMENT '登录token',
    `role`       tinyint(4)  NOT NULL COMMENT '角色：0-普通用户、1-管理员',
    `permission` varchar(255) DEFAULT NULL COMMENT '权限：执行器ID列表，多个逗号分割',
    PRIMARY KEY (`id`),
    UNIQUE KEY `i_username` (`username`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


## —————————————————————— for default data ——————————————————

INSERT INTO `xxl_job_group`(`id`, `app_name`, `title`, `address_type`, `address_list`, `update_time`)
    VALUES (1, 'xxl-job-executor-sample', '通用执行器Sample', 0, NULL, now()),
           (2, 'xxl-job-executor-sample-ai', 'AI执行器Sample', 0, NULL, now());

INSERT INTO `xxl_job_info`(`id`, `job_group`, `job_desc`, `add_time`, `update_time`, `author`, `alarm_email`,
                           `schedule_type`, `schedule_conf`, `misfire_strategy`, `executor_route_strategy`,
                           `executor_handler`, `executor_param`, `executor_block_strategy`, `executor_timeout`,
                           `executor_fail_retry_count`, `glue_type`, `glue_source`, `glue_remark`, `glue_updatetime`,
                           `child_jobid`)
VALUES (1, 1, '示例任务01', now(), now(), 'XXL', '', 'CRON', '0 0 0 * * ? *',
        'DO_NOTHING', 'FIRST', 'demoJobHandler', '', 'SERIAL_EXECUTION', 0, 0, 'BEAN', '', 'GLUE代码初始化',
        now(), ''),
       (2, 2, 'Ollama示例任务01', now(), now(), 'XXL', '', 'NONE', '',
        'DO_NOTHING', 'FIRST', 'ollamaJobHandler', '{
    "input": "慢SQL问题分析思路",
    "prompt": "你是一个研发工程师，擅长解决技术类问题。",
    "model": "qwen3:0.6b"
}', 'SERIAL_EXECUTION', 0, 0, 'BEAN', '', 'GLUE代码初始化',
        now(), ''),
       (3, 2, 'Dify示例任务', now(), now(), 'XXL', '', 'NONE', '',
        'DO_NOTHING', 'FIRST', 'difyWorkflowJobHandler', '{
    "inputs":{
        "input":"查询班级各学科前三名"
    },
    "user": "xxl-job",
    "baseUrl": "http://localhost/v1",
    "apiKey": "app-OUVgNUOQRIMokfmuJvBJoUTN"
}', 'SERIAL_EXECUTION', 0, 0, 'BEAN', '', 'GLUE代码初始化',
        now(), '');

INSERT INTO `xxl_job_user`(`id`, `username`, `password`, `role`, `permission`)
VALUES (1, 'admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 1, NULL);

INSERT INTO `xxl_job_lock` (`lock_name`)
VALUES ('schedule_lock');

commit;

```

## 服务器信息

| 实例      | 用户名   | 密码                     |                                                   |
|---------|-------|------------------------|---------------------------------------------------|
| xxl-job | admin | xxljob@Hangju@2025     |                                                   |
| mysql   | model | Hangju@2025            | ENC(wTZloX7zmh3WC4pwqfcBhbx/wU4Liugm07/fZHxoZRc=) |
|         | root  | Hangju@2025@root       |                                                   |
| redis   |       | Redis@Hangju@2025      |                                                   |
| minio   |       | minioadmin@Hangju@2025 |                                                   |
|         |       |                        |                                                   |

docker build -t zhijian-backend:latest .
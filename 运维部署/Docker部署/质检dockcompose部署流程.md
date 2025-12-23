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
│ 
├── frontend/
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

# 环境变量 - 默认使用 dev 环境
ENV SPRING_PROFILES_ACTIVE=dev
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV TZ=Asia/Shanghai

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

COPY quality-inspection-back-end-1.0.jar app.jar

# 创建日志目录和软链接
RUN mkdir -p /tmp/logs && \
    mkdir -p /data/app && \
    ln -sf /tmp/logs /data/app/logs && \
    chown -R appuser:appuser /app /tmp/logs /data/app

EXPOSE 10023

# 直接运行 JAR，使用环境变量控制激活的配置文件
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar --spring.profiles.active=${SPRING_PROFILES_ACTIVE}"]

#如果使用了配置文件则替换以下：
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar --spring.config.location=file:./config/"]
```

### 创建配置文件（可选-目前没用到）

三个配置文件内容保持不变，放在`/data/app/zhijian/backend/config/`目录）

![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/hj-images/20251127112319686.png)

## 🐳 创建 Docker Compose

```yml
services:
  mysql:
    image: mysql:8.0.33
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: Hangju@2025@root
      MYSQL_DATABASE: model_check
      MYSQL_USER: model
      MYSQL_PASSWORD: Hangju@2025
    ports:
      - "3307:3306"
    volumes:
      - ./data/mysql:/var/lib/mysql
      - ./logs/mysql:/var/log/mysql  # MySQL日志
    command:
      - --default-authentication-plugin=mysql_native_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
      - --log-error=/var/log/mysql/mysql-error.log
      - --slow-query-log-file=/var/log/mysql/mysql-slow.log
      - --general-log-file=/var/log/mysql/mysql-general.log
    networks:
      - zhijian-network

  redis:
    image: redis:8.2.3
    restart: always
    ports:
      - "6389:6379"
    volumes:
      - ./data/redis:/data
      - ./logs/redis:/var/log/redis  # Redis日志
    command: redis-server  --appendonly yes  --requirepass "Redis@Hangju@2025"
     # === 新增以下两行 ===
    privileged: true
    security_opt:
      - seccomp=unconfined
      - apparmor=unconfined
    # ==================
    networks:
      - zhijian-network

  chromadb:
    image: chromadb/chroma:1.3.3
    restart: always
    ports:
      - "8000:8000"
    environment:
      - CHROMA_SERVER_HOST=0.0.0.0
      - CHROMA_SERVER_HTTP_PORT=8000
      - IS_PERSISTENT=TRUE
      - RUST_BACKTRACE=1  # 启用 Rust 回溯
    volumes:
      - ./data/chroma:/data
    # 关键：添加特权和安全策略放宽
    privileged: true
    security_opt:
      - seccomp=unconfined
      - apparmor=unconfined
    networks:
      - zhijian-network

  minio:
    image: minio/minio:RELEASE.2023-03-20T20-16-18Z
    restart: always
    ports:
      - "19000:9000"
      - "19001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin@Hangju@2025
    volumes:
      - ./data/minio:/data
      - ./logs/minio:/var/log/minio  # MinIO日志
    command: server /data --console-address ":9001" --quiet
    networks:
      - zhijian-network

  xxl-job:
    image: xuxueli/xxl-job-admin:3.2.0
    restart: always
    ports:
      - "9888:8080"
    environment:
      PARAMS: --spring.datasource.url=jdbc:mysql://mysql:3306/model_check?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai --spring.datasource.username=model --spring.datasource.password=Hangju@2025 --logging.file.path=/app/logs
    volumes:
      - ./logs/xxl-job:/app/logs  # XXL-Job日志
    depends_on:
      - mysql
    privileged: true  # 增加特权模式
    networks:
      - zhijian-network
      
  backend:
    image: zhijian-backend:latest
    restart: always
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "10023:10023"
    volumes:
      - ./logs/backend:/tmp/logs  # 后端日志
    depends_on:
      - mysql
      - redis
      - chromadb
      - xxl-job
    environment:
      SPRING_PROFILES_ACTIVE: dev,db
      JAVA_OPTS: "-Xmx1024m -Xms512m"
    networks:
      - zhijian-network

  nginx:
    image: nginx:1.24.0
    restart: always
    ports:
      - "10022:80"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./logs/nginx:/var/log/nginx  # 网关Nginx日志
      - ./frontend/dist:/usr/share/nginx/html:ro  # 直接挂载前端dist目录
    depends_on:
      - xxl-job
      - minio
    networks:
      - zhijian-network

networks:
  zhijian-network:
    driver: bridge
```

## 🔧 Nginx 配置

创建`nginx/conf.d/default.conf`：

```bash
upstream zhijianApi {
    server backend:10023;
}

upstream zhijianBackend {
    server backend:10023;
}
upstream xxlJobAdmin {
    server backend:9888;
}



server {
    listen 80;
    index index.html;
    
    # 前端静态文件目录
    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ =404;
        index index.html;
        proxy_redirect off;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                client_max_body_size 512m;
            proxy_connect_timeout 200;
                proxy_send_timeout 200;
                proxy_read_timeout 200;
    }
    # 处理XXL-Job的静态资源
    location ~ ^/xxl-job-admin/static/ {
        proxy_pass http://xxlJobAdmin;
        expires 30d;
    }

    location ~ \.(gif|jpg|jpeg|png|bmp|swf|js|css|html)$ {
        expires      30d;
    }

    location /doc {
	root /;
    }

    location /api {
        proxy_pass http://zhijianApi;
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding on;
	#proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	client_max_body_size 512m;
    }
    location /xxl-job-admin/ {
        proxy_pass http://xxlJobAdmin/xxl-job-admin/;
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

## 🚀 放置应用文件并部署

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

## ✅ 验证部署

```bash
# 检查所有服务状态
docker-compose ps

# 检查构建的应用镜像
docker images | grep zhijian

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

docker build -t zhijian-backend:latest .

### 📋 完整服务信息汇总表（含 Web 地址）

| 服务名称         | 用户名              | 密码                                 | 容器端口 → 主机端口                            | Web 访问地址（通过你的域名）                                                           | 用途说明                      |
|--------------|------------------|------------------------------------|----------------------------------------|----------------------------------------------------------------------------|---------------------------|
| **MySQL**    | `root` / `model` | `Hangju@2025@root` / `Hangju@2025` | `3306` → `3307`                        | ❌ 不直接对外提供 Web 访问                                                           | 数据库服务，供后端和 XXL-Job 使用     |
| **Redis**    | （无用户名）           | `Redis@Hangju@2025`                | `6379` → `6389`                        | ❌ 无 Web 界面                                                                 | 缓存服务                      |
| **ChromaDB** | （无认证）            | （无密码）                              | `8000` → `8000`                        | http://mxdemo1.qunl.com:8000                                               | 向量数据库，提供 Embedding 存储与检索  |
| **MinIO**    | `minioadmin`     | `minioadmin@Hangju@2025`           | `9000` → `19000`  <br>`9001` → `19001` | API: http://mxdemo1.qunl.com:19000  <br>控制台: http://mxdemo1.qunl.com:19001 | 对象存储服务，用于文件/模型存储          |
| **XXL-Job**  | Web 默认：`admin`   | Web 默认：`123456`                    | `8080` → `9888`                        | http://mxdemo1.qunl.com:9888                                               | 分布式任务调度平台（首次登录需用默认账号）     |
| **Backend**  | （由应用逻辑控制）        | （如 JWT、OAuth 等）                    | `10023` → `10023`                      | http://mxdemo1.qunl.com:10023                                              | 后端 API 服务（Spring Boot 应用） |
| **Nginx**    | （无认证）            | （无密码）                              | `80` → `10022`                         | http://mxdemo1.qunl.com:10022                                              | 前端静态资源托管 + 可能的反向代理入口      |

---

### 🌐 补充说明
### V1

```yml
version: '3.8'  # 使用 Docker Compose 版本 3.8

services:
  mysql:
    image: mysql:8.0.44  # 使用 MySQL 8.0.44 官方镜像
    container_name: mysql-8.0.44  # 指定容器名称
    restart: unless-stopped  # 自动重启策略，除非手动停止
    environment: # 设置环境变量
      MYSQL_ROOT_PASSWORD: rootpassword  # MySQL root 用户密码
      MYSQL_DATABASE: xxl_job  # 初始创建的数据库
      MYSQL_USER: xxl_job_user  # 创建的用户名
      MYSQL_PASSWORD: xxl_job_password  # 用户密码
    ports:
      - "3306:3306"  # 端口映射，主机端口:容器端口
    volumes:
      - mysql_data:/var/lib/mysql  # 数据持久化卷
      - ./mysql/init:/docker-entrypoint-initdb.d  # 初始化SQL脚本目录
    command: # 启动命令参数
      - --default-authentication-plugin=mysql_native_password  # 使用传统密码认证
      - --character-set-server=utf8mb4  # 设置字符集
      - --collation-server=utf8mb4_unicode_ci  # 设置排序规则
    networks:
      - app-network  # 连接到应用网络

  redis:
    image: redis:7-alpine  # 使用 Redis 7 Alpine 版本（轻量级）
    container_name: redis  # 指定容器名称
    restart: unless-stopped  # 自动重启策略
    ports:
      - "6379:6379"  # Redis 默认端口映射
    volumes:
      - redis_data:/data  # Redis 数据持久化
    command: redis-server --appendonly yes  # 启用 AOF 持久化
    networks:
      - app-network  # 连接到应用网络

  chromadb:
    image: chromadb/chroma:latest  # 使用最新的 ChromaDB 镜像
    container_name: chromadb  # 指定容器名称
    restart: unless-stopped  # 自动重启策略
    ports:
      - "8000:8000"  # ChromaDB API 端口映射
    environment: # 环境变量配置
      - CHROMA_SERVER_HOST=0.0.0.0  # 监听所有网络接口
      - CHROMA_SERVER_HTTP_PORT=8000  # HTTP 服务端口
      - IS_PERSISTENT=TRUE  # 启用数据持久化
    volumes:
      - chroma_data:/chroma/chroma  # ChromaDB 数据存储目录
    networks:
      - app-network  # 连接到应用网络

  xxl-job-admin:
    image: xuxueli/xxl-job-admin:2.4.0  # 使用 XXL-Job 管理端镜像
    container_name: xxl-job-admin  # 指定容器名称
    restart: unless-stopped  # 自动重启策略
    ports:
      - "8080:8080"  # XXL-Job 管理界面端口
    environment: # 数据库连接参数
      - PARAMS=--spring.datasource.url=jdbc:mysql://mysql:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai --spring.datasource.username=xxl_job_user --spring.datasource.password=xxl_job_password
    depends_on: # 依赖关系，先启动 MySQL
      - mysql
    networks:
      - app-network  # 连接到应用网络

  nginx:
    image: nginx:1.25-alpine  # 使用 Nginx Alpine 版本（轻量级）
    container_name: nginx  # 指定容器名称
    restart: unless-stopped  # 自动重启策略
    ports:
      - "80:80"  # HTTP 端口
      - "443:443"  # HTTPS 端口
    volumes: # 挂载配置文件和数据
      - ./nginx/conf.d:/etc/nginx/conf.d  # Nginx 配置文件目录
      - ./nginx/ssl:/etc/nginx/ssl  # SSL 证书目录
      - ./nginx/logs:/var/log/nginx  # 日志目录
    depends_on: # 依赖关系
      - chromadb
      - xxl-job-admin
    networks:
      - app-network  # 连接到应用网络

volumes: # 定义数据卷
  mysql_data:  # MySQL 数据卷
  redis_data:  # Redis 数据卷
  chroma_data:  # ChromaDB 数据卷

networks: # 定义网络
  app-network: # 自定义网络名称
    driver: bridge  # 使用桥接网络驱动
```

### V2

```yaml
services:
  mysql:
    image: mysql:8.0.44
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
    command: redis-server --appendonly yes
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
    volumes:
      - ./data/chroma:/data
      - ./logs/chromadb:/var/log/chromadb  # ChromaDB日志
    networks:
      - zhijian-network

  minio:
    image: minio/minio:RELEASE.2025-07-23T15-54-02Z
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



  nginx:
    image: nginx:1.24.0
    restart: always
    ports:
      - "8088:80"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./logs/nginx:/var/log/nginx  # 网关Nginx日志
    depends_on:
      - xxl-job
      - minio
    networks:
      - zhijian-network

networks:
  zhijian-network:
    driver: bridge
```

### V3

```yml

```
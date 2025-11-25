## ChromaDB

> 目前是docker 版本

#### 导出镜像为 tar 包

```shell
docker save -o chromadb.tar chromadb:1.3.3
```

#### 上传到服务器

#### 在服务器上加载镜像

```
docker load -i chromadb.tar
```

------

#### 5. 创建本地数据目录

```sql
sudo mkdir -p /data/docker/chromadb/data
#可将挂载数据提前上传到/data/docker/chromadb/data下
```

------

#### 6. 启动容器，目前使用的是docker-compose

```dockerfile
version: "3.8"

services:
  chromadb:
    image: chromadb/chroma:1.3.3
    container_name: chromadb
    ports:
      - "8000:8000"
    environment:
      - IS_PERSISTENT=true
      - ANONYMIZED_TELEMETRY=false
    volumes:
      - ./data:/data
    restart: always
```

#### 启动

```dockerfile
docker-compose up -d 
```

#### 查看运行情况

```dockerfile
docker-compose  logs chromadb
```

![image-20251113153256461](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/hj-images/image-20251113153256461.png)

没问题👌👌👌

## chromaDB可视化

```cmd
pip install "datasette==0.59"   # 兼容 Python 3.6 的最后一个版本
```

启动服务

```cmd
datasette --host 0.0.0.0  --port 8001 /data/docker/chromadb/data/chroma.sqlite3
```

可以建立一个脚本·`start_sqlite_web.sh`

```sh
nohup datasette --host 0.0.0.0 --port 8001 \
                /data/docker/chromadb/data/chroma.sqlite3 \
                > /data/docker/chromadb/datasette.log 2>&1 &
```

由于python版本小于3.7 因此只能使用datasette0.59   ，0.6以上可以使用：

```sh
nohup datasette --host 0.0.0.0 --port 8001 \
                --secret "hangju@zj2025" \
                /data/docker/chromadb/data/chroma.sqlite3 \
                > /data/docker/chromadb/datasette.log 2>&1 &  
```

> 生产环境禁止暴露，仅供测试环境使用！！！

访问  8001端口即可
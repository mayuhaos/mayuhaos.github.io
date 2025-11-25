
# 下载/导出DockerHub镜像

```shell
docker save -o  images-all.tar openjdk  nginx mysql
```


# 导入镜像

```shell
docker load -i   images-all.tar
```
# 配置容器
## 配置nginx

下载好镜像 并常规运行
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202412061418925.png)

打开 [Welcome to nginx!](http://localhost/) 查看是否成功


>请先创建相关文件夹！
>D:/Environment/docker/nginx/conf
>

复制文件：

conf：`docker container cp nginx:/etc/nginx/ F:\DATA\DockerDesktop\Volume\nginx\conf`

html：`docker container cp nginx:/usr/share/nginx/html D:/Environment/docker/nginx/html`

~~log：`docker container cp nginx:/var/log/nginx D:/Environment/docker/nginx/log`~~

删除镜像

运行新镜像
```shell
# 可直接复制该行命令运行
docker run --restart always  -p 80:80  -d --name nginx -v D:/Environment/docker/nginx/conf:/etc/nginx   -v 
D:/Environment/docker/nginx/ui:/ui   -v 
D:/Environment/docker/nginx/html:/usr/share/nginx/html  -v
D:/Environment/docker/nginx/log:/var/log/nginx nginx:stable-perl

```

运行成功 ！  nginx部署完成

## 配置mysql

正常安装 导入需要的数据库

## 打包jar包镜像 

使用docker-compose进行部署 

在本地建立一个用于存放docker-compose的文件夹，在文件夹下将jar包放入，新建一个Dockfile文件用于构建jar镜像 

dockerFile
1. java项目打包为jar包
2. 编写dockerfile
   ```Dockerfile
FROM openjdk:21
LABEL authors = "myh"
WORKDIR /home/server/java
COPY app.jar /home/server/java/app.jar
EXPOSE 9999
CMD ["java", "-jar", "app.jar"]
```
如果有多个jar  就编写不同的dockerfile文件

编写docker-compose.yml
```dockerCompose
version: '3'
services:
  resume-platform:
   container_name: platform
   build:
    context: .
    dockerfile: dockerfile-resume-platform
   ports: 
    - '9999:9999'
   environment:
    SPRING_DATASOURCE_URL: jdbc:mysql://host.docker.internal:3306/resume_platform?characterEncoding=utf-8&useSSL=false&autoReconnect=true&allowPublicKeyRetrieval=true

```
host.docker.internal: 这个 DNS 名称仅适用于 Docker Desktop for Windows 和 macOS。如果你在 Linux 上使用 Docker，可能需要使用其他方法来访问宿主机上的服务，例如通过 IP 地址或配置 host 文件。
IP 地址替代: 如果你在 Linux 上使用 Docker，可以使用宿主机的 IP 地址来代替 host.docker.internal

## 运行

```shell
docker-compose up -d --build
```

## 配置前端

将dist放于nginx映射的ui下 （不同项目建立不同的文件夹）
 
 配置nginx的server块
 ```conf
 server {
    listen       80;
    listen  [::]:80;
    #server_name  172.17.0.2;
    server_name  127.0.0.1;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
	    root   /ui/resume-platform/dist;
        #root   /usr/share/nginx/html;
        index  index.html index.htm;
		try_files $uri $uri/ /index.html;
    }
	

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}



```

设置自启动可加入
### docker设置自启动

```shell
docker update --restart=always 容器id/名称
``

```shell
version: '3'
services:
  nginx:
   container_name: nginx
   image: nginx:stable-perl
   ports: 
    - '80:80'
    - 443:443
   restart: always
   privileged: true
   volumes:
    - D:/Environment/docker/nginx/conf:/etc/nginx
    - D:/Environment/docker/nginx/ui:/ui
    - D:/Environment/docker/nginx/html:/usr/share/nginx/html
    - D:/Environment/docker/nginx/log:/var/log/nginx
```

### 官网
https://www.emqx.com/


## 下载镜像
[免费试用 EMQX Cloud 或 EMQX Enterprise | 下载 EMQX](https://www.emqx.com/zh/try?tab=self-managed)
[下载 EMQX 开源版](https://www.emqx.com/zh/downloads-and-install/broker?os=Docker)

## 安装
```shell
docker load < emqx-5.8.2-docker-amd64.tar.gz
```
### 启动
```shell
docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx:5.8.2
```
### 设置自启动
```shell
docker update --restart=always 容器id/名称
```

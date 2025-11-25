# Linux环境安装Docker

### 安装docker环境

1、官网安装参考手册：https://docs.docker.com/engine/install/centos/

2、确定你是CentOS7及以上版本，我们已经做过了

3、yum安装gcc相关环境（需要确保 虚拟机可以上外网 ）

```c
yum -y install gcc
yum -y install gcc-c++
```

4、卸载旧版本

```shell
yum remove docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-engine
```

5、安装需要的软件包

```shell
yum install 1 -y yum-utils
```

6、设置镜像仓库

```shell
# 错误
yum-config-manager --add-repo
https://download.docker.com/linux/centos/docker-ce.repo
## 报错
[Errno 14] curl#35 - TCP connection reset by peer
[Errno 12] curl#35 - Timeout
# 正确推荐使用国内的
yum-config-manager --add-repo http://mirrors.aliyun.com/dockerce/
linux/centos/docker-ce.repo
```

7、更新yum软件包索引

```shell
yum makecache fast
```

8、安装 Docker CE

```shell
yum install docker-ce docker-ce-cli containerd.io
```

9、启动 Docker

```shell
systemctl start docker
```

10、测试命令

```shell
docker version

docker run hello-world

docker images
```

[//]: # (![image-20220725153511821]&#40;Linux环境使用Docker安装RabbitMQ.assets/image-20220725153511821.png&#41;)

11、启动hello-world

```shell
docker run hello-world
```

[//]: # (![image-20220725153648810]&#40;Linux环境使用Docker安装RabbitMQ.assets/image-20220725153648810.png&#41;)

==成功==！！！

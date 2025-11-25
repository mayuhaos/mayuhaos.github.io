# Linux环境部署Docker并安装RabbitMQ

如果只需要安装docker环境，请参考：

[Linux环境安装Docker](https://blog.csdn.net/qq_47913744/article/details/125976486?spm=1001.2014.3001.5501)

（1）yum 包更新到最新

```shell
yum update
```

（2）安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的

```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
```

（3）设置yum源为阿里云

```shell
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

（4）安装docker

```shell
yum install docker-ce -y
```

（5）安装后查看docker版本

```shell
docker -v 
```

（6）创建并运行容器

—hostname：指定容器主机名称
—name:指定容器名称
-p:将mq端口号映射到本地
或者运行时设置用户和密码

```shell
docker run -di --name myrabbit -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -p 15672:15672 -p 5672:5672 -p 25672:25672 -p 61613:61613 -p 1883:1883 rabbitmq:management
```

(此命令：rabbitMQ没有安装则会自动下载安装，无需单独安装rabbitMQ)

（7）查看

```shell
docker ps -a
```

（8）运行

（9）浏览器输入ip+端口号15672

（10）==登录成功==！！！

## docker常用命令

```shell
#启动docker：
systemctl start docker
# 停止docker：
systemctl stop docker
# 重启docker：
systemctl restart docker
# 查看docker状态：
systemctl status docker
# 开机启动：  
systemctl enable dockersystemctl unenable docker
# 查看docker概要信息
docker info
# 查看docker帮助文档
docker --help
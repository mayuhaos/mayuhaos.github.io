
## 发现问题


>本机电脑配置：`win10  之前升win11，感觉卡顿，重装回10
>
>最近我希望在docker中部署我的应用服务
>奈何自己的电脑是windows -->  于是我在电脑上安装了wsl2并部署了`docker-desktop`
>安装了mysql  nacos  自己的jar包做的镜像 nginx等等.....
>
>**但是**...正当部署到前端时发现了一个问题，nginx的server块一直读取不到我的win下的盘符下的dist包（我已经将容器内文件目录映射到我的主机电脑）。我找了很多方法，大都是将dist移动到html的静态目录下，这个确实没有问题，但如果我现在有2个前端项目，2个dist，该如何放置和映射端口？==这是目前困扰我的问题，如果有大神懂得话，请指导一下！==
>
>**于是**...我在wsl2下安装了centos7系统，本以为这样就完美了，没想到wsl2的ip与我的主机ip不在同一个网段...我希望在同一个局域网下访问。查阅了博客资料，奈何我的hype-V新增不了虚拟机（报错)，就又pass了 还是那句话 ==这也是目前困扰我的问题，如果有大神懂得话，请指导一下！==
>
>**于是**... 就有了这样一个脑洞：我在docker-dsktop下安装一个centos将其端口映射出来，这样我的nginx也可以正常使用，如果登录这个centos也可以使用我的主机的ip，哈哈哈 一举两得爽歪歪！

## 开整

安装配置好后，使用xshell可以连接没问题！
我运行centos时只映射了一个22端口，奈何我又在它里面安装了nginx，这时我希望将80端口映射出来。问题就是..... 删掉容器重新创建？？？？？当然不行，我安装了那么多东西呢。
于是就开始寻找方法，奈何找到的都是在`cd /var/lib/docker/containers/`这个目录下去修改配置文件。
哇咔咔，我在我的电脑的docker-desktop的文件夹下是死活找不到这个哇。

## 解决问题

**于是**，我就在这个目录下找，误打误撞的是找到了wsl的配置文件
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241218103131181.png)
发现在/mnt/host下进行了挂载

### 进入目录

赶紧去这个目录下查找一番 果然不出所料 找到了
目录为：
```shell
\\wsl.localhost\docker-desktop\mnt\docker-desktop-disk\data\docker\containers
```
在containers目录下有多个容器
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241218103657550.png)

### 查看预修改容器id

其容器id可通过2种方式查看
1.通过命令查看
   ```shell
   docker inspect 容器
```
![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241218104312041.png)
2.通过可视化面板查看
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241218104600420.png)

### 修改对应配置文件

进入对应的containers文件夹后，会发现有配置文件

修改hostconfig.json 找到PortBindings 添加端口映射80 ,意为绑定端口:
```json
"80/tcp":[{"HostIp":"","HostPort":"80"}]
```
修改config.v2.json文件，在ExposedPorts中添加80，意为暴露端口:
```json
"80/tcp":{}
```
### 重启docker

==**重启docker**（就是重启docker-desktop），不是重启容器==

再次查看 发现端口已映射成功！
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241218105429149.png)

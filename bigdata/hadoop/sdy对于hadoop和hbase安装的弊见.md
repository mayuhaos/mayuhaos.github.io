# sdy对于hadoop和hbase安装的弊见

## 一、查看对应版本

[Apache HBase ™ Reference Guide](https://hbase.apache.org/book.html#basic.prerequisites)

![image-20221021160136856](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210211601972.png)

## 二、官网下载habse

[Apache HBase – Apache HBase Downloads](https://hbase.apache.org/downloads.html)

![image-20221021160525819](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210211605917.png)

## 三、官网下载hadoop

[Apache Hadoop](https://hadoop.apache.org/releases.html)

![image-20221021160656968](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210211606018.png)

## 四、安装hbase （我使用的hbase版本为2.4.14稳定版）

### 1.上传到linux系统  文件夹可提前创建好，解压

```shell
tar -zxvf xxxxx.tar.gz
```

### 2.配置配置hbase-env.sh 文件

#### 进入hbase/conf目录内，准备开始配置文件

```shell
vi hbase-env.sh
```

#### 新增以下内容后保存退出：

```shell
export JAVA_HOME=/opt/softwave/jdk1.8.0_221   //这是你的jdk路径
export HBASE_MANAGES_ZK=false
```

### 3.配置hbase-site.sh 文件

#### 进入文件：

```shell
vi hbase-site.xml
```

#### 新增以下内容后保存退出：

#### 建议将下面代码中的文字注释删除  （如果报错 xxxxxxxutf-8xxxxxx）

```xml
<!—hbase.rootdir 将数据写入哪个目录 如果是单机版只要配置此属性就可以，value中file:/绝对路径，如果是分布式则配置与hadoop的core-site.sh服务器、端口以及zookeeper中事先创建的目录一致-->
<property>
	 <name>>hbase.rootdir</name>
	 <value>file:/xxxxxxxxxx/rootdir</value>
</property>
<!—单机模式不需要配置，分布式配置此项为true-->
<property>
	 <name>hbase.cluster.distributed</name>
	 <value>false</value>
</property>
<!—单机模式不需要配置 分布是配置此项为zookeeper指定的物理路径名-- >
<property>
	 <name>hbase.zookeeper.property.dataDir</name>
	 <value>/xxxxxxxxxxx</value>
</property>
```

### 4.配置环境变量

#### 进入Profile文件

```shell
vi /etc/profile
```

#### 新增以下内容后保存退出：

```shell
export HBASE_HOME=/xxxxxxxx
export PATH=$HBASE_HOME/bin:$PATH
```

#### 退出后source一下让修改生效：

```shell
source /etc/profile
```

### 5.启动

#### 1、开启Hbase进程

###### 进入==bin==（你安装的==hbase==路径下有一个bin文件夹）目录下

```shell
./start-hbase.sh        //开启进程
./stop-hbase.sh     	//关闭进程
```

jps看一下是否有HMaster进程

```shell
jps
```

![image-20221021202717695](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210212027751.png)

### 6.浏览器运行

#### 浏览器输入    IP+端口   （例如：192.168.56.10:16010)

#### hbase的默认web图像界面访问端口为16010

#### 我的ip:192.168.67.128:16010



```html
```



浏览器输入：

```html
192.168.67.128:16010
```

![image-20221021203710780](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210212037922.png)

## ==成功!==

#### 如果没有成功：如下

![image-20221021204902919](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210212049004.png)

+ 看看是否启动成功 并且不报错（下图为正常启动）

  ![image-20221021203950498](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210212039541.png)

+ 看看能不能进入hbase的控制台 （下图为正常启动）

  ```shell
  hbase shell
  ```

  ![image-20221021204602618](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210212046672.png)

  如果以上都和我一样没有问题  那就只有一点 

  ！！！你的防火墙没有关闭啊哈哈哈哈哈哈哈！！！！

  ```shell
  1.	关闭防火墙（切换到root用户下进行）
  命令：
  su root 
  systemctl stop firewalld
  systemctl disable firewalld
  systemctl status firewalld（出现inactive dead即可）
  ```

  然后就可以正常访问啦！

  

### 小彩蛋：

如果你关闭hbase的时候 发现一直……………………………………..

关闭命令

```shell
./stop-hbase.sh 
```



![image-20221021205100311](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202210212051360.png)

解决办法：

```shell
先输入
hbase-daemon.sh stop master
再输入
stop-hbase.sh
```

这样hbase就可以成功关闭！

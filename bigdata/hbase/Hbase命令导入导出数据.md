# Hbase命令导入导出数据

## 基于本地Hbase

### 前期准备

- 数据文件存储路径:

  /mnt/disk01/data/gzjydata20230805/GDT003_SUBSTATION_20230710_online

- 导入的表名称: HD001_SUBSTATION_20230710_online

  ------

### 导入前准备

#### 确保导入的表存在Hbase中

输入hbase shell进入hbase终端

```shell
hbase shell
```

![image-20230907134334447](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202309071501167.png)

​		输入list查看表名是否存在 (两种方式  全库查询和指定查询)

```shell
list             //全库查询
exists  '表名'    //指定查询  查到为true  查不到为false
```

![image-20230907141308019](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202309071502894.png)

![image-20230907141644019](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202309071503258.png)



##### 1.若不存在则需要创建表

输入命令: 表名可修改,B为列簇(公司约定俗成)

```shell
create 'HD001_INVERTER_20230701_online','B'
```

![image-20230907135209288](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202309071503790.png)

##### 2.若存在则需要删除并重新创建表

删除分为两部:

```shell
disable 'HD001_INVERTER_20230710_online'   //禁用表
drop 'HD001_INVERTER_20230710_online'      //删除表
```

创建表:

```shell
create 'HD001_INVERTER_20230701_online','B'
```

### 导入

**导入时运行命令的地方为hbase shell==外部==,建议再开一个xshell窗口**

命令格式:

```sh
hbase org.apache.hadoop.hbase.mapreduce.Import "要导入的表名称"  "数据文件存储路径"  
```

例如:

```shell
hbase org.apache.hadoop.hbase.mapreduce.Import HD001_SUBSTATION_20230710_online /mnt/disk01/data/gzjydata20230805/GDT003_SUBSTATION_20230710_online
```

![image-20230907140156886](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202309071504622.png)



等待就ok.........

多条数据则需要多次执行本步骤

### 导出

命令格式:

```sh
hbase org.apache.hadoop.hbase.mapreduce.Export "要导出的表名称"  "数据文件存储路径"  
```

## 基于HDFS的Hbase

### 导出

1. 从hdfs的hbase导出到hdfs上的路径
2. 从hdfs上的路径get到本地linux系统路径
3. 执行ftp操作（xftp）

```shell
export    hdfs的hbase表名       hdfs上的路径

hbase org.apache.hadoop.hbase.mapreduce.Driver export CY001_COLLECTINGWIRE_20231011_online  /data/CY001_COLLECTINGWIRE_20231011_online
```

```shell
-get   hdfs上的路径      本地linux系统路径 (.为当前路径下)

hadoop fs -get /data/GDT003_SVG_20231009_online .
```

### 打包（适用于从一个ENV到另一个ENV）

打包并压缩文件：

```shell
tar -czvf data.tar.gz file1
```

### 解压（适用于从一个ENV到另一个ENV）

解压缩文件：

```shell
tar -xzvf data.tar.gz
```

### 导入

1. 本地linux系统路径put到hdfs上的路径
2. 从hdfs上的路径导入到hdfs的hbase

```shell
-put   hdfs上的路径      本地linux系统路径 (.为当前路径下)

hadoop fs -put ./GDT003_STATION_online /data1/CY001_STATION_online
```

```shell
   hdfs的hbase表名       hdfs上的路径

hbase org.apache.hadoop.hbase.mapreduce.Import CY001_FAN_online /data1/CY001_FAN_online
```

### ！注意：

- 如果表不存在 则需要创建表

  ```shell
  create 'HD001_INVERTER_20230701_online','B'
  ```

- 如果hdfs文件路径重复则需要删除文件

  ```shell
  hadoop fs -rm -r /xxxxx/xxxxx
  ```

- 查看hdfs远程文件

  ```shell
  hadoop fs -ls /
  ```

  

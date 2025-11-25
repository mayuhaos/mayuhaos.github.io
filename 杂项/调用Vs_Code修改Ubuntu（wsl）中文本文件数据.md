# 调用Vs Code修改Ubuntu（wsl）中文本文件数据

------

* 可平替自带Vim编辑器和notepad
* 此处我以修改配置文件简化arm复杂命令为例

------



[TOC]



## 一、使用Ubuntu自带的vim编辑器编辑

### 1.打开Ubuntu

### 2.修改配置文件   输入 vi .bashrc 后回车

```xml
 vi .bashrc
```

![image-20220328140013449](使用Vs Code简化基于wsl的arm交叉编译命令.assets/image-20220328140013449.png)

### 3.增加起别名配置

### 4.保存后重启wsl即可



由于Ubuntu自带的vim编辑器不好用，这里笔者给大家推荐第二种方式——使用 Vs Code

------



## 二、使用轻量级编辑器Vs Code编辑

### 1.下载并安装Vs Code 

### 2.在Ubuntu（wsl）命令行界面安装调用Vs Code 包

输入code . 后回车

.意思指当前目录或文件

```xml
code .
```

![image-20220329000659871](使用Vs Code简化基于wsl的arm交叉编译命令.assets/image-20220329000659871.png)

### 3.重启Ubuntu

### 4.在Ubuntu（wsl）命令行界面输入 code  .bashrc修改配置文件

```xml
 code .bashrc
```



<video id="video" controls=""src="E:\博客\使用Vs Code简化基于wsl的arm交叉编译命令.assets/2022-03-28 15-59-12.mp4" preload="none">

### 5.增加起别名配置后保存

![image-20220328234329034](使用Vs Code简化基于wsl的arm交叉编译命令.assets/image-20220328234329034.png)



### 6.保存后重启wsl即可

> 注意！
>
> ![image-20220328234425167](使用Vs Code简化基于wsl的arm交叉编译命令.assets/image-20220328234425167.png)
>
> 否则会识别不到，将出现报错：
>
> ![](使用Vs Code简化基于wsl的arm交叉编译命令.assets/image-20220328234515750.png)



### 7.运行实例

![image-20220328235157008](使用Vs Code简化基于wsl的arm交叉编译命令.assets/image-20220328235157008.png)

这样我们就可以在wsl命令行的任何界面调用Vs Code打开和编辑文件夹或文件了！

只需要在文件或文件夹前加  code 

------

小知识：

安装插件：

![image-20220329001628305](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220402091313729.png)

![image-20220402091402911](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220402091402911.png)

![image-20220402091420706](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220402091420706.png)

<video id="video" controls=""src="C:\Users\MaYuHao\Videos\OBS\2022-04-02 09-20-32.mp4" preload="none">


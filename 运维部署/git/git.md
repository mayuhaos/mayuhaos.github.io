# Git星球:hatching_chick::hatching_chick::hatching_chick:

::: tip git

- **Git安装** 

- **Git初始化配置**

- **Git基础命令** 

- **Git版本回退**
- **Git命令总结**

- **Git解决冲突** 

- **Pycharm中Git的使用**

:::

##  Git安装

官网下载地址：[git-scm.com](https://git-scm.com/)

安装过程中所有选项默认就行

安装完成后可以进入windows的命令终端输入git --version查看git版本信息

```shell
git --version
```

![image-20230623111939139](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231119194.png)

在桌面鼠标邮件也能看到git自带的命令终端和有图形界面的客户端

![image-20230623105226691](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231052743.png)

## Git初始化配置

通过**git config**命令来进行git的初始化配置

一般只需要初始化用户名和邮件地址就行，如下示例：

```shell
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

如果想要检查配置信息可以使用**git config --list** 命令来列出所有 Git 当时能找到的配置：

![image-20230623105425841](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231054917.png)

## Git基础命令

Git有很多命令，具体有哪些命令可以使用**git --help**查看：

![image-20230623105519652](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231055726.png)

### 获取Git仓库

通常有两种获取 Git 项目仓库的方式：

1. 将尚未进行版本控制的本地目录转换为 Git 仓库；

比如要将本地的一个叫my_project的文件夹转化为git仓库，可以在这个文件夹中执行git init命令

该命令将创建一个名为 .git 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件

2. 从其它服务器 克隆 一个已存在的 Git 仓库。

比如已经知道一个远程仓库的地址

（1）可以使用命令git clone 地址，将远程仓库克隆到本地。

（2）如果远程仓库有很多分支，只想拉取其中某个分支的内容可以使用git clone -b 分支名 地址

（3）如果远程仓库已经存在很长时间有已经有很多commit内容了，文件比较大，想一些开源项目的源码比如odoo源码，可能clone的时候半天clone不下来，这个时候可以使用命令git clone --depth 1 地址，这样只会clone下最后一次commit信息，文件就不会有那么大了。

### 配置SSH免密登录

比如注册了一个码云Gitee的账号，然后在上面创建了一个私人仓库名称为git_study，如果拉取仓库代码想要免密拉取得取码云的设置中找到SSH公钥配置，在这里将自己本机电脑的公钥配置上就可以了。

本机电脑的公钥一般在用户目录（C:\Users\本机电脑用户名）里的.ssh文件中，id_rsa.pub就是公钥文件，打开该文件将内容复制到刚刚提到的SSH公钥配置里面就行了。

如果没有.ssh相关文件就需要执行以下命令来生成秘钥文件：

ssh-keygen -t rsa -C '个人邮箱'

然后一直回车就可以了，完了后就能在用户目录中看到相关秘钥文件了。

一般配置SSH秘钥的地方大概长这样：

![image-20230623105652691](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231056760.png)

![image-20230623105657140](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231056203.png)

### 运行流程

![image-20230623105730304](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231057369.png)

### Git提交代码

为了后面练习方便，可以在自己的远程仓库中创建一个名git_study的仓库

将仓库clone到本地然后先添加一个文件ceshi.txt，然后再随便添加些内容。

这个时候我们执行git status可以看到如下信息：

![image-20230623105808389](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231059202.png)

说明ceshi.txt没有添加到暂存区中，可执行git add 文件名将具体的文件添加到暂存区中，或者git add *将所有

文件添加到暂存区中。

![image-20230623105821531](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231058585.png)

然后再执行git commit -m ‘提交时的备注信息’将代码提交到本地仓库中，最后再执行git push origin master

将代码推送到远端的master分支中。

这个时候去远端仓库就能看到刚才提交的文件了。

这里提示一下这只是教学练习，一般平时工作开发的时候master分支都是保护分支，是不可以直接push到master

分支上的，一般都是根据任务号创建分支例如T0001，任务开发完成，将T0001分支推送到远端仓库，然后提交

T0001到master分支的合并请求，然后让有代码合并权限的人去合并代码。

上面介绍的代码提交只是简单的一个例子，实际的开发中可能会存在两个用户A和B

1、A拉取了代码文件ceshi.xml到本地，去修改了第一行的代码

2、然后B也拉取了代码，然后修改了第一行代码，并且把代码已经提交到远端了，

3、之后A提交代码然后push到远端的话会提示代码冲突push失败。

出现上述这种情况的话就需要我们将代码冲突处理掉然后才能推送到远端。具体操作会在后面统一讲解。

先来学习一下，如果代码提交错了，或者不想要某次提交的代码了怎么回退版本。

## Git版本回退

>问题：
>
>1、如果提交了一个错误版本，怎么回退版本？
>
>2、如果提交了一个错误的版本到远程分支，怎么回退远程分支版本？
>
>3、如果提交了一个错误的版本到公共远程分支，又该怎么回退版本？

> 一般回滚代码的三种方法：
>
> 1、自己的分支回滚直接用reset
>
> 2、公共分支回滚用revert
>
> 3、如果错的太多了，可以直接将代码替换成正确代码，替换掉分支代码

### 本地分支版本回退方法

  先用git reflog查找到要回退版本的commit id

![image-20230623105953354](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231059408.png)

例如我这里是ad0eecc，可以输入命令git reset --hard ad0eecc来回退

  --hard：之前的修改记录都会没了

  --soft：之前的修改记录还在

  一般soft用在commit的时候注释信息写错了，或者还有一些修改要放在一块提交，但是刚刚已经commit过了，就

  可以使用soft，回退到提交之前，本地修改还会保留，等再次修改完之后就可以重新提交了。

### 自己的远程分支版本回退方法

如果是自己的本地分支已经提交到远程环境了，需要在执行上面两步操作后执行命令git push -f推送到远程分支

  -f代表前置推送，本地分支回滚后，版本将落后远程分支，必须使用强制推送覆盖远程分支。

### 公共远程分支版本回退（多人一起开发）

1、git reflog 找到要退回的commit id

2、撤销到某个版本之前

 （1）git reset --hard commitid回退版本

 （2）或者git reset --sotf commitid，然后git statsh将之前的修改暂存（为了安全起见）

3、git push -f 强制推送到远端

如果做了上面的操作，回退公共远程分支，可能会把别人的提交丢掉

假如远程分支的情况是这样：A1-A2-B1

A、B代表两个人，A1、A2、B1代表各自的提交，并且所以人的本地分支都已经更新到最新版本了，和远程一致。

这个时候发现A2的这次提交有错误，然后按照上面的操作将远程分支回滚到了A1，那么理想的状态是你的其他

同时用git pull拉取代码时master分支也回滚了，然后现实确是他们会看到如下提示：

![image-20230623110029499](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231100549.png)

也就是说，你的同事A的分支并没有主动退回，而是比远程分支超前了两次提交，因为远程分支已经被强制

回退了，如果这个时候同时A看到显示的提示就直接又push了，那回滚的分支又会被还原，远程master又变成

了：A1-A2-B1,。所以这种方式回退多人一起开发的仓库版本肯定是不合适的。

像刚才讲的用git reset回退公共远程分支版本后，需要其他所有人手动用远程master分支覆盖本地master分支，

显然，这不是优雅的回退方法。

公共远程分支版本回退，最优方式，使用git revert

```shell
git revert HEAD：撤销最近一次提交
git revert HEAD~1：撤销上上次期间，注意数字从0开始
git revert commitid：撤销commitid对应的提交
git revert 命令意思是撤销某次提交，他会产生一个新的提交，虽然代码回退了，但是版本依然是向前的，所以
当用revert回退之后，所有人pull之后，他们的代码也自动的回退了。
```

但是，要注意以下几点：

* revert是撤销一次提交，所以后面的commitid是你需要回滚到的版本的前一次提交

* 使用revertHEAD是撤销最近的一次提交，如果你最近一次提交是用revert命令产生的，那么你再执行一次，就

相当于撤销了上次的撤销操作，换句话说，你连续执行两次revertHEAD命令，就跟没执行是一样的。

* 使用revertHEAD~1表示撤销最近2次提交，这个数字是从0开始的，如果你之前撤销过产生了commiid，那么也

会计算在内的。

* 如果使用revert撤销的不是最近一次提交，那么一定会有代码冲突，需要你合并代码，合并代码只需要把当前的

代码全部去掉，保留之前版本的代码就可以了。

gitrevert命令的好处就是不会丢掉别人的提交，即使你撤销后覆盖了别人的提交，他更新代码后，可以在本地用reset向

前回滚，找到自己的代码，然后拉一下分支，再回来合并上去就可以找回被你覆盖的提交了。

使用revert命令，如果不是撤销的最近一次提交，那么一定会有冲突

把冲突的代码去掉就可以了，然后再提交一次代码就可以解决冲突了。

## Git命令总结

![image-20230623110341292](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231103437.png)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231103212.png)

## **Git解决冲突** 

1.切到主分支：git checkout dev

2.拉取最新分值代码：git pull

3:删掉旧任务分支，创建新任务分支：git branch -D，git checkout -b 

4.merge远程任务分支，合并版本解决冲突：git merge ,

5.正常提交

## **Pycharm中Git的使用**

![image-20230623110856310](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231108432.png)
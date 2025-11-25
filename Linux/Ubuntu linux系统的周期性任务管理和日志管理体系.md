# Ubuntu linux系统的周期性任务管理和日志管理体系

## 1、使用命令查询本机是否存在cron服务：

```
ps -ef | grep cron | grep -v grep
```

![image-20241122132301610](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202411221323654.png)

## 2、基于/etc/crontab配置文件创建周期性任务：

- 修改/etc/crontab配置文件中，将每小时运行的任务时间更改为每5分钟运行一次。

- 在/etc/cron.hourly目录下创建任务脚本文件cron_task（文件名中不要含有 . 符号），实现功能：将当前系统时间输出到文件task_5_min.log中，文件task_5_min.log保存在当前用户的主目录下。

  注意：在ubuntu机器上，要确保cron_task脚本文件可执行。cron_task的文件内容可参考如下内容，脚本文件中涉及的绝对路径换成本机系统上的绝对路径（不要使用相对路径，目前系统不能识别定时任务脚本中存在的相对路径）：

![image-20241122132241003](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202411221322035.png)

- 重新启动cron服务。
- 观察运行结果，在当前用户主目录下，是否存在task_5_min.log文件，并观察文件内容。

## 3、基于/etc/cron.d目录创建周期性任务：

- 在/etc/cron.d目录下增加定时任务脚本cron_task_2_min，实现功能：每2分钟将当前系统时间输出到task_2_min.log文件中，文件task_2_min.log保存在当前用户的主目录下。

  cron_task_2_min的文件内容可参考如下（脚本文件中涉及的绝对路径换成本机系统上的绝对路径）：
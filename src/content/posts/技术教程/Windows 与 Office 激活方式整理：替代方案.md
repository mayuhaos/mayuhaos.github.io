---
title: Windows 与 Office 激活方式整理：替代方案
published: 2026-05-13
description: 基于一篇知乎专栏主题整理改写，梳理 Windows 与 Office 激活类方案的常见思路、潜在风险，以及更稳妥的正版与替代路径。
tags:
  - Windows
  - Office
  - 软件
  - 教程
category: 技术教程
draft: true
sourceLink: https://zhuanlan.zhihu.com/p/6823352707
image: https://raw.githubusercontent.com/mayuhaos/blog-images/notepix/assets/20260513T013256331Z.png
---


安全提示：激活方法来源于网络，属于github上的MAS开源项目，谨慎激活。安全问题请自行斟酌，注重安全的小伙伴们请购买正版。

MAS作为一个开源免费的激活工具，以其安全性、易用性和强大的功能受到了用户的青睐。它不仅提供了多种激活方式，还考虑到了用户的不同需求，如永久激活和临时激活。此外，MAS的开源特性也让用户可以更加放心地使用，因为源代码的透明度可以确保没有隐藏的安全风险。

项目网址：https://massgrave.dev/

**注意：**

- PowerShell 中的 [IRM 命令](https://zhida.zhihu.com/search?content_id=250387047&content_type=Article&match_order=1&q=IRM+%E5%91%BD%E4%BB%A4&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3Nzg4MDc0MjEsInEiOiJJUk0g5ZG95LukIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjUwMzg3MDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.tf2hUcua1qQKPzZhI4vGNbn1L-jDqfqokJM-p7sav0Y&zhida_source=entity)从指定的 URL 下载脚本，然后 [IEX 命令](https://zhida.zhihu.com/search?content_id=250387047&content_type=Article&match_order=1&q=IEX+%E5%91%BD%E4%BB%A4&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3Nzg4MDc0MjEsInEiOiJJRVgg5ZG95LukIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjUwMzg3MDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.dhmHbncg9ra98kFDiaiLIDSRe3Xs2Gi6OfLaOMX7I5U&zhida_source=entity)执行该脚本。
- 在执行命令之前，请务必仔细检查 URL，如果手动下载文件，请验证来源。
- 请谨慎，因为有些应用程序通过在 IRM 命令中使用不同的 URL 来传播伪装成 MAS 的恶意软件。

**一、在线激活方法**

**PowerShell激活（win8及以上版本）**

1. 打开 PowerShell (不是 CMD). 搜索框输入PowerShell,然后打开
![](https://raw.githubusercontent.com/mayuhaos/blog-images/notepix/assets/20260513T013007245Z.png)

2.复制一下代码到命令行，按回车键
```text
irm https://get.activated.win | iex
```
![](https://raw.githubusercontent.com/mayuhaos/blog-images/notepix/assets/20260513T013106163Z.png)

3.你会看到激活选项。选择[1] [HWID](https://zhida.zhihu.com/search?content_id=250387047&content_type=Article&match_order=1&q=HWID&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3Nzg4MDc0MjEsInEiOiJIV0lEIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjUwMzg3MDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.QRMfzF4WXu9iAn0KDohEqBV31fR5s59I_moQ7xHuQEM&zhida_source=entity) 用于 Windows 激活。选择[2] [Ohook](https://zhida.zhihu.com/search?content_id=250387047&content_type=Article&match_order=1&q=Ohook&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3Nzg4MDc0MjEsInEiOiJPaG9vayIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1MDM4NzA0NywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.iUDlnwhnssNHEZT_uouZwWDHcAagJhJcvRsHiFUfOso&zhida_source=entity) 用于 Office 激活

Permanent是永久的意思。
![](https://raw.githubusercontent.com/mayuhaos/blog-images/notepix/assets/20260513T013123236Z.png)

4、输入1激活windows系统，等待几分钟，耐心等待，出现以下界面代表激活成功了。
![](https://raw.githubusercontent.com/mayuhaos/blog-images/notepix/assets/20260513T013147672Z.png)

需要注意的是，选1，激活windows系统需要连接网络，能上网才行，属于在线激活。

选2，激活office，离线就可以激活。
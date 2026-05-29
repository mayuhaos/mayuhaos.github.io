---
title: 我让 Codex 直接安装飞书 CLI，并把 Excel 生成线上多维表格
published: 2026-05-29
description: 这不是传统命令行教程，而是一篇按真实对话记录整理的 Codex 实战：从一句“帮我安装飞书 CLI”开始，到完成配置、测试，并把本地 Excel 导入成飞书多维表格。
tags:
  - AI
  - Codex
  - 飞书
  - CLI
  - 教程
category: 技术教程
draft: false
---

这篇文章按一次真实操作整理。

我没有自己从头研究飞书开放平台，也没有手动敲完整套命令，而是直接把官方文档链接发给 Codex，让它照着文档完成安装、配置、测试，最后还顺手把一个本地 Excel 文件导入成了飞书线上多维表格。

一开始我只发了这样一句话：

```text
# 飞书
帮我安装飞书 CLI: https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md
```

后面的事情，基本就是 Codex 一边查文档、一边执行命令、一边让我在需要人工确认的地方点一下浏览器授权。

这类流程很适合小白：你不需要先理解所有命令，只要知道什么时候该把需求告诉 Codex，什么时候该在浏览器里完成飞书授权。

---

## 先说结论

这次最终跑通了这些东西：

- 安装了飞书 CLI：`lark-cli`
- 安装了飞书 Agent Skills：`lark-doc`、`lark-sheets`、`lark-base` 等 26 个
- 完成了飞书 CLI 应用配置
- 跑通了 `lark-cli doctor`
- 把本地 `.xlsx` 导入成飞书在线表格
- 又按要求导入成飞书多维表格

最后生成的多维表格链接形态是：

```text
https://xxx.feishu.cn/base/xxxxxxxxxxxxxxxx
```

也就是说，整个流程可以概括成：

```text
给 Codex 官方文档链接
-> Codex 安装飞书 CLI
-> 用户在浏览器里授权
-> Codex 验证安装
-> 用户给 Excel 文件
-> Codex 导入飞书线上文档
```

---

## 飞书 CLI 是什么？

飞书 CLI 是飞书开放平台提供的命令行工具，命令名叫：

```text
lark-cli
```

它的作用不是“打开飞书客户端”，而是让本地电脑可以通过命令行调用飞书开放平台能力。

它能做的事情包括：

- 上传本地文件到飞书云空间
- 把 Word、Excel、PPT 导入成飞书在线文档
- 把 Excel 导入成飞书表格
- 把 Excel 导入成飞书多维表格
- 读取和写入飞书表格
- 操作文档、云盘、知识库、日历、消息、任务等
- 配合 Codex 这类 AI Agent 做自动化办公

如果说飞书网页端适合人手动点点点，飞书 CLI 更适合让 AI 或脚本来自动处理。

比如这次我给了一个 Excel，最后 Codex 就能帮我生成飞书多维表格链接。

---

## 飞书 CLI 和 Skill 是一回事吗？

不是。

这次过程中我问了 Codex 一句：

```text
这个是skill吗
```

它解释得比较清楚：

- `lark-cli` 本身是飞书命令行工具，不是 skill
- `larksuite/cli` Agent Skills 是给 Codex、Claude Code 这类 AI Agent 使用的技能说明

可以这样理解：

```text
lark-cli：真正执行飞书操作的工具
Agent Skills：让 Codex 更懂飞书 API 和飞书 CLI 的使用方式
```

所以一套完整体验里，两者最好都装：

- 装 `lark-cli`，让电脑能操作飞书
- 装飞书 skills，让 Codex 更会用它

---

## 第一步：把官方文档链接直接发给 Codex

我的第一条消息是：

```text
# 飞书
帮我安装飞书 CLI: https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md
```

这里最重要的是：不要只说“帮我装一下”，最好把官方文档链接也给它。

这样 Codex 会先打开文档确认当前安装方式，而不是凭旧记忆乱猜。

在这次操作里，Codex 先确认了文档里的核心步骤：

- 全局安装 `@larksuite/cli`
- 安装飞书 CLI 的 Agent Skills
- 使用 `lark-cli config init --new` 初始化配置
- 通过浏览器完成飞书授权
- 使用 `lark-cli doctor` 做健康检查

---

## 第二步：Codex 检查本机 Node 和 npm

飞书 CLI 通过 npm 安装，所以 Codex 先检查了本机有没有 Node.js 和 npm。

它执行了类似命令：

```powershell
node --version
npm --version
lark-cli --version
```

当时结果是：

```text
node: v22.22.0
npm: 10.9.4
lark-cli: 未安装
```

这一步的意义是：先确认地基。

如果你的电脑没有 Node.js，Codex 一般会提醒你先安装 Node.js；如果已经有，就可以继续自动安装飞书 CLI。

---

## 第三步：Codex 安装飞书 CLI

确认环境没问题后，Codex 执行了：

```powershell
npm install -g @larksuite/cli
```

安装完成后，它继续验证：

```powershell
lark-cli --version
lark-cli --help
```

这次得到的版本是：

```text
lark-cli version 1.0.43
```

`lark-cli --help` 里可以看到很多飞书能力入口，比如：

- `drive`
- `sheets`
- `base`
- `docs`
- `wiki`
- `calendar`
- `im`
- `task`
- `approval`

看到这些，就说明 CLI 本体已经装好了。

---

## 第四步：Codex 安装飞书 Agent Skills

接着 Codex 安装了飞书的 Agent Skills：

```powershell
npx skills add larksuite/cli -g -y
```

安装结果显示：

```text
Found 26 skills
Installing all 26 skills
Done!
```

这些 skill 被安装到了类似目录：

```text
C:\Users\你的用户名\.agents\skills
```

里面包括：

```text
lark-approval
lark-apps
lark-base
lark-calendar
lark-contact
lark-doc
lark-drive
lark-im
lark-sheets
lark-slides
lark-task
lark-wiki
...
```

这一步完成后，Codex 后续就更容易理解飞书文档、表格、多维表格这些操作。

---

## 第五步：初始化飞书 CLI 配置

CLI 装好以后，还不能直接操作你的飞书空间。

它需要先在飞书开放平台创建或绑定一个应用。

Codex 执行了：

```powershell
lark-cli config init --new --lang zh_cn
```

这个命令会生成一个浏览器验证链接，类似：

```text
https://open.feishu.cn/page/cli?user_code=XXXX-XXXX&lpv=1.0.43&ocv=1.0.43&from=cli
```

这一步需要用户配合。

Codex 可以帮你打开链接，但飞书登录、确认授权、应用配置这些动作，需要你自己在浏览器里点完。

我当时完成网页授权后，只回复了一句：

```text
完成了
```

Codex 就继续检查配置结果。

---

## 第六步：Codex 做健康检查

授权完成后，Codex 运行：

```powershell
lark-cli doctor
```

当时检查结果里关键项是：

```json
{
  "ok": true,
  "workspace": "local"
}
```

并且显示：

```text
cli_version: pass
config_file: pass
app_resolved: pass
bot_identity: pass
endpoint_open: pass
endpoint_mcp: pass
```

这里有一个小细节：`user_identity` 当时是 missing。

这不是失败。

它表示还没有登录个人用户身份，但 bot 身份已经 ready，可以进行不少机器人或租户 API 调用。

如果后面要访问个人账号拥有的文档，或者希望新建文档自动归到个人权限下，可以再运行：

```powershell
lark-cli auth login
```

---

## 第七步：我给 Codex 一个 Excel 文件

CLI 安装好以后，我给了 Codex 一个本地 Excel 文件路径：

```text
D:/softWare/weChatData/documents/xwechat_files/.../专家中心分工表.xlsx
```

然后我说：

```text
好的，我给你一个xlsx，你给我弄成飞书线上的并给我链接
```

Codex 先做了两件事：

1. 检查这个文件是否存在、大小是多少
2. 查看 `lark-cli drive` 和 `lark-cli sheets` 的相关命令

文件很小，只有几 KB，所以适合直接导入。

---

## 第八步：第一次导入时遇到路径限制

Codex 一开始尝试直接传绝对路径，结果飞书 CLI 返回：

```text
unsafe file path: --file must be a relative path within the current directory
```

这句话的意思是：为了安全，`--file` 不能随便传当前目录外的绝对路径。

解决方式很简单：切换到 Excel 文件所在目录，再用相对路径。

比如：

```powershell
cd "D:\softWare\weChatData\documents\xwechat_files\...\2026-05"
```

然后：

```powershell
lark-cli drive +import --as bot --file ".\专家中心分工表.xlsx" --type sheet --name "专家中心分工表"
```

这个细节很重要。小白如果自己操作，很容易卡在这里。

---

## 第九步：第一次导入时遇到飞书权限不足

导入过程中，又遇到一个飞书开放平台权限问题：

```text
App scope not enabled: required scope docs:document.media:upload
```

这表示当前 CLI 创建的飞书应用还没有“上传媒体文件用于导入文档”的权限。

好在 CLI 会给出一个权限申请链接，类似：

```text
https://open.feishu.cn/page/scope-apply?clientID=cli_xxx&scopes=docs%3Adocument.media%3Aupload
```

Codex 直接帮我打开了这个页面。

我在浏览器里启用权限后，回复：

```text
可以了
```

然后 Codex 继续重试导入。

---

## 第十步：先生成了飞书在线表格

补完权限后，Codex 成功把 Excel 导入成飞书表格。

命令类似：

```powershell
lark-cli drive +import --as bot --file ".\专家中心分工表.xlsx" --type sheet --name "专家中心分工表"
```

成功结果里会有：

```json
{
  "ok": true,
  "data": {
    "type": "sheet",
    "token": "xxxxxxxxxxxxxxxx",
    "url": "https://xxx.feishu.cn/sheets/xxxxxxxxxxxxxxxx"
  }
}
```

这里 `/sheets/` 开头的链接就是飞书在线表格。

但我后面发现，我要的不是普通表格，而是多维表格。

于是我又对 Codex 说：

```text
你给我创建成多维表格
```

---

## 第十一步：重新导入成飞书多维表格

Codex 没有覆盖前面那个表格，而是重新用 `bitable` 类型导入了一次。

核心命令是：

```powershell
lark-cli drive +import --as bot --file ".\专家中心分工表.xlsx" --type bitable --name "专家中心分工表"
```

成功后返回：

```json
{
  "ok": true,
  "data": {
    "type": "bitable",
    "token": "xxxxxxxxxxxxxxxx",
    "url": "https://xxx.feishu.cn/base/xxxxxxxxxxxxxxxx"
  }
}
```

这里 `/base/` 开头的链接，就是飞书多维表格。

Codex 还继续用 inspect 验证了一次：

```powershell
lark-cli drive +inspect --as bot --url "https://xxx.feishu.cn/base/xxxxxxxxxxxxxxxx"
```

确认结果里显示：

```json
{
  "type": "bitable",
  "title": "专家中心分工表"
}
```

这就说明确实生成成了多维表格。

---

## 这套流程里，人需要做什么？

这个过程里，Codex 能做很多事：

- 查官方文档
- 检查本机环境
- 安装 npm 包
- 安装 Agent Skills
- 执行 `lark-cli` 命令
- 读取错误信息
- 打开飞书授权页面
- 重试失败命令
- 导入 Excel
- 验证生成的飞书链接

但人仍然需要做几件事：

- 在飞书网页里登录账号
- 确认 CLI 应用配置
- 开启飞书开放平台提示缺少的权限
- 判断自己要的是表格还是多维表格
- 如果链接权限不够，在飞书里补授权，或登录 user identity

所以它不是“完全不用管”，而是“把复杂命令交给 Codex，人只处理必须人工确认的飞书网页授权”。

---

## 可以直接复制的 Codex 提示词

如果你也想复刻这个流程，可以按下面这样发给 Codex。

### 安装飞书 CLI

```text
# 飞书
帮我安装飞书 CLI: https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md
```

### 授权完成后

```text
完成了
```

### 让 Codex 验证安装

```text
帮我检查飞书 CLI 是否安装和配置成功，跑一下 doctor，并告诉我 bot/user 身份状态。
```

### 把 Excel 变成飞书线上表格

```text
我给你一个 xlsx 文件，请帮我导入成飞书线上表格，并把链接发我。
文件路径：
D:\你的路径\文件名.xlsx
```

### 把 Excel 变成飞书多维表格

```text
请把这个 xlsx 创建成飞书多维表格，不是普通表格，生成后把 base 链接给我。
文件路径：
D:\你的路径\文件名.xlsx
```

### 如果已经生成了普通表格，但想改成多维表格

```text
不对，我要的是飞书多维表格，请你重新创建成多维表格。
```

---

## 小白最容易遇到的坑

### 1. `lark-cli` 和 skill 不是一个东西

`lark-cli` 是命令行工具。

`lark-*` skills 是给 AI Agent 的说明和工作流。

两个都装，体验最好。

### 2. 需要 Node.js 和 npm

如果电脑没有 Node.js，`npm install -g @larksuite/cli` 就跑不起来。

先装 Node.js LTS 版本。

### 3. 飞书 CLI 初始化必须浏览器授权

`lark-cli config init --new` 会生成飞书网页链接。

这一步 Codex 可以帮你打开，但不能替你登录和点击确认。

### 4. Excel 文件路径最好用相对路径

如果看到：

```text
unsafe file path
```

就让 Codex 切到文件所在目录，再用：

```powershell
--file ".\文件名.xlsx"
```

### 5. 缺 scope 很正常

第一次导入时，飞书开放平台应用可能没开对应权限。

看到：

```text
App scope not enabled
```

就打开 CLI 返回的 `console_url`，在飞书开放平台启用权限，再让 Codex 重试。

### 6. bot 创建的文档可能没有自动给你个人权限

如果导入成功但你打不开链接，可能是 bot 身份创建了文档，但没有给你的个人账号授权。

可以让 Codex 帮你：

```text
帮我处理这个飞书文档的访问权限。如果需要 user identity，请引导我登录。
```

---

## 为什么这种方式适合 Codex？

飞书 CLI 这种工具很适合交给 Codex。

原因是它的流程不是单纯一条命令，而是一串判断：

- 文档里的安装命令是不是最新
- 本机有没有 Node.js
- CLI 是否已经存在
- 安装后版本是否正确
- 初始化是否需要浏览器授权
- doctor 哪一项失败
- 导入文件时是路径问题还是权限问题
- 要导入成 `sheet` 还是 `bitable`
- 最终链接是不是对应的文档类型

这些判断让小白自己做，会很容易卡住。

但交给 Codex 后，它可以边执行边读错误，然后告诉你“现在需要你去浏览器点一下授权”。

这就是 AI Agent 真正有用的地方：不是只告诉你命令，而是陪你把事情跑完。

---

## 总结

这次我真正输入的核心需求，其实就几句话：

```text
帮我安装飞书 CLI: 官方文档链接
完成了
给你一个 xlsx，弄成飞书线上的并给我链接
你给我创建成多维表格
```

剩下的安装、检查、报错处理、权限提示、重新导入、类型验证，都是 Codex 在过程中完成的。

如果你也想让 Codex 接入飞书，最推荐的方式不是先自己研究半天命令，而是直接把官方文档链接和目标说清楚：

```text
请按照这份官方文档帮我安装和配置飞书 CLI，完成后帮我跑 doctor 验证。
```

然后等它做到需要你人工确认的地方，再去浏览器里点授权。

对于小白来说，这比传统教程友好很多；对于经常处理飞书资料的人来说，这也意味着以后可以把“本地文件 -> 飞书线上文档 -> AI 继续处理”的链路交给 Codex 来跑。

官方文档：

- [飞书 CLI 安装指南](https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md)
- [larksuite/cli GitHub 仓库](https://github.com/larksuite/cli)

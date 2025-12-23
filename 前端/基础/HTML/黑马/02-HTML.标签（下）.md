![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626247.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626248.jpg)

# 目

# 录 Contents

表格标签  
列表标签  
表单标签  
$\spadesuit$  综合案例  
$\spadesuit$  查阅文档

# 1. 表格标签

表格是实际开发中非常常用的标签：

1. 表格的主要作用
2. 表格的基本语法

# 1. 表格标签

# 1.1 表格的主要作用

表格主要用于显示、展示数据，因为它可以让数据显示的非常的规整，可读性非常好。特别是后台展示数据的时候，能够熟练运用表格就显得很重要。一个清爽简约的表格能够把繁杂的数据表现得很有条理。

Pink老师总结: 表格不是用来布局页面的,而是用来展示数据的.

<table><tr><td>支出项目</td><td>单价(元)</td><td>数目</td><td>金额(元)</td></tr><tr><td>垃圾箱</td><td>30</td><td>12</td><td>360</td></tr><tr><td>垃圾牌</td><td>100</td><td>12</td><td>1200</td></tr><tr><td>宣传单</td><td>0.08</td><td>400</td><td>32</td></tr><tr><td>宣传小册子</td><td>3</td><td>250</td><td>750</td></tr><tr><td>合计</td><td>——</td><td>——</td><td>2342</td></tr></table>

# 1. 表格标签

# 1.2 表格的基本语法

```html
<table> <tr> <td>单元格内的文字</td> ... </tr> .. </table>
```

1. <table> </table> 是用于定义表格的标签。  
2. <tr> </tr> 标签用于定义表格中的行，必须嵌套在 <table> </table> 标签中。  
3. <td> </td> 用于定义表格中的单元格，必须嵌套在<tr></tr>标签中。  
4. 字母 td 指表格数据（table data），即数据单元格的内容。

# 1. 表格标签

# 1.3 表头单元格标签

一般表头单元格位于表格的第一行或第一列，表头单元格里面的文本内容加粗居中显示。

<th> 标签表示 HTML 表格的表头部分(table head 的缩写)

```txt
<table> <tr> <th>姓名</th> ... </tr> .. </table>
```

个人信息表

<table><tr><td>姓名</td><td>性别</td><td>电话</td></tr><tr><td>小王</td><td>女</td><td>110</td></tr><tr><td>小明</td><td>男</td><td>120</td></tr></table>

# 1. 表格标签

# 1.3 表头单元格标签

Pink老师总结:

表头单元格也是单元格, 常用于表格第一行, 突出重要性, 表头单元格里面的文字会加粗居中显示.

# 1. 表格标签

# 1.4 表格属性

表格标签这部分属性我们实际开发我们不常用，后面通过CSS来设置。

目的有2个：

1. 记住这些英语单词,后面 CSS 会使用
2. 直观感受表格的外观形态

<table><tr><td>属性名</td><td>属性值</td><td>描述</td></tr><tr><td>align</td><td>left、center、right</td><td>规定表格相对周围元素的对齐方式。</td></tr><tr><td>border</td><td>1或&quot;&quot;</td><td>规定表格单元是否拥有边框，默认为 &quot;&quot;,表示没有边框</td></tr><tr><td>cellpadding</td><td>像素值</td><td>规定单元边沿与其内容之间的空白，默认1像素。</td></tr><tr><td>cellspacing</td><td>像素值</td><td>规定单元格之间的空白，默认2像素。</td></tr><tr><td>width</td><td>像素值或百分比</td><td>规定表格的宽度。</td></tr></table>

# 1. 表格标签

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626249.jpg)

案例：小说排行榜

<table><tr><td>排名</td><td>关键词</td><td>趋势</td><td>今日搜索</td><td>最近七日</td><td>相关链接</td></tr><tr><td>1</td><td>鬼吹灯</td><td></td><td>345</td><td>123</td><td>贴吧图片百科</td></tr><tr><td>2</td><td>盗墓笔记</td><td></td><td>124</td><td>675432</td><td>贴吧图片百科</td></tr><tr><td>3</td><td>西游记</td><td></td><td>212</td><td>7654</td><td>贴吧图片百科</td></tr><tr><td>4</td><td>东游记</td><td></td><td>23</td><td>75645</td><td>贴吧图片百科</td></tr><tr><td>5</td><td>甄嬛传</td><td></td><td>121</td><td>7676</td><td>贴吧图片百科</td></tr><tr><td>6</td><td>水浒传</td><td></td><td>576576</td><td>1231421</td><td>贴吧图片百科</td></tr><tr><td>7</td><td>三国演义</td><td></td><td>234</td><td>7686</td><td>贴吧图片百科</td></tr></table>

# 1. 表格标签

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626250.jpg)

# 案例分析

# 先制作表格的结构

1. 第一行里面是 th 表头单元格
2. 第二行开始里面是 td 普通单元格
3. 单元格里面可以放任何元素,文字链接图片等都可以

# 后书写表格属性

1. 用到宽度高度边框cellpadding和cellspacing
2. 表格浏览器中对齐 align

<table><tr><td>排名</td><td>关键词</td><td>趋势</td><td>今日搜索</td><td>最近七日</td><td>相关链接</td></tr><tr><td>1</td><td>鬼吹灯</td><td></td><td>345</td><td>123</td><td>贴吧图片百科</td></tr><tr><td>2</td><td>盗墓笔记</td><td></td><td>124</td><td>675432</td><td>贴吧图片百科</td></tr><tr><td>3</td><td>西游记</td><td></td><td>212</td><td>7654</td><td>贴吧图片百科</td></tr><tr><td>4</td><td>东游记</td><td></td><td>23</td><td>75645</td><td>贴吧图片百科</td></tr><tr><td>5</td><td>甄嬛传</td><td></td><td>121</td><td>7676</td><td>贴吧图片百科</td></tr><tr><td>6</td><td>水浒传</td><td></td><td>576576</td><td>1231421</td><td>贴吧图片百科</td></tr><tr><td>7</td><td>三国演义</td><td></td><td>234</td><td>7686</td><td>贴吧图片百科</td></tr></table>

# 1. 表格标签

# 1.5 表格结构标签

使用场景:因为表格可能很长,为了更好的表示表格的语义，可以将表格分割成 表格头部和表格主体两大部分。

在表格标签中，分别用：<thead>标签 表格的头部区域、<tbody>标签 表格的主体区域。这样可以更好的分清表格结构。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626251.jpg)

# 1. 表格标签

# 1.5 表格结构标签

1. <thead></thead>：用于定义表格的头部。<thead> 内部必须拥有 <tr> 标签。一般是位于第一行。  
2. <tbody></tbody>：用于定义表格的主体，主要用于放数据本体。  
3. 以上标签都是放在 <table></table> 标签中。

# 1. 表格标签

# 1.6 合并单元格

特殊情况下,可以把多个单元格合并为一个单元格, 这里同学们会最简单的合并单元格即可.

1. 合并单元格方式
2. 目标单元格
3. 合并单元格的步骤

<table><tr><td colspan="5">个人简历</td></tr><tr><td>姓名:</td><td></td><td>性别:</td><td></td><td rowspan="4">照片</td></tr><tr><td>婚姻状况:</td><td></td><td>出生年月:</td><td></td></tr><tr><td>民族:</td><td></td><td>政治面貌:</td><td></td></tr><tr><td>身高:</td><td></td><td>学历:</td><td></td></tr></table>

# 1. 表格标签

# 1.6 合并单元格

# 合并单元格方式：

- 跨行合并：rowspan="合并单元格的个数"
- 跨列合并：colspan="合并单元格的个数"

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626252.jpg)

# 1. 表格标签

# 1.6 合并单元格

# 目标单元格：(写合并代码)

- 跨行：最上侧单元格为目标单元格，写合并代码
- 跨列：最左侧单元格为目标单元格，写合并代码

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626253.jpg)

# 1. 表格标签

# 1.6 合并单元格

# 合并单元格三步曲：

1. 先确定是跨行还是跨列合并。
2. 找到目标单元格. 写上合并方式 = 合并的单元格数量。比如：<td colspan="2"><td>
3. 删除多余的单元格。

# 1. 表格标签

# 1.7 表格总结

表格学习整体可以分为三大部分：

1. 表格的相关标签
2. 表格的相关属性
3. 合并单元格

# 1. 表格标签

# 1.7 表格总结

# 1. 表格的相关标签

我们学习了 table 标签 tr 行标签 td 单元格标签 th 表头单元格标签 thead 表格头部区域标签

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626254.jpg)

tbody 表格主体区域标签

# 1. 表格标签

# 1.7 表格总结

# 2. 表格的相关属性

<table><tr><td>属性名</td><td>属性值</td><td>描述</td></tr><tr><td>align</td><td>left、center、right</td><td>规定表格相对周围元素的对齐方式。</td></tr><tr><td>border</td><td>1或&quot;&quot;</td><td>规定表格单元是否拥有边框，默认为&quot;&quot;，表示没有边框</td></tr><tr><td>cellpadding</td><td>像素值</td><td>规定单元边沿与其内容之间的空白，默认1像素。</td></tr><tr><td>cellspacing</td><td>像素值</td><td>规定单元格之间的空白，默认2像素。</td></tr><tr><td>width</td><td>像素值或百分比</td><td>规定表格的宽度。</td></tr></table>

# 1. 表格标签

# 1.7 表格总结

# 3. 合并单元格

<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>

# 录 Contents

三

表格标签  
列表标签  
表单标签  
$\spadesuit$  综合案例  
$\spadesuit$  查阅文档

# 2.列表标签

表格是用来显示数据的，那么列表就是用来布局的。

列表最大的特点就是整齐、整洁、有序，它作为布局会更加自由和方便。

根据使用情景不同，列表可以分为三大类：无序列表、有序列表和自定义列表。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626255.jpg)  
无序列表

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626256.jpg)  
有序列表

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626257.jpg)  
自定义列表

# 2.列表标签

# 2.1 无序列表（重点）

<ul> 标签表示 HTML 页面中项目的无序列表，一般会以项目符号呈现列表项，而列表项使用 <li> 标签定义。

无序列表的基本语法格式如下：

```txt
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
    ...
</ul>
```

1. 无序列表的各个列表项之间没有顺序级别之分，是并列的。
2. <ul></ul> 中只能嵌套 <li></li>，直接在 <ul></ul> 标签中输入其他标签或者文字的做法是不被允许的。  
3. <li> 与 </li> 之间相当于一个容器，可以容纳所有元素。  
4. 无序列表会带有自己的样式属性，但在实际使用时，我们会使用 CSS 来设置。

# 2.列表标签

# 2.2 有序列表（理解）

有序列表即为有排列顺序的列表，其各个列表项会按照一定的顺序排列定义。

在 HTML 标签中，<ol> 标签用于定义有序列表，列表排序以数字来显示，并且使用 <li> 标签来定义列表项。

有序列表的基本语法格式如下：

```txt
<ol> <1i>列表项1</1i> <1i>列表项2</1i> <1i>列表项3</1i> .. </ol>
```

1. <ol></ol>中只能嵌套<li></li>，直接在<ol></ol>标签中输入其他标签或者文字的做法是不被允许的。  
2. <li>与</li>之间相当于一个容器，可以容纳所有元素。  
3. 有序列表会带有自己样式属性，但在实际使用时，我们会使用 CSS 来设置。

# 2.列表标签

# 2.3 自定义列表（重点）

自定义列表的使用场景：

自定义列表常用于对术语或名词进行解释和描述，定义列表的列表项前没有任何项目符号。

帮助中心

账户管理

购物指南

订单操作

服务支持

售后政策

自助服务

相关下载

线下门店

小米之家

服务网点

零售网点

关于小米

了解小米

加入小米

联系我们

关注我们

新浪微博

小米部署

官方微信

特色服务

F码通道

礼物码

防伪查询

# 2.列表标签

# 2.3 自定义列表（重点）

在 HTML 标签中，<dl> 标签用于定义描述列表（或定义列表），该标签会与 <dt>（定义项目/名字）和 <dd>（描述每一个项目/名字）一起使用。

其基本语法如下：

```txt
$<  \mathrm{d}1>$  <dt>名词1</dt> <dd>名词1解释1</dd> <dd>名词1解释2</dd> </dl>
```

1. <dl>></dl> 里面只能包含 <dt> 和 <dd>。  
2. <dt> 和 <dd> 个数没有限制，经常是一个<dt> 对应多个<dd>。

# 2.列表标签

# 2.3 自定义列表（重点）

在 HTML 标签中，<dl> 标签用于定义描述列表（或定义列表），该标签会与 <dt>（定义项目/名字）和 <dd>（描述每一个项目/名字）一起使用。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626258.jpg)

# 2.列表标签

# 2.4列表总结

<table><tr><td>标签名</td><td>定义</td><td>说明</td></tr><tr><td>&lt;ul&gt;&lt;/ul&gt;</td><td>无序标签</td><td>里面只能包含li 没有顺序，使用较多。li里面可以包含任何标签</td></tr><tr><td>&lt;ol&gt;&lt;/ol&gt;</td><td>有序标签</td><td>里面只能包含li 有顺序，使用相对较少。li里面可以包含任何标签</td></tr><tr><td>&lt;dl&gt;&lt;/dl&gt;</td><td>自定义列表</td><td>里面只能包含dt 和 dd 。 dt和dd里面可以放任何标签</td></tr></table>

# 注意：

1. 学会什么时候用无序列表，什么时候用自定义列表。
2. 无序列表和自定义列表代码怎么写？
3. 列表布局在学习完 CSS 后再来完成。

# 录 Contents

三

表格标签  
列表标签  
表单标签  
$\spadesuit$  综合案例  
$\spadesuit$  查阅文档

# 3. 表单标签

现实中的表单，我们去银行办理信用卡填写的单子。

交通银行

HSBC

# 太平洋信用卡业务申请表

签约用户基本信息（必填）

<table><tr><td>签约信用卡卡号:</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>姓名:</td><td></td><td>性别:</td><td></td><td colspan="5">联系电话:</td></tr><tr><td>证件类型:</td><td colspan="8">□居民身份证 □军人身份证 □护照 □其他</td></tr><tr><td colspan="9">证件号码:</td></tr><tr><td colspan="9">证件有效期:截止日期 年 月 日 成长期有效</td></tr></table>

信用卡电子渠道服务

<table><tr><td rowspan="2">网上银行
□开通
□修改
□关闭</td><td colspan="2">短信密码用户：□申请 □网银登录密码重置 □变更为证书认证用户
手机号（短信密码用户必填）：
证书认证用户：□证书申请 □证书恢复 □证书注销
□领用:□G8key □变更为短信密码用户</td></tr><tr><td colspan="2">关联关系：□建立 □注销
关联卡号：_</td></tr><tr><td>手机银行
□开通
□修改
□关闭</td><td>签约手机号（必填）：</td><td>客户应在“手机号码”栏中选择“激活”，“激活”后可于2023年1月16日（含当日）前通过微信营业厅办理变更手机号码的后续手续，否则将无法使用该功能。</td></tr></table>

信用还款功能服务

<table><tr><td colspan="6">自助退换证单</td></tr><tr><td>□开通</td><td rowspan="2">借记卡卡号</td><td></td><td></td><td></td><td rowspan="2">如果客户已在“密码激活后”打印或“弹出“密码”或“水”卡，或者希望将账户或账号或其他功能通过其网上交易系统进行交易，如需要，请在回执中注明具体交易方式，填写交易类型和金额。若未填写或提供的信息不完整、持有人未能提供有效身份证件或护照等资料，或交易账户或账号未能被识别，将被视为无效交易。</td></tr><tr><td>□关闭</td><td></td><td></td><td></td></tr><tr><td>贷记卡</td><td>借记卡卡号</td><td></td><td></td><td></td><td></td></tr><tr><td colspan="6">自助转账还款单</td></tr><tr><td>□开通</td><td rowspan="2">还款金额</td><td>全额还款</td><td>最低还款额</td><td>扣款方式</td><td rowspan="2"></td></tr><tr><td>□关闭</td><td>扣款方式</td><td>到期还款日扣款</td><td>两次扣款</td></tr></table>

信用卡自助转账功能服务

<table><tr><td>□开通 □关闭
自助转账受理渠道：注册版网上银行、注册版手机银行、电话银行。</td><td>如果客户“账户卡被冻结或暂停服务”栏下选择“漏”或“无”，则代表余额被冻结或无法赎回账户开户失败，提示信息；提示余额被冻结或无法赎回银行账户开户失败，提示信息；提示余额被冻结或无法赎回银行开户失败，提示信息；提示个人理财的受托理财金额或余额为0元，提示信息</td></tr></table>

# 备注：

1.本表所列太平洋信用卡包括交行储蓄贷记卡及中行专户次为62284的交行储蓄贷记卡，其中自助渠道还款及自助转款业务仅限用于主卡持有人申请，自动转款还款业务仅限于主卡持有人申请。

2本表中所填销记卡、准销记卡、借记卡的持卡人需为签约客户本人，否则相关申请视为无效申请。

3.1以上填写内容务必清断精确，如发生号码填写错误或业务功能选择错误，后果由申请人自负。

4.交通村镇银行借记卡无法签订美元自动还款协议。

5.网上银行登录网址：www.bankcomm.com或

creditcard.bankcomm.com

# 声明及签署：

账单上以填写资料全无属实。唐银行已根据有关人员申请的业务，向本人提供了业务办理使用的《交通银行股份有限公司电子个人电子银行服务协议》（以下简称“《电子服务协议》”）和《交通银行电子服务协议》（以下简称“《电子服务协议》”）。该电子服务协议未与本行其他助记协议》和《交通银行太平洋信用卡自助转帐业务条款》并应本人要求对相关内容进行了说明。本人已全部阅读并周密遵守香港银行关于向本行提供的各项协议，任何未经银行予以公告方式均违反协议进行披露。若因未履行上述义务而导致的一切后果由本人自行承担，由此产生的责任和义务由我行及第三方共同负责成立的从事于该业务的任何法律关系人承担。

申请人签名：

日期： 年 月 日

# 3. 表单标签

# 网页中的表单展示

# 青春不常在，抓紧谈恋爱

花点时间填写真实信息，我们会让结果更合您的心意。

我是

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626259.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626260.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626261.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626262.jpg)

*注册后修改需联系客服

生日

请选择

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626263.jpg)

请选择 月

请选择

*注册后修改需联系客服

常住地

请选择

婚姻状况

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626264.jpg)

未婚

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626265.jpg)

离异

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626266.jpg)

丧偶

*注册后修改需联系客服

身高

请选择

学历

请选择

月薪

请选择

# 3. 表单标签

# 网页中的表单展示

1. 为什么需要表单
2. 表单的组成

# 3. 表单标签

# 3.1 为什么需要表单

使用表单目的是为了收集用户信息。

在我们网页中，我们也需要跟用户进行交互，收集用户资料，此时就需要表单。

# 3. 表单标签

# 3.2 表单的组成

在 HTML 中, 一个完整的表单通常由表单域、表单控件（也称为表单元素）和提示信息3个部分构成。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626267.jpg)

# 3. 表单标签

# 3.3 表单域

表单域是一个包含表单元素的区域。

在 HTML 标签中，<form>标签用于定义表单域，以实现用户信息的收集和传递。

<form>会把它范围内的表单元素信息提交给服务器

```txt
<form action="url地址" method="提交方式" name="表单域名称">各种表单元素控件</form>
```

常用属性：

<table><tr><td>属性</td><td>属性值</td><td>作用</td></tr><tr><td>action</td><td>url地址</td><td>用于指定接收并处理表单数据的服务器程序的url地址。</td></tr><tr><td>method</td><td>get/post</td><td>用于设置表单数据的提交方式，其取值为get或post。</td></tr><tr><td>name</td><td>名称</td><td>用于指定表单的名称，以区分同一个页面中的多个表单域。</td></tr></table>

# 3. 表单标签

# 3.3 表单域

基础班来说，我们暂时不用表单域提交数据，只需要写上 form 标签即可。就业班等学习服务器编程阶段会重新讲解。这里只需要记住两点：

1. 在我们写表单元素之前,应该有个表单域把他们进行包含。
2. 表单域是 form标签

# 3. 表单标签

# 3.2 表单的组成

在 HTML 中，一个完整的表单通常由表单域、表单控件（也称为表单元素）和提示信息3个部分构成。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626268.jpg)

# 3. 表单标签

# 3.4 表单控件(表单元素)

在表单域中可以定义各种表单元素，这些表单元素就是允许用户在表单中输入或者选择的内容控件。

接下来我们讲解：

1. input输入表单元素
2. select下拉表单元素
3. textarea 文本域元素

# 3. 表单标签

# 3.4.1 <input> 表单元素

在英文单词中，input 是输入的意思，而在表单元素中 <input> 标签用于收集用户信息。

在 `<input>` 标签中，包含一个 type 属性，根据不同的 type 属性值，输入字段拥有很多种形式（可以是文本字段、复选框、掩码后的文本控件、单选按钮、按钮等）。

```xml
<input type="属性值" />
```

- <input /> 标签为单标签  
- type 属性设置不同的属性值用来指定不同的控件类型

# 3. 表单标签

# 3.4.1 <input> 表单元素

type 属性的属性值及其描述如下：

<table><tr><td>属性值</td><td>描述</td></tr><tr><td>button</td><td>定义可点击按钮（多数情况下，用于通过JavaScript启动脚本）。</td></tr><tr><td>checkbox</td><td>定义复选框。</td></tr><tr><td>file</td><td>定义输入字段和&quot;浏览&quot;按钮，供文件上传。</td></tr><tr><td>hidden</td><td>定义隐藏的输入字段。</td></tr><tr><td>image</td><td>定义图像形式的提交按钮。</td></tr><tr><td>password</td><td>定义密码字段。该字段中的字符被掩码。</td></tr><tr><td>radio</td><td>定义单选按钮。</td></tr><tr><td>reset</td><td>定义重置按钮。重置按钮会清除表单中的所有数据。</td></tr><tr><td>submit</td><td>定义提交按钮。提交按钮会把表单数据发送到服务器。</td></tr><tr><td>text</td><td>定义单行的输入字段，用户可在其中输入文本。默认宽度为20个字符。</td></tr></table>

# 3. 表单标签

# 3.4.1 <input> 表单元素

除 type 属性外，<input>标签还有其他很多属性，其常用属性如下：

<table><tr><td>属性</td><td>属性值</td><td>描述</td></tr><tr><td>name</td><td>由用户自定义</td><td>定义 input 元素的名称。</td></tr><tr><td>value</td><td>由用户自定义</td><td>规定 input 元素的值。</td></tr><tr><td>checked</td><td>checked</td><td>规定此 input 元素首次加载时应当被选中。</td></tr><tr><td>maxlength</td><td>正整数</td><td>规定输入字段中的字符的最大长度。</td></tr></table>

1. name 和value 是每个表单元素都有的属性值,主要给后台人员使用。
2. name 表单元素的名字, 要求 单选按钮和复选框要有相同的name值。
3. checked属性主要针对于单选按钮和复选框, 主要作用一打开页面, 就要可以默认选中某个表单元素。
4. maxlength 是用户可以在表单元素输入的最大字符数, 一般较少使用.

# 3. 表单标签

# 3.4.1 <input> 表单元素

1. 有些表单元素想刚打开页面就默认显示几个文字怎么做？

答: 可以给这些表单元素设置 value 属性  $=$  “值”

用户名：<input type="text" value="请输入用户名"/>

# 3. 表单标签

# 3.4.1 <input> 表单元素

2. 页面中的表单元素很多，如何区别不同的表单元素？

答：name属性：当前input表单的名字，后台可以通过这个name属性找到这个表单。页面中的表单很多，name的主要作用就是用于区别不同的表单。

用户名：<input type="text" value="请输入用户名" name="username" />

- name 属性后面的值，是自定义的
- radio (或者 checkbox) 如果是一组，我们必须给他们命名相同的名字

<input type="radio" name="sex" />男

<input type="radio" name="sex" />女

# 3. 表单标签

# 3.4.1 <input> 元素

3. 如果页面一打开就让某个单选按钮或者复选框是选中状态？

答: checked 属性：表示默认选中状态。用于单选按钮和复选按钮。

性别：

```html
<input type="radio" name="sex" value="男" checked="checked" />男  
<input type="radio" name="sex" value="女" />女
```

# 3. 表单标签

# 3.4.1 <input> 元素

4.如何让input表单元素展示不同的形态？比如单选按钮或者文本框

答: type属性 : type属性可以让input表单元素设置不同的形态

```html
<input type="radio" name="sex" value="男" checked="checked" />男  
<input type="text" value="请输入用户名">
```

# 3. 表单标签

# 3.4.2 <label> 标签

<label> 标签为 input 元素定义标注（标签）。

<label>标签用于绑定一个表单元素,当点击标签内的文本时，浏览器就会自动将焦点(光标)转到或者选择对应的表单元素上,用来增加用户体验.

# 语法：

```asp
<label for="sex">男</label>  
<input type="radio" name="sex" id="sex"/>
```

核心：<label>标签的for属性应当与相关元素的id属性相同。

# 3. 表单标签

# 3.4 表单控件(表单元素)

在表单域中可以定义各种表单元素，这些表单元素就是允许用户在表单中输入或者选择的内容控件。

接下来我们讲解：

1. input输入表单元素
2. select下拉表单元素
3. textarea 文本域元素

# 3. 表单标签

# 3.4.3 <select> 表单元素

使用场景：在页面中，如果有多个选项让用户选择，并且想要节约页面空间时，我们可以使用<select>标签控件定义下拉列表。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626269.jpg)

# 3. 表单标签

# 3.4.3 <select> 表单元素

在页面中，如果有多个选项让用户选择，并且想要节约页面空间时，我们可以使用<select>标签控件定义下拉列表。

# 语法：

```html
<select> <option>选项1</option> <option>选项2</option> <option>选项3</option> </select>
```

1. <select> 中至少包含一对<option>。  
2. 在<option>中定义 selected = "selected" 时，当前项即为默认选中项。

# 3. 表单标签

# 3.4 表单控件(表单元素)

在表单域中可以定义各种表单元素，这些表单元素就是允许用户在表单中输入或者选择的内容控件。

接下来我们讲解：

1. input输入表单元素
2. select下拉表单元素
3. textarea 文本域元素

# 3. 表单标签

# 3.4.4 <textarea> 表单元素

使用场景：当用户输入内容较多的情况下，我们就不能使用文本框表单了，此时我们可以使用 <textarea> 标签。

在表单元素中，<textarea>标签是用于定义多行文本输入的控件。

使用多行文本输入控件，可以输入更多的文字，该控件常见于留言板，评论。

# 3. 表单标签

# 3.4.4 <textarea> 表单元素

# 语法：

```xml
<textarea rows="3" cols="20">文本内容</textarea>
```

1. 通过 <textarea> 标签可以轻松地创建多行文本输入框。
2. cols = “每行中的字符数”，rows = “显示的行数”，我们在实际开发中不会使用，都是用 CSS 来改变大小。

# 3. 表单标签

# 3.5 表单元素几个总结点

1. 表单元素我们学习了三大组 input 输入表单元素 select 下拉表单元素 textarea 文本域表单元素。
2. 这三组表单元素都应该包含在form表单域里面,并且有name属性。

```xml
<form>
    <input type="text" name="username">
        <select name="jiguan">
            <option>北京</option>
        </select>
    <textarea name="message"></textarea>
</form>
```

# 3. 表单标签

# 3.5 表单元素几个总结点

3. 有三个名字非常相似的标签:

(1) 表单域 form 使用场景: 提交区域内表单元素给后台服务器  
(2) 文件域 file 是input type 属性值使用场景: 上传文件  
(3) 文本域 textarea 使用场景: 可以输入多行文字, 比如留言板 网站介绍等...

4. 我们当前阶段不需要提交表单元素,所以我们只负责表单元素的外观形态即可.

# 录 Contents

三

表格标签  
列表标签  
表单标签  
综合案例  
$\spadesuit$  查阅文档

# 4. 综合案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626270.jpg)

# 案例：注册页面

综合案例主要练习今日所学标签：

1. 表格标签, 可以让内容排列整齐。  
   2.列表标签
3. 表单标签

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626271.jpg)

# 青春不常在，抓紧谈恋爱

性别

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626272.jpg)

男

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626273.jpg)

女

--请选择年--

--请选择月--

--请选择日--

生日

所在地区

北京思密达

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626274.jpg)

未婚

O

已婚

#

离婚

学历

喜欢的类型

幼儿园

妩媚的

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626275.jpg)

可爱的

小鲜肉

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626276.jpg)

老腊肉

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626277.jpg)

都喜欢

自我介绍

自我介绍

免费注册

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626278.jpg)

我同意注册条款和会员加入标准

我是会员，立即登录

# 我承诺

年满18岁、单身

- 抱着严肃的态度  
  真诚寻找另一半

# 录 Contents

三

表格标签  
列表标签  
表单标签  
$\spadesuit$  综合案例  
查阅文档

# 5. 查阅文档

经常查阅文档是一个非常好的学习习惯。

推荐的网址：

- 百度: http://www.baidu.com  
  W3C: http://www.w3school.com.cn/
- MDN: https://developer.mozilla.org/zh-CN/

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002626279.jpg)

# 黑马程序员

www.ittheima.com

传智播客旗下高端IT教育品牌
![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245010.jpg)

# 目录 Contents

$\Leftrightarrow$  响应式开发  
Bootstrap前端开发框架  
Bootstrap栅格系统  
$\spadesuit$  阿里百秀首页案例

# 1. 响应式开发

# 1.1 响应式开发原理

就是使用媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同设备的目的。

<table><tr><td>设备划分</td><td>尺寸区间</td></tr><tr><td>超小屏幕（手机）</td><td>&lt; 768px</td></tr><tr><td>小屏设备（平板）</td><td>&gt;= 768px ~ &lt; 992px</td></tr><tr><td>中等屏幕（桌面显示器）</td><td>&gt;= 992px ~ &lt;1200px</td></tr><tr><td>宽屏设备（大桌面显示器）</td><td>&gt;= 1200px</td></tr></table>

# 1. 响应式开发

# 1.2 响应式布局容器

响应式需要一个父级做为布局容器，来配合子级元素来实现变化效果。

原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式变化。

# 平时我们的响应式尺寸划分

- 超小屏幕（手机，小于768px）：设置宽度为  $100\%$  
  小屏幕 (平板, 大于等于 768px) : 设置宽度为  $750 \mathrm{px}$
- 中等屏幕（桌面显示器，大于等于992px）：宽度设置为970px
- 大屏幕（大桌面显示器，大于等于1200px）：宽度设置为1170px

但是我们也可以根据实际情况自己定义划分

# 1. 响应式开发

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245011.jpg)

# 案例：响应式导航

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245012.jpg)

# 1. 响应式开发

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245013.jpg)

# 案例：需求分析

(1) 当我们屏幕大于等于800像素, 我们给nav宽度为  $800 \mathrm{px}$ , 因为里面子盒子需要浮动, 所以nav需要清除浮动。  
(2) nav里面包含8个小li 盒子, 每个盒子的宽度定为  $100 \mathrm{px}$ , 高度为  $30 \mathrm{px}$ , 浮动一行显示。  
(3) 当我们屏幕缩放, 宽度小于800像素的时候, nav盒子宽度修改为  $100\%$  宽度。  
(4) nav里面的8个小li，宽度修改为  $33.33\%$  ，这样一行就只能显示3个小li，剩余下行显示。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245014.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245015.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245016.jpg)  
装修公司可以帮我们快速完成装修

# 目录 Contents

$\spadesuit$  响应式开发  
Bootstrap前端开发框架  
Bootstrap栅格系统  
$\spadesuit$  阿里百秀首页案例

# 2. Bootstrap前端开发框架

# 2.1 Bootstrap简介

Bootstrap 来自 Twitter（推特），是目前最受欢迎的前端框架。Bootstrap 是基于 HTML、CSS 和 JAVASCRIPT 的，它简洁灵活，使得 Web
开发更加快捷。

- 中文官网：http://www.bootcss.com/
- 官网：http://getbootstrap.com/
- 推荐使用：http://bootstrap.css88.com/

框架：顾名思义就是一套架构，它有一套比较完整的网页功能解决方案，而且控制权在框架本身，有预制样式库、组件和插件。使用者要按照框架所规定的某种规范进行开发。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245017.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245018.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245019.jpg)  
装修公司类似于框架

# 2. Bootstrap前端开发框架

# 2.1 Bootstrap简介

# 1. 优点

- 标准化的html+css编码规范  
  提供了一套简洁、直观、强悍的组件
- 有自己的生态圈，不断的更新迭代
- 让开发更简单，提高了开发的效率

# 2. Bootstrap前端开发框架

# 2.1 Bootstrap简介

# 2. 版本

2.x.x: 停止维护,兼容性好,代码不够简洁,功能不够完善。

- 3.x.x：目前使用最多，稳定，但是放弃了IE6-IE7。对IE8支持但是界面效果不好，偏向用于开发响应式布局、移动设备优先的WEB项目。  
  4.x.x：最新版，目前还不是很流行

# 2.Bootstrap前端开发框架

# 2.2 Bootstrap 使用

在现阶段我们还没有接触JS相关课程，所以我们只考虑使用它的样式库。

控制权在框架本身，使用者要按照框架所规定的某种规范进行开发。

Bootstrap 使用四步曲：1. 创建文件夹结构 2. 创建 html 骨架结构 3. 引入相关样式文件 4. 书写内容

# 1. 创建文件夹结构

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245020.jpg)

# 2. Bootstrap前端开发框架

# 2.2 Bootstrap 使用

在现阶段我们还没有接触JS相关课程，所以我们只考虑使用它的样式库。

Bootstrap 使用四步曲：1. 创建文件夹结构 2. 创建 html 骨架结构 3. 引入相关样式文件 4. 书写内容

# 2. 创建html骨架结构

```html
<!--要求当前网页使用IE浏览器最高版本的内核来渲染--> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--视口的设置：视口的宽度和设备一致，默认的缩放比例和PC端一致，用户不能自行缩放--> <meta name="viewport" content="width  $\equiv$  device-width,initial-scale  $= 1$  ，user-scalable  $= 0$  " > <!--[if lt IE 9] > <!--解决ie9以下浏览器对html5新增标签的不识别，并导致CSS不起作用的问题--> <script src  $\equiv$  "https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js></script> <!--解决ie9以下浏览器对css3 Media Query的不识别--> <script src  $\equiv$  "https://oss.maxcdn.com/respond/1.4.2/respond.min.js></script> <!--endif]-->
```

# 2. Bootstrap前端开发框架

# 2.2 Bootstrap 使用

在现阶段我们还没有接触JS相关课程，所以我们只考虑使用它的样式库。

Bootstrap 使用四步曲：1. 创建文件夹结构 2. 创建 html 骨架结构 3. 引入相关样式文件 4. 书写内容

# 3. 引入相关样式文件

```txt
<!-- Bootstrap 核心样式--->  
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
```

# 2. Bootstrap前端开发框架

# 2.2 Bootstrap 使用

在现阶段我们还没有接触JS相关课程，所以我们只考虑使用它的样式库。

Bootstrap 使用四步曲：1. 创建文件夹结构 2. 创建 html 骨架结构 3. 引入相关样式文件 4. 书写内容

# 4. 书写内容

- 直接拿Bootstrap预先定义好的样式来使用
- 修改Bootstrap 原来的样式，注意权重问题  
  学好Bootstrap的关键在于知道它定义了哪些样式，以及这些样式能实现什么样的效果

# 2. Bootstrap前端开发框架

# 2.3 布局容器

Bootstrap 需要为页面内容和栅格系统包裹一个 .container 容器，它提供了两个作此用处的类。

# 1. container 类

- 响应式布局的容器 固定宽度
- 大屏（>=1200px）宽度定为 1170px
- 中屏（>=992px）宽度定为 970px
- 小屏（>=768px） 宽度定为 750px
- 超小屏 (100%)

# 2. container-fluid 类

流式布局容器百分百宽度

- 占据全部视口（viewport）的容器。

# 目录 Contents

$\spadesuit$  响应式开发  
Bootstrap前端开发框架  
Bootstrap栅格系统  
$\spadesuit$  阿里百秀首页案例

# 3. Bootstrap 栅格系统

# 3.1 栅格系统简介

栅格系统英文为“grid systems”，也有人翻译为“网格系统”，它是指将页面布局划分为等宽的列，然后通过列数的定义来模块化页面布局。

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多 12 列。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245021.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245022.jpg)

# 3. Bootstrap 栅格系统

# 3.2 栅格选项参数

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。

<table><tr><td></td><td>超小屏幕(手机)&lt;768px</td><td>小屏设备(平板)&gt;=768px</td><td>中等屏幕(桌面显示器)&gt;=992px</td><td>宽屏设备(大桌面显示器)&gt;=1200px</td></tr><tr><td>container 最大宽度</td><td>自动(100%)</td><td>750px</td><td>970px</td><td>1170px</td></tr><tr><td>类前缀</td><td>.col-xs-</td><td>.col-sm-</td><td>.col-md-</td><td>.col-lg-</td></tr><tr><td>列 (column) 数</td><td colspan="4">12</td></tr></table>

- 按照不同屏幕划分为1~12等份
- 行 (row) 可以去除父容器作用15px的边距
- xs-extra small: 超小; sm-small: 小; md-medium: 中等; lg-large: 大;
- 列 (column) 大于 12, 多余的 “列 (column)” 所在的元素将被作为一个整体另起一行排列
- 每一列默认有左右15像素的padding  
  可以同时为一列指定多个设备的类名，以便划分不同份数例如class="col-md-4 col-sm-6"

# 3. Bootstrap 栅格系统

# 3.3列嵌套

栅格系统内置的栅格系统将内容再次嵌套。简单理解就是一个列内再分成若干份小列。我们可以通过添加一个新的 .row 元素和一系列
.col-sm-* 元素到已经存在的 .col-sm-* 元素内。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245023.jpg)

```txt
<!-- 列嵌套 -->
<div class="col-sm-4">
    <div class="row">
        <div class="col-sm-6">小列</div>
        <div class="col-sm-6">小列</div>
    </div>
</div>
```

# 3. Bootstrap 栅格系统

# 3.4列偏移

使用 .col-md-offset-* 类可以将列向右侧偏移。这些类实际是通过使用 * 选择器为当前元素增加了左侧的边距（margin）。

# 左侧

# 右侧

```txt
<!-- 列偏移 -->
<div class="row">
    <div class="col-lg-4">1</div>
    <div class="col-lg-4 col-lg-offset-4">2</div>
</div>
```

# 3. Bootstrap 栅格系统

# 3.5列排序

通过使用 .col-md-push-* 和 .col-md-pull-* 类就可以很容易的改变列 (column) 的顺序。

左侧

右侧

右侧

左侧

```txt
<!-- 列排序 -->
<div class="row">
    <div class="col-lg-4" col-lg-push-8">左侧</div>
    <div class="col-lg-8" col-lg-pull-4">右侧</div>
</div>
```

# 3. Bootstrap 栅格系统

# 3.6响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。

<table><tr><td>类名</td><td>超小屏</td><td>小屏</td><td>中屏</td><td>大屏</td></tr><tr><td>隐藏</td><td>可见</td><td>可见</td><td>可见</td><td>可见</td></tr><tr><td>可见</td><td>隐藏</td><td>可见</td><td>可见</td><td>可见</td></tr><tr><td>可见</td><td>可见</td><td>隐藏</td><td>可见</td><td>可见</td></tr><tr><td>可见</td><td>可见</td><td>可见</td><td>可见</td><td>隐藏</td></tr></table>

Bootstrap 其他（按钮、表单、表格）请参考Bootstrap 文档。

# 目录 Contents

$\spadesuit$  响应式开发  
Bootstrap前端开发框架  
Bootstrap栅格系统  
$\Leftrightarrow$  阿里百秀首页案例

# 4. 阿里百秀首页案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245024.jpg)

# 案例：阿里百秀移动端首页

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245025.jpg)

# 4. 阿里百秀首页案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245026.jpg)

# 案例：阿里百秀移动端首页

# 技术选型

方案：我们采取响应式页面开发方案

技术：bootstrap框架

设计图：本设计图采用1280px设计尺寸

# 4. 阿里百秀首页案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245027.jpg)

# 案例：需求分析

# 1. 页面布局分析

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245028.jpg)

# 4. 阿里百秀首页案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245029.jpg)

# 案例：需求分析

# 2.屏幕划分分析

① 屏幕缩放发现中屏幕和大屏幕布局是一致的。因此我们列定义为col-md- 就可以了，md是大于等于970以上的  
② 屏幕缩放发现 小屏幕 布局发生变化，因此我们需要为 小屏幕根据需求改变布局  
③ 屏幕缩放发现 超小屏幕布局又发生变化，因此我们需要为超小屏幕根据需求改变布局  
(4) 策略：我们先布局 md以上的 pc端布局，最后根据实际需求在修改小屏幕和超小屏幕的特殊布局样式

# 4. 阿里百秀首页案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245030.jpg)

# 案例：页面制作

Bootstrap 使用四步曲：1. 创建文件夹结构 2. 创建 html 骨架结构 3. 引入相关样式文件 4. 书写内容

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245031.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245032.jpg)

# 4. 阿里百秀首页案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245033.jpg)

# 案例：页面制作

# container 宽度修改

因为本效果图采取 1280 的宽度，而Bootstrap 里面 container 宽度 最大为 1170px，因此我们需要手动改下container 宽度

```javascript
/\*利用媒体查询修改container宽度适合效果图宽度\*/ @media(min-width:1280px){ .container{ width:1280px; 1
```

# 5. 移动端布局总结

# 5.1 移动端主流方案

# 1. 单独制作移动端页面（主流）

京东商城手机版

淘宝触屏版

苏宁易购手机版

··

# 2.响应式页面兼容移动端 (其次)

三星手机官网

···

# 5. 移动端布局总结

# 5.2移动端技术选型

- 流式布局 (百分比布局)  
  flex弹性布局 (推荐)
- rem适配布局（推荐）  
  $\bullet$  响应式布局

建议：我们选取一种主要技术选型，其他技术做为辅助，这种混合技术开发

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004245034.jpg)

# 黑马程序员

www.itheima.com

传智播客旗下高端IT教育品牌
![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205791.jpg)

# HTML5 和 CSS3 提高

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205792.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205793.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205794.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205795.jpg)

#  #

# 录 Contents

HTML5 的新特性  
$\spadesuit$  CSS3 的新特性

# 1. HTML5 的新特性

HTML5 的新增特性主要是针对于以前的不足，增加了一些新的标签、新的表单和新的表单属性等。

这些新特性都有兼容性问题，基本是IE9+以上版本的浏览器才支持，如果不考虑兼容性问题，可以大量使用这些新特性。

声明：

1. 新特性增加了很多，但是我们专注于开发常用的新特性。
2. 基础班我们讲解部分新特性，到了就业班还会继续讲解其他新特性。

# 1. HTML5 的新特性

# 1.1 HTML5 新增的语义化标签

以前布局，我们基本用 div 来做。div 对于搜索引擎来说，是没有语义的。

```txt
<div class="header"> </div>  
<div class="nav"> </div>  
<div class="content"> </div>  
<div class="footer"> </div>
```

# 1. HTML5 的新特性

# 1.1 HTML5 新增的语义化标签

- <header>：头部标签  
- <nav>：导航标签  
- <article>：内容标签  
- <section>：定义文档某个区域  
- <aside>：侧边栏标签  
- <footer>：尾部标签

<header>

<nav>

<article>

<section>

<footer>

# 注意：

- 这种语义化标准主要是针对搜索引擎的
- 这些新标签页面中可以使用多次
- 在IE9中，需要把这些元素转换为块级元素
- 其实，我们移动端更喜欢使用这些标签
- HTML5 还增加了很多其他标签，我们后面再慢慢学

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

新增的多媒体标签主要包含两个：

1. 音频：<audio>
2. 视频：<video>

使用它们可以很方便的在页面中嵌入音频和视频，而不再去使用 flash 和其他浏览器插件。

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

HTML5 在不使用插件的情况下，也可以原生的支持视频格式文件的播放，当然，支持的格式是有限的。

# 1. 视频<video>

当前 `<video>` 元素支持三种视频格式：尽量使用 mp4 格式

<table><tr><td>浏览器</td><td>MP4</td><td>WebM</td><td>Ogg</td></tr><tr><td>Internet Explorer</td><td>YES</td><td>NO</td><td>NO</td></tr><tr><td>Chrome</td><td>YES</td><td>YES</td><td>YES</td></tr><tr><td>Firefox</td><td>YES
从 Firefox 21 版本开始
Linux 系统从 Firefox 30 开始</td><td>YES</td><td>YES</td></tr><tr><td>Safari</td><td>YES</td><td>NO</td><td>NO</td></tr><tr><td>Opera</td><td>YES
从 Opera 25 版本开始</td><td>YES</td><td>YES</td></tr></table>

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

HTML5在不使用插件的情况下，也可以原生的支持音频格式文件的播放，当然，支持的格式是有限的。

# 1. 视频<video>

语法

```txt
<video src="文件地址" controls="controls"></video>
```

```xml
<video controls="controls" width="300"> <source src="move.ogg" type="video/ogg"> <source src="move.mp4" type="video/mp4"> 您的浏览器暂不支持 <video> 标签播放视频 </video>
```

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

HTML5 在不使用插件的情况下，也可以原生的支持音频格式文件的播放，当然，支持的格式是有限的。

# 1. 视频<video>——常见属性

<table><tr><td>属性</td><td>值</td><td>描述</td></tr><tr><td>autoplay</td><td>autoplay</td><td>视频就绪自动播放（谷歌浏览器需要添加muted来解决自动播放问题）</td></tr><tr><td>controls</td><td>controls</td><td>向用户显示播放控件</td></tr><tr><td>width</td><td>pixels(像素)</td><td>设置播放器宽度</td></tr><tr><td>height</td><td>pixels(像素)</td><td>设置播放器高度</td></tr><tr><td>loop</td><td>loop</td><td>播放完是否继续播放该视频，循环播放</td></tr><tr><td>preload</td><td>auto（预先加载视频）
none（不应加载视频）</td><td>规定是否预加载视频（如果有了autoplay 就忽略该属性）</td></tr><tr><td>src</td><td>url</td><td>视频url地址</td></tr><tr><td>poster</td><td>Imgurl</td><td>加载等待的画面图片</td></tr><tr><td>muted</td><td>muted</td><td>静音播放</td></tr></table>

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

HTML5 在不使用插件的情况下，也可以原生的支持音频格式文件的播放，当然，支持的格式是有限的。

# 2.音频<audio>

当前 <audio> 元素支持三种音频格式：

<table><tr><td>浏览器</td><td>MP3</td><td>Wav</td><td>Ogg</td></tr><tr><td>Internet Explorer</td><td>YES</td><td>NO</td><td>NO</td></tr><tr><td>Chrome</td><td>YES</td><td>YES</td><td>YES</td></tr><tr><td>Firefox</td><td>YES</td><td>YES</td><td>YES</td></tr><tr><td>Safari</td><td>YES</td><td>YES</td><td>NO</td></tr><tr><td>Opera</td><td>YES</td><td>YES</td><td>YES</td></tr></table>

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

HTML5 在不使用插件的情况下，也可以原生的支持音频格式文件的播放，当然，支持的格式是有限的。

# 2.音频<audio>

语法

```txt
<audio src="文件地址" controls="controls"></audio>
```

```xml
<audio controls="controls" > <source src="happy.mp3" type="audio/mpeg" > <source src="happy.ogg" type="audio/ogg" > 您的浏览器暂不支持 <audio> 标签。 </audio>
```

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

HTML5 在不使用插件的情况下，也可以原生的支持音频格式文件的播放，当然，支持的格式是有限的。

# 2.音频<audio>

常见属性

<table><tr><td>属性</td><td>值</td><td>描述</td></tr><tr><td>autoplay</td><td>autoplay</td><td>如果出现该属性，则音频在就绪后马上播放。</td></tr><tr><td>controls</td><td>controls</td><td>如果出现该属性，则向用户显示控件，比如播放按钮。</td></tr><tr><td>loop</td><td>loop</td><td>如果出现该属性，则每当音频结束时重新开始播放。</td></tr><tr><td>src</td><td>url</td><td>要播放的音频的URL。</td></tr></table>

- 谷歌浏览器把音频和视频自动播放禁止了

# 1. HTML5 的新特性

# 1.2 HTML5 新增的多媒体标签

HTML5 在不使用插件的情况下，也可以原生的支持音频格式文件的播放，当然，支持的格式是有限的。

# 3. 多媒体标签总结

- 音频标签和视频标签使用方式基本一致
- 浏览器支持情况不同
- 谷歌浏览器把音频和视频自动播放禁止了
- 我们可以给视频标签添加 muted 属性来静音播放视频，音频不可以（可以通过JavaScript解决）
- 视频标签是重点，我们经常设置自动播放，不使用 controls 控件，循环和设置大小属性

# 1. HTML5 的新特性

# 1.3 HTML5 新增的 input 类型

<table><tr><td>属性值</td><td>说明</td></tr><tr><td>type=&quot;email&quot;</td><td>限制用户输入必须为Email类型</td></tr><tr><td>type=&quot;url&quot;</td><td>限制用户输入必须为URL类型</td></tr><tr><td>type=&quot;date&quot;</td><td>限制用户输入必须为日期类型</td></tr><tr><td>type=&quot;time&quot;</td><td>限制用户输入必须为时间类型</td></tr><tr><td>type=&quot;month&quot;</td><td>限制用户输入必须为月类型</td></tr><tr><td>type=&quot;week&quot;</td><td>限制用户输入必须为周类型</td></tr><tr><td>type=&quot;number&quot;</td><td>限制用户输入必须为数字类型</td></tr><tr><td>type=&quot;tel&quot;</td><td>手机号码</td></tr><tr><td>type=&quot;search&quot;</td><td>搜索框</td></tr><tr><td>type=&quot;color&quot;</td><td>生成一个颜色选择表单</td></tr></table>

- 重点记住：number tel search 这三个

# 1. HTML5 的新特性

# 1.4 HTML5 新增的表单属性

<table><tr><td>属性</td><td>值</td><td>说明</td></tr><tr><td>required</td><td>required</td><td>表单拥有该属性表示其内容不能为空，必填</td></tr><tr><td>placeholder</td><td>提示文本</td><td>表单的提示信息，存在默认值将不显示</td></tr><tr><td>autofocus</td><td>autofocus</td><td>自动聚焦属性，页面加载完成自动聚焦到指定表单</td></tr><tr><td>autocomplete</td><td>off / on</td><td>当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。默认已经打开，如autocomplete=&quot;on&quot;，关闭autocomplete=&quot;off&quot;需要放在表单内，同时加上name属性，同时成功提交</td></tr><tr><td>multiple</td><td>multiple</td><td>可以多选文件提交</td></tr></table>

可以通过以下设置方式修改placeholder里面的字体颜色：

```css
input::placeholder { color: pink; }
```

#  #

# 录 Contents

$\spadesuit$  HTML5的新特性  
$\Leftrightarrow$  CSS3 的新特性

# 2. CSS3 的新特性

# 2.1 CSS3 的现状

新增的CSS3特性有兼容性问题，ie9+才支持

- 移动端支持优于PC端
- 不断改进中  
  应用相对广泛  
  现阶段主要学习：新增选择器和盒子模型以及其他特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205796.jpg)

# 2. CSS3 的新特性

# CSS3 新增选择器

CSS3 给我们新增了选择器，可以更加便捷，更加自由的选择目标元素。

1. 属性选择器
2. 结构伪类选择器
3. 伪元素选择器

# 2. CSS3 的新特性

# 2.2 属性选择器

属性选择器可以根据元素特定属性的来选择元素。这样就可以不用借助于类或者id选择器。

<table><tr><td>选择符</td><td>简介</td></tr><tr><td>E[att]</td><td>选择具有 att 属性的 E 元素</td></tr><tr><td>E[att=&quot;val&quot;]</td><td>选择具有 att 属性且属性值等于 val 的 E 元素</td></tr><tr><td>E[att^=&quot;val&quot;]</td><td>匹配具有 att 属性且值以 val 开头的 E 元素</td></tr><tr><td>E[att$=&quot;val&quot;]</td><td>匹配具有 att 属性且值以 val 结尾的 E 元素</td></tr><tr><td>E[att*=&quot;val&quot;]</td><td>匹配具有 att 属性且值中含有 val 的 E 元素</td></tr></table>

注意：类选择器、属性选择器、伪类选择器，权重为10。

# 2. CSS3 的新特性

# CSS3 新增选择器

CSS3 给我们新增了选择器，可以更加便捷，更加自由的选择目标元素。

1. 属性选择器
2. 结构伪类选择器
3. 伪元素选择器

# 2. CSS3 的新特性

# 2.3 结构伪类选择器

结构伪类选择器主要根据文档结构来选择器元素，常用于根据父级选择器里面的子元素

<table><tr><td>选择符</td><td>简介</td></tr><tr><td>E:first-child</td><td>匹配父元素中的第一个子元素E</td></tr><tr><td>E:last-child</td><td>匹配父元素中最后一个E元素</td></tr><tr><td>E:nth-child(n)</td><td>匹配父元素中的第n个子元素E</td></tr><tr><td>E:first-of-type</td><td>指定类型E的第一个</td></tr><tr><td>E,last-of-type</td><td>指定类型E的最后一个</td></tr><tr><td>E:nth-of-type(n)</td><td>指定类型E的第n个</td></tr></table>

注意：类选择器、属性选择器、伪类选择器，权重为 10。

# 2. CSS3 的新特性

# 2.3 结构伪类选择器

nth-child ( n ) 选择某个父元素的一个或多个特定的子元素 (重点)

- n 可以是数字，关键字和公式
- n如果是数字，就是选择第n个子元素，里面数字从1开始...
- n 可以是关键字：even 偶数，odd 奇数
- n 可以是公式：常见的公式如下（如果n是公式，则从0开始计算，但是第 0 个元素或者超出了元素的个数会被忽略）

<table><tr><td>公式</td><td>取值</td></tr><tr><td>2n</td><td>偶数</td></tr><tr><td>2n+1</td><td>奇数</td></tr><tr><td>5n</td><td>5 10 15 ...</td></tr><tr><td>n+5</td><td>从第5个开始（包含第五个）到最后</td></tr><tr><td>-n+5</td><td>前5个（包含第5个）...</td></tr></table>

# 2. CSS3 的新特性

# 2.3 结构伪类选择器

结构伪类选择器主要根据文档结构来选择器元素，常用于根据父级选择器里面的子元素

<table><tr><td>选择符</td><td>简介</td></tr><tr><td>E:first-child</td><td>匹配父元素中的第一个子元素E</td></tr><tr><td>E:last-child</td><td>匹配父元素中最后一个E元素</td></tr><tr><td>E:nth-child(n)</td><td>匹配父元素中的第n个子元素E</td></tr><tr><td>E:first-of-type</td><td>指定类型E的第一个</td></tr><tr><td>E,last-of-type</td><td>指定类型E的最后一个</td></tr><tr><td>E:nth-of-type(n)</td><td>指定类型E的第n个</td></tr></table>

# 区别：

1. nth-child 对父元素里面所有孩子排序选择（序号是固定的） 先找到第n个孩子，然后看看是否和E匹配
2. nth-of-type 对父元素里面指定子元素进行排序选择。先去匹配E，然后再根据E找第n个孩子

# 2. CSS3 的新特性

# 2.3 结构伪类选择器

# 小结

- 结构伪类选择器一般用于选择父级里面的第几个孩子
- nth-child 对父元素里面所有孩子排序选择（序号是固定的） 先找到第n个孩子，然后看看是否和E匹配
- nth-of-type 对父元素里面指定子元素进行排序选择。先去匹配E，然后再根据E找第n个孩子
- 关于 nth-child ( n ) 我们要知道 n 是从 0 开始计算的, 要记住常用的公式
- 如果是无序列表，我们肯定用 nth-child 更多
- 类选择器、属性选择器、伪类选择器，权重为  $10$ 。

# 2. CSS3 的新特性

# CSS3 新增选择器

CSS3 给我们新增了选择器，可以更加便捷，更加自由的选择目标元素。

1. 属性选择器
2. 结构伪类选择器
3. 伪元素选择器

# 2. CSS3 的新特性

# 2.4 伪元素选择器（重点）

伪元素选择器可以帮助我们利用CSS创建新标签元素，而不需要HTML标签，从而简化HTML结构。

<table><tr><td>选择符</td><td>简介</td></tr><tr><td>::before</td><td>在元素内部的前面插入内容</td></tr><tr><td>::after</td><td>在元素内部的后面插入内容</td></tr></table>

# 注意：

- before 和 after 创建一个元素，但是属于行内元素  
  新创建的这个元素在文档树中是找不到的，所以我们称为伪元素
- 语法：element::before {}
- before 和 after 必须有 content 属性
- before 在父元素内容的前面创建元素，after 在父元素内容的后面插入元素  
  伪元素选择器和标签选择器一样，权重为1

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205797.jpg)

# 伪元素选择器使用场景1：伪元素字体图标

```css
p::before { position: absolute; right: 20px; top: 10px; content: '\e91e'; font-size: 20px; }
```

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205798.jpg)

# 伪元素选择器使用场景2：仿土豆效果

```txt
/*当我们鼠标经过了土豆这个盒子，就让里面before遮罩层显示出来*/.tudou:hover:::before{/\*而是显示元素\*/display:block;1
```

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205799.jpg)

# 伪元素选择器使用场景3：伪元素清除浮动

1. 额外标签法也称为隔墙法，是W3C推荐的做法。
2. 父级添加overflow属性
3. 父级添加after伪元素
4. 父级添加双伪元素

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205800.jpg)

# 伪元素选择器使用场景3：伪元素清除浮动

1. 额外标签法也称为隔墙法，是W3C推荐的做法。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205801.jpg)

注意：要求这个新的空标签必须是块级元素。

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205802.jpg)

# 伪元素选择器使用场景3：伪元素清除浮动

后面两种伪元素清除浮动算是第一种额外标签法的一个升级和优化。

```txt
. clearfix:after { content:""; 伪元素必须写的属性 display: block; 插入的元素必须是块级 height:0; 不要看见这个元素 clear:both; 核心代码清除浮动 visibility: hidden; 不要看见这个元素 }
```

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205803.jpg)

# 伪元素选择器使用场景3：伪元素清除浮动

后面两种伪元素清除浮动算是第一种额外标签法的一个升级和优化。

```txt
清晰：before，.clearfix:after{ content:""; display:table; 转换为块级元素并且一行显示   
}   
清：after{ clear:both;
```

# 2. CSS3 的新特性

# 2.5 CSS3 盒子模型

CSS3 中可以通过 box-sizing 来指定盒模型，有 2 个值：即可指定为 content-box、border-box，这样我们计算盒子大小的方式就发生了改变。

可以分成两种情况：

1. box-sizing: content-box 盒子大小为 width + padding + border（以前默认的）
2. box-sizing: border-box 盒子大小为 width

如果盒子模型我们改为了box-sizing: border-box，那padding和border就不会撑大盒子了（前提padding和border不会超过width宽度）

# 2. CSS3 的新特性

# 2.6 CSS3 其他特性（了解）

1. 图片变模糊
2. 计算盒子宽度 width: calc 函数

# 2. CSS3 的新特性

# 2.6 CSS3 其他特性（了解）

# CSS3滤镜filter:

filter CSS属性将模糊或颜色偏移等图形效果应用于元素。

filter: 函数(); 例如: filter blur(5px); blur模糊处理 数值越大越模糊

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205804.jpg)  
添加模糊

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205805.jpg)

# 2. CSS3 的新特性

# 2.6 CSS3 其他特性（了解）

# CSS3 calc 函数:

calc() 此CSS函数让你在声明CSS属性值时执行一些计算。

width: calc(100% - 80px);

括号里面可以使用  $+ - ^{*}$  /来进行计算。

CSS3 还增加了一些动画 2D 3D 等新特性，我们就业班会继续学习。

# 2. CSS3 的新特性

# 2.7 CSS3 过渡（重点）

过渡（transition）是CSS3中具有颠覆性的特征之一，我们可以在不使用Flash动画或JavaScript的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。

过渡动画：是从一个状态渐渐的过渡到另外一个状态

可以让我们页面更好看，更动感十足，虽然低版本浏览器不支持（ie9以下版本）但是不会影响页面布局。

我们现在经常和：hover一起搭配使用。

# 2. CSS3 的新特性

# 2.7 CSS3 过渡（重点）

transition: 要过渡的属性 花费时间 运动曲线 何时开始;

1. 属性：想要变化的css属性，宽度高度背景颜色内外边距都可以。如果想要所有的属性都变化过渡，写一个all就可以。
2. 花费时间：单位是秒（必须写单位）比如0.5s
3. 运动曲线：默认是ease（可以省略）  
   4.何时开始：单位是秒（必须写单位）可以设置延迟触发时间，默认是0s（可以省略）

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205806.jpg)

记住过渡的使用口诀：谁做过渡给谁加

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205807.jpg)

# 进度条案例

1. 进度条如何布局
2. 过渡的使用

# 2. CSS3 的新特性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205808.jpg)

# 课后作业

1. 布局右侧模块
2. 利用过渡的制作小米logo效果

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205809.jpg)

Apple苹果iPhone 6s Plus (A1699) 32G

金色移动联通电信4G手机

¥6088 ￥6988

已售87%剩余29件

立即抢购

m

# 狭义的HTML5 CSS3

# HTML5 结构标签本身

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205810.jpg)

# CSS3 相关样式

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205811.jpg)

# 广义的HTML5

# H5

1. 广义的 HTML5 是 HTML5 本身 + CSS3 + JavaScript。
2. 这个集合有时称为 HTML5 和朋友，通常缩写为 HTML5。
3. 虽然 HTML5 的一些特性仍然不被某些浏览器支持，但是它是一种发展趋势。
4. HTML5 MDN 介绍：

https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004205812.jpg)

# 黑马程序员

www.ittheima.com

传智播客旗下高端IT教育品牌
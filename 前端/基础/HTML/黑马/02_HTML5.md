![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354809.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354810.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354811.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354812.jpg)  
5

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354813.jpg)

黑马程序员

www.itheima.com

传智播客旗下

高端IT教育品牌

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354814.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354815.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354816.jpg)

# HTML5

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354817.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354818.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354819.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354820.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354821.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354822.jpg)

# 目录 Contents

什么是 HTML5  
H5 新增语义化标签  
H5 新增多媒体标签  
H5 新增 input 表单、表单属性

# 1. 什么是HTML5

# 1.1 HTML5简介

万维网的核心语言、标准通用标记语言下的一个应用超文本标记语言（HTML）的第五次重大修改。作为新HTML语言，具有新的元素，属性和行为

# XHTML 可扩展超文本标记语言

XHTML是一种增强了的HTML，它的可扩展性和灵活性将适应未来网络应用更多的需求。  
我们基础班学习的是XHTML

# HTML5

它有更大的技术集，允许更多样化和强大的网站和应用程序。

增加了新特性：语义特性，本地存储特性，设备兼容特性，连接特性，网页多媒体特性，三维、图形及特效特性，性能与集成特性，CSS3特性。

这个集合有时称为HTML5和朋友，通常缩写为HTML5

# 1. 什么是HTML5

# 1.2 广义的HTML5

- 广义的HTML5是HTML5本身  $+$  CSS3  $+$  JavaScript
- 这个集合有时称为HTML5和朋友，通常缩写为HTML5
- 虽然HTML5的一些特性仍然不被某些浏览器支持，但是它是一种发展趋势
- HTML5 MDN 介绍：https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML

# 目录 Contents

什么是 HTML5  
H5 新增语义化标签  
H5 新增多媒体标签  
H5 新增 input 表单、表单属性

# 2. H5新增语义化标签

# 标签语义化

以前布局，我们基本用div来做。 div对于搜索引擎来说，是没有语义的。

```txt
<div class="header"> </div>  
<div class="nav"> </div>  
<div class="content"> </div>  
<div class="footer"> </div>
```

# 2. H5新增语义化标签

# 新增语义化标签

- <header>：头部标签  
- <nav>：导航标签  
- <article>: 内容标签  
- <section>：块级标签  
- <aside>：侧边栏标签  
- <footer>：尾部标签

# 注意:

- 这种语义化标准主要针对搜索引擎的
- 这些新标签页面中可以使用多次的
- 在IE9中，需要把这些元素转换为块级元素
- 其实，我们移动端更喜欢使用这些标签
- HTML5 还增加了很多其他标签，我们后面再慢慢学

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354823.jpg)

# 目录 Contents

什么是 HTML5  
H5 新增语义化标签  
H5 新增多媒体标签  
H5 新增input表单、表单属性

# 3. H5新增多媒体标签

多媒体标签包含两个，具体如下：

$\bullet$  音频：<audio>  
视频：<video>

使用它们可以很方便的在页面中嵌入音频和视频，而不再去使用落后的 flash 和其他浏览器插件。

# 3. H5新增多媒体标签

# 3.1 <audio> 音频标签

HTML5在不使用插件的情况下也可以原生的支持音频格式文件的播放，当然支持格式是有限的。

# 1.音频格式

当前，<audio>元素支持三种音频格式：

<table><tr><td>格式</td><td>IE9</td><td>Firefox3.5</td><td>Opera10.5</td><td>Chrome3.0</td><td>Safari3.0</td></tr><tr><td>Ogg Vorbis</td><td></td><td>✓</td><td>✓</td><td>✓</td><td></td></tr><tr><td>MP3</td><td>✓</td><td></td><td></td><td>✓</td><td>✓</td></tr><tr><td>Wav</td><td></td><td>✓</td><td>✓</td><td></td><td>✓</td></tr></table>

# 3. H5新增多媒体标签

# 3.1 <audio> 音频标签

# 2. <audio>音频标签语法格式

```txt
<audio src="文件地址" controls="controls"></audio>
```

```txt
<audio controls="controls">
    <source src="happy.mp3" type="audio/mpeg">
        <source src="happy.ogg" type="audio/ogg">
            您的浏览器暂不支持audio标签。
</audio>
</source>
```

# 3. H5新增多媒体标签

# 3.1 <audio> 音频标签

# 3. <audio>音频标签常见属性

<table><tr><td>属性</td><td>值</td><td>描述</td></tr><tr><td>autoplay</td><td>autoplay</td><td>如果出现该属性，则音频在就绪后马上播放。</td></tr><tr><td>controls</td><td>controls</td><td>如果出现该属性，则向用户显示控件，比如播放按钮。</td></tr><tr><td>loop</td><td>loop</td><td>如果出现该属性，则每当音频结束时重新开始播放。</td></tr><tr><td>src</td><td>url</td><td>要播放的音频的URL。</td></tr></table>

# 3. H5新增多媒体标签

# 3.2 <video> 视频标签

<table><tr><td>格式</td><td>IE</td><td>Firefox</td><td>Opera</td><td>Chrome</td><td>Safari</td></tr><tr><td>Ogg</td><td>No</td><td>3.5+</td><td>10.5+</td><td>5.0+</td><td>No</td></tr><tr><td>MPEG 4</td><td>9.0+</td><td>No</td><td>No</td><td>5.0+</td><td>3.0+</td></tr><tr><td>WebM</td><td>No</td><td>4.0+</td><td>10.6+</td><td>6.0+</td><td>No</td></tr></table>

# 3. H5新增多媒体标签

# 3.2 <video> 视频标签

# 1. <video> 视频标签语法格式

```txt
<video src="文件地址" controls="controls"></video>
```

```txt
<video controls="controls" width="300"> <source src="move.ogg" type="video/ogg"> <source src="move.mp4" type="video/mp4"> 您的浏览器暂不支持video标签。播放视频 </video>
```

# 3. H5新增多媒体标签

2. <video> 视频标签常见属性  

<table><tr><td>属性</td><td>值</td><td>描述</td></tr><tr><td>autoplay</td><td>autoplay</td><td>视频就绪自动播放（谷歌浏览器需要添加muted来解决自动播放问题）</td></tr><tr><td>controls</td><td>controls</td><td>向用户显示播放控件</td></tr><tr><td>width</td><td>pixels(像素)</td><td>设置播放器宽度</td></tr><tr><td>height</td><td>pixels(像素)</td><td>设置播放器高度</td></tr><tr><td>loop</td><td>loop</td><td>播放完是否继续播放该视频，循环播放</td></tr><tr><td>preload</td><td>auto (预先加载视频)
none (不应加载视频)</td><td>规定是否预加载视频(如果有了autoplay 就忽略该属性)</td></tr><tr><td>src</td><td>url</td><td>视频url地址</td></tr><tr><td>poster</td><td>Imgurl</td><td>加载等待的画面图片</td></tr><tr><td>muted</td><td>muted</td><td>静音播放</td></tr></table>

# 3. H5新增多媒体标签

# 3. 总结

- 音频标签和视频标签使用基本一致
- 浏览器支持情况不同
- 谷歌浏览器把音频和视频自动播放禁止了
- 我们可以给视频标签添加 muted 属性可以自定播放视频，音频不可以
- 视频标签是重点，我们经常设置自动播放，不使用controls控件，循环和设置大小属性

# 目录 Contents

什么是 HTML5  
H5 新增语义化标签  
H5 新增多媒体标签  
H5 新增input表单、表单属性

# 4. H5新增input表单、表单属性

<table><tr><td>属性值</td><td>说明</td></tr><tr><td>type=&quot;email&quot;</td><td>限制用户输入必须为Email类型</td></tr><tr><td>type=&quot;url&quot;</td><td>限制用户输入必须为URL类型</td></tr><tr><td>type=&quot;date&quot;</td><td>限制用户输入必须为日期类型</td></tr><tr><td>type=&quot;time&quot;</td><td>限制用户输入必须为时间类型</td></tr><tr><td>type=&quot;month&quot;</td><td>限制用户输入必须为月类型</td></tr><tr><td>type=&quot;week&quot;</td><td>限制用户输入必须为周类型</td></tr><tr><td>type=&quot;number&quot;</td><td>限制用户输入必须为数字类型</td></tr><tr><td>type=&quot;tel&quot;</td><td>手机号码</td></tr><tr><td>type=&quot;search&quot;</td><td>搜索框</td></tr><tr><td>type=&quot;color&quot;</td><td>生成一个颜色选择表单</td></tr></table>

# 4. H5新增input表单、表单属性

<table><tr><td>属性</td><td>值</td><td>说明</td></tr><tr><td>required</td><td>required</td><td>表单拥有该属性表示其内容不能为空，必填</td></tr><tr><td>placeholder</td><td>提示文本</td><td>表单的提示信息，存在默认值将不显示</td></tr><tr><td>autofocus</td><td>autofocus</td><td>自动聚焦属性，页面加载完成自动聚焦到指定表单</td></tr><tr><td>autocomplete</td><td>off / on</td><td>当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。默认已经打开，如autocomplete=&quot;on&quot;关闭autocomplete=&quot;off&quot;需要放在表单内同时加上name属性-同时成功提交</td></tr><tr><td>multiple</td><td>multiple</td><td>可以多选文件提交</td></tr></table>

# 总结

# HTML5

1. HTML5里面新增的语义化标签
2. HTML5 视频标签设置自动播放以及修改大小
3. HTML5 中新增的数字表单、手机号码表单以及搜索表单
4. HTML5 表单中新增的占位符以及多选属性

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129002354824.jpg)

# 黑马程序员

www.itheima.com

传智播客旗下高端IT教育品牌
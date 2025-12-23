![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427390.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427391.jpg)

# 录 Contents

# 三

$\Leftrightarrow$  CSS简介  
$\spadesuit$  CSS基础选择器  
$\spadesuit$  CSS 字体属性  
$\spadesuit$  CSS 文本属性  
$\spadesuit$  CSS 的引入方式  
$\spadesuit$  综合案例  
$\spadesuit$  Chrome调试工具

# 1. CSS 简介

CSS的主要使用场景就是美化网页,布局页面的。

1. HTML 的局限性
2. CSS-网页的美容师

# 1. CSS 简介

# 1.1 HTML 的局限性

说起 HTML，这其实是个非常单纯的家伙，他只关注内容的语义。比如 <h1> 表明这是一个大标题，<p> 表明这是一个段落，<img>
表明这儿有一个图片，<a> 表示此处有链接。

很早的时候，世界上的网站虽然很多，但是他们都有一个共同的特点：丑。

虽然 HTML 可以做简单的样式，但是带来的是无尽的臃肿和繁琐……

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427392.jpg)

# 1. CSS 简介

# 1.2 CSS-网页的美容师

CSS 是层叠样式表（Cascading Style Sheets）的简称。

有时我们也会称之为 CSS 样式表或级联样式表。

CSS是也是一种标记语言

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427393.jpg)

CSS主要用于设置HTML页面中的文本内容（字体、大小、对齐方式等）、图片的外形（宽高、边框样式、边距等）以及版面的布局和外观显示样式。

CSS 让我们的网页更加丰富多彩，布局更加灵活自如。简单理解：CSS 可以美化 HTML，让 HTML 更漂亮，让页面布局更简单。

# 1. CSS 简介

# 1.2 CSS网页的美容师

# 总结：

1. HTML 主要做结构,显示元素内容
2. CSS美化HTML，布局网页
3. CSS 最大价值: 由 HTML 专注去做结构呈现, 样式交给 CSS, 即 结构 (HTML) 与样式 (CSS) 相分离。

# 1. CSS 简介

# 1.3 CSS 语法规范

使用 HTML 时，需要遵从一定的规范，CSS 也是如此。要想熟练地使用 CSS 对网页进行修饰，首先需要了解 CSS 样式规则。

CSS规则由两个主要的部分构成：选择器以及一条或多条声明。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427394.jpg)

- 选择器是用于指定 CSS 样式的 HTML 标签，花括号内是对该对象设置的具体样式
- 属性和属性值以“键值对”的形式出现
- 属性是对指定的对象设置的样式属性，例如字体大小、文本颜色等
- 属性和属性值之间用英文“:”分开
- 多个“键值对”之间用英文“;”进行区分

# 1. CSS 简介

# 1.3 CSS 语法规范

所有的样式，都包含在<style>标签内，表示是样式表。<style>一般写到</head>上方。

```html
<head> <style> h4 { color: blue; font-size: 100px; } </style> </head>
```

# 1. CSS 简介

# 1.4 CSS 代码风格

以下代码书写风格不是强制规范,而是符合实际开发书写方式。

1. 样式格式书写
2. 样式大小写风格
3. 样式空格风格

# 1. CSS 简介

# 1.4 CSS 代码风格

# 1. 样式格式书写

(1) 紧凑格式

```css
h3{color:deeppink;font-size:20px;}
```

(2) 展开格式

```css
h3{ color: pink; font-size:20px; }
```

强烈推荐第二种格式，因为更直观。

# 1. CSS 简介

# 1.4 CSS 代码风格

# 2. 样式大小写

```css
h3{ color: pink; }
```

```txt
H3{ COLOR:PINK; 1
```

强烈推荐样式选择器，属性名，属性值关键字全部使用小写字母，特殊情况除外。

# 1. CSS 简介

# 1.4 CSS 代码风格

# 3. 空格规范

```css
h3{ color: pink; }
```

(1) 属性值前面，冒号后面，保留一个空格  
(2) 选择器（标签）和大括号中间保留空格

# 录

# Contents

# 三

$\spadesuit$  CSS简介  
$\Leftrightarrow$  CSS基础选择器  
$\spadesuit$  CSS 字体属性  
$\spadesuit$  CSS 文本属性  
$\spadesuit$  CSS 的引入方式  
$\spadesuit$  综合案例  
$\spadesuit$  Chrome调试工具

# 2. CSS 基础选择器

# 2.1 CSS 选择器的作用

```html
<div>我是div</div>  
<div>我是div</div>  
<p>我是段落</p>  
<ul>  
<li>我是ul里面小li哦</li>  
</ul>  
<ol>  
<li>我是ol里面小li哦</li>  
</ol>
```

1. 我想把 div 里面的文字改为红色？
2. 我想把第一个div里面的文字改为红色？
3. 我想把ul里面的li文字改为红色？

# 2. CSS 基础选择器

# 2.1 CSS 选择器的作用

选择器(选择符)就是根据不同需求把不同的标签选出来这就是选择器的作用。简单来说，就是选择标签用的。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427395.jpg)

以上CSS做了两件事：

1. 找到所有的 h1 标签。 选择器（选对人）。
2. 设置这些标签的样式，比如颜色为红色（做对事）。

# 2. CSS 基础选择器

# 2.2 选择器分类

选择器分为基础选择器和复合选择器两个大类，我们这里先讲解一下基础选择器。

- 基础选择器是由单个选择器组成的
- 基础选择器又包括：标签选择器、类选择器、id 选择器和通配符选择器

# 2. CSS 基础选择器

# 2.3 标签选择器

标签选择器（元素选择器）是指用 HTML 标签名称作为选择器，按标签名称分类，为页面中某一类标签指定统一的 CSS 样式。

# 语法

标签名{

属性1：属性值1；

属性2：属性值2；

属性3：属性值3;

.

}

# 2. CSS 基础选择器

# 2.3 标签选择器

标签选择器（元素选择器）是指用 HTML 标签名称作为选择器，按标签名称分类，为页面中某一类标签指定统一的 CSS 样式。

# 作用

标签选择器可以把某一类标签全部选择出来，比如所有的<div>标签和所有的<span>标签。

# 优点

能快速为页面中同类型的标签统一设置样式。

# 缺点

不能设计差异化样式，只能选择全部的当前标签。

# 2. CSS 基础选择器

# 2.4 类选择器

如果想要差异化选择不同的标签，单独选一个或者某几个标签，可以使用类选择器。

# 语法

.类名{

属性1：属性值1；

.

}

例如，将所有拥有 red 类的 HTML 元素均为红色。

.red{

color: red;

}

# 2. CSS 基础选择器

# 2.4 类选择器

如果想要差异化选择不同的标签，单独选一个或者某几个标签，可以使用类选择器。

# 语法

结构需要用class属性来调用class类的意思

<div class='red'> 变红色 </div>

# 2. CSS 基础选择器

# 2.4 类选择器

如果想要差异化选择不同的标签，单独选一个或者某几个标签，可以使用类选择器。

类选择器在 HTML 中以 class 属性表示，在 CSS 中，类选择器以一个点“.”号显示。

# 注意

(1) 类选择器使用“.”（英文点号）进行标识，后面紧跟类名（自定义，我们自己命名的）。  
(2) 可以理解为给这个标签起了一个名字，来表示。  
(3) 长名称或词组可以使用中横线来为选择器命名。  
(4) 不要使用纯数字、中文等命名，尽量使用英文字母来表示。  
(5) 命名要有意义, 尽量使别人一眼就知道这个类名的目的。  
(6) 命名规范：见附件（Web前端开发规范手册.doc）

记忆口诀：样式点定义，结构类调用。一个或多个，开发最常用。

# 2. CSS 基础选择器

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427396.jpg)

# 案例：课堂案例

通过这个案例练习两个地方：

1. 类选择器的使用
2. div就是一个盒子,用来装网页内容的。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427397.jpg)

# 2. CSS 基础选择器

# 2.4 类选择器-多类名

我们可以给一个标签指定多个类名，从而达到更多的选择目的。这些类名都可以选出这个标签。简单理解就是一个标签有多个名字。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427398.jpg)

# 2. CSS 基础选择器

# 2.4 类选择器

1. 多类名使用方式
2. 多类名开发中使用场景

# 2. CSS 基础选择器

# 2.4 类选择器

1. 多类名使用方式

```txt
<div class="red font20">亚瑟</div>
```

(1) 在标签class属性中写多个类名  
(2) 多个类名中间必须用空格分开  
(3) 这个标签就可以分别具有这些类名的样式

# 2. CSS 基础选择器

# 2.4 类选择器

2. 多类名开发中使用场景

(1) 可以把一些标签元素相同的样式(共同的部分)放到一个类里面.  
(2) 这些标签都可以调用这个公共的类,然后再调用自己独有的类.  
(3) 从而节省CSS代码, 统一修改也非常方便.

# 2. CSS 基础选择器

# 2.4 类选择器

```txt
<div class="pink fontWeight font20">亚瑟</div>  
<div class="font20">刘备</div>  
<div class="font14 pink">安其拉</div>  
<div class="font14">貂蝉</div>
```

- 各个类名中间用空格隔开
- 简单理解：就是给某个标签添加了多个类，或者这个标签有多个名字
- 这个标签就可以分别具有这些类名的样式
- 从而节省CSS代码,统一修改也非常方便
- 多类名选择器在后期布局比较复杂的情况下，还是较多使用的

# 2. CSS 基础选择器

# 2.5 id 选择器

id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。

HTML 元素以 id 属性来设置 id 选择器，CSS 中 id 选择器以“#”来定义。

# 语法

```txt
id名{属性1：属性值1；
```

例如，将 id 为 nav 元素中的内容设置为红色。

```css
nav{ color:red; }
```

注意：id属性只能在每个HTML文档中出现一次。口诀:样式#定义,结构id调用,只能调用一次,别人切勿使用.

# 2. CSS 基础选择器

# 2.5 id 选择器

# id 选择器和类选择器的区别

(1) 类选择器 (class) 好比人的名字, 一个人可以有多个名字, 同时一个名字也可以被多个人使用。  
(2) id 选择器好比人的身份证号码，全中国是唯一的，不得重复。  
(3) id 选择器和类选择器最大的不同在于使用次数上。  
(4) 类选择器在修改样式中用的最多，id 选择器一般用于页面唯一性的元素上，经常和 JavaScript 搭配使用。

姓名支付宝 姓名是类名选择器

性别男民族汉

出生1962年7月7日

住址山东省沂南县一组31号

身份证号是id选择器

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427399.jpg)  
C. 沂南

# 2. CSS 基础选择器

# 2.6 通配符选择器

在 CSS 中，通配符选择器使用“*”定义，它表示选取页面中所有元素（标签）。

# 语法

```txt
\*{属性1：属性值1；
```

- 通配符选择器不需要调用，自动就给所有的元素使用样式
- 特殊情况才使用，后面讲解使用场景(以下是清除所有的元素标签的内外边距,后期讲)

```txt
$\star$  { margin:0; padding:0; }
```

# 2. CSS 基础选择器

# 2.7 基础选择器总结

<table><tr><td>基础选择器</td><td>作用</td><td>特点</td><td>使用情况</td><td>用法</td></tr><tr><td>标签选择器</td><td>可以选出所有相同的标签,比如p</td><td>不能差异化选择</td><td>较多</td><td>p { color: red;}</td></tr><tr><td>类选择器</td><td>可以选出1个或者多个标签</td><td>可以根据需求选择</td><td>非常多</td><td>.nav { color: red;}</td></tr><tr><td>id选择器</td><td>一次只能选择1个标签</td><td>ID属性只能在每个HTML文档中出现一次</td><td>一般和js搭配</td><td>#nav {color: red;}</td></tr><tr><td>通配符选择器</td><td>选择所有的标签</td><td>选择的太多,有部分不需要</td><td>特殊情况使用</td><td>* {color: red;}</td></tr></table>

- 每个基础选择器都有使用场景，都需要掌握
- 如果是修改样式，类选择器是使用最多的

# 录

# Contents

# 三

$\spadesuit$  CSS简介  
$\spadesuit$  CSS基础选择器  
$\Leftrightarrow$  CSS 字体属性  
$\spadesuit$  CSS 文本属性  
$\spadesuit$  CSS 的引入方式  
$\spadesuit$  综合案例  
$\spadesuit$  Chrome调试工具

# 3. CSS 字体属性

CSS Fonts (字体)属性用于定义字体系列、大小、粗细、和文字样式（如斜体）。

# 3.1 字体系列

CSS 使用 font-family 属性定义文本的字体系列。

```txt
p{font-family:"微软雅黑"；}  
div{font-family: Arial,"Microsoft Yahei", "微软雅黑"；}
```

- 各种字体之间必须使用英文状态下的逗号隔开
- 一般情况下,如果有空格隔开的多个单词组成的字体,加引号.
- 尽量使用系统默认自带字体，保证在任何用户的浏览器中都能正确显示
- 最常见的几个字体：body {font-family: 'Microsoft YaHei',tahoma,arial,'Hiragini Sans GB';}

# 3. CSS 字体属性

CSS Fonts(字体)属性用于定义字体系列、大小、粗细、和文字样式（如斜体）。

# 3.2 字体大小

CSS 使用 font-size 属性定义字体大小。

```css
p{ font-size:20px; }
```

- px（像素）大小是我们网页的最常用的单位  
  谷歌浏览器默认的文字大小为16px
- 不同浏览器可能默认显示的字号大小不一致，我们尽量给一个明确值大小，不要默认大小
- 可以给 body 指定整个页面文字的大小

# 3. CSS 字体属性

CSS Fonts (字体)属性用于定义字体系列、大小、粗细、和文字样式（如斜体）。

# 3.3 字体粗细

CSS 使用 font-weight 属性设置文本字体的粗细。

```css
p{ font-weight: bold; }
```

<table><tr><td>属性值</td><td>描述</td></tr><tr><td>normal</td><td>默认值（不加粗的）</td></tr><tr><td>bold</td><td>定义粗体（加粗的）</td></tr><tr><td>100~900</td><td>400等同于normal，而700等同于bold 注意这个数字后面不跟单位</td></tr></table>

- 学会让加粗标签（比如 h 和 strong 等）不加粗，或者其他标签加粗  
  实际开发时，我们更喜欢用数字表示粗细

# 3. CSS 字体属性

CSS Fonts (字体)属性用于定义字体系列、大小、粗细、和文字样式（如斜体）。

# 3.4 文字样式

CSS 使用 font-style 属性设置文本的风格。

```css
p{ font-style:normal; }
```

<table><tr><td>属性值</td><td>作用</td></tr><tr><td>normal</td><td>默认值，浏览器会显示标准的字体样式 font-style: normal;</td></tr><tr><td>italic</td><td>浏览器会显示斜体的字体样式。</td></tr></table>

注意：平时我们很少给文字加斜体，反而要给斜体标签（em，i）改为不倾斜字体。

# 3. CSS 字体属性

CSS Fonts (字体)属性用于定义字体系列、大小、粗细、和文字样式（如斜体）。

# 3.5 字体复合属性

字体属性可以把以上文字样式综合来写, 这样可以更节约代码:

```css
body {
    font: font-style 50 75 100 24 368 100 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 100 24 24 100 24 24 100 24 24 100 24 24 100 24 24 100 24 24 100 24 24 100 24 24 100 24 24 100 24 24 100 25 368 100 100 25 368 100 100 25 368 100
}
```

- 使用font属性时，必须按上面语法格式中的顺序书写，不能更换顺序，并且各个属性间以空格隔开
- 不需要设置的属性可以省略（取默认值），但必须保留font-size和font-family属性，否则font属性将不起作用

# 3. CSS 字体属性

CSS Fonts (字体)属性用于定义字体系列、大小、粗细、和文字样式（如斜体）。

# 3.6 字体属性总结

<table><tr><td>属性</td><td>表示</td><td>注意点</td></tr><tr><td>font-size</td><td>字号</td><td>我们通常用的单位是px像素，一定要跟上单位</td></tr><tr><td>font-family</td><td>字体</td><td>实际工作中按照团队约定来写字体</td></tr><tr><td>font-weight</td><td>字体粗细</td><td>记住加粗是700或者bold不加粗是normal或者400记住数字不要跟单位</td></tr><tr><td>font-style</td><td>字体样式</td><td>记住倾斜是italic 不倾斜是normal工作中我们最常用normal</td></tr><tr><td>font</td><td>字体连写</td><td>1.字体连写是有顺序的 不能随意换位置2.其中字号和字体必须同时出现</td></tr></table>

- 字体复合属性如何写？里面有什么注意细节？
- 如果让加粗的文字不加粗显示, 如何让倾斜的文字不倾斜显示?

# 录 Contents

三

$\spadesuit$  CSS简介  
$\spadesuit$  CSS基础选择器  
$\spadesuit$  CSS 字体属性  
$\downarrow$  CSS 文本属性  
$\spadesuit$  CSS 的引入方式  
$\spadesuit$  综合案例  
$\spadesuit$  Chrome调试工具

# 4. CSS 文本属性

CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

# 4.1 文本颜色

color 属性用于定义文本的颜色。

```css
div {
    color: red;
}
```

<table><tr><td>表示表示</td><td>属性值</td></tr><tr><td>预定义的颜色值</td><td>red, green, blue, 还有我们的御用色 pink</td></tr><tr><td>十六进制</td><td>#FF0000, #FF6600, #29D794</td></tr><tr><td>RGB代码</td><td>rgb(255,0,0)或rgb(100%,0%,0%)</td></tr></table>

开发中最常用的是十六进制

# 4. CSS 文本属性

CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

# 4.2 对齐文本

text-align 属性用于设置元素内文本内容的水平对齐方式。

```scss
div {
    text-align: center;
}
```

<table><tr><td>属性值</td><td>解释</td></tr><tr><td>left</td><td>左对齐（默认值）</td></tr><tr><td>right</td><td>右对齐</td></tr><tr><td>center</td><td>居中对齐</td></tr></table>

# 4. CSS 文本属性

CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

# 4.3 装饰文本

text-decoration 属性规定添加到文本的修饰。可以给文本添加下划线、删除线、上划线等。

```css
div { text-decoration: underline; }
```

<table><tr><td>属性值</td><td>描述</td></tr><tr><td>none</td><td>默认。没有装饰线（最常用）</td></tr><tr><td>underline</td><td>下划线。链接a自带下划线（常用）</td></tr><tr><td>overline</td><td>上划线。（几乎不用）</td></tr><tr><td>line-through</td><td>删除线。（不常用）</td></tr></table>

pink老师总结：重点记住如何添加下划线？如何删除下划线？其余了解即可

# 4. CSS 文本属性

CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

# 4.4 文本缩进

text-indent 属性用来指定文本的第一行的缩进，通常是将段落的首行缩进。

# 中国哪里的地铁最拥挤，广州3号线必须第一

2019-06-26 4457人参与讨论来源  $\rightharpoondown$  网易数读

打开北京、上海与广州的地铁地图，你会看见三张纵横交错的线路网络，这代表了中国最成熟的三套城市轨道交通系统。

可即使这样，在北上广生活的人依然少不了对地铁的抱怨，其中谈及最多的问题便是拥挤——对很多人而言，每次挤地铁的过程，都像是一场硬仗。更何况，还都是败仗居多。

那么，当越来越多的二线甚至三线城市迎接来了自己的地铁，中国哪里的地铁是最拥挤的呢？

最拥挤的地铁线，都在上班路上

# 4. CSS 文本属性

CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

# 4.4 文本缩进

text-indent 属性用来指定文本的第一行的缩进，通常是将段落的首行缩进。

```scss
div {
    text-indent: 10px;
}
```

通过设置该属性，所有元素的第一行都可以缩进一个给定的长度，甚至该长度可以是负值。

```css
p{ text-indent:2em; }
```

em 是一个相对单位，就是当前元素（font-size）1 个文字的大小，如果当前元素没有设置大小，则会按照父元素的 1 个文字大小。

# 4. CSS 文本属性

CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

# 4.5行间距

line-height 属性用于设置行间的距离（行高）。可以控制文字行与行之间的距离。

```css
p{ line-height:26px; }
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427400.jpg)

# 4. CSS 文本属性

CSS Text（文本）属性可定义文本的外观，比如文本的颜色、对齐文本、装饰文本、文本缩进、行间距等。

# 4.6 文本属性总结

<table><tr><td>属性</td><td>表示</td><td>注意点</td></tr><tr><td>color</td><td>文本颜色</td><td>我们通常用十六进制比如而且是简写形式#fff</td></tr><tr><td>text-align</td><td>文本对齐</td><td>可以设定文字水平的对齐方式</td></tr><tr><td>text-indent</td><td>文本缩进</td><td>通常我们用于段落首行缩进2个字的距离 text-indent: 2em;</td></tr><tr><td>text-decoration</td><td>文本修饰</td><td>记住添加下划线underline 取消下划线none</td></tr><tr><td>line-height</td><td>行高</td><td>控制行与行之间的距离</td></tr></table>

# 录 Contents

三

$\spadesuit$  CSS简介  
$\spadesuit$  CSS基础选择器  
$\spadesuit$  CSS 字体属性  
$\spadesuit$  CSS 文本属性  
$\downarrow$  CSS 的引入方式  
$\spadesuit$  综合案例  
$\spadesuit$  Chrome调试工具

# 5. CSS 引入方式

# 5.1 CSS 的三种样式表

按照 CSS 样式书写的位置（或者引入的方式），CSS 样式表可以分为三大类：

1. 行内样式表（行内式）
2. 内部样式表（嵌入式）
3. 外部样式表（链接式）

# 5. CSS 引入方式

# 5.2 内部样式表

内部样式表（内嵌样式表）是写到html页面内部。是将所有的CSS代码抽取出来，单独放到一个<style>标签中。

```vue
<style> div { color: red; font-size: 12px; } </style>
```

- <style> 标签理论上可以放在 HTML 文档的任何地方，但一般会放在文档的<head>标签中  
- 通过此种方式，可以方便控制当前整个页面中的元素样式设置
- 代码结构清晰，但是并没有实现结构与样式完全分离
- 使用内部样式表设定 CSS，通常也被称为嵌入式引入，这种方式是我们练习时常用的方式

# 5. CSS 引入方式

# 5.3 行内样式表

行内样式表（内联样式表）是在元素标签内部的 style 属性中设定 CSS 样式。适合于修改简单样式。

<div style="color: red; font-size: 12px;">青春不常在，抓紧谈恋爱</div>

- style 其实就是标签的属性
- 在双引号中间，写法要符合CSS规范
- 可以控制当前的标签设置样式
- 由于书写繁琐，并且没有体现出结构与样式相分离的思想，所以不推荐大量使用，只有对当前元素添加简单样式的时候，可以考虑使用
- 使用行内样式表设定 CSS，通常也被称为行内式引入

# 5. CSS 引入方式

# 5.4 外部样式表

实际开发都是外部样式表。适合于样式比较多的情况。核心是：样式单独写到CSS文件中，之后把CSS文件引入到HTML页面中使用。

引入外部样式表分为两步：

1. 新建一个后缀名为 .css 的样式文件，把所有 CSS 代码都放入此文件中。
2. 在 HTML 页面中，使用<link>标签引入这个文件。

```twig
<link rel="stylesheet" href="css文件路径">
```

<table><tr><td>属性</td><td>作用</td></tr><tr><td>rel</td><td>定义当前文档与被链接文档之间的关系，在这里需要指定为“stylesheet”，表示被链接的文档是一个样式表文件。</td></tr><tr><td>href</td><td>定义所链接外部样式表文件的URL，可以是相对路径，也可以是绝对路径。</td></tr></table>

- 使用外部样式表设定 CSS，通常也被称为外链式或链接式引入，这种方式是开发中常用的方式

# 5. CSS 引入方式

# 5.5 CSS 引入方式总结

<table><tr><td>样式表</td><td>优点</td><td>缺点</td><td>使用情况</td><td>控制范围</td></tr><tr><td>行内样式表</td><td>书写方便，权重高</td><td>结构样式混写</td><td>较少</td><td>控制一个标签</td></tr><tr><td>内部样式表</td><td>部分结构和样式相分离</td><td>没有彻底分离</td><td>较多</td><td>控制一个页面</td></tr><tr><td>外部样式表</td><td>完全实现结构和样式相分离</td><td>需要引入</td><td>最多，吐血推荐</td><td>控制多个页面</td></tr></table>

# 录 Contents

# 三

$\spadesuit$  CSS简介  
$\spadesuit$  CSS基础选择器  
$\spadesuit$  CSS 字体属性  
$\spadesuit$  CSS 文本属性  
$\spadesuit$  CSS 的引入方式  
综合案例  
$\spadesuit$  Chrome调试工具

# 6. 综合案例

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427401.jpg)

# 案例：新闻页面

制作页面整体可以分为两步:

1.搭建html结构页面

2. 修改CSS样式

# 录

# Contents

# 三

$\spadesuit$  CSS简介  
$\spadesuit$  CSS基础选择器  
$\spadesuit$  CSS 字体属性  
$\spadesuit$  CSS 文本属性  
$\spadesuit$  CSS 的引入方式  
$\spadesuit$  综合案例  
Chrome 调试工具

# 7. Chrome 调试工具

Chrome 浏览器提供了一个非常好用的调试工具，可以用来调试我们的 HTML 结构和 CSS 样式。

# 1. 打开调试工具

打开 Chrome 浏览器，按下 F12 键或者右击页面空白处  $\rightarrow$  检查。

# 用来选中页面元素

# 中乙队赛前突然换帅仍胜毅腾高原黑马欲阻击舜天

2017年07月16日20:11 新浪体育评论中大奖（11人参与）收藏本文

新浪体育讯7月16日是燕京啤酒(微博)
2017中国足协杯第三轮比赛，丽江嘉云昊队主场迎战哈尔滨毅腾队的比赛日。然而就在比赛日中午，丽江嘉云昊队主帅李虎和另外两名成员悄然向俱乐部提出了辞呈，并且收拾行囊准备离开。在这样的情况下，丽江嘉云昊队不得不由此前的教练员杨贵东代理指挥了本场比赛。

在昨日丽江嘉云昊队主帅李虎就缺席了赛前的新闻发布会，当时俱乐部给出的解释是李虎由于身体欠佳，去医院接受治疗。然而今日李虎出现在俱乐部时，向记者否认了这一说法，并且坦言已经向俱乐部提出了辞呈。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427402.jpg)

# 7. Chrome 调试工具

Chrome 浏览器提供了一个非常好用的调试工具，可以用来调试我们的 HTML 结构和 CSS 样式。

# 2. 使用调试工具

(1) Ctrl+滚轮 可以放大开发者工具代码大小。  
② 左边是 HTML 元素结构，右边是 CSS 样式。  
(3) 右边 CSS 样式可以改动数值（左右箭头或者直接输入）和查看颜色。  
(4) Ctrl + 0 复原浏览器大小。  
(5) 如果点击元素, 发现右侧没有样式引入, 极有可能是类名或者样式引入错误。  
(6) 如果有样式, 但是样式前面有黄色叹号提示, 则是样式属性书写错误。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001427403.jpg)

# 黑马程序员

www.ittheima.com

传智播客旗下高端IT教育品牌
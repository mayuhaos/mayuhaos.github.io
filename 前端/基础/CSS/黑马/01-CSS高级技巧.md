![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630381.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630382.jpg)

# 录

# Contents

$\Leftrightarrow$  精灵图  
$\spadesuit$  字体图标  
$\spadesuit$  CSS 三角  
$\Leftrightarrow$  CSS 用户界面样式  
$\Leftrightarrow$  vertical-align 属性应用  
$\spadesuit$  溢出的文字省略号显示  
$\spadesuit$  常见布局技巧

# 1. 精灵图

1. 为什么需要精灵图？
2. 精灵图的使用
3. 精灵图课堂案例

# 1. 精灵图

# 1.1 为什么需要精灵图

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630383.jpg)

一个网页中往往会应用很多小的背景图像作为修饰，当网页中的图像过多时，服务器就会频繁地接收和发送请求图片，造成服务器请求压力过大，这将大大降低页面的加载速度。

因此，为了有效地减少服务器接收和发送请求的次数，提高页面的加载速度，出现了 CSS 精灵技术（也称 CSS Sprites、CSS 雪碧）。

核心原理：将网页中的一些小背景图像整合到一张大图中，这样服务器只需要一次请求就可以了。

# 1. 精灵图

# 1.1 为什么需要精灵图

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630384.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630385.jpg)

# 1. 精灵图

# 1.1 为什么需要精灵图

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630386.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630387.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630388.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630389.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630390.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630391.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630392.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630393.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630394.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630395.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630396.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630397.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630398.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630399.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630400.jpg)

# 淘宝精灵图

# 1. 精灵图

# 1.2 精灵图（sprite）的使用

# 使用精灵图核心：

1. 精灵技术主要针对于背景图片使用。就是把多个小背景图片整合到一张大图片中。
2. 这个大图片也称为 sprites 精灵图 或者雪碧图
3. 移动背景图片位置，此时可以使用background-position。
4. 移动的距离就是这个目标图片的  $x$  和  $y$  坐标。注意网页中的坐标有所不同
5. 因为一般情况下都是往上往左移动，所以数值是负值。
6. 使用精灵图的时候需要精确测量，每个小背景图片的大小和位置。

# 1. 精灵图

# 1.2 精灵图的使用

使用精灵图核心总结：

1. 精灵图主要针对于小的背景图片使用。
2. 主要借助于背景位置来实现---background-position。
3. 一般情况下精灵图都是负值。（千万注意网页中的坐标：x轴右边走是正值，左边走是负值，y轴同理。）

# 1. 精灵图

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630401.jpg)

案例：拼出自己名字

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630402.jpg)

# 录

# Contents

$\spadesuit$  精灵图  
$\Leftrightarrow$  字体图标  
$\spadesuit$  CSS三角  
$\Leftrightarrow$  CSS 用户界面样式  
$\Leftrightarrow$  vertical-align 属性应用  
$\spadesuit$  溢出的文字省略号显示

# 2. 字体图标

# 2.1 字体图标的产生

字体图标使用场景：主要用于显示网页中通用、常用的一些小图标。

精灵图是有诸多优点的，但是缺点很明显。

1. 图片文件还是比较大的。
2. 图片本身放大和缩小会失真。
3. 一旦图片制作完毕想要更换非常复杂。

此时，有一种技术的出现很好的解决了以上问题，就是字体图标iconfont。

字体图标可以为前端工程师提供一种方便高效的图标使用方式，展示的是图标，本质属于字体。

# 2. 字体图标

# 2.2 字体图标的优点

- 轻量级：一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了服务器请求
- 灵活性：本质其实是文字，可以很随意的改变颜色、产生阴影、透明效果、旋转等
- 兼容性：几乎支持所有的浏览器，请放心使用

注意：字体图标不能替代精灵技术，只是对工作中图标部分技术的提升和优化。

# 总结：

1. 如果遇到一些结构和样式比较简单的小图标，就用字体图标。
2. 如果遇到一些结构和样式复杂一点的小图片，就用精灵图。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630403.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630404.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630405.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630406.jpg)

# 2. 字体图标

字体图标是一些网页常见的小图标，我们直接网上下载即可。因此使用可以分为：

1. 字体图标的下载
2. 字体图标的引入（引入到我们html页面中）
3. 字体图标的追加（以后添加新的小图标）

# 2. 字体图标

# 2.3 字体图标的下载

# 推荐下载网站：

- icomoon 字库 http://icomoon.io 推荐指数 ★★★★  
  IcoMoon 成立于 2011 年，推出了第一个自定义图标字体生成器，它允许用户选择所需要的图标，使它们成一字型。该字库内容种类繁多，非常全面，唯一的遗憾是国外服务器，打开网速较慢。
- 阿里iconfont字库 http://www.iconfont.cn/ 推荐指数 ★★★★

这个是阿里妈妈 M2UX 的一个 iconfont 字体图标字库，包含了淘宝图标库和阿里妈妈图标库。可以使用 AI 制作图标上传生成。重点是，免费！

# 2. 字体图标

# 2.4 字体图标的引入

下载完毕之后，注意原先的文件不要删，后面会用。

1. 把下载包里面的 fonts 文件夹放入页面根目录下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630407.jpg)

# 名称

- fonts
- images  
  01- 精灵图使用.html  
  02-拼出自己名字.html  
  03-字体图标的使用.html

# 2. 字体图标

# 2.4.1 字体文件格式

不同浏览器所支持的字体格式是不一样的，字体图标之所以兼容，就是因为包含了主流浏览器支持的字体文件。

1. TureType(.ttl)格式.ttf字体是Windows和Mac的最常见的字体，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS
   Mobile、Safari4.2+；
2. Web Open Font Format(.woff)格式woff字体，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；
3. Embedded Open Type(.eot)格式.eot字体是IE专用字体，支持这种字体的浏览器有IE4+；
4. SVG(.svg)格式.svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile
   Safari3.2+；

# 2. 字体图标

# 2.4 字体图标的引入

2. 在CSS样式中全局声明字体：简单理解把这些字体文件通过css引入到我们页面中。

一定注意字体文件路径的问题。

```css
@font-face {
    font-family: 'icomoon';
    src: url('fonts/icomoon.eot?7kkyc2');
    src: url('fonts/icomoon.eot?7kkyc2#iefix') format('embedded-opentype'),
        url('fonts/icomoon.ttf?7kkyc2') format('truetype'),
        url('fonts/icomoon.woff?7kkyc2') format('woff'),
        url('fonts/icomoon.svg?7kkyc2#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
}
```

# 2. 字体图标

# 2.4 字体图标的引入

3. html 标签内添加小图标。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630408.jpg)

```asp
<span> </span>
```

# 2. 字体图标

# 2.4 字体图标的引入

4. 给标签定义字体。

```txt
span {
    font-family: "icomoon";
}
```

务必保证这个字体和上面@font-face里面的字体保持一致

```scss
@font-face{   
font-family:'icomoon';   
src:url('fonts/icomoon.eot?7kkyc2');   
src:url('fonts/icomoon.eot?7kkyc2#iefurl('fonts/icomoon.ttf?7kkyc2') formurl('fonts/icomoon.woff?7kkyc2') formurl('fonts/icomoon.svg?7kkyc2#icomoon   
font-weight:normal;   
font-style:normal;   
} /\*span使用字体图标\*/ span{ font-family:'icomoon'; font-size:100px;
```

# 2. 字体图标

# 2.5 字体图标的追加

如果工作中，原来的字体图标不够用了，我们需要添加新的字体图标到原来的字体文件中。

把压缩包里面的 selection.json 从新上传，然后选中自己想要新的图标，从新下载压缩包，并替换原来的文件即可。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630409.jpg)

# 2. 字体图标

# 字体图标加载的原理：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630410.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630411.jpg)

# 录

# Contents

$\spadesuit$  精灵图  
$\spadesuit$  字体图标  
$\Leftrightarrow$  CSS 三角  
$\Leftrightarrow$  CSS 用户界面样式  
$\Leftrightarrow$  vertical-align 属性应用  
$\spadesuit$  溢出的文字省略号显示  
$\spadesuit$  常见布局技巧

# 3. CSS 三角

网页中常见一些三角形，使用CSS直接画出来就可以，不必做成图片或者字体图标。

一张图，你就知道 CSS 三角是怎么来的了, 做法如下:

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630412.jpg)

```css
div {
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border: 50px solid transparent;
    border-left-color: pink;
}
```

# 3. CSS 三角

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630413.jpg)

案例：京东三角

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630414.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630415.jpg)

# 3. CSS 三角

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630416.jpg)

课堂案例：完成如下图像

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630417.jpg)

# 录

# Contents

$\spadesuit$  精灵图  
$\spadesuit$  字体图标  
$\spadesuit$  CSS 三角  
$\Leftrightarrow$  CSS 用户界面样式  
$\Leftrightarrow$  vertical-align 属性应用  
$\spadesuit$  溢出的文字省略号显示  
$\spadesuit$  常见布局技巧

# 4. CSS 用户界面样式

# 4.1 什么是界面样式

所谓的界面样式，就是更改一些用户操作样式，以便提高更好的用户体验。

更改用户的鼠标样式  
表单轮廓

- 防止表单域拖拽

# 4. CSS 用户界面样式

# 4.1 鼠标样式 cursor

```css
li {cursor: pointer; }
```

设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状。

<table><tr><td>属性值</td><td>描述</td></tr><tr><td>default</td><td>小白 默认</td></tr><tr><td>pointer</td><td>小手</td></tr><tr><td>move</td><td>移动</td></tr><tr><td>text</td><td>文本</td></tr><tr><td>not-allowed</td><td>禁止</td></tr></table>

# 4. CSS 用户界面样式

# 4.2 轮廓线 outline

给表单添加 outline: 0; 或者 outline: none; 样式之后，就可以去掉默认的蓝色边框。

input {outline: none; }

# 4. CSS 用户界面样式

# 4.3 防止拖拽文本域 resize

实际开发中，我们文本域右下角是不可以拖拽的。

textarea{ resize: none;}

# 录

# Contents

$\spadesuit$  精灵图  
$\spadesuit$  字体图标  
$\spadesuit$  CSS 三角  
$\spadesuit$  CSS 用户界面样式  
vertical-align 属性应用  
$\spadesuit$  溢出的文字省略号显示  
$\spadesuit$  常见布局技巧

# 5. vertical-align 属性应用

CSS 的 vertical-align 属性使用场景：经常用于设置图片或者表单(行内块元素)和文字垂直对齐。

官方解释：用于设置一个元素的垂直对齐方式，但是它只针对于行内元素或者行内块元素有效。

语法：

vertical-align : baseline | top | middle | bottom

<table><tr><td>值</td><td>描述</td></tr><tr><td>baseline</td><td>默认。元素放置在父元素的基线上。</td></tr><tr><td>top</td><td>把元素的顶端与行中最高元素的顶端对齐</td></tr><tr><td>middle</td><td>把此元素放置在父元素的中部。</td></tr><tr><td>bottom</td><td>把元素的顶端与行中最低的元素的顶端对齐。</td></tr></table>

# 5. vertical-align 属性应用

vertical-align : baseline | top | middle | bottom

中文ajchlx字符

顶线（top line）

中线（middle line）

基线（baseline）

底线（bottom line）

行高：160px

# 5. vertical-align 属性应用

# 5.1 图片、表单和文字对齐

图片、表单都属于行内块元素，默认的 vertical-align 是基线对齐。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630418.jpg)

此时可以给图片、表单这些行内块元素的 vertical-align 属性设置为 middle 就可以让文字和图片垂直居中对齐了。

# 5. vertical-align 属性应用

# 5.2 解决图片底部默认空白缝隙问题

bug : 图片底侧会有一个空白缝隙，原因是行内块元素会和文字的基线对齐。

主要解决方法有两种：

1. 给图片添加 vertical-align:middle | top| bottom 等。（提倡使用的）
2. 把图片转换为块级元素 display: block;

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630419.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630420.jpg)

# 录

# Contents

$\spadesuit$  精灵图  
$\spadesuit$  字体图标  
$\spadesuit$  CSS 三角  
$\spadesuit$  CSS 用户界面样式  
$\spadesuit$  vertical-align 属性应用  
溢出的文字省略号显示  
$\spadesuit$  常见布局技巧

# 6. 溢出的文字省略号显示

# 1. 单行文本溢出显示省略号

京东快报

更多》

热议 苹果新机价格曝光，...  
HOT 华为P40来袭：P30...  
HOT 华为火力全开，P30...  
推荐 华为Mate20可以抄...

# 2. 多行文本溢出显示省略号

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630421.jpg)

日本84岁上皇后美智子癌症手术2天后出院，向医护人员…

# 6. 溢出的文字省略号显示

# 1. 单行文本溢出显示省略号--必须满足三个条件

```scss
/\*1．先强制一行内显示文本\*/  
white-space: nowrap;（默认normal自动换行）  
/\*2．超出的部分隐藏\*/  
overflow: hidden;  
/\*3．文字用省略号替代超出的部分\*/  
text-overflow: ellipsis;
```

# 6. 溢出的文字省略号显示

# 2. 多行文本溢出显示省略号

多行文本溢出显示省略号，有较大兼容性问题，适合于webKit浏览器或移动端（移动端大部分是webkit内核）

```scss
overflow: hidden;  
text-overflow: ellipsis;  
/* 弹性伸缩盒子模型显示 */  
display: -webkit-box;  
/* 限制在一个块元素显示的文本的行数 */  
-webkit-line-clamp: 2;  
/* 设置或检索伸缩盒对象的子元素的排列方式 */  
-webkit-box-orient: vertical;
```

更推荐让后台人员来做这个效果，因为后台人员可以设置显示多少个字，操作更简单。

# 录

# Contents

$\spadesuit$  精灵图  
$\spadesuit$  字体图标  
$\spadesuit$  CSS 三角  
$\spadesuit$  CSS 用户界面样式  
$\spadesuit$  vertical-align 属性应用  
$\spadesuit$  溢出的文字省略号显示  
常见布局技巧

# 7. 常见布局技巧

# 巧妙利用一个技术更快更好的布局：

1margin负值的运用

2. 文字围绕浮动元素
3. 行内块的巧妙运用  
   4.css三角强化

# 7. 常见布局技巧

# 1. margin负值运用

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630422.jpg)  
德国益步跑步机电动WIFI智能多功能健身房

评价901收藏39698

¥3999 ¥14999

月销270笔

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630423.jpg)  
包装HEAD海德椭圆仪太空漫步机家用超静音椭圆机

评价678收藏9548

¥3499 ¥9900

月销160笔

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630424.jpg)  
对抗服足球训练号码背心成人儿童分队组拓展

评价0收藏2470

¥3.2 ¥8

月销1516笔

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630425.jpg)  
包邮head海德椭圆机太空漫步机家用健身椭圆仪

评价601收藏8414

¥3799 ¥899

月销79笔

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630426.jpg)  
包邮 美国icon爱康家用静音减震跑步机室内折叠智

评价9收藏536

¥6499 ¥8999

月销5笔

# 7. 常见布局技巧

# 1. margin负值运用

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630427.jpg)

1. 让每个盒子margin 往左侧移动 -1px 正好压住相邻盒子边框
2. 鼠标经过某个盒子的时候，提高当前盒子的层级即可（如果没有有定位，则加相对定位（保留位置），如果有定位，则加z-index）

# 7. 常见布局技巧

# 2. 文字围绕浮动元素

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630428.jpg)

【集锦】热身赛-巴西0-1秘鲁 内马尔替补两人血染赛场

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630429.jpg)

【集锦】热身赛-阿根廷4-0 墨西哥劳塔罗22分钟上演 帽子戏法

浮动

热身赛集】-热秘赛+把两人血染1# 内马尔替补两人血染赛场

巧妙运用浮动元素不会压住文字的特性

# 7. 常见布局技巧

# 3. 行内块巧妙运用

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630430.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630431.jpg)

正品保障

正品保障，提供发票

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630432.jpg)

正品保障

正品保障，提供发票

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630433.jpg)

正品保障

正品保障，提供发票

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630434.jpg)

正品保障

正品保障，提供发票

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630435.jpg)

正品保障

正品保障，提供发票

# 页码在页面中间显示：

1. 把这些链接盒子转换为行内块，之后给父级指定 text-align:center;
2. 利用行内块元素中间有缝隙，并且给父级添加 text-align:center；行内块元素会水平会居中

# 7. 常见布局技巧

# 4. CSS 三角强化

¥2099.00

￥2649.00

原理：

代码:

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630436.jpg)

```txt
width: 0;  
height: 0;  
border-color: transparent red transparent transparent;  
border-style: solid;  
border-width: 22px 8px 0 0;
```

# 8. CSS 初始化

不同浏览器对有些标签的默认值是不同的，为了消除不同浏览器对HTML文本呈现的差异，照顾浏览器的兼容，我们需要对CSS初始化

简单理解：CSS初始化是指重设浏览器的样式。(也称为CSS reset)

每个网页都必须首先进行CSS初始化。

这里我们以京东CSS初始化代码为例。

# Unicode编码字体：

把中文字体的名称用相应的Unicode编码来代替，这样就可以有效的避免浏览器解释CSS代码时候出现乱码的问题。

比如：

黑体\9ED1\4F53

宋体\5B8B\4F53

微软雅黑\5FAE\8F6F\96C5\9ED1

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129001630437.jpg)

# 黑马程序员

www.ittheima.com

传智播客旗下高端IT教育品牌
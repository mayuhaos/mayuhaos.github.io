![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026719.jpg)

# 思考

# 方案？

1. 页面布局文字能否随着屏幕大小变化而变化？
2. 流式布局和flex布局主要针对于宽度布局，那高度如何设置？
3. 怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放？

# 目

# 录 Contents

$\Leftrightarrow$  rem 基础  
媒体查询  
Less基础  
$\spadesuit$  rem适配方案  
$\spadesuit$  苏宁首页案例制作

# 1. rem 基础

# rem 单位

rem(root em)是一个相对单位，类似于em，em是父元素字体大小。

不同的是rem的基准是相对于html元素的字体大小。

比如，根元素（html）设置font-size=12px；非根元素设置width:2rem；则换成px表示就是24px。

rem的优势：父元素文字大小可能不一致，但是整个页面只有一个html，可以很好来控制整个页面的元素大小。

```txt
/\*根html为12px\*/   
html{ font-size:12px;   
}   
/\*此时div的字体大小就是  $24\mathrm{px}$  \*/ div{ font-size:2rem;   
}
```

# 目

# 录 Contents

$\spadesuit$  rem 基础  
媒体查询  
Less基础  
$\spadesuit$  rem适配方案  
$\spadesuit$  苏宁首页案例制作

# 2. 媒体查询

# 2.1 什么是媒体查询

媒体查询（Media Query）是CSS3新语法。

- 使用 @media 查询，可以针对不同的媒体类型定义不同的样式
- @media 可以针对不同的屏幕尺寸设置不同的样式  
  当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面
- 目前针对很多苹果手机、Android手机，平板等设备都用得到多媒体查询

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026720.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026721.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026722.jpg)

# 2. 媒体查询

# 2.2 语法规范

```txt
@media mediatype and|not|only (media feature) { CSS-Code; }
```

- 用 @media 开头 注意@符号
- mediatype 媒体类型
- 关键字 and not only
- media feature 媒体特性 必须有小括号包含

# 2. 媒体查询

# 2.2 语法规范

# 1. mediatype 查询类型

将不同的终端设备划分成不同的类型，称为媒体类型

<table><tr><td>值</td><td>解释说明</td></tr><tr><td>all</td><td>用于所有设备</td></tr><tr><td>print</td><td>用于打印机和打印预览</td></tr><tr><td>scree</td><td>用于电脑屏幕，平板电脑，智能手机等</td></tr></table>

# 2. 媒体查询

# 2.2 语法规范

# 2. 关键字

关键字将媒体类型或多个媒体特性连接到一起做为媒体查询的条件。

- and: 可以将多个媒体特性连接到一起，相当于“且”的意思。
- not: 排除某个媒体类型，相当于“非”的意思，可以省略。
- only: 指定某个特定的媒体类型，可以省略。

# 2. 媒体查询

# 2.2 语法规范

# 3. 媒体特性

每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。我们暂且了解三个。注意他们要加小括号包含

<table><tr><td>值</td><td>解释说明</td></tr><tr><td>width</td><td>定义输出设备中页面可见区域的宽度</td></tr><tr><td>min-width</td><td>定义输出设备中页面最小可见区域宽度</td></tr><tr><td>max-width</td><td>定义输出设备中页面最大可见区域宽度</td></tr></table>

# 2. 媒体查询

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026723.jpg)

# 案例：根据页面宽度改变背景变色

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026724.jpg)

# 2. 媒体查询

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026725.jpg)

# 案例：实现思路

(1) 按照从大到小的或者从小到大的思路  
(2) 注意我们有最大值 max-width 和最小值 min-width 都是包含等于的  
(3) 当屏幕小于540像素，背景颜色变为蓝色  $(x < = 539)$  
(4) 当屏幕大于等于540像素并且小于等于969像素的时候背景颜色为绿色（ $540 = <x <= 969$ ）  
(5) 当屏幕大于等于 970 像素的时候, 背景颜色为红色 (x >= 970)

注意：为了防止混乱，媒体查询我们要按照从小到大或者从大到小的顺序来写,但是我们最喜欢的还是从小到大来写，这样代码更简洁

# 2. 媒体查询

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026726.jpg)  
案例：媒体查询从小到大优势代码分析

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026727.jpg)  
第三档会覆盖第二档中冲突的部分,也就是大于等于970的部分,因此第二档只有540到969之间有效

# 2. 媒体查询

# 2.3 媒体查询+rem实现元素动态大小变化

rem单位是跟着html来走的，有了rem页面元素可以设置不同大小尺寸媒体查询可以根据不同设备宽度来修改样式媒体查询  $+\mathrm{rem}$
就可以实现不同设备宽度，实现页面元素大小的动态变化

# 2. 媒体查询

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026728.jpg)

案例：媒体查询+rem实现元素变化

```txt
$\begin{array}{l}\texttt{Background:}\boxed{\texttt{green}};\\ \end{array}$    
}   
@media（min-width：320px）{ html font-size:50px; 1   
}   
@media（min-width：640px）{ html { font-size:100px; }   
} /\*这是一个适配640px320px设备的例子 </style>   
head>   
ody> <div class  $=$  "header">购物车</div>
```

```txt
Title  $x +$  -  $\square \times$  C file://C/Usersandy/Desktop/5-4.html
```

# 2. 媒体查询

# 2.4 引入资源 (理解)

当样式比较繁多的时候，我们可以针对不同的媒体使用不同 stylesheets（样式表）。

原理，就是直接在link中判断设备的尺寸，然后引用不同的css文件。

# 1. 语法规范

```twig
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```

# 2. 示例

```txt
<link rel="stylesheet" href="styleA.css" media="screen and (min-width: 400px)"?>
```

# 目

# 录 Contents

$\spadesuit$  rem基础  
媒体查询  
less基础  
$\spadesuit$  rem适配方案  
$\spadesuit$  苏宁首页案例制作

# 3. Less 基础

# 3.1 维护css的弊端

CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。

- CSS需要书写大量看似没有逻辑的代码，CSS冗余度是比较高的。
- 不方便维护及扩展，不利于复用。
- CSS没有很好的计算能力
- 非前端开发工程师来讲，往往会因为缺少CSS编写经验而很难写出组织良好且易于维护的CSS代码项目。

# 1. Less 基础

# 3.2 Less 介绍

Less（Leaner Style Sheets的缩写）是一门CSS扩展语言，也成为CSS预处理器。

做为 CSS 的一种形式的扩展，它并没有减少 CSS 的功能，而是在现有的 CSS 语法上，为 CSS 加入程序式语言的特性。

它在 CSS 的语法基础之上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS
的维护成本，就像它的名称所说的那样，Less 可以让我们用更少的代码做更多的事情。

Less中文网址：http://lesscss.cn/

常见的CSS预处理器：Sass、Less、Stylus

一句话：Less 是一门 CSS 预处理语言，它扩展了CSS的动态特性。

# 1. Less 基础

# 3.3 Less 安装 (注意如果使用vscode无需安装less)

① 安装nodejs，可选择版本(8.0)，网址：http://nodejs.cn/download/  
(2) 检查是否安装成功，使用cmd命令（win10是window+r打开运行输入cmd）--- 输入“node-v”查看版本即可  
(3) 基于nodejs在线安装Less，使用cmd命令“npm install -g less”即可  
(4) 检查是否安装成功，使用cmd命令“lessc -v”查看版本即可

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026729.jpg)

# 1. Less 基础

# Less 使用

我们首先新建一个后缀名为less的文件，在这个less文件里面书写less语句。

Less 变量  
Less编译  
Less 嵌套  
Less运算

# 1. Less 基础

# 3.4 Less 变量

变量是指没有固定的值，可以改变的。因为我们CSS中的一些颜色和数值等经常使用。

@变量名：值；

# 1. 变量命名规范

- 必须有@为前缀
- 不能包含特殊字符
- 不能以数字开头  
  $\bullet$  大小写敏感

@color: pink;

# 1. Less 基础

# 3.4 Less 变量

变量是指没有固定的值，可以改变的。因为我们CSS中的一些颜色和数值等经常使用。

@变量名：值；

# 2. 变量使用规范

```scss
//直接使用  
body{ color:@color; } a:hover{ color:@color; }
```

# 1. Less 基础

# 3.5 Less编译

本质上，Less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的
CSS 文件。

所以，我们需要把我们的less文件，编译生成为css文件，这样我们的html页面才能使用。

# 1. Less 基础

# 3.5 Less编译

# vocode Less 插件

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026730.jpg)

Easy LESS插件用来把less文件编译为.   
css文件   
安装完毕插件，重新加载下vscode。   
只要保存一下Less文件，会自动生成Cs 文件。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026731.jpg)

# 1. Less 基础

# 3.6 Less 嵌套

我们经常用到选择器的嵌套

```txt
#header .logo {
width: 300px;
}
```

# Less 嵌套写法

```scss
#header {
    .logo {
        width: 300px;
    }
}
```

# 1. Less 基础

# 3.6 Less 嵌套

如果遇见 (交集|伪类|伪元素选择器)

- 内层选择器的前面没有 & 符号, 则它被解析为父选择器的后代;
- 如果有 & 符号, 它就被解析为父元素自身或父元素的伪类。

```css
a:hover{ color:red; }
```

# Less 嵌套写法

```txt
a{ &:hover{ color:red; }   
}
```

# 3.7 Less 运算 ★

任何数字、颜色或者变量都可以参与运算。就是Less提供了加（+）、减（-）、乘（*）、除（/）算术运算。

```scss
/*Less 里面写*/  
@withdh: 10px + 5;  
div {  
    border: @withdh solid red;  
}  
/*生成的css*/  
div {  
    border: 15px solid red;  
}  
/*Less 甚至还可以这样 */  
width: (@width + 5) * 2;
```

# 1. Less 基础

# 3.7 Less 运算 ★

# 注意:

- 乘号  $(^{*})$  和除号(/)的写法
- 运算符中间左右有个空格隔开  $1 \mathrm{px} + 5$
- 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位  
  如果两个值之间只有一个值有单位，则运算结果就取该单位

# 目

# 录 Contents

$\spadesuit$  rem基础  
媒体查询  
less基础  
$\Leftrightarrow$  rem适配方案  
$\spadesuit$  苏宁首页案例制作

# 思考

# rem 适配方案

1. 我们适配的目标是什么？  
   2.怎么去达到这个目标的？
3. 在实际的开发当中使用？

# 答案

# rem 适配方案

1. 让一些不能等比自适应的元素，达到当设备尺寸发生改变的时候，等比例适配当前设备。
2. 使用媒体查询根据不同设备按比例设置html的字体大小，然后页面元素使用rem做尺寸单位，当html字体大小变化元素尺寸也会发生变化，从而达到等比缩放的适配。

# 4.1 rem 实际开发适配方案

(1) 按照设计稿与设备宽度的比例，动态计算并设置html根标签的font-size大小；（媒体查询）  
(2) CSS 中, 设计稿元素的宽、高、相对位置等取值, 按照同等比例换算为 rem 为单位的值;

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026733.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026734.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026735.jpg)

# 4. rem 适配方案

# 4.2 rem 适配方案技术使用 (市场主流)

# 技术方案1

less  
媒体查询

- rem

# 技术方案2 (推荐)

flexible.js  
rem

# 总结：

1. 两种方案现在都存在。
2. 方案2 更简单，现阶段大家无需了解里面的js代码。

# 4. rem 适配方案

# 4.3 rem 实际开发适配方案1

rem + 媒体查询 + less 技术

# 1. 设计稿常见尺寸宽度

<table><tr><td>设备</td><td>常见宽度</td></tr><tr><td>iphone 4.5</td><td>640px</td></tr><tr><td>iphone 678</td><td>750px</td></tr><tr><td>Android</td><td>常见320px、360px、375px、384px、400px、414px、500px、720px
大部分4.7~5寸的安卓设备为720px</td></tr></table>

一般情况下，我们以一套或两套效果图适应大部分的屏幕，放弃极端屏或对其优雅降级，牺牲一些效果现在基本以750为准。

# 4. rem 适配方案

# 4.3 rem 实际开发适配方案1

# 2. 动态设置 html 标签 font-size 大小

(1) 假设设计稿是  $750 \mathrm{px}$  
(2) 假设我们把整个屏幕划分为15等份（划分标准不一可以是20份也可以是10等份）  
(3) 每一份作为html字体大小，这里就是50px。  
(4) 那么在  $320 \mathrm{px}$  设备的时候, 字体大小为  $320 / 15$  就是  $21.33 \mathrm{px}$  
(5) 用我们页面元素的大小除以不同的html字体大小会发现他们比例还是相同的  
(6) 比如我们以 750 为标准设计稿  
⑦ 一个100*100像素的页面元素在750屏幕上，就是100/50转换为rem是2rem*2rem比例是1比1  
⑧ 320屏幕下，html 字体大小为 21.33 则  $2\mathrm{rem} = 42.66\mathrm{px}$  此时宽和高都是 42.66 但是宽和高的比例还是
1比1  
(9) 但是已经能实现不同屏幕下页面元素盒子等比例缩放的效果

# 4. rem 适配方案

# 4.3 rem 实际开发适配方案1

# 3. 元素大小取值方法

(1) 最后的公式：页面元素的rem值 = 页面元素值 (px) / (屏幕宽度 / 划分的份数)  
② 屏幕宽度/划分的份数就是htmlfont-size的大小  
③ 或者：页面元素的rem值 = 页面元素值 (px) / html font-size 字体大小

# 目

# 录 Contents

$\spadesuit$  rem基础  
媒体查询  
less基础  
$\spadesuit$  rem适配方案  
苏宁首页案例制作

# 5. 苏宁网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026736.jpg)

# 案例：苏宁网移动端首页

访问地址：m.suning.com

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026737.jpg)

# 5. 苏宁网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026738.jpg)

# 案例：苏宁网移动端首页

# 1. 技术选型

方案：我们采取单独制作移动页面方案

技术：布局采取rem适配布局（less + rem + 媒体查询）

设计图：本设计图采用 750px 设计尺寸

# 5. 苏宁网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026739.jpg)

案例：苏宁网移动端首页

# 2.搭建相关文件夹结构

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026740.jpg)

# 5. 苏宁网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026741.jpg)

# 案例：苏宁网移动端首页

# 3. 设置视口标签以及引入初始化样式

```html
<meta name="viewport" content="width  $\equiv$  device-width, user-scalable=no, initial-scale  $= 1.0$  , maximum-scale  $= 1.0$  , minimum-scale  $= 1.0"$  > <link rel="stylesheet" href="css/normalize.css">
```

# 5. 苏宁网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026742.jpg)

# 案例：苏宁网移动端首页

# 4. 设置公共common.less文件

1. 新建common.less 设置好最常见的屏幕尺寸，利用媒体查询设置不同的html字体大小，因为除了首页其他页面也需要
2. 我们关心的尺寸有 320px、360px、375px、384px、400px、414px、424px、480px、540px、720px、750px
3. 划分的份数我们定为 15 等份
4. 因为我们pc端也可以打开我们苏宁移动端首页，我们默认html字体大小为50px，注意这句话写到最上面

# 5. 苏宁网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026743.jpg)

# 案例：苏宁网移动端首页

# 5. 新建index.less文件

1. 新建index.less 这里面写首页的样式
2. 将刚才设置好的 common.less 引入到 index.less 里面 语法如下:

```txt
// 在 index.less 中导入 common.less 文件 @import "common"
```

3.生成index.css引入到index.html里面

# 5. 苏宁网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026744.jpg)

# 案例：苏宁网移动端首页

# 6. body样式

```css
body {
min-width: 320px;
width:15rem;
margin: 0 auto;
line-height: 1.5;
font-family: Arial, Helvetica;
background: #F2F2F2;
}
```

# 6. rem 适配方案2

# 1. 简洁高效的rem适配方案flexible.js

# 技术方案1

less  
媒体查询

- rem

# 技术方案2 (推荐)

flexible.js  
rem

# 6. rem 适配方案2

# 6.1 简洁高效的rem适配方案flexible.js

手机淘宝团队出的简洁高效 移动端适配库

我们再也不需要在写不同屏幕的媒体查询，因为里面js做了处理

它的原理是把当前设备划分为10等份，但是不同设备下，比例还是一致的。

我们要做的，就是确定好我们当前设备的html文字大小就可以了

比如当前设计稿是 750px，那么我们只需要把 html 文字大小设置为 75px(750px / 10) 就可以

里面页面元素rem值：页面元素的px值/75

剩余的，让flexible.js来去算

github地址：https://github.com/amfe/lib-flexible

# 6. rem 适配方案2

# 6.2 使用适配方案2制作苏宁移动端首页

# 1. 技术选型

方案：我们采取单独制作移动页面方案

技术：布局采取rem适配布局2 (flexible.js + rem)

设计图：本设计图采用 750px 设计尺寸

# 6. rem 适配方案2

# 6.2 使用适配方案2制作苏宁移动端首页

# 2.搭建相关文件夹结构

;动WEB开发/rem布局 > 案例 > html5

名称

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026745.jpg)

CSS

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026746.jpg)

images

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026747.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026748.jpg)

upload

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026749.jpg)

index.html

# 6. rem 适配方案2

# 6.2 使用适配方案2制作苏宁移动端首页

# 3. 设置视口标签以及引入初始化样式还有js文件

```txt
<meta name="viewport" content="width  $\equiv$  device-width, user-scalable=no, initial-scale  $= 1.0$  , maximum-scale  $= 1.0$  , minimum-scale  $= 1.0"$  > <link rel  $=$  "stylesheet" href  $=$  "css/normalize.css"> <link rel  $=$  "stylesheet" href  $=$  "css/index.css">
```

我们页面需要引入这个js文件

```html
在 index.html 中引入 flexible.js 这个文件 <script src="js/flexible.js"></script>
```

# 6. rem 适配方案2

# 6.2 使用适配方案2制作苏宁移动端首页

# 4. body样式

```css
body {
min-width: 320px;
width:15rem;
margin: 0 auto;
line-height: 1.5;
font-family: Arial, Helvetica;
background: #F2F2F2;
}
```

# 6. rem 适配方案2

# 6.3 VSCode px 转换rem 插件 cssrem

这是一个神奇的插件

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026750.jpg)

# 6. rem 适配方案2

# 2. VSCode px 转换rem 插件 cssrem

这是一个神奇的插件

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026751.jpg)

# 6. rem 适配方案2

# 2. VSCode px 转换rem 插件 cssrem

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026752.jpg)

# 6. rem 适配方案2

# 2. VSCode px 转换rem 插件 cssrem

设置html字体大小基准值

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026753.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129004026754.jpg)

# 黑马程序员

www.itheima.com

传智播客旗下高端IT教育品牌
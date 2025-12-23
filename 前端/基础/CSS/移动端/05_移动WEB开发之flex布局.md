![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905726.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905727.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905728.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905729.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905730.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905731.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905732.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905733.jpg)

黑马程序员TM

www.itheima.com

传智播客旗下

高端IT教育品牌

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905734.jpg)

# 移动WEB开发之flex布局

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905735.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905736.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905737.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905738.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905739.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905740.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905741.jpg)

# 目录 Contents

flex布局体验  
$\spadesuit$  flex布局原理  
$\spadesuit$  flex布局父项常见属性  
$\spadesuit$  flex布局子项常见属性  
$\spadesuit$  携程网首页案例制作

# 1. flex布局体验

# 1.1 传统布局与flex布局

# 传统布局

$\bullet$  兼容性好  
$\bullet$  布局繁琐

- 局限性，不能再移动端很好的布局

# flex 弹性布局

- 操作方便，布局极为简单，移动端应用很广泛  
  PC端浏览器支持情况较差  
  IE 11或更低版本，不支持或仅部分支持

# 建议：

1. 如果是PC端页面布局，我们还是传统布局。
2. 如果是移动端或者不考虑兼容性问题的PC端页面布局，我们还是使用flex弹性布局

# 1. flex布局体验

# 1.2 初体验

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905742.jpg)

# 1. flex布局体验

# 1.2 初体验

# 1.搭建HTML结构

```txt
<div>
    <span>1</span>
    <span>2</span>
    <span>3</span>
</div>
```

- 里面的3个span是行内元素

# 1. flex布局体验

# 1.2 初体验

# 2. CSS样式

(1) span 直接给宽度和高度，背景颜色，还有蓝色边框  
(2) 给 div 只需要添加 “display: flex” 即可

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905743.jpg)

# 目录 Contents

$\spadesuit$  flex布局体验  
flex布局原理  
$\spadesuit$  flex布局父项常见属性  
$\spadesuit$  flex布局子项常见属性  
$\spadesuit$  携程网首页案例制作

# 2. flex布局原理

# 2.1 布局原理

flex 是 flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 flex 布局。

- 当我们为父盒子设为flex布局以后，子元素的float、clear和vertical-align属性将失效。
- 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布局 = flex布局

# 2. flex布局原理

# 2.1 布局原理

采用Flex布局的元素，称为Flex容器（flexcontainer），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flexitem），简称"
项目"。

- 体验中 div 就是 flex 父容器。
- 体验中 span 就是子容器 flex项目
- 子容器可以横向排列也可以纵向排列

# 总结flex布局原理：

就是通过给父盒子添加flex属性，来控制子盒子的位置和排列方式

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905744.jpg)

# 目录 Contents

$\spadesuit$  flex布局体验  
$\spadesuit$  flex布局原理  
flex布局父项常见属性  
$\spadesuit$  flex布局子项常见属性  
$\spadesuit$  携程网首页案例制作

# 3. flex布局父项常见属性

# 3.1 常见父项属性

以下由6个属性是对父元素设置的

- flex-direction: 设置主轴的方向
- justify-content: 设置主轴上的子元素排列方式  
  flex-wrap: 设置子元素是否换行
- align-content: 设置侧轴上的子元素的排列方式 (多行)
- align-items: 设置侧轴上的子元素排列方式 (单行)
- flex-flow: 复合属性, 相当于同时设置了 flex-direction 和 flex-wrap

# 3. flex布局父项常见属性

# 3.2 flex-direction 设置主轴的方向

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905745.jpg)

# 1. 主轴与侧轴

在flex布局中，是分为主轴和侧轴两个方向，同样的叫法有：行和列、x轴和y轴

默认主轴方向就是  $x$  轴方向，水平向右  
默认侧轴方向就是y轴方向，水平向下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905746.jpg)

# 3. flex布局父项常见属性

# 3.2 flex-direction 设置主轴的方向

# 2. 属性值

flex-direction 属性决定主轴的方向（即项目的排列方向）

注意：主轴和侧轴是会变化的，就看flex-direction设置谁为主轴，剩下的就是侧轴。而我们的子元素是跟着主轴来排列的

<table><tr><td>属性值</td><td>说明</td></tr><tr><td>row</td><td>默认值从左到右</td></tr><tr><td>row-reverse</td><td>从右到左</td></tr><tr><td>column</td><td>从上到下</td></tr><tr><td>column-reverse</td><td>从下到上</td></tr></table>

# 3. flex布局父项常见属性

# 3.3 justify-content 设置主轴上的子元素排列方式

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905747.jpg)

justify-content 属性定义了项目在主轴上的对齐方式

注意：使用这个属性之前一定要确定好主轴是哪个

<table><tr><td>属性值</td><td>说明</td></tr><tr><td>flex-start</td><td>默认值 从头部开始 如果主轴是x轴, 则从左到右</td></tr><tr><td>flex-end</td><td>从尾部开始排列</td></tr><tr><td>center</td><td>在主轴居中对齐 (如果主轴是x轴则水平居中)</td></tr><tr><td>space-around</td><td>平分剩余空间</td></tr><tr><td>space-between</td><td>先两边贴边 再平分剩余空间 (重要)</td></tr></table>

# 3. flex布局父项常见属性

# 3.4 flex-wrap 设置子元素是否换行 ★

默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，flex布局中默认是不换行的。

<table><tr><td>属性值</td><td>说明</td></tr><tr><td>nowrap</td><td>默认值，不换行</td></tr><tr><td>wrap</td><td>换行</td></tr></table>

# 3. flex布局父项常见属性

# 3.5 align-items 设置侧轴上的子元素排列方式（单行）

该属性是控制子项在侧轴（默认是y轴）上的排列方式 在子项为单项（单行）的时候使用

<table><tr><td>属性值</td><td>说明</td></tr><tr><td>flex-start</td><td>从上到下</td></tr><tr><td>flex-end</td><td>从下到上</td></tr><tr><td>center</td><td>挤在一起居中（垂直居中）</td></tr><tr><td>stretch</td><td>拉伸（默认值）</td></tr></table>

# 3. flex布局父项常见属性

# 3.6 align-content 设置侧轴上的子元素的排列方式（多行）

设置子项在侧轴上的排列方式并且只能用于子项出现换行的情况（多行），在单行下是没有效果的。

<table><tr><td>属性值</td><td>说明</td></tr><tr><td>flex-start</td><td>默认值在侧轴的头部开始排列</td></tr><tr><td>flex-end</td><td>在侧轴的尾部开始排列</td></tr><tr><td>center</td><td>在侧轴中间显示</td></tr><tr><td>space-around</td><td>子项在侧轴平分剩余空间</td></tr><tr><td>space-between</td><td>子项在侧轴先分布在两头，再平分剩余空间</td></tr><tr><td>stretch</td><td>设置子项元素高度平分父元素高度</td></tr></table>

# 3. flex布局父项常见属性

# 3.6 align-content 和 align-items 区别

- align-items 适用于单行情况下，只有上对齐、下对齐、居中和拉伸
- align-content 适应于换行（多行）的情况下（单行情况下无效），可以设置上对齐、下对齐、居中、拉伸以及平均分配剩余空间等属性值。
- 总结就是单行找 align-items 多行找 align-content

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905748.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905749.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905750.jpg)

# 3. flex布局父项常见属性

# 3.7 flex-flow

flex-flow属性是flex-direction和flex-wrap属性的复合属性

flex-flow:row wrap;

- flex-direction: 设置主轴的方向
- justify-content: 设置主轴上的子元素排列方式
- flex-wrap: 设置子元素是否换行
- align-content: 设置侧轴上的子元素的排列方式 (多行)
- align-items: 设置侧轴上的子元素排列方式 (单行)
- flex-flow: 复合属性，相当于同时设置了 flex-direction 和 flex-wrap

# 目录 Contents

$\spadesuit$  flex布局体验  
$\spadesuit$  flex布局原理  
$\spadesuit$  flex布局父项常见属性  
$\Leftrightarrow$  flex布局子项常见属性  
$\spadesuit$  携程网首页案例制作

# 4. flex布局子项常见属性

- flex子项目占的份数
- align-self 控制子项自己在侧轴的排列方式
- order属性定义子项的排列顺序（前后顺序）

# 4. flex布局子项常见属性

# 4.1 flex属性

flex 属性定义子项目分配剩余空间，用flex来表示占多少份数。

```css
.item{ flex: <number>；/\*default0\*/ }
```

# 4. flex布局子项常见属性

# 4.2 align-self 控制子项自己在侧轴上的排列方式

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的
align-items 属性，如果没有父元素，则等同于 stretch。

```scss
span:nth-child(2) {
    /* 设置自己在侧轴上的排列方式 */
    align-self: flex-end;
}
```

# 4. flex布局子项常见属性

# 4.3 order 属性定义项目的排列顺序

数值越小，排列越靠前，默认为0。

注意：和z-index不一样。

```css
.item{ order: <number>; }
```

# 目录 Contents

$\spadesuit$  flex布局体验  
$\spadesuit$  flex布局原理  
$\spadesuit$  flex布局父项常见属性  
$\spadesuit$  flex布局子项常见属性  
$\Leftrightarrow$  携程网首页案例制作

# 5. 携程网首页案例制作

# 案例：携程网移动端首页

访问地址：m.ctrip.com

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905751.jpg)

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905752.jpg)

案例：携程网移动端首页

# 1. 技术选型

方案：我们采取单独制作移动页面方案

技术：布局采取flex布局

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905753.jpg)

案例：携程网移动端首页

# 2.搭建相关文件夹结构

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905754.jpg)

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905755.jpg)

# 案例：携程网移动端首页

# 3. 设置视口标签以及引入初始化样式

```txt
<meta name="viewport" content="width  $\equiv$  device-width, user-scalable=no, initial-scale  $= 1.0$  , maximum-scale  $= 1.0$  , minimum-scale  $= 1.0"$  > <link rel="stylesheet" href="css/normalize.css"> <link rel="stylesheet" href="css/index.css">
```

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905756.jpg)

# 案例：携程网移动端首页

# 4. 常用初始化样式

```css
body {
max-width: 540px;
min-width: 320px;
margin: 0 auto;
font: normal 14px/1.5 Tahoma, "Lucida Grande", Verdana, "Microsoft Yahei", STXihei, hei;
color: #000;
background: #f2f2f2;
overflow-x: hidden;
-webkit-tap-highlight-color: transparent;
}
```

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905757.jpg)

# 案例：携程网移动端首页

# 5. 常见模块命名

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905758.jpg)

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905759.jpg)

# 案例：携程网移动端首页

# 5. 常见模块命名

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905760.jpg)

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905761.jpg)

# 案例：携程网移动端首页

# 6. 常见flex布局思路

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905762.jpg)

# 5. 携程网首页案例制作

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905763.jpg)

# 案例：携程网移动端首页

# 7. 背景线性渐变

# Gradient Background

# 语法1:

background: linear-gradient(起始方向，颜色1，颜色2，...);

background: -webkit-linear-gradient(left, red, blue);

background: -webkit-linear-gradient(left top, red, blue);

背景渐变必须添加浏览器私有前缀

起始方向可以是：方位名词 或者 度数，如果省略默认就是 top

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129003905764.jpg)

# 黑马程序员

www.itheima.com

传智播客旗下高端IT教育品牌
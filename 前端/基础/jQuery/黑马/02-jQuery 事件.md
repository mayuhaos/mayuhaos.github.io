![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028660.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028661.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028662.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028663.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028664.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028665.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028666.jpg)

黑马程序员TM

www.itheima.com

传智播客旗下

高端IT教育品牌

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028667.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028668.jpg)

# jQuery 事件

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028669.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028670.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028671.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028672.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028673.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028674.jpg)

# 录 Contents

# 三

jQuery 事件注册  
jQuery 事件处理  
$\spadesuit$  jQuery 事件对象

# 1. jQuery 事件注册

# 单个事件注册

语法：

```javascript
element.事件(function(){})
```

```javascript
$("div") . click(function(   ) \{$  事件处理程序 \})
```

其他事件和原生基本一致。

比如mouseover、mouseout、blur、focus、change、keydown、keyup、resize、scroll等

# 录 Contents

# 三

$\spadesuit$  jQuery 事件注册  
jQuery 事件处理  
$\spadesuit$  jQuery 事件对象

# 2. jQuery 事件处理

# 2.1 事件处理 on() 绑定事件

on() 方法在匹配元素上绑定一个或多个事件的事件处理函数

# 语法：

element.on(events, [selector], fn)

1. events:一个或多个用空格分隔的事件类型，如"click"或"keydown"。
2. selector: 元素的子元素选择器。
3. fn:回调函数即绑定在元素身上的侦听函数。

# 2. jQuery 事件处理

# 2.1 事件处理 on() 绑定事件

on() 方法优势1:

可以绑定多个事件，多个处理事件处理程序。

```javascript
$("div").on({ mouseover: function(   )\{\}, mouseout: function(   )\{\}, click: function(   )\{\} }$ );
```

# 如果事件处理程序相同

```javascript
\( ("div") .on("mouseover mouseout", function() { \)\\( (this).toggleClass("current"); });
```

# 2. jQuery 事件处理

# 2.1 事件处理 on() 绑定事件

on() 方法优势2:

可以事件委派操作。事件委派的定义就是，把原来加给子元素身上的事件绑定在父元素身上，就是把事件委派给父元素。

```javascript
$('ul')$ .on('click', 'li', function() {
alert('hello world!");
});
```

在此之前有bind(), live() delegate()等方法来处理事件绑定或者事件委派，最新版本的请用on替代他们。

# 2. jQuery 事件处理

# 2.1 事件处理 on() 绑定事件

on() 方法优势3:

动态创建的元素，click() 没有办法绑定事件，on() 可以给动态生成的元素绑定事件

```javascript
\( ("div").on("click","p", function( {alert("俺可以给动态生成的元素绑定事件")}});
```

```javascript
$("div").append(\$  ("<p>我是动态创建的p</p>")");
```

# 2. jQuery 事件处理

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028675.jpg)

# 案例：发布微博案例

(1) 点击发布按钮, 动态创建一个小li, 放入文本框的内容和删除按钮, 并且添加到ul中。  
(2) 点击的删除按钮，可以删除当前的微博留言。

# 2. jQuery 事件处理

# 2.2 事件处理 off() 解绑事件

off() 方法可以移除通过 on() 方法添加的事件处理程序。

\( ( "p" ) .off() // 解绑p元素所有事件处理程序

\( ("p").off( "click") // 解绑p元素上面的点击事件 后面的 foo 是侦听函数名

\( (ul) .off("click", "li") ; // 解绑事件委托

如果有的事件只想触发一次，可以使用 one() 来绑定事件。

# 2. jQuery 事件处理

# 2.3 自动触发事件 trigger()

有些事件希望自动触发，比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。

element.click() // 第一种简写形式

element trigger("type") // 第二种自动触发模式

\( ("p") .on("click", function ( ) { alert("hi~"); } );

$\mathbb{S}^{*}$  ("p"). trigger("click"); // 此时自动触发点击事件，不需要鼠标点击

# 2. jQuery 事件处理

# 2.3 自动触发事件 trigger()

有些事件希望自动触发，比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。

element triggerHandler(type) // 第三种自动触发模式

triggerHandler模式不会触发元素的默认行为，这是和前面两种的区别。

# 录 Contents

# 三

$\spadesuit$  jQuery 事件注册  
$\spadesuit$  jQuery 事件处理  
jQuery 事件对象

# 3. jQuery 事件对象

事件被触发，就会有事件对象的产生。

```javascript
element.on(events, [selector], function(event) {}）
```

阻止默认行为：eventuhanDefault()或者return false

阻止冒泡：event.stopPropagation()

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129005028676.jpg)

# 黑马程序员

www.itheima.com

传智播客旗下高端IT教育品牌
# 今日目标：

- 能够使用VUE中常用指令和插值表达式
- 能够使用VUE生命周期函数 mounted
- 能够进行简单的 Element 页面修改
- 能够完成查询所有功能
- 能够完成添加功能

# 1, VUE

# 1.1 概述

接下来我们学习一款前端的框架，就是 VUE。

Vue 是一套前端框架，免除原生JavaScript中的DOM操作，简化书写。

我们之前也学习过后端的框架 Mybatis，Mybatis 是用来简化 jdbc 代码编写的；而 VUE 是前端的框架，是用来简化 JavaScript
代码编写的。前一天我们做了一个综合性的案例，里面进行了大量的DOM操作，如下

//获取表单数据

let brandName = document.getElementByld("brandName").value;

//设置数据

formData.brandName = brandName;

//获取表单数据

let companyName = document.getElementById("companyName").value;

//设置数据

formData.companyName = companyName;

学习了 VUE 后，这部分代码我们就不需要再写了。那么 VUE 是如何简化 DOM 书写呢？

基于MVVM(Model-View-Model)思想，实现数据的双向绑定，将编程的关注点放在数据上。之前我们是将关注点放在了DOM操作上；而要了解MVVM思想，必须先聊聊MVC思想，如下图就是MVC思想图解

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822504.jpg)  
MVC：只能实现模型到视图的单向展示

C 就是咱们 js 代码，M 就是数据，而 V 是页面上展示的内容，如下图是我们之前写的代码

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822506.jpg)

MVC 思想是没法进行双向绑定的。双向绑定是指当数据模型数据发生变化时，页面展示的会随之发生变化，而如果表单数据发生变化，绑定的模型数据也随之发生变化。接下来我们聊聊
MVVM 思想，如下图是三个组件图解

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822507.jpg)

图中的 Model 就是我们的数据，View 是视图，也就是页面标签，用户可以通过浏览器看到的内容；Model 和 View 是通过 viewModel
对象进行双向绑定的，而 viewModel 对象是 Vue 提供的。接下来让大家看一下双向绑定的效果，下图是提前准备的代码，输入框绑定了
username 模型数据，而在页面上也使用 {...} 绑定了 username 模型数据

```txt
<div id="app">
    <input v-model="username">
        <!--插值表达式-->
    }
</div>
<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                username:""
            }
        }
    })
```

通过浏览器打开该页面可以看到如下页面

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822508.jpg)

当我们输入框中输入内容，而输入框后面随之实时的展示我们输入的内容，这就是双向绑定的效果。

# 1.2 快速入门

Vue 使用起来是比较简单的，总共分为如下三步：

# 1. 新建 HTML 页面，引入 Vue.js文件

```twig
1 <script src="js/vue.js"></script>
```

# 2. 在JS代码区域，创建Vue核心对象，进行数据绑定

```javascript
1 new vue({  
2 el: "#app",  
3 data() {  
4 return {  
5 username: ""  
6 }  
7 }  
8 });
```

创建Vue对象时，需要传递一个js对象，而该对象中需要如下属性：

o el：用来指定哪儿些标签受Vue管理。该属性取值#app中的app需要是受管理的标签的id属性值  
○ data：用来定义数据模型  
• methods：用来定义函数。这个我们在后面就会用到

# 3. 编写视图

```handlebars
1 <div id="app">
2 <input name="username" v-model="username">
3 {{username}}
4 </div>
```

{ } 是 Vue 中定义的插值表达式，在里面写数据模型，到时候会将该模型的数据值展示在这个位置。

# 整体代码如下：

```txt
<!DOCTYPE html>   
<html lang  $\coloneqq$  "en">   
<head> <meta charset="UTF-8"> <title>Title</title>   
</head>   
<body>   
<div id  $\equiv$  "app"> <input v-model="username">   
<!--插值表达式-->   
{{username}}   
</div>   
<script src  $\equiv$  "js/vue.js"></script>   
<script>   
//1.创建Vue核心对象   
new vue({ el:"#app", data(){ //data()是ECMAScript6版本的新的写法 return { username:""/> 1 }   
}   
/*data:function（）{ return { username:""/> 1   
}*/   
}）;   
</script>   
</body>   
</html>
```

# 1.3 Vue 指令

指令：HTML标签上带有v-前缀的特殊属性，不同指令具有不同含义。例如：v-if，v-for...

常用的指令有:

<table><tr><td>指令</td><td>作用</td></tr><tr><td>v-bind</td><td>为HTML标签绑定属性值，如设置href,css样式等</td></tr><tr><td>v-model</td><td>在表单元素上创建双向数据绑定</td></tr><tr><td>v-on</td><td>为HTML标签绑定事件</td></tr><tr><td>v-if</td><td>条件性的渲染某元素，判定为true时渲染,否则不渲染</td></tr><tr><td>v-else</td><td></td></tr><tr><td>v-else-if</td><td></td></tr><tr><td>v-show</td><td>根据条件展示某元素，区别在于切换的是display属性的值</td></tr><tr><td>v-for</td><td>列表渲染，遍历容器的元素或者对象的属性</td></tr></table>

接下来我们挨个学习这些指令

# 1.3.1 v-bind & v-model 指令

<table><tr><td>指令</td><td>作用</td></tr><tr><td>v-bind</td><td>为HTML标签绑定属性值，如设置href,.css样式等</td></tr><tr><td>v-model</td><td>在表单元素上创建双向数据绑定</td></tr></table>

- v-bind

该指令可以给标签原有属性绑定模型数据。这样模型数据发生变化，标签属性值也随之发生变化

例如：

```html
1 <a v-bind:href="url">百度一下</a>
```

上面的 v-bind:" 可以简化写成 :，如下：

```html
1 <--  
2 v-bind 可以省略  
3 -->  
4 <a :href="url">百度一下</a>
```

- v-model

该指令可以给表单项标签绑定模型数据。这样就能实现双向绑定效果。例如：

```txt
1 <input name="username" v-model="username">
```

# 代码演示：

```html
1 <!--DOCTYPE html>
2 <html lang="en">
3 <head>
4 <meta charset="UTF-8">
5 <title>Title</title>
6 </head>
7 <body>
8 <div id="app">
9 <a v-bind:href="url">点击一下</a>
10 <a :href="url">点击一下</a>
11 <input v-model="url">
12 </div>
13
```

```html
14 <script src="js/vue.js"></script>  
15 <script>  
16 //1. 创建Vue核心对象  
17 new Vue({  
18 el:"#app",  
19 data(){  
20 return {  
21 username:"",  
22 url:"https://www.baidu.com"  
23 }  
24 }  
25 });  
26 </script>  
27 </body>  
28 </html>
```

通过浏览器打开上面页面，并且使用检查查看超链接的路径，该路径会根据输入框输入的路径变化而变化，这是因为超链接和输入框绑定的是同一个模型数据

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822509.jpg)

# 1.3.2 v-on 指令

<table><tr><td>指令</td><td>作用</td></tr><tr><td>v-on</td><td>为HTML标签绑定事件</td></tr></table>

我们在页面定义一个按钮，并给该按钮使用 v-on 指令绑定单击事件，html代码如下

```html
1 <input type="button" value="一个按钮" v-on:click="show()">
```

而使用 v-on 时还可以使用简化的写法，将 v-on: 替换成 @，html代码如下

```html
1 <input type="button" value="一个按钮" @click="show()">
```

上面代码绑定的 show() 需要在 Vue 对象中的 methods 属性中定义出来

```javascript
1 new vue({  
2 el: "#app",  
3 methods: {  
4 show() {  
5 alert("我被点了");  
6 }  
7 }  
8 });
```

注意：v-on：后面的事件名称是之前原生事件属性名去掉on。

例如：

- 单击事件：事件属性名是 onclick，而在vue中使用是 v-on:click

整体页面代码如下：

```html
<!DOCTYPE html>   
<html lang="en">   
<head>   
<meta charset="UTF-8">   
<title>Title</title>   
</head>   
<body>   
<div id="app">   
<input type="button" value="一个按钮" v-on:click="show"></br>   
<input type="button" value="一个按钮" @click="show"></br>   
</div>   
<script src="js/vue.js"></script>   
<script>   
//1. 创建Vue核心对象   
new vue({  
    el:"#app",  
    data() {  
        return {  
            username:"",  
        }  
    },  
    methods:{  
        show(){  
            alert("我被点了...");  
        }  
    }  
});   
</script>   
</body>   
</html>
```

# 1.3.3 条件判断指令

<table><tr><td>指令</td><td>作用</td></tr><tr><td>v-if</td><td rowspan="3">条件性的渲染某元素，判定为true时渲染,否则不渲染</td></tr><tr><td>v-else</td></tr><tr><td>v-else-if</td></tr><tr><td>v-show</td><td>根据条件展示某元素，区别在于切换的是display属性的值</td></tr></table>

接下来通过代码演示一下。在Vue中定义一个count的数据模型，如下

```javascript
1 //1. 创建Vue核心对象  
2 new vue({  
3 el:"#app",  
4 data(){  
5 return {  
6 count:3  
7 }  
8 }  
9 });
```

现在要实现，当 count 模型的数据是 3 时，在页面上展示 div1 内容；当 count 模型的数据是 4 时，在页面上展示 div2 内容；count
模型数据是其他值时，在页面上展示 div3。这里为了动态改变模型数据 count 的值，再定义一个输入框绑定 count 模型数据。html 代码如下：

整体页面代码如下：

```html
1 <div id="app">   
2 <div v-if="count == 3">div1</div>   
3 <div v-else-if="count == 4">div2</div>   
4 <div v-else>div3</div>   
5 <hr>   
6 <input v-model="count">   
7 </div>
```

```html
1 <!--DOCTYPE html>
2 <html lang="en">
3 <head>
4 <meta charset="UTF-8">
5 <title>Title</title>
6 </head>
7 <body>
8 <div id="app">
9 <div v-if="count == 3">div1</div>
10 <div v-else-if="count == 4">div2</div>
11 <div v-else>div3</div>
12 <hr>
13 <input v-model="count">
14 </div>
15
16 <script src="js/vue.js"></script>
17 <script>
18 //1. 创建Vue核心对象
19 new vue({
20 el:"#app",
21 data(){
22 return {
23 count:3
24 }
25 }
26 });
27 </script>
28 </body>
29 </html>
```

通过浏览器打开页面并在输入框输入不同的值，效果如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822510.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822511.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822512.jpg)

然后我们在看看 v-show 指令的效果，如果模型数据 count 的值是 3 时，展示 div v-show 内容，否则不展示，html页面代码如下

```html
1 <div v-show="count == 3">div v-show</div>  
2 <br>  
3 <input v-model="count">
```

浏览器打开效果如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822513.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822514.jpg)

通过上面的演示，发现 v-show 和 v-if 效果一样，那它们到底有什么区别呢？我们根据浏览器的检查功能查看源代码

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822515.jpg)

通过上图可以看出 v-show 不展示的原理是给对应的标签添加 display.css属性，并将该属性值设置为 none，这样就达到了隐藏的效果。而
v-if 指令是条件不满足时根本就不会渲染。

# 1.3.4 v-for 指令

<table><tr><td>指令</td><td>作用</td></tr><tr><td>v-for</td><td>列表渲染，遍历容器的元素或者对象的属性</td></tr></table>

这个指令看到名字就知道是用来遍历的，该指令使用的格式如下：

```handlebars
1 <标签v-for="变量名in集合模型数据">  
2 {{{变量名}}}  
3 </标签>
```

注意：需要循环那个标签，v-for 指令就写在那个标签上。

如果在页面需要使用到集合模型数据的索引，就需要使用如下格式：

```txt
1 <标签v-for \(=\) "（变量名，索引变量）in集合模型数据">   
2 <--索引变量是从0开始，所以要表示序号的话，需要手动的加1-->   
3 {{索引变量 \(+1\}\} \{\{变量名\}\}   
4 </标签>
```

# 代码演示：

```txt
1<!DOCTYPE html>   
2<html lang  $\coloneqq$  "en">   
3<head>   
4 <meta charset  $=$  "UTF-8">   
5<title>Title</title>   
6</head>   
7<body>   
8<div id  $\equiv$  "app">   
9<div v-for  $\equiv$  "addr in addrs">   
10{{addr}} {br>   
11 </div>   
12   
13 <hr>   
14 <div v-for  $\equiv$  "(addr,i) in addrs">   
15 {{i+1}}--{{addr}} {br>   
16 </div>   
17 </div>   
18   
19<script src  $\equiv$  "js/vue.js></script>   
20<script>
```

```html
21   
22 //1.创建Vue核心对象   
23 newVue({ el:"#app", data(){ return { addr:["北京","上海","西安"] }   
28   
29 }   
30 };   
31 </script>   
32 </body>   
33 </html>
```

通过浏览器打开效果如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822516.jpg)

1--北京  
2--上海  
3--西安

# 1.4生命周期

生命周期的八个阶段：每触发一个生命周期事件，会自动执行一个生命周期方法，这些生命周期方法也被称为钩子方法。

<table><tr><td>状态</td><td>阶段周期</td></tr><tr><td>beforeCreate</td><td>创建前</td></tr><tr><td>created</td><td>创建后</td></tr><tr><td>beforeMount</td><td>载入前</td></tr><tr><td>mounted</td><td>挂载完成</td></tr><tr><td>beforeUpdate</td><td>更新前</td></tr><tr><td>updated</td><td>更新后</td></tr><tr><td>beforeDestroy</td><td>销毁前</td></tr><tr><td>destroyed</td><td>销毁后</td></tr></table>

下图是Vue官网提供的从创建Vue到效果Vue对象的整个过程及各个阶段对应的钩子函数

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822517.jpg)

看到上面的图，大家无需过多的关注这张图。这些钩子方法我们只关注 mounted 就行了。

mounted：挂载完成，Vue初始化成功，HTML页面渲染成功。而以后我们会在该方法中发送异步请求，加载数据。

# 1.5 案例

# 1.5.1需求

使用Vue简化我们在前一天ajax学完后做的品牌列表数据查询和添加功能

新增

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠</td><td>100</td><td>三只松鼠，好吃不上火</td><td>启用</td><td>修改删除</td></tr><tr><td>2</td><td>优衣库</td><td>优衣库</td><td>10</td><td>优衣库，服适人生</td><td>禁用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>1000</td><td>为发烧而生</td><td>启用</td><td>修改删除</td></tr></table>

此案例只是使用Vue对前端代码进行优化，后端代码无需修改。

# 1.5.2 查询所有功能

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822518.jpg)

1. 在brand.html页面引入vue的js文件

1 <script src="js/vue.js"></script>

# 2. 创建Vue对象

在Vue对象中定义模型数据  
。在钩子函数中发送异步请求，并将响应的数据赋值给数据模型

```javascript
1 new vue({  
2 el: "#app",  
3 data(){  
4 return{  
5 brands:[]  
6 }  
7 },  
8 mounted(){  
9 //页面加载完成后，发送异步请求，查询数据  
10 var _this = this;  
11 axisos({  
12 method:"get",  
13 url:"http://localhost:8080/brand-demo/selectAllServlet"  
14 }) .then(function (resp) {  
15 _this.brands = resp.data;  
16 }  
17 }  
18 })
```

# 3. 修改视图

定义<div id="app"></div>，指定该 div 标签受 Vue 管理  
o 将 body 标签中所有的内容拷贝作为上面 div 标签中  
删除表格的多余数据行，只留下一个  
在表格中的数据行上使用 v-for 指令遍历

```txt
1 <tr v-for  $=$  " (brand,i) in brands" align  $=$  "center">   
2 <td> {{i + 1}} </td>   
3 <td> {{brand.brandName}} </td>   
4 <td> {{brand.companyName}} </td>   
5 <td> {{brand.ordered}} </td>   
6 <td> {{brand.description}} </td>   
7 <td> {{brand.statusStr}} </td>   
8 <td><ahref  $=$  "#">修改</a> <ahref  $=$  "#">删除</a></td>   
9 </tr>
```

# 整体页面代码如下：

```html
<!DOCTYPE html>   
<html lang="en">   
<head>   
<meta charset="UTF-8">   
<title>Title</title>   
</head>   
<body>   
<div id="app">   
<a href="addBrand.html"><input type="button" value="新增"></a></br>   
<br>   
<table id="brandTable" border="1" cellspacing="0" width="100%" >   
<tr>   
<th>序号</th>   
<th>品牌名称</th>   
<th>企业名称</th>   
<th>排序</th>   
<th>品牌介绍</th>   
<th>状态</th>   
<th>操作</th>   
</tr>   
<!--   
使用v-for遍历tr   
-->
```

```html
24 <tr v-for=" (brand,i) in brands" align="center">   
25 <td>{i + 1}</td>   
26 <td>{brand.brandName}</td>   
27 <td>{brand.companyName}</td>   
28 <td>{brand.ordered}</td>   
29 <td>{brand.description}</td>   
30 <td>{brand.statusStr}</td>   
31 <td><a href="#"修改</a><a href="#"删除</a></td>   
32 </tr>   
33 </table>   
34 </div>   
35 <script src="js/axes-0.18.0.js"></script>   
36 <script src="js/vue.js"></script>   
37   
38   
39 new vue({   
40 el:"#app",   
41 data(){ return{ brands:[]   
42 }   
43 brands:[ ]   
44 }   
45 mounted(){   
46   
47 //页面加载完成后，发送异步请求，查询数据   
48 var _this = this;   
49 axis({ method:"get", url:"http://localhost:8080/brand-demo/selectAllServlet" }) .then(function (resp){ _thisbrands = resp.data; }）   
50 }   
51   
52 }).then(function (resp){ _thisbrands = resp.data; }）   
53 }   
54 }   
55 }   
56 }）   
57 </script>   
58 </body>   
59 </html>
```

# 1.5.3 添加功能

页面操作效果如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822519.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822520.jpg)

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠</td><td>100</td><td>三只松鼠，好吃不上火</td><td>启用</td><td>修改删除</td></tr><tr><td>2</td><td>优衣库</td><td>优衣库</td><td>10</td><td>优衣库，服适人生</td><td>禁用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>1000</td><td>为发烧而生</td><td>启用</td><td>修改删除</td></tr></table>

整体流程如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822521.jpg)

注意：前端代码的关键点在于使用 v-model 指令给标签项绑定模型数据，利用双向绑定特性，在发送异步请求时提交数据。

# 1. 在addBrand.html页面引入vue的js文件

```twig
1 <script src="js/vue.js"></script>
```

# 2. 创建Vue对象

在Vue对象中定义模型数据brand  
定义一个 submitForm() 函数，用于给提交按钮提供绑定的函数  
在 submitForm() 函数中发送 ajax 请求，并将模型数据 brand 作为参数进行传递

```javascript
1 newVue({  
2 el:"#app",  
3 data(){  
4 return {  
5 brand:{}  
6 }  
7 },  
8 methods:{  
9 submitForm(){  
10 //发送ajax请求，添加  
11 var _this  $=$  this;  
12 axis({  
13 method:"post",  
14 url:"http://localhost:8080/brand-demo/addServlet",  
15 data:_this.brand  
16 }) .then(function (resp){  
17 //判断响应数据是否为 success  
18 if(respondata  $= =$  "success"){  
19 locationhref  $\equiv$  "http://localhost:8080/brand-demo/brand.html";  
20 }  
21 }）  
22  
23 }  
24 }  
25 }
```

# 3. 修改视图

○ 定义<div id="app></div>，指定该 div 标签受Vue 管理  
o 将 body 标签中所有的内容拷贝作为上面 div 标签中  
o 给每一个表单项标签绑定模型数据。最后这些数据要被封装到 brand 对象中

```html
1 <div id="app">   
2 <h3>添加品牌</h3>   
3 <form action=""" method="post"> 品牌名称：<input id="brandName" v-model="brand.brandName" name="brandName"><br> 企业名称： <input id="companyName" v-model="brand.companyName" name="companyName">   
<br> 排序： <input id="ordered" v-model="brand.ordered" name="ordered"><br> 描述信息： <textarea rows="5" cols="20" id="description" v- model="brand.description" name="description"></textarea></br>   
8 状态： <input type="radio" name="status" v-model="brand.status" value="0">禁用   
10 <input type="radio" name="status" v-model="brand.status" value="1">启用<br>   
11 <input type="button" id="btn" @click="submitForm" value="提交">   
13 </form>   
14 </div>
```

# 整体页面代码如下：

```html
<!DOCTYPE html>   
<html lang  $\coloneqq$  "en">   
<head> <meta charset="UTF-8"> <title>添加品牌</title>   
</head>   
<body>   
<div id  $\equiv$  "app"> <h3>添加品牌</h3> <form action  $\equiv$  "" method  $\equiv$  "post"> 品牌名称：<input id  $\equiv$  "brandName" v-model  $\equiv$  "brand.brandName" name  $\equiv$  "brandName"><br> 企业名称：<input id  $\equiv$  "companyName" v-model  $\equiv$  "brand.companyName" name  $\equiv$  "companyName"><br> 排序：<input id  $\equiv$  "ordered" v-model  $\equiv$  "brand.ordered" name  $\equiv$  "ordered"><br> 描述信息：<textarea rows  $\equiv$  "5" cols  $\equiv$  "20" id  $\equiv$  "description" v-model  $\equiv$  "brand.description" name  $\equiv$  "description"></textarea></br> 状态： <input type  $\equiv$  "radio" name  $\equiv$  "status" v-model  $\equiv$  "brand.status" value  $= 0"$  >禁用 <input type  $\equiv$  "radio" name  $\equiv$  "status" v-model  $\equiv$  "brand.status" value  $= 1"$  >启用<br> <input type  $\equiv$  "button" id  $\equiv$  "btn" @click  $\equiv$  "submitForm" value  $=$  "提交"> </form> </div>   
<script src  $\equiv$  "js/axis-0.18.0.js></script>   
<script src  $\equiv$  "js/vue.js"></script>   
<script> new Vue({ el:"#app", data(){ return { brand:{} } }, methods:{ submitForm(){ //发送ajax请求，添加 var _this  $=$  this; axisis({ method:"post", url:"http://localhost:8080/brand-demo/addServlet", data:_this.brand }}).then(function (resp){ //判断响应数据是否为 success if resp.data  $= =$  "success"){ locationhref  $=$  "http://localhost:8080/brand-demo/brand.html"; } } } } } } } } } } } }
```

通过上面的优化，前端代码确实简化了不少。但是页面依旧是不怎么好看，那么接下来我们学习 Element，它可以美化页面。

# 2, Element

Element：是饿了么公司前端开发团队提供的一套基于Vue的网站组件库，用于快速构建网页。

Element提供了很多组件（组成网页的部件）供我们使用。例如超链接、按钮、图片、表格等等~

如下图左边的是我们编写页面看到的按钮，上图右边的是 Element 提供的页面效果，效果一目了然。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822522.jpg)

我们学习 Element 其实就是学习怎么从官网拷贝组件到我们自己的页面并进行修改，官网网址是

```txt
1 https://element.elemente.cn/#/zh-CN
```

进入官网能看到如下页面

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822523.jpg)

接下来直接点击组件，页面如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822524.jpg)

# 2.1 快速入门

1. 将资源 04-资料\02-element 下的 element ui 文件夹直接拷贝到项目的 webapp 下。目录结构如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822525.jpg)

2. 创建页面，并在页面引入Element的css、js文件和Vue.js

```html
1 <script src="vue.js"></script>   
2 <script src  $=$  "element-ui/lib/index.js"></script>   
3 <link rel  $\equiv$  "stylesheet"href  $\equiv$  "element-ui/lib/style-chalk/index.css">
```

3.创建Vue核心对象

Element 是基于 Vue 的，所以使用 Element 时必须要创建 Vue 对象

```html
1 <script>   
2 newVue({   
3 el:"#app"   
4 }）   
5 </script>
```

4. 官网复制Element组件代码

Color色彩

基础的按钮用法。

Typography字体

默认按钮

主要按钮

成功按钮

信息按钮

警告按钮

危险按钮

Icon 图标

朴素按钮

主要按钮

成功按钮

信息按钮

警告按钮

危险按钮

Button 按钮

圆角按钮

主要按钮

成功按钮

信息按钮

警告按钮

危险按钮

Link文字链接

Form

Radio单选框

Checkbox 多选框

Input输入框

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822526.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822527.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822528.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822529.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822530.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822531.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822532.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822533.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822534.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822535.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822536.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822537.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822538.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822539.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822540.jpg)

显示代码

在线运行

在左菜单栏找到 Button 按钮，然后找到自己喜欢的按钮样式，点击显示代码，在下面就会展示出对应的代码，将这些代码拷贝到我们自己的页面即可。

# 整体页面代码如下：

```sgml
<!DOCTYPE html>   
<html lang  $\coloneqq$  "en">   
<head> <meta charset="UTF-8"> <title>Title</title>   
</head>   
<body>   
<div id  $\equiv$  "app">   
<el-row> <el-button>默认按钮</el-button> <el-button type  $\equiv$  "primary">主要按钮</el-button> <el-button type  $\equiv$  "success">成功按钮</el-button> <el-button type  $\equiv$  "info">信息按钮</el-button> <el-button type  $\equiv$  "warning">警告按钮</el-button> <el-button type  $\equiv$  "danger">删除</el-button> </el-row>   
<el-row> <el-button plain  $\equiv$  朴素按钮</el-button> <el-button type  $\equiv$  "primary"plain  $\equiv$  主要按钮</el-button> <el-button type  $\equiv$  "success"plain  $\equiv$  成功按钮</el-button> <el-button type  $\equiv$  "info"plain  $\equiv$  信息按钮</el-button> <el-button type  $\equiv$  "warning"plain  $\equiv$  警告按钮</el-button> <el-button type  $\equiv$  "danger"plain  $\equiv$  危险按钮</el-button>   
</el-row>   
<el-row> <el-button round  $\equiv$  圆角按钮</el-button> <el-button type  $\equiv$  "primary"round  $\equiv$  主要按钮</el-button> <el-button type  $\equiv$  "success"round  $\equiv$  成功按钮</el-button> <el-button type  $\equiv$  "info" round  $\equiv$  信息按钮</el-button> <el-button type  $\equiv$  "warning"round  $\equiv$  警告按钮</el-button> <el-button type  $\equiv$  "danger"round  $\equiv$  危险按钮</el-button>   
</el-row>   
<el-row> <el-button icon  $=$  "el-icon-search"circle></el-button> <el-button type  $\equiv$  "primary"icon  $=$  "el-icon-edit"circle></el-button> <el-button type  $\equiv$  "success"icon  $=$  "el-icon-check"circle></el-button> <el-button type  $\equiv$  "info"icon  $=$  "el-icon-message"circle></el-button> <el-button type  $\equiv$  "warning"icon  $=$  "el-icon-star-off"circle></el-button> <el-button type  $\equiv$  "danger"icon  $=$  "el-icon-delete"circle></el-button>   
</div>
```

```html
47 <script src="js/vue.js"></script>  
48 <script src="element-ui/lib/index.js"></script>  
49 <link rel="stylesheet" href="element-ui/lib/style-chalk/index.css">  
50  
51 <script>  
52 new Vue({
53 el:"#app"
})  
54  
55 </script>  
56  
57 </body>  
58 </html>
```

# 2.2 Element 布局

Element 提供了两种布局方式，分别是：

- Layout布局
- Container布局容器

# 2.2.1 Layout 局部

通过基础的24分栏，迅速简便地创建布局。也就是默认将一行分为24栏，根据页面要求给每一列设置所占的栏数。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822541.jpg)

# Element

搜索文档

指南

组件

主题

资源

2.15.5

中文

通过基础的24分栏，迅速简便地创建布局。

# 组件

Basic

Layout布局

# 基础布局

使用单一分栏创建基础的栅格布局。

Container布局容器

Color色彩

Typography 字体

Border边框

Icon 图标

Button按钮

Link文字链接

Form

Radio单选框

#

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822542.jpg)

在左菜单栏找到Layout布局，然后找到自己喜欢的按钮样式，点击显示代码，在下面就会展示出对应的代码，显示出的代码中有样式，有html标签。将样式拷贝我们自己页面的head标签内，将html标签拷贝到<
div id="app></div>标签内。

# 整体页面代码如下：

```txt
<!DOCTYPE html>   
<html lang  $\coloneqq$  "en">   
<head>   
<meta charset="UTF-8">   
<title>Title</title>   
<style> .el-row { margin(bottom: 20px;   
10 } .el-col { border-radius: 4px;   
13 } .bg-purple-dark { background: #99a9bf;   
16 }
```

```html
.17 .bg-purple { background: #d3dce6; } .bg-purple-light { background: #e5e9f2; } .grid-content { border-radius: 4px; min-height: 36px; } .row-bg { padding: 10px 0; background-color: #f9fafc; } </style>   
.12</head>   
.13 <body>   
<div id="app"> <el-row> <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col> </el-row> <el-row> <el-col :span="12"><div class="grid-content bg-purple"></div></el-col> <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col> </el-row> <el-row> <el-col :span="8"><div class="grid-content bg-purple"></div></el-col> <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col> <el-col :span="8"><div class="grid-content bg-purple"></div></el-col> </el-row> <el-row> <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col> <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> </el-row> <el-row> <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col> <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col> </el-row> </div> </script src="js/vue.js"></script>   
.13 <script src="element-ui/lib/index.js"></script>   
.14 <link rel="stylesheet" href="element-ui/lib/ theme-chalk/index.css">   
.15 </script>   
.16 newVue({ el:"#app" })   
.17 </script>   
.18 </body>   
.19 </html>
```

现在需要添加一行，要求该行显示8个格子，通过计算每个格子占3栏，具体的html代码如下

```txt
1 <--  
2 添加一行，8个格子  $24 / 8 = 3$   
3 -->  
4 <el-row>  
5 <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>  
6 <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>  
7 <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>  
8 <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>  
9 <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>  
10 <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>  
11 <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>  
12 <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>  
13 </el-row>
```

# 2.2.2 Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构。如下图就是布局容器效果。

如下图是官网提供的Container布局容器实例：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822543.jpg)

# Element

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822544.jpg)

该效果代码中包含了样式、页面标签、模型数据。将里面的样式 <style> 拷贝到我们自己页面的 head
标签中；将html标签拷贝到<div id="app"></div> 标签中，再将数据模型拷贝到 vue 对象的 data() 中。

# 整体页面代码如下：

```html
1<!DOCTYPE html>   
2<html lang  $\coloneqq$  "en">   
3<head>   
4 <meta charset  $=$  "UTF-8">   
5<title>Title</title>   
6   
7<style>   
8 .el-header{   
9 background-color: #B3C0D1;   
10 color: #333;   
11 line-height: 60px;   
12 }   
13   
14 .el-aside{   
15 color: #333;   
16 }   
17 </style>   
18</head>
```

<body>

<div id="app">

```txt
<el-container style="height:500px;border:1px solid #eee">
    <elAside width="200px" style="background-color:rgb(238,241,246)">
        <el menu :default-openeds="_1', '3"]} 
        <el-submenu index="_1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-men-item-group>
                <template slot="title">分组一</template>
                <el-men-item index="1-1">选项1</el-men-item>
                <el-men-item index="1-2">选项2</el-men-item>
            </el-men-item-group>
            <el-men-item-group title="分组2">
                <el-men-item index="1-3">选项3</el-men-item>
            </el-men-item-group>
            <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-men-item index="1-4-1">选项4-1</el-men-item>
            </el-submenu>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-submenu index="2-1">
                <template slot="title">选项1</template>
                <el-men-item index="2-1-1">选项1-1</el-men-item>
            </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-men-item-group>
                <template slot="title">分组一</template>
                <el-men-item index="3-1">选项1</el-men-item>
                <el-men-item index="3-2">选项2</el-men-item>
            </el-men-item-group>
            <el-men-item-group title="分组2">
                <el-men-item index="3-3">选项3</el-men-item>
            </el-men-item-group>
            <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-men-item index="3-4-1">选项4-1</el-men-item>
            </el-submenu>
            </el-submenu>
            </el-submenu>
            </el-main>
            <el-table :data="tableData">
                <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
```

```html
</el-table-column>  
</el-table>  
</el-main>  
</el-container>  
</el-container>  
</div>  
<script src="js/vue.js"></script>  
<script src="element-ui/lib/index.js"></script>  
<link rel="stylesheet" href="element-ui/lib/style-chalk/index.css">  
<script>  
new vue({  
el:"#app",  
data() {  
const item = {  
date: '2016-05-02',  
name: '王小虎',  
address: '上海市普陀区金沙江路1518弄'  
};  
return {  
 tableData: Array(20).fill(item)  
}  
}  
})  
</script>  
</body>  
</html>
```

# 2.3案例

其他的组件我们通过完成一个页面来学习。

我们要完成如下页面效果

```txt
当前状态 当前状态 企业名称 企业名称 品牌名称 品牌名称 查询  
批量删除 新增  
□ 品牌名称 企业名称 排序 当前状态 操作  
□ 1 小米 小米科技有限公司 10 启用 修改 删除  
□ 2 小米 小米科技有限公司 10 启用 修改 删除  
□ 3 小米 小米科技有限公司 10 启用 修改 删除  
□ 4 小米 小米科技有限公司 10 启用 修改 删除  
□ 5 小米 小米科技有限公司 10 启用 修改 删除  
□ 6 小米 小米科技有限公司 10 启用 修改 删除  
共400条 5条/页 <1 2 3 4 5 6 ... 80 > 前往 1 页
```

要完成该页面，我们需要先对这个页面进行分析，看页面由哪儿几部分组成，然后到官网进行拷贝并修改。页面总共有如下组成部分

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822545.jpg)

还有一个是当我们点击 新增 按钮，会在页面正中间弹出一个对话框，如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822546.jpg)

# 2.3.1 准备基本页面

```html
1 <!--DOCTYPE html>
2 <html lang="en">
3 <head>
4 <meta charset="UTF-8">
5 <title>Title</title>
6 </head>
7 <body>
8 <div id="app">
9 </div>
10 </div>
11
12 <script src="js/vue.js"></script>
13 <script src="element-ui/lib/index.js"></script>
14 <link rel="stylesheet" href="element-ui/lib/style-chalk/index.css">
15
16 <script>
17 new vue({
18 el: "#app"
19 })</script>
20 </script>
21 </body>
22 </html>
```

# 2.3.2 完成表格展示

使用 Element 整体的思路就是 拷贝 + 修改。

# 2.3.2.1 拷贝

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822547.jpg)

# Element

搜索文档

指南

组件

2.15.5

中文

Data

Table表格

Tag标签

Progress进度条

Tree树形控件

Pageation分页

Badge标记

Avatar头像

Skeleton骨架屏

可将表格内容highlight显示，方便区分「成功、信息、警告、危险」等内容。

日期

姓名

地址

2016-05-02

王小虎

上海市普陀区金沙江路1518弄

2016-05-04

王小虎

上海市普陀区金沙江路1518弄

2016-05-01

王小虎

上海市普陀区金沙江路1518弄

2016-05-03

王小虎

上海市普陀区金沙江路1518弄

Skeleton骨架屏

显示代码

在线运行

1

在左菜单栏找到Table表格并点击，右边主体就会定位到表格这一块，找到我们需要的表格效果（如上图），点击显示代码就可以看到这个表格的代码了。

将html标签拷贝到<div id="app"></div>中，如下：

```vue
<template> <el-table :data  $=$  "tableData" style  $=$  "width:100%":row-class-name  $\coloneqq$  "tableRowClassName"> <el-table-column prop  $\coloneqq$  "date" label  $\coloneqq$  "日期" width  $\coloneqq$  "180"> </el-table-column> <el-table-column prop  $\coloneqq$  "name" label  $\coloneqq$  "姓名" width  $\coloneqq$  "180"> </el-table-column> <el-table-column prop  $\coloneqq$  "address" label  $\coloneqq$  "地址"> </el-table-column> </el-table> </template>
```

将css样式拷贝到我们页面的head标签中，如下

```vue
<style>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
```

将方法和模型数据拷贝到Vue对象指定的位置

```txt
<script>   
export default{   
methods:{ tableRowClassName({row,rowIndex})} { if (rowIndex  $= = = 1$  ）{ return'warning-row'; }elseif(rowIndex  $= = = 3$  ）{ return'success-row'; } return"; 方法 }   
data(){ return{ 模型数据 tableData:[[ date:'2016-05-02', name:'王小虎', address:'上海市普陀区金沙江路1518弄 },{ date:'2016-05-04', name:'王小虎', address:'上海市普陀区金沙江路1518弄 },{ date:'2016-05-01', name:'王小虎', address:'上海市普陀区金沙江路1518弄 },{
```

拷贝完成后通过浏览器打开可以看到表格的效果

<table><tr><td>日期</td><td>姓名</td><td>地址</td></tr><tr><td>2016-05-02</td><td>王小虎</td><td>上海市普陀区金沙江路1518弄</td></tr><tr><td>2016-05-04</td><td>王小虎</td><td>上海市普陀区金沙江路1518弄</td></tr><tr><td>2016-05-01</td><td>王小虎</td><td>上海市普陀区金沙江路1518弄</td></tr><tr><td>2016-05-03</td><td>王小虎</td><td>上海市普陀区金沙江路1518弄</td></tr></table>

表格效果出来了，但是显示的表头和数据并不是我们想要的，所以接下来就需要对页面代码进行修改了。

# 2.3.2.2 修改

# 1. 修改表头和数据

下面是对表格代码进行分析的图解。根据下图说明修改自己的列数和列名

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822548.jpg)

修改完页面后，还需要对绑定的模型数据进行修改，下图是对模型数据进行分析的图解

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822549.jpg)

# 2. 给表格添加操作列

从之前的表格拷贝一列出来并对其进行修改。按钮是从官网的 Button 按钮 组件中拷贝并修改的

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822550.jpg)

# 3. 给表格添加复选框列和标号列

给表格添加复选框和标号列，效果如下

<table><tr><td>品牌名称</td><td>企业名称</td><td>排序</td><td>当前状态</td><td colspan="2">操作</td></tr><tr><td>华为</td><td>华为科技有限公司</td><td>100</td><td>1</td><td>修改</td><td>删除</td></tr><tr><td>华为</td><td>华为科技有限公司</td><td>100</td><td>1</td><td>修改</td><td>删除</td></tr><tr><td>华为</td><td>华为科技有限公司</td><td>100</td><td>1</td><td>修改</td><td>删除</td></tr><tr><td>华为</td><td>华为科技有限公司</td><td>100</td><td>1</td><td>修改</td><td>删除</td></tr></table>

此效果也是从Element官网进行拷贝，先找到对应的表格效果，然后将其对应代码拷贝到我们的代码中，如下是复选框列官网效果图和代码

<table><tr><td>日期</td><td>姓名</td><td>地址</td></tr><tr><td>2016-05-03</td><td>王小虎</td><td>上海市普陀区金沙江路1518弄</td></tr><tr><td>2016-05-02</td><td>王小虎</td><td>上海市普陀区金沙江路1518弄</td></tr><tr><td>2016-05-04</td><td>王小虎</td><td>上海市普陀区金沙江路1518弄</td></tr></table>

这里需要注意在 <el-table> 标签上有一个事件 @selection-change="handleSelectionChange"，这里绑定的函数也需要从官网拷贝到我们自己的页面代码中，函数代码如下：

```javascript
handleSelectionChange(val) { thisultipleSelection  $=$  val; }
```

从该函数中又发现还需要一个模型数据 multipleSelection，所以还需要定义出该模型数据

标号列也用同样的方式进行拷贝并修改。

# 2.3.3 完成搜索表单展示

在 Element 官网找到横排的表单效果，然后拷贝代码并进行修改

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822551.jpg)

# Element

Upload上传

Rate评分

ColorPicker颜色选择器

Transfer 穿梭框

Form表单

搜索文档

指南

组件

主题

资源

2.15.5

中文

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

审批人

审批人

活动区域

活动区域

查询

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822552.jpg)

显示代码

在线运行

点击上面的显示代码后，就会展示出对应的代码，下面是对这部分代码进行分析的图解

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822553.jpg)

然后根据我们要的效果修改代码。

# 2.3.4 完成批量删除和新增按钮展示

从 Element 官网找具有着色效果的按钮，并将代码拷贝到我们自己的页面上

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822554.jpg)

# 2.3.5 完成对话框展示

在 Element 官网找对话框，如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822555.jpg)

# 下面对官网提供的代码进行分析

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822556.jpg)

上图分析出来的模型数据需要在Vue对象中进行定义。

# 2.3.6 完成分页条展示

在 Element 官网找到 Paging 分页，在页面主体部分找到我们需要的效果，如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822557.jpg)

点击显示代码，找到完整功能对应的代码，接下来对该代码进行分析

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822558.jpg)

上面代码属性说明：

- page-size：每页显示的条目数
- page-sizes：每页显示个数选择器的选项设置。

:page-sizes="[100,200,300,400]"对应的页面效果如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822559.jpg)

- currentPage：当前页码。我们点击那个页码，此属性值就是几。
- total：总记录数。用来设置总的数据条目数，该属性设置后，Element会自动计算出需分多少页并给我们展示对应的页码。

事件说明：

- size-change : pageSize 改变时会触发。也就是当我们改变了每页显示的条目数后，该事件会触发。
- current-change : currentPage 改变时会触发。也就是当我们点击了其他的页码后，该事件会触发。

# 2.3.7 完整页面代码

```vue
1 <!DOCTYPE html>   
2 <html lang="en">   
3 <head>   
4 <meta charset="UTF-8">   
5 <title>Title</title>   
6 <style>   
7 .el-table .warning-row {   
8 background: oldlace;   
9 }   
10 .el-table .success-row {   
11 background: #f0f9eb;   
12 }   
13 </style>
```

```txt
</head>   
<body>   
<div id="app">   
<!--搜索表单-->   
<el-form:inline="true":model="brand" class="demo-form-line"> <el-form-item label="当前状态"> <el-select v-model="brand.status" placeholder="当前状态"> <el-option label="启用" value="1"></el-option> <el-option label="禁用" value="0"></el-option> </el-select> </el-form-item>   
<el-form-item label="企业名称"> <el-input v-model="brand.companyName" placeholder="企业名称"></el-input> </el-form-item>   
<el-form-item type="primary" @click="onSubmit">查询</el-button> </el-form-item>   
</el-form-item>   
<el-button type="danger" plain批量删除</el-button> <el-button type="primary" plain @click="dialogvisible = true">新增</el-button> </el-row>   
<!--按钮-->   
<el-row> <el-button type="form" :model="brand" label-width="80px"> <el-form-item label="品牌名称"> <el-input v-model="brand.brandName"></el-input> </el-form-item>   
<el-form-item label="企业名称"> <el-input v-model="brand.companyName"></el-input> </el-form-item>   
<el-form-item label="排序"> <el-input v-model="brand.ordered"></el-input> </el-form-item>   
<el-form-item label="备注"> <el-input type="textarea" v-model="brand.description"></el-input> </el-form-item>   
<el-form-item label="状态"> <el-switch v-model="brand.status" active-value="1" inactive-value="0" > </el-switch> </el-form-item>   
<el-form-item type="primary" @click="addBrand">提交</el-button> <el-button @click="dialogvisible = false">取消</el-button> </el-form-item>   
</el-form>   
</el-dialog>
```

```html
<!--表格-->   
<template> <el-table :data="tablcData" style  $=$  "width:100%":row-class-name  $\equiv$  "tableRowClassName" @selection-change  $\equiv$  "handleSelectionChange"> <el-table-column type  $\coloneqq$  "selection" width  $\coloneqq$  "55"> </el-table-column> <el-table-column type  $\coloneqq$  "index" width  $\coloneqq$  "50"> </el-table-column> <el-table-column prop  $\coloneqq$  "brandName" label  $\coloneqq$  "品牌名称" align  $\coloneqq$  "center"> </el-table-column> <el-table-column prop  $\coloneqq$  "companyName" label  $\coloneqq$  "企业名称" align  $\coloneqq$  "center"> </el-table-column> <el-table-column prop  $\coloneqq$  "ordered" align  $\coloneqq$  "center" label  $\coloneqq$  "排序"> </el-table-column> <el-table-column prop  $\coloneqq$  "status" align  $\coloneqq$  "center" label  $\coloneqq$  "当前状态"> </el-table-column> <el-table-column align  $\coloneqq$  "center" label  $\coloneqq$  "操作"> <el-row> <el-button type  $\coloneqq$  "primary">修改</el-button> <el-button type  $\coloneqq$  "danger">删除</el-button> </el-row> </el-table-column> </el-table> </template>   
<!--分页工具条-->   
<el-pagina @size-change  $\equiv$  "handlesizechange" @current-change  $\equiv$  "handleCurrentChange" :current-page  $\equiv$  "currentPage" :page-sizes  $\coloneqq$  "[5，10，15，20]" :page-size="5" layout  $=$  "total,sizes,prev,pager,next,jumper" :total  $=$  "400"> </el-pagina>   
iv>   
ript src  $\equiv$  "js/vue.js"></script>   
ript src  $\equiv$  "element-ui/lib/index.js></script>   
nk rel="stylesheet" href  $\equiv$  "element-ui/lib/theme-chalk/index.css"> ript>   
new Vue({
```

```javascript
el:"#app",  
methods:{  
    tableRowClassName({row, rowIndex}) {  
        if (rowIndex == 1) {  
            return 'warning-row';  
        } else if (rowIndex == 3) {  
            return 'success-row';  
        }  
    return [];  
},  
//复选框选中后执行的方法  
handleSelectionChange(val) {  
    this.multipleSelection = val;  
    console.log(this.multipleSelection)  
},  
//查询方法  
onSubmit() {  
        console.log(this.brand);  
    },  
//添加数据  
addBrand(){  
    console.log(this.brand);  
}  
//分页  
handleSizeChange(val) {  
        console.log('每页${val}条');  
    },  
handleCurrentChange(val) {  
        console.log('当前页：${val}');  
}  
},  
data() {  
return {  
    //当前页码  
currentPage: 4,  
    //添加数据对话框是否展示的标记  
dialogVisible: false,  
//品牌模型数据  
brand: {  
    status: '',  
    brandName: '',  
    companyName: '',  
    id: "",  
    ordered: "",  
    description: "",  
}，  
//复选框选中数据集合  
multipleSelection: [],  
//表格数据  
tableData: {  
    brandName: '华为',  
    companyName: '华为科技有限公司',  
    ordered: '100',  
    status: "1"  
}，{  
    brandName: '华为',  
    companyName: '华为科技有限公司',  
    ordered: '100',  
    status: "1"  
}，{  
    brandName: '华为',  
    companyName: '华为科技有限公司',  
    ordered: '100',
```

```html
status:"1"   
210 }, {   
211 brandName:'华为'，   
212 companyName:'华为科技有限公司'，   
213 ordered:'100'，   
214 status:"1"   
215 }]   
216 }   
217 }   
218 }）   
219 </script>   
220 </body>   
221 </html>
```

# 3，综合案例

# 3.1功能介绍

# 功能列表：

1. 查询所有
2. 新增品牌
3. 修改品牌
4. 删除品牌
5. 批量删除
6. 分页查询
7. 条件查询

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822560.jpg)

以上是我们在综合案例要实现的功能。对数据的除了对数据的增删改查功能外，还有一些复杂的功能，如批量删除、分页查询、条件查询等功能

- 批量删除功能：每条数据前都有复选框，当我选中多条数据并点击批量删除按钮后，会发送请求到后端并删除数据库中指定的多条数据。
- 分页查询 功能：当数据库中有很多数据时，我们不可能将所有的数据展示在一页里，这个时候就需要分页展示数据。
- 条件查询功能：数据库量大的时候，我们就需要精确的查询一些想看到的数据，这个时候就需要通过条件查询。

这里的修改品牌和删除品牌功能在课程上不做讲解，留作同学来下的练习。

# 3.2 环境准备

环境准备我们主要完成以下两件事即可

- 将资料的 brand-case 模块导入到 idea中
- 执行资料中提供的 tb_brand.sql脚本

# 3.2.1 工程准备

将 04-资料\01-初始工程 中的 brand-case 工程导入到我们自己的 idea 中。工程结构如下:

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822561.jpg)

# 3.2.2 创建表

# 下面是创建表的语句

```sql
--删除tb_brand表  
drop table if exists tb_brand;  
-- 创建tb_brand表  
create table tb_brand（  
-- id 主键  
id int primary key auto_increment,  
-- 品牌名称  
brand_name varchar(20),  
-- 企业名称  
company_name varchar(20),  
-- 排序字段  
ordered int,  
-- 描述信息  
description varchar(100),  
-- 状态：0：禁用 1：启用  
status int);  
-- 添加数据  
insert into tb_brand (brand_name, company_name, ordered, description, status)  
values  
('华为', '华为技术有限公司', 100, '万物互联', 1),  
('小米', '小米科技有限公司', 50, 'are you ok', 1),  
('格力', '格力电器股份有限公司', 30, '让世界爱上中国造', 1),  
('阿里巴巴', '阿里巴巴集团控股有限公司', 10, '买买买', 1),  
('腾讯', '腾讯计算机系统有限公司', 50, '玩玩玩', 0),  
('百度', '百度在线网络技术公司', 5, '搜搜搜', 0),  
('京东', '北京京东世纪贸易有限公司', 40, '就是快', 1),  
('小米', '小米科技有限公司', 50, 'are you ok', 1),  
('三只松鼠', '三只松鼠股份有限公司', 5, '好吃不上火', 0),  
('华为', '华为技术有限公司', 100, '万物互联', 1),  
('小米', '小米科技有限公司', 50, 'are you ok', 1),  
('格力', '格力电器股份有限公司', 30, '让世界爱上中国造', 1),  
('阿里巴巴', '阿里巴巴集团控股有限公司', 10, '买买买', 1),  
('腾讯', '腾讯计算机系统有限公司', 60, '玩玩玩', 0),  
('百度', '百度在线网络技术公司', 5, '搜搜搜', 0),  
('京东', '北京京东世纪贸易有限公司', 40, '就是快', 1),  
('华为', '华为技术有限公司', 100, '万物互联', 1),
```

```txt
38 （'小米'，'小米科技有限公司'，50，'are you ok'，1)，  
39 （'格力'，'格力电器股份有限公司'，30，'让世界爱上中国造'，1），  
40 （'阿里巴巴'，'阿里巴巴集团控股有限公司'，10，'买买买'，1），  
41 （'腾讯'，'腾讯计算机系统有限公司'，50，'玩玩玩'，0)，  
42 （'百度'，'百度在线网络技术公司'，5，'搜搜搜'，0)，  
43 （'京东'，'北京京东世纪贸易有限公司'，40，'就是快'，1），  
44 （'小米'，'小米科技有限公司'，50，'are you ok'，1)，  
45 （'三只松鼠'，'三只松鼠股份有限公司'，5，'好吃不上火'，0)，  
46 （'华为'，'华为技术有限公司'，100，'万物互联'，1)，  
47 （'小米'，'小米科技有限公司'，50，'are you ok'，1)，  
48 （'格力'，'格力电器股份有限公司'，30，'让世界爱上中国造'，1），  
49 （'阿里巴巴'，'阿里巴巴集团控股有限公司'，10，'买买买'，1），  
50 （'腾讯'，'腾讯计算机系统有限公司'，50，'玩玩玩'，0)，  
51 （'百度'，'百度在线网络技术公司'，5，'搜搜搜'，0)，  
52 （'京东'，'北京京东世纪贸易有限公司'，40，'就是快'，1)，  
53 （'华为'，'华为技术有限公司'，100，'万物互联'，1)，  
54 （'小米'，'小米科技有限公司'，50，'are you ok'，1)，  
55 （'格力'，'格力电器股份有限公司'，30，'让世界爱上中国造'，1），  
56 （'阿里巴巴'，'阿里巴巴集团控股有限公司'，10，'买买买'，1），  
57 （'腾讯'，'腾讯计算机系统有限公司'，50，'玩玩玩'，0)，  
58 （'百度'，'百度在线网络技术公司'，5，'搜搜搜'，0)，  
59 （'京东'，'北京京东世纪贸易有限公司'，40，'就是快'，1)，  
60 （'小米'，'小米科技有限公司'，50，'are you ok'，1)，  
61 （'三只松鼠'，'三只松鼠股份有限公司'，5，'好吃不上火'，0)，  
62 （'华为'，'华为技术有限公司'，100，'万物互联'，1)，  
63 （'小米'，'小米科技有限公司'，50，'are you ok'，1)，  
64 （'格力'，'格力电器股份有限公司'，30， '让世界爱上中国造', 1)，  
65 （’阿里巴巴’,‘阿里巴巴集团控股有限公司’,10,‘买买买’,1),  
66 （’腾讯’, '腾讯计算机系统有限公司', 50, '玩玩玩', 0),  
67 （’百度’, '百度在线网络技术公司', 5, '搜搜搜', 0),  
68 （’京东’, '北京京东世纪贸易有限公司', 40, '就是快', 1);
```

# 3.3 查询所有功能

```txt
当前状态 当前状态 企业名称 企业名称 品牌名称 品牌名称 查询 批量删除 新增 品牌名称 企业名称 排序 当前状态 操作 1 华为 华为科技有限公司 100 1 修改 删除 2 华为 华为科技有限公司 100 1 修改 删除 3 华为 华为科技有限公司 100 1 修改 删除 4 华为 华为科技有限公司 100 1 修改 删除 共400条 5条/页 <12345680>前往4页
```

如上图所示是查询所有品牌数据在页面展示的效果。要实现这个功能，要先搞明白如下问题：

- 什么时候发送异步请求？

页面加载完毕后就需要在页面上看到所有的品牌数据。所以在 mounted() 这个构造函数中写发送异步请求的代码。

- 请求需要携带参数吗？

查询所有功能不需要携带什么参数。

- 响应的数据格式是什么样？

后端是需要将List<Brand>对象转换为JSON格式的数据并响应回给浏览器。响应数据格式如下：

```json
{"brandName":"华为","companyName":"华为技术有限公司","description":"万物互联","id":1,"ordered":100,"status":1,"statusStr":"启用"}，{"brandName":"小米","companyName":"小米科技有限公司","description":"areyouok","id":2,"ordered":50,"status":1,"statusStr":"启用"}，{"brandName":"格力","companyName":"格力电器股份有限公司","description":"让世界爱上中国造","id":3,"ordered":30,"status":1,"statusStr":"启用"}
```

# 整体流程如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822562.jpg)

我们先实现后端程序，然后再实现前端程序。

# 3.3.1后端实现

# 3.3.1.1 dao方法实现

在com.itheima mapper.BrandMapper接口中定义抽象方法，并使用@Select注解编写sql语句

```txt
1 /\*\*   
2 \*查询所有   
3 \* @return   
4 \*/   
5 @select("select \*from tb_brand")   
6 List<Brand> selectAll();
```

由于表中有些字段名和实体类中的属性名没有对应，所以需要在com/itheima
mapper/BrandMapper.xml映射配置文件中定义结果映射，使用resultMap标签。映射配置文件内容如下：

```xml
1 <?xml version="1.0" encoding="UTF-8"?>   
2 <!DOCTYPE mapper   
3 PUBLIC"-//mybatis.org//DTD Mapper 3.0//EN"   
4 "http://mybatis.org/dtd/mybatis-3-mapper.dtd">   
5 <mapper namespace  $=$  "com.itheima mapper.BrandsMapper">   
6 <resultMap id  $\coloneqq$  "brandResultMap" type  $\coloneqq$  "brand">   
7 <result property  $\coloneqq$  "brandName" column  $\coloneqq$  "brand_name" />   
8 <result property  $\coloneqq$  "companyName" column  $\coloneqq$  "company_name" />   
9   
10 </resultMap>   
11 </mapper>
```

定义完结果映射关系后，在接口 selectAll() 方法上引用该结构映射。使用 @ResultMap("brandResultMap") 注解

完整接口的 selectAll() 方法如下:

```txt
1 /\*\*   
2 \*查询所有   
3 \* @return   
4 \*/   
5 @select("select \*from tb_brand")   
6 @ResultMap("brandResultSetMap")   
7 List<Brand> selectAll();
```

# 3.3.1.2 service方法实现

在com.itheima.service包下创建Brandservice接口，在该接口中定义查询所有的抽象方法

```java
1 public interface BrandService {
2     /* */
3         * 查询所有
4         * @return
5         */
6         */
7         List<Brand> selectAll();
8 }
```

并在com.itheima.service下再创建impl包；impl表示是放service层接口的实现类的包。在该包下创建名为BrandServiceImpl类

```java
public class BrandServiceImpl implements BrandService { @override public List<Brand> selectAll(){  }
```

此处为什么要给 service 定义接口呢？因为service定义了接口后，在 servlet 中就可以使用多态的形式创建Service实现类的对象，如下：

```java
@Servlet("/selectAllServlet")   
public class SelectAllServlet extends HttpServlet {   
    private BrandService brandService = new BrandServiceImpl();   
}
```

这里使用多态是因为方便我们后期解除Servlet和service的耦合。从上面的代码我们可以看到selectAllServlet类和BrandServiceImpl类之间是耦合在一起的，如果后期BrandService有其它更好的实现类（例如叫BrandServiceImpl），那就需要修改SelectAllServlet类中的代码。后面我们学习了spring框架后就可以解除SelectAllServlet类和红色框括起来的代码耦合。而现在咱们还做不到解除耦合，在这里只需要理解为什么定义接口即可。

BrandServiceImpl 类代码如下：

```java
public class BrandServiceImpl implements BrandService { //1. 创建SqlFactory 工厂对象  
SqlFactory factory =sqlFactorysqlFactory();  
@override  
public List<Brand> selectAll() { //2. 获取SqlSession对象  
SqlSession sqlSession = factory.openSession();  
//3. 获取BrandMapper  
BrandMapper mapper =sqlSession.getMapper(brandMapper.class);  
//4. 调用方法  
List<Brand> brands = mapper.selectAll();  
//5. 释放资源  
sqlSession.close();  
return brands;
```

# 3.3.1.3 selenium实现

在com.itheima.webServlet包下定义名为SelectAllServlet的查询所有的servlet。该servlet逻辑如下：

- 调用service的 selectAll() 方法查询所有的品牌数据，并接口返回结果
- 将返回的结果转换为 json 数据
- 响应 json 数据

代码如下：

```java
1 @WebServlet("/selectAllServlet")   
2 public class SelectAllServlet extends HttpServlet {   
3 private BrandService brandService  $=$  new BrandServiceImpl();   
5   
6 @Override
```

```dart
protected void doGet(HttpRequest request, HttpResponse response) throws ServletException, IOException {
    //1. 调用service查询
    List<Brand> brands = brandService.selectAll();
    //2. 转为JSON
    String jsonString = JSON.toString(brands);
    //3. 写数据
    response.setContentType("text/json; charsetutf-8"); //告知浏览器响应的数据是什么，告知浏览器使用什么字符集进行解码
    response.getWriter().write_jsonString);
}
@override
protected void doPost(HttpRequest request, HttpDigestResponse response) throws ServletException, IOException {
    this.doGet(request, response);
}
```

# 3.3.1.4 测试后端程序

在浏览器输入访问Servlet的资源路径http://localhost:8080/brand-case/selectAllServlet，如果没有报错，并能看到如下信息表明后端程序没有问题

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822563.jpg)

localhost:8080/brand-case/selectAllServlet

目…☆

#

其他书签 移动设备上的书签

```json
[{"brandName":"华为","companyName":"华为技术有限公司","description":"万物互联","id":1,"ordered":"100","status":"1","statusStr":"启用"}, {"brandName":"小米","companyName":"小米科技有限公司","description":"are you ok","id":2,"ordered":"50","status":"1","statusStr":"启用"}, {"brandName":"格力","companyName":"格力电器股份有限公司","description":"让世界爱上中国制造","id":3,"ordered":"30","status":"1","statusStr":"启用"}, {"brandName":"阿里巴巴","companyName":"阿里巴巴集团控股有限公司","description":"买买买","id":4,"ordered":"10","status":"1","statusStr":"启用"}, {"brandName":"腾讯","companyName":"腾讯计算机系统有限公司","description":"玩玩玩","id":5,"ordered":"50","status":"0","statusStr":"禁用"}, {"brandName":"百度","companyName":"百度在线网络技术公司","description":"搜搜搜","id":6,"ordered":"5","status":"0","statusStr":"禁用"}, {"brandName":"京东","companyName":"北京京东世纪贸易有限公司","description":"就是快","id":7,"ordered":"40","status":"1","statusStr":"启用"}, {"brandName":"小米","companyName":"小米科技有限公司","description":"are you ok","id":8,"ordered":"50","status":"1","statusStr":"启用"}, {"brandName":"三只松鼠股份有限公司","description":"好吃不上火","id":9,"ordered":"5","status":"0","statusStr":"禁用"}, {"brandName":"华为","companyName":"华为技术有限公司","description":"万物互联","id":10,"ordered":"100","status":"1","statusStr":"启用"}, {"brandName":"小米","companyName":"小米科技有限公司","description":"are youok","id":11,"ordered":"50","status":"1","statusStr":"启用"}, {"brandName":"格力","companyName":"格力电器股份有限公司","description":"让世界爱上中国造", "id":12,"ordered":"30","status":"1","statusStr":"启用"}, {"brandName":"阿里巴巴集团控股有限公司","description":"买买
```

# 3.3.2 前端实现

前端需要在页面加载完毕后发送 ajax 请求，所以发送请求的逻辑应该放在 mounted()
钩子函数中。而响应回来的数据需要赋值给表格绑定的数据模型，从下图可以看出表格绑定的数据模型是 tableData

```txt
<el-table :data  $=$  "tableData" style  $= 1$  "...":row-class-name  $=$  "tableRowClassName" @selection-change  $=$  "handleSelectionChange"> <el-table-column
```

前端代码如下：

```javascript
1 mounted(){
2 //当页面加载完成后，发送异步请求，获取数据
3 var _this = this;
4
5 axisos({
6 method:"get",
7 url:"http://localhost:8080/brand-case/selectAllServlet"
8 }) .then(function (resp) {
9 this.tableData = resp.data;
10 }
11 }
```

# 3.4 添加功能

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822564.jpg)

上图是添加数据的对话框，当点击提交按钮后就需要将数据提交到后端，并将数据保存到数据库中。下图是整体的流程：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822565.jpg)

页面发送请求时，需要将输入框输入的内容提交给后端程序，而这里是以 json 格式进行传递的。而具体的数据格式如下：

{"status":"1","brandName":"鸿星尔克","companyName":"鸿星尔克","id":"","ordered":"200","description":"to be no.1"}

注意：由于是添加数据，所以上述json数据中id是没有值的。

# 3.4.1 后端实现

# 3.4.1.1 dao方法实现

在 BrandMapper 接口中定义 add() 添加方法，并使用 @Insert 注解编写sql语句

```txt
1 /***
2 * 添加数据
3 * @param brand
4 */
5 @Insert("insert into tb_brand values(null, #{brandName}, #{companyName}, #{ordered}, #{description}, #{status}") 
6 void add(Brand brand);
```

# 3.4.1.2 service方法实现

在 BrandService 接口中定义 add() 添加数据的业务逻辑方法

```txt
1 /\*\* 2 \* 添加数据 3 \* @param brand 4 \*/ 5 void add(Brand brand);
```

在 BrandServiceImpl 类中重写 add() 方法，并进行业务逻辑实现

```java
1 @override  
2 public void add(Brand brand) {  
3 //2. 获取SqlSession对象  
4榫Session榫Session = factory.openSession();  
5 //3. 获取BrandMapper  
6榫Session mapper =榫Session Mapper(BrandMapper.class);
```

```txt
7 //4.调用方法   
8 mapper.add.brand);   
9   
10 sqlSession.commit();//提交事务   
11   
12 //5.释放资源   
13 sqlSession.close();   
14}
```

注意：增删改操作一定要提交事务。

# 3.4.1.3 servlet实现

在com.itheima.webServlet包写定义名为AddServlet的Servlet。该Servlet的逻辑如下：

- 接收页面提交的数据。页面到时候提交的数据是 json 格式的数据，所以此处需要使用输入流读取数据
- 将接收到的数据转换为 Brand 对象
- 调用 service 的 add() 方法进行添加的业务逻辑处理
- 给浏览器响应添加成功的标识，这里直接给浏览器响应 success 字符串表示成功

servlet代码实现如下：

```txt
1 @WebServlet("/addServlet")   
2 public class AddServlet extends HttpServlet {   
3 private BrandService brandService  $=$  new BrandServiceImpl();   
4 @Override   
5 protected void doGet(HttpServletRequest request,HttpServletResponse response) throws   
6 ServletException，IOException{   
7 //1．接收品牌数据 BufferedReader br  $=$  request.getParameter(); String params  $\equiv$  br.readLine();//json字符串   
12 //转为Brand对象   
13 Brand brand  $=$  JSON.parseObject.params，Brand.class);   
14 //2．调用service添加   
15 brandService.add(brand);   
16 //3．响应成功的标识   
17 response.getWriter().write("success");   
18 }   
19 @Override   
20 protected void doPost HttpServletRequest request，HttpServletResponse response）throws   
21 ServletException，IOException{ this.DoGet(request，response);   
22 }   
24 1
```

# 3.4.2 前端实现

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822566.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822567.jpg)

上图左边是页面效果，里面的提交按钮可以通过上图右边看出绑定了一个单击事件，而该事件绑定的是addBrand函数，所以添加数据功能的逻辑代码应该写在addBrand()
函数中。在此方法中需要发送异步请求并将表单中输入的数据作为参数进行传递。如下

```javascript
1 //添加数据  
2 addBrand() {  
3 var _this = this;  
4  
5 //发送ajax请求，添加数据  
6 axis({  
7 method:"post",  
8 url:"http://localhost:8080/brand-case/addServlet",  
9 data:_this.brand  
10 }) .then(function (resp) {  
11 //响应数据的处理逻辑  
12 }）  
13 }
```

在 then 函数中的匿名函数是成功后的回调函数，而 resp.data 就可以获取到响应回来的数据，如果值是 success
表示数据添加成功。成功后我们需要做一下逻辑处理：

# 1. 关闭新增对话框窗口

如下图所示是添加数据的对话框代码，从代码中可以看到此对话框绑定了dialogVisible数据模型，只需要将该数据模型的值设置为false，就可以关闭新增对话框窗口了。

```html
<!--添加数据对话框表单-->  
<el-dialog title="编辑品牌" :visible(sync="dialogVisible" width="30%">
```

# 2. 重新查询数据

数据添加成功与否，用户只要能在页面上查看到数据说明添加成功。而此处需要重新发送异步请求获取所有的品牌数据，而这段代码在查询所有功能中已经实现，所以我们可以将此功能代码进行抽取，抽取到一个selectAll()
函数中

```javascript
1 //查询所有数据  
2 selectAll(){  
3 var _this = this;  
4  
5 axisos({  
6 method:"get",  
7 url:"http://localhost:8080/brand-case/selectAllServlet"  
8 }); then(function (resp) {  
9 _this.tableData = resp.data;  
10 }）  
11 }
```

那么就需要将 mounted() 钩子函数中代码改进为

```javascript
1 mounted(){   
2 //当页面加载完成后，发送异步请求，获取数据   
3 this.selectAll();   
4 }
```

同时在新增响应的回调中调用selectAll()进行数据的重新查询。

# 3. 弹出消息给用户提示添加成功

```javascript
this.\(message({message:'恭喜你，这是一条成功消息'，type:'success'})；
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145822568.jpg)

恭喜你，这是一条成功消息

上图左边就是 elementUI 官网提供的成功提示代码，而上图右边是具体的效果。

注意：上面的this需要的是表示VUE对象的this。

```javascript
1 //添加数据  
2 addBrand() {  
3 var _this = this;  
4  
5 //发送ajax请求，添加数据  
6 axisos({  
7 method:"post",  
8 url:"http://localhost:8080/brand-case/addServlet",  
9 data:_this.brand)  
10 }．then(function (resp){  
11 if(resp.data == "success") {  
12 //添加成功  
13 //关闭窗口  
14 _this.buttonvisible = false;  
15 //重新查询数据  
16 _this.selectAll();  
17 //弹出消息提示  
18 _this.$message({  
19 message:'恭喜你，添加成功'，  
20 type:'success'  
21 })；  
22 }  
23 }）  
24 }
```
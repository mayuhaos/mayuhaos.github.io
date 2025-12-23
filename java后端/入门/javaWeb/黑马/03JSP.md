# 今日目标：

- 理解JSP及JSP原理
- 能在JSP中使用EL表达式和JSTL标签  
  理解MVC模式和三层架构
- 能完成品牌数据的增删改查功能

# 1, JSP 概述

JSP（全称：Java Server
Pages）：Java服务端页面。是一种动态的网页技术，其中既可以定义HTML、JS、CSS等静态内容，还可以定义Java代码的动态内容，也就是JSP =
HTML + Java。如下就是jsp代码

```txt
1 <html>
2 <head>
3 <title>Title</title>
4 </head>
5 <body>
6 <h1>JSP,Hello world</h1>
7 <%
8 System.out.println("hello,jsp~");
9 %>
10 </body>
11 </html>
```

上面代码 h1 标签内容是展示在页面上，而 Java 的输出语句是输出在 idea 的控制台。

那么，JSP 能做什么呢？现在我们只用 servlet 实现功能，看存在什么问题。如下图所示，当我们登陆成功后，需要在页面上展示用户名

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119232.jpg)

炒杀 优惠券 PLUS会员 品牌闪购 拍卖 京东家电 京东超市 京东生鲜 京东国际 东

上图的用户名是动态展示，也就是谁登陆就展示谁的用户名。只用Servlet如何实现呢？在今天的资料里已经提供好了一个LoginServlet，该servlet就是实现这个功能的，现将资料中的LoginServlet.java拷贝到request-demo项目中来演示。接下来启动服务器并访问登陆页面

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119233.jpg)

输入了 zhangsan 用户的登陆信息后点击 登陆 按钮，就能看到如下图效果

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119234.jpg)

当然如果是 lis 登陆的，在该页面展示的就是 lis，欢迎您，动态的展示效果就实现了。那么 LoginServlet 到底是如何实现的，我们看看它里面的内容

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119235.jpg)

上面的代码有大量使用到 writer 对象向页面写标签内容，这样我们的代码就显得很麻烦；将来如果展示的效果出现了问题，排错也显得有点力不从心。而
JSP 是如何解决这个问题的呢？在资料中也提供了一个 login.jsp 页面，该页面也能实现该功能，现将该页面拷贝到项目的 webapp 下，需要修改
login.html 中表单数据提交的路径为下图

```txt
<div id="loginDiv">
    <form action="/request-demo/login.jsp" method="post" id="form">
        <h1 id="loginMsg">LOGIN IN</h1>
    </p>Username: <input id="username" name="username" type="text"></p>
```

重新启动服务器并进行测试，发现也可以实现同样的功能。那么 login.jsp 又是如何实现的呢？那我们来看看 login.jsp 的代码

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119236.jpg)

上面代码可以看到里面基本都是 HTML 标签，而动态数据使用 Java 代码进行展示；这样操作看起来要比用 servlet 实现要舒服很多。

JSP 作用：简化开发，避免了在Servlet中直接输出HTML标签。

# 2, JSP 快速入门

接下来我们做一个简单的快速入门代码。

# 2.1 搭建环境

创建一个maven的web项目，项目结构如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119237.jpg)

pom.xml 文件内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi: schemaLocation="http://maven.apache.org/POM/4.0.0"
http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelversion>4.0.0</modelversion>
    <groupId>org.example</groupId>
    <artifactId>jsp-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>javax.swing.</groupId>
            <artifactId>javax.swingapi</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
            </plugin>
        </plugins>
    </build>
</project>
```

# 2.2导入JSP依赖

在dependencies标签中导入JSP的依赖，如下

```xml
1 <dependency>
2 <groupId>javax.swing<jsp</groupId>
3 <artifactId>jsp-api</artifactId>
4 <version>2.2</version>
5 <scope>provided</scope>
6 </dependency>
```

该依赖的 scope 必须设置为 provided，因为.tomcat 中有这个jar包了，所以在打包时我们是不希望将该依赖打进到我们工程的war包中。

# 2.3 创建 jsp 页面

在项目的 webapp 下创建jsp页面

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119238.jpg)

通过上面方式创建一个名为hello.jsp的页面。

# 2.4 编写代码

在hello.jsp页面中书写HTML标签和Java代码，如下

```asp
1 <%@ page contentType="text/html; charset=UTF-8" language="java" %>  
2 <html>  
3 <head>  
4 <title>Title</title>  
5 </head>  
6 <body>  
7 <h1>hello jsp</h1>  
8  
9 <%  
10 System.out.println("hello, jsp~");  
11 %>  
12 </body>  
13 </html>
```

# 2.5测试

启动服务器并在浏览器地址栏输入 http://localhost:8080/jsp-demo/hello.jsp，我们可以在页面上看到如下内容

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119239.jpg)

# hello jsp

同时也可以看到在idea的控制台看到输出的hello.jsp~内容。

# 3, JSP 原理

我们之前说JSP就是一个页面，那么在JSP中写html标签，我们能理解，但是为什么还可以写Java代码呢？

因为JSP本质上就是一个Servlet。接下来我们聊聊访问jsp时的流程

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119240.jpg)

1. 浏览器第一次访问 hello.jsp 页面

2. tomcat 会将 hello.jsp 转换为名为 hello_jsp.java 的一个 Servlet
3. tomcat 再将转换的 servlet 编译成字节码文件 hello_jsp.class
4. tomcat 会执行该字节码文件，向外提供服务

我们可以到项目所在磁盘目录下找 target\tomcat\work\Tomcat\localhost\jsp-demo\org\apache\jsp 目录，而这个目录下就能看到转换后的Servlet

<table><tr><td>hello_jsp.class</td><td>2021/8/18 11:00</td><td>CLASS 文件</td><td>4 KB</td></tr><tr><td>hello_jsp.java</td><td>2021/8/18 11:00</td><td>JAVA 文件</td><td>4 KB</td></tr></table>

打开 hello.jsp.java 文件，来查看里面的代码

```java
public final class hello_jsp extends org.apache.jasper.Runtime.HttpJspBase implements org.apache.jasper.Runtime.JspSourceDependent {
```

由上面的类的继承关系可以看到继承了名为HttpJspBase这个类，那我们在看该类的继承关系。到资料中的找如下目录：资料\tomcat源码\apache-tomcat-8.5.68-src\java\org\
apache\jasper\runtime，该目录下就有HttpJspBase类，查看该类的继承关系

```scala
public abstract class HttpJspBase extends HttpServlet implements HttpJspPage {
```

可以看到该类继承了HttpServlet；那么hello_jsp这个类就间接的继承了HttpServlet，也就说明hello_jsp是一个servlet。

继续阅读 hello_jsp 类的代码，可以看到有一个名为 _jspService() 的方法，该方法就是每次访问 jsp 时自动执行的方法，和 servlet
中的 service 方法一样。

而在 _jspService() 方法中可以看到往浏览器写标签的代码：

```javascript
out.write("\r\n");   
out.write("  $\text{<html>\backslash r\n}^{\prime \prime}$  ）；   
out.write("  $\text{<head>\backslash r\n}^{\prime \prime}$  ）；   
out.write("  $\text{<title>}$  Title</title>\r\n");   
out.write("  $\text{</head>\backslash r\n}^{\prime \prime}$  ）；   
out.write("body>\r\n");   
out.write("\r\n");   
out.write("  $\text{ <h1 >}$  hello jsp</h1>\r\n");   
out.write("\r\n");   
out.write("  $\text{ " } )$  ： System.out.println("hello,jsp~"); int i  $= 3$  ·   
out.write("\r\n");   
out.write("  $\text{ <r\n}^{\prime \prime}$  ）；   
out.write("  $\text{ <body>\backslash r\n}^{\prime \prime}$  ）；   
out.write("  $\text{ </html>\backslash r\n}^{\prime \prime}$  ）；
```

以前我们自己写Servlet时，这部分代码是由我们自己来写，现在有了jsp后，由tomcat完成这部分功能。

# 4, JSP 脚本

JSP脚本用于在JSP页面内定义Java代码。在之前的入门案例中我们就在JSP页面定义的Java代码就是JSP脚本。

# 4.1 JSP 脚本分类

JSP 脚本有如下三个分类:

• <%...%>: 内容会直接放到_jspService()方法之中  
• <%=...%>: 内容会放到out.print()中，作为out.print()的参数  
• <%!...%>: 内容会放到.jspService()方法之外，被类直接包含

# 代码演示：

在 hello.jsp 中书写

```matlab
1 <%   
2 system.out.println("hello,jsp~");   
3 int i = 3;   
4  $\% >$
```

通过浏览器访问 hello.jsp 后，查看转换的 hello.jsp.java 文件，i变量定义在了 _jspService() 方法中

```txt
System.out.println("hello, jsp~"); int i = 3;
```

在 hello.jsp 中书写

```asp
1 <%= "hello"%>  
2 <%= i%>
```

通过浏览器访问 hello.jsp 后，查看转换的 hello_jsp.java 文件，该脚本的内容被放在了 out.print() 中，作为参数

```javascript
out.print("hello"); out.write("\\r\n"); out.write(""); out.print(i);
```

在 hello.jsp 中书写

```asp
1 <%!  
2 void show(){}  
3 String name = "zhangsan";  
4 %>
```

通过浏览器访问 hello.jsp 后，查看转换的 hello.jsp.java 文件，该脚本的内容被放在了成员位置

```java
public final class hello_jsp extends org.apache.jasper.runtime HttpJspBase implements org.apache.jasper.runtime.JspSourceDependent { void show(){ String name  $=$  "zhangsan";
```

# 4.2 案例

# 4.2.1需求

使用JSP脚本展示品牌数据

新增

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠</td><td>100</td><td>三只松鼠，好吃不上火</td><td>启用</td><td>修改删除</td></tr><tr><td>2</td><td>优衣库</td><td>优衣库</td><td>10</td><td>优衣库，服适人生</td><td>禁用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>1000</td><td>为发烧而生</td><td>启用</td><td>修改删除</td></tr></table>

说明：

- 在资料 资料\1. JSP案例素材 中提供了 brand.html 静态页面
- 在该案例中数据不从数据库中查询，而是在JSP页面上写死

# 4.2.2 实现

- 将资料 资料\1. JSP案例素材 中的 Brand.java 文件放置到项目的 com.itheima.pojo 包下
- 在项目的 webapp 中创建 brand.jsp，并将 brand.html 页面中的内容拷贝过来。brand.jsp 内容如下

```html
<@ page contentType="text/html; charset=UTF-8" language="java" %>  
<!DOCTYPE html>  
<html lang="en">  
<head>  
<meta charset="UTF-8">
```

```html
<title>Title</title>
</head>
<body>
input type="button" value="新增">
<br>
<table border="1" cellspacing="0" width="800">
<tr>
    <th>序号</th>
    <th>品牌名称</th>
    <th>企业名称</th>
    <th>排序</th>
    <th>品牌介绍</th>
    <th>状态</th>
    <th>操作</th>
</tr>
<tr align="center">
<td>1</td>
<td>三只松鼠</td>
<td>三只松鼠</td>
<td>100</td>
<td>三只松鼠，好吃不上火</td>
<td>启用</td>
<td><a href="#">修改</a><a href="#">删除</a></td>
</tr>
<tr align="center">
<td>2</td>
<td>优衣库</td>
<td>优衣库</td>
<td>10</td>
<td>优衣库，服适人生</td>
<td>禁用</td>
<td><a href="#">修改</a><a href="#">删除</a></td>
</tr>
<tr align="center">
<td>3</td>
<td>小米</td>
<td>小米科技有限公司</td>
<td>1000</td>
<td>为发烧而生</td>
<td>启用</td>
<td><a href="#">修改</a><a href="#">删除</a></td>
</table>
</body>
</html>
```

现在页面中的数据都是假数据。

- 在brand.jsp 中准备一些数据

```txt
1 <%
2 //查询数据库
3 List<Brand> brands = new ArrayList<Brand>(); 
4 brands.add(new Brand(1, "三只松鼠", "三只松鼠", 100, "三只松鼠，好吃不上火", 1)); 
5 brands.add(new Brand(2, "优衣库", "优衣库", 200, "优衣库，服适人生", 0)); 
6 brands.add(new Brand(3, "小米", "小米科技有限公司", 1000, "为发烧而生", 1)); 
7 %>
```

注意：这里的类是需要导包的

```txt
1 <table border  $=$  "1"cells spacing  $\coloneqq$  "0"width  $\coloneqq$  "800">   
2 <tr>   
3 <th>序号</th>   
4 <th>品牌名称</th>   
5 <th>企业名称</th>   
6 <th>排序</th>   
7 <th>品牌介绍</th>   
8 <th>状态</th>   
9 <th>操作</th>   
10   
11 </tr>   
12   
13 <% for (int i = 0; i < brands.size(); i++) {   
15 //获取集合中的每一个 Brand 对象   
16 Brand brand  $=$  brands.get(i);   
17 }   
18 %>   
19 <tr align  $\coloneqq$  "center">   
20 <td>1</td>   
21 <td>三只松鼠</td>   
22 <td>三只松鼠</td>   
23 <td>100</td>   
24 <td>三只松鼠，好吃不上火</td>   
25 <td>启用</td>   
26 <td><a href  $\coloneqq$  "#">修改</a><a href  $\coloneqq$  "#">删除</a></td>   
27 </tr>   
28 </table>
```

上面的for循环需要将tr标签包裹起来，这样才能实现循环的效果，代码改进为

```txt
< table border = "1" cellspacing = "0" width = "800" >  
2 < tr >  
3 < th >序号</th >  
4 < th >品牌名称</th >  
5 < th >企业名称</th >  
6 < th >排序</th >  
7 < th >品牌介绍</th >  
8 < th >状态</th >  
9 < th >操作</th >  
10  
11 </ tr >  
12  
13 < %  
14 for (int i = 0; i < brands.size(); i++) {  
15 //获取集合中的每一个 Brand 对象  
16 Brand brand = brands.get(i);  
17 %>  
18 < tr align = "center" >  
19 < td >1</ td >  
20 < td >三只松鼠</ td >  
21 < td >三只松鼠</ td >  
22 < td >100</ td >  
23 < td >三只松鼠，好吃不上火</ td >  
24 < td >启用</ td >  
25 < td >< a href = "#" >修改</a> < a href = "#" >删除</a></td>  
26 </ tr >  
27 < %  
28 }  
29 %>  
30  
31 </ table>
```

上面代码中的 td 标签中的数据都需要是动态的，所以还需要改进

```html
< table border="1" cellspacing="0" width="800" >  
2 < tr >  
3 < th>序号</th>  
4 < th>品牌名称</th>  
5 < th>企业名称</th>  
6 < th>排序</th>  
7 < th>品牌介绍</th>  
8 < th>状态</th>  
9 < th>操作</th>  
10  
11 </ tr >  
12  
13 < %  
14 for (int i = 0; i < brands.size(); i++) { //获取集合中的每一个 Brand 对象  
15 Brand brand = brands.get(i);  
16 %>  
17 < tr align="center" >  
18 < td><%=brand.getId()%></td>  
19 < td><%=brand.getName()%></td>  
20 < td><%=brand.getName().%></td>  
21 < td><%=brand.getName().%></td>  
22 < td><%=brand.getName().%></td>  
23 < td><%=brand.getName().%></td>  
24 < td><%=brand.status() == 1 ? "启用":"禁用"%></td>  
25 < td><a href="#">修改</a></a> < a href="#">删除</a></td>  
26 </ tr >  
27 < %  
28 }  
29 %>  
30  
31 </ table >
```

# 4.2.3 成品代码

```asp
<%@ page import="com.itheima.pojo.Brand" %>  
<%@ page import="java.util.List" %>  
<%@ page import="java.util.ArrayList" %>  
<%@ page contentType="text/html; charset=UTF-8" language="java" %>  
<%
// 查询数据库  
List<Brand> brands = new ArrayList<Brand>();  
brands.add(new Brand(1, "三只松鼠", "三只松鼠", 100, "三只松鼠，好吃不上火", 1));  
brands.add(new Brand(2, "优衣库", "优衣库", 200, "优衣库，服适人生", 0));  
brands.add(new Brand(3, "小米", "小米科技有限公司", 1000, "为发烧而生", 1));  
%>
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title title></title>  
</head>  
<body>  
<input type="button" value="新增"><br>  
<hr>  
<table border="1" cellspacing="0" width="800">  
<tr>
```

```html
27 <th>序号</th>   
28 <th>品牌名称</th>   
29 <th>企业名称</th>   
30 <th>排序</th>   
31 <th>品牌介绍</th>   
32 <th>状态</th>   
33 <th>操作</th>   
34 </tr>   
35 <%   
36 for (int i = 0; i < brands.size(); i++) { Brand brand = brands.get(i);   
37 %>   
38   
39   
40 <tr align="center">   
41 <td><%=brand.getId(%)></td>   
42 <td><%=brand.getName(%)></td>   
43 <td><%=brand.getNameName(%)></td>   
44 <td><%=brand.getOrdered(%)></td>   
45 <td><%=brand.getNameDescription(%)></td>   
46 <td><%=brand.status() == 1 ? "启用":"禁用"%></td>   
47 <td><a href="#">修改</a><a href="#">删除</a></td>   
48 </tr>   
49   
50 <%   
51 }   
52 %>   
53 </table>   
54 </body>   
55 </html>
```

# 4.2.4 测试

在浏览器地址栏输入 http://localhost:8080/jsp-demo/brand.jsp，页面展示效果如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119241.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119242.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119243.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119244.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119245.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119246.jpg)

localhost:8080/jsp-demo/brand.jsp

新增

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠</td><td>100</td><td>三只松鼠，好吃不上火</td><td>启用</td><td>修改删除</td></tr><tr><td>2</td><td>优衣库</td><td>优衣库</td><td>200</td><td>优衣库，服适人生</td><td>禁用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>1000</td><td>为发烧而生</td><td>启用</td><td>修改删除</td></tr></table>

# 4.3 JSP 缺点

通过上面的案例，我们可以看到JSP的很多缺点。

由于JSP页面内，既可以定义HTML标签，又可以定义Java代码，造成了以下问题：

- 书写麻烦：特别是复杂的页面

既要写 HTML 标签，还要写 Java 代码

阅读麻烦

上面案例的代码，相信你后期再看这段代码时还需要花费很长的时间去梳理

- 复杂度高：运行需要依赖于各种环境，JRE，JSP容器，JavaEE...
- 占内存和磁盘：JSP会自动生成.java和.class文件占磁盘，运行的是.class文件占内存
- 调试困难：出错后，需要找到自动生成的.java文件进行调试
- 不利于团队协作：前端人员不会 Java，后端人员不精 HTML

如果页面布局发生变化，前端工程师对静态页面进行修改，然后再交给后端工程师，由后端工程师再将该页面改为JSP页面

由于上述的问题，JSP 已逐渐退出历史舞台，以后开发更多的是使用 HTML + Ajax 来替代。Ajax
是我们后续会重点学习的技术。有个这个技术后，前端工程师负责前端页面开发，而后端工程师只负责前端代码开发。下来对技术的发展进行简单的说明

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119247.jpg)

1. 第一阶段：使用<servlet>即实现逻辑代码编写，也对页面进行拼接。这种模式我们之前也接触过
2. 第二阶段：随着技术的发展，出现了 JSP，人们发现 JSP 使用起来比 Servlet 方便很多，但是还是要在 JSP 中嵌套 Java 代码，也不利于后期的维护
3. 第三阶段：使用 Servlet 进行逻辑代码开发，而使用 JSP 进行数据展示

不要直接在JSP里写Java代码！

Servlet

逻辑处理，封装数据

JSP

获取数据，遍历展现数据

4. 第四阶段：使用Servlet 进行后端逻辑代码开发，而使用HTML 进行数据展示。而这里面就存在问题，HTML 是静态页面，怎么进行动态数据展示呢？这就是
   ajax 的作用了。

那既然JSP已经逐渐的退出历史舞台，那我们为什么还要学习JSP呢？原因有两点：

- 一些公司可能有些老项目还在用 JSP，所以要求我们必须动 JSP
- 我们如果不经历这些复杂的过程，就不能体现后面阶段开发的简单

接下来我们来学习第三阶段，使用EL表达式和JSTL标签库替换JSP中的Java代码。

# 5, EL 表达式

# 5.1 概述

EL（全称Expression Language）表达式语言，用于简化JSP页面内的Java代码。

EL 表达式的主要作用是 获取数据。其实就是从域对象中获取数据，然后将数据展示在页面上。

而EL表达式的语法也比较简单，${expression}。例如：${brands}就是获取域中存储的key为brands的数据。

# 5.2 代码演示

- 定义<servlet，在servlet中封装一些数据并存储到request域对象中并转发到el-demo.jsp页面。

```java
1 @webServlet("/demo1")   
2 public class ServletDemo1 extends HttpServlet { @Override protected void doGet(HttpSVletRequest request,HttpSVletResponse response) throws ServletException，IOException{ //1.准备数据 List<Brand> brands  $=$  new ArrayList<Brand>(); brands.add(new Brand(1,"三只松鼠","三只松鼠",100,"三只松鼠，好吃不上火",1)); brands.add(new Brand(2,"优衣库","优衣库",200,"优衣库，服适人生",0)); brands.add(new Brand(3,"小米","小米科技有限公司",1000,"为发烧而生",1)); //2.存储到request域中 request.setAttribute("brands",brands); //3.转发到el-demo.jsp request.getRequestDispatcher("/el-demo.jsp").forward(request/response); } @Override protected void doPost(HttpSVletRequest request,HttpSVletResponse response) throws ServletException，IOException{ this.doGet(request，response); 1
```

- 在 el-demo.jsp 中通过 EL表达式 获取数据

```asp
<%@ page contentType="text/html; charset=UTF-8" language="java" %>  
<html>  
<head>  
<title>Title</title>  
</head>  
<body>  
${brands}  
</body>  
</html>
```

- 在浏览器的地址栏输入 http://localhost:8080/jsp-demo/demo1，页面效果如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119248.jpg)

[Brand{id=1, brandName='三只松鼠', companyName='三只松鼠', ordered=100, description='三只松鼠，好吃不上火', status=1}, Brand{id=2, brandName='优衣库', companyName='优衣库', ordered=200, description='优衣库，服适人生', status=0}, Brand{id=3, brandName='小米', companyName='小米科技有限公司', ordered=1000, description='为发烧而生', status=1}]

# 5.3 域对象

JavaWeb中有四大域对象，分别是：

page: 当前页面有效

- request: 当前请求有效
- session: 当前会话有效
- application: 当前应用有效

el 表达式获取数据，会依次从这4个域中寻找，直到找到为止。而这四个域对象的作用范围如下图所示

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119249.jpg)

例如: ${brands}, el 表达式获取数据,会先从page域对象中获取数据,如果没有再到 requet 域对象中获取数据,如果再没有再到
session 域对象中获取,如果还没有才会到 application 中获取数据。

# 6, JSTL标签

# 6.1 概述

JSP标准标签库(Jsp Standarded Tag Library)，使用标签取代JSP页面上的Java代码。如下代码就是JSTL标签

```txt
1 <c:if test="${flag == 1}">  
2 男  
3 </c:if>  
4 <c:if test="${flag == 2}">  
5 女  
6 </c:if>
```

上面代码看起来是不是比JSP中嵌套Java代码看起来舒服好了。而且前端工程师对标签是特别敏感的，他们看到这段代码是能看懂的。

JSTL 提供了很多标签，如下图

<table><tr><td>标签</td><td>描述</td></tr><tr><td>&lt;c:out&gt;</td><td>用于在JSP中显示数据,就像&lt;%= ... &gt;</td></tr><tr><td>&lt;c:set&gt;</td><td>用于保存数据</td></tr><tr><td>&lt;c:remove&gt;</td><td>用于删除数据</td></tr><tr><td>&lt;c:catch&gt;</td><td>用来处理产生错误的异常状况,并且将错误信息储存起来</td></tr><tr><td>&lt;c:if&gt;</td><td>与我们在一般程序中用的if一样</td></tr><tr><td>&lt;c:choose&gt;</td><td>本身只当做&lt;c:when&gt;和&lt;c:otherwise&gt;的父标签</td></tr><tr><td>&lt;c:when&gt;</td><td>&lt;c:choose&gt;的子标签,用来判断条件是否成立</td></tr><tr><td>&lt;c:otherwise&gt;</td><td>&lt;c:choose&gt;的子标签,接在&lt;c:when&gt;标签后,当&lt;c:when&gt;标签判断为false时被执行</td></tr><tr><td>&lt;c:import&gt;</td><td>检索一个绝对或相对URL,然后将其内容暴露给页面</td></tr><tr><td>&lt;c:forEach&gt;</td><td>基础迭代标签,接受多种集合类型</td></tr><tr><td>&lt;c:Tokens&gt;</td><td>根据指定的分隔符来分隔内容并迭代输出</td></tr><tr><td>&lt;c:param&gt;</td><td>用来给包含或重定向的页面传递参数</td></tr><tr><td>&lt;c:redirect&gt;</td><td>重定向至一个新的URL.</td></tr><tr><td>&lt;c:url&gt;</td><td>使用可选的查询参数来创造一个URL</td></tr></table>

我们只对两个最常用的标签进行讲解，<c:forEach> 标签和 <c:if> 标签。

JSTL 使用也是比较简单的，分为如下步骤：

- 导入坐标

```xml
1 <dependency>
2 <groupId>jstl</groupId>
3 <artifactId>jstl</artifactId>
4 <version>1.2</version>
5 </dependency>
6 <dependency>
7 <groupId>taglibs</groupId>
8 <artifactId>standard</artifactId>
9 <version>1.1.2</version>
10 </dependency>
```

- 在JSP页面上引入JSTL标签库

```asp
1 <%@ taglib prefix="c" url="http://java.sun.com/jsp/jstl/core" %>
```

- 使用标签

# 6.2 if 标签

<c:if>：相当于if判断

- 属性：test，用于定义条件表达式

```txt
1 <c:if test="${flag == 1}">  
2 男  
3 </c:if>  
4 <c:if test="${flag == 2}">  
5 女  
6 </c:if>
```

# 代码演示：

- 定义一个 servlet，在该 servlet 中向 request 域对象中添加键是 status，值为 1 的数据

```java
1 @WebServlet("/demo2")   
2 public class ServletDemo2 extends HttpServlet { @override protected void doGet(HttpRequest request,HttpServletResponse response) throws ServletException，IOException{ //1.存储数据到request域中 request.setAttribute("status",1); //2.转发到jstl-if.jsp 数据request.getRequestDispatcher("/jstl-if.jsp").forward(request,response); 1   
3 @Override protected void doPost(HttpRequest request,HttpServletResponse response) throws ServletException，IOException{ this.doGet(request，response);   
4 }   
5
```

- 定义 jst1-if.jsp 页面，在该页面使用 <c:if> 标签

```txt
<%@ page contentType="text/html; charset=UTF-8" language="java" %>  
<%@ taglib prefix="c" url="http://java.sun.com/jsp/jstl/core" %>  
<html>  
<head>  
<title>Title</title>  
</head>  
<body>  
<%--  
c:if:来完成逻辑判断,替换java if else  
--%>  
<c:if test="/${status ==1}">  
启用  
</c:if>  
<c:if test="/${status ==0}">  
禁用  
</c:if>  
</body>  
</html>
```

注意：在该页面已经要引入JSTL核心标签库

```asp
<%@ taglib prefix="c" url="http://java.sun.com/jsp/jstl/core" %>
```

# 6.3forEach标签

<c:forEach>：相当于 for 循环。java中有增强for循环和普通for循环，JSTL 中的 <c:forEach> 也有两种用法

# 6.3.1 用法一

类似于 Java 中的增强for循环。涉及到的 <c:forEach> 中的属性如下

- items: 被遍历的容器  
  var: 遍历产生的临时变量
- varStatus: 遍历状态对象

如下代码，是从域对象中获取名为brands数据，该数据是一个集合；遍历遍历，并给该集合中的每一个元素起名为brand，是Brand对象。在循环里面使用EL表达式获取每一个Brand对象的属性值

```html
1 <c:forEach items="${brands}" var="brand">   
2 <tr align="center">   
3 <td>$brand.id></td>   
4 <td>$brand.brandName></td>   
5 <td>$brand.companyName></td>   
6 <td>$brand.description></td>   
7 </tr>   
8 </c:forEach>
```

# 代码演示：

- servlet 还是使用之前的名为 ServletDemo1。
- 定义名为 jst1-foreach.jsp 页面，内容如下：

```asp
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" url="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
        <title>Title</title>
    </head>
<body>
<input type="button" value="新增"><br>
<br>
<table border="1" cellspacing="0" width="800">
<tr>
    <th>序号</th>
    <th>品牌名称</th>
    <th>企业名称</th>
    <th>排序</th>
    <th>品牌介绍</th>
    <th>状态</th>
    <th>操作</th>
</tr>
<c:forEach items="/${brands}" var="brand" varStatus="status">
    <tr align="center">
        <!--td>$brand.id.</td)--%>
        <td>$status.count.</td>
        <td>$brand.brandName.</td>
        <td>$brand.companyName.</td>
        <td>$brand.orderred.</td>
        <td>$brand.description.</td>
        <c:if test="/${brand.status==" 1">
            <td>启用</td>
        </c:if>
        <c:if test="/${brand.status != 1">
            <td>禁用</td>
        </c:if>
        <td><a href="#">修改</a></a></td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
```

# 6.3.2 用法二

类似于 Java 中的普通for循环。涉及到的 <c:forEach> 中的属性如下

begin: 开始数  
end: 结束数

- step: 步长

实例代码：

从0循环到10，变量名是 i，每次自增1

```xml
1 <c:forEach begin="0" end="10" step="1" var="i">   
2 ${i}   
3 </c:forEach>
```

# 7，MVC模式和三层架构

MVC 模式和三层架构是一些理论的知识，将来我们使用了它们进行代码开发会让我们代码维护性和扩展性更好。

# 7.1 MVC模式

MVC 是一种分层开发的模式，其中：

M: Model, 业务模型, 处理业务  
• V: View, 视图, 界面展示  
C: Controller, 控制器, 处理请求, 调用模型和视图

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119250.jpg)

控制器（serLvlet）用来接收浏览器发送过来的请求，控制器调用模型（JavaBean）来获取数据，比如从数据库查询数据；  
控制器获取到数据后再交由视图（JSP）进行数据展示。

# MVC好处：

- 职责单一，互不影响。每个角色做它自己的事，各司其职。
- 有利于分工协作。
- 有利于组件重用

# 7.2 三层架构

三层架构是将我们的项目分成了三个层面，分别是表现层、业务逻辑层、数据访问层。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119251.jpg)

- 数据访问层：对数据库的CRUD基本操作
-
业务逻辑层：对业务逻辑进行封装，组合数据访问层层中基本功能，形成复杂的业务逻辑功能。例如注册业务功能，我们会先调用数据访问层的selectByName()
方法判断该用户名是否存在，如果不存在再调用数据访问层的insert()方法进行数据的添加操作
- 表现层：接收请求，封装数据，调用业务逻辑层，响应数据

而整个流程是，浏览器发送请求，表现层的Servlet接收请求并调用业务逻辑层的方法进行业务逻辑处理，而业务逻辑层方法调用数据访问层方法进行数据的操作，依次返回到serlvet，然后servlet将数据交由JSP进行展示。

三层架构的每一层都有特有的包名称:

- 表现层：com.itheima.controller 或者 com.itheima.web
- 业务逻辑层：com.itheima.service
- 数据访问层：com.itheima.dao 或者 com.itheima mapper

后期我们还会学习一些框架，不同的框架是对不同层进行封装的

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119252.jpg)

# 7.3 MVC和三层架构

通过 MVC 和三层架构的学习，有些人肯定混淆了。那他们有什么区别和联系？

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119253.jpg)

如上图上半部分是 MVC 模式，上图下半部分是三层架构。MVC 模式 中的 C（控制器）和 V（视图）就是 三层架构 中的表现层，而 MVC 模式
中的 M（模型）就是 三层架构 中的业务逻辑层 和 数据访问层。

可以将 MVC 模式 理解成是一个大的概念，而三层架构 是对 MVC 模式
实现架构的思想。那么我们以后按照要求将不同层的代码写在不同的包下，每一层里功能职责做到单一，将来如果将表现层的技术换掉，而业务逻辑层和数据访问层的代码不需要发生变化。

# 8，案例

需求：完成品牌数据的增删改查操作

新增

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠</td><td>100</td><td>三只松鼠，好吃不上火</td><td>启用</td><td>修改删除</td></tr><tr><td>2</td><td>优衣库</td><td>优衣库</td><td>10</td><td>优衣库，服适人生</td><td>禁用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>1000</td><td>为发烧而生</td><td>启用</td><td>修改删除</td></tr></table>

这个功能我们之前一直在做，而这个案例是将今天学习的所有内容（包含MVC模式和三层架构）进行应用，并将整个流程贯穿起来。

# 8.1 环境准备

环境准备工作，我们分以下步骤实现：

- 创建新的模块 brand_demo，引入坐标
- 创建三层架构的包结构
- 数据库表 tb_brand  
  实体类 Brand
- MyBatis 基础环境

Mybatis-config.xml  
BrandMapper.xml  
o BrandMapper接口

# 8.1.1 创建工程

创建新的模块 brand_demo，引入坐标。我们只要分析出要用到哪儿些技术，那么需要哪儿些坐标也就明确了

- 需要操作数据库。mysql的驱动包
- 要使用mybatis框架。mybatis的依赖包
- web项目需要用到<servlet和jsp。servlet和jsp的依赖包
- 需要使用 jstl 进行数据展示。jstl 的依赖包

pom.xml 内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>   
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:schemaLocation="http://maven.apache.org/POM/4.0.0" http://maven.apache.org/xsd/maven-4.0.0.xsd">   
<modelversion>4.0.0</modelversion>   
<groupId>org.example</groupId>   
<artifactId>brand-demo</artifactId>   
<version>1.0-SNAPSHOT</version>   
<packaging>war</packaging>   
<properties>   
<maven.compiler.source>8</maven.compiler.source>   
<maven.compiler.target>8</maven.compiler.target>   
</properties>   
<dependencies>   
<!-- mybatis-->   
<dependency>   
<groupId>org.mybatis</groupId>   
<artifactId>mybatis</artifactId>   
<version>3.5.5</version>   
</dependency>   
<!-- mysql-->   
<dependency>   
<groupId>mysql</groupId>   
<artifactId>mysql-connector-java</artifactId>   
<version>5.1.34</version>   
</dependency>   
<!--Servlet-->   
<dependency>   
<groupId>javax.swing</groupId>   
<artifactId>java.sqlervlet-api</artifactId>   
<version>3.1.0</version>   
<scope>provided</scope>   
</dependency>   
<!--jsp-->
```

```xml
40 <dependency>   
41 <groupId> javax.swing.jsp</groupId>   
42 <artifactId> jsp-api</artifactId>   
43 <version>2.2</version>   
44 <scope>provided</scope>   
45 </dependency>   
46   
47 <--jstl-->   
48 <dependency>   
49 <groupId> jstl</groupId>   
50 <artifactId> jstl</artifactId>   
51 <version>1.2</version>   
52 </dependency>   
53 <dependency>   
54 <groupId>taglibs</groupId>   
55 <artifactId>standard</artifactId>   
56 <version>1.1.2</version>   
57 </dependency>   
58 </dependencies>   
59   
60 <build>   
61 <plugins>   
62 <plugin>   
63 <groupId>org.apache.tomcat.maven</groupId>   
64 <artifactId>tomcat7-maven-plugin</artifactId>   
65 <version>2.2</version>   
66 </plugin>   
67 </plugins>   
68 </build>   
69 </project>
```

# 8.1.2 创建包

创建不同的包结构，用来存储不同的类。包结构如下

```txt
$\checkmark$  brand-demo D:\workspace\javaweb_code\brand
 $\checkmark$  src
 $\checkmark$  main
 $\checkmark$  java
 $\checkmark$  com
 $\checkmark$  itheima
  > mapper
  > pojo
  > service
  > util
  > web
  > resources
  > webapp
  > test
m pom.xml
```

# 8.1.3 创建表

```txt
1 --删除tb_brand表  
2 drop table if exists tb_brand;  
3 --创建tb_brand表  
4 create table tb_brand  
5 (  
6 -- id 主键  
7 id int primary key auto_increment,  
8 --品牌名称  
9 brand_name varchar(20),  
10 --企业名称  
11 company_name varchar(20),  
12 --排序字段  
13 ordered int,  
14 --描述信息
```

```sql
15 description varchar(100),  
16 -- 状态：0：禁用 1：启用  
17 status int  
18 );  
19 -- 添加数据  
20 insert into tb_brand (brand_name, company_name, ordered, description, status)  
21 values ('三只松鼠', '三只松鼠股份有限公司', 5, '好吃不上火', 0),  
22 ('华为', '华为技术有限公司', 100, '华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界', 1),  
23 ('小米', '小米科技有限公司', 50, 'are you ok', 1);
```

# 8.1.4 创建实体类

在pojo包下创建名为Brand的类。

```java
public class Brand {
    // id 主键
    private Integer id;
    // 品牌名称
    private String brandName;
    // 企业名称
    private String companyName;
    // 排序字段
    private Integer ordered;
    // 描述信息
    private String description;
    // 状态：0：禁用 1：启用
    private Integer status;
public Brand() {
    }
public Brand(Integer id, String brandName, String/companyName, String description) {
        this.id = id;
        this.brandName = brandName;
        this.companyName = companyName;
        this.description = description;
    }
public Brand(Integer id, String brandName, String/companyName, Integer ordered, String
            description, Integer status) {
                this.id = id;
                this.brandName = brandName;
                this.companyName = companyName;
                this.ordered = ordered;
                this.description = description;
                this.status = status;
            }
public Integer getId() {
return id;
}
public void setId(Integer id) {
this.id = id;
}
public String getBrandName() {
return brandName;
}
public void setBrandName(String brandName) {
this.brandName = brandName;
}
```

```java
public String getCompanyName(){ return companyName;   
public void setCompanyName(String companyName){ this.companyName  $\equiv$  companyName;   
public Integer getOrdered(){ return ordered;   
public void setOrdered(Integer ordered){ this.orderled  $\equiv$  ordered;   
public String getDescription(){ return description;   
public void setDescription(String description){ this.description  $=$  description;   
public Integer getStatus(){ return status;   
public void setStatus(Integer status){ this.status  $\equiv$  status;   
@override   
public String toString(){ return "Brand{} + "id="  $^+$  id  $^+$  ",brandName  $= ^{\prime \prime} +$  brandName  $+^{\prime \prime}$  + ",companyName  $= ^{\prime \prime} +$  companyName  $+^{\prime \prime}$  + ",ordered  $= ^{\prime \prime} +$  ordered  $^+$  ",description  $= ^{\prime \prime} +$  description  $+^{\prime \prime}$  + ",status  $= ^{\prime \prime} +$  status  $^+$  ';'   
1
```

# 8.1.5 准备mybatis环境

定义核心配置文件 Mybatis-config.xml，并将该文件放置在 resources 下

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE configuration  
PUBLIC "/~/mybatis.org//DTD Config 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-config.dtd">  
<configuration>  
<!--起别名-->  
(typeAliases>  
<package name="com.itheima.pojo"/>  
</typeAliases>  
<environments default="development">  
<environment id="development">  
<transactionManager type="JDBC"/>  
<DataSource type="POOLED">
```

```xml
15 <property name="driver" value="com.mysql.jdbc.Driver"/>   
16 <property name="url" value="jdbc:mysql://db1?   
useSSL=false&amp;useServerPrepStmts=true"/>   
17 <property name="username" value="root"/>   
18 <property name="password" value="1234"/>   
19 </dataSource>   
20 </environment>   
21 </environments>   
22 <mappers>   
23 <!--扫描mapper-->   
24 <package name="com.itheima.mapping"/>   
25 </mappers>   
26 </configuration>
```

在 resources 下创建放置映射配置文件的目录结构 com/itheima/mapper，并在该目录下创建映射配置文件 BrandMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "/~/mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.itheima mapper.BrandsMapper">  
</mapper>
```

# 8.2 查询所有

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119254.jpg)

当我们点击 index.html 页面中的 查询所有 这个超链接时，就能查询到上图右半部分的数据。

对于上述的功能，点击查询所有超链接是需要先请后端的servlet，由servlet跳转到对应的页面进行数据的动态展示。而整个流程如下图：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119255.jpg)

# 8.2.1 编写BrandMapper

在 mapper 包下创建创建 BrandMapper 接口，在接口中定义 selectAll() 方法

```txt
1 /\*\*   
2 \*查询所有   
3 \* @return   
4 \*/   
5 @select("select \*from tb_brand")   
6 List<Brand> selectAll();
```

# 8.2.2 编写工具类

在com.itheima包下创建utils包，并在该包下创建名为SqlSessionFactoryUtilities工具类

```java
public class SqSessionFactoryUtilities {
```

```java
3 private static sqrlsionFactory sqrlsionFactory;   
4   
5 static {   
6 //静态代码块会随着类的加载而自动执行，且只执行一次   
7 try { String resource  $=$  "mybatis-config.xml"; InputStream inputStream  $\equiv$  Resources.getResourceAsStream(resource); sqlsrsionFactory  $\equiv$  new sqrlsionFactoryBuilder().build(inputStream);   
10 } catch (IOException e){ e.printStackTrace();   
12 }   
13 }   
14 }   
15   
16 public static sqrlsionFactory getSqrlsionFactory(){ return sqrlsionFactory;   
17 }   
18 19
```

# 8.2.3 编写BrandService

在 service 包下创建 BrandService 类

```java
public class BrandService {
    SQLFactory factory = SQLFactoryUtils.getSqlFactory();
    /\*\* 
    \* 查询所有
    \* @return
    \*/ 
public List<Brand> selectAll(){
        //调用BrandsMapper.selectAll()
        //2. 获取SqlSession
        sqlSession sqlSession = factory.openSession();
        //3. 获取BrandsMapper
        BrandsMapper mapper = sqlSession Mapper(brandMapper.class);
        //4. 调用方法
        List<Brand> brands = mapper.selectAll();
        sqlSession.close();
        return brands;
}
```

# 8.2.4 编写Servlet

在 web 包下创建名为 SelectAllServlet 的 servlet，该 servlet 的逻辑如下：

- 调用 BrandService 的 selectAll() 方法进行业务逻辑处理，并接收返回的结果
- 将上一步返回的结果存储到 request 域对象中
- 跳转到 brand.jsp 页面进行数据的展示

具体的代码如下：

```java
1 @WebServlet("/selectAllServlet")   
2 public class SelectAllServlet extends HttpServlet { private BrandService service  $=$  new BrandService();   
4 @override protected void doGet(HttpRequest request,HttpServletResponse response) throws ServletException， IOException{   
7   
8 //1.调用BrandService完成查询
```

```java
9 List<Brand> brands = service.selectAll();   
10 //2.存入request域中   
11 request.setAttribute("brands",brands);   
12 //3.转发到brand.jsp   
13 request.getRequestDispatcher("/brand.jsp").forward(request, response);   
14 }   
15   
16 @override   
17 protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException， IOException{   
18 this.doGet(request，response);   
19 }   
20 }
```

# 8.2.5 编写brand.jsp页面

将资料 资料\2．品牌增删改查案例\静态页面
下的brand.htm1页面拷贝到项目的webapp目录下，并将该页面改成brand.jsp页面，而brand.jsp页面在表格中使用JSTL和EL表达式从request域对象中获取名为brands的集合数据并展示出来。页面内容如下：

```txt
1 <@ page contentType="text/html; charset=UTF-8" language="java" %>   
2 <@ taglib prefix="c" url="http://java.sun.com/jsp/jstl/core" %>   
3   
4 <!DOCTYPE html>   
5 <html lang="en">   
6 <head>   
7 <meta charset="UTF-8">   
8 <title>Title</title>   
9 </head>   
10 <body>   
11 <hr>   
12 <table border="1" cellspacing="0" width="80%" >   
13 <tr>   
14 <th>序号</th>   
15 <th>品牌名称</th>   
16 <th>企业名称</th>   
17 <th>排序</th>   
18 <th>品牌介绍</th>   
19 <th>状态</th>   
20 <th>操作</th>   
21 </tr>   
22   
23 <c:forEach items="\${brands}" var="brand" varStatus="status">   
24 <tr align="center">   
25 <%---td>\$\{brand.id\}</td></%->   
26 <td>\$\{status.count\}</td>   
27 <td>\$\{brand.brandName\}</td>   
28 <td>\$\{brand.companyName\}</td>   
29 <td>\$\{brand.ordered\}</td>   
30 <td>\$\{brand.description\}</td>   
31 <c:if test="_{\{brand.status==1}"}>   
32 <td>启用</td>   
33 </c:if>   
34 <c:if test="_{\{brand.status!=1}"}>   
35 <td>禁用</td>   
36 </c:if>   
37 <td><a href="/brand-demo/selectByIdServlet?id=$\{brand.id\}"修改</a><a href="#">删除</a></td>   
38 </tr>   
39 </c:forEach>   
40 </table>   
41 </body>   
42 </html>
```

# 8.2.6 测试

启动服务器，并在浏览器输入 http://localhost:8080/brand-demo/index.html，看到如下 查询所有的超链接，点击该链接就可以查询出所有的品牌数据

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td></td><td></td><td>5</td><td>好吃不上火</td><td>禁用</td><td>修改删除</td></tr><tr><td>2</td><td></td><td></td><td>100</td><td>华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界</td><td>启用</td><td>修改删除</td></tr><tr><td>3</td><td></td><td></td><td>50</td><td>are you ok</td><td>启用</td><td>修改删除</td></tr></table>

为什么出现这个问题呢？是因为查询到的字段名和实体类对象的属性名没有一一对应。相比看到这大家一定会解决了，就是在映射配置文件中使用
resultMap 标签定义映射关系。映射配置文件内容如下：

```xml
1 <?xml version="1.0" encoding="UTF-8"?>   
2 <!DOCTYPE mapper   
3 PUBLIC"-//mybatis.org//DTD Mapper 3.0//EN"   
4 "http://mybatis.org/dtd/mybatis-3-mapper.dtd">   
5 <mapper namespace="com.itheima mapper.BrandsMapper">   
6   
7 <resultMap id="brandResultMap" type="brand">   
8 <result column="brand_name" property="brandName"></result>   
9 <result column="company_name" property="companyName"></result>   
10 </resultMap>   
11 </mapper>
```

并且在 BrandMapper 接口中的 selectAll() 上使用 @ResuleMap 注解指定使用该映射

```txt
1 /\*\*   
2 \*查询所有   
3 \* @return   
4 \*/   
5 @Select("select \*from tb_brand")   
6 @ResultMap("brandResultSet")   
7 List<Brand> selectAll();
```

重启服务器，再次访问就能看到我们想要的数据了

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠股份有限公司</td><td>5</td><td>好吃不上火</td><td>禁用</td><td>修改删除</td></tr><tr><td>2</td><td>华为</td><td>华为技术有限公司</td><td>100</td><td>华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界</td><td>启用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>50</td><td>are you ok</td><td>启用</td><td>修改删除</td></tr></table>

# 8.3 添加

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119257.jpg)

上图是做添加功能流程。点击新增按钮后，会先跳转到addBrand.jsp新增页面，在该页面输入要添加的数据，输入完毕后点击提交按钮，需要将数据提交到后端，而后端进行数据添加操作，并重新将所有的数据查询出来。整个流程如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119258.jpg)

接下来我们根据流程来实现功能：

# 8.3.1 编写BrandMapper方法

在 BrandMapper 接口，在接口中定义 add(Brand brand) 方法

```txt
1 @Insert("insert into tb_brand values(null, #{brandName}, #{companyName}, #{ordered}, # {description}, #{status}")  
2 void add(Brand brand);
```

# 8.3.2 编写BrandService方法

在 Brandservice 类中定义添加品牌数据方法 add(Brand brand)

```java
1 /***
2 * 添加
3 * @param brand
4 */
5 public void add(Brand brand) {
6
7 //2. 获取SqlSession
8 sqlSession.sqlSession = factory.openSession();
9 //3. 获取BrandMapper
10 BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);
11
12 //4. 调用方法
13 mapper.add(brand);
14
15 //提交事务
16 sqlSession.commit();
17 //释放资源
18 sqlSession.close();
19 }
```

# 8.3.3 改进brand.jsp页面

我们需要在该页面表格的上面添加 新增 按钮

```html
1 <input type="button" value="新增" id="add"><br>
```

并给该按钮绑定单击事件，当点击了该按钮需要跳转到brand.jsp添加品牌数据的页面

```html
1 <script>   
2 document.getElementByld("add").onClick = function(){   
3 locationhref  $\equiv$  "/brand-demo/addBrand.jsp";   
4 }   
5 </script>
```

注意：该 script 标签建议放在 body 结束标签前面。

# 8.3.4 编写addBrand.jsp页面

从资料 资料\2．品牌增删改查案例\静态页面 中将 addBrand.html 页面拷贝到项目的 webapp 下，并改成 addBrand.jsp 动态页面

```asp
<%@ page contentType="text/html; charset=UTF-8" language="java" %>  
<!DOCTYPE html>  
<html lang="en">  
<head>  
<meta charset="UTF-8">  
<title>添加品牌</title>  
</head>  
<body>
```

```html
10 <h3>添加品牌</h3>   
11 <form action="/brand-demo/addServlet" method="post">   
12 品牌名称：<input name="brandName"><br>   
13 企业名称：<input name="companyName"><br>   
14 排序：<input name="ordered"><br>   
15 描述信息：<textarea rows="5" cols="20" name="description"></textarea><br>   
16 状态：   
17 <input type="radio" name="status" value="0">禁用   
18 <input type="radio" name="status" value="1">启用<br>   
19   
20 <input type="submit" value="提交">   
21 </form>   
22 </body>   
23 </html>
```

# 8.3.5 编写servlet

在 web 包下创建 AddServlet 的 servlet，该 servlet 的逻辑如下：

设置处理post请求乱码的字符集

- 接收客户端提交的数据
- 将接收到的数据封装到 Brand 对象中
- 调用 BrandService 的 add() 方法进行添加的业务逻辑处理
- 跳转到 selectAllServlet 资源重新查询数据

# 具体的代码如下：

```java
1 @WebServlet("/addServlet")   
2 public class AddServlet extends HttpServlet { private BrandService service  $=$  new BrandService();   
3   
4   
5   
6 @override protected void doGet HttpServletRequest request,HttpServletResponse response) throws ServletException，IOException{   
8   
9 //处理POST请求的乱码问题 request.setCharacterEncoding("utf-8");   
10   
11   
12 //1.接收表单提交的数据，封装为一个Brand对象 String brandName  $=$  request.getParameter("brandName"); String companyName  $=$  request.getParameter("companyName"); String ordered  $=$  request.getParameter("ordered"); String description  $=$  request.getParameter("description"); String status  $=$  request.getParameter("status");   
13   
14   
15   
16   
17   
18   
19 //封装为一个Brand对象 Brand brand  $=$  new Brand(); brand.setBrandName (brandName); brand.setCompanyName (companyName); brand.setOrdered (Integer.parseInt(ordered)); brand.setDescription (description); brand.setStatus (Integer.parseInt(status));   
20   
21   
22   
23   
24   
25   
26   
27 //2.调用service 完成添加 service.add (brand);   
28   
29   
30   
31   
32 }   
33   
34 @Override protected void doPost HttpServletRequest request,HttpServletResponse response) throws ServletException，IOException{ this.doGet(request，response);
```

37

38

# 8.3.6 测试

点击brand.jsp页面的新增按钮，会跳转到addBrand.jsp页面

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119259.jpg)

# 添加品牌

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119260.jpg)

状态：  $\bigcirc$  禁用  $\odot$  启用

提交

点击提交按钮，就能看到如下页面，里面就包含我们刚添加的数据

新增

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠股份有限公司</td><td>5</td><td>好吃不上火</td><td>禁用</td><td>修改删除</td></tr><tr><td>2</td><td>华为</td><td>华为技术有限公司</td><td>100</td><td>华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界</td><td>启用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>50</td><td>are you ok</td><td>启用</td><td>修改删除</td></tr><tr><td>4</td><td>鸿星尔克</td><td>鸿星尔克</td><td>10000</td><td>to be no.1</td><td>启用</td><td>修改删除</td></tr></table>

# 8.4 修改

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119261.jpg)

点击每条数据后面的编辑按钮会跳转到修改页面，如下图：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119262.jpg)

在该修改页面我们可以看到将编辑按钮所在行的数据回显到表单，然后需要修改那个数据在表单中进行修改，然后点击提交的按钮将数据提交到后端，后端再将数据存储到数据库中。

从上面的例子我们知道修改功能需要从两方面进行实现，数据回显和修改操作。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119263.jpg)

上图就是回显数据的效果。要实现这个效果，那当点击修改按钮时不能直接跳转到update.jsp页面，而是需要先带着当前行数据的id请求后端程序，后端程序根据id查询数据，将数据存储到域对象中跳转到update.jsp页面进行数据展示。整体流程如下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119264.jpg)

# 8.4.1.1 编写BrandMapper方法

在 BrandMapper 接口，在接口中定义 selectById(int id) 方法

```sql
1 /\*\*   
2 \*根据id查询   
3 \* @param id   
4 \* @return   
5 \*/   
6  $@$  Select("select  $^ { \text{喜} }$  from tb_brand where id  $=$  #{id}")   
7  $@$  ResultMap("brandResultMap")   
8 Brand selectById(int id);
```

# 8.4.1.2 编写BrandService方法

在 BrandService 类中定义根据id查询数据方法 selectById(int id)

```java
1 /***
2 * 根据id查询
3 * @return
4 */
5 public Brand selectByld(int id){
6 //调用BrandMapper.selectAll()
7 //2. 获取SqlSession
8榫 session sqlSession = factory.openSession();
9 //3. 获取BrandMapper
10榫 session sqlSession.getMapper(brandMapper.class);
11 //4. 调用方法
12榫 sessionsqlSession.close();
13榫 session.close();
14 return brand;
15 }
```

# 8.4.1.3 编写servlet

在 web 包下创建 SelectByIdServlet 的 servlet，该 servlet 的逻辑如下：

- 获取请求数据 id
- 调用 BrandService 的 selectById() 方法进行数据查询的业务逻辑

- 将查询到的数据存储到 request 域对象中
- 跳转到update.jsp页面进行数据真实

具体代码如下：

```java
1 @webServlet("/selectByIdServlet")   
2 public class SelectByIdServlet extends HttpServlet { private BrandService service  $=$  new BrandService();   
3 @Override protected void doGet(HttpRequest request,HttpServletResponse response) throws ServletException，IOException{ //1．接收id String id  $=$  request.getParameter("id"); //2．调用service查询 Brand brand  $=$  service.selectById(Integer.parseInt(id)); //3.存储到request中 request.setAttribute("brand",brand); //4．转发toupdate.jsp request.getRequestDispatcher("/update.jsp").forward(request，response);   
15 }   
16 @Override protected void doPost(HttpRequest request,HttpServletResponse response) throws ServletException，IOException{ this.DoGet(request，response);   
20 }   
21 }
```

# 8.4.1.4 编写update.jsp页面

拷贝addBrand.jsp页面，改名为update.jsp并做出以下修改：

title标签内容改为修改品牌

- form 标签的 action 属性值改为 /brand-demo/updateServlet
- input 标签要进行数据回显，需要设置 value 属性

```html
1 品牌名称：<input name="brandName" value="${brand.brandName}"><br>
2 企业名称：<input name="companyName" value="${brand.companyName}"><br>
3 排序：<input name="ordered" value="${brand.ordered}"><br>
```

- textarea 标签要进行数据回显，需要在标签体中使用 EL表达式

```html
描述信息: <textarea rows="5" cols="20" name="description">${brand.description} </textarea> <br>
```

- 单选框使用 if 标签需要判断 brand.status 的值是 1 还是 0 在指定的单选框上使用 checked 属性，表示被选中状态

```html
1 状态：  
2 <c:if test="${brand.status == 0}"  
3 <input type="radio" name="status" value="0" checked>禁用  
4 <input type="radio" name="status" value="1">启用<br>  
5 </c:if>  
6  
7 <c:if test="${brand.status == 1}"  
8 <input type="radio" name="status" value="0" >禁用  
9 <input type="radio" name="status" value="1" checked>启用<br>  
10 </c:if>
```

综上，update.jsp 代码如下：

```asp
<%@ page contentType="text/html; charset=UTF-8" language="java" %>  
<%@ taglib prefix="c" url="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
```

```html
4 <html lang="en">   
5 <head>   
6 <meta charset="UTF-8">   
7 <title>修改品牌</title>   
8 </head>   
9 <body>   
10 <h3>修改品牌</h3>   
11 <form action="/brand-demo/uploadServlet" method="post">   
12 品牌名称：<input name="brandName" value="${brand.brandName}"><br>   
14 企业名称：<input name="companyName" value="${brand.companyName}"><br>   
15 排序：<input name="ordered" value="${brand.ordered}"><br>   
16 描述信息：<textarea rows="5" cols="20" name="description">${brand.description}</textarea>   
17 状态：   
18 <c:if test="/${brand.status == 0}">   
19 <input type="radio" name="status" value="0" checked>禁用   
20 <input type="radio" name="status" value="1">启用<br>   
21 </c:if>   
22   
23 <c:if test="/${brand.status == 1}">   
24 <input type="radio" name="status" value="0" >禁用   
25 <input type="radio" name="status" value="1" checked>启用<br>   
26 </c:if>   
27   
28 <input type="submit" value="提交">   
29 </form>   
30 </body>   
31 </html>
```

# 8.4.2 修改数据

做完回显数据后，接下来我们要做修改数据了，而下图是修改数据的效果：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119265.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119266.jpg)

<table><tr><td>序号</td><td>品牌名称</td><td>企业名称</td><td>排序</td><td>品牌介绍</td><td>状态</td><td>操作</td></tr><tr><td>1</td><td>三只松鼠</td><td>三只松鼠</td><td>100</td><td>三只松鼠，好吃不上火</td><td>启用</td><td>修改删除</td></tr><tr><td>2</td><td>优衣库</td><td>优衣库</td><td>10</td><td>优衣库，服适人生</td><td>禁用</td><td>修改删除</td></tr><tr><td>3</td><td>小米</td><td>小米科技有限公司</td><td>1000</td><td>为发烧而生</td><td>启用</td><td>修改删除</td></tr></table>

# update.jsp

在修改页面进行数据修改，点击提交按钮，会将数据提交到后端程序，后端程序会对表中的数据进行修改操作，然后重新进行数据的查询操作。整体流程如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129145119267.jpg)

# 8.4.2.1 编写BrandMapper方法

在 BrandMapper 接口，在接口中定义 update(Brand brand) 方法

```txt
1 /* */
2 * 修改
3 * @param brand
4 */
5 @update("update tb_brand set brand_name = #{brandName},company_name = #{companyName},ordered = #{ordered},description = #{description},status = #{status} where id = #{id}") 
6 void update(Brand brand);
```

# 8.4.2.2 编写BrandService方法

在 BrandService 类中定义根据id查询数据方法 update(Brand brand)

```java
1 /\*\*   
2 \*修改   
3 \* @param brand   
4 \*/   
5 public void update(Brand brand){   
6 //2.获取sqlsession   
7 SQLSession sqlSession  $=$  factory.openSession();   
8 //3.获取BrandMapper   
9 BrandMapper mapper  $=$  sqlSession.getMapper(BrandMapper.class);   
10 //4.调用方法   
11 mapper.update(brand);   
12 //提交事务   
13 sqlSession.commit();   
14 //释放资源   
15 sqlSession.close();   
16 }
```

# 8.4.2.3 编写servlet

在 web 包下创建 AddServlet 的 servlet，该 servlet 的逻辑如下：

设置处理post请求乱码的字符集

- 接收客户端提交的数据
- 将接收到的数据封装到 Brand 对象中
- 调用 BrandService 的 update() 方法进行添加的业务逻辑处理
- 跳转到 selectAllServlet 资源重新查询数据

具体的代码如下：

```java
@webServlet("/updateServlet")   
public class updateServlet extends HttpServlet { private BrandService service  $=$  new Brandservice(); @override protected void doGet(HttpRequest request,HttpServletResponse response) throws ServletException，IOException{ //处理POST请求的乱码问题 request.setCharacterEncoding("utf-8"); //1．接收表单提交的数据，封装为一个Brand对象 String id  $=$  request.getParameter("id"); String brandName  $=$  request.getParameter("brandName"); String companyName  $=$  request.getParameter("companyName"); String ordered  $=$  request.getParameter("ordered"); String description  $=$  request.getParameter("description"); String status  $=$  request.getParameter("status"); //封装为一个Brand对象 Brand brand  $=$  new Brand(); brand.setId(Integer.parseInt(id)); brand.setBrandName.brandName); brand.setCompanyName/companyName); brand.setOrdered(Integer.parseInt(ordered));
```

```java
24 brand descriptionscription(description);   
25 brand.setStatus(Integer.parseInt(status));   
26   
27 //2.调用service完成修改   
28 service.update(brand);   
29   
30 //3.转发到查询所有Servlet   
31 request.getRequestDispatcher("/selectAllServlet").forward(request, response);   
32 }   
33 @override   
34 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws   
35 ServletException，IOException{   
36 this.doGet(request，response);   
37 }   
38 }
```

存在问题：update.jsp页面提交数据时是没有携带主键数据的，而后台修改数据需要根据主键进行修改。

针对这个问题，我们不希望页面将主键id展示给用户看，但是又希望在提交数据时能将主键id提交到后端。此时我们就想到了在学习 HTML
时学习的隐藏域，在 update.jsp 页面的表单中添加如下代码：

```html
1 <%-隐藏域，提交id--%>  
2 <input type="hidden" name="id" value="${brand.id}">
```

update.jsp 页面的最终代码如下：

```asp
<%@ page contentType="text/html; charset=UTF-8" language="java" %>  
<%@ taglib prefix="c" url="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>修改品牌</title>  
</head>  
<body>  
<h3>修改品牌</h3>  
<form action="/brand-demo/uploadServlet" method="post">  
<%-隐藏域，提交id-%>  
<input type="hidden" name="id" value="_{brand.id}">  
品牌名称：<input name="brandName" value="_{brand.brandName}"><br>  
企业名称：<input name="companyName" value="_{brand.companyName}"><br>  
排序：<input name="ordered" value="_{brand.order}"><br>  
描述信息：<textarea rows="5" cols="20" name="description"${brand.description}</textarea>  
<br>状态：  
<c:if test="_{brand.status == 0}"/>  
    <input type="radio" name="status" value="0" checked>禁用  
    <input type="radio" name="status" value="1">启用<br>  
</c:if>  
<c:if test="_{brand.status == 1}"/>  
    <input type="radio" name="status" value="0" >禁用  
    <input type="radio" name="status" value="1" checked>启用<br>  
</c:if>  
<c:if test="_submit" value="提交">  
</form>  
</body>  
</html>
```
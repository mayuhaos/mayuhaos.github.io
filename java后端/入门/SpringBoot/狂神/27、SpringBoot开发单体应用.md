简介

好的，同学们，那么接下来呢，我们开始学习SpringBoot与Web开发，从这一章往后，就属于我们实战部分的内容了；

其实SpringBoot的东西用起来非常简单，因为SpringBoot最大的特点就是自动装配。

# 使用SpringBoot的步骤：

1、创建一个SpringBoot应用，选择我们需要的模块，SpringBoot就会默认将我们的需要的模块自动配置好。  
2、手动在配置文件中配置部分配置项目就可以运行起来了。  
3、专注编写业务代码，不需要考虑以前那样一大堆的配置了。

要熟悉掌握开发，之前学习的自动配置的原理一定要搞明白！

比如SpringBoot到底帮我们配置了什么？我们能不能修改？我们能修改哪些配置？我们能不能扩展？

- 向容器中自动配置组件：\*\*\* Autoconfiguration
- 自动配置类，封装配置文件的内容：\*\*\*Properties

没事就找找类，看看自动装配原理！

我们之后来进行一个单体项目的小项目测试，让大家能够快速上手开发！

# 静态资源处理

静态资源映射规则

# 首先，我们搭建一个普通的SpringBoot项目，回顾一下HelloWorld程序！【演示】

写请求非常简单，那我们要引入我们前端资源，我们项目中有许多的静态资源，比如css，js等文件，这个SpringBoot怎么处理呢？

如果我们是一个web应用，我们的main下会有一个webapp，我们以前都是将所有的页面导在这里面的，对吧！但是我们现在的pom呢，打包方式是为jar的方式，那么这种方式SpringBoot能不能来给我们写页面呢？当然是可以的，但是SpringBoot对于静态资源放置的位置，是有规定的！

# 我们先来聊聊这个静态资源映射规则：

SpringBoot中，SpringMVC的web配置都在WebMvcAutoConfiguration这个配置类里面；

我们可以去看看WebMvcAutoConfigurationAdapter中有很多配置方法；

有一个方法： addResourceActers 添加资源处理

```java
1 @Override   
2 public void addResourcehandlers(ResourceHandlerRegistry registry) {   
3 if (!this.ResourceProperties.isAddMappings()) {
```

```javascript
//已禁用默认资源处理
logger.debug("Default resource handling disabled");
return;
}
//缓存控制
Duration cachePeriod = this.ResourceProperties.getCache().getPeriod();
cacheControl cacheControl =
this.ResourceProperties.getCache().getCachecontrol().toHttpCacheControl();
// webjars 配置
if (!registry.hasMappingForPattern("/webjars/**")) {
customizeResourceHandlerRegistration(registry.addResourceHandler("/webjars/***")
).
addResourceLocations("classpath:/META-INF/resources/webjars.")
}.
setCachePeriod(getSeconds(cachePeriod)).setCacheControl(cacheControl));
}
//静态资源配置
String staticPathPattern = this.mvcProperties.getStaticPathPattern();
if (!registry.hasMappingForPattern(staticPathPattern)) {
customizeResourceHandlerRegistration(registry.addResourceHandler(staticPathPattern)
}.
addResourceLocations(getResourceLocations(this.ResourceProperties.getStaticLocations()));
```

读一下源代码：比如所有的 /webjars/**，都需要去 classpath:/META-INF/resources/webjars/ 找对应的资源；

那什么是webjars呢？

Webjars本质就是以jar包的方式引入我们的静态资源，我们以前要导入一个静态资源文件，直接导入即可。

使用SpringBoot需要使用Webjars，我们可以去搜索一下：

网站：https://www.webjars.org 【网站带看，并引入jQuery测试】

要使用jQuery，我们只要要引入jQuery对应版本的pom依赖即可！

```xml
1 <dependency>
2 <groupId>org.webjars</groupId>
3 <artifactId>jquery</artifactId>
4 <version>3.4.1</version>
5 </dependency>
```

导入完毕，查看webjars目录结构，并访问jQuery.js文件！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302323.jpg)

访问：只要是静态资源，SpringBoot就会去对应的路径寻找资源，我们这里访问：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302324.jpg)

# 第二种静态资源映射规则

那我们项目中要是使用自己的静态资源该怎么导入呢？我们看下一行代码；

我们去找staticPathPattern发现第二种映射规则：/\*\*, 访问当前的项目任意资源，它会去找 resourceProperties 这个类，我们可以点进去看一下分析：

http://localhost:8080/webjars/jquery/3.4.1/jquery.js

```java
1 //进入方法   
2 public String[] getStaticLocations(){ return this(staticLocations;   
4 }   
5 //找到对应的值   
6 private String[] staticLocations  $=$  CLASSPATHRESOURCE_LOCATIONS;   
7 //找到路径   
8 private static final String[] CLASSPATHRESOURCE_LOCATIONS  $=$  { "klass:/META-INF/resources/", "klass:/resources/," "klass:/static/","klass:/public/"   
10   
11   
12   
13 ；
```

ResourceProperties 可以设置和我们静态资源有关的参数；这里面指向了它会去寻找资源的文件夹，即上面数组的内容。

所以得出结论，以下四个目录存放的静态资源可以被我们识别：

```txt
1     "klass:/META-INF/resources/"  
2     "klass:/resources/"  
3     "klass:/static/"  
4     "klass:/public/"
```

我们可以在resources根目录下新建对应的文件夹，都可以存放我们的静态文件；

比如我们访问 http://localhost:8080/1.js，他就会去这些文件夹中寻找对应的静态资源文件；

# 自定义静态资源路径

我们也可以自己通过配置文件来指定一下，哪些文件夹是需要我们放静态资源文件的，在application.properties中配置；

```txt
1 spring-resources(static-locations=classpath:/coding/, classpath:/kuang/
```

一旦自己定义了静态文件夹的路径，原来的自动配置就都会失效了！

# 首页处理

静态资源文件夹说完后，我们继续向下看源码！可以看到一个欢迎页的映射，就是我们的首页！

```txt
@Bean
public WelcomePageHandlerMapping
welcomePageHandlerMapping(ApplicationContext applicationContext,
3 FormattingConversionService mvcConversionService,
4 ResourceUrlProvider mvcResourceUrlProvider) {
  WelcomePageHandlerMapping welcomePageHandlerMapping = new welcomePageHandlerMapping(
    new TemplateAvailabilityProviders(applicationContext),
  applicationContext, getWelcomePage(), // getWelcomePage 获得欢迎页
  this.mvcProperties.getStaticPathPattern());
  welcomePageHandlerMapping.setInterceptors(getInterceptors(mvcConversionService, mvcResourceUrlProvider));
  return welcomePageHandlerMapping;
}
```

点进去继续看

```txt
private Optional< Resource> getWelcomePage() {
    String[] locations = 
        getResourceLocations(this.ResourceProperties.getStaticLocations());
    // ::是java8 中新引入的运算符
    // Class::function的时候function是属于Class的，应该是静态方法。
    // this::function的funtion是属于这个对象的。
    // 简而言之，就是一种语法糖而已，是一种简写
    return
        Arrays.streamLocations().map(this::getIndexHtml).filter(this::isReadable).findFirst();
} // 欢迎页就是一个location下的的 index.html 而已
private Resource getIndexHtml(String location) {
    return this.ResourceLoader.getResource.location + "index.html";
}
```

欢迎页，静态资源文件夹下的所有 index.html 页面；被  $\mathcal{A}\mathcal{A}^{\prime \prime}$  映射。

比如我访问 http://localhost:8080/，就会找静态资源文件夹下的 index.html 【可以测试一下】

新建一个 index.html，在我们上面的3个目录中任意一个；然后访问测试 http://localhost:8080/ 看结果！

# 关于网站图标说明：

Welcome Page

Spring Boot supports both static and templated welcome pages. It first looks for an index.html file in the configured
static content locations. If one is not found, it then looks for an index template. If either is found, it is
automatically used as the welcome page of the application.

Custom Favicon

As with other static resources, Spring Boot looks for afavicon.ico in the configured static content locations. If such a
file is present, it is automatically used as the favicon of the application.

与其他静态资源一样，Spring Boot在配置的静态内容位置中查找favicon.ico。如果存在这样的文件，它将自动用作应用程序的favicon。

1、关闭SpringBoot默认图标

1 #关闭默认图标  
2 spring.mvc.favicon.enabled=false

2、自己放一个图标在静态资源目录下，我放在 public 目录下  
3、清除浏览器缓存！刷新网页，发现图标已经变成自己的了！

```txt
localhost:8080 +  
< > http://localhost:8080/  
> 收藏 <小破站 官网 工具站 积累 MyWeb 百度 译 翻译
```

# Thymeleaf

前端交给我们的页面，是html页面。如果是我们以前开发，我们需要把他们转成jsp页面，jsp好处就是当我们查出一些数据转发到SP页面以后，我们可以用jsp轻松实现数据的显示，及交互等。

jsp支持非常强大的功能，包括能写Java代码，但是呢，我们现在的这种情况，SpringBoot这个项目首先是以jar的方式，不是war，像第二，我们用的还是嵌入式的Tomcat，所以呢，他现在默认是不支持jsp的。

那不支持jsp，如果我们直接用纯静态页面的方式，那给我们开发会带来非常大的麻烦，那怎么办呢？

# SpringBoot推荐你可以来使用模板引擎：

模板引擎，我们其实大家听到很多，其实jsp就是一个模板引擎，还有以用的比较多的freemarker，包括SpringBoot给我们推荐的Thymeleaf，模板引擎有非常多，但再多的模板引擎，他们的思想都是一样的，什么样一个思想呢我们来看一下这张图：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302325.jpg)

模板引擎的作用就是我们来写一个页面模板，比如有些值呢，是动态的，我们写一些表达式。而这些值，从哪来呢，就是我们在后台封装一些数据。然后把这个模板和这个数据交给我们模板引擎，模板引擎按照我们这个数据帮你把这表达式解析、填充到我们指定的位置，然后把这个数据最终生成一个我们想要的内容给我们写出去，这就是我们这个模板引擎，不管是jsp还是其他模板引擎，都是这个思想。只不过呢，就是说不同模板引擎之间，他们可能这个语法有点不一样。其他的我就不介绍了，我主要来介绍一下SpringBoot给我们推荐的Thymeleaf模板引擎，这模板引擎呢，是一个高级语言的模板引擎，他的这个语法更简单。而且呢，功能更强大。

我们呢，就来看一下这个模板引擎，那既然要看这个模板引擎。首先，我们来看SpringBoot里边怎么用。

# 引入Thymeleaf

怎么引入呢，对于springboot来说，什么事情不都是一个start的事情嘛，我们去在项目中引入一下。给大家三个网址：

Thymeleaf 官网：https://www.thymeleaf.org/

Thymeleaf 在Github 的主页: https://github.com/thymeleaf/thymeleaf

Spring官方文档：找到我们对应的版本

https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/reference/htmlsingle/#using-boot-starter

找到对应的pom依赖：可以适当点进源码看下本来的包！

```xml
1 <!--thymeleaf-->
2 <dependency>
3 <groupId>org.springframework.boot</groupId>
4 <artifactId>spring-boot-starter-thymeleaf</artifactId>
5 </dependency>
```

Maven会自动下载jar包，我们可以去看下下载的东西；

```txt
Maven: org.thymeleaf.extras:thymeleaf-extras-java8time:3.0.4.RELEASE  
Maven: org.thymeleaf:thymeleaf:3.0.11.RELEASE  
Maven: org.thymeleaf:thymeleaf-spring5:3.0.11.RELEASE
```

thymeleaf分析

前面呢，我们已经引入了Thymeleaf，那这个要怎么使用呢？

我们首先得按照SpringBoot的自动配置原理看一下我们这个Thymeleaf的自动配置规则，在按照那个规则，我们进行使用。

我们去找一下Thymeleaf的自动配置类：ThymeleafProperties

```java
1 @ConfigurationProperties(   
2 prefix  $=$  "spring.thymeleaf"   
3   
4 public class ThymeleafProperties {   
5 private static final CharSequence DEFAULTENCODING;   
6 public static final String DEFAULT_PREFIX  $\equiv$  "classpath:/templates/";   
7 public static final String DEFAULT_SUFFIX  $=$  ".html";   
8 private boolean checkTemplate  $\equiv$  true;   
9 private boolean checkTemplateLocation  $\equiv$  true;   
10 private String prefix  $\equiv$  "classpath:/templates/";   
11 private String suffix  $\equiv$  ".html";   
12 private String mode  $\equiv$  "HTML";   
13 private CharSequence encoding;   
14 }
```

我们可以在其中看到默认的前缀和后缀！

我们只需要把我们的html页面放在类路径下的templates下，thymeleaf就可以帮我们自动渲染了。

使用thymeleaf什么都不需要配置，只需要将他放在指定的文件夹下即可！

# 测试：

1、编写一个TestController

```java
1 @Controller   
2 public class TestController {   
3   
4 @RequestMapping("/t1")   
5 public String test1(){   
6 //classpath:/templates/test.htm   
7 return "test";   
8 }   
9   
10 }
```

2、编写一个测试页面 test.html 放在 templates 目录下

```html
1 <!DOCTYPE html>   
2 <html lang  $\equiv$  "en">   
3 <head>   
4 <meta charset="UTF-8">   
5 <title>Title</title>   
6 </head>   
7 <body>   
8 <h1>测试页面</h1>   
9   
10 </body>   
11 </html>
```

3、启动项目请求测试

Thymeleaf 语法学习

要学习语法，还是参考官网文档最为准确，我们找到对应的版本看一下；

Thymeleaf 官网：https://www.thymeleaf.org/, 简单看一下官网! 我们去下载Thymeleaf的官方文档!

我们做个最简单的练习：我们需要查出一些数据，在页面中展示

1、修改测试请求，增加数据传输；

```java
1 @RequestMapping("/t1")   
2 public String test1(Model model){   
3 //存入数据   
4 model.addAttribute("msg","Hello,Thymeleaf");   
5 //klass:/templates/test.htm1   
6 return "test";   
7 }
```

2、我们要使用thymeleaf，需要在html文件中导入命名空间的约束，方便提示。

我们可以去官方文档的#3中看一下命名空间拿来过来：

```txt
1 xmlns:th="http://www.thymeleaf.org"
```

3、我们去编写下前端页面

```html
1 <!--DOCTYPE html>
2 <html lang="en" xmlns:th="http://www.thymeleaf.org">
3 <head>
4 <meta charset="UTF-8">
5 <title>狂神说</title>
6 </head>
7 <body>
8 <h1>测试页面</h1>
9
10 <!--th:text就是将div中的内容设置为它指定的值，和之前学习的Vue一样-->
11 <div th:text="${msg}"></div>
12 </body>
13 </html>
```

# 4、启动测试！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302326.jpg)

# 测试页面

Hello, Thymeleaf

# OK，入门搞定，我们来认真研习一下Thymeleaf的使用语法！

# 1、我们可以使用任意的 th:attr 来替换Html中原生属性的值！参考官网文档#10；th语法

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302327.jpg)

# 2、我们能写那些表达式呢？我们可以看到官方文档#4

```txt
1 Simple expressions: (表达式语法)
2 Variable Expressions: ${...}: 获取变量值; OGNL;
```

1）、获取对象的属性、调用方法  
2）、使用内置的基本对象： #18

```makefile
ctx : the context object.   
#vars: the context variables.   
#locale : the context locale.   
#request : (only in Web Contexts) the HttpServletRequest object.   
#response : (only in Web Contexts) the HttpServletResponse object.   
#session : (only in Web Contexts) the HttpSession object.   
#servletContext : (only in Web Contexts) the ServletContext object.
```

3）、内置的一些工具对象：

```txt
#execInfo : information about the template being processed.
#uris : methods for escaping parts of URLs/URIs
#conversions : methods for executing the configured conversion service (if any).
#dates : methods for java.util.Date objects: formatting, component extraction, etc.
#calendars : analogous to #dates , but for java.util.Calendar objects.
#numbers : methods for formatting numeric objects.
#strings : methods for String objects: contains, startsWith, prepending/appending, etc.
#objects : methods for objects in general.
#bools : methods for boolean evaluation.
#arrays : methods for arrays.
#lists : methods for lists.
#sets : methods for sets.
#maps : methods for maps.
#aggregates : methods for creating aggregates on arrays or collections.
```

```txt
Selection Variable Expressions: \*{..}：选择表达式：和{}在功能上是一样；  
Message Expressions：#{..}：获取国际化内容  
Link URL Expressions：@{..}：定义URL;  
Fragment Expressions：\~{..}：片段引用表达式
```

_literals（字面量）

```txt
Text literals: 'one text', 'Another one!', ...  
Number literals: 0, 34, 3.0, 12.3, ...  
Boolean literals: true, false  
Null literal: null  
Literal tokens: one, sometext, main, ...
```

Text operations:（文本操作）

```yaml
String concatenation: +
Literal substitutions: |The name is ${name} |
```

Arithmetic operations: (数学运算)

```txt
Binary operators: + , - , *, / , %  
Minus sign (unary operator): -
```

Boolean operations: (布尔运算)

```txt
Binary operators: and, or  
Boolean negation (unary operator):!, not
```

Comparisons and equality: (比较运算)

```txt
55 Comparator:  $>, <, >=, <=$  (gt, lt, ge, le)  
56 Equality operators:  $==$ , != (eq, ne)  
57 Conditional operators:条件运算（三元运算符）  
59 If-then: (if) ? (then)  
60 If-then-else: (if) ? (then) : (else)  
61 Default: (value) ?: (defaultvalue)  
62 Special tokens:  
64 No-Operation: _
```

# 练习测试：

1、我们编写一个Controller，放一些数据

```java
1 @RequestMapping("/t2")   
2 public String test2(Map<String,object> map){   
3 //存入数据   
4 map.put("msg","<h1>Hello</h1>")   
5 map.put("users",Arrays.asList("qinjiang","kuangshen"));   
6 //classpath:/templates/test.html   
7 return "test";   
8 }
```

2、测试页面取出数据

```html
1 <!--DOCTYPE html>
2 <html lang="en" xmlns:th="http://www.thymeleaf.org">
3 <head>
4 <meta charset="UTF-8">
5 <title>狂神说</title>
6 </head>
7 <body>
8 <h1>测试页面</h1>
9
10 <div th:text="${msg}"></div>
11 <!--不转义-->
12 <div th:utext="${msg}"></div>
13
14 <!--遍历数据-->
15 <!--th:each每次遍历都会生成当前这个标签：官网#9-->
16 <h4 th:each="user:$\{users}" th:text="${user}"></h4>
17
18 <h4>
19 <!--行内写法：官网#12-->
20 <span th:each="user:$\{users}">[[\$\{user]]></span>
21 </h4>
22
23 </body>
24 </html>
```

3、启动项目测试！

我们看完语法，很多样式，我们即使现在学习了，也会忘记，所以我们在学习过程中，需要使用什么，根据官方文档来查询，才是最重要的，要熟练使用官方文档！

# 官网阅读

在进行项目编写前，我们还需要知道一个东西，就是SpringBoot对我们的SpringMVC还做了哪些配置，包括如何扩展，如何定制。

只有把这些都搞清楚了，我们在之后使用才会更加得心应手。途径一：源码分析，途径二：官方文档！

地址：https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/reference/htmlsingle/#boot-features-spring-mvc-auto-configuration

```txt
Spring MVC Auto-configuration  
// Spring Boot为Spring MVC提供了自动配置，它可以很好地与大多数应用程序一起工作。  
Spring Boot provides auto-configuration for Spring MVC that works well with most applications.  
// 自动配置在Spring默认设置的基础上添加了以下功能：  
The auto-configuration adds the following features on top of spring's defaults:  
// 包含视图解析器  
Inclusion of ContentNegotiatingViewResolver and BeanNameViewResolver beans.  
// 支持静态资源文件夹的路径，以及webjars  
Support for serving static resources, including support for webJars  
// 自动注册了Converter:  
// 转换器，这就是我们网页提交数据到后台自动封装成为对象的东西，比如把"1"字符串自动转换为 int类型  
// Formatter:【格式化器，比如页面给我们了一个2019-8-10，它会给我们自动格式化为Date对象】  
Automatic registration of Converter, GenericConverter, and Formatter beans.  
// HttpMessageConverters  
// SpringMVC用来转换Http请求和响应的的，比如我们要把一个User对象转换为JSON字符串，可以去看官网文档解释：  
Support for HttpMessageConverters (covered later in this document).  
// 定义错误代码生成规则的  
Automatic registration of MessageCodesResolver (covered later in this document).  
// 首页定制  
Static index.html support.  
// 图标定制  
Custom Favicon support (covered later in this document).  
// 初始化数据绑定器：帮我们把请求数据绑定到JavaBean中！  
Automatic use of a ConfigurableWebBindingInitializer bean (covered later in this document).  
/*  
如果您希望保留Spring Boot MVC功能，并且希望添加其他MVC配置（拦截器、格式化程序、视图控制器和其他功能），则可以添加自己  
的@configuration类，类型为webmvccfguier，但不添加@EnableWebMvc。如果希望提供RequestMappingHandlerMapping、RequestMappingHandlerAdapter或ExceptionHandlerExceptionResolver的自定义  
实例，则可以声明WebMCregistrationAdapter实例来提供此类组件。*/  
If you want to keep Spring Boot MVC features and you want to add additional MVC configuration (interceptors, formatters, view controllers, and other features), you can add your own
```

```txt
34 @Configuration class of type WebMvcConfigurer but without @EnableWebMvc. If you wish to provide custom instances of RequestMappingHandlerMapping, RequestMappingHandlerAdapter, or ExceptionHandlerExceptionResolver, you can declare a WebMvcRegistrationsAdapter instance to provide such components. // 如果您想完全控制Spring MVC，可以添加自己的@Configuration，并用@EnableWebMvc进行注释。 If you want to take complete control of Spring MVC, you can add your own @Configuration annotated with @EnableWebMvc.
```

我们来仔细对照，看一下它怎么实现的，它告诉我们SpringBoot已经帮我们自动配置好了SpringMVC，然后自动配置了哪些东西呢？

# ContentNegotiatingViewResolver 内容协商视图解析器

自动配置了ViewResolver，就是我们之前学习的SpringMVC的视图解析器；

即根据方法的返回值取得视图对象(View)，然后由视图对象决定如何渲染（转发，重定向）。

我们去看看这里的源码：我们找到WebMvcAutoConfiguration，然后搜索ContentNegotiatingViewResolver。找到如下方法！

```java
1     @Bean
2     @ConditionalOnBean(ViewResolver.class)
3     @ConditionalOnMissingBean(name = "viewResolver", value = 
            ContentNegotiatingViewResolver.class)
4     public ContentNegotiatingViewResolver resolver viewResolver(BeanFactory beanFactory)
5     {
6         ContentNegotiatingViewResolver resolver = new 
            ContentNegotiatingViewResolver();
6         resolver.setContentNegotiationManager(beansFactory.getBean(ContentNegotiationManager.class));
7     // ContentNegotiatingViewResolver使用所有其他视图解析器来定位视图，因此它应该具有较高的优先级
8         resolver.setOrder(Ordered.HIGHEST_PRECEDENCE);
9         return resolver;
10 }
```

我们可以点进这类看看！找到对应的解析视图的代码；

```java
1 @Nullable // 注解说明：@Nullable 即参数可为null  
2 public View resolveViewName(String_viewName, Locale locale) throws Exception {  
3     RequestAttributes attrs = RequestContextHolder.getRequestAttributes();  
4     Assert(state(attributes instanceof ServletRequestAttributes, "No current ServletRequestAttributes"));  
5     List<SmediaType> requestedMediaTypes = this.getMediaTypes(((ServletRequestAttributes)”attributes).getRequest());  
6     if (requestedMediaTypes != null) {  
7         // 获取候选的视图对象  
8     List<view> candidateViews = this.getCandidateViews/viewName, locale, requestedMediaTypes);  
9     // 选择一个最适合的视图对象，然后把这个对象返回
```

```txt
10 View bestView  $=$  this.getBestViewCandidateViews, requestedmediaTypes，attrs);   
11 if(bestView  $! =$  null）{   
12 returnbestView;   
13 }   
14 1   
15 //....   
16 }
```

我们继续点进去看，他是怎么获得候选的视图的呢？

getCandidateViews中看到他是把所有的视图解析器拿来，进行while循环，挨个解析！

```javascript
1 Iterator var5 = this.viewResolvers.iterator();
```

所以得出结论：ContentNegotiatingViewResolver 这个视图解析器就是用来组合所有的视图解析器的

我们再去研究下他的组合逻辑，看到有个属性viewResolver，看看它是在哪里进行赋值的！

```javascript
protected void initServletContext(ServletContext ServletContext) { // 这里它是从beanFactory工具中获取容器中的所有视图解析器 // viewResolver.class 把所有的视图解析器来组合的 collection<viewResolver> matchingBeans = BeanFactoryUtilities.beansOfTypeIncludingAncestors(this obtainingApplicationContext (), viewResolver.class).values(); ViewResolver viewResolver; if (this.viewResolvers == null) { this.viewResolver = new ArrayList(matchingBeans.size()); } // ........ 10
```

既然它是在容器中去找视图解析器，我们是否可以猜想，我们就可以去实现一个视图解析器了呢？

我们可以自己给容器中去添加一个视图解析器；这个类就会帮我们自动的将它组合进来；我们去实现一下

1、我们在我们的主程序中去写一个视图解析器来试试；

```java
1 @Bean //放到bean中
2 public viewResolver myViewResolver(){
3 return new MyViewResolver();
4 }
5
6 //我们写一个静态内部类，视图解析器就需要实现viewResolver接口
7 private static class MyViewResolver implements viewResolver {
8 @Override
9 public view resolverViewName(String s, Locale locale) throws Exception {
10     return null;
11 }
```

2、怎么看我们自己写的视图解析器有没有起作用呢？

我们给 DispatcherServlet 中的 doDispatch 方法加个断点进行调试一下，因为所有的请求都会走到这个方法中

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302328.jpg)

# 3、我们启动我们的项目，然后随便访问一个页面，看一下Debug信息；

# 找到this

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302329.jpg)

# 找到视图解析器，我们看到我们自己定义的就在这里了；

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302330.jpg)

所以说，我们如果想要使用自己定制化的东西，我们只需要给容器中添加这个组件就好了！剩下的事情SpringBoot就会帮我们做了

# 转换器和格式化器

# 找到格式化转换器：

```java
1 @Bean
2 @Override
3 public FormattingConversionService mvcConversionService() {
4     //拿到配置文件中的格式化规则
5         webConversionService conversionService = new WebConversionService(this.mvcProperties.getDateFormat());
6         addFormatters(conversionService);
8         return conversionService;
9 }
```

# 点击去：

```typescript
1 public String getDateFormat() {
2     return this.dateFormat;
3 } 
4 
5 /* * 
6 * Date format to use. For instance, `dd/MM/yyyy`. 默认的
7 */ 
8 private String dateFormat;
```

可以看到在我们的Properties文件中，我们可以进行自动配置它！

如果配置了自己的格式化方式，就会注册到Bean中生效，我们可以在配置文件中配置日期格式化的规则：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302331.jpg)

其余的就不——举例了，大家可以下去多研究探讨即可！

修改SpringBoot的默认配置

这么多的自动配置，原理都是一样的，通过这个WebMVC的自动配置原理分析，我们要学会一种学习方式，通过源码探究，得出结论；这个结论一定是属于自己的，而且一通百通。

SpringBoot的底层，大量用到了这些设计细节思想，所以，没事需要多阅读源码！得出结论；

SpringBoot在自动配置很多组件的时候，先看容器中有没有用户自己配置的（如果用户自己配置@bean），如果有就用用户配置的，如果没有就用自动配置的；

如果有些组件可以存在多个，比如我们的视图解析器，就将用户配置的和自己默认的组合起来！

# 扩展使用SpringMVC 官方文档如下：

If you want to keep Spring Boot MVC features and you want to add additional MVC configuration (interceptors, formatters,
view controllers, and other features), you can add your own @Configuration class of type WebMvcConfigurer but without
@EnableWebMvc. If you wish to provide custom instances of RequestMappingHandlerMapping, RequestMappingHandlerAdapter, or
ExceptionHandlerExceptionResolver, you can declare a WebMvcRegistrationsAdapter instance to provide such components.

我们要做的就是编写一个@Configuration注解类，并且类型要为WebMvcConfigurer，还不能标注
@EnableWebMvc注解；我们去自己写一个；我们新建一个包叫config，写一个类MyMvcConfig;

```java
//应为类型要求为webMvcConfigurer，所以我们实现其接口  
//可以使用自定义类扩展MVC的功能  
@Configuration  
public class MyMvcConfig implements webMvcConfigurer {  
    @override  
    public void addViewControllers(ViewControllerRegistry registry) {  
        // 浏览器发送/test，就会跳转到test页面；  
        registry.addViewController("/test").setViewName("test");  
    }  
}
```

我们去浏览器访问一下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302332.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302333.jpg)

# 测试页面

确实也跳转过来了！所以说，我们要扩展SpringMVC，官方就推荐我们这么去使用，既保SpringBoot留所有的自动配置，也能用我们扩展的配置！

我们可以去分析一下原理：

1、WebMvcAutoConfiguration 是 Spring MVC 的自动配置类，里面有一个类 WebMvcAutoConfigurationAdapter  
2、这个类上有一个注解，在做其他自动配置时会导入：

```txt
@Import(EnableWebMvcConfiguration.class)
```

3、我们点进EnableWebMvcConfiguration这个类看一下，它继承了一个父类：DelegatingWebMvcConfiguration

这个父类中有这样一段代码：

```java
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport { private final webMvcConfigureroComposite configurers  $=$  new webMvcConfigureroComposite(); //从容器中获取所有的webmvcConfigurer @Autowired(required  $=$  false) public void setConfigurers(List<WebMvcConfigurero> configurers）{ if(!collectionUTILs.isEmpty(configurers)){ this.configurers.addWebMvcConfigurers(configurers); } }   
10
```

4、我们可以在这个类中去寻找一个我们刚才设置的viewController当做参考，发现它调用了一个

```txt
protected void addViewControllers(ViewControllerRegistry registry) { this.configurers.addViewControllers(registry); }
```

5、我们点进去看一下

```javascript
public void addViewControllers(ViewControllerRegistry registry) { Iterator var2 = this delegation.iterator(); while(var2.hasNext()) { //将所有的WebMvcConfigurer相关配置来一起调用！包括我们自己配置的和Spring给我们配置的 webMvcConfigurer delegate = (webMvcConfigurer)var2.next(); delegate.addViewControllers(registry); }
```

所以得出结论：所有的WebMvcConfiguration都会被作用，不止Spring自己的配置类，我们自己的配置类当然也会被调用；

全面接管SpringMVC

官方文档：

```txt
1 If you want to take complete control of Spring MVC, you can add your own @Configuration annotated with @EnableWebMvc.
```

全面接管即：SpringBoot对SpringMVC的自动配置不需要了，所有都是我们自己去配置！

只需在我们的配置类中要加一个@EnableWebMvc。

我们看下如果我们全面接管了SpringMVC了，我们之前SpringBoot给我们配置的静态资源映射一定会无效，我们可以去测试一下；

不加注解之前，访问首页：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302334.jpg)

# 首页

给配置类加上注解： @EnableWebMvc

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302335.jpg)

# Whitelabel Error Page

This application has no explicit mapping for /error, so you are seeing this as a fallback.
我们发现所有的SpringMVC自动配置都失效了！回归到了最初的样子；

# 当然，我们开发中，不推荐使用全面接管SpringMVC

思考问题？为什么加了一个注解，自动配置就失效了！我们看下源码：

1、这里发现它是导入了一个类，我们可以继续进去看

```txt
1 @Import({DelegatingWebMvcConfiguration.class})  
2 public @interface EnableWebMvc {  
3 }
```

2、它继承了一个父类WebMvcConfigurationSupport

```txt
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport { // ... }
```

3、我们来回顾一下Web MVC自动配置类

```java
1 @ConfigurationproxyBeanMethods  $=$  false)   
2 @ConditionalOnWebApplication(type  $\equiv$  Type.SERVLET)   
3 @ConditionalonClass({Servlet.class，DispatcherServlet.class, webMvcConfigurer.class}）   
4 //这个注解的意思就是：容器中没有这个组件的时候，这个自动配置类才生效   
5 @ConditionalOnMissingBean(WebMvcConfigurationSupport.class)   
6 @AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE  $+10$  ）   
7 @AutoConfigureAfter({DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class, ValidationAutoConfiguration.class}）   
8 public class WebMvcAutoConfiguration{   
10 }
```

总结一句话：@EnableWebMvc将WebMvcConfigurationSupport组件导入进来了；

而导入的WebMvcConfigurationSupport只是SpringMVC最基本的功能！

在SpringBoot中会有非常多的扩展配置，只要看见了这个，我们就应该多留心注意~

# 配置项目环境及首页

把昨天的mybatis整合代码拿过来

# 1、导入依赖

```xml
1 <--lombok -->   
2 <dependency>   
3 <groupId>org.projectlombok</groupId>   
4 <artifactId>lombok</artifactId>   
5 </dependency>   
6 <--数据层-->   
7 <dependency>   
8 <groupId>org.mybatis.spring.boot</groupId>   
9 <artifactId>mybatis.spring-boot-starter</artifactId>   
10 <version>2.1.1</version>   
11 </dependency>   
12 <dependency>   
13 <groupId>mysqI</groupId>   
14 <artifactId>mysql-connector-java</artifactId>   
15 <scope>runtime</scope>   
16 </dependency>
```

# 2、导入实体类

```java
1 @Data   
2 public class Department {   
3 private Integer id;   
5 private String departmentName;   
6   
7 }
```

3、导入map接口以及对应的配置文件

```java
1 @Data   
2 public class Employee {   
3 private Integer id;   
5 private String lastName;   
6 private String email;   
7 //1 male, 0 female   
8 private Integer gender;   
9 private Integer department;   
10 private Date birth;   
11   
12 private Department eDepartment;   
13 }
```

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "/~/mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.kuang mapper.DepartmentMapper">  
    <select id="getDepartments" resultType="Department">  
        select * from department;  
    </select>  
    <select id="getDepartment" resultType="Department" parameterType="int">  
        select * from department where id = "#{id}";  
    </select>  
</mapper>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>   
<!DOCTYPE mapper   
PUBLIC"-//mybatis.org//DTD Mapper 3.0//EN"   
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">   
<mapper namespace  $\coloneqq$  "com.kuang mapper.EmployeeMapper">   
<resultMap id  $\coloneqq$  "EmployeeMap" type  $\coloneqq$  "Employee"> <id property  $\coloneqq$  "id" column  $\coloneqq$  "eid"/> <result property  $\coloneqq$  "lastname" column  $\coloneqq$  "lastname"/> <result property  $\coloneqq$  "email" column  $\coloneqq$  "email"/> <result property  $\coloneqq$  "gender" column  $\coloneqq$  "gender"/> <result property  $\coloneqq$  "birth" column  $\coloneqq$  "birth"/> <association property  $\coloneqq$  "eDepartment" javaType  $\coloneqq$  "Department"> <id property  $\coloneqq$  "id" column  $\coloneqq$  "did"/> <result property  $\coloneqq$  "departmentName" column  $\coloneqq$  "dname"/> </association>   
</resultMap>   
<select id  $\coloneqq$  "getEmployees" resultMap  $\coloneqq$  "EmployeeMap"> select e.id as Eid,last_name@email,gender,birth,d.id as did,d.departmentname as dname from department d.employee e where d.id  $=$  e.department
```

```txt
24 </select>   
25 <insert id="save" parameterType  $=$  "Employee"> insert into employee (last_name, email, gender, department, birth) values (#{lastname}, #{email}, #{gender}, #{department}, #{birth});   
29 </insert>   
30   
31 <select id  $=$  "get"��  $\equiv$  "Employee"> select \* from employee where id = #{id}   
32   
33 </select>   
34   
35 <delete id  $=$  "delete" parameterType  $=$  "int"> delete from employee where id  $=$  #{id}   
36   
37 </delete>   
38   
39 </mapper>
```

4、注意Maven资源导出问题！

```xml
1 <resources>   
2 <resource>   
3 <directory>src/main/java</directory>   
4 <includes>   
5 <include>**/*.xml</include>   
6 </includes>   
7 <filtering>true</filtering>   
8 </resource>   
9 </resources>
```

# 导入静态资源

1、css，js等放在static文件夹下  
2、html放在templates文件夹下

最终结构如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302336.jpg)

# 首页实现

方式一：写一个controller实现！

1 //会解析到templates目录下的index.htm页面  
2 @RequestMapping({"/", "/index.html"})  
3 public String index(){  
4 return "index";  
5}

方式二：自己编写MVC的扩展配置

1 @override  
2 public void addViewControllers(ViewControllerRegistry registry) {  
3 registry.addViewController("/").setTitle("index");  
registry.addViewController("/index.html").setTitle("index");  
5}

解决了首页问题，我们还需要解决一个资源导入的问题；

为了保证资源导入稳定，我们建议在所有资源导入时候使用 th:去替换原有的资源路径！这也是模板规范

1 <htm1 lang="en" xmlns:th="http://www.thymeleaf.org">  
2 <link th:href="\/asserts/css/bootstrap.min.css" rel="stylesheet">

ok，如果都替换完成了，我们的准备工作也就全部结束了！

# 页面国际化

有的时候，我们的网站会去涉及中英文甚至多语言的切换，这时候我们就需要学习国际化了！

准备工作

先在IDEA中统一设置properties的编码问题！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302337.jpg)

编写国际化配置文件，抽取页面需要显示的国际化页面消息。我们可以去登录页面查看一下，哪些内容我们需要编写国际化的配置！

# 配置文件编写

1、我们在resources资源文件下新建一个i18n目录，存放国际化配置文件  
2、建立一个login.properties文件，还有一个login_zh_CN.properties；发现IDEA自动识别了我们要做国际化操作；文件夹变了！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302338.jpg)

3、我们可以在这上面去新建一个文件；

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302339.jpg)

弹出如下页面：我们再添加一个英文的；

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302340.jpg)

这样就快捷多了！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302341.jpg)

4、接下来，我们就来编写配置，我们可以看到idea下面有另外一个视图；

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302342.jpg)

这个视图我们点击 + 号就可以直接添加属性了；我们新建一个logintips，可以看到边上有三个文件框可以输入

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302343.jpg)

我们添加一下首页的内容！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302344.jpg)

然后依次添加其他页面内容即可！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302345.jpg)

然后去查看我们的配置文件；

login.properties：默认

1 login.btn=登录  
2 login.password=密码  
3 loginremember=记住我  
4 logintips=请登录  
5 login username  $\equiv$  用户名

# 英文：

1 login.btn=Sign in  
2 login.password=Password  
3 loginremember=Remember me  
4 logintips  $\equiv$  Please sign in  
5 login username  $\equiv$ Username

# 中文：

1 login.btn=登录  
2 login.password=密码  
3 loginremember=记住我  
4 login-tip=请登录  
5 login username=用户名

OK，配置文件步骤搞定！

配置文件生效探究

我们去看一下SpringBoot对国际化的自动配置！这里又涉及到一个类：

MessageSourceAutoConfiguration

里面有一个方法，这里发现SpringBoot已经自动配置好了管理我们国际化资源文件的组件ResourceBundleMessageSource;

```java
// 获取 properties 传递过来的值进行判断  
@Bean  
public MessageSource messageSource(MessageSourceProperties properties) {ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource(); if (StringArgs.hasText.properties.getBasename()) { // 设置国际化文件的基础名（去掉语言国家代码的）messageSource.setBasenames(StringArgs commaDelimitedListToStringArray()  
StringArgs trimAllWhitespace.properties.getBasename()));  
}  
if (properties.getEncoding() != null) {messageSource.setDefaultEncoding.properties.getEncoding().name());  
}  
messageSource.setFallbackToSystemLocale.properties.isFallbackToSystemLocale();  
Duration cacheDuration = properties.getCacheDuration();  
if (cacheDuration != null) {
```

```java
17 messageSource.setCacheMillis(cacheDuration.toMillis());   
18 }   
19 messageSource.setAlwaysUseMessageFormat.properties.isAlwaysUseMessageFormat();   
20 messageSource.setUseCodeAsDefaultMessage.properties.isUseCodeAsDefaultMessa ge());   
21 return messageSource;   
22 }
```

我们真实的情况是放在了i18n目录下，所以我们要去配置这个messages的路径；

1 spring/messages.baselname=i18n/login

# 配置页面国际化值

去页面获取国际化的值，查看Thymeleaf的文档，找到message取值操作为：# {...}。我们去页面测试下：

IDEA还有提示，非常智能的！

```txt
<body class="text-center">
    <form class="form-signin" action="dashboard.html">
        <img class="mb-4" th:src="@{/asserts/img/boot strap-solid.svg}" alt="width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal" th:text="#{login-tip}">Please sign in</h1>
        <label class="sr-only">Username</label>
        <input type="text" class="form-control" th:placeholder="#{login username}" required=" autofocus=">
            <label class="sr-only">Password</label>
        <input type="password" class="form-control" th:placeholder="#{login.password}" required="">
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" th:text="#{loginremember}">
            </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" th:text="#{login.btn}">Sign in</button>
            <p class="mt-5 mb-3 text-muted" @ 2017-2018</p>
            <a class="btn btn-sm">中文</a>
            <a class="btn btn-sm">English</a>
        </body class="text-center">
    </body class="text-center">
        <image class="mb-4" th:src="@{/asserts/img/boot strap-solid.svg}" alt="width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal" th:text="#{login-tip}">Please sign in</h1>
        <label class="sr-only">Username</label>
        <input type="text" class="form-control" th:placeholder="#{login username}" required=" autofocus=">
            </label>
        <input type="password" class="form-control" th:placeholder、“#{login.password}" required="">
            <div class="checkbox mb-3">
                <label>
                    <input type="password" value="remember-me" th:text、“#{loginremember}">
            </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" th:text、“#{login.btn}">Sign in</button>
            <p class="mt-5 mb-3 text-muted" @ 2017-2018</p>
            <a class="btn btn-sm">中文</a>
            <a class="btn btn-sm">English</a>
        </body class="text-center">
    </body class="text-center">
        <image class="mb-4" th:src="@{/ assertions/img/boot strap-solid.svg}" alt="width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal" th:text、“#{login-tip}">Please sign in</h1>
        <label class="sr-only">Username</label>
        <input type="text" class="form-control" th:placeholder、“#{login username}" required=" autofocus=">
            <label class="sr-only">Password</label>
        <input type="password" class="form-control" th:placeholder、“#{login username}" required=" autofocus="
            <div class="checkbox mb-3">
                <div class="checkbox" value="remember-me" th:text、“#{loginRemember}">Input a value of 1 or more.
                <p class="mt-5 mb-3 text-muted" @ 2017-2018</p>
                <a class="btn btn-sm">中文</a>
                <a class="btn btn-sm">English</a>
            </div>
            <image class="mb-4" th:src="@{/ assertions/img/boot strap-solid.svg}" alt="width="72" height="72">
                <h1 class="h3 mb-3 font-weight-normal" th:text、“#{login-tip}">Please sign in</h1>
            <label class="sr-only">Username</label>
            <input type="text" class="form-control" th:placeholder、“#{login username}" required=" autofocus="
                <div class="checkbox mb-3"><p class="mt-5 mb-3 text-muted" @ 2017-2018</p>
                <div class="btn btn-sm">中文</a>
                <div class="btn btn-sm">English</a>
            </div>
            <image class="mb-4" th:src="@{/ assertions/img/boot strap-solid.svg}" alt="width="72" height="72">
                <h1 class="h3 mb-3 font-weight-normal" th:text、“#{login-tip}">Please sign in</h1>
            <label class="sr-only">Username</label>
            <input type="text"class="form-control" th:placeholder、“#{login-tip}">Input a value of 1 or more.
                <p class="mt-5 mb-3 text-muted" @ 2017-2018</p>
                <div class="btn btn-sm">中文</a>
                <div class="btn btn-sm">English</a>
            </div>
            <image class="mb-4" th:src="@{/ assertions/img/boot strap-solid.svg}" alt="width="72" height="72">
                <h1 class= "h3 mb-3 font-weight-normal" th:text = "#{login-tip}">Please sign in</h1>
            <label class= "sr-only">Username</label>
            <input type=“bttn”class= "bttn-sm" th= "submit" th= "submit"/> 
            <p class= "mt-5 mb-3 text-muted" @ 2017-2018</p>
            <div class= "bttn sm">中文</a>
            <div class= "bttn sm">English</a>
```

我们可以去启动项目，访问一下，发现已经自动识别为中文的了！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302346.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302347.jpg)

# 请登录

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302348.jpg)

© 2017-2018

中文 English

# 但是我们想要更好！可以根据按钮自动切换中文英文！

# 配置国际化解析

在Spring中有一个国际化的 Locale（区域信息对象）；里面有一个叫做 LocaleResolver（获取区域信息对象）的解析器！

我们去我们web MVC自动配置文件，寻找一下！看到Spring Boot默认配置：

```java
1     @Bean
2     @ConditionalOnMissingBean
3     @ConditionalOnProperty(prefix = "spring.mvc", name = "locale")
4     public LocaleResolver localeResolver()
5     // 容器中没有就自己配，有的话就用用户配置的
6     if (this.mvcProperties.getLocaleResolver() == 
7         WebMVCProperties LocaleResolverFIXED) {
8         return new FixedLocaleResolver(this.mvcProperties.getLocale());
9         }
10         AcceptHeaderLocaleResolver localeResolver = new 
11         AcceptHeaderLocaleResolver();
12         localeResolver.setDefaultLocale(this.mvcProperties.getLocale());
13         return localeResolver;
}
```

# AcceptHeaderLocaleResolver 这个类中有一个方法

```java
public Locale resolveLocale(HttpServletRequest request) {
    Locale defaultLocale = this.getDefaultsLocale();
} // 默认的就是根据请求头带来的区域信息获取 Locale 进行国际化
```

```javascript
4 if (defaultLocale != null && request.getHeader("Accept-Language") == null) { return defaultLocale; } else { Locale requestLocale = request.getLocale(); List<Locale> supportedLocales = this.getSupportedLocales(); if (!supportedLocales.isEmpty() && !supportedLocales.contains(requestLocale)) { Locale supportedLocale = this.findSupportedLocale(request, supportedLocales); if (supportedLocale != null) { return supportedLocale; } else { return defaultLocale != null ? defaultLocale : requestLocale; } } else { return requestLocale; } }
```

那假如我们现在想点击链接让我们的国际化资源生效，就需要让我们自己的Locale生效！

我们去自己写一个自己的 LocaleResolver，可以在链接上携带区域信息！

修改一下前端页面的跳转连接：

```html
1 <-- 这里传入参数不需要使用？ 使用（key=value）-->  
2 <a class="btn btn-sm" th:href="_{/index.htm[1='zh_CN')}">中文</a>  
3 <a class="btn btn-sm" th:href="_{/index.htm[1='en_US')}">English</a>
```

我们去写一个处理的组件类！

```java
package com.kuang/component;   
import org.springframework.util.StringUtils;   
import org.springframework.webServletLOCaleResolver;   
import javax.servlet.http(HttpRequest;   
import javax.servlet.http HttpServletResponse;   
import java.util.Locale;   
//可以在链接上携带区域信息   
public class MyLocaleResolver implements LocaleResolver {   
//解析请求   
@override   
public Locale resolveLocale(HttpServletRequest request) {   
String language  $=$  request.getParameter("l");   
Locale locale  $=$  Locale.getDefault(); //如果没有获取到就使用系统默认的   
//如果请求链接不为空   
if (!StringUtilities.isEmpty language)){   
//分割请求参数   
string[] split  $=$  language.split("\\");   
//国家，地区   
locale  $=$  new Locale(split[0],split[1]);
```

```java
25 } return locale;   
26   
27 1   
28   
29 @Override   
30 public void setLocale(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Locale locale) {   
31   
32 }   
33 }
```

为了让我们的区域化信息能够生效，我们需要再配置一下这个组件！在我们自己的MvcConofig下添加bean;

```txt
1 @Bean
2 public LocaleResolver localeResolver(){
3 return new MyLocaleResolver();
```

我们重启项目，来访问一下，发现点击按钮可以实现成功切换！搞定收工！

# 登录+拦截器

禁用模板缓存

说明：页面存在缓存，所以我们需要禁用模板引擎的缓存

1 #禁用模板缓存  
2 spring.thymeleaf.cache=false

模板引擎修改后，想要实时生效！页面修改完毕后，IDEA小技巧：Ctrl + F9 重新编译！即可生效！

# 登录

我们这里就先不连接数据库了，输入任意用户名都可以登录成功！

1、我们把登录页面的表单提交地址写一个controller！

```txt
1 <form class="form-signin" th:action="@{/user/login}" method="post">
2 //这里面的所有表单标签都需要加上一个name属性
3 </form>
4 </form>
```

2、去编写对应的controller

```java
1 @Controller   
2 public class LoginController {   
3   
4 //@RequestMapping(value  $=$  "/user/login",method  $\equiv$  RequestMethod.POST)   
5 @PostMapping("/user/login")   
6 public String login(@RequestParam("username") String username,   
7 @RequestParam("password") String password,   
8 Model model,HttpSession session){
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302349.jpg)

# OK，测试登录成功！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302350.jpg)

# 3、登录失败的话，我们需要将后台信息输出到前台，可以在首页标题下面加上判断！

```txt
1 <!--判断是否显示，使用if，{}可以使用工具类，可以看thymeleaf的中文文档--->  
2 <p style="color: red" th:text="{$msg}" th:if="/${not #strings.isEmpty(msg)}"> </p>
```

重启登录失败测试：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302351.jpg)

# 请登录

用户名密码错误

用户名

密码

优化，登录成功后，由于是转发，链接不变，我们可以重定向到首页！

4、我们再添加一个视图控制映射，在我们的自己的MyMvcConfig中：

```javascript
1 registry.addViewController("/main.html").setTitle("dashboard");
```

5、将 Controller 的代码改为重定向；

```javascript
1 //登录成功！防止表单重复提交，我们重定向  
2 return "redirect:/main.html";
```

重启测试，重定向成功！后台主页正常显示！

登录拦截器

但是又发现新的问题，我们可以直接登录到后台主页，不用登录也可以实现！怎么处理这个问题呢？我们可以使用拦截器机制，实现登录检查！

1、我们先自定义一个拦截器：

```java
public class LoginHandlerInterceptor implements HandlerInterceptor { @override public boolean preHandle(HttpServletRequest request,HttpServletResponse response，object handler) throws Exception { //获取loginUser信息进行判断 Objectuser  $\equiv$  request.getSession().getAttribute("loginUser"); if (user  $= =$  null){//未登录，返回登录页面 request.setAttribute("msg","没有权限，请先登录"); request.getRequestDispatcher("/index.html").forward(request,response); return false; }else{ //登录，放行 return true; 1   
14
```

2、然后将拦截器注册到我们的SpringMVC配置类当中！

```txt
1 @override   
2 public void addInterceptors(InterceptorRegistry registry) {   
3 //注册拦截器，及拦截请求和要剔除哪些请求！   
4 //我们还需要过滤静态资源文件，否则样式显示不出来   
5 registry.addInterceptor(new 登机HandlerInterceptor())   
6 .addPathPatterns("/**")   
7 .excludePathPatterns("/index.html","/","/user/login","/asserts/**");   
8 }
```

3、我们然后在后台主页，获取用户登录的信息

```json
1 <!--后台主页显示登录用户的信息-->  
2 [[\${sessionloginUser}]]
```

然后我们登录测试拦截！完美！

# 员工列表实现

RestFul风格

要求：我们需要使用Restful风格实现我们的crud操作！

<table><tr><td></td><td>普通CRUD (uri来区分操作)</td><td>RestfulCRUD</td></tr><tr><td>查询</td><td>getEmp</td><td>emp--GET</td></tr><tr><td>添加</td><td>addEmp?xxx</td><td>emp--POST</td></tr><tr><td>修改</td><td>updateEmp?id=xxx&amp;xxx=xx</td><td>emp/{id}-PUT</td></tr><tr><td>删除</td><td>deleteEmp?id=1</td><td>emp/{id}-DELETE</td></tr></table>

看看一些具体的要求，就是我们小实验的架构；

<table><tr><td>实验功能</td><td>请求URI</td><td>请求方式</td></tr><tr><td>查询所有员工</td><td>emps</td><td>GET</td></tr><tr><td>查询某个员工(来到修改页面)</td><td>emp/1</td><td>GET</td></tr><tr><td>来到添加页面</td><td>emp</td><td>GET</td></tr><tr><td>添加员工</td><td>emp</td><td>POST</td></tr><tr><td>来到修改页面(查出员工进行信息回显)</td><td>emp/1</td><td>GET</td></tr><tr><td>修改员工</td><td>emp</td><td>PUT</td></tr><tr><td>删除员工</td><td>emp/1</td><td>DELETE</td></tr></table>

我们根据这些要求，来完成第一个功能，就是我们的员工列表功能！

员工列表页面跳转

我们在主页点击Customers，就显示列表页面；我们去修改下

1、将首页的侧边栏Customers改为员工管理  
2、a链接添加请求

1 <a class="nav-link" th:href="@{/emps}">员工管理</a>

3、将list放在emp文件夹下

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302352.jpg)

4、编写处理请求的controller

```java
1 @Controller   
2 public class EmployeeController {   
3 @Autowired   
5 EmployeeMapper employeeMapper;   
6   
7 //查询所有员工，返回列表页面   
8 @GetMapping("/emps")
```

```java
9 public String list (Model model) {  
10 List < Employee> employees = employeeMapper.getEmployees();  
11 //将结果放在请求中  
12 model.addAttribute("emps", employees);  
13 return "emp/list";  
14 }  
15  
16 }
```

我们启动项目，测试一下看是否能够跳转，测试OK！我们只需要将数据渲染进去即可！

但是发现了一个问题，侧边栏和顶部都相同，我们是不是应该将它抽取出来呢？

Thymeleaf 公共页面元素抽取

# 步骤：

1、抽取公共片段 th:fragment 定义模板名  
2、引入公共片段 th:insert 插入模板名

# 实现：

1、我们来抽取一下，使用list列表做演示！我们要抽取头部nav标签，我们在dashboard中将nav部分定义一个模板名；

```txt
<!-- 定义th:fragment="topbar" -->
<nav th:fragment="topbar" class="navbar navbar-dark sticky-top bg-dark">
    <!--后台主页显示登录用户的信息-->
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        [[${session.logoutUser}]]
    </a>
    <input class="form-control form-control-dark w-100" type="text">
        placeholder="search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a class="nav-link" href="#">Sign out</a>
            </li>
        </ul>
</nav>
```

2、然后我们在list页面中去引入，可以删掉原来的nav

```txt
1 <--引入抽取的topbar--->  
2 <--模板名：会使用thymeleaf的前后缀配置规则进行解析  
3 使用~{模板::标签名}--->  
4 <div th:insert="~{dashboard::topbar}"></div>
```

3、启动再次测试，可以看到已经成功加载过来了！

# 说明：

除了使用insert插入，还可以使用replace替换，或者include包含，三种方式会有一些小区别，可以见名知义；

我们使用replace替换，可以解决div多余的问题，可以查看thymeleaf的文档学习

侧边栏也是同理，当做练手，可以也同步一下！

# 定义模板：

```html
1 <nav th:fragment="sitebar" class="col-md-2 d-none d-md-block bg-light sidebar">
```

然后我们在list页面中去引入：

```txt
1 <div th:insert="~{dashboard::sitebar}"></div>
```

启动再试试，看效果！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302353.jpg)

我们发现一个小问题，侧边栏激活的问题，它总是激活第一个；按理来说，这应该是动态的才对！

为了重用更清晰，我们建立一个commons文件夹，专门存放公共页面；

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302354.jpg)

我们去页面中引入一下

```txt
1 <div th:replace  $\equiv$  "  $\sim$  {commons/bar::topbar}"></div>   
2 <div th:replace  $\equiv$  "  $\sim$  {commons/bar::sitebar}"></div>
```

我们先测试一下，保证所有的页面没有出问题！ok！

# 侧边栏激活问题：

1、将首页的超链接地址改到项目中  
2、我们在a标签中加一个判断，使用class改变标签的值；

```html
1 <a class="nav-link active" th:class  $=$  "${\activeUrl  $= =$  'main.html'?'nav-link active':'nav-link'"} th:href  $= =$  "@{/main.htm1}"> 首页   
5 </a>   
6   
7 <a class  $=$  "nav-link" th:class  $= =$  "${\activeUrl  $= =$  'emps'?'nav-link active':'nav-link'"} th:href  $= =$  "@{/emps}">员工管理   
10 </a>
```

# 3、修改请求链接

```txt
1 <div th:replace  $\equiv$  "  $\sim$  {commons/bar::sitebar(activeurl  $\equiv$  'main.html')}\>}></div>   
2 <div th:replace  $\equiv$  "  $\sim$  {commons/bar::sitebar(activeurl  $\equiv$  'emps')}\>}></div>
```

4、我们刷新页面，去测试一下，OK，动态激活搞定！

# 员工信息页面展示

现在我们来遍历我们的员工信息！顺便美化一些页面，增加添加，修改，删除的按钮！

```txt
main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
2 <!--添加员工按钮-->
3 <!--添加员工按钮-->
4 <!--添加员工按钮-->
5 <!--添加员工按钮-->
6 <!--添加员工按钮-->
7 <!--添加员工按钮-->
8 <!--添加员工按钮-->
9 <!--添加员工按钮-->
10 <!--添加员工按钮-->
11 <!--添加员工按钮-->
12 <!--添加员工按钮-->
13 <!--添加员工按钮-->
14 <!--添加员工按钮-->
15 <!--添加员工按钮-->
16 <!--添加员工按钮-->
17 <!--添加员工按钮-->
18 <!--添加员工按钮-->
19 <!--添加员工按钮-->
20 <!--添加员工按钮-->
21 <!--添加员工按钮-->
22 <!--添加员工按钮-->
23 <!--添加员工按钮-->
24 <!--添加员工按钮-->
25 <!--添加员工按钮-->
26 <!--添加员工按钮-->
27 <!--添加员工按钮-->
HH:mm")>}></td>
28 <!--操作-->
29 <!--操作-->
30 <!--操作-->
31 <!--操作-->
32 <!--操作-->
33 <!--操作-->
34 <!--操作-->
35 <!--操作-->
36 <!--操作-->
37 <!--操作-->
38 <!--操作-->
```

OK，显示全部员工OK！

<table><tr><td>id</td><td>lastname</td><td>email</td><td>gender</td><td>department</td><td>birth</td><td colspan="2">操作</td></tr><tr><td>1001</td><td>张三</td><td>24736743@qq.com</td><td>男</td><td>技术部</td><td>2020-03-06 08:00</td><td>编辑</td><td>删除</td></tr><tr><td>1002</td><td>李四</td><td>24736743@qq.com</td><td>男</td><td>销售部</td><td>2020-03-06 08:00</td><td>编辑</td><td>删除</td></tr><tr><td>1003</td><td>王五</td><td>24736743@qq.com</td><td>女</td><td>售后部</td><td>2020-03-06 08:00</td><td>编辑</td><td>删除</td></tr><tr><td>1004</td><td>赵六</td><td>24736743@qq.com</td><td>男</td><td>后勤部</td><td>2020-03-06 08:00</td><td>编辑</td><td>删除</td></tr><tr><td>1005</td><td>孙七</td><td>24736743@qq.com</td><td>女</td><td>运营部</td><td>2020-03-06 08:00</td><td>编辑</td><td>删除</td></tr></table>

# 添加员工实现

表单及细节优化

# 1、将添加员工信息改为超链接

添加员工

```txt
1 <--添加员工按钮--->   
2 <h2>   
3 <a class  $=$  "btn btn-sm btn-success" href  $\equiv$  "emp" th:href  $\equiv$  "@{\{emp\}"}>添加员工   
</a>   
4 </h2>
```

# 2、编写对应的controller

```java
1 //to员工添加页面  
2 @GetMapping("/emp")  
3 public String toAddPage(){  
4 return "emp/add";  
5 }
```

# 3、添加前端页面；复制list页面，修改即可

bootstrap官网文档：https://v4.bootcss.com/docs/4.0/components/forms/

我们去可以里面找自己喜欢的样式！我这里给大家提供了编辑好的：

```txt
<form>
    <div class="form-group">
        <label>LastName</label>
    <input type="text" class="form-control" placeholder="kuangshen">
        </div>
    <div class="form-group">
        <label>Email</label>
    <input type="email" class="form-control"
    placeholder="24736743@qq.com">
        </div>
    <div class="form-group">
        <label>Gender</label><br />
    <div class="form-check form-check-online">
        <input class="form-check-input" type="radio" name="gender"
        value="1">
            <label class="form-check-label">男</label>
        </div>
    <div class="form-check form-check-online">
        <input class="form-check-form-check-online"
        </div>
    </div class="form-check-form-check-online">
</form>
```

```html
17 <input class="form-check-input" type="radio" name="gender" value="0">   
18 <label class="form-check-label">女</label>   
19 </div>   
20 </div>   
21 <div class="form-group"> <label>department</label>   
22 <select class="form-control"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option>   
23 </select>   
24   
25   
26   
27   
28   
29   
30 </div>   
31 <div class="form-group"> <label>Birth</label> <input type="text" class="form-control" placeholder="kuangstudy">   
32   
33   
34   
35 <button type="submit" class="btn btn-primary">添加</button>   
36 </form>
```

4、部门信息下拉框应该选择的是我们提供的数据，所以我们要修改一下前端和后端

Controller

```java
1 @Autowired   
2 DepartmentMapper departmentMapper;   
3   
4 //to员工添加页面   
5 @GetMapping("/emp")   
6 public String toAddPage(Model model){   
7 //查出所有的部门，提供选择   
8 List<Department> departments = departmentMapper.getDepartments();   
9 model.addAttribute("departments",departments);   
10 return "emp/add";   
11 }
```

前端

```txt
1 <div class="form-group">   
2 <label>department</label>   
3 <!--提交的是部门的ID-->   
4 <select class="form-control">   
5 <option th:each="dept:\$\{departments\}"   
6 th:text="\$\{dept.department)\}" th:value="\ ${dept.id}$ "  $>1$  </option>   
7 </div>
```

OK，修改了controller，重启项目测试！

完整增加员工功能，我们来具体实现添加功能；

1、修改add页面form表单提交地址和方式

1 <form th:action  $\equiv$  "@{\/emp}" method  $\equiv$  "post">

2、编写controller;

```txt
//员工添加功能，使用post接收
@PostMapping("/emp")
public String addEmp(){
//回到员工列表页面，可以使用redirect或者forward，就不会被视图解析器解析
return "redirect:/emps";
}
```

回忆：重定向和转发以及/的问题？

原理探究：ThymeleafViewResolver

```groovy
public static final String REDIRECT_URL_PREFIX = "redirect:";   
public static final String FORWARD_URL_PREFIX = "forward:";   
protected View createView(String viewName, Locale locale) throws Exception { // 简单分析下源码   
}
```

OK，看完源码，我们继续编写代码！

3、我们要接收前端传过来的属性，将它封装成为对象！首先需要将前端页面空间的name属性编写完毕！【操作】  
4、编写controller接收调试打印【操作】

```java
1 //员工添加功能  
2 //接收前端传递的参数，自动封装成为对象[要求前端传递的参数名，和属性名一致]  
3 @PostMapping("/emp")  
4 public String addEmp( Employee employee) {  
5 System.out.println( employee);  
6 employeeDao.save( employee); //保存员工信息  
7 //回到员工列表页面，可以使用redirect或者forward  
8 return "redirect:/emps";  
9 }
```

启动测试，前端填写数据，注意时间问题：

名称

kuangshen

Email

24736743@qq.com

Gender

$\odot$  男

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302355.jpg)

department

D-AA

Birth

2019/1/1

# 添加

点击提交，后台输出正常！页面跳转及数据显示正常！OK！

那我们将时间换一个格式提交

Birth

2019-1-1

提交发现页面出现了400错误！

# Whitelabel Error Page

This application has no explicit mapping for /error, so you are seeing this as a fallback.

Fri Aug 09 22:41:55 CST 2019

There was an unexpected error (type  $=$  Bad Request, status  $= 400$

Validation failed for object='employee'. Error count: 1

400就是请求参数错误

生日我们提交的是一个日期，我们第一次使用的/正常提交成功了，后面使用-就错误了，所以这里面应该存在一个日期格式化的问题；

SpringMVC会将页面提交的值转换为指定的类型，默认日期是按照/的方式提交；比如将2019/01/01转换为一个date对象。

那思考一个问题？我们能不能修改这个默认的格式呢？

我们去看web MVC的自动配置文件；找到一个日期格式化的方法，我们可以看一下

```java
1 @Bean
2 public FormattingConversionService mvcConversionService() {
3     webConversionService conversionService = new
4         webConversionService(this.mvcProperties.getDateFormat());
5         this.addFormatters(conversionService);
6         return conversionService;
7 }
```

调用了getDateFormat方法；

```java
public string getDateFormat() { return this.dateFormat; }
```

这个在配置类中，所以我们可以自定义的去修改这个时间格式化问题，我们在我们的配置文件中修改一下；

```txt
1 spring.mvc.date-format  $=$  yyyy-MM-dd
```

这样的话，我们现在就支持-的格式了，但是又不支持/了，2333吧

测试OK！

# 员工信息修改

# 逻辑分析：

我们要实现员工修改功能，需要实现两步；

1、点击修改按钮，去到编辑页面，我们可以直接使用添加员工的页面实现  
2、显示原数据，修改完毕后跳回列表页面！

实现

1、我们去实现一下，首先修改跳转链接的位置；

```html
1 <a class="btn btn-sm btn-primary" th:href="_@{/emp}/+${emp.id}">编辑</a>
```

2、编写对应的controller

```java
1 //to员工修改页面   
2 @GetMapping("/emp/{id}")   
3 public String toUpdateEmp(@PathVariable("id") Integer id,Model model){   
4 //根据id查出来员工   
5 Employee employee = employeeMapper.get(id);   
6 System.out.println.employee);   
7 //将员工信息返回页面   
8 model.addAttribute("emp",employee);   
9 //查出所有的部门，提供修改选择   
10 List<Department> departments = departmentMapper.getDepartments();   
11 model.addAttribute("departments",departments);   
12   
13 return "emp/update";   
14 }
```

3、我们需要在这里将add页面复制一份，改为update页面；需要修改页面，将我们后台查询数据回显

```txt
<form th:action {@{/emp}" method="post">
    <div class="form-group">
        <label>LastName</label>
        <input name="lastname" type="text" class="form-control"
    th:value="/{$emp_lastname}"/>
    </div>
    <div class="form-group">
        <label>Email</label>
        <input name="email" type="email" class="form-control"
    th:value="/{$emp@email}"/>
    </div>
    <div class="form-group">
        <label>Gender</label></br>
        <div class="form-check form-check在线line">
            <input class="form-check-input" type="radio" name="gender"
        </input class="form-check-input" type="radio" name="gender"
    th:checked="#{$emp.gender==1}">
        <label class="form-check-label">男</label>
    </div>
    <div class="form-check form-check在线line">
        <input class="form-check-input" type="radio" name="gender"
    th:checked="#{$emp.gender==0}">
        <label class="form-check-label">女</label>
    </div>
    </div>
    <div class="form-group">
        <label department</label>
    <!--提交的是部门的ID-->
    <select class="form-control" name="department">
        <option th:selected="#{$dept.id == emp.department}]"
    th:each="dept:$departments"]
    th:text="#{$dept.department]} th:value="#{$dept.id}")>1
    </option>
    </select>
    </div>
    <div class="form-group">
        <label>Birth</label>
    <input name="birth" type="text" class="form-control"
    th:value="#{$emp.birth}"/>
    </div>
    <button type="submit" class="btn bgnt-primary" href="/button">
        </form>
    </div>
</form>
```

测试OK！

发现我们的日期显示不完美，可以使用日期工具，进行日期的格式化！

```html
1 <input name="birth" type="text" class="form-control" th:value  $=$  "${\#dates.format(emp.birth,'yyyy-MM-dd HH:mm')}"
```

数据回显OK，我们继续完成数据修改问题！

4、修改表单提交的地址：

```txt
1 <form th:action  $\equiv$  "@{\updateEmp}" method  $\equiv$  "post">
```

# 5、编写对应的controller

```java
1 @PostMapping("/updateEmp")   
2 public String updateEmp(Employee employee){ employeeMapper.update.employee);   
3 //回到员工列表页面   
4 return "redirect:/emps";   
5 }
```

# 6、编写Mapper接口及对应的xml文件

```javascript
1 //修改员工信息  
2 int update( Employee employee);
```

```txt
1 <update id="update" parameterType="Employee">   
2 update employee   
3 set last_name  $=$  #{lastname},email  $=$  #{email},gender  $=$  #{gender},department  $\equiv$  # {department},birth  $=$  #{birth}   
4 where id  $=$  #{id} ;   
5 </update>
```

编写完毕后，启动测试！

问题：发现页面提交的没有id；我们在前端加一个隐藏域，提交id；

```html
1 <input name="id" type="hidden" class="form-control" th:value="${emp.id}">
```

重启，修改信息测试OK！

# 删除员工实现

# 1、list页面，编写提交地址

```txt
1 <a class="btn btn-sm btn-danger" th:href="_{}/deIEmp/}{\$\{emp.id\}">删除</a>
```

# 2、编写Controller

```java
1 @GetMapping("/delEmp/{id}")   
2 public string delEmp(@PathVariable("id") Integer id){   
3 employeeMapper.delete(id);   
4 return "redirect:/emps";   
5 }
```

测试OK！

# 404及注销

404

我们只需要在模板目录下添加一个error文件夹，文件夹中存放我们相应的错误页面；

比如404.html或者4xx.html等等，SpringBoot就会帮我们自动使用了！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302356.jpg)

测试使用！

注销

# 1、注销请求

```txt
1 <a class="nav-link" href="#">th:href="@@{/user/loginOut}">Sign out</a>
```

# 2、对应的controller

```java
1 @GetMapping("/user/loginOut")   
2 public String loginOut(HttpSession session){ session invalidate(); return "redirect:/index.html";   
5 }
```

相信大家学到这里，SpringBoot的单体应用开发基本就没有问题了！

但是还是那句话，学会技术只是浅层次的东西，要消化理解我的思想方法，这才是最有价值的点！

# 定制错误数据

SpringBoot默认的错误处理机制

# 1、浏览器访问的默认的错误处理效果：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302357.jpg)

# Whitelabel Error Page

This application has no explicit mapping for /error, so you are seeing this as a fallback.

```txt
Sun Mar 08 18:51:28 CST 2020  
There was an unexpected error (type=Not Found, status=404).  
No message available
```

# 2、如果是其他客户端，默认响应一个 json 数据；

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153302358.jpg)

# 错误处理原理分析

我们看到自动配置类：ErrorMvcAutoConfiguration 错误处理的自动配置类；

这里面注入了几个很重要的bean;

1、DefaultErrorAttributes  
2、BasicErrorController  
3、ErrorCodeCustomizer  
4、DefaultErrorViewResolver

# 错误处理步骤：

一旦系统出现了 4xx 或者 5xx 之类的错误，ErrorPageCustomizer 就会生效（定制错误的响应规则）

```txt
1 @Bean
2 public ErrorPageCustomizer errorPageCustomizerINEServletPath dispatcherServletPath) {
3 //点进这个类
4 return new ErrorPageCustomizer(this.serverProperties,
5 dispatcherServletPath);
}
```

发现一个方法 registerErrorPages 注册错误页面

```java
1 @override
2 public void registerErrorPages(ErrorPageRegistry errorPageRegistry) {
3     ErrorPage errorPage = new ErrorPage(
         // 这里有个 getPath() 路径，我们点进去
         this dispatcherServletPath.getRelativePath(this.properties.getError().getPath());
8     errorPageRegistry.addErrorPages(errorPage);
7 } // getPath
6     public String getPath() {
11     return this.path;
12 } // this.path;
15 @value("{}{error.path:/error}") 
16 private String path = "/error";
```

系统一旦出现错误之后就会来到 /error 请求进行处理；这个请求会被 BasicErrorController 处理：

这个类有两个方法：

```txt
1 @Controller   
2 // 处理默认的 /error 请求   
3 @RequestMapping("/${server(error.path}:${error.path:/error}}")   
4 public class BasicErrorController extends AbstractErrorController {   
5 }   
6 }
```

我们来看看resolveErrorView这个方法：

```java
//产生html类型的数据，浏览器发送的请求会被这个方法处理   
2 @RequestMappingproduces  $\equiv$  MediaType.TXT_html_VALUE)   
3 public ModelAndView errorHtm1(HttpRequest request, HttpServletResponse response）{   
4 HttpStatus status  $\equiv$  getStatus(request);   
5 Map<String,object> model  $=$  collections .unmodifiableMap(getErrorAttributes(request, isIncludeStackTrace(request,mediaType.TXT_html)))；   
7 response的状态(status.value());   
8 // 去哪个页面拿错误页面呢？resolveErrorView 方法   
9 ModelAndView modelAndview  $\equiv$  resolveErrorView(request，response，status, model); return (modelAndView != null)? modelAndView : new ModelAndView("error", model);   
10 }   
11   
12   
13 //返回json 类型的数据，其他的客户端请求会被这个方法处理   
14 @RequestMapping   
15 public ResponseEntity<Map<String, object>> error(HttpServletRequest request) {   
16 HttpStatus status  $\equiv$  getStatus(request); if(status  $= =$  HttpStatus.NO_CONTENT){ return new ResponseEntity<> (status); 19 }   
20 Map<String,object> body  $\equiv$  getErrorAttributes(request, isIncludeStackTrace(request,mediaType.ALL)); return new ResponseEntity<> (body，status);   
22 }
```

```txt
protected ModelAndView resolverErrorView(HttpServletRequest request, HttpServletResponse response, HttpStatus status, Map<String, object> model) { //拿到所有的 errorViewResolver 错误视图解析器 for(ErrorViewResolver resolver : this errorViewResolver) { ModelAndView modelAndView = resolver resolverErrorView(request, status, model); if (modelAndView != null) { return modelAndView; } } return null; }
```

我们在之前看到有这样一个bean DefaultErrorViewResolver 默认的错误视图解析器：

```java
public class DefaultErrorViewResolver implements ErrorViewResolver, Ordered { private static final Map<String> SERIES_VIEWS; static { Map<String> views = new HashMap<> (Series.class); views.put(Series CLIENT_ERROR, "4xx"); // 客户端错误 views.put(SeriesSERVER_ERROR, "5xx"); // 服务端错误 SERIES_VIEWS = Collections/unmodifiableMap.views); } // ....... @override // HttpStatus 状态码 public ModelAndView resolveErrorView(HttpServletRequest request, HttpStatus status, Map<String, object> model) { ModelAndView modelAndView = resolve(String.valueOf(status.value(), model); if (modelAndView == null && SERIES_VIEWS.containsKey(status(series))) { // 通过状态码解析视图 modelAndView = resolve(SERIES_VIEWS.get(status_series)), model); } return modelAndView; } // 去 error 路径下解析视图 private ModelAndView resolve(String_viewName, Map<String, object> model) { // 比如 error/404 error/500 String-errorViewName = "error/" + viewName; TemplateAvailabilityProvider provider = this.templateAvailabilityProviders.getProvider(errorViewName, this.applicationContext); if (provider != null) { return new ModelAndView(errorViewName, model); } return resolveResource(errorViewName, model); }
```

所以说：定制错误页面，我们可以建立一个 error 目录，然后放入对应的错误码html文件！

比如：404.html 500.html 4xx.html 5xx.html

这些页面的信息数据在哪里呢？我们找到 DefaultErrorAttributes 这个bean对象；

里面有很多的 addxx 方法，就是添加不同的信息；

```txt
1 // addStatus  
2 // addErrorDetails  
3 // addErrorMessage  
4 // addStackTrace  
5 // addPath  
6  
7 // 这里面存了一些错误的信息，我们可以在错误页面直接取出来
```

到了这里，我们的SpringBoot开发一个简单的单体应用对我们来说就没什么太大的问题了！
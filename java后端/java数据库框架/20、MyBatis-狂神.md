# MyBatis:hatching_chick::hatching_chick::hatching_chick:

::: tip 🐣🐣🐣

- **MyBatis框架来啦！！**<br><br>
  本节主要讲了我们开发web项目最流行的操作数据库的框架MyBatis <br>
  我们的数据库操作驱动（框架）的演变是这样的：<br>
  <h3>jdbc-><em style="color: red;">MyBatis</em>->MyBatis-Plus-></h3>
  学这节的时候我应该也是大三啦！
  学了这节，jdbc就进阶啦！<br/>
  <br/>
- **看完本节可以利用MyBatis框架快速配置，更简单地操作数据库！<br/>** <br/>
- **<p style="color:red">冲冲冲~</p>**
  :::

# 环境说明：

- jdk 8 +
- MySQL 5.7.19  
  maven-3.6.0
- IDEA

# 学习前需要掌握：

- JDBC
- MySQL
- Java 基础  
  Maven
- Junit

# 1、Mybatis简介

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538384.jpg)

# MyBatis

# 1.1、什么是MyBatis

- MyBatis 是一款优秀的持久层框架
- MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集的过程
- MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的实体类【Plain Old Java Objects,普通的
  Java对象】映射成数据库中的记录。
- MyBatis 本是 apache 的一个开源项目ibatis, 2010 年这个项目由 apache 迁移到了 google code, 并且改名为 MyBatis。  
  2013年11月迁移到Github.
- Mybatis官方文档：http://www.mybatis.org/mybatis-3/zh/index.html
- GitHub : https://github.com/mybatis/mybatis-3

# 1.2、持久化

- 持久化是将程序数据在持久状态和瞬时状态间转换的机制。

。即把数据（如内存中的对象）保存到可永久保存的存储设备中（如磁盘）。持久化的主要应用是将内存中的对象存储在数据库中，或者存储在磁盘文件中、XML数据文件中等等。  
。JDBC就是一种持久化机制。文件IO也是一种持久化机制。  
在生活中：将鲜肉冷藏，吃的时候再解冻的方法也是。将水果做成罐头的方法也是。

- 为什么需要持久化服务呢？那是由于内存本身的缺陷引起的

○ 内存断电后数据会丢失，但有一些对象是无论如何都不能丢失的，比如银行账号等，遗憾的是，人们还无法保证内存永不掉电。  
○ 内存过于昂贵，与硬盘、光盘等外存相比，内存的价格要高2~
3个数量级，而且维持成本也高，至少需要一直供电吧。所以即使对象不需要永久保存，也会因为内存的容量限制不能一直呆在内存中，需要持久化来缓存到外存。

# 1.3、持久层

- 什么是持久层？

○ 完成持久化工作的代码块．---->dao层【DAO(Data Access Object)数据访问对象】

-
大多数情况下特别是企业级应用，数据持久化往往也就意味着将内存中的数据保存到磁盘上加以固化，而持久化的实现过程则大多通过各种关系数据库来完成。  
不过这里有一个字需要特别强调，也就是所谓的“层”。对于应用系统而言，数据持久功能大多是必不可少的组成部分。也就是说，我们的系统中，已经天然的具备了“持久层”概念？也许是，但也许实际情况并非如此。之所以要独立出一个“持久层”的概念，而不是“持久模块”，“持久单元”，也就意味着，我们的系统架构中，应该有一个相对独立的逻辑层面，专著于数据持久化逻辑的实现。  
。与系统其他部分相对而言，这个层面应该具有一个较为清晰和严格的逻辑边界。【说白了就是用来操作数据库存在的！】

# 1.4、为什么需要Mybatis

- Mybatis就是帮助程序猿将数据存入数据库中，和从数据库中取数据。
- 传统的jdbc操作，有很多重复代码块。比如：数据取出时的封装，数据库的建立连接等等...，通过框架可以减少重复代码，提高开发效率。
- MyBatis 是一个半自动化的ORM框架 (Object Relationship Mapping) --对象关系映射
- 所有的事情，不用Mybatis依旧可以做到，只是用了它，所有实现会更加简单！技术没有高低之分，只有使用这个技术的人有高低之别
- MyBatis的优点

- 简单易学：本身就很小且简单。没有任何第三方依赖，最简单安装只要两个jar文件+配置几个
  sql映射文件就可以了，易于学习，易于使用，通过文档和源代码，可以比较完全的掌握它的设计思路和实现。
- 灵活：mybatis不会对应用程序或者数据库的现有设计强加任何影响。sql写在xml里，便于统一管理和优化。通过sql语句可以满足操作数据库的所有需求。
- 解除sql与程序代码的耦合：通过提供DAO层，将业务逻辑和数据访问逻辑分离，使系统的设计更清晰，更易维护，更易单元测试。sql和代码的分离，提高了可维护性。
- 提供xml标签，支持编写动态sql。  
  。

- 最重要的一点，使用的人多！公司需要！

# 2、MyBatis第一个程序

思路流程：搭建环境-->导入Mybatis---->编写代码-->测试

# 2.1、代码演示

1.搭建实验数据库

```sql
1 CREATE DATABASE `mybatis`;  
2 USE `mybatis`;  
3 DROP TABLE IF EXISTS `user`;  
4 DROP TABLE IF EXISTS `user`;  
5 DROP TABLE IF EXISTS `user`;  
6 id int(20) NOT NULL,
```

```txt
9 `name`varchar(30)DEFAULTNULL,   
10 \`pwd`varchar(30)DEFAULTNULL,   
11 PRIMARY KEY（id）   
12 ）ENGINE=InnoDB DEFAULT CHARENt=utf8;   
13   
14 insert into \`user`（id`，name`，pwd）values（1,'狂神'，'123456'),(2,'张三','abcdef'),(3,'李四','987654');
```

# 2.导入MyBatis相关jar包

GitHub上找

```xml
1 <dependency>
2 <groupId>org.mybatis</groupId>
3 <artifactId>mybatis</artifactId>
4 <version>3.5.2</version>
5 </dependency>
6 <dependency>
7 <groupId>mysql</groupId>
8 <artifactId>mysqI-connector-java</artifactId>
9 <version>5.1.47</version>
10 </dependency>
```

# 3. 编写MyBatis核心配置文件

查看帮助文档

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE configuration  
PUBLIC "/~/mybatis.org//DTD Config 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-config.dtd">  
<configuration>  
<environments default="development">  
<environment id="development">  
<transactionManager type="JDBC"/>  
<DataSource type="POOLED">  
<property name="driver" value="com.mysql.jdbc.Driver"/>  
<property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncodingutf8"/>  
<property name="username" value="root"/>  
<property name="password" value="123456"/>  
</dataSource>  
</environment>  
</environments>  
<mappers>  
<mapper resource="com/kuang/dao/userMapper.xml"/>  
</mappers>  
</configuration>
```

# 4. 编写MyBatis工具类

查看帮助文档

```java
1 import org.apache abductedis.io.Resource;   
2 import org.apache abductedis.session.SqlSession;   
3 import org.apache abductedis.session.SqlSessionFactory;   
4 import org.apache abductedis.session.SqlSessionFactoryBuilder;   
5 import java.io.IOException;
```

5. 创建实体类

```java
import java.io.InputStreamReader;   
public class MybatisUtils {   
    private static DAOFactory daoFactory;   
    static {   
        try {   
            String resource = "mybatis-config.xml";   
            InputStream inputStream = Resources.getResourceAsStream(resource);   
            daoFactory = new DAOFactory();   
        } catch (IOException e) {   
            e.printStackTrace();   
        }   
    }   
//获取DAO连接   
public static DAOFactory getSession(){ return daoFactory.openSession();   
}
```

6. 编写Mapper接口类

```java
public class User {
    private int id; //id
    private String name; //姓名
    private String pwd; //密码
    //构造，有参，无参
    //set/get
    //toString()
}
```

7. 编写Mapper.xml配置文件

```java
1 import com.kuang.pojo.User;
2 import java.util.List;
3 public interface UserMapper {
4 List<user> selectUser();
5 }
6 }
```

- namespace 十分重要，不能写错！

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.kuangDAO.UserMapper">  
<select id="selectUser" resultCode="com.kuang.pojo.User">  
    select * from user  
</select>  
</mapper>
```

# 8. 编写测试类

oJunit包测试

```java
public class MyTest {
    @Test
        public void selectUser() {
            sqlSession session = Mybatis能找到Session();
            //方法一：
            //List<user> users = session.selectList("com.kuang mapper.UserMapper.selectUser");
        }
        //方法二：
        UserMapper mapper = sessionmapper(UserMapper.class);
        List<user> users = mapper.selectUser();
    }
    for (User user: users) {
        System.out.println(user);
    }
}
```

# 9. 运行测试

# 2.2、问题说明

可能出现问题说明：Maven静态资源过滤问题

```xml
1 <resources> <resource> <directory>src/main/java</directory> <includes> <include>**/*.properties</include> <include>**/*.xml</include> </includes> <filtering>false</filtering> </resource> <resource> <directory>src/main/resources</directory> <includes> <include>**/*.properties</include> <include>**/*.xml</include> </includes> <filtering>false</filtering> </resource> </resources>
```

# 3、CRUD操作

# 3.1、namespace

1. 将上面案例中的UserMapper接口改名为UserDao；
2. 将UserMapper.xml中的namespace改为为UserDao的路径。  
   3.再次测试

# 结论：

配置文件中namespace中的名称为对应Mapper接口或者Dao接口的完整包名,必须一致!

# 3.2、select

- select标签是mybatis中最常用的标签之一
- select语句有很多属性可以详细配置每一条SQL语句

o id

命名空间中唯一的标识符

- 接口中的方法名与映射文件中的SQL语句ID——对应

o parameterType

- 传入SQL语句的参数类型。【万能的Map，可以多尝试使用】

o resultType

- SQL语句返回值类型。【完整的类名或者别名】

# 需求：根据id查询用户

1. 在UserMapper中添加对应方法

```txt
public interface UserMapper { //查询全部用户 List<User> selectUser(); //根据id查询用户 User selectUserID(int id); }
```

2. 在UserMapper.xml中添加Select语句

```html
1 <select id="selectUserID" resultType="com.kuang.pojo.User"> 2 select * from user where id = #{id} 3 </select>
```

3. 测试类中测试

```java
1 @Test   
2 public void tsetSelectUserID() {   
3 SQLsession session  $=$  Mybatis Utilities次会议(); //获取SqlSession连接   
4 UserMapper mapper  $=$  session Mapper(UserMapper.class);   
5 User user  $=$  mapper.selectUserID(1);   
6 System.out.println(user);   
7 session.close();   
8 }
```

课堂练习：根据密码和名字查询用户

# 思路一：直接在方法中传递参数

1. 在接口方法的参数前加 @Param属性
2. SQL语句编写的时候，直接取@Param中设置的值即可，不需要单独设置参数类型

```javascript
//通过密码和名字查询用户
User selectUserID(@Param("username") String username, @Param("pwd") String pwd);
\*/
```

# 思路二：使用万能的Map

1. 在接口方法中，参数直接传递Map；

```javascript
1User selectUserIDN2(Map<String,obj>map);
```

2. 编写sql语句的时候，需要传递参数类型，参数类型为map

```javascript
1 <select id="selectUserIDNP2".parameterType="map" resultType="com.kuang.pojo.User"> 2 select * from user where name = #{username} and pwd = #{pwd} 3 </select>
```

3. 在使用方法的时候，Map的key为sql中取的值即可，没有顺序要求！

```txt
1 Map<String, Object> map = new HashMap<String, Object>();  
2 map.put("username","小明");  
3 map.put("pwd","123456");  
4 User user = mapper.selectUserByNP2(map);
```

总结：

如果参数过多，我们可以考虑直接使用Map实现，如果参数比较少，直接传递参数即可

# 3.3、insert

我们一般使用insert标签进行插入操作，它的配置和select标签差不多！

# 需求：给数据库增加一个用户

1. 在UserMapper接口中添加对应的方法

```javascript
1 //添加一个用户  
2 int addUser(User user);
```

2. 在UserMapper.xml中添加insert语句

```txt
1 <insert id="addUser" parameterType  $=$  "com.kuang.pojo.User">   
2 insert into user (id,name,pwd) values (#{id},#,name},#,{pwd})   
3 </insert>
```

# 3. 测试

```java
1 @Test   
2 public void testAddUser() {   
3     SqISession session = Mybatis Utilities次会议();   
4         UserMapper mapper  $=$  session Mapper(UserMapper.class);   
5         User user  $=$  new User(5,"王五","zxcvbn");   
6         int i  $=$  mapper.addUser(user);   
7         System.out.println(i);   
8         session.commit(); //提交事务，重点！不写的话不会提交到数据库   
9         session.close();   
10 }
```

注意点：增、删、改操作需要提交事务！

# 3.4、update

我们一般使用update标签进行更新操作，它的配置和select标签差不多！

# 需求：修改用户的信息

# 1. 同理，编写接口方法

```javascript
1 //修改一个用户  
2 int updateUser(User user);
```

# 2. 编写对应的配置文件SQL

```html
1 <update id="updateUser" parameterType="com.kuang.pojo.User"> 2 update user set name  $=$  #{name},pwd  $=$  #{pwd} where id  $=$  #{id} 3 </update>
```

# 3. 测试

```java
1 @Test   
2 public void testUpdateUser() {   
3     SqSession session = Mybatis Utilities.getSession();   
4         Mapper mapper = sessionmapper(UserMapper.class);   
5         User user = mapper.selectUserId(1);   
6         user.setPwd("asdfgh");   
7         int i = mapper.updateUserId();   
8         System.out.println(i);   
9         session.commit(); //提交事务，重点！不写的话不会提交到数据库   
10         session.close();   
11 }
```

# 3.5、delete

我们一般使用delete标签进行删除操作，它的配置和select标签差不多！

# 需求：根据id删除一个用户

# 1. 同理，编写接口方法

```javascript
1 //根据id删除用户  
2 int deleteUser(int id);
```

# 2. 编写对应的配置文件SQL

```txt
1 <delete id="deleteUser" parameterType="int"> 2 delete from user where id = #{id} 3 </delete>
```

# 3. 测试

```java
1 @Test   
2 public void testDeleteUser() {   
3     SqISession session = Mybatis UtilitiesSessions();   
4         UserMapper mapper  $=$  session Mapper(UserMapper.class);   
5         int i  $=$  mapper.deleteUser(5);   
6         System.out.println(i);   
7         session.commit(); //提交事务，重点！不写的话不会提交到数据库   
8         session.close();   
9 }
```

# 小结：

- 所有的增删改操作都需要提交事务！
- 接口所有的普通参数，尽量都写上@Param参数，尤其是多个参数时，必须写上！  
  有时候根据业务的需求，可以考虑使用map传递参数！
- 为了规范操作，在SQL的配置文件中，我们尽量将Parameter参数和resultType都写上！

# 3.6、思考题

# 模糊查询like语句该怎么写？

第1种：在Java代码中添加sql通配符。

```txt
1 string wildcardname  $=$  "  $\% \mathrm{smi}\%$    
2 list<name> names  $=$  mapper.selectlike(wildcardname);   
3   
4 <select id="selectlike">   
5 select \* from foo where bar like #{value}   
6 </select>
```

第2种：在sql语句中拼接通配符，会引起sql注入

```txt
1 string wildcardname = "smi";  
2 list<name> names = mapper.selectlike(wildcardname);  
3  
4 <select id="selectlike">  
5 select * from foo where bar like "%#"#{value}"%".  
6 </select>  
7
```

# 4、配置解析

# 4.1、核心配置文件

- mybatis-config.xml 系统核心配置文件
- MyBatis 的配置文件包含了会深深影响 MyBatis 行为的设置和属性信息。
- 能配置的内容如下：

```txt
1 configuration（配置）  
2 properties（属性）  
3 settings（设置）  
4 typeAliases（类型别名）  
5 typehandlers（类型处理器）  
6 objectFactory（对象工厂）  
7 plugins（插件）  
8 environments（环境配置）  
9 environment（环境变量）  
10 transactionManager（事务管理器）  
11 dataSource（数据源）  
12 databaseIdProvider（数据库厂商标识）  
13 mappers（映射器）  
14 <!-- 注意元素节点的顺序！顺序不对会报错 --->
```

我们可以阅读 mybatis-config.xml 上面的@d的头文件！【演示】

# 4.2、environments元素

```xml
1 <environments default="development">   
2 <environment id="development">   
3 <transactionManager type="JDBC">   
4 <property name="..." value="..." />   
5 </transactionManager>   
6 <dataSource type="POOLED">   
7 <property name="driver" value="${driver}" />   
8 <property name="url" value="${url}" />   
9 <property name="username" value="${username}" />   
10 <property name="password" value="${password}" />   
11 </dataSource>   
12 </environment>   
13 </environments>
```

- 配置MyBatis的多套运行环境，将SQL映射到多个不同的数据库上，必须指定其中一个为默认运行环境（通过default指定）
- 子元素节点：environment

。具体的一套环境，通过设置id进行区别，id保证唯一！  
。子元素节点：transactionManager-［事务管理器]

```txt
1 <--语法-->   
2 <transactionManager type="[JDBC|MANAGED]"/>
```

详情：点击查看官方文档  
这两种事务管理器类型都不需要设置任何属性。

○ 子元素节点：数据源 (dataSource)

- dataSource 元素使用标准的 JDBC 数据源接口来配置 JDBC 连接对象的资源。

数据源是必须配置的。  
有三种内建的数据源类型

1 type  $=$  ["UNPOOLED|POOLED|JNDI"]）

- unpooled：这个数据源的实现只是每次被请求时打开和关闭连接。
- pooled：这种数据源的实现利用“池”的概念将 JDBC 连接对象组织起来，这是一种使得并发 Web 应用快速响应请求的流行处理方式。
- jndi: 这个数据源的实现是为了能在如 Spring 或应用服务器这类容器中使用, 容器可以集中或在外部配置数据源, 然后放置一个
  JNDI 上下文的引用。
- 数据源也有很多第三方的实现，比如dbcp，c3p0，druid等等...

# 4.3、mappers元素

# 4.3.1、mappers

- 映射器：定义映射SQL语句文件
- 既然 MyBatis 的行为其他元素已经配置完了，我们现在就要定义 SQL 映射语句了。但是首先我们需要告诉 MyBatis 到哪里去找到这些语句。Java
  在自动查找这方面没有提供一个很好的方法，所以最佳的方式是告诉 MyBatis 到哪里去找映射文件。你可以使用相对于类路径的资源引用，或完全限定资源定位符（包括
  file:/// 的 URL），或类名和包名等。映射器是MyBatis中最核心的组件之一，在MyBatis
  3之前，只支持xml映射器，即：所有的SQL语句都必须在xml文件中配置。而从MyBatis
  3开始，还支持接口映射器，这种映射器方式允许以Java代码的方式注解定义SQL语句，非常简洁。

# 4.3.2、引入资源方式

```txt
1 <-- 使用相对于类路径的资源引用 -->   
2 <mappers>   
3 <mapper resource="org/mybatis/builder/PostMapper.xml"/>   
4 </mappers>
```

```xml
1 <-- 使用完全限定资源定位符（URL） -->   
2 <mappers>   
3 <mapper url="file:////var/mappers/AuthorMapper.xml"/>   
4 </mappers>
```

```txt
1 <--  
2 使用映射器接口实现类的完全限定类名  
3 需要配置文件名称和接口名称一致，并且位于同一目录下  
4 -->  
5 <mappers>  
6 <mapper class="org.mybatis.builder.AuthorMapper"/>  
7 </mappers>
```

```txt
1 <--  
2 将包内的映射器接口实现全部注册为映射器  
3 但是需要配置文件名称和接口名称一致，并且位于同一目录下  
4 -->  
5 <mappers>  
6 <package name="org.mybatis.builder"/>  
7 </mappers>
```

# 4.3.3、Mapper文件

```xml
1 <?xml version="1.0" encoding="UTF-8"?>   
2 <!DOCTYPE mapper   
3 PUBLIC"-//mybatis.org//DTD Mapper 3.0//EN"   
4 "http://mybatis.org/dtd/mybatis-3-mapper.dtd">   
5 <mapper namespace  $=$  "com.kuang mapper.UserMapper">   
6   
7 </mapper>
```

- namespace中文意思：命名空间，作用如下：

1. namespace和子元素的id联合保证唯一，区别不同的mapper
2. 绑定DAO接口

- namespace的命名必须跟某个接口同名  
  接口中的方法与映射文件中sql语句id应该一一对应

3. namespace命名规则：包名+类名

MyBatis 的真正强大在于它的映射语句，这是它的魔力所在。由于它的异常强大，映射器的 XML 文件就显得相对简单。如果拿它跟具有相同功能的
JDBC 代码进行对比，你会立即发现省掉了将近  $95\%$  的代码。MyBatis 为聚焦于 SQL 而构建，以尽可能地为你减少麻烦。

# 4.4、Properties优化

数据库这些属性都是可外部配置且可动态替换的，既可以在典型的 Java 属性文件中配置，亦可通过 properties 元素的子元素来传递。具体的官方文档

我们来优化我们的配置文件

第一步；在资源目录下新建一个db.properties

```txt
1 driver=com.mysql.jdbc.Driver  
2 url=jdbc:mysql://localhost:3306/mybatis?  
3 useSSL=true&useUnicode=true&characterEncodingutf8  
4 username=root  
5 password=123456
```

第二步：将文件导入properties配置文件

```xml
1 <configuration>
2 <!--导入properties文件-->
3 <properties resource="db.properties"/>
4 <environments default="development">
5 <environment id="development">
6 <transactionManager type="JDBC"/>
7 <dataSource type="POOLED">
8 <property name="driver" value="_{driver}"/>
9 <property name="url" value="_{url}"/>
10 <property name="username" value="_{username}"/>
11 <property name="password" value="_{password}"/>
12 </dataSource>
13 </environment>
14 </environments>
15 <mappers>
16 <mapper resource="mapper/UserMapper.xml"/>
17 <mappers>
18 </mappers>
19 </configuration>
```

更多操作，可以查看官方文档！【演示带领学习】

- 配置文件优先级问题
- 新特性：使用占位符

# 4.5、typeAliases优化

类型别名是为 Java 类型设置一个短的名字。它只和 XML 配置有关，存在的意义仅在于用来减少类完全限定名的冗余。

```xml
1 <--配置别名，注意顺序-->   
2 <typeAliases>   
3 <typeAlias type  $=$  "com.kuang.pojo.User" alias  $\coloneqq$  "User"/>   
4 </typeAliases>
```

当这样配置时，User 可以用在任何使用 com.kuang.pojo.User 的地方。

也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean，比如：

```xml
1 <typealiases>
2 <package name="com.kuang.pojo"/>
3 </typealiases>
```

每一个在包 com.kuang.pojo 中的 Java Bean，在没有注解的情况下，会使用 Bean 的首字母小写的非限定类名来作为它的别名。

若有注解，则别名为其注解值。见下面的例子：

```txt
1 @Alias("user")   
2 public class User {   
3 ...   
4 }
```

【演示】去官网查看一下Mybatis默认的一些类型别名！

# 4.6、其他配置浏览

# 4.6.1、设置

- 设置 (settings) 相关 => 查看帮助文档

懒加载  
○ 日志实现  
缓冲开启关闭

- 一个配置完整的 settings 元素的示例如下：

```txt
1 <settings>   
2 <setting name  $=$  "cacheEnabled" value  $=$  "true"/>   
3 <setting name  $=$  "lazyLoadingEnabled" value  $=$  "true"/>   
4 <setting name  $=$  "multipleresultsetsEnabled" value  $=$  "true"/>   
5 <setting name  $=$  "useColumnLabel" value  $=$  "true"/>   
6 <setting name  $=$  "useGeneratedKeys" value  $=$  "false"/>   
7 <setting name  $=$  "autoMappingBehavior" value  $=$  "PARTIAL"/>   
8 <setting name  $=$  "autoMappingUnknownColumnBehavior" value  $=$  "WARNING"/>   
9 <setting name  $=$  "defaultExecutorType" value  $=$  "SIMPLE"/>   
10 <setting name  $=$  "defaultStatementTimeout" value  $=$  "25"/>   
11 <setting name  $=$  "defaultFetchsize" value  $=$  "100"/>   
12 <setting name  $=$  "safeRowBoundsEnabled" value  $=$  "false"/>
```

```xml
13 <setting name="mapUnderscoreToCamelCase" value="false"/>   
14 <setting name  $=$  "localCacheScope"value  $=$  "SESSION"/>   
15 <setting name  $=$  "jdbcTypeForNull"value  $=$  "OTHER"/>   
16 <setting name  $=$  "lazyLoadTriggerMethods"   
value  $=$  "equals,clone,hashCode,toString"/>   
17 </settings>
```

# 4.6.2、类型处理器

# 官方文档

- 无论是 MyBatis 在预处理语句（PreparedStatement）中设置一个参数时，还是从结果集中取出一个值时，都会用类型处理器将获取的值以合适的方式转换成
  Java 类型。
- 你可以重写类型处理器或创建你自己的类型处理器来处理不支持的或非标准的类型。【了解即可】

# 4.6.3、对象工厂

# 官方文档

- MyBatis 每次创建结果对象的新实例时，它都会使用一个对象工厂（ObjectFactory）实例来完成。
- 默认的对象工厂需要做的仅仅是实例化目标类，要么通过默认构造方法，要么在参数映射存在的时候通过有参构造方法来实例化。
- 如果想覆盖对象工厂的默认行为，则可以通过创建自己的对象工厂来实现。【了解即可】

# 4.7生命周期和作用域

作用域（Scope）和生命周期

理解我们目前已经讨论过的不同作用域和生命周期类是至关重要的，因为错误的使用会导致非常严重的并发问题。

我们可以先画一个流程图，分析一下Mybatis的执行过程！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538385.jpg)

# 作用域理解

- SQLFactoryBuilder 的作用在于创建 SQLFactory，创建成功后，SQLFactoryBuilder 就失去了作用，所以它只能存在于创建 SQLFactory
  的方法中，而不要让其长期存在。因此 SQLFactoryBuilder 实例的最佳作用域是方法作用域（也就是局部方法变量）。  
  -.SqlFactory 可以被认为是一个数据库连接池，它的作用是创建.SqlSession 接口对象。因为 MyBatis 的本质就是 Java
  对数据库的操作，所以.SqlFactory 的生命周期存在于整个 MyBatis 的应用之中，所以一旦创建了.SqlFactory，就要长期保存它，直至不再使用
  MyBatis 应用，所以可以认为.SqlFactory 的生命周期就等同于 MyBatis 的应用周期。
-
由于SqlSessionFactory是一个对数据库的连接池，所以它占据着数据库的连接资源。如果创建多个SqlSessionFactory，那么就存在多个数据库连接池，这样不利于对数据库资源的控制，也会导致数据库连接资源被消耗光，出现系统宕机等情况，所以尽量避免发生这样的情况。
- 因此在一般的应用中我们往往希望 SQLSessionFactory 作为一个单例，让它在应用中被共享。所以说 SQLSessionFactory
  的最佳作用域是应用作用域。
- 如果说 SQLSessionFactory 相当于数据库连接池，那么 SqlConnection 就相当于一个数据库连接（Connection 对象），你可以在一个事务里面执行多条
  SQL，然后通过它的 commit、rollback 等方法，提交或者回滚事务。所以它应该存活在一个业务请求中，处理完整个请求后，应该关闭这条连接，让它归还给
  SqlConnectionFactory，否则数据库资源就很快被耗费精光，系统就会瘫痪，所以用 try...catch...finally... 语句来保证其正确关闭。
- 所以SqlSession的最佳的作用域是请求或方法作用域。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538386.jpg)

# 5、ResultMap

# 5.1、查询为null问题

1. 查看之前的数据库的字段名

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538388.jpg)

2. Java中的实体类设计

```java
1 public class User {
2     private int id; //id
3         private String name; //姓名
4         private String password; //密码和数据库不一样!
5         //构造
68         //set/get
70         // toString()
10 }
```

3. 接口

```javascript
1 //根据id查询用户  
2 User selectUserId(int id);
```

4. mapper映射文件

```txt
1 <select id="selectUserID" resultType="user"> 2 select * from user where id = #{id} 3 </select>
```

5. 测试

```java
1 @Test   
2 public void testSelectUserID() {   
3    sqlSession session = Mybatis Utilities.getConnection(); //获取SqlSession连接   
4        UserMapper mapper = session Mapper(UserMapper.class);   
5        User user = mapper.selectUserID(1);   
6        System.out.println(user);   
7        session.close();   
8 }
```

# 结果:

- User{id=1, name='狂神', password='null'}
- 查询出来发现 password 为空. 说明出现了问题!

# 分析：

- select * from user where id = #{id} 可以看做
  select id, name, pwd from user where id = #{id}

- mybatis会根据这些查询的列名(会将列名转化为小写,数据库不区分大小写)
  ,去对应的实体类中查找相应列名的set方法设值,由于找不到setPwd(),所以password返回null;【自动映射】

# 5.2、解决方案

方案一：为列名指定别名，别名和java实体类的属性名一致。

```html
1 <select id="selectUserID" resultType="User"> 2 select id, name, pwd as password from user where id = #{id} 3 </select>
```

# 方案二：使用结果集映射->ResultSet【推荐】

```twig
<resultMap id="UserInfo" type="User">
    <!-- id为主键-->
    <id column="id" property="id"/>
    <!-- column是数据库表的列名，property是对应实体类的属性名-->
    <result column="name" property="name"/>
    <result column="pwd" property="password"/>
</resultMap>
<select id="selectUserId" resultMap="UserInfo">
    select id, name, pwd from user where id = "#id"
</select>
```

# 5.3、ResultMap

# 5.3.1、自动映射

- resultMap 元素是 MyBatis 中最重要最强大的元素。它可以让你从  $90\%$  的 JDBC Results 数据提取代码中解放出来。
- 实际上，在为一些比如连接的复杂语句编写映射代码的时候，一份 resultMap 能够代替实现同等功能的长达数千行的代码。
- ResultMap 的设计思想是，对于简单的语句根本不需要配置显式的结果映射，而对于复杂一点的语句只需要描述它们的关系就行了。

你已经见过简单映射语句的示例了，但并没有显式指定 resultMap。比如：

```html
1 <select id="selectUserID" resultType="map"> 2 select id, name, pwd 3 from user 4 where id = #{id} 5 </select>
```

上述语句只是简单地将所有的列映射到 HashMap 的键上，这由��resultType 属性指定。虽然在大部分情况下都够用，但是 HashMap
不是一个很好的模型。你的程序更可能会使用 JavaBean 或 POJO（Plain Old Java Objects，普通老式 Java 对象）作为模型。

ResultMap 最优秀的地方在于，虽然你已经对它相当了解了，但是根本就不需要显式地用到他们。

# 5.3.2、手动映射

1. 返回值类型为resultMap

```html
1 <select id="selectUserID" resultMap="UserId"> 2 select id, name, pwd from user where id = #{id} 3 </select>
```

2. 编写resultMap，实现手动映射！

```xml
1 <resultMap id="UserInfo" type="User">   
2 <-- id为主键 -->   
3 <id column="id" property="id"/>   
4 <-- column是数据库表的列名，property是对应实体类的属性名 -->   
5 <result column="name" property="name"/>   
6 <result column="pwd" property="password"/>   
7 </resultMap>
```

如果世界总是这么简单就好了。但是肯定不是的，数据库中，存在一对多，多对一的情况，我们之后会使用到一些高级的结果集映射，association，collection这些，我们将在之后讲解，今天你们需要把这些知识都消化掉才是最重要的！理解结果集映射的这个概念！

# 6、分页的实现

# 6.1、日志工厂

思考：我们在测试SQL的时候，要是能够在控制台输出 SQL 的话，是不是就能够有更快的排错效率？

如果一个数据库相关的操作出现了问题，我们可以根据输出的SQL语句快速排查问题。

对于以往的开发过程，我们会经常使用到debug模式来调节，跟踪我们的代码执行过程。但是现在使用Mybatis是基于接口，配置文件的源代码执行过程。因此，我们必须选择日志工具来作为我们开发，调节程序的工具。

Mybatis内置的日志工厂提供日志功能，具体的日志实现有以下几种工具：

SLF4J  
Apache Commons Logging

- Log4j 2
- Log4j
- JDK logging

具体选择哪个日志实现工具由MyBatis的内置日志工厂确定。它会使用最先找到的（按上文列举的顺序查找）。如果一个都未找到，日志功能就会被禁用。

# 标准日志实现

指定 MyBatis 应该使用哪个日志记录实现。如果此设置不存在，则会自动发现日志记录实现。

```txt
1 <settings>   
2 <setting name  $=$  "logImpl" value  $=$  "STDOUT_LOGGING"/>   
3 </settings>
```

测试，可以看到控制台有大量的输出！我们可以通过这些输出来判断程序到底哪里出了Bug

# 6.2、Log4j

简介：

- Log4j是Apache的一个开源项目
- 通过使用Log4j，我们可以控制日志信息输送的目的地：控制台，文本，GUI组件...
- 我们也可以控制每一条日志的输出格式；

- 通过定义每一条日志信息的级别，我们能够更加细致地控制日志的生成过程。最令人感兴趣的就是，这些可以通过一个配置文件来灵活地进行配置，而不需要修改应用的代码。

# 使用步骤：

# 1.导入log4j的包

```xml
1 <dependency>
2 <groupId>log4j</groupId>
3 <artifactId>log4j</artifactId>
4 <version>1.2.17</version>
5 </dependency>
```

# 2. 配置文件编写

```txt
1 #将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码  
2 log4j.rootLogger=DEBUG,console,file  
3  
4 #控制台输出的相关设置  
5 log4j.append console = org.apache.log4j(ConsoleAppender  
6 log4j.append console.Target  $=$  System.out  
7 log4j.append console.Threshold  $\equiv$  DEBUG  
8 log4j.append console.layout  $=$  org.apache.log4j.PatternLayout  
9 log4j.append console.layout.ConversionPattern  $= [\% c] - \% m\% n$    
10  
11 #文件输出的相关设置  
12 log4j.append.file  $=$  org.apache.log4j RollingFileAppender  
13 log4j.append file.File  $= . / \log /kuang$  .log  
14 log4j.append file.MaxFileSize  $= 10mb$    
15 log4j.append file.Threshold  $\equiv$  DEBUG  
16 log4j.append file.layout  $\equiv$  org.apache.log4j.PatternLayout  
17 log4j.append file.layout.ConversionPattern  $= [\% p][\% d\{yy-MM-dd\}][\% c]\% m\% n$    
18  
19 #日志输出级别  
20 log4j.logger.org.mybatis  $\equiv$  DEBUG  
21 log4j.logger.java.sql  $\equiv$  DEBUG  
22 log4j.logger.java.sql.Statement  $\equiv$  DEBUG  
23 log4j logger.java.sqlResultSet  $\equiv$  DEBUG  
24 log4j.logger.java.sql.PreparedStatement  $\equiv$  DEBUG
```

# 3. setting设置日志实现

```xml
1 <settings>   
2 <setting name  $=$  "logImpl" value  $=$  "LOG4J"/>   
3 </settings>
```

# 4. 在程序中使用Log4j进行输出！

```java
//注意导包：org.apache.log4j Logging   
static Logger logger  $\equiv$  Logger.getLogger (MyTest.class);   
@Test   
public void selectUser() {   
logger.info("info:进入selectUser方法");   
logger.debug("debug:进入selectUser方法");   
logger.error("error：进入selectUser方法");   
sqlSession session  $=$  Mybatis能做到Session();
```

```txt
10 用户Mapper mapper  $=$  session Mapper(UserMapper.class);   
11 List<User> users  $=$  mapper.selectUser();   
12 for (User user: users){ System.out.println(user);   
13 }   
14 15 session.close();   
16 }
```

5. 测试，看控制台输出！

使用Log4j输出日志  
可以看到还生成了一个日志的文件【需要修改file的日志级别】

# 6.3、limit实现分页

# 思考：为什么需要分页？

在学习mybatis等持久层框架的时候，会经常对数据进行增删改查操作，使用最多的是对数据库进行查询操作，如果查询大量数据的时候，我们往往使用分页进行查询，也就是每次处理小部分数据，这样对数据库压力就在可控范围内。

# 使用Limit实现分页

```txt
1 #语法  
2 SELECT * FROM table LIMIT StratIndex,(pageSize  
3 SELECT * FROM table LIMIT 5,10; //检索记录行6-15  
4 #为了检索从某一个偏移量到记录集的结束所有的记录行，可以指定第二个参数为-1:  
7 SELECT * FROM table LIMIT 95,-1; //检索记录行96-last.  
8 #如果只给定一个参数，它表示返回最大的记录行数目：  
10 SELECT * FROM table LIMIT 5; //检索前5个记录行  
11 #换句话说，LIMIT n等价于LIMIT O,n。
```

# 步骤：

1. 修改Mapper文件

```txt
1 <select id="selectUser" parameterType="map" resultType="user"> 2 select * from user limit {{startIndex}, #{page size} 3 </select>
```

2. Mapper接口，参数为map

```dart
1 //选择全部用户实现分页  
2 List<User> selectUser(Map<String, Integer> map);
```

3. 在测试类中传入参数测试

。推断：起始位置 = （当前页面 - 1）* 页面大小

```java
1 //分页查询，两个参数startIndex，PageSize  
2 @Test  
3 public void testSelectUser() {  
4     sqlSession session = Mybatis Utilities.getSession();
```

```java
5     UserMapper mapper = session Mapper(UserMapper.class);
6     int currentPage = 1; //第几页
7     intPageSize = 2; //每页显示几个
8     Map<String, Integer> map = new HashMap<String, Integer>();
9     map.put("startIndex", (currentPage - 1) *PageSize);
10         map.put("PageSize",PageSize);
11         List<user> users = mapper.selectUser(map);
12         for (User user: users) {
13         System.out.println(user);
14         } 
15         session.close();
16        }
```

# 6.4、RowBounds分页

我们除了使用Limit在SQL层面实现分页，也可以使用RowBounds在Java代码层面实现分页，当然此种方式作为了解即可。我们来看下如何实现的！

# 步骤：

1. mapper接口

1 //选择全部用户RowBounds实现分页  
2 List<User> getUserByRowBounds();

2. mapper文件

```txt
1 <select id="getUserByRowBounds" resulttype="user"> 2 select * from user 3 </select>
```

3. 测试类

在这里，我们需要使用RowBounds类

```java
1 @Test   
2 public void testUserByRowBounds(){ SQLsession session  $\equiv$  Mybatis能做到Session(); int currentPage  $= 2$  //第几页 int pageSize  $= 2$  //每页显示几个 RowBounds rowBounds  $\equiv$  new RowBounds((currentPage- 1)*pageSize, pageSize); //通过session.\*\*方法进行传递rowBounds，[此种方式现在已经不推荐使用了] List<user> users = session.selectList("com.kuang mapper.UserMapper.getUserByRowBounds", null, rowBounds); for (User user: users){ System.out.println(user); }
```

15  
16}

session.close();

# 6.5、PageHelper

# MyBatis 分页插件 PageHelper

如果你也在用 MyBatis，建议尝试该分页插件，这一定是最方便使用的分页插件。分页插件支持任何复杂的单表、多表分页。

View on Github

View on GitOsc

maven central 5.1.10

了解即可，可以自己尝试使用

官方文档：https://pagehelper.github.io/

# 7、使用注解开发

# 7.1、面向接口编程

- 大家之前都学过面向对象编程，也学习过接口，但在真正的开发中，很多时候我们会选择面向接口编程
- 根本原因：解耦，可拓展，提高复用，分层开发中，上层不用管具体的实现，大家都遵守共同的标准，使得开发变得容易，规范性更好
- 在一个面向对象的系统中，系统的各种功能是由许许多多的不同对象协作完成的。在这种情况下，各个对象内部是如何实现自己的，对系统设计人员来讲就不那么重要了；
- 而各个对象之间的协作关系则成为系统设计的关键。小到不同类之间的通信，大到各模块之间的交互，在系统设计之初都是要着重考虑的，这也是系统设计的主要工作内容。面向接口编程就是指按照这种思想来编程。

# 关于接口的理解

- 接口从更深层次的理解，应是定义（规范，约束）与实现（名实分离的原则）的分离。
- 接口的本身反映了系统设计人员对系统的抽象理解。
- 接口应有两类：

○ 第一类是对一个个体的抽象，它可对应为一个抽象体(abstract class);  
○ 第二类是对一个个体某一方面的抽象，即形成一个抽象面（interface）；

- 一个体有可能有多个抽象面。抽象体与抽象面是有区别的。

- 面向对象是指，我们考虑问题时，以对象为单位，考虑它的属性及方法。
- 面向过程是指，我们考虑问题时，以一个具体的流程（事务过程）为单位，考虑它的实现。
- 接口设计与非接口设计是针对复用技术而言的，与面向对象（过程）不是一个问题。更多的体现就是对系统整体的架构

# 7.2、利用注解开发

- mybatis最初配置信息是基于XML，映射语句(SQL)也是定义在XML中的。而到MyBatis
  3提供了新的基于注解的配置。不幸的是，Java注解的的表达力和灵活性十分有限。最强大的MyBatis映射并不能用注解来构建
- sql类型主要分成：

o @select ()  
$\circ$  @update()  
o @Insert ()  
o @delete ()

【注意】利用注解开发就不需要mapper.xml映射文件了.

1. 我们在我们的接口中添加注解

1 //查询全部用户  
2 @Select("select id,name,pwd password from user")  
3 public List<User> getAllUser();

2. 在mybatis的核心配置文件中注入

1 <!--使用class绑定接口-->  
2 <mappers>  
3 <mapper class="com.kuang mapper.UserMapper"/>  
4 </mappers>

3. 我们去进行测试

```java
1 @Test   
2 public void testGetAllUser() { SQLsession session  $=$  MybatisUtils.Session(); //本质上利用了jvm的动态代理机制   
3 用户Mapper mapper  $=$  session Mapper(UserMapper.class);   
5 1   
6 List<user> users  $=$  mapper>AllUser(); for (User user : users){ System.out.println(user); }   
10 session.close();   
11   
12   
13
```

4. 利用Debug查看本质

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538389.jpg)

# 5. 本质上利用了jvm的动态代理机制

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538390.jpg)

# 6. Mybatis详细的执行流程

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538391.jpg)

# 7.3、注解增删改

改造MybatisTools工具类的getSession()方法，重载实现。【鸡汤：多看源码实现】

```java
//获取SqlSession连接   
public staticSqlSessiongetSession(){ return getSession(true); //事务自动提交   
}   
public staticSqlSessiongetSession(booleanflag){ returnsqlFactory.openSessionflag);   
}
```

【注意】确保实体类和数据库字段对应

# 查询：

1. 编写接口方法注解

```txt
1 //根据id查询用户  
2 @Select("select * from user where id = #{id}")  
3 User selectUserId(@Param("id") int id);
```

2. 测试

```java
1 @Test   
2 public void testSelectUserID() {   
3 SQLsession session  $=$  Mybatis.utils.Session();   
4 用户Mapper mapper  $=$  session Mapper(UserMapper.class);   
5   
6 User user  $=$  mapper.selectUserID(1);   
7 System.out.println(user);   
8   
9 session.close();   
10 }
```

# 新增：

1. 编写接口方法注解

```txt
1 //添加一个用户  
2 @Insert("insert into user (id,name,pwd) values (#{id},#,name#,#{pwd})")  
3 int addUser(user user);
```

2. 测试

```java
1 @Test   
2 public void testAddUser() {   
3     SqSession session = MybatisUtils.Session();   
4         UserMapper mapper = session Mapper(UserMapper.class);   
5   
6         User user = new User(6, "秦疆", "123456");   
7         mapper.addUser(user);   
8   
9         session.close();   
10 }
```

# 修改：

1. 编写接口方法注解

```javascript
1 //修改一个用户  
2 @Update("update user set name=\#\{name\},pwd=\#\{pwd\} where id = \#\{id\}")  
3 int updateUser(User user);
```

# 2. 测试

```java
1 @Test   
2 public void testUpdateUser() {   
3     SqISession session  $=$  Mybatis Utilities次会议   
4         UserMapper mapper  $=$  sessionmapper(UserMapper.class);   
5   
6         User user  $=$  new User(6, "秦疆", "zxcvbn");   
7         mapper.updateUser(user);   
8   
9         session.close();   
10 }
```

# 删除：

# 1. 编写接口方法注解

```txt
1 //根据id删除用  
2 @Delete("delete from user where id = #{id}")  
3 int deleteUser(@Param("id")int id);
```

# 2. 测试

```java
1 @Test   
2 public void testDeleteUser() {   
3     SqISession session  $=$  MybatisUtils.getSession();   
4         UserMapper mapper  $=$  session Mapper(UserMapper.class);   
5   
6         mapper.deleteUser(6);   
7   
8         session.close();   
9 }
```

【注意点：增删改一定记得对事务的处理】

# 7.4、关于@Param

@Param注解用于给方法参数起一个名字。以下是总结的使用原则:

- 在方法只接受一个参数的情况下，可以不使用@Param。
- 在方法接受多个参数的情况下，建议一定要使用@Param注解给参数命名。
- 如果参数是JavaBean，则不能使用@Param。
- 不使用@Param注解时，参数只能有一个，并且是Javabean。

# 7.5、#与$的区别

- $\# \{\}$  的作用主要是替换预编译语句(PrepareStatement)中的占位符？【推荐使用】

```sql
1 INSERT INTO user (name) VALUES (#{name});  
2 INSERT INTO user (name) VALUES (?);
```

• ${}的作用是直接进行字符串替换

```sql
1 INSERT INTO user (name) VALUES ('${name}');  
2 INSERT INTO user (name) VALUES ('kuangshen');
```

# 8、多对一的处理

多对一的理解：

- 多个学生对应一个老师
- 如果对于学生这边，就是一个多对一的现象，即从学生这边关联一个老师！

# 8.1、数据库设计

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538392.jpg)

```sql
1 CREATE TABLE `teacher` (  
2 `id` INT(10) NOT NULL,  
3 `name`VARCHAR(30) DEFAULT NULL,  
4 PRIMARY KEY ('id')  
5) ENGINE=INNODB DEFAULT CHARACTER=utf8  
6  
7 INSERT INTO teacher('id', 'name') VALUES (1, '秦老师');  
8  
9 CREATE TABLE `student` (  
10 `id` INT(10) NOT NULL,  
11 `name`VARCHAR(30) DEFAULT NULL,  
12 `tid` INT(10) DEFAULT NULL,  
13 PRIMARY KEY ('id'),  
14 KEY `fktid` ('tid'),  
15 CONSTRAINT `fktid` FOREIGN KEY ('tid') REFERENCES `teacher` ('id')  
16) ENGINE=INNODB DEFAULT CHARACTER=utf8  
17  
18  
19 INSERT INTO `student` ('id', 'name', 'tid') VALUES ('1', '小明', '1');  
20 INSERT INTO `student` ('id', 'name', 'tid') VALUES ('2', '小红', '1');  
21 INSERT INTO `student` ('id', 'name', 'tid') VALUES ('3', '小张', '1');  
22 INSERT INTO `student` ('id', 'name', 'tid') VALUES ('4', '小李', '1');  
23 INSERT INTO `student` ('id', 'name', 'tid') VALUES ('5', '小王', '1');
```

# 8.2、搭建测试环境

【Lombok的使用】

1. IDEA安装Lombok插件
2. 引入Maven依赖

3. 在代码中增加注解

```xml
1 <-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->   
2 <dependency>   
3 <groupId>org.projectlombok</groupId>   
4 <artifactId>lombok</artifactId>   
5 <version>1.16.10</version>   
6 </dependency>
```

```txt
1 @Data //GET,SET,String，有参，无参构造  
2 public class Teacher {  
3     private int id;  
4     private String name;  
5 }
```

4. 编写实体类对应的Mapper接口【两个】

```txt
1 @Data   
2 public class Student {   
3 private int id;   
4 private String name;   
5 //多个学生可以是同一个老师，即多对一   
6 private Teacher teacher;   
7 }   
8
```

无论有没有需求，都应该写上，以备后来之需！

```java
1 public interface StudentMapper { 2 }
```

5. 编写Mapper接口对应的 mapper.xml配置文件【两个】

```typescript
public interface TeacherMapper { }
```

无论有没有需求，都应该写上，以备后来之需！

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.kuang mapper.StudentMapper">  
</mapper>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.kuang mapper.TeacherMapper">  
</mapper>
```

# 8.3、按查询嵌套处理

1. 给StudentMapper接口增加方法

1 //获取所有学生及对应老师的信息  
2 public List<Student> getStudents();

2. 编写对应的Mapper文件

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "--/mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.kuang mapper.StudentMapper">  
<!--  
需求：获取所有学生及对应老师的信息  
思路：  
1. 获取所有学生的信息  
2. 根据获取的学生信息的老师ID->获取该老师的信息  
3. 思考问题，这样学生的结果集中应该包含老师，该如何处理呢，数据库中我们一般使用关联查询？  
1. 做一个结果集映射：StudentTeacher  
2. StudentTeacher结果集的类型为Student  
3. 学生中老师的属性为teacher，对应数据库中为tid。多个[1,...）学生关联一个老师  $\Rightarrow$  一对一，一对多  
4. 查看官网找到：association - 一个复杂类型的关联；使用它来处理关联查询  
-->  
<select id="getStudents" resultMap="StudentTeacher">select * from student</select>  
<resultMap id="StudentTeacher" type="Student">  
<!--association关联属性 property属性名 javaType属性类型 column在多的一方的表中的列名-->  
<association property="teacher" column="tid"��="Teacher"select="getTeacher"/>  
</resultMap>  
<!--  
这里传递过来的id，只有一个属性的时候，下面可以写任何值  
association中column多参数配置：column={key=value,key=value}"  
其实就是键值对的形式，key是传给下个sql的取值名称，value是片段一中sql查询的字段名。  
-->  
<select id="getTeacher" resultType="teacher">select * from teacher where id = #{id}  
</select>  
</mapper>
```

3. 编写完毕去Mybatis配置文件中，注册Mapper！
4. 注意点说明：

5. 测试

```txt
1 <resultMap id="StudentTeacher" type="Student">   
2 --association关联属性 property属性名 javaType属性类型 column在多的一方 的表中的列名-->   
3 <association property="teacher" column="{"id=tid,name=tid}" javaType="Teacher" select="getTeacher"/>   
4 </resultMap>   
5 <!--   
6 这里传递过来的id，只有一个属性的时候，下面可以写任何值   
7 association中column多参数配置： column={key=value,key=value}" 其实就是键值对的形式，key是传给下个sql的取值名称，value是片段一中sql查询的字段 名。   
10 -->   
11 <select id="getTeacher"��type="teacher"> select * from teacher where id = #{id} and name = #{name}   
12   
13 </select>
```

```java
1 @Test   
2 public void testGetStudents(){   
3 SQLsession session  $=$  Mybatis.utilssessiion();   
4 StudentMapper mapper  $=$  session Mapper(StudentMapper.class);   
5 List<Student> students  $=$  mapper.getStudents();   
6 for (Student student : students){ System.out.println( "学生名:"  $^+$  student.getName() +"\t老师:"  $^+$  student.getTeacher(). getName());   
10   
11   
12 }   
13 1
```

# 8.4、按结果嵌套处理

除了上面这种方式，还有其他思路吗？

我们还可以按照结果进行嵌套处理；

1. 接口方法编写

```java
1 public List<Student> getStudents2();
```

2. 编写对应的mapper文件

```txt
1 <--  
2 按查询结果嵌套处理  
3 思路：  
4 1. 直接查询出结果，进行结果集的映射  
5 -->  
6 <select id="getStudents2" resultMap="StudentTeacher2">  
7 select s.id sid, s.name sname, t.name tname  
8 from student s, teacher t  
9 where s.tid = t.id  
10 </select>  
11  
12 <resultMap id="StudentTeacher2" type="Student">  
13 <id property="id" column="sid"/>
```

```txt
14 <result property="name" column="sname"/>   
15 <!--关联对象property 关联对象在Student实体类中的属性-->   
16 <association property="teacher"��  $\equiv$  "Teacher">   
17 <result property="name" column="tname"/>   
18 </association>   
19 </resultMap>
```

3. 去mybatis-config文件中注入【此处应该处理过了】
4. 测试

```java
1 @Test   
2 public void testGetStudents2(){   
3 SQLsession session  $=$  Mybatis.utils.getConnection();   
4 StudentMapper mapper  $=$  session Mapper(StudentMapper.class);   
5 List<Student> students  $=$  mapper.getStudents2();   
6 for (Student student : students){ System.out.println( "学生名:"  $^+$  student.getName() +"\t老师:"  $^+$  student.getTeacher(). getName());   
10   
11   
12 }   
13 }
```

# 8.5、小结

- 按照查询进行嵌套处理就像SQL中的子查询
- 按照结果进行嵌套处理就像SQL中的联表查询

# 9、一对多的处理

一对多的理解：

- 一个老师拥有多个学生
- 如果对于老师这边，就是一个一对多的现象，即从一个老师下面拥有一群学生（集合）！

# 9.1、实体类编写

```txt
1 @Data   
2 public class Student {   
3 private int id;   
4 private string name;   
5 private int tid;   
6 }
```

```txt
1 @Data   
2 public class Teacher {   
3 private int id;   
4 private String name;   
5 //一个老师多个学生   
6 private List培养学生；   
7 }
```

......和之前一样，搭建测试的环境！

# 9.2、按结果嵌套处理

1. TeacherMapper接口编写方法

```txt
1 //获取指定老师，及老师下的所有学生  
2 public Teacher getTeacher(int id);
```

2. 编写接口对应的Mapper配置文件

```xml
<mapper namespace="com.kuang mapper.TeacherMapper"> <--思路： 1.从学生表和老师表中查出学生id，学生姓名，老师姓名 2.对查询出来的操作做结果集映射 1. 集合的话，使用collection! 【JavaType和ofType都是用来指定对象类型的 【JavaType是用来指定pojo中属性的类型 ofType指定的是映射到list集合属性中pojo的类型。 11 --> <select id="getTeacher" resultMap="TeacherStudent"> select s.id sid，s.name sname，t.name tname，t.id tid from student s,teacher t where s.tid  $=$  t.id and t.id  $\equiv$  #{id} </select> <resultMap id="TeacherStudent" type="Teacher"> <result property  $\coloneqq$  "name" column  $\equiv$  "tname"/> <collection property  $\equiv$  "students" ofType  $\equiv$  "Student"> <result property  $\equiv$  "id" column  $\equiv$  "sid"/> <result property  $\equiv$  "name" column  $\equiv$  "sname"/> <result property  $\equiv$  "tid" column  $\equiv$  "tid"/> </collection> </resultMap> </mapper>
```

3. 将Mapper文件注册到MyBatis-config文件中

```xml
1 <mappers>   
2 <mapper resource  $=$  "mapper/TeacherMapper.xm1"/>   
3 </mappers>
```

4. 测试

```java
1 @Test   
2 public void testGetTeacher(){   
3     SqISession session  $=$  Mybatis Utilities次会议();   
4         TeacherMapper mapper  $=$  session Mapper(TeacherMapper.class);   
5         Teacher teacher  $=$  mapper.getTeacher(1);   
6         System.out.println(teacher.getName());   
7         System.out.println(teacher.getStudents());   
8 }
```

# 9.3、按查询嵌套处理

1. TeacherMapper接口编写方法

```txt
1 public Teacher getTeacher2(int id);
```

2. 编写接口对应的Mapper配置文件

```txt
1 <select id="getTeacher2" resultMap="TeacherStudent2"> select * from teacher where id = #{id} </select>   
4 <resultMap id="TeacherStudent2" type="Teacher"> <!--column是一对多的外键，写的是一的主键的列名--> <collection property="students"��Type="ArrayList" ofType="Student" column="id" select="getStudentByTeacherId"/> </resultMap>   
8 <select id="getStudentByTeacherId" resultType="Student"> select * from student where tid = #{id} </select>
```

3. 将Mapper文件注册到MyBatis-config文件中

4. 测试

```java
1 @Test   
2 public void testGetTeacher2(){   
3 SQLsession session  $=$  Mybatis Utilities.getConnection();   
4 TeacherMapper mapper  $=$  session Mapper(TeacherMapper.class);   
5 Teacher teacher  $=$  mapper.getTeacher2(1);   
6 System.out.println(teacher.getName());   
7 System.out.println(teacher.getStudents());   
8 }
```

# 9.4、小结

1. 关联-association
2. 集合-collection
3. 所以association是用于一对一和多对一，而collection是用于一对多的关系
4. JAVA和ofType都是用来指定对象类型的

- JavaType是用来指定pojo中属性的类型  
  -o ofType指定的是映射到list集合属性中pojo的类型。

# 注意说明：

1. 保证SQL的可读性，尽量通俗易懂
2. 根据实际要求，尽量编写性能更高的SQL语句
3. 注意属性名和字段不一致的问题
4. 注意一对多和多对一中：字段和属性对应的问题
5. 尽量使用Log4j，通过日志来查看自己的错误

# 10、动态SQL

# 10.1、介绍

什么是动态SQL：动态SQL指的是根据不同的查询条件，生成不同的Sql语句。

```txt
1 官网描述： MyBatis 的强大特性之一便是它的动态 SQL。如果你有使用 JDBC 或其它类似框架的经验，你 就能体会到根据不同条件拼接 SQL 语句的痛苦。例如拼接时要确保不能忘记添加必要的空格，还要注意 去掉列表最后一个列名的逗号。利用动态 SQL 这一特性可以彻底摆脱这种痛苦。 虽然在以前使用动态 SQL 并非一件易事，但正是 MyBatis 提供了可以被用在任意 SQL 映射语 句中的强大的动态 SQL 语言得以改进这种情形。 动态 SQL 元素和 JSTL 或基于类似 XML 的文本处理器相似。在 MyBatis 之前的版本中，有 很多元素需要花时间了解。MyBatis 3 大大精简了元素种类，现在只需学习原来一半的元素便可。 MyBatis 采用功能强大的基于 OGNL 的表达式来淘汰其它大部分元素。 - if -choose (when, otherwise) -trim (where, set) - foreach
```

我们之前写的 SQL 语句都比较简单，如果有比较复杂的业务，我们需要写复杂的 SQL 语句，往往需要拼接，而拼接
SQL，稍微不注意，由于引号，空格等缺失可能都会导致错误。

那么怎么去解决这个问题呢？这就要使用mybatis动态SQL，通过if,choose,when,otherwise,trim,where,set,foreach等标签，可组合成非常灵活的SQL语句，从而在提高SQL语句的准确性的同时，也大大提高了开发人员的效率。

# 10.2、搭建环境

# 新建一个数据库表：blog

字段：id，title，author，create_time，views

```sql
1 CREATE TABLE `blog` (  
2 `id` varchar(50) NOT NULL COMMENT '博客id',  
3 `title` varchar(100) NOT NULL COMMENT '博客标题',  
4 `author` varchar(30) NOT NULL COMMENT '博客作者',  
5 `create_time` datetime NOT NULL COMMENT '创建时间',  
6 `views` int(30) NOT NULL COMMENT '浏览量'  
7 ) ENGINE=InnoDB DEFAULT CHARACTER=utf8
```

1. 创建Mybatis基础工程

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538393.jpg)

# 2. IDutil工具类

```java
1 public class IDUtil {
2     public static String genId(){
3         return UUID.randomUUID().toString().replaceAll("\\-","");
5         }
6
7 }
```

# 3. 实体类编写 【注意set方法作用】

```java
1 import java.util.Date;   
2   
3 public class Blog {   
4   
5 private String id;   
6 private String title;   
7 private String author;   
8 private DatecreateTime;   
9 private int views;   
10 //set, get...   
11 }
```

# 4. 编写Mapper接口及xml文件

```cs
public interface BlogMapper {
    }
}
```

# 5. mybatis核心配置文件，下划线驼峰自动转换

```xml
1 <settings>   
2 <setting name  $\equiv$  "mapUnderscoreToCamelCase"value  $\equiv$  "true"/>   
3 <setting name  $\equiv$  "logImpl"value  $\equiv$  "STDOUT_LOGGING"/>   
4 </settings>   
5 <!--注册Mapper.xml-->   
6 <mappers>   
7 <mapper resource  $\equiv$  "mapper/BlogMapper.xml"/>   
8 </mappers>
```

# 6. 插入初始数据

# 编写接口

```javascript
1 //新增一个博客  
2 int addBlog(Blog blog);
```

# sql配置文件

```txt
1 <insert id="addBlog" parameterType="blog">   
2 insert into blog (id, title, author, create_time, views)   
3 values (#{id},#, {title},#, {author},#, {createTime},#, {views});   
4 </insert>
```

# 初始化博客方法

```java
1 @Test   
2 public void addInitBlog(){   
3 SQLsession session  $=$  Mybatisutilssessiion();   
4 BlogMapper mapper  $=$  session Mapper(BlogMapper.class);   
5   
6 Blog blog  $=$  new Blog();   
7 blog.setld(IDutil.getId());   
8 blog.setTitle("Mybatis如此简单");   
9 blog.setAuthor("狂神说");   
10 blog.setCreateTime(new Date());   
11 blog.setviews(9999);   
12   
13 mapper.addBlog.blog);   
14   
15 blog.setld(IDutil.getId());   
16 blogsetTitle("Java如此简单");   
17 mapper.addBlog.blog);   
18   
19 blog.setld(IDutil.getId());   
20 blogsetTitle("Spring如此简单");   
21 mapper.addBlog.blog);   
22   
23 blog.setld(IDutil.getId());   
24 blogsetTitle("微服务如此简单");   
25 mapper.addBlog.blog);   
26   
27 session.close();   
28 }
```

# 10.3、if语句

需求：根据作者名字和博客名字来查询博客！如果作者名字为空，那么只根据博客名字查询，反之，则根据作者名来查询

# 1. 编写接口类

```txt
1 //需求1  
2 List Blog> queryBlogIf(Map map);
```

# 2. 编写SQL语句

```txt
1 <--需求1:  
2 根据作者名字和博客名字来查询博客！  
3 如果作者名字为空，那么只根据博客名字查询，反之，则根据作者名来查询  
4 select * from blog where title = #{title} and author = #{author}  
5 -->  
6 <select id="queryBlogIf" parameterType="map" resultType="blog">  
7 select * from blog where  
8 <if test="title != null">  
9 title = #{title}  
10 </if>  
11 <if test="author != null">  
12 and author = #{author}  
13 </if>  
14 </select>
```

# 3. 测试

```java
1 @Test   
2 public void testQueryBlogIf(){   
3 SQLsession session  $=$  Mybatis Utilities.getSession();   
4 BlogMapper mapper  $=$  session Mapper(BlogMapper.class);   
5   
6 HashMap<String,String> map  $=$  new HashMap<String,String>();   
7 map.put("title","Mybatis如此简单");   
8 map.put("author","狂神说");   
9 List<Blog> blogs  $=$  mapper(queryBlogIf(map);   
10   
11 System.out.println(blogs);   
12   
13 session.close();   
14 }
```

这样写我们可以看到，如果author等于null，那么查询语句为select  $\ast$  fromuserwhere title  $=$
#{title},但是如果title为空呢？那么查询语句为select  $\ast$  fromuserwhereandauthor  $=$
#{author}，这是错误的SQL语句，如何解决呢？请看下面的where语句！

# 10.4、Where

修改上面的SQL语句；

```txt
1 <select id="queryBlogIf" parameterType  $=$  "map" resultType  $\coloneqq$  "blog">   
2 select \* from blog   
3 <where> <if test  $\equiv$  "title != null"> title  $=$  #{title}   
6 </if> <if test  $\equiv$  "author != null"> and author  $=$  #{author}   
9 </if>   
10 </where>   
11 </select>
```

这个“where”标签会知道如果它包含的标签中有返回值的话，它就插入一个‘where’。此外，如果标签返回的内容是以AND或OR开头的，则它会剔除掉。【这是我们使用的最多的案例】

# 10.5、Set

同理，上面的对于查询 SQL 语句包含 where 关键字，如果在进行更新操作的时候，含有 set 关键词，我们怎么处理呢？

# 1. 编写接口方法

1 int updateBlog(Map map);

# 2.sql配置文件

```txt
1 <--注意set是用的逗号隔开--->   
2 <update id="updateBlog" parameterType="map">   
3 update blog   
4 <set>   
5 <if test  $=$  "title != null">   
6 title  $=$  #{title},   
7 </if>   
8 <if test  $=$  "author != null">   
9 author  $=$  #{author}   
10 </if>   
11 </set>   
12 where id  $=$  #{id};   
13 </update>
```

# 3. 测试

```java
1 @Test   
2 public void testUpdateBlog(){   
3 SQLsession session  $=$  MybatisUtilssessiion();   
4 BlogMapper mapper  $=$  session Mapper(BlogMapper.class);   
5   
6 HashMap<String,String> map  $=$  new HashMap<String,String>();   
7 map.put("title","动态SQL");   
8 map.put("author","秦疆");   
9 map.put("id","9d6a763f5e1347cebda43e2a32687a77");   
10   
11 mapper.updateBlog(map);   
12   
13   
14 session.close();   
15 }
```

# 10.6、choose语句

有时候，我们不想用到所有的查询条件，只想选择其中的一个，查询条件有一个满足即可，使用choose标签可以解决此类问题，类似于Java的switch语句

# 1. 编写接口方法

```javascript
1 List<Blog> queryBlogChoose(Map map);
```

# 2. sql配置文件

```html
1 <select id="queryBlogChoose" parameterType="map" resultType="blog"> 2 select * from blog 3 <where> 4 <choose> 5 <when test="title != null"> 6 title = #{title} 7 </when> 8 <when test="author != null"> 9 and author = #{author} 10 </when> 11 <otherwise> 12 and views = #{views} 13 </otherwise> 14 </choose> 15 </where> 16 </select>
```

# 3. 测试类

```java
1 @Test   
2 public void testQueryBlogChoose(){   
3 SQLsession session  $\equiv$  Mybatis Utilities.getSession();   
4 BlogMapper mapper  $=$  session Mapper(BlogMapper.class);   
5   
6 HashMap<String,object> map  $\equiv$  new HashMap<String,object>();   
7 map.put("title","Java如此简单");   
8 map.put("author","狂神说");   
9 map.put("views",9999);   
10 List Blog> blogs  $\equiv$  mapper(queryBlogChoose(map);   
11 System.out.println(blogs);   
12   
13   
14 session.close();   
15 }
```

【演示】SQL分析

# 10.7、SQL片段

有时候可能某个 sql 语句我们用的特别多，为了增加代码的重用性，简化代码，我们需要将这些代码抽取出来，然后使用时直接调用。

# 提取SQL片段：

引用SQL片段：

```html
1 <sql id="if-title-author">   
2 <if test="title != null">   
3 title = #{title}   
4 </if>   
5 <if test="author != null">   
6 and author = #{author}   
7 </if>   
8 </sql>
```

```txt
select id="queryBlogIf" parameterType="map" resultType="blog">
    select * from blog
    <where>
        <!-- 引用 sql 片段，如果refid 指定的不在本文件中，那么需要在前面加上 namespace */
    <!-- 在这里还可以引用其他的 sql 片段 -->
</where>
</select>
```

注意：①、最好基于单表来定义 sql 片段，提高片段的可重用性

(2) 在 sql 片段中不要包括 where

# 10.8、Foreach

将数据库中前三个数据的id修改为1,2,3;

需求：我们需要查询 blog 表中 id 分别为 1,2,3 的博客信息

1. 编写接口

```txt
1 List<Blog> queryBlogForeach(Map map);
```

2. 编写SQL语句

```html
1 <select id="queryBlogForeach" parameterType="map" resultType="blog"> 2 select * from blog 3 <where> 4 <!-- collection:指定输入对象中的集合属性 5 6 item:每次遍历生成的对象 7 open:开始遍历时的拼接字符串 8 close:结束时拼接的字符串 9 separator:遍历对象之间需要拼接的字符串 10 select * from blog where 1=1 and (id=1 or id=2 or id=3) 11 -- > 12 <foreach collection="ids" item="id" open="and ("close=")" separator="or"> 13 id=#{id} 14 </foreach> 15 </where> 16 </select>
```

3. 测试

```java
1 @Test   
2 public void testQueryBlogForeach(){   
3 SQLsession session  $=$  MybatisUtils.getSession();   
4 BlogMapper mapper  $=$  session Mapper(BlogMapper.class);   
5   
6 HashMap map  $=$  new HashMap();   
7 ListInteger> ids  $=$  new ArrayList<Integer>();   
8 ids.add(1);   
9 ids.add(2);   
10 ids.add(3);   
11 map.put("ids",ids);   
12   
13 List<Blog> blogs  $=$  mapper(queryBlogForeach(map);   
14 System.out.println(blogs);   
15   
16   
17 session.close();   
18 }
```

小结：其实动态 sql 语句的编写往往就是一个拼接的问题，为了保证拼接准确，我们最好首先要写原生的 sql 语句出来，然后在通过
mybatis 动态sql 对照着改，防止出错。多在实践中使用才是熟练掌握它的技巧

# 11、缓存

# 11.1、简介

1. 什么是缓存 [Cache]？

○ 存在内存中的临时数据。

- 将用户经常查询的数据放在缓存（内存）中，用户去查询数据就不用从磁盘上(关系型数据库数据文件)
  查询，从缓存中查询，从而提高查询效率，解决了高并发系统的性能问题。

2. 为什么使用缓存？

• 减少和数据库的交互次数，减少系统开销，提高系统效率。

3. 什么样的数据能使用缓存？

经常查询并且不经常改变的数据。

# 11.2、Mybatis缓存

- MyBatis包含一个非常强大的查询缓存特性，它可以非常方便地定制和配置缓存。缓存可以极大的提升查询效率。
- MyBatis系统中默认定义了两级缓存：一级缓存和二级缓存

默认情况下，只有一级缓存开启。(SqlSession级别的缓存，也称为本地缓存)  
○ 二级缓存需要手动开启和配置，他是基于namespace级别的缓存。  
为了提高扩展性，MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存

# 11.3、一级缓存

- 一级缓存也叫本地缓存：

○ 与数据库同一次会话期间查询到的数据会放在本地缓存中。  
。以后如果需要获取相同的数据，直接从缓存中拿，没必要再去查询数据库；

# 11.3.1、初体验测试

1. 在mybatis中加入日志，方便测试结果
2. 编写接口方法

```javascript
1 //根据id查询用户  
2 User queryUserID(@Param("id") int id);
```

3. 接口对应的Mapper文件

```txt
1 <select id="queryUserID" resultType="user"> 2 select * from user where id = #{id} 3 </select>
```

4. 测试

```txt
1 @Test   
2 public void testQueryUserId(){   
3 SQLsession session  $=$  Mybatis.utils.Session();   
4 用户Mapper mapper  $=$  session Mapper(UserMapper.class);   
5   
6 User user  $=$  mapper(queryUserId(1);   
7 System.out.println(user);   
8 User user2  $=$  mapper.queryUserId(1);   
9 System.out.println(user2);   
10 System.out.println(user==user2);   
11   
12 session.close();   
13 }
```

5. 结果分析

```txt
Opening JDBC Connection  
Created connection 1205555397.  
Setting autocommit to false on JDBC Connection [com.mysql.jdbc.JDBC4Connection@47db50c5]  
 $\Rightarrow$  Preparing: select * from user where id = ?  
 $\Rightarrow$  Parameters: 1(Integer)  
<== Columns: id, name, pwd  
<== Row: 1, 秦疆, asdfgh  
<== Total: 1  
User(id=1, name=秦疆, pwd=asdfgh)  
User(id=1, name=秦疆, pwd=asdfgh)  
true  $\rightarrow$  用的是同一个对象  
Resetting autocommit to true on JDBC Connection [com.mysql.jdbc.JDBC4Connection@47db50c5]  
Closing JDBC Connection [com.mysql.jdbc.JDBC4Connection@47db50c5]  
Returned connection 1205555397 to pool.
```

# 11.3.2、一级缓存失效的四种情况

- 一级缓存是SqlSession级别的缓存，是一直开启的，我们关闭不了它；
- 一级缓存失效情况：没有使用到当前的一级缓存，效果就是，还需要再向数据库中发起一次查询请求！

1. sqlSession不同

```java
1 @Test   
2 public void testQueryUserId(){   
3     SqISession session  $=$  MybatisUtils次会议();   
4         SqISession session2  $=$  MybatisUtils次会议();   
5             UserMapper mapper  $=$  session Mapper(UserMapper.class);   
6             UserMapper mapper2  $=$  session2 Mapper(UserMapper.class);   
7   
8         User user  $=$  mapper(queryUserId(1);   
9         System.out.println(user);   
10         User user2  $=$  mapper2.queryUserId(1);   
11         System.out.println(user2);   
12         System.out.println(user==user2);   
13   
14         session.close();   
15         session2.close();   
16 }
```

观察结果：发现发送了两条SQL语句！

结论：每个sqlSession中的缓存相互独立

2. sqlSession相同，查询条件不同

```java
1 @Test   
2 public void testQueryUserId(){   
3 SQLsession session  $=$  Mybatisutilssessiion();   
4 用户Mapper mapper  $=$  session Mapper(UserMapper.class);   
5 用户Mapper mapper2  $=$  session Mapper(UserMapper.class);   
6   
7 User user  $=$  mapper(queryUserId(1);   
8 System.out.println(user);   
9 User user2  $=$  mapper2.queryUserId(2);   
10 System.out.println(user2);   
11 System.out.println(user==user2);   
12   
13 session.close();   
14 }
```

观察结果：发现发送了两条SQL语句！很正常的理解

结论：当前缓存中，不存在这个数据

3. sqlSession相同，两次查询之间执行了增删改操作！

增加方法

```javascript
1 //修改用户  
2 int updateUser(Map map);
```

编写SQL

```txt
1 <update id="updateUser" parameterType="map">   
2 update user set name  $=$  #{name} where id  $=$  #{id}   
3 </update>
```

测试

```java
1 @Test   
2 public void testQueryUserId(){   
3 SQLSession session  $=$  Mybatis Utilities.getConnection();
```

```txt
4 用户Mapper mapper  $=$  session Mapper(UserMapper.class);   
5   
6 User user  $=$  mapper(queryUserId(1);   
7 System.out.println(user);   
8   
9 HashMap map  $=$  new HashMap();   
10 map.put("name","kuangshen");   
11 map.put("id",4);   
12 mapper.updateUser(map);   
13   
14 User user2  $=$  mapper.queryUserId(1);   
15 System.out.println(user2);   
16 System.out.println(user==user2);   
17   
18   
19 session.close();   
20 }
```

观察结果：查询在中间执行了增删改操作后，重新执行了

结论：因为增删改操作可能会对当前数据产生影响

4. sqlSession相同，手动清除一级缓存

```txt
1 @Test   
2 public void testQueryUserId(){ SQLsession session  $=$  MybatisUtils.Session(); 用户Mapper mapper  $=$  session Mapper(UserMapper.class); User user  $=$  mapper(queryUserId(1); System.out.println(user); session.clearCache();//手动清除缓存   
10   
11 User user2  $=$  mapper.queryUserId(1); System.out.println(user2); System.out.println(user==user2);   
15   
16 session.close();   
17 }
```

一级缓存就是一个map

# 11.4、二级缓存

- 二级缓存也叫全局缓存，一级缓存作用域太低了，所以诞生了二级缓存
- 基于namespace级别的缓存，一个名称空间，对应一个二级缓存；
- 工作机制

。一个会话查询一条数据，这个数据就会被放在当前会话的一级缓存中；  
如果当前会话关闭了，这个会话对应的一级缓存就没了；但是我们想要的是，会话关闭了，一级缓存中的数据被保存到二级缓存中；  
• 新的会话查询信息，就可以从二级缓存中获取内容；  
○ 不同的mapper查出的数据会放在自己对应的缓存（map）中；

# 11.4.1、使用步骤

1. 开启全局缓存【mybatis-config.xml】

```html
1 <setting name="cacheEnabled" value="true"/>
```

2. 去每个mapper.xml中配置使用二级缓存，这个配置非常简单；【xxxMapper.xml】

```txt
1 <cache/>   
2   
3 官方示例  $\equiv \equiv = = = = = >$  查看官方文档   
4 <cache>   
5 eviction  $=$  "FIFO"   
6 flushInterval  $\coloneqq$  "60000"   
7 size  $\coloneqq$  "512"   
8 readonly  $\coloneqq$  "true"/>   
9 这个更高级的配置创建了一个 FIFO 缓存，每隔 60 秒刷新，最多可以存储结果对象或列表的 512 个引用，而且返回的对象被认为是只读的，因此对它们进行修改可能会在不同线程中的调用者产生冲突。
```

3. 代码测试

○ 所有的实体类先实现序列化接口  
测试代码

```java
1 @Test   
2 public void testQueryUserId(){   
3 SQLsession session  $=$  MybatisUtils次会议();   
4 SQLsession session2  $=$  MybatisUtils次会议();   
5   
6 用户Mapper mapper  $=$  session Mapper(UserMapper.class);   
7 用户Mapper mapper2  $=$  session2 Mapper(UserMapper.class);   
8   
9 User user  $=$  mapper(queryUserId(1);   
10 System.out.println(user);   
11 session.close();   
12   
13 User user2  $=$  mapper2.queryUserId(1);   
14 System.out.println(user2);   
15 System.out.println(user==user2);   
16   
17 session2.close();   
18 }
```

# 11.4.2、结论

- 只要开启了二级缓存，我们在同一个Mapper中的查询，可以在二级缓存中拿到数据
- 查出的数据都会被默认先放在一级缓存中
- 只有会话提交或者关闭以后，一级缓存中的数据才会转到二级缓存中

# 11.5、缓存原理

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129151538394.jpg)

# 11.6、EhCache

第三方缓存实现--EhCache: 查看百度百科

- 官方文档
- Ehcache是一种广泛使用的java分布式缓存，用于通用缓存；  
  要在应用程序中使用Ehcache，需要引入依赖的jar包

```xml
1 <--https://mvmrepository.com/artifact/org.mybatis.caches/mybatis-ehcache -->   
2 <dependency>   
3 <groupId>org.mybatis.caches</groupId>   
4 <artifactId>mybatis-ehcache</artifactId>   
5 <version>1.1.0</version>   
6 </dependency>
```

- 在mapper.xml中使用对应的缓存即可

```html
1 <mapper namespace  $=$  "org.acme.FooMapper">   
2 <cache type  $=$  "org.mybatis.caches.ehcache.EhcacheCache" />   
3 </mapper>
```

编写ehcache.xml文件，如果在加载时未找到 /ehcache.xml 资源或出现问题，则将使用默认配置。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
    updateCheck="false">
<!-- diskstore: 为缓存路径, ehcache分为内存和磁盘两级, 此属性定义磁盘的缓存位置。参数解释如下:
    user.home - 用户主目录
    user.dir - 用户当前工作目录
    java.io.tmpdir - 默认临时文件路径
--> <diskstore path="/tmpdir/Tmp_EhCache"/>
</xml>
```

```txt
<defaultCache  
    eternal="false"  
    maxElementsInMemory="10000"  
    overflowToDisk="false"  
    diskPersistent="false"  
    timeToIdleSeconds="1800"  
    timeToLiveSeconds="259200"  
    memoryStoreEvictionPolicy="LRU";//>  
<cache  
    name="cloud_user"  
    eternal="false"  
    maxElementsInMemory="5000"  
    overflowToDisk="false"  
    diskPersistent="false"  
    timeToIdleSeconds="1800"  
    timeToLiveSeconds="1800"  
    memoryStoreEvictionPolicy="LRU";//>  
</cache
```

defaultCache：默认缓存策略，当ehcache找不到定义的缓存时，则使用这个缓存策略。只能定义一个。

```txt
---> --<!--
```

name: 缓存名称。

maxElementsInMemory:缓存最大数目

maxElementsOnDisk：硬盘最大缓存个数。

eternal:对象是否永久有效，一但设置了，timeout将不起作用。

overflowToDisk:是否保存到磁盘，当系统当机时

timeToIdleSeconds:设置对象在失效前的允许闲置时间（单位：秒）。仅当

eternal=false对象不是永久有效时使用，可选属性，默认值是0，也就是可闲置时间无穷大。

timeToLiveSeconds: 设置对象在失效前允许存活时间（单位：秒）。最大时间介于创建时间和失效时间之间。仅当external=false对象不是永久有效时使用，默认是0.，也就是对象存活时间无穷大。

diskPersistent: 是否缓存虚拟机重启期数据 whether the disk store

persists between restarts of the Virtual Machine. The default value is false.

diskSpoolBufferSizeMB：这个参数设置DiskStore（磁盘缓存）的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区。

diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔，默认是120秒。

memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内存。默认策略是LRU（最近最少使用）。你可以设置为FIFO（先进先出）或是LFU（较少使用）。

clearOnFlush：内存数量最大时是否清除。

memoryStoreEvictionPolicy:可选策略有：LRU（最近最少使用，默认策略）、

FIFO（先进先出）、LFU（最少访问次数）。

FIFO, first in first out, 这个是大家最熟的，先进先出。

LFU, Less Frequently Used, 就是上面例子中使用的策略，直白一点就是讲一直以来最少被使用的。如上面所讲，缓存的元素有一个hit属性，hit值最小的将会被清出缓存。

LRU, Least Recently Used, 最近最少使用的, 缓存的元素有一个时间戳, 当缓存容量满了, 而又需要腾出地方来缓存新的元素的时候,
那么现有缓存元素中时间戳离当前时间最远的元素将被清出缓存。

```txt
-->
```

```twig
</ehcache>
```
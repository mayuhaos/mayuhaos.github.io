# Mybatis-Plus:hatching_chick::hatching_chick::hatching_chick:

::: tip 🐣🐣🐣

- **Mybatis-Plus框架来啦！！！**<br><br>
  本节主要讲了我们开发web项目最流行的操作数据库的框架MyBatis的进阶版~Plus <br>
  我们的数据库操作驱动（框架）的演变是这样的：<br>
  <h3>jdbc->MyBatis-><em style="color: red;">MyBatis-Plus</em>-></h3>
  学这节的时候我应该也是大三啦！
  学了这节，MyBatis就进阶啦！<br/>
  好就好在简单的增删改查全给封装好了，直接用！<br/>
  <br/>
- **看完本节可以利用MyBatis-Plus框架快速配置，更简单地操作数据库！<br/>** <br/>
- **<p style="color:red">冲冲冲~</p>

# 课程介绍

- 了解Mybatis-Plus  
  整合Mybatis-Plus
- 通用CRUD
- Mybatis-Plus的配置
- 条件构造器

# 1、了解Mybatis-Plus

# 1.1、Mybatis-Plus介绍

MyBatis-Plus（简称MP）是一个MyBatis的增强工具，在MyBatis的基础上只做增强不做改变，为简化开发、提高效率而生。

官网：https://mybatis-plus/或https://mp.baomidou.com/

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547169.jpg)  
MyBatis-Plus

为简化开发而生

快速开始  $\rightarrow$

# 润物无声

只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑。

# 效率至上

只需简单配置，即可快速进行CRUD操作，从而节省大量时间。

# 丰富功能

热加载、代码生成、分页、性能分析等功能一应俱全。

# 愿景

我们的愿景是成为 MyBatis 最好的搭档，就像 魂斗罗 中的 1P、2P，基友搭配，效率翻倍。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547170.jpg)  
JUST

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547171.jpg)  
LIKE

# TO BE THE BEST PARTNER OF MYBATIS

# 1.2、代码以及文档

文档地址：https://mybatis-plus/guide/

源码地址：https://github.com/baomidou/mybatis-plus

# 1.3、特性

- 无侵入：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- 损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- 强大的CRUD操作：内置通用Mapper、通用Service，仅仅通过少量配置即可实现单表大部分CRUD操作，更有强大的条件构造器，满足各类使用需求
- 支持 Lambda 形式调用：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- 支持多种数据库：支持MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer2005、SQLServer等多种数据库
- 支持主键自动生成：支持多达4种主键策略（内含分布式唯一ID生成器-Sequence），可自由配置，完美解决主键问题
- 支持 XML 热加载：Mapper 对应的 XML 支持热加载，对于简单的 CRUD 操作，甚至可以无 XML 启动
- 支持 ActiveRecord 模式：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- 支持自定义全局通用操作：支持全局通用方法注入（Write once, use anywhere）
- 支持关键词自动转义：支持数据库关键词（order、key……）自动转义，还可自定义关键词
- 内置代码生成器：采用代码或者 Maven 插件可快速生成 Mapper、Model、Service、Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- 内置分页插件：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- 内置性能分析插件：可输出Sql语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- 内置全局拦截插件：提供全表 delete、update 操作智能分析阻断，也可自定义拦截规则，预防误操作
- 内置Sql注入剥离器：支持Sql注入剥离，有效预防Sql注入攻击

# 1.4、架构

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547172.jpg)

# 1.5、作者

Mybatis-Plus是由baomidou（苞米豆）组织开发并且开源的，目前该组织大概有30人左右。

码云地址：https://gitee.com/organizations/baomidou

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547173.jpg)

# 2、快速开始

对于Mybatis整合MP有常常有三种用法，分别是Mybatis+MP、Spring+Mybatis+MP、Spring Boot+Mybatis+MP。

# 2.1、创建数据库以及表

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547174.jpg)

# -- 创建测试表

```sql
CREATE TABLE `tb_user` (  
    `id` `bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',  
    `user_name` varchar(20) NOT NULL COMMENT '用户名',  
    `password` varchar(20) NOT NULL COMMENT '密码',  
    `name` varchar(30) DEFAULT NULL COMMENT '姓名',  
    `age` int(11) DEFAULT NULL COMMENT '年龄',  
    `email` varchar(50) DEFAULT NULL COMMENT '邮箱',  
PRIMARY KEY ('id')  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT charset=utf8;
```

# -- 插入测试数据

```sql
INSERT INTO tb_user ('id', 'user_name', 'password', 'name', 'age', 'email') VALUES ('1', 'zhangsan', '123456', '张三', '18', 'test1@itcast.cn');  
INSERT INTO tb_user ('id', 'user_name', 'password', 'name', 'age', 'email') VALUES ('2', 'lisi', '123456', '李四', '20', 'test2@itcast.cn');  
INSERT INTO tb_user ('id', 'user_name', 'password', 'name', 'age', 'email') VALUES ('3', 'wangwu', '123456', '王五', '28', 'test3@itcast.cn');  
INSERT INTO tb_user ('id', 'user_name', 'password', 'name', 'age', 'email') VALUES ('4', 'zhaoliu', '123456', '赵六', '21', 'test4@itcast.cn');  
INSERT INTO tb_user ('id', 'user_name', 'password', 'name', 'age', 'email') VALUES ('5', 'sunqi', '123456', '孙七', '24', 'test5@itcast.cn');
```

# 2.2、创建工程

# IJ

# New Project

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547175.jpg)

GroupId cn.itcast.mp

Inherit

ArtifactId | itcast-mybatis-plus

Inherit

Version 1.0-SNAPSHOTOT

Previous

Next

Cancel

Help

# 导入依赖：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
		\xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		 $xsi:\$  {schemaLocation} = "http://maven.apache.org/POM/4.0.0)$
http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelversion>4.0.0</modelversion>
    <groupId>cn.itcast.mp</groupId>
    <artifactId>itcast-mybatis-plus</artifactId>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>itcast-mybatis-plus-simple</module>
    </modules>
    <packaging>pom</packaging>
    <dependencies>
        <!-- mybatis-plus插件依赖 -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus</artifactId>
            <version>3.1.1</version>
        </dependency>
    <!-- MySql -->
```

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>
<!-- 连接池 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.0.11</version>
</dependency>
<!-- 简化bean代码的工具包 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
    <version>1.18.4</version>
</dependency>
<dependency>
    <groupId>jenit</groupId>
    <artifactId>jenit</artifactId>
    <version>4.12</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.6.4</version>
</dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven/plugins</groupId>
            <artifactId>maven-plugin-plugin</artifactId>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

# 2.3、Mybatis + MP

下面演示，通过纯Mybatis与Mybatis-Plus整合。

# 2.3.1、创建子Module

```txt
1 <?xml version="1.0" encoding="UTF-8"?>
2 <project xmlns="http://maven.apache.org/POM/4.0.0"
```

log4j.properties :

```xml
3 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
4 xsi: schemaLocation="http://maven.apache.org/POM/4.0.0"  
http://maven.apache.org/xsd/maven-4.0.0.xsd">  
5 <parent> <artifactId>itcast-mybatis-plus</artifactId> <groupId>cn.itcast.mp</groupId> <version>1.0-SNAPSHOT</version> </parent> <modelversion>4.0.0</modelversion> <packaging>jar</packaging> <artifactId>itcast-mybatis-plus-simple</artifactId> </project>
```

```batch
1 log4j.rootLogger  $\equiv$  DEBUG,A1   
2   
3 log4j.append.A1  $\equiv$  org.apache.log4j(ConsoleAppender   
4 log4j.append.A1.layout  $\equiv$  org.apache.log4j.PatternLayout   
5 log4j.append.A1.layout.ConversionPattern  $= [\% t][\% c] - [\% p]$  %m%n
```

# 2.3.2、Mybatis实现查询User

第一步，编写mybatis-config.xml文件：  
第二步，编写User实体对象：（这里使用lombok进行了进化bean操作）

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE configuration  
PUBLIC "/~/mybatis.org//DTD Config 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-config.dtd">  
<configuration>  
<environments default="development">  
<environment id="development">  
<transactionManager type="JDBC"/>  
<dataSource type="POOLED">  
<property name="driver" value="com.mysql.jdbc.Driver"/>  
<property name="url" value="jdbc:mysql://127.0.0.1:3306/mp?useUnicode=true&amp;characterEncodingutf8&amp;autoReconnect=true&amp;allowMultiQuerie s=true&amp;useSSL=false"/>  
<property name="username" value="root"/>  
<property name="password" value="root"/>  
</dataSource>  
</environment>  
</environments>  
<mappers>  
<mapper resource="UserMapper.xml"/>  
</mappers>  
</configuration>
```

```txt
1 package cn.itcast.mp/simple.pojo;   
2   
3 import lombok.AllArgsConstructor;   
4 import lombok.Data;   
5 import lombok.NoArgsConstructor;   
6   
7 @Data   
8 @NoArgsConstructor   
9 @AllArgsConstructor   
10 public class User {   
11   
12 private Long id;   
13 private String userName;   
14 private String password;   
15 private String name;   
16 private Integer age;   
17 private String email;   
18 }   
19
```

# 第三步，编写UserMapper接口：

```java
1 package cn.itcast.mp/simple mapper;   
2   
3 import cn.itcast.mp.simple.pojo.User;   
4   
5 import java.util.List;   
6   
7 public interface UserMapper {   
8 List<>findAll();   
9   
10   
11 }   
12
```

# 第四步，编写UserMapper.xml文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="cn.itcast.mp.simple.mapper.UserMapper">  
<select id="findAll" resultType="cn.itcast.mp/simple.pojo.User">  
select * from tb_user  
</select>  
</mapper>
```

# 第五步，编写TestMybatis测试用例：

测试结果：

```java
package cn.itcast.mp/simple;   
import cn.itcast.mp.simple.mapping.UserMapper;   
import cn.itcast.mp.simple.pojo.User;   
import org.apache. ibatis.i0. Resources;   
import org.apache. ibatis. session. SqSession;   
import org.apache. ibatis. session. SqSessionFactory;   
import org.apache. ibatis. session. SqSessionFactoryBuilder;   
import org. junit.Test;   
import java.io. InputStream;   
import java.util.List;   
public class TestMybatis { @Test public void testUserList(）throws Exception{ String resource  $=$  "mybatis-config.xml"; InputStream inputStream  $\equiv$  Resources.getResourceAsStream(resource);在线咨询Factory sqSessionFactory  $\equiv$  new在线咨询FactoryBuilder(）.build(inputStream); sqSession sqSession  $\equiv$  sqSessionFactory.openSession(); 用户Mapper userMapper  $\equiv$  sqSession.getMapper(UserMapper.class); List<User> list  $\equiv$  userMapper.findAll(); for (User user : list){ System.out.println(user); } 1
```

```txt
1 [main] [cn.itcast.mp.simple mapper.UserMapper.findAll]-[DEBUG]  $\equiv \equiv$  Parameters:   
2 [main] [cn.itcast.mp.simple mapper.UserMapper.findAll]-[DEBUG]  $<   =   =$  Total:5   
3 User(id=1，userName  $\equiv$  null，password  $\coloneqq$  123456，name  $\equiv$  张三，age  $\coloneqq$  18，email  $\equiv$  test1@itcast.cn)   
4 User(id=2，userName  $\equiv$  null，password  $\coloneqq$  123456，name  $\equiv$  李四，age  $\coloneqq$  20，email  $\equiv$  test2@itcast.cn)   
5 User(id=3，userName  $\equiv$  null，password  $\coloneqq$  123456，name  $\equiv$  王五，age  $\coloneqq$  28，email  $\equiv$  test3@itcast.cn)   
6 User(id=4，userName  $\equiv$  null，password  $\coloneqq$  123456，name  $\equiv$  赵六，age  $\coloneqq$  21，email  $\equiv$  test4@itcast.cn)   
7 User(id=5，userName  $\equiv$  null，password  $\coloneqq$  123456，name  $\equiv$  孙七，age  $\coloneqq$  24，email  $\equiv$  test5@itcast.cn)
```

# 2.3.3、Mybatis+MP实现查询User

第一步，将UserMapper继承BaseMapper，将拥有了BaseMapper中的所有方法：

```java
1 package cn.itcast.mp.simple mapper;   
2   
3 import cn.itcast.mp.simple.pojo.User;   
4 import com.baomidou.mybatisplus.core.mapper.BaseMapper;   
5   
6 import java.util.List;   
7   
8 public interface UserMapper extends BaseMapper{   
9 List<>findAll();   
10   
11   
12 }
```

第二步，使用MP中的MybatisSqlSessionFactoryBuilder进程构建：

```java
package cn.itcast.mp.simple;   
import cn.itcast.mp/simple)mapper.UserMapper;   
import cn.itcast.mp.simple.pojo.User;   
import com.baomidou.mybatisplus.core.MybatisSqlSessionFactoryBuilder;   
import org.apache. ibatis.io. Resources;   
import org.apache. ibatis.session.SqlSession;   
import org.apache. ibatis.session.SqlSessionFactory;   
import org.apache. ibatis.session.SqlSessionFactoryBuilder;   
import org. junit.Test;   
import java.io. InputStream;   
import java.util.List;   
public class TestMybatisPlus { @Test public void testUserList() throws Exception{ String resource \(=\) "mybatis-config.xml"; InputStream inputStream \(=\) Resources.getResourceAsStream(resource); //这里使用的是MP中的MybatisSqlSessionFactoryBuilder SQLSessionFactory sqlSessionFactory \(\equiv\) new MybatisSqlSessionFactoryBuilder().build(inputStream); \\(sqlSession sqlSession \)\equiv\( sqlSessionFactory.openSession(); UserMapper userMapper \(=\) sqlSession.getMapper(UserMapper.class); //可以调用BaseMapper中定义的方法 List<User> list \(=\) userMapper.selectList(null); for (User user : list){ System.out.println(user); }
```

# 运行报错：

```txt
ltParameterMap   
tting parameters   
password,name,age,emai FROM user   
tions.jdbc4.MySQLSyntaxErrorException:Table 'mp.user' doesn't exist   
ions.ExceptionFactory unwrapException(ExceptionFactory.java:30)   
n.default.DefaultSqlSession.selectList(DefaultSqlSession.java:150)   
n.default.DefaultSqlSession.selectList(DefaultSqlSession.java:141)   
.core.override.MybatisMapperMethod.ExecuteForMany(MybatisMapperMethod.java:168)   
core.override.MybatisMapperMethod.Execute(MybatisMapperMethod.java:82)   
core_override_MybatisMapperProxy.invoke(MybatisMapperProxy.java:61)<1 internal call>
```

解决：在User对象中添加@TableName，指定数据库表名

```java
@Data @NoArgsConstructor @AllArgsConstructor @TableName("tb_user") public class User { private Long id; private String userName; private String password; private String name; private Integer age; private String email; }
```

# 测试：

```txt
1 [main] [cn.itcast.mp/simple)mapper.UserMapper.selectList]-[DEBUG] => Preparing: SELECT id, user_name, password, name, age, email FROM tb_user  
2 [main] [cn.itcast.mp/simple)mapper.UserMapper.selectList]-[DEBUG] => Parameters:  
3 [main] [cn.itcast.mp/simple)mapper.UserMapper.selectList]-[DEBUG] <= Total: 5  
4 User(id=1, userName=zhangsan, password=123456, name=张三, age=18, email=test1@itcast.cn)  
5 User(id=2, userName=lisi, password=123456, name=李四, age=20, email=test2@itcast.cn)  
6 User(id=3, userName=wangwu, password=123456, name=王五, age=28, email=test3@itcast.cn)  
7 User(id=4, userName=zhaoliu, password=123456, name=赵六, age=21, email=test4@itcast.cn)  
8 User(id=5, userName=sunqi, password=123456, name=孙七, age=24, email=test5@itcast.cn)
```

# 简单说明：

- 由于使用了Mybatis.SqlSessionFactoryBuilder进行了构建，继承的BaseMapper中的方法就载入到了SqlSession中，所以就可以直接使用相关的方法；

# 如图：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547176.jpg)

# 2.4、Spring + Mybatis + MP

引入了Spring框架，数据源、构建等工作就交给了Spring管理。

# 2.4.1、创建子Module

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:schemaLocation="http://maven.apache.org/POM/4.0.0"
    http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>itcast-mybatis-plus</artifactId>
        <groupId>cn.itcast.mp</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelversion>4.0.0</modelversion>
    <artifactId>itcast-mybatis-plus-spring</artifactId>
    <properties>
        <spring.version>5.1.6.RELEASE</spring.version>
    </properties>
</xml>
```

```xml
18 <dependencies>   
19 <dependency>   
20 <groupId>org.springframework</groupId>   
21 <artifactId>spring-web MVC</artifactId>   
22 <version>\$\{spring.version\}</version>   
23 </dependency>   
24 <dependency>   
25 <groupId>org.springframework</groupId>   
26 <artifactId>spring-jdbc</artifactId>   
27 <version>\$\{spring.version\}</version>   
28 </dependency>   
29 <dependency>   
30 <groupId>org.springframework</groupId>   
31 <artifactId>spring-test</artifactId>   
32 <version>\$\{spring.version\}</version>   
33 </dependency>   
34 </dependencies>   
35   
36   
37 </project>
```

# 2.4.2、实现查询User

第一步，编写jdbc.properties

```batch
1 jdbc.driver=com.mysql.jdbc.Driver   
2 jdbc.url  $\equiv$  jdbc:mysql://127.0.0.1:3306/mp? useUnicode  $\equiv$  true&characterEncoding  $\equiv$  utf8&autoReconnect  $\equiv$  true&allowMultiQueries  $\equiv$  true&useSSL  $=$  false   
3 jdbc username  $\equiv$  root   
4 jdbc.password  $\equiv$  root
```

第二步，编写applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans">
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi: schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/contextspring-context.xsd">
    <context:property-placeholder location="classpath*:properties"/>
</context:property-placeholder location="classpath*:properties"/>
<!-- 定义数据源 -->
<bean id="dataSource" class="com.alibaba.druid.pool.D DruidDataSource"
destroy-method="close">
    <property name="url" value="/${jdbc.url}" />
    <property name="username" value="/${jdbc username}" />
    <property name="password" value="/${jdbc.password}" />
    <property name="driverClassName" value="/${jdbc.driver}" />
```

第三步，编写User对象以及UserMapper接口：

```html
19 <property name="maxActive" value="10"/>   
20 <property name="minIdle" value="5"/>   
21 </bean>   
22   
23 <!--这里使用MP提供的sqlSessionFactory，完成了Spring与MP的整合-->   
24 <bean id="sqlSessionFactory" class  $=$  "com.baomidou.mybatisplusextension.spring.MybatisSqlSessionFactoryBean"> <property name  $=$  "dataSource" ref  $=$  "dataSource"/>   
25 </bean>   
26   
27   
28 <!--扫描mapper接口，使用的依然是Mybatis原生的扫描器-->   
29 <bean class  $=$  "org.mybatis.spring mapper MapperScannerConfigurer"> <property name  $=$  "basePackage" value  $=$  "cn.itcast.mp/simple.mapper"/>   
30   
31   
32   
33 </beans>   
34
```

```java
1 package cn.itcast.mp/simple.pojo;   
2   
3 import com.baomidou.mybatisplus.annotation.TableName;   
4 import lombok.AllArgsConstructor;   
5 import lombok.Data;   
6 import lombok.NoArgsConstructor;   
7   
8 @Data   
9 @NoArgsConstructor   
10 @AllArgsConstructor   
11 @TableName("tb_user")   
12 public class User {   
13 private Long id;   
15 private String userName;   
16 private String password;   
17 private String name;   
18 private Integer age;   
19 private String email;   
20 }
```

第四步，编写测试用例：

```typescript
1 package cn.itcast.mp.simple mapper;   
2   
3 import cn.itcast.mp.simple.pojo.User;   
4 import com.baomidou.mybatisplus.core mapper.BaseMapper;   
5   
6 public interface UserMapper extends BaseMapper{   
7   
8 }
```

测试：

```java
package cn.itcast.mp/simple;   
import cn.itcast.mp.simple mapper.UserMapper;   
import cn.itcast.mp.simple.pojo.user;   
import org.junit.Test;   
import org.junit runner.Runwith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.test.context.Configuration;   
import org.springframework.test.context{junit4.SpringJUnit4ClassRunner;   
import java.util.List;   
@RunWith(SpringJUnit4ClassRunner.class)   
@ContextConfigurationLocations  $\equiv$  "classpath:applicationContext.xml")   
public class TestSpringMP{ @Autowired private 用户UserMapper userMapper; @Test public void testSelectList(){ List<user> users  $=$  this.userMapper.selectList(null); for (User user : users){ System.out.println(user); } 1
```

```txt
[main] [cn.itcast.mp/simple)mapper.UserMapper.selectList]-[DEBUG] => Preparing:  
SELECT id, user_name, password, name, age, email FROM tb_user  
[main] [cn.itcast.mp/simple)mapper.UserMapper.selectList]-[DEBUG] => Parameters:  
[main] [cn.itcast.mp/simple)mapper.UserMapper.selectList]-[DEBUG] <= Total: 5  
[main] [org.mybatis.spring.SqlSessionUtils]-[DEBUG] Closing non transactional  
SqlSession [org.apache.ibatis.session.defaultDefaults.DefaultSqlSession@74287ea3]  
User(id=1, userName=zhangsan, password=123456, name=张三，age=18,  
email=test1@itcast.cn)  
User(id=2, userName=lisi, password=123456, name=李四，age=20，email=test2@itcast.cn)  
User(id=3, userName=wangwu, password=123456, name=王五，age=28，email=test3@itcast.cn)  
User(id=4, userName=zhaoliu, password=123456, name=赵六，age=21，email=test4@itcast.cn)  
User(id=5, userName=sunqi, password=123456, name=孙七，age=24，email=test5@itcast.cn)
```

# 2.5、SpringBoot + Mybatis + MP

使用SpringBoot将进一步的简化MP的整合，需要注意的是，由于使用SpringBoot需要继承parent，所以需要重新创建工程，并不是创建子Module。

# 2.5.1、创建工程

# 1

# New Project

# X

GroupId

cn.itcast.mp

Inherit

ArtifactId

itcast-mp-springboot

Version

1.0-SNAPSHOT

Previous

Next

Cancel

Help

# 2.5.2、导入依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
		\xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0"
http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelversion>4.0.0</modelversion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.4.RELEASE</version>
    </parent>
    <groupId>cn.itcast.mp</groupId>
    <artifactId>itcast-mp-springboot</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
            <exclusions>
                <exclusion>
```

```xml
<groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-logging</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-test</artifactId> <scope>test</scope> </dependency>   
<!--简化代码的工具包-->   
<dependency> <groupId>org.projectlombok</groupId> <artifactId>lombok</artifactId> <optional>true</optional> </dependency>   
<!--mybatis-plus的springboot支持-->   
<dependency> <groupId>com.baomidou</groupId> <artifactId>mybatis-plus-boot-starter</artifactId> <version>3.1.1</version> </dependency>   
<!--mysqI驱动-->   
<dependency> <groupId>mysql</groupId> <artifactId>mysql-connector-java</artifactId> <version>5.1.47</version>   
</dependency>   
<dependency> <groupId>org.slf4j</groupId> <artifactId>slf4j-log4j12</artifactId> </dependency>   
</dependencies>   
<build> <plugins> <plugin> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-maven-plugin</artifactId> </plugin> </plugins> </build>
```

log4j.properties :

```batch
1 log4j.rootLogger  $\equiv$  DEBUG,A1   
2   
3 log4j.append.A1=org.apache.log4j(ConsoleAppender   
4 log4j.append.A1.layout  $\equiv$  org.apache.log4j.PatternLayout   
5 log4j.append.A1.layout.ConversionPattern  $=$  [%t] [%c]-[%p] %m%n
```

# 2.5.3、编写application.properties

```txt
1 spring.application.name  $=$  itcast-mp-springboot   
2   
3 springdatasource.driver-class-name  $\equiv$  com.mysql.jdbc.Driver   
4 springdatasource.url  $\equiv$  jdbc:mysql://127.0.0.1:3306/mp?   
useUnicode  $\equiv$  true&characterEncoding  $\equiv$  utf8&autoReconnect  $\equiv$  true&allowMultiQueries  $\equiv$  true&useSSL =false   
5 springdatasource username  $\equiv$  root   
6 springdatasource.password  $\equiv$  root
```

# 2.5.4、编写pojo

```java
1 package cn.itcast.mp.pojo;   
2   
3 import com.baomidou.mybatisplus. annotation.TableName;   
4 import lombok.AllArgsConstructor;   
5 import lombok.Data;   
6 import lombok.NoArgsConstructor;   
7   
8 @Data   
9 @NoArgsConstructor   
10 @AllArgsConstructor   
11 @tableName("tb_user")   
12 public class User {   
13   
14 private Long id;   
15 private String userName;   
16 private String password;   
17 private String name;   
18 private Integer age;   
19 private String email;   
20 }
```

# 2.5.5、编写mapper

```java
1 package cn.itcast.mp mapper;   
2   
3 import cn.itcast.mp.pojo.User;   
4 import com.baomidou.mybatisplus.core mapper.BaseMapper;   
5   
6 public interface UserMapper extends BaseMapper{   
7 }   
8
```

# 2.5.6、编写启动类

```java
1 package cn.itcast.mp;   
2   
3 import org.mybatis.spring.annotation MapperScan;   
4 import org.springframework.boot.SpringApplication;   
5 import org.springframework.boot.webApplicationType;   
6 import org.springframework.boot.autoconfigure.SpringBootApplication;   
7 import org.springframework.boot.builder.SpringApplicationBuilder;   
8   
9 @MapperScan("cn.itcast.mp mapper")//设置mapper接口的扫描包   
10 @SpringBootApplication   
11 public class MyApplication {   
12 public static void main(String[] args) { SpringApplication.run (MyApplication.class, args); }   
15   
16   
17 }
```

# 2.5.7、编写测试用例

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp mapper.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import org.junit.Test;   
6 import org.junit runner.Runwith;   
7 import org.springframework.beans.factory.annotation.Autowired;   
8 import org.springframework.boot.test.context.SpringBootTest;   
9 import org.springframework.test.context.Junit4.SpringRunner;   
10   
11 import java.util.List;   
12   
13 @RunWith(SpringRunner.class)   
14 @SpringBootTest   
15 public class UserMapperTest {   
16 @Autowired private 用户Mapper userMapper;   
17   
18   
19   
20   
21   
22   
23   
24   
25   
26   
27   
28 }
```

测试：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $\Longrightarrow$  Preparing: SELECT id, user_name, password, name, age, email FROM tb_user   
2 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $\Longrightarrow$  Parameters:   
3 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $<   =   =$  Total: 5   
4 [main] [org.mybatis.spring.SqlSessionUtils]-[DEBUG] Closing non transactional   
SqlSession [org.apache.ibatis.session.defaultDefaults.DefaultSqlSession@14faa38c]   
5 User(id=1, userName=zhangsan, password=123456, name=张三，age=18，email  $\equiv$  test1@itcast.cn)   
6 User(id=2, userName=1isi, password=123456, name=李四，age=20，email  $\equiv$  test2@itcast.cn)   
7 User(id=3, userName=wangwu, password=123456, name=王五，age=28，email  $\equiv$  test3@itcast.cn)   
8 User(id=4, userName=zhaoliu, password=123456, name=赵六，age=21，email  $\equiv$  test4@itcast.cn)   
9 User(id=5, userName=sunqi, password=123456, name=孙七，age=24，email  $\equiv$  test5@itcast.cn)
```

# 3、通用CRUD

通过前面的学习，我们了解到通过继承BaseMapper就可以获取到各种各样的单表操作，接下来我们将详细讲解这些操作。

```txt
BaseMapper insert(T): int deleteByld(Serailizable): int deleteByMap(Map<String, Object>): int delete(Wrapper<T>): int deleteBatchIds(Collection<? extendsSerializable>): int updateById(T): int update(T, Wrapper<T>): int selectByld(Serailizable): T selectBatchIDS(Collection<? extendsSerializable>): List<T> selectByMap(Map<String, Object>): List<T> selectOne(Wrapper<T>): T selectCount(Wrapper<T>): Integer selectList(Wrapper<T>): List<T> selectMaps(Wrapper<T>): List<Map<String, Object>> selectObjects(Wrapper<T>): List<Object> selectPage(IPage<T>, Wrapper<T>): IPage<T> selectMapsPage(IPage<T>, Wrapper<T>): IPage<Map<String, Object>>
```

# 3.1、插入操作

# 3.1.1、方法定义

```c
1 /\*\*  
2 \*插入一条记录  
3 \*  
4 \* @param entity 实体对象  
5 \*/  
6 int insert(T entity);
```

# 3.1.2、测试用例

```java
package cn.itcast.mp;   
import cn.itcast.mp.mapping.UserMapper;   
import cn.itcast.mp.pojo.User;   
import org.junit.Test;   
import org.junit runner.RunWith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context.Junit4.SpringRunner;   
import java.util.List;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest {   
    @Autowired   
    private UserMapper userMapper;   
    @Test   
    public void testInsert(){   
        User user = new User();   
        user.setAge(20);   
        user.setEmail("test@itcast.cn");   
        user.setName("曹操");   
        user.setUserName("caocao");   
        user.setPassword("123456");   
    }   
    int result = this.userMapper.insert(user); //返回的结果是受影响的行数，并不是自增后的id  
    System.out.println(result + result);   
    System.out.println(user.getId()); //自增后的id会回填到对象中  
}
```

# 3.1.3、测试

```ini
1 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] => Preparing: INSERT INTO tb_user (id, user_name, password, name, age, email) VALUES (?, ?, ?, ?,?, ?)  
2 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] => Parameters: 1122045867793072130(Long), caocao(String), 123456(String),曹操(String), 20(Integer), test@itcast.cn(String)  
3 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] <= Updates: 1  
4 [main] [org.mybatis.spring.SqlSessionUtils]-[DEBUG] closing non transactionalSqlSession [org.apache~-].session.default Defaults.DefaultSqlSession@411291e5]  
5 result = 1  
6 1122045867793072130
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547177.jpg)

可以看到，数据已经写入到了数据库，但是，id的值不正确，我们期望的是数据库自增长，实际是MP生成了id的值写入到了数据库。

如何设置id的生成策略呢？

MP支持的id策略：

```java
package com.baomidou.mybatisplus_annotation;   
import lombokgetter;   
/\*\*   
\*生成ID类型枚举类   
\*   
\* @author hubin   
\* @since 2015-11-10   
\*/   
@Setter   
public enum IdType { /\*\* \* 数据库ID自增 \*/   
AUTO(O)， /\*\* \*该类型为未设置主键类型 \*/   
NONE(1)， /\*\* \* 用户输入ID \*该类型可以通过自己注册自动填充插件进行填充</p> /\*   
INPUT(2)，   
/\*以下3种类型、只有当插入对象ID为空，才自动填充。\*/ /\*\* \*全局唯一ID(idworker) \*/   
ID_WORKER(3),   
/\*\* \*全局唯一ID（UUID）   
\*/   
UUID(4)，
```

修改User对象：

```txt
36 /\*\*   
37 \*字符串全局唯一ID（idWorker的字符串表示）   
38 \*/   
39 ID_WORKER_str(5);   
40   
41 private final int key;   
42   
43 IdType(int key){   
44 this.key = key;   
45 }   
46 }   
47
```

数据插入成功：

```java
1 package cn.itcast.mp.pojo;   
2   
3 import com.baomidou.mybatisplus_annotation.IdType;   
4 import com.baomidou.mybatisplus_annotation.TableId;   
5 import com.baomidou.mybatisplus_annotation.TableName;   
6 import lombok.AllArgsConstructor;   
7 import lombok.Data;   
8 import lombok.NoArgsConstructor;   
9   
10 @Data   
11 @NoArgsConstructor   
12 @AllArgsConstructor   
13 @tableName("tb_user")   
14 public class User {   
15 @TableId(type = IdType.AUTO) //指定id类型为自增长   
16 private Long id;   
17 private String userName;   
18 private String password;   
19 private String name;   
20 private String name;   
21 private Integer age;   
22 private String email;   
23 }
```

```txt
id user_name password name age email 1 zhangsan 123456 张三 18 test1@itcast.cn 2 lisi 123456 李四 20 test2@itcast.cn 3 wangwu 123456 王五 28 test3@itcast.cn 4 zhaoliu 123456 赵六 21 test4@itcast.cn 5 sunqi 123456 孙七 24 test5@itcast.cn 6 caocao 123456 曹操 20 test@itcast.cn
```

# 3.1.4、@TableField

在MP中通过@TableField注解可以指定字段的一些属性，常常解决的问题有2个：

1、对象中的属性名和字段名不一致的问题（非驼峰）  
2、对象中的属性字段在表中不存在的问题

使用：

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("tb_user")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String userName;
    private String password;
    private String name;
    private Integer age;
    @TableField(value = "email") //解决字段名不一致
    private String mail;
    @TableField(exist = false)
    private String address; //该字段在数据库表中不存在
}
```

其他用法，如大字段不加入查询字段：

```java
@TableName("tb_user")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String userName;
    @TableField(select = false)
    private String password;
    private String name;
    private Integer age;
    @TableField(value = "email") //解决字段名不一致
    private String mail;
```

效果：

```txt
[main] [org.mybatis.spring.SqlSessionUtiles]-[DEBUG] Closing non transactional.SqlSessionUser(id=1, userName=zhangsan, password=NULL, name=张三, age=18, mail=test1@itcast.cn, addUser(id=2, userName=lisi, password=NULL, name=李四, age=20, mail=test2@itcast.cn, addUser(id=3, userName=wangwu, password=NULL, name=王五, age=28, mail=test3@itcast.cn, addUser(id=4, userName=zhaoliu, password=NULL, name=赵六, age=21, mail=test4@itcast.cn, addUser(id=5, userName=sunqi, password=NULL, name=孙七, age=24, mail=test5@itcast.cn, addUser(id=6, userName=caocao, password=NULL, name=曹操, age=20, mail=test@itcast.cn, add
```

# 3.2、更新操作

在MP中，更新操作有2种，一种是根据id更新，另一种是根据条件更新。

# 3.2.1、根据id更新

方法定义：

```txt
1 /* */
2 * 根据 ID 修改
3 */
4 * @param entity 实体对象
5 */
6 int updateById(@Param(Constants.ENTITY) T entity);
```

测试：

```java
1 @RunWith(SpringRunner.class)   
2 @SpringBootTest   
3 public class 用户MapperTest {   
4 @Autowired   
6 private 用户Mapper userMapper;   
7   
8 @Test   
9 public void testUpdateById() {   
10 User user = new User();   
11 user.setld(6L); //主键   
12 user.setAge(21); //更新的字段   
13   
14 //根据id更新，更新不为null的字段   
15 this.userMapper.updateByld(user);   
16 }   
17   
18 }
```

结果：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG] => Preparing: UPDATE tb_user SET age=? WHERE id=?  
2 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG] => Parameters: 21(Integer), 6(Long)  
3 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG] <= Updates: 1
```

<table><tr><td>id</td><td>user_name</td><td>password</td><td>name</td><td>age</td><td>email</td></tr><tr><td>1</td><td>zhangsan</td><td>123456</td><td>张三</td><td>18</td><td>test1@itcast.cn</td></tr><tr><td>2</td><td>lisi</td><td>123456</td><td>李四</td><td>20</td><td>test2@itcast.cn</td></tr><tr><td>3</td><td>wangwu</td><td>123456</td><td>王五</td><td>28</td><td>test3@itcast.cn</td></tr><tr><td>4</td><td>zhaoliu</td><td>123456</td><td>赵六</td><td>21</td><td>test4@itcast.cn</td></tr><tr><td>5</td><td>sunqi</td><td>123456</td><td>孙七</td><td>24</td><td>test5@itcast.cn</td></tr><tr><td>6</td><td>caocao</td><td>123456</td><td>曹操</td><td>21</td><td>test@itcast.cn</td></tr></table>

# 3.2.2、根据条件更新

方法定义：

```txt
/**
* 根据.whereEntity条件，更新记录
*/
* @param entity 实体对象（set条件值，可以为null）
* @param updateWrapper 实体对象封装操作类（可以为null，里面的entity用于生成where语句）
*/
int update(@Param(Constants.ENTRY) T entity, @Param(Constants.WRAPPER) Wrapper<T> updaterWrapper);
```

测试用例：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp mapper.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import com.baomidou.mybatisplus.core_conditions-wrapper;   
6 import com.baomidou.mybatisplus.core_conditions/query(QueryWrapper;   
7 import com.baomidou.mybatisplus.core_conditions.update.UpdateWrapper;   
8 import net.mindev.json.writer.UpdaterMapper;   
9 import org.junit.Test;   
10 import org.junit runner. Runwith;   
11 import org.springframework.beans.factory.annotation.Autowired;   
12 import org.springframework.boot.test.context.SpringBootTest;   
13 import org.springframework.test.context{junit4.SpringRunner;   
14   
15 import java.util.List;   
16   
17 @RunWith(SpringRunner.class)   
18 @SpringBootTest   
19 public class UserMapperTest {   
20   
21 @Autowired   
22 private 用户Mapper userMapper;   
23   
24 @Test   
25 public void testUpdate() {
```

```txt
26 User user = new User();   
27 user.setAge(22); //更新的字段   
28   
29 //更新的条件   
30 Querywrapper<user> wrapper = new Querywrapper<>();   
31 wrapper EQ("id", 6);   
32   
33 //执行更新操作   
34 int result = this.userMapper.update(user, wrapper);   
35 System.out.println("result = " + result);   
36 }   
37   
38 }
```

或者，通过UpdateWrapper进行更新：

```java
1 @Test   
2 public void testUpdate() {   
3 //更新的条件以及字段 Updatewrapper<User> wrapper = new Updatewrapper<>(); wrapper EQ("id", 6).set("age", 23);   
5   
6   
7 //执行更新操作 int result = this.UserMapper.update(null, wrapper); System.out.println("result = " + result);   
9   
10 }
```

测试结果：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.update]-[DEBUG]  $\Longrightarrow$  Preparing: UPDATE tb_user SET age  $=$  ? WHERE id  $=$  ?   
2 [main] [cn.itcast.mp mapper.UserMapper.update]-[DEBUG]  $\Longrightarrow$  Parameters: 23(Integer), 6(Integer)   
3 [main] [cn.itcast.mp mapper.UserMapper.update]-[DEBUG]  $<   =   =$  Updates: 1
```

均可达到更新的效果。

关于wrapper更多的用法后面会详细讲解。

# 3.3、删除操作

# 3.3.1、deleteByld

方法定义：

```txt
1 /\*\*  
2 \*根据ID删除  
3 \*  
4 \* @param id主键ID  
5 \*/  
6 int deleteById(Serailizable id);
```

测试用例：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import org.junit.Test;   
5 import org.junit runner. Runwith;   
6 import org.springframework.beans.factory.annotation.Autowired;   
7 import org.springframework.boot.test.context.SpringBootTest;   
8 import org.springframework.test.context.Junit4.SpringRunner;   
9   
10 @RunWith(SpringRunner.class)   
11 @SpringBootTest   
12 public class UserMapperTest {   
13 @Autowired   
15 private 用户Mapper userMapper;   
16   
17 @Test   
18 public void testDeleteById() {   
19 //执行删除操作   
20 int result  $=$  this.userMapper.deleteByld(6L);   
21 System.out.println("result  $=$  " + result);   
22 }   
23   
24 }
```

结果：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper(deleteById] - [DEBUG] => Preparing: DELETE FROM tb_user WHERE id=?  
2 [main] [cn.itcast.mp mapper.UserMapper(deleteById] - [DEBUG] => Parameters: 6(Long)  
3 [main] [cn.itcast.mp mapper.UserMapper(deleteById] - [DEBUG] <= Updates: 1
```

```txt
id user_name password name age email 1 zhangsan 123456 张三 18 test1@itcast.cn 2 lisi 123456 李四 20 test2@itcast.cn 3 wangwu 123456 王五 28 test3@itcast.cn 4 zhaoliu 123456 赵六 21 test4@itcast.cn 5 sunqi 123456 孙七 24 test5@itcast.cn
```

数据被删除。

# 3.3.2、deleteByMap

方法定义：

测试用例：

```java
1 /***
2 * 根据 columnMap 条件，删除记录
3 */
4 * @param columnMap 表字段 map 对象
5 */
6 int deleteByMap(@Param公社Constants.COLUMN_MAP) Map<String, Object> columnMap);
```

结果：

```java
package cn.itcast.mp;   
import cn.itcast.mp)mapper.UserMapper;   
import org.junit.Test;   
import org.junit runner. Runwith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context{j unit4.SpringRunner;   
import java.util.HasMap;   
import java.util.Map;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest{ @Autowired private 用户UserMapper userMapper; @Test public void testDeleteByMap(){ Map<String, Object> columnMap  $=$  new HashMap<>(); columnMap.put("age",20); columnMap.put("name","张三"); //将columnMap中的元素设置为删除的条件，多个之间为and关系 int result  $=$  this.userMapper.deleteByMap(columnMap); System.out.println("result  $=$  " + result); }   
}
```

```txt
1 [main] [cn.itcast.mp.mapping.UserMapper(deleteByMap]-[DEBUG] => Preparing: DELETE FROM tb_user WHERE name = ? AND age = ?  
2 [main] [cn.itcast.mpAPPING.UserMapper(deleteByMap]-[DEBUG] => Parameters: 张三 (String), 20(Integer)  
3 [main] [cn.itcast.mpAPPING.UserMapper(deleteByMap]-[DEBUG] <= Updates: 0
```

# 3.3.3、delete

# 方法定义：

```txt
1 /\*\*  
2 \*根据entity条件，删除记录  
3 \*  
4 \* @paramwrapper 实体对象封装操作类（可以为null）  
5 \*/  
6 int delete(@Param(Constants.WRAPPER) Wrapper<T> wrapper);
```

# 测试用例：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import com.baomidou.mybatisplus.core_conditions.query(QueryWrapper;   
6 import org.junit.Test;   
7 import org.junit;krunner. Runwith;   
8 import org.springframework.beans.factory.annotation.Autowired;   
9 import org.springframework.boot.test.context.SpringBootTest;   
10 import org.springframework.test.context.junit4.SpringRunner;   
11   
12 import java.util.HasMap;   
13 import java.util. Map;   
14   
15 @RunWith(SpringRunner.class)   
16 @SpringBootTest   
17 public class UserMapperTest {   
18 @Autowired   
20 private 用户Mapper userMapper;   
21   
22 @Test   
23 public void testDeleteByMap() {   
24 User user  $=$  new User();   
25 user.setAge(20);   
26 user.setName("张三");   
27   
28 //将实体对象进行包装，包装为操作条件   
29 QueryWrapper<User> wrapper  $=$  new QueryWrapper<> (user);   
30   
31 int result  $=$  this.userMapper delete穰pper);   
32 System.out.println("result  $=$  " + result);   
33 }   
34   
35 }
```

# 结果：

方法定义：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.delete]-[DEBUG] => Preparing: DELETE FROM tb_user WHERE name=? AND age=?  
2 [main] [cn.itcast.mp mapper.UserMapper.delete]-[DEBUG] => Parameters: 张三(String), 20(Integer)  
3 [main] [cn.itcast.mp mapper.UserMapperdelete]-[DEBUG] <= Updates: 0
```

# 3.3.4、deleteBatchIds

测试用例：

```txt
1 /* 
2 * 删除（根据ID批量删除）
3 */
4 @param idList 主键ID列表(不能为 null以及 empty)
5 */
6 int deleteBatchIds(@Param(Constants.COLOLECTION) Collection<? extendsSerializable> idList);
```

结果：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import org.junit.Test;   
5 import org.junit runner. RunWith;   
6 import org.springframework.beans.factory.annotation.Autowired;   
7 import org.springframework.boot.test.context.SpringBootTest;   
8 import org.springframework.test.context{j unit4.SpringRunner;   
9   
10 import java.util. Arrays;   
11   
12 @RunWith(SpringRunner.class)   
13 @SpringBootTest   
14 public class UserMapperTest {   
15 @Autowired   
16 private 用户Mapper userMapper;   
17   
18 @Test   
19   
20 public void testDeleteByMap(){   
21 //根据id集合批量删除   
22 int result  $=$  this.userMapper.deleteBatchIds(Arrays.asList(1L,10L,20L));   
23 System.out.println("result  $=$  " + result);   
24 }   
25   
26 }
```

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.deleteBatchIds]-[DEBUG] => Preparing: DELETE FROM tb_user WHERE id IN (?,?,?,?)  
2 [main] [cn.itcast.mp mapper.UserMapper.deleteBatchIds]-[DEBUG] => Parameters: 1(Long), 10(Long), 20(Long)  
3 [main] [cn.itcast.mp mapper.UserMapperdeleteBatchIds]-[DEBUG] <= Updates: 1
```

# 3.4、查询操作

MP提供了多种查询操作，包括根据id查询、批量查询、查询单条数据、查询列表、分页查询等操作。

# 3.4.1、selectByld

方法定义：

```txt
1 /\*\*  
2 \* 根据ID查询  
3 \*  
4 \* @param id 主键ID  
5 \*/  
6 T selectById(Serailizable id);
```

测试用例：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import org.junit.Test;   
6 import org.junit runner. RunWith;   
7 import org.springframework.beans.factory.annotation.Autowired;   
8 import org.springframework.boot.test.context.SpringBootTest;   
9 import org.springframework.test.context.Junit4.SpringRunner;   
10 @RunWith(SpringRunner.class)   
12 @SpringBootTest   
13 public class UserMapperTest {   
14 @Autowired   
16 private 用户Mapper userMapper;   
17   
18 @Test   
19 public void testSelectById() {   
20 //根据id查询数据   
21 User user  $=$  this.userMapper.selectByld(2L);   
22 System.out.println("result  $\equiv$  "  $^+$  user);   
23 }   
24   
25 }
```

结果：

方法定义：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectByld]-[DEBUG]  $\Longrightarrow$  Preparing: SELECT id, user_name, password, name, age, email FROM tb_user WHERE id=?   
2 [main] [cn.itcast.mp mapper.UserMapper.selectByld]-[DEBUG]  $\Longrightarrow$  Parameters: 2(Long)   
3 [main] [cn.itcast.mp mapper.UserMapper.selectByld]-[DEBUG]  $<   =   =$  Total: 1   
4   
5 result  $=$  User(id=2，userName=1isi，password=123456，name=李四，age=20， email  $\equiv$  test2@itcast.cn，address  $\equiv$  null)
```

# 3.4.2、selectBatchIds

测试用例：

```txt
1 /***
2 * 查询（根据ID批量查询）
3 */
4 * @param idList 主键ID列表(不能为 null以及 empty)
5 */
6 List<T> selectBatchIds(@Param(Constants.COllLECTION) Collection<? extendsSerializable>
    idList);
```

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp mapper.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import org.junit.Test;   
6 import org.junit runner. Runwith;   
7 import org.springframework.beans.factory.annotation.Autowired;   
8 import org.springframework.boot.test.context.SpringBootTest;   
9 import org.springframework.test.context{junit4.SpringRunner;   
10   
11 import java.util. Arrays;   
12 import java.util.List;   
13   
14 @RunWith(SpringRunner.class)   
15 @SpringBootTest   
16 public class UserMapperTest {   
17 @Autowired   
19 private Mapper userMapper;   
20   
21 @Test   
22 public void testSelectBatchIds() {   
23 //根据id集合批量查询   
24 List<User> users = this.userMapper.selectBatchIds(Arrays.asList(2L, 3L, 10L));   
25 for (User user : users) { System.out.println(user); }   
26 }   
27 }   
28 }   
29 }
```

结果：

```sql
1 [main] [cn.itcast.mp mapper.UserMapper.selectBatchIds]-[DEBUG]  $\Longrightarrow$  Preparing: SELECT id, user_name, password, name, age, email FROM tb_user WHERE id IN (?, ,?, ?)   
2 [main] [cn.itcast.mp mapper.UserMapper.selectBatchIds]-[DEBUG]  $\Longrightarrow$  Parameters: 2(Long), 3(Long), 10(Long)   
3 [main] [cn.itcast.mp mapper.UserMapper.selectBatchIds]-[DEBUG]  $<   =   =$  Total: 2   
4   
5 User(id=2, userName=1isi, password=123456, name=李四, age=20, email  $\equiv$  test2@itcast.cn, address  $\equiv$  null)   
6 User(id=3, userName  $\equiv$  wangwu, password=123456, name  $\equiv$  王五，age=28，email  $\equiv$  test3@itcast.cn, address  $\equiv$  null)
```

# 3.4.3、selectOne

方法定义：

```txt
1 /***
2 * 根据 entity 条件，查询一条记录
3 */
4 * @param querywrapper 实体对象封装操作类（可以为 null）
5 */
6 T selectOne(@Param(Constants.WRAPPER) wrapper<T> queryWrapper);
```

测试用例：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import com.baomidou.mybatisplus.core_conditions.query(QueryWrapper;   
6 import org.junit.Test;   
7 import org.junit runner.Runwith;   
8 import org.springframework.beans.factory.annotation.Autowired;   
9 import org.springframework.boot.test.context.SpringBootTest;   
10 import org.springframework.test.context.Junit4.SpringRunner;   
11   
12 @RunWith(SpringRunner.class)   
13 @SpringBootTest   
14 public class UserMapperTest {   
15 @Autowired   
16 private 用户Mapper userMapper;   
17   
18   
19 @Test   
20 public void testSelectone() { QueryWrapper<user> wrapper = new QueryWrapper<user>(); wrapper EQ("name", "李四");   
21 //根据条件查询一条数据，如果结果超过一条会报错   
22 User user = this.userMapper.selectOne(wrapper);
```

结果：

```txt
System.out.println(user);   
27 }   
28   
29 }
```

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectOne]-[DEBUG] => Preparing: SELECT id, user_name, password, name, age, email FROM tb_user WHERE name = ?
2 [main] [cn.itcast.mp mapper.UserMapper.selectOne]-[DEBUG] => Parameters: 李四(String)
3 [main] [cn.itcast.mp mapper.UserMapper.selectOne]-[DEBUG] <= Total: 1
4
5 User(id=2, userName=1isi, password=123456, name=李四, age=20, email test2@itcast.cn, address=null)
```

# 3.4.4、selectCount

方法定义：

```txt
1 /***
2 * 根据 Wrapper 条件，查询总记录数
3 */
4 * @param queryWrapper 实体对象封装操作类（可以为 null）
5 */
6 Integer selectCount(@Param公社ICATIONS.WRAPPER) Wrapper<T> queryWrapper);
```

测试用例：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import com.baomidou.mybatisplus.core_conditions.query(QueryWrapper;   
6 import org.junit.Test;   
7 import org.junit runner. RunWith;   
8 import org.springframework.beans.factory.annotation.Autowired;   
9 import org.springframework.boot.test.context.SpringBootTest;   
10 import org.springframework.test.context{j unit4.SpringRunner;   
11   
12 @RunWith(SpringRunner.class)   
13 @SpringBootTest   
14 public class UserMapperTest {   
15 @Autowired   
16 private 用户Mapper userMapper;   
17   
18   
19 @Test   
20 public void testSelectCount() { QueryWrapper<User> wrapper = new QueryWrapper<user>(); wrapper.gt("age", 23); //年龄大于23岁   
21
```

结果：

```javascript
25 Integer count  $=$  this.userMapper.selectCount(wrapper);   
26 System.out.println("count  $= \text{串}$  + count);   
27 }   
28   
29 }
```

方法定义：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectCount]-[DEBUG] => Preparing: SELECT  
COUNT(1) FROM tb_user WHERE age > ?  
2 [main] [cn.itcast.mp mapper.UserMapper.selectCount]-[DEBUG] => Parameters: 23(Integer)  
3 [main] [cn.itcast.mp mapper.UserMapper.selectCount]-[DEBUG] <= Total: 1  
4 count = 2
```

# 3.4.5、selectList

测试用例：

```txt
1 /***
2 * 根据 entity 条件，查询全部记录
3 */
4 * @param queryWrapper 实体对象封装操作类（可以为 null）
5 */
6 List<T> selectList(@Param(Constants.WRAPPER) wrapper<T> queryWrapper);
```

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import com.baomidou.mybatisplus.core_conditions.query(QueryWrapper;   
6 import org.junit.Test;   
7 import org.junit runner.Runwith;   
8 import org.springframework.beans.factory.annotation.Autowired;   
9 import org.springframework.boot.test.context.SpringBootTest;   
10 import org.springframework.test.context{junit4.SpringRunner;   
11   
12 import java.util.List;   
13   
14 @RunWith(SpringRunner.class)   
15 @SpringBootTest   
16 public class UserMapperTest {   
17   
18 @Autowired   
19 private 用户Mapper userMapper;   
20   
21 @Test   
22 public void testSelectList(){ QueryWrapper<user> wrapper = new QueryWrapper<user>(); wrapper.gt("age", 23); //年龄大于23岁
```

结果：

```txt
25 //根据条件查询数据  
26 List<user> users = this.userMapper.selectList wraps);  
27 for (User user : users) {  
28 System.out.println("user = " + user);  
30 }  
31 }  
32
```

方法定义：

```batch
1 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $\equiv \equiv$  Preparing: SELECT id, user_name, password, name, age, email FROM tb_user WHERE age > ?   
2 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $\equiv \equiv$  Parameters: 23(Integer)   
3 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $<   =   =$  Total: 2   
4   
5 user  $=$  User(id=3，userName  $\equiv$  wangwu，password  $\coloneqq$  123456，name  $\equiv$  王五，age  $\coloneqq$  28, email  $\equiv$  test3@itcast.cn，address  $\equiv$  null)   
6 user  $=$  User(id=5，userName  $\equiv$  sunqi，password  $\coloneqq$  123456，name  $\equiv$  孙七，age  $\coloneqq$  24, email  $\equiv$  test5@itcast.cn，address  $\equiv$  null)
```

# 3.4.6、selectPage

配置分页插件：

```java
1 /***
2 * 根据 entity 条件，查询全部记录（并翻页）
3 */
4 * @param page 分页查询条件（可以为 RowBounds.DEFAULT）
5 * @param querywrapper 实体对象封装操作类（可以为 null）
6 */
7 IPage<T> selectPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

```java
1 package cn.itcast.mp;   
2   
3 import com.baomidou.mybatisplusextensionplugins.PaginationInterceptor;   
4 import org.mybatis.spring annotation MapperScan;   
5 import org.springframework.context_annotationBean;   
6 import org.springframework.context.annotation.Configuration;   
7   
8 @Configuration   
9 @MapperScan("cn.itcast.mp mapper") //设置mapper接口的扫描包   
10 public class MybatisPlusConfig {   
11   
12 /\*\*   
13 \*分页插件   
14 \*/   
15 @Bean   
16 public PagingInterceptor paginationInterceptor() {
```

测试用例：

```txt
17 return new PagingInterceptor();   
18 }   
19 }
```

结果：

```java
package cn.itcast.mp;   
import cn.itcast.mp.mapping.UserMapper;   
import cn.itcast.mp.pojo.User;   
import com.baomidou.mybatisplus.core_conditions.query.Queerywrapper;   
import com.baomidou.mybatisplus.core)LMetadata.IPage;   
import com.baomidou.mybatisplusextensionplugins pagination.Page;   
import org.junit.Test;   
import org.junit runner. RunWith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context{junit4.SpringRunner;   
import java.util.List;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest { @Autowired private 用户Mapper userMapper; @Test public void testSelectPage() { QueryWrapper<User> wrapper  $=$  new QueryWrapper<user>(); wrapper.gt("age"，20)；//年龄大于20岁 Page<User> page  $=$  new Page  $\text{一} >$  (1,1); //根据条件查询数据 IPage<iPage  $=$  this.userMapper.selectPage(page,wrapper); System.out.println("数据总条数："  $^+$  iPageTOTAL()); System.out.println("总页数："  $^+$  iPage.getPages()); List<User> users  $=$  iPage.getRecords(); for(User user:users){ System.out.println("user  $=$  "  $^+$  user); } 1
```

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectPage]-[DEBUG] => Preparing: SELECT COUNT(1) FROM tb_user WHERE age > ?  
2 [main] [cn.itcast.mp mapper.UserMapper.selectPage]-[DEBUG] => Parameters: 20(Integer)  
3 [main] [cn.itcast.mp mapper.UserMapper.selectPage]-[DEBUG] => Preparing: SELECT id,name,password,name,age@email FROM tb_user WHERE age > ? LIMIT ?,  
4 [main] [cn.itcast.mp mapper.UserMapper.selectPage]-[DEBUG] => Parameters: 20(Integer), 0(Long), 1(Long)  
5 [main] [cn.itcast.mp mapper.UserMapper.selectPage]-[DEBUG] <= Total: 1  
6 [main] [org.mybatis.spring.SqlSessionUtils]-[DEBUG] Closing non transactional  
SqlSession [org.apache~-ibatis.session.Defaults.DefaultSqlSession@6ecd665]  
7 数据总条数：3  
8 总页数：3  
9 user = User(id=3, userName=wangwu, password=123456, name=王五, age=28, email=test3@itcast.cn, address=false)
```

# 3.5、SQL注入的原理

前面我们已经知道，MP在启动后会将BaseMapper中的一系列的方法注册到meppedStatements中，那么究竟是如何注入的呢？流程又是怎么样的？下面我们将一起来分析下。

在MP中，ISqlInjector负责SQL的注入工作，它是一个接口，AbstractSqlInjector是它的实现类，实现关系如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547178.jpg)

在AbstractSqlInjector中，主要是由inspectInject()方法进行注入的，如下：

```java
1 @override   
2 public void inspectInject(MapperBuilderAssistant builderAssistant, Class<?> mapperClass) { Class<?>modelClass  $=$  extract-modelClass mapperClass); if (modelclass != null) { String className  $=$  mapperClass.toString(); Set<String> mapperRegistryCache  $=$  GlobalConfigsigs.getMapperRegistryCache(builderAssistant.getConfiguration()); if (!mapperRegistryCache.contains(name)) { List<AbstractMethod> methodList  $=$  thisgetMethodList(); if (CollectionConfigsigs.isEmpty(methodList)) { TableInfo tableInfo  $=$  TableInfoHelper.initTableInfo(builderAssistant, modelClass); //循环注入自定义方法 methodList.forEach(m -> m.inject(builderAssistant, mapperClass, modelClass, tableInfo)); } else {
```

```txt
14 logger.debug mapperClass.toString() + ", No effective injection method was found.");   
15 }   
16 mapperRegistryCache.add(name);   
17 }   
18 }   
19 }
```

在实现方法中，methodList.forEach(m -> m.inject(builderAssistant, mapperClass, mapperClass, tableInfo));是关键，循环遍历方法，进行注入。

最终调用抽象方法injectMappedStatement进行真正的注入：

```txt
/* 
* 注入自定义 MappedStatement
* 
* @param mapperClass mapper 接口
* @param modelClass mapper 泛型
* @param tableInfo 数据库表反射信息
* @return MappedStatement
*/ 
public abstract MappedStatement injectMappedStatement(Class<?> mapperClass, class<?>
  >modelClass, TableInfo tableInfo);
```

查看该方法的实现：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547179.jpg)

# Object (java.lang)

# AbstractMethod (com.baomidou.mybatisplus.core.injector)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547180.jpg)

# 以SelectByld为例查看：

```java
public class SelectByld extends AbstractMethod {   
2 @Override   
4 public MappedStatement injectMappedStatement(Class<?> mapperClass, class<?>   
modelClass, TableInfo tableInfo) { SQLMethod sqlMethod  $=$  sqlMethod.LOGIC_SELECT_BY_ID;   
6 SQLSource sqlSource  $=$  new RawSqlSource(configuration,   
String.format(sqlMethod.getSql(),   
sqlSelectColumns(tableInfo, false),   
tableInfo.getName(), tableInfo_KeyColumn(),   
tableInfo_KeyProperty(),   
tableInfo.getLogicDeleteSql(true,false)),object.class);   
10 return this.addSelectMappedStatement mapperClass, sqlMethod/method(),   
11 }   
12 }
```

可以看到，生成了SqlSource对象，再将SQL通过addSelectMappedStatement方法添加到mippedStatements中。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547181.jpg)

# 4、配置

在MP中有大量的配置，其中有一部分是Mybatis原生的配置，另一部分是MP的配置，详情：https://mybatis-plus/c onfig/

下面我们对常用的配置做讲解。

# 4.1、基本配置

# 4.1.1、configLocation

MyBatis 配置文件位置，如果您有单独的 MyBatis 配置，请将其路径配置到 configLocation 中。MyBatis Configuration
的具体内容请参考MyBatis 官方文档

Spring Boot :

```txt
1 mybatis-plus.config-location = classpath:mybatis-config.xml
```

Spring MVC :

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplusextension.spring.MybatisSqlSessionFactoryBean">
    <property name="configLocation" value="classpath:mybatis-config.xml"/>
</bean>
```

# 4.1.2、mapperLocations

MyBatis Mapper 所对应的 XML 文件位置，如果您在 Mapper 中有自定义方法（XML 中有自定义实现），需要进行该配置，告诉 Mapper 所对应的
XML 文件位置。

Spring Boot :

```txt
1 mybatis-plus mapper-locations = classpath*:mybatis/*.xml
```

Spring MVC :

```txt
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplusextension.spring.MybatisSqlSessionFactoryBean">
    <property name="mapperLocations" value="classpath*:mybatis/*.xml"/>
</bean>
```

Maven多模块项目的扫描路径需以 classpath*: 开头（即加载多个jar包下的XML文件）

测试：

UserMapper.xml :

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE mapper  
PUBLIC "--/mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="cn.itcast.mp.mapper.UserMapper">  
<select id="findByld" resultType="cn.itcast.mp.pojo.User">  
select * from tb_user where id = #{id}  
</select>  
</mapper>
```

```java
1 package cn.itcast.mp mapper;   
2   
3 import cn.itcast.mp.pojo.User;   
4 import com.baomidou.mybatisplus.core mapper.BaseMapper;   
5   
6 public interface UserMapper extends BaseMapper<User> {   
7 User findByld(Long id);   
8 }
```

# 测试用例：

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp.mapping.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import org.junit.Test;   
6 import org.junit runner. RunWith;   
7 import org.springframework.beans.factory.annotation.Autowired;   
8 import org.springframework.boot.test.context.SpringBootTest;   
9 import org.springframework.test.context{junit4.SpringRunner;   
10   
11 @RunWith(SpringRunner.class)   
12 @SpringBootTest   
13 public class UserMapperTest {   
14 @Autowired   
15 private 用户 Mapper userMapper;   
16   
17 @Test   
18   
19 public void testSelectPage() { User user  $=$  this.userMapper.findByld(2L); System.out.println(user);
```

运行结果：

```txt
23 } 24 25}
```

```txt
ansactionj-[DEBUG] JDBC Connection [HikariProxyConnection@9063  
G] => Preparing: select \* from tb_user where id = ?  
G] => Parameters: 2(Long)  
G] <= Total: 1  
osing non transactional SqSession [org.apache.ibatis.session.  
ge=20, email=test2@itcast.cn, address=null)
```

# 4.1.3、typeAliasesPackage

MyBaits 别名包扫描路径，通过该属性可以给包中的类注册别名，注册后在 Mapper 对应的 XML 文件中可以直接使用类名，而不用使用全限定的类名（即
XML 中调用的时候不用包含包名）。

Spring Boot :

```txt
1 mybatis-plus.type-aliases-package = cn.itcast.mp.pojo
```

Spring MVC :  
示例（SpringBoot）：

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplusextension.spring.MybatisSqlSessionFactoryBean">
    <property name="typeAliasesPackage" value="com.baomidou.mybatisplus_samplesquickstart(entity"/>
</bean>
```

# 4.2、进阶配置

本部分（Configuration）的配置大都为 MyBatis 原生支持的配置，这意味着您可以通过 MyBatis XML 配置文件的形式进行配置。

# 4.2.1、mapUnderscoreToCamelCase

- 类型：boolean
- 默认值：true

是否开启自动驼峰命名规则（camel case）映射，即从经典数据库列名A_COLUMN（下划线命名）到经典Java属性名aColumn（驼峰命名）的类似映射。

注意：

此属性在 MyBatis 中原默认值为 false，在 MyBatis-Plus 中，此属性也将用于生成最终的 SQL 的 select body

如果您的数据库命名符合规则无需使用 @TableField 注解指定数据库字段名

1 #关闭自动驼峰映射，该参数不能和mybatis-plus.config-location同时存在  
2 mybatis-plus.configuration.map-underscore-to-camel-case=false

# 4.2.2、cacheEnabled

- 类型：boolean
- 默认值：true

全局地开启或关闭配置文件中的所有映射器已经配置的任何缓存，默认为 true。

示例：

1 mybatis-plus.configuration.cache-enabled=false

# 4.3、DB策略配置

# 4.3.1、idType

- 类型：com.baomidou.mybatisplus_annotation.IdType  
  默认值：ID_WORKER

全局默认主键类型，设置后，即可省略实体对象中的@TableId(type = IdType.AUTO)配置。

示例：

SpringBoot :

1 mybatis-plus.global-config.db-config.id-type=auto

SpringMVC :

```txt
<!--这里使用MP提供的sqlSessionFactory，完成了Spring与MP的整合-->  
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplusextension.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="globalConfig">
        <bean class="com.baomidou.mybatisplus.core.config.GlobalConfig">
            <property name="dbConfig">
                <bean class="com.baomidou.mybatisplus.core.config.GlobalConfig$DbConfig">
                    <property name="idType" value="AUTO"/>
                </bean>
            </property>
        </bean>
</bean>
```

# 4.3.2、tablePrefix

- 类型：String
- 默认值：nu11

表名前缀，全局配置后可省略@TableName()配置。

SpringBoot :

SpringMVC :

```txt
1 mybatis-plus.global-config.db-config.table-prefix=tb_
```

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplusextension.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="globalConfig">
        <bean class="com.baomidou.mybatisplus.core.config.GlobalConfig">
            <property name="dbConfig">
                <bean class="com.baomidou.mybatisplus.core.config.GlobalConfig$dbConfig">
                    <property name="idType" value="AUTO"/>
                    <property name="tablePrefix" value="tb_/">
                      </bean>
                      </property>
                      </bean>
      </property>
</bean>
```

# 5、条件构造器

在MP中，Wrapper接口的实现类关系如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153547182.jpg)

可以看到，AbstractWrapper和AbstractChainWrapper是重点实现，接下来我们重点学习AbstractWrapper以及其子类。

说明：

QueryWrapper(LambdaQueryWrapper) 和 UpdateWrapper(LambdaUpdateWrapper) 的父类用于生成 sql 的 where 条件, entity 属性也用于生成
sql 的 where 条件注意: entity 生成的 where 条件与使用各个 api 生成的 where 条件没有任何关联行为

官网文档地址：https://mybatis-plus/guide/wrapper.html

# 5.1、allEq

# 5.1.1、说明

```txt
1 allEq(Map<R, V> params)  
2 allEq(Map<R, V> params, boolean null2IsNull)  
3 allEq(boolean condition, Map<R, V> params, boolean null2IsNull)
```

# - 全部eq(或个别isEmpty)

个别参数说明: params : key 为数据库字段名, value 为字段值 null2IsNull : 为 true 则在 map 的 value 为 null 时调用 isNull
方法,为 false 时则忽略 value 为 null 的

- 例1: allEq({id:1, name:"老王", age: null}) --> id = 1 and name = '老王' and age is null
- 例2: allEq({id:1, name:"老王", age: null}, false) ---> id = 1 and name = '老王'

```txt
1 allEq(BiPredicate<R, V> filter, Map<R, V> params)  
2 allEq(BiPredicate<R, V> filter, Map<R, V> params, boolean null2IsNull)  
3 allEq(boolean condition, BiPredicate<R, V> filter, Map<R, V> params, boolean null2IsNull)
```

个别参数说明：filter：过滤函数，是否允许字段传入比对条件中params与null2IsNull：同上

- 例1: allEq((k, v) -> k.indexof("a") > 0, {id:1, name:"老王", age: null}) ---> name = '老王' and age is null  
  例2: allEq((k, v) -> k.indexof("a") > 0, {id:1, name:"老王", age: null}, false) -> name = '老王'

# 5.1.2、测试用例

```java
1 package cn.itcast.mp;   
2   
3 import cn.itcast.mp mapper.UserMapper;   
4 import cn.itcast.mp.pojo.User;   
5 import com.baomidou.mybatisplus.core_conditions.query.QQueryWrapper;   
6 import org.junit.Test;   
7 import org.junit runner.RunWith;   
8 import org.springframework.beans.factory.annotation.Autowired;   
9 import org.springframework.boot.test.context.SpringBootTest;   
10 import org.springframework.test.context.Junit4.SpringRunner;   
11   
12 import java.utillzHashMap;   
13 import java.util.List;   
14 import java.util.Map;   
15   
16 @RunWith(SpringRunner.class)   
17 @SpringBootTest   
18 public class UserMapperTest {   
19   
20 @Autowired   
21 private UserMapper userMapper;
```

```java
@Test public void testwrapper() { QueryWrapper  $<$  User> wrapper  $=$  new QueryWrapper<>(); //设置条件 Map<String,object> params  $=$  new HashMap<>(); params.put("name","曹操"); params.put("age","20"); params.put("password",null); //wrapper.allEq.params);//SELECT \* FROM tb_user WHERE password IS NULL AND name  $=$  ?AND age  $=$  ? //wrapper.allEq.params,false); //SELECT \* FROM tb_user WHERE name  $=$  ?AND age  $=$  ? //wrapper.allEq((k,v) -> (k.equals("name") || k.equals("age")) ,params);//SELECT \* FROM tb_user WHERE name  $=$  ?AND age  $=$  ? List<User> users  $=$  this.userMapper.selectList wrapper); for(User user : users){ System.out.println(user); } }
```

# 5.2、基本比较操作

- eq

$\mathrm{o}$  等于  $=$

ne

$\mathrm{o}$  不等于<>

gt

$\mathrm{O}$  大于  $\succ$

- ge

$\mathrm{O}$  大于等于  $\mathrm{>> = }$

It

$\circ$  小于<

le

$\circ$  小于等于  $<=$

- between

o BETWEEN值1AND值2

notBetween

- NOT BETWEEN 值1 AND 值2

in

字段IN(value.get(0),value.get(1)，...)

notIn

。字段NOTIN(v0,v1,...)

测试用例：

```java
package cn.itcast.mp;   
import cn.itcast.mp)mapper.UserMapper;   
import cn.itcast.mp.pojo.User;   
import com.baomidou.mybatisplus.core_conditions.query(Querywrapper;   
import org.junit.Test;   
import org.junit runner.Runwith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context.Junit4.SpringRunner;   
import java.util.List;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest { @Autowired private 用户Mapper userMapper; @Test public void testEq() { QueryWrapper<user> wrapper  $=$  new QueryWrapper<>(); //SELECT id,userName,password,name,age@email FROM tb_user WHERE password  $= ?$  AND age  $>= ?$  AND name IN  $(??,??,?)$  wrapper EQ("password","123456") .ge("age",20) .in("name","李四","王五","赵六"); List<user> users  $=$  this.userMapper.selectList(wrapper); for (User user : users){ System.out.println(user); } 1
```

# 5.3、模糊查询

like

LIKE'%'

○ 例: like("name", "王")--> name like '%王%'

notLike

- NOT LIKE '%值%'

○ 例: notLike("name", "王") ---> name not like '%王%'

- likeLeft

LIKE  $\%$  值  
例:likeLeft("name","王")-->name like '%王'

- likeRight

LIKE'值%  
○例: likeRight("name", "王")-->name like '王%'

测试用例：

```groovy
package cn.itcast.mp;   
import cn.itcast.mp)mapper.UserMapper;   
import cn.itcast.mp.pojo.User;   
import com.baomidou.mybatisplus.core_conditions.query(QueryWrapper;   
import org.junit.Test;   
import org.junit runner.RunWith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context.Junit4.SpringRunner;   
import java.util.List;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest {   
    @Autowired   
    private UserMapper userMapper;   
    @Test   
    public void testwrapper() { QueryWrapper <User> wrapper = new QueryWrapper <>();   
    //SELECT id, user_name, password, name, age, email FROM tb_user WHERE name LIKE ?   
    //Parameters: %曹%(String)   
    wrapper like ("name", "曹");   
    List <User> users = this.UserMapper.selectList(wrapper);   
    for (User user : users) { System.out.println(user); }   
}
```

# 5.4、排序

- orderBy

$\circ$  排序：ORDER BY字段,...

例: orderBy(true, true, "id", "name")-->order by id ASC, name ASC

- orderByAsc

排序：ORDER BY字段,...ASC  
例: orderByAsc("id", "name")-->order by id ASC, name ASC

- orderByDesc

排序：ORDER BY字段,...DESC  
例: orderByDesc("id", "name") --->order by id DESC, name DESC

测试用例：

```java
package cn.itcast.mp;   
import cn.itcast.mp)mapper.UserMapper;   
import cn.itcast.mp.pojo.User;   
import com.baomidou.mybatisplus.core_conditions.query(QueryWrapper;   
import org.junit.Test;   
import org.junit runner.JrunWith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.context.Junit4.SpringRunner;   
import java.util.List;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest { @Autowired private 用户Mapper userMapper; @Test public void testwrapper(){ QueryWrapper<user> wrapper  $=$  new QueryWrapper<>(); //SELECT id,name,password,name,age@email FROM tb_user ORDER BY age DESC wrapper.orderByDesc("age"); List<user> users  $=$  this.userMapper.selectList(wrapper); for(User user:users){ System.out.println(user); }   
}
```

# 5.5、逻辑查询

or

○拼接OR  
○ 主动调用 or 表示紧接着下一个方法不是用 and 连接!(不调用 or 则默认为使用 and 连接)

and

o AND 嵌套  
例: and(i -> i(eq("name", "李白").ne("status", "活着")))-->and (name = '李白' and status <> '活着')

测试用例：

```java
package cn.itcast.mp;   
import cn.itcast.mp)mapper.UserMapper;   
import cn.itcast.mp.pojo.User;   
import com.baomidou.mybatisplus.core_conditions.query(QueryWrapper;   
import org.junit.Test;   
import org.junit runnerR. Runwith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context{j unit4.SpringRunner;   
import java.util.List;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest { @Autowired private 用户Mapper userMapper; @Test public void testwrapper(){ QueryWrapper<User> wrapper  $=$  new QueryWrapper<>(); //SELECT id,user_name,password,name,age@email FROM tb_user WHERE name  $= ?$  OR age  $= ?$  wrapper(eq("name","李四").or().eq("age"，24); List<User> users  $=$  this.userMapper.selectList(wrapper); for (User user : users){ System.out.println(user); } 1
```

# 5.6、select

在MP查询中，默认查询所有的字段，如果有需要也可以通过select方法进行指定字段。

```txt
package cn.itcast.mp;   
import cn.itcast.mp mapper.UserMapper;   
import cn.itcast.mp.pojo.User;
```

```java
import com.baomidou.mybatisplus.core_conditions.query(Querywrapper;   
import org.junit.Test;   
import org.junit runner.Runwith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context.Junit4.SpringRunner;   
import java.util.List;   
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest { @Autowired private 用户Mapper userMapper; @Test public void testwrapper() { QueryWrapper<User> wrapper  $=$  new QueryWrapper<>(); //SELECT id,name,age FROM tb_user WHERE name  $=$  ? OR age  $=$  ? wrapper(eq("name","李四") .or() .eq("age",24) .select("id","name","age"); List<user> users  $=$  this.userMapper.selectList wrapper); for (User user : users) { System.out.println(user); } 1
```
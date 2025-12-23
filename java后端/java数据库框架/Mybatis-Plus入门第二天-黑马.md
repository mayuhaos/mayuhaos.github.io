# 课程介绍

ActiveRecord

- Oracle 主键Sequence
- Mybatis-Plus的插件
- SQL 注入器实现自定义全局操作
- 自动填充功能
- 逻辑删除
- 通用枚举
- 代码生成器
- MybatisX 快速开发插件

# 1、ActiveRecord

ActiveRecord（简称AR）一直广受动态语言（PHP、Ruby等）的喜爱，而Java作为准静态语言，对于ActiveRecord往往只能感叹其优雅，所以我们也在AR道路上进行了一定的探索，喜欢大家能够喜欢。

什么是ActiveRecord？

ActiveRecord也属于ORM（对象关系映射）层，由Rails最早提出，遵循标准的ORM模型：表映射到记录，记录映射到对象，字段映射到对象属性。配合遵循的命名和配置惯例，能够很大程度的快速实现模型的操作，而且简洁易懂。

ActiveRecord的主要思想是：

- 每一个数据库表对应创建一个类，类的每一个对象实例对应于数据库中表的一行记录；通常表的每个字段在类中都有相应的Field；
- ActiveRecord同时负责把自己持久化，在ActiveRecord中封装了对数据库的访问，即CURD；；  
  ActiveRecord是一种领域模型(Domain Model)，封装了部分业务逻辑；

# 1.1、开启AR之旅

在MP中，开启AR非常简单，只需要将实体对象继承Model即可。

```txt
1 package cn.itcast.mp.pojo;   
2   
3 import com.baomidou.mybatisplus_annotation.IdType;   
4 import com.baomidou.mybatisplus_annotation.TableField;   
5 import com.baomidou.mybatisplus_annotation.TableId;   
6 import com.baomidou.mybatisplus_annotation.TableName;   
7 import com.baomidou.mybatisplusextensionactiverecord.Model;   
8 import lombok.AllArgsConstructor;   
9 import lombok.Data;   
10 import lombok.NoArgsConstructor;   
11   
12 @Data   
13 @NoArgsConstructor   
14 @AllArgsConstructor   
15 public class User extends Model{
```

```java
private Long id;   
private String userName;   
private String password;   
private String name;   
private Integer age;   
private String email;   
}
```

# 1.2、根据主键查询

```java
@Runwith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest { @Autowired private UserMapper userMapper; @Test public void testAR(){ User user  $=$  newUser(); user.setld(2L); Useruser2  $=$  user.selectByld(); System.out.println(user2); }   
}
```

# 1.3、新增数据

```java
@RunWith(SpringRunner.class)   
@SpringBootTest   
public class 用户MapperTest { @Autowired private 用户Mapper userMapper; @Test public void testAR() { User user  $=$  newUser(); user.setName("刘备"); user.setAge(30); user Password("123456"); user用户名("liubei"); user.setEmail("liubei@itcast.cn"); boolean insert  $\equiv$  user.insert(); System.out.println insert);
```

结果：

```txt
20 1   
21 1   
22 1
```

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] => Preparing: INSERT INTO tb_user (user_name, password, name, age, email) VALUES (?, ?, ?, ?, ?)  
2 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] => Parameters: liubei(String), 123456(String), 刘备(String), 30(Integer), liubei@itcast.cn(String)  
3 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] <= Updates: 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153524633.jpg)

# 1.5、更新操作

结果：

```java
1 @RunWith(SpringRunner.class)   
2 @SpringBootTest   
3 public class UserMapperTest {   
4 @Autowired   
6 private UserMapper userMapper;   
7   
8 @Test   
9 public void testAR() {   
10 User user = new User();   
11 user.setId(8L);   
12 user.setAge(35);   
13   
14 boolean update = user.updateByld();   
15 System.out.printlnupdate);   
16 }   
17   
18 }
```

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG] => Preparing: UPDATE tb_user SET age=? WHERE id=?  
2 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG] => Parameters: 35(Integer), 8(Long)  
3 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG] <= Updates: 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153524634.jpg)

# 1.6、删除操作

```txt
1 @Runwith(SpringRunner.class)   
2 @SpringBootTest   
3 public class UserMapperTest {   
4   
5 @Autowired   
6 private UserMapper userMapper;   
7   
8 @Test   
9 public void testAR() {   
10     User user = new User();   
11     user.setId(7L);   
12   
13     boolean delete = user(deleteById());   
14         System.out.println(delete);   
15 }   
16   
17 }
```

# 结果：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper(deleteById] - [DEBUG] => Preparing: DELETE FROM tb_user WHERE id=?  
2 [main] [cn.itcast.mp mapper.UserMapper(deleteById] - [DEBUG] => Parameters: 7(Long)  
3 [main] [cn.itcast.mp mapper.UserMapper(deleteById] - [DEBUG] <= Updates: 1
```

# 1.7、根据条件查询

```java
1 @RunWith(SpringRunner.class)  
2 @SpringBootTest  
3 public class UserMapperTest {
```

结果：

```java
4   
5 @Autowired   
6 private 用户Mapper userMapper;   
7   
8 @Test   
9 public void testAR() {   
10 User user  $=$  new User();   
11 QueryWrapper<User>userQueryWrapper  $\equiv$  new QueryWrapper<>);   
12 userQueryWrapper.le("age","20");   
13   
14 List<User> users  $=$  user.selectList(userQueryWrapper);   
15 for (User user1:users){ System.out.println(user1);   
16 }   
17   
18 1   
19   
20
```

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $\equiv \equiv$  Preparing: SELECT id, user_name, password, name, age, email FROM tb_user WHERE age  $< = ?$    
2 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $\equiv \equiv$  Parameters: 20(String)   
3 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG]  $<   =   <   =$  Total: 2   
4   
5 User(id=2, userName=1isi, password=123456, name=李四，age=20，email  $\equiv$  test2@itcast.cn, address  $\equiv$  null)   
6 User(id=6, userName=caocao, password=123456, name=曹操, age=20, email  $\equiv$  test@itcast.cn, address  $\equiv$  null)
```

# 2、Oracle 主键Sequence

在mysql中，主键往往是自增长的，这样使用起来是比较方便的，如果使用的是Oracle数据库，那么就不能使用自增长了，就得使用Sequence序列生成id值了。

# 2.1、部署Oracle环境

为了简化环境部署，这里使用Docker环境进行部署安装Oracle。

```txt
1 #拉取镜像  
2 docker pull sath89/oracle-12c  
3  
4 #创建容器  
5 docker create --name oracle -p 1521:1521 sath89/oracle-12c  
6  
7 #启动  
8 docker start oracle && docker logs -f oracle  
9  
10 #下面是启动过程  
11 Database not initialized. Initializing database.  
12 Starting tnslsnr
```

```txt
13 Copying database files  
14 1% complete  
15 3% complete  
16 11% complete  
17 18% complete  
18 26% complete  
19 37% complete  
20 Creating and starting Oracle instance  
21 40% complete  
22 45% complete  
23 50% complete  
24 55% complete  
25 56% complete  
26 60% complete  
27 62% complete  
28 Completing Database Creation  
29 66% complete  
30 70% complete  
31 73% complete  
32 85% complete  
33 96% complete  
34 100% complete  
35 Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/xe/xe.log" for further details.  
36 Configuring Apex console  
37 Database initialized. Please visit http://#container:8080/em  
http://#container:8080/apex for extra configuration if needed  
38 Starting web management console  
39  
40 PL/SQL procedure successfully completed.  
41  
42 Starting import from '/docker-entrypoint-initdb.d':
ls: cannot access /docker-entrypoint-initdb.d/*: No such file or directory  
Import finished  
43  
44  
45  
46  
47  
48 #通过用户名密码即可登录  
49 用户名和密码为：system/oracle
```

下面使用navicat12进行连接并操作oracle，使用资料中提供的安装包，可以试用14天。

需要注意的是：由于安装的Oracle是64位版本，所以navicat也是需要使用64为版本，否则连接不成功。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153524635.jpg)

连接成功：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153524636.jpg)

# 2.2、创建表以及序列

```txt
1 --创建表，表名以及字段名都要大写  
2 CREATE TABLE "TB_USER"（  
3 "ID" NUMBER(20) VISIBLE NOT NULL，  
4 "USER_NAME"VARCHAR2(255 BYTE) VISIBLE，  
5 "password"VARCHAR2(255 BYTE) VISIBLE，  
6 "NAME"VARCHAR2(255 BYTE) VISIBLE，  
7 "AGE"NUMBER(10)VISIBLE，  
8 "EMAIL"VARCHAR2(255 BYTE) VISIBLE  
9 ）  
10   
11 --创建序列  
12 CREATE SEQUENCE SEQ_USER START WITH 1 INIncrement BY 1
```

# 2.3、jdbc驱动包

由于版权原因，我们不能直接通过maven的中央仓库下载oracle数据库的jdbc驱动包，所以我们需要将驱动包安装到本地仓库。

```txt
#ojdbc8.jar文件在资料中可以找到
2
3
4
5
6
7
8
9
10
```

安装完成后的坐标：

```xml
1 <dependency>
2 <groupId>com.Oracle</groupId>
3 <artifactId>ojdbc8</artifactId>
4 <version>12.1.0.1</version>
5 </dependency>
```

# 2.4、修改application.properties

对于application.properties的修改，需要修改2个位置，分别是：

```txt
1 #数据库连接配置  
2 springdatasource.driver-class-name=oracle-jdbc.OracleDriver  
3 springdatasource.url=jdbc:oracle:thin:@192.168.31.81:1521:xe  
4 springdatasource username=system  
5 springdatasource.password=oracle  
6  
7 #id生成策略  
8 mybatis-plus.global-config.db-config.id-type=input
```

# 2.5、配置序列

使用Oracle的序列需要做2件事情：

第一，需要配置MP的序列生成器到Spring容器：

```java
package cn.itcast.mp;   
import com.baomidou.mybatisplusextension.incrementer.OracleKeyGenerator;   
import com.baomidou.mybatisplusextensionplugins.PaginationInterceptor;   
import org.mybatis.spring annotation MapperScan;   
import org.springframework.context_annotationBean;   
import org.springframework.context.annotation.Configuration;   
@Configuration   
@MapperScan("cn.itcast.mp mapper")//设置mapper接口的扫描包   
public class MybatisPlusConfig {   
/\*\*   
\*分页插件   
\*/   
@Bean   
public PagingInterceptor paginationInterceptor() { return new PagingInterceptor();   
}   
/\*\*   
\*序列生成器   
\*/   
@Bean   
public OracleKeyGenerator oracleKeyGenerator(){ return new OracleKeyGenerator();
```

```txt
27 1   
28 1
```

# 第二，在实体对象中指定序列的名称：

```java
1 @KeySequence(value  $=$  "SEQ_USER",clazz  $=$  Long.class)   
2 public class User{   
3 1   
4 }
```

# 2.6、测试

```java
package cn.itcast.mp;   
import cn.itcast.mp.mapping.UserMapper;   
import cn.itcast.mp.pojo.User;   
import org.junit.Test;   
import org.junit;kiner. RunWith;   
import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.boot.test.context.SpringBootTest;   
import org.springframework.test.context.Junit4.SpringRunner;   
import java.util.List;   
@Runwith(SpringRunner.class)   
@SpringBootTest   
public class UserMapperTest {   
@Autowired   
private 用户Mapper userMapper;   
@Test   
public void testInsert(){ User user  $=$  newUser(); user.setAge(20); user.setEmail("test@itcast.cn"); user.setName("曹操"); user.setUserName("caocao"); user.setPassword("123456"); int result  $=$  this.userMapper.insert(user); //返回的结果是受影响的行数，并不是自增后的id System.out.println("result  $=$  " + result); System.out.println(user.getId()); //自增后的id会回填到对象中 }   
@Test   
public void testSelectByld(){ User user  $=$  this.userMapper.selectByld(8L); System.out.println(user);
```

40 41

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153524637.jpg)

# 3、插件

# 3.1、mybatis的插件机制

MyBatis 允许你在已映射语句执行过程中的某一点进行拦截调用。默认情况下，MyBatis 允许使用插件来拦截的方法调用包括：

1. Executor (update, query, flushStatements, commit, rollback, getTransaction, close, isClosed)
2. ParameterHandler (getParameterObject, setParameters)
3. ResultSetHandler (handleResultSets, handleOutputParameters)
4. StatementHandler (prepare, parameterize, batch, update, query)

我们看到了可以拦截Executor接口的部分方法，比如update，query，commit，rollback等方法，还有其他接口的一些方法等。

总体概括为：

1.拦截执行器的方法  
2.拦截参数的处理

3. 拦截结果集的处理  
   4.拦截Sql语法构建的处理

拦截器示例：

```java
1 package cn.itcast.mp plugins;   
2   
3 import org.apache.ibatis.executor Executor;   
4 import org.apache.ibatis.mappingmappedStatement;   
5 import org.apache.ibatis-plugin.*;   
6   
7 import java.util.Properties;   
8   
9 @Intercepts({@Signature( type  $\equiv$  Executor.class, method  $=$  "update", args  $=$  {MappedStatement.class,obj.class}）})   
10   
11   
12   
13 public class MyInterceptor implementsInterceptor{   
14   
15 @Override   
16 public object intercept(Invocation invocation) throwsThrowable{   
17 //拦截方法，具体业务逻辑编写的位置   
18 return invocation.proceed();
```

```txt
19 }   
20   
21 @override   
22 public object plugin(object target) {   
23 //创建target对象的代理对象，目的是将当前拦截器加入到该对象中   
24 return Plugin+Wrap(target, this);   
25 }   
26   
27 @Override   
28 public void setProperties(Properties properties) {   
29 //属性设置   
30 }   
31 }
```

注入到Spring容器：

```java
1 /* */
2 * 自定义拦截器
3 */
4 @Bean
5 public MyInterceptor myInterceptor(){
6 return new MyInterceptor();
7 }
```

或者通过xml配置，mybatis-config.xml：

```xml
<?xml version="1.0" encoding="UTF-8"?>   
<!DOCTYPE configuration   
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"   
"http://mybatis.org/dtd/mybatis-3-config.dtd">   
<configuration> <plugins> <plugin interceptor  $\equiv$  "cn.itcast.mpplugins.MyInterceptor></plugin>   
</plugins>   
</configuration>
```

# 3.2、执行分析插件

在MP中提供了对SQL执行的分析的插件，可用作阻断全表更新、删除的操作，注意：该插件仅适用于开发环境，不适用于生产环境。

SpringBoot配置：

测试：

```java
@Bean
public Bean ExplainInterceptor sqlExpressInterceptor() {
    sqlExpressInterceptor sqlExpressInterceptor = newsqlExpressInterceptor();
    List<ISqlParser> sqlParserList = new ArrayList<>();
    //攻击SQL阻断解析器、加入解析链
    sqlParserList.add(new BlockAttackSqlParser());
    sqlExpressInterceptor.setSqlParserList(sqlParserList);
    return sqlExpressInterceptor;
}
```

结果：

```java
1 @Test   
2 public void testUpdate(){   
3 User user  $=$  newUser();   
4 user.setAge(20);   
5 int result  $=$  this.userMapper.update(user，null);   
6 System.out.println("result  $=$  " + result);   
8 }
```

```txt
1 Caused by: com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation   
2 at   
com.baomidou.mybatisplus.core/toolkit.ExceptionUtilities.mpe(Exception Utilities.java:49)   
3 at com.baomidou.mybatisplus.core/toolkit.Assert真假Assert.java:38)   
4 at com.baomidou.mybatisplus.core/toolkit.Assert.notNull Assert.java:72)   
5 at   
com.baomidou.mybatisplusextension parsers.BlockAttackSqlParser processUpdate(BlockAtt ackSqlParser.java:45)   
6 at   
com.baomidou.mybatisplus.core-parser.AbstractSqlParserprocessParser(AbstractSqlParser. Java:92)   
7 at   
com.baomidou.mybatisplus.core-parser.AbstractSqlParserParsing(AbstractSqlParser.java :67)   
8 at   
com.baomidou.mybatisplusextensionhandlers.AbstractSqlParserHandler.sqlParser(Abstrac tSqlParserHandler.java:76)   
9 at   
com.baomidou.mybatisplus_extensionplugins.SqlExplainInterceptor.intercept(SqlExplainI nterceptor.java:63)   
10 at org.apache~-ibatis~-plugin~-Plugin.java:61)   
11 at com.sunproxy.\$Proxy70.update(unknown Source)   
12 at   
org.apache~-ibatis~-session~-defaults~-DefaultSqlSession.update(DefaultSqlSession.java:197 )   
13 ... 41 more
```

可以看到，当执行全表更新时，会抛出异常，这样有效防止了一些误操作。

# 3.3、性能分析插件

性能分析拦截器，用于输出每条 SQL 语句及其执行时间，可以设置最大执行时间，超过时间会抛出异常。

该插件只用于开发环境，不建议生产环境使用。

配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE configuration  
PUBLIC "/~/mybatis.org//DTD Config 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-config.dtd">  
<configuration>  
<plugins>  
<!-- SQL 执行性能分析，开发环境使用，线上不推荐。maxTime 指的是 sql 最大执行时长 -->  
<plugin>  
interceptor="com.baomidou.mybatisplusextensionplugins PerformanceInterceptor">  
<property name="maxTime" value="100" />  
<!--SQL是否格式化默认false-->  
<property name="format" value="true" />  
</plugin>  
</plugins>  
</configuration>
```

执行结果：

```sql
1 Time:11 ms - ID:cn.itcast.mp mapper.UserMapper.selectById  
2 Execute SQL :  
3 SELECT id,  
4 user_name,  
5 password,  
6 name,  
7 age,  
8 email  
9 FROM FROM  
10 tb_user  
11 WHERE  
12 WHERE  
13 id=7
```

可以看到，执行时间为11ms。如果将maxTime设置为1，那么，该操作会抛出异常。

```txt
1 Caused by: com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: The SQL execution time is too large, please optimize!   
2 at com.baomidou.mybatisplus.core/toolkit.Exception Utilities.mpe(Exception Utilities.java:49)   
3 at com.baomidou.mybatisplus.core/toolkit.Assert真假Assert.java:38)   
4
```

# 3.4、乐观锁插件

# 3.4.1、主要适用场景

意图：

当要更新一条记录的时候，希望这条记录没有被别人更新

乐观锁实现方式：

- 取出记录时，获取当前version
- 更新时，带上这个version
- 执行更新时，set version = newVersion where version = oldVersion  
  如果version不对，就更新失败

# 3.4.2、插件配置

spring xml:

```txt
1 <bean class="com.baomidou.mybatisplusextensionplugins.OptimisticLockerInterceptor"/>
```

spring boot:

```java
1 @Bean
2 public OptimisticLockerInterceptor optimisticLockerInterceptor()
3 return new OptimisticLockerInterceptor();
4 }
```

# 3.4.3、注解实体字段

需要为实体字段添加@Version注解。

第一步，为表添加version字段，并且设置初始值为1：

```sql
1 ALTER TABLE tb_user  
2 ADD COLUMN `version` int(10) NULL AFTER `email`;  
3  
4 UPDATE `tb_user` SET `version='1';
```

第二步，为User实体对象添加version字段，并且添加@Version注解：

```txt
1 @version 2 private Integer version;
```

# 3.4.4、测试

测试用例：

```java
1 @Test   
2 public void testUpdate(){   
3 User user  $=$  newUser();   
4 user.setAge(30);   
5 user IDs(2L);   
6 user版本(1)；//获取到version为1   
7 int result  $=$  this.userMapper.updateByld(user);   
8 System.out.println("result  $\equiv$  " + result);   
10 }
```

执行日志：

```ini
1 main] [com.baomidou.mybatisplusextension.parsers.BlockAttackSqlParser]-[DEBUG] Original SQL: UPDATE tb_user SET age  $= ?$    
2   
3 version  $= ?$  WHERE id  $= ?$  AND version  $= ?$    
4 [main] [com.baomidou.mybatisplusextension.parsers.BlockAttackSqlParser]-[DEBUG] parser sql: UPDATE tb_user SET age  $= ?$  ,version  $= ?$  WHERE id  $= ?$  AND version  $= ?$    
5 [main] [org.springframework-jdbc.DataSource.DataSourceArgs]-[DEBUG] Fetching JDBC Connection from DataSource   
6 [main] [org.mybatis.spring transaction.SpringManagedTransaction]-[DEBUG] JDBC Connection [HikariProxyConnection@540206885 wrapping com.mysql.jdbc.JDBC4Connection@27e0f2f5] will not be managed by Spring   
7 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG]  $\equiv = >$  Preparing: UPDATE tb_user SET age  $= ?$  ,version  $= ?$  WHERE id  $= ?$  AND version  $= ?$    
8 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG]  $\equiv = >$  Parameters: 30(Integer), 2(Integer), 2(Long), 1(Integer)   
9 [main] [cn.itcast.mp mapper.UserMapper.updateById]-[DEBUG]  $\leq = =$  Updates: 1   
10 [main] [org.mybatis.spring.SqlSessionArgs]-[DEBUG] Closing non transactional sqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@30135202]   
11 result  $= 1$
```

可以看到，更新的条件中有version条件，并且更新的version为2。

如果再次执行，更新则不成功。这样就避免了多人同时更新时导致数据的不一致。

# 3.4.5、特别说明

- 支持的数据类型只有:int,Integer,long,Long,Date,Timestamp,LocalDateTime
- 整数类型下 newversion = oldversion + 1
- newversion 会回写到 entity 中
- 仅支持updateByld(id)与update(entity,wrapper）方法
- 在update(entity,wrapper)方法下，wrapper不能复用!!!

# 4、Sql 注入器

我们已经知道，在MP中，通过AbstractSqlInjector将BaseMapper中的方法注入到了Mybatis容器，这样这些方法才可以正常执行。

那么，如果我们需要扩充BaseMapper中的方法，又该如何实现呢？

下面我们以扩展findAll方法为例进行学习。

# 4.1、编写MyBaseMapper

```java
1 package cn.itcast.mp mapper;   
2 import com.baomidou.mybatisplus.core mapper.BaseMapper;   
3 import java.util.List;   
4 public interface MyBaseMapper<T> extends BaseMapper<T> {   
5 List<T> findAll();   
6 }
```

其他的Mapper都可以继承该Mapper，这样实现了统一的扩展。

如：

```java
1 package cn.itcast.mp mapper;   
2 import cn.itcast.mp.pojo.User;   
3 public interface UserMapper extends MyBaseMapper<User> {   
4 6 User findByld(Long id);   
7 }
```

# 4.2、编写MySqlInjector

如果直接继承AbstractSqlInjector的话，原有的BaseMapper中的方法将失效，所以我们选择继承DefaultSqlInjector进行扩展。

```java
1 package cn.itcast.mp.sqlInjector;   
2   
3 import com.baomidou.mybatisplus.core.injector.AbstractMethod;   
4 import com.baomidou.mybatisplus.core.injector.DefaultSqlInjector;   
5   
6 import java.util.List;   
7   
8 public class MySqlInjector extends DefaultSqlInjector {   
9 @override   
10 public List<AbstractMethod> getMethodList() {   
11 List<AbstractMethod> methodList = super.getMethodList();   
12 methodList.add(new FindAll());   
13   
14   
15   
16 //再扩充自定义的方法   
17 list.add(new FindAll());   
18   
19 return(methodList;   
20 }   
21 }
```

# 4.3、编写FindAll

```java
1 package cn.itcast.mp.sqlInjector;   
2   
3 import com.baomidou.mybatisplus.core.eniums.SqlMethod;   
4 import com.baomidou.mybatisplus.core.injection.AbstractMethod;   
5 import com.baomidou.mybatisplus.core.metadata.TableInfo;   
6 import org.apache.ibatis.mapping.MappedStatement;   
7 import org.apache.ibatis.mapping.SqlSource;   
8   
9 public class FindAll extends AbstractMethod {   
10 @override   
11 public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?>modelClass, TableInfo tableInfo) {   
13 String sqlMethod = "findAll";   
14 String sql = "select * from " + tableInfo.getTableName();   
15 SQLSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);   
16 return this.addSelectMappedStatement mapperClass, sqlMethod, sqlSource, modelClass, tableInfo);   
17 }   
18   
19 }
```

# 4.4、注册到Spring容器

```java
1 /***
2 * 自定义SQL注入器
3 */
4 @Bean
5 public MySqlInjector mySqlInjector(){
6 return new MySqlInjector();
7 }
```

# 4.5、测试

```java
1 @Test   
2 public void testFindAll(){   
3 List<User> users  $=$  this.userMapper.findAll();   
4 for (User user : users){ System.out.println(user);   
5 }   
6 7
```

输出的SQL：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.findAll] - [DEBUG] => Preparing: select * from tb_user
2 [main] [cn.itcast.mp mapper.UserMapper.findAll] - [DEBUG] => Parameters:
3 [main] [cn.itcast.mp mapper.UserMapper.findAll] - [DEBUG] <= Total: 10
```

至此，我们实现了全局扩展SQL注入器。

# 5、自动填充功能

有些时候我们可能会有这样的需求，插入或者更新数据时，希望有些字段可以自动填充数据，比如密码、version等。在MP中提供了这样的功能，可以实现自动填充。

# 5.1、添加@TableField注解

```java
1 @TableField(fill = FieldFill INSERT) //插入数据时进行填充  
2 private String password;
```

为password添加自动填充功能，在新增数据时有效。

FieldFill提供了多种模式选择：

```txt
public enum FieldFill {
    /* 
        * 默认不处理
        */
    DEFAULT,
    /* 
        * 插入时填充字段
        */
    INSERT,
    /* 
        * 更新时填充字段
        */
    UPDATE,
    /* 
        * 插入和更新时填充字段
        */
    INSERT_UPDATE
}
```

# 5.2、编写MyMetaObjectHandler

```java
1 package cn.itcast.mp handler;   
2   
3 import com.baomidou.mybatisplus.corehandlers.MetaObjectHandler;   
4 import org.apache.ibatis.reflection.MetaObject;   
5 import org.springframework.stereotype-component;   
6   
7 @Component   
8 public class MyMetaObjectHandler implements MetaObjectHandler {
```

```java
9   
10 @Override   
11 public void insertFill(MetaObject metaobject) { Object password  $\equiv$  getFieldValByName("password", metaobject); if(null  $= =$  password){ //字段为空，可以进行填充 setFieldValByName("password", "123456", metaobject); }   
17 1   
18   
19 @Override   
20 public void updateFill(MetaObject metaobject）{
```

# 5.3、测试

```java
1 @Test   
2 public void testInsert(){   
3 User user  $=$  new User();   
4 user.setName("关羽");   
5 user用户名("guanyu");   
6 user.setAge(30);   
7 user.setEmail("guanyu@itast.cn");   
8 user Versions(1);   
9   
10 int result  $=$  this.userMapper.insert(user);   
11 System.out.println("result  $=$  " + result);   
12 }
```

结果：

<table><tr><td>id</td><td>user_name</td><td>password</td><td>name</td><td>age</td><td>email</td><td>version</td></tr><tr><td>2</td><td>lisi</td><td>123456</td><td>李四</td><td>30</td><td>test2@itcast.cn</td><td>2</td></tr><tr><td>3</td><td>wangwu</td><td>123456</td><td>王五</td><td>20</td><td>test3@itcast.cn</td><td>1</td></tr><tr><td>4</td><td>zhaoliu</td><td>123456</td><td>赵六</td><td>20</td><td>test4@itcast.cn</td><td>1</td></tr><tr><td>5</td><td>sunqi</td><td>123456</td><td>孙七</td><td>20</td><td>test5@itcast.cn</td><td>1</td></tr><tr><td>6</td><td>caocao</td><td>123456</td><td>曹操</td><td>20</td><td>test@itcast.cn</td><td>1</td></tr><tr><td>8</td><td>liubei</td><td>123456</td><td>刘备</td><td>20</td><td>liubei@itcast.cn</td><td>1</td></tr><tr><td>9</td><td>caocao</td><td>123456</td><td>曹操</td><td>20</td><td>test@itcast.cn</td><td>1</td></tr><tr><td>14</td><td>guanyu</td><td>123456</td><td>关羽</td><td>30</td><td>guanyu@itast.cn</td><td>1</td></tr></table>

# 6、逻辑删除

开发系统时，有时候在实现功能时，删除操作需要实现逻辑删除，所谓逻辑删除就是将数据标记为删除，而并非真正的物理删除（非DELETE操作），查询时需要携带状态条件，确保被标记的数据不被查询到。这样做的目的就是避免数据被真正的删除。

MP就提供了这样的功能，方便我们使用，接下来我们一起学习下。

# 6.1、修改表结构

为tb_user表增加deleted字段，用于表示数据是否被删除，1代表删除，0代表未删除。

```sql
1 ALTER TABLE tb_user  
2 ADD COLUMN `deleted` int(1) NULL DEFAULT 0 COMMENT '1代表删除，0代表未删除' AFTER  
    `version`;
```

同时，也修改User实体，增加deleted属性并且添加@TableLogic注解：

```txt
1 @TableLogic 2 private Integer deleted;
```

# 6.2、配置

application.properties :

```txt
1 #逻辑已删除值(默认为1)  
2 mybatis-plus.global-config.db-configlogic-delete-value=1  
3 #逻辑未删除值(默认为0)  
4 mybatis-plus.global-config.db-configlogic-not-delete-value=0
```

# 6.3、测试

```java
1 @Test   
2 public void testDeleteByld(){   
3 this.userMapper.deleteByld(2L);   
4 }
```

执行的SQL：

```scala
1 [main] [cn.itcast.mp mapper.UserMapper(deleteById]-[DEBUG] => Preparing: UPDATE tb_user SET deleted=1 WHERE id=? AND deleted=0
2 [main] [cn.itcast.mp mapper.UserMapper(deleteById]-[DEBUG] => Parameters: 2(Long)
3 [main] [cn.itcast.mp mapper.UserMapper(deleteById]-[DEBUG] <= Updates: 1
```

<table><tr><td>id▼</td><td>user_name</td><td>password</td><td>name</td><td>age</td><td>email</td><td>version</td><td>deleted</td></tr><tr><td>2</td><td>lisi</td><td>123456</td><td>李四</td><td>30</td><td>test2@itcast.cn</td><td>2</td><td>1</td></tr><tr><td>3</td><td>wangwu</td><td>123456</td><td>王五</td><td>20</td><td>test3@itcast.cn</td><td>1</td><td>0</td></tr><tr><td>4</td><td>zhaoliu</td><td>123456</td><td>赵六</td><td>20</td><td>test4@itcast.cn</td><td>1</td><td>0</td></tr><tr><td>5</td><td>sunqi</td><td>123456</td><td>孙七</td><td>20</td><td>test5@itcast.cn</td><td>1</td><td>0</td></tr><tr><td>6</td><td>caocao</td><td>123456</td><td>曹操</td><td>20</td><td>test@itcast.cn</td><td>1</td><td>0</td></tr><tr><td>8</td><td>liubei</td><td>123456</td><td>刘备</td><td>20</td><td>liubei@itcast.cn</td><td>1</td><td>0</td></tr><tr><td>9</td><td>caocao</td><td>123456</td><td>曹操</td><td>20</td><td>test@itcast.cn</td><td>1</td><td>0</td></tr><tr><td>14</td><td>guanyu</td><td>123456</td><td>关羽</td><td>30</td><td>guanyu@itast.cn</td><td>1</td><td>0</td></tr></table>

测试查询：

```java
1 @Test   
2 public void testSelectByld(){   
3 User user  $=$  this.userMapper.selectByld(2L);   
4 System.out.println(user);   
5 }
```

执行的SQL：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectByld]-[DEBUG]  $\Longrightarrow$  Preparing: SELECT id, user_name, password, name, age, email, version, deleted FROM tb_user WHERE id  $=$  ? AND deleted=0   
2 [main] [cn.itcast.mp mapper.UserMapper.selectByld]-[DEBUG]  $\Longrightarrow$  Parameters: 2(Long)   
3 [main] [cn.itcast.mp mapper.UserMapper.selectByld]-[DEBUG]  $<   =   <   =$  Total: 0
```

可见，已经实现了逻辑删除。

# 7、通用枚举

解决了繁琐的配置，让mybatis优雅的使用枚举属性！

# 7.1、修改表结构

```sql
1 ALTER TABLE `tb_user`  
2 ADD COLUMN `sex` int(1) NULL DEFAULT 1 COMMENT '1-男，2-女' AFTER `deleted`;
```

# 7.2、定义枚举

```txt
1 package cn.itcast.mp.enums;   
2 import com.baomidou.mybatisplus.core.enums.IEnum;   
3 import com.fasterxml.jackson.annotation JsonValue;   
4 public enum SexEnum implements IEnum<Integer> {   
5 7 MAN(1,"男"),
```

```java
9 WOMAN(2,"女");   
10   
11 private int value;   
12 private String desc;   
13   
14 SexEnum(int value, String desc) { this.value  $=$  value; this desc  $=$  desc;   
15   
16   
17 }   
18   
19 @override   
20 public Integer getValue() { return this.value;   
21   
22 }   
23   
24 @override   
25 public String toString(){ return this.desc;   
26   
27 }   
28
```

# 7.3、配置

1 #枚举包扫描  
2 mybatis-plus.type-enumspackage  $\equiv$  cn.itcast.mp.enums

# 7.4、修改实体

1 private SexEnum sex;

# 7.5、测试

测试插入数据：

```java
1 @Test   
2 public void testInsert(){   
3 User user  $=$  newUser();   
4 user.setName("貂蝉");   
5 user用户名("diaochan");   
6 user.setAge(20);   
7 user.setEmail("daochan@itast.cn");   
8 user Versions(1);   
9 user.setSex(SexEnum.WOMAN);   
10 int result  $=$  this.userMapper.insert(user);   
11 System.out.println("result  $=$  " + result);   
12 }
```

SQL：

1 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] => Preparing: INSERT INTO tb_user (user_name, password, name,
age, email, version, sex) VALUES (?,?,?,?,?,?,?,?,?)  
2 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] => Parameters: diaochan(String), 123456(String), 貂蝉(String),
20(Integer), diaochan@itast.cn(String), 1(Integer), 2(Integer)  
3 [main] [cn.itcast.mp mapper.UserMapper.insert]-[DEBUG] <= Updates: 1

<table><tr><td>id</td><td>user_name</td><td>password</td><td>name</td><td>age</td><td>email</td><td>version</td><td>deleted</td><td>sex</td></tr><tr><td>2</td><td>lisi</td><td>123456</td><td>李四</td><td>30</td><td>test2@itcast.cn</td><td>2</td><td>0</td><td>2</td></tr><tr><td>3</td><td>wangwu</td><td>123456</td><td>王五</td><td>20</td><td>test3@itcast.cn</td><td>1</td><td>0</td><td>1</td></tr><tr><td>4</td><td>zhaoliu</td><td>123456</td><td>赵六</td><td>20</td><td>test4@itcast.cn</td><td>1</td><td>0</td><td>1</td></tr><tr><td>5</td><td>sunqi</td><td>123456</td><td>孙七</td><td>20</td><td>test5@itcast.cn</td><td>1</td><td>0</td><td>1</td></tr><tr><td>6</td><td>caocao</td><td>123456</td><td>曹操</td><td>20</td><td>test@itcast.cn</td><td>1</td><td>0</td><td>1</td></tr><tr><td>8</td><td>liubei</td><td>123456</td><td>刘备</td><td>20</td><td>liubei@itcast.cn</td><td>1</td><td>0</td><td>1</td></tr><tr><td>9</td><td>caocao</td><td>123456</td><td>曹操</td><td>20</td><td>test@itcast.cn</td><td>1</td><td>0</td><td>1</td></tr><tr><td>14</td><td>guanyu</td><td>123456</td><td>关羽</td><td>30</td><td>guanyu@itast.cn</td><td>1</td><td>0</td><td>1</td></tr><tr><td>15</td><td>diaochan</td><td>123456</td><td>貂蝉</td><td>20</td><td>diaochan@itast.cn</td><td>1</td><td>0</td><td>2</td></tr></table>

# 查询：

```java
1 @Test   
2 public void testSelectByld(){   
3 User user  $=$  this.userMapper.selectByld(2L);   
4 System.out.println(user);   
5 }
```

# 结果：

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectById]-[DEBUG] => Preparing: SELECT id, user_name, password, name, age, email, version, deleted, sex FROM tb_user WHERE id=? AND deleted=0
```

```txt
2 [main] [cn.itcast.mp mapper.UserMapper.selectById]-[DEBUG] => Parameters: 2(Long)
```

```txt
3 [main] [cn.itcast.mp mapper.UserMapper.selectById]-[DEBUG] <= Total: 1
```

```txt
4   
5User(id=2，userName  $\equiv$  lisipassword  $= 123456$  ，name  $\equiv$  李四，age  $= 30$  ，email  $\equiv$  test2@itcast.cn, address  $\equiv$  null，version  $= 2$  ,deleted  $= 0$  ，sex  $\equiv$  女)
```

从测试可以看出，可以很方便的使用枚举了。

查询条件时也是有效的：

SQL：

```java
1     @Test
2     public void testSelectBySex() {
3         QueryWrapper<user> wrapper = new QueryWrapper<>();
4             wrapper EQ("sex", SexEnum.WOMAN);
58         List<user> users = this.userMapper.selectList wrapper);
68         for (User user : users) {
74             System.out.println(user);
80         }
98
```

```txt
1 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG] => Preparing: SELECT id, user_name, password, name, age, email, version, deleted, sex FROM tb_user WHERE deleted=0 AND sex = ?  
2 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG] => Parameters: 2(Integer)  
3 [main] [cn.itcast.mp mapper.UserMapper.selectList]-[DEBUG] <= Total: 3
```

# 8、代码生成器

AutoGenerator 是 MyBatis-Plus 的代码生成器，通过 AutoGenerator 可以快速生成 Entity、Mapper、MapperXML、Service、Controller
等各个模块的代码，极大的提升了开发效率。

效果：  
pom.xml :

```java
Project Mybatis-plus-samples 1 hidden ~/ideal/projects/mybatis-plus- 25 \*/p> mvm 26 \* mybatis-plus-sample-active-record 27 \* @author jobob mybatis-plus-sample-auto-fill-metainfo 28 \* @since 2018-09-12 mybatis-plus-sample-crud public class MysqIGenerator { mybatis-plus-sample-enum 30 public class MysqIGenerator { src 32 /public class MysqIGenerator { main 33 \* System.out.println(" + tip + ")"); 34 \* </p> MySqlGenerator resources 35 \*/ application.yml 36 public static String scanner(String tip) { m pom.xml 37 \* Scanner scanner = new Scanner(System.in); 38 \* StringBuilder help = new StringBuilder(); 39 \* append("请输入" + tip + ": "); 40 \* System.out.println(" + tip + ")"); 41 \* if ( scanner.hasNext()) { String ipt = scanner.next(); if (StringBuilder.isEmpty(ipt)) { return ipt; } 42 \* throw new MybatisPlusException("请输入正确的" + tip + " External Libraries Mybatis-plus-sample-quickstart-springmvc 43 \* scanner.hasNext(); 44 \* if (StringBuilder.isEmpty(ipt)) { return ipt; } 45 \* return ipt; } 46 \* Mybatis-plus-sample-quickstart-springmvc 47 \* scanner.hasNext(); 48 \* if (StringBuilder.isEmpty(ipt)) { return ipt; } 50 \* Mybatis-plus-sample-quickstart-springmvc 49 \* Mybatis-plus-sample-quickstart-springmvc 50 \* Mybatis-plus-sample-quickstart-springmvc 51
```

# 8.1、创建工程

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
		\xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelversion>4.0.0</modelversion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.4.RELEASE</version>
    </parent>
    <groupId>cn.itcast.mp</groupId>
    <artifactId>itcast-mp-generator</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope test</scope>
        </dependency>
    </dependency>
    <!--mybatis-plus的springboot支持-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.1.1</version>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-generator</artifactId>
        <version>3.1.1</version>
    </dependency>
    <!--mybatis驱动-->
    <dependency>
        <groupId>mysqI</groupId>
        <artifactId>mysqI-connector-java</artifactId>
        <version>5.1.47</version>
    </dependency>
    <!--mybatis驱动-->
    <dependency>
        <groupId>org slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
    </dependency>
</dependencies>
```

```txt
53 <plugins>   
54 <plugin>   
55 <groupId>org.springframework.boot</groupId>   
56 <artifactId>spring-boo-t-maven-plugin</artifactId>   
57 </plugin>   
58 </plugins>   
59 </build>   
60   
61 </project>
```

# 8.2、代码

```java
package cn.itcast.mp.generator;   
import java.util.ArrayList;   
import java.util.List;   
import java.util.Scanner;   
import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;   
import com.baomidou.mybatisplus.core TOOLkit.StringPool;   
import com.baomidou.mybatisplus.core TOOLkit.Stringutils;   
import com.baomidou.mybatisplus.generator.AutoGenerator;   
import com.baomidou.mybatisplus.generator.InjectionConfig;   
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;   
import com.baomidou.mybatisplus.generator.config.FileOutConfig;   
import com.baomidou.mybatisplus.generator.config.GlobalConfig;   
import com.baomidou.mybatisplus.generator.config.PackageConfig;   
import com.baomidou.mybatisplus.generator.config StrategyConfig;   
import com.baomidou.mybatisplus.generator.config templatesConfig;   
import com.baomidou.mybatisplus.generator.config.po.TableInfo;   
import com.baomidou.mybatisplus.generator.config/rules.NamingStrategy;   
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;   
\*\*\* \* <p> \* mysql 代码生成器演示例子 \* </p>   
public class MysqIGenerator {   
/\*\*\* \* <p> \*读取控制台内容 \* </p>   
\*/   
public static String scanner(String tip) { Scanner scanner  $=$  new Scanner(System.in); StringBuilder help  $=$  new StringBuilder(); help.append("请输入"  $^+$  tip  $^+$  ":"); System.out.println.help.toString()); if (scatter.hasNext()) { String ipt  $=$  scanner.next();
```

```java
if (StringUtilities.isEmpty(ipt)) { return ipt; } throw new MybatisPlusException("请输入正确的" + tip + !");   
}   
\*\* RUN THIS   
\*/   
public static void main(String[] args) { //代码生成器 AutoGenerator mpg = new AutoGenerator(); //全局配置 GlobalConfig gc = new GlobalConfig(); String projectPath = SystemGetProperty("user.dir"); gc.setOutputDir(projectPath + "/src/main/java"); gc.setAuthor("itcast"); gc.setOpen(false); mpg.setGlobalConfig(gc); //数据源配置 DataSourceConfig dsc = new DataSourceConfig(); dsc.setUrl("jdbc:mysql://127.0.0.1:3306/mp?useUnicode=true&useSSL=false&characterEncodingutf8"); //dsc.setSchemaName("public"); dsc.setDriverName("com.mysql.jdbc.Driver"); dscUsername("root"); dsc.setUsername("root"); mpg.setDataSource(dsc); //包配置 PackageConfig pc = new PackageConfig(); pc.setModuleName(scanner("模块名")); pc.setParent("cn.itcast.mp.generator"); mpg.setPackageInfo(pc); //自定义配置 InjectionConfigcfg = new InjectionConfig() { @Override public void initMap(){ //to do nothing } }; List<FileOutConfig> focList = new ArrayList<>(); focList.add(new FileOutConfig("/templates/maps.ftf1") { @Override public string outputFile(TableInfo tableInfo){ //自定义输入文件名称 return projectPath + "/itcast-mp- generator/src/main/resources/mapper/" + pc.getModuleName()
```

```txt
+ "/" + tableInfo.getName() + "Mapper" +  
StringPool.DOT Xml;  
}  
}）；  
cfg.setFileOutConfigList(focList);  
mpg.setCfgcfg);  
mpg.setTemplate(new TemplateConfig().setXml(null));  
//策略配置StrategyConfig strategy = new StrategyConfig();strategy Naming(NamingStrategy~-to_camel);strategy.columnsNaming(NamingStrategy~-to_camel);  
//strategy.setSuperEntityClass("com.baomidou.mybatisplus_samples.generator/common.BaseE  
ntity");strategy.setEntityLombokModel(true);  
//strategy.setSuperControllerClass("com.baomidou.mybatisplus_samples.generator/common.B  
aseController");strategy.setInclude(scanner("表名"));strategy.setSuperEntityColumns("id");strategy.setControllerMappingHyphenStyle(true);strategy.setTablePrefix(pc/moduleName() + "_");mpg.setStrategy(strategy);//选择freemarker引擎需要指定如下加，注意pom依赖必须有！mpg.setTemplateEngine(new FreemarkerTemplateEngine());mpg.exec();  
}
```

# 8.3、测试

请输入模块名：

user

请输入表名：

tb user

```txt
16:38:30.403 [main] DEBUG com.baomidou.mybatisplus.generator.AutoGenerator - =准备生成  
16:38:30.902 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录：[F:\code  
16:38:30.902 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录：[F:\code  
16:38:30.903 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录：[F:\code  
16:38:30.904 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录：[F:\code  
16:38:30.904 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录：[F:\code  
log4j:WARN No appenders could be found for logger (freemarker.cache).  
log4j:WARN Please initialize the log4j system properly.  
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.  
16:38:31.149 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/en  
16:38:31.156 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/m  
16:38:31.161 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模英，图  
16:38:31.164 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模
```

代码已生成：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153524638.jpg)

实体对象：

```java
@Accessors(chain = true)   
public class TbUser implementsSerializable { private static final long serialversionUID  $=$  1L; /\*\* \*用户名 \*/ private String userName; /\*\* \*密码 \*/ private String password; /\*\* \*姓名 \*/ private String name; /\*\* \*年龄 \*/ private Integer age; /\*\* \*邮箱 \*/ private String email;
```

# 9、MybatisX 快速开发插件

MybatisX是一款基于IDEA的快速开发插件，为效率而生。

安装方法：打开IDEA，进入File->Settings->Plugins->BrowseRepositories，输入mybatisx搜索并安装。

功能：

- Java 与 XML 调回跳转
- Mapper 方法自动生成 XML

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251129153524639.jpg)
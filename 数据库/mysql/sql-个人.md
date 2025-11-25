# sql星球

::: tip SQL学习目录
<p style="color: red;">sql我就不用多说啦！</p>
<p style="color: red;">增删改查 sql语句什么 select、update、delete...作为后端开发必看!必学！必会！</p>
大学开设课程了，但我感觉讲的还是不全，就又去看视频啦！

* SQL Shell里边的\help命令

* 数据类型

* 数据库操作

* 模式

* 表操作

* 约束

* 插入数据

* 查询数据

* 子查询

* 别名

* 常用函数

* 连接

* UNION

* 运算符

* 更新数据

* 删除数据

* ORDER BY、GROUP BY、HAVING

* LIMIT、OFFSET、LIKE

* WITH

* DISTINCT
*  **<p style="color:red">加油~</p>**

:::

## SQLShell里边的\help命令

安装了数据库后，可以从自带的SQL Shell里边进入到数据库里边，然后，就可以使用\help命令，查看对应的

命令详情

```sh
\help
\help INSERT
```

![image-20230623122627565](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231226633.png)

![image-20230623122631716](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231226766.png)

## 数据类型

PostgreSQL中主要有三种类型的数据类型：

* 数值数据类型（smallint，integer，bigint，decimal，numeric，real，double，serial，bigserial）

* 字符串数据类型（char，varchar，text）

* 日期/时间数据类型（timestamp，date，time，interval（时间间隔））

一些其他的数据类型

* 布尔类型（boolean）

* 货币类型（money）

* 几何类型（point，line，lseg，box，path，polygon，circle）


## 数据库操作

#### 创建数据库   

```shell
create database testdb;
```

#### 删除数据库   

```shell
drop database testdb;
```

## 模式

```shell
create schema public1;
```

![image-20230623122903876](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231229926.png)

PostgreSQL 模式（SCHEMA）可以看着是一个表的集合。

一个模式可以包含视图、索引、数据类型、函数和操作符等。

相同的对象名称可以被用于不同的模式中而不会出现冲突，例如 public和 public1都可以包含名为 mytable 的表。

使用模式的优势：

* 允许多个用户使用一个数据库并且不会互相干扰。

* 将数据库对象组织成逻辑组以便更容易管理。

* 第三方应用的对象可以放在独立的模式中，这样它们就不会与其他对象的名称发生冲突。

模式类似于操作系统层的目录，但是模式不能嵌套。

## 表操作

#### 创建表

```sh
CREATE TABLE table_name(  
   column1 datatype,  
   column2 datatype,  
   column3 datatype,  
   .....  
   columnN datatype,  
   PRIMARY KEY( one or more columns )  
);
```

table_name：表名

column：列名

datatype：数据类型

#### 删除表

```sh
drop table table_name;
```

![image-20230623204116731](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232041843.png)

## 约束

* NOT NULL：指示某列不能存储 NULL 值。

* UNIQUE：确保某列的值都是唯一的。

* PRIMARY Key：NOT NULL 和 UNIQUE 的结合。确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录。。

* CHECK： 保证列中的值符合指定的条件。

* EXCLUSION ：排他约束，保证如果将任何两行的指定列或表达式使用指定操作符进行比较，至少其中一个操作符比较将会返回 false 或空值。

```shell
CREATE TABLE subject (
  "id" int4 PRIMARY KEY NOT NULL,
  "name" char(100) UNIQUE
)
```

数据库执行一次 CREATE EXTENSION btree_gist 命令，这将安装 btree_gist 扩展，它定义了对纯标量数据类型的 EXCLUDE 约束。才能用gist

```shell
CREATE TABLE STUDENT (
ID INT PRIMARY KEY NOT NULL,
NAME TEXT NOT NULL,
AGE INT NOT NULL,
subject INT REFERENCES subject2 ( ID ),
GRADES REAL CHECK ( GRADES > 0 ),
EXCLUDE USING gist (
NAME WITH =,
AGE WITH <> ) );
```

## 插入数据

```shell
INSERT INTO table_name (column1, column2, column3,...columnN)  
VALUES (value1, value2, value3,...valueN);

INSERT INTO student1 (id, name, subjects)  
VALUES (1, '张三', '语文'),(2, '张三', '数学');
```

table_name：表名

column：字段名

value：值

## 查询数据

```shell
SELECT "column1", "column2".."column" FROM "table_name";
```

```sh
SELECT id,name,subjects FROM "student1"
```

Tip：使用 * 号可以读取该表的所有数据

table_name：表名

column：字段名

## 子查询

```shell
SELECT column [, column ]
FROM   table1 [, table2 ]
WHERE  column OPERATOR
      (SELECT column [, column ]
      FROM table1 [, table2 ])
```

```sh
SELECT id ,name
FROM   student1
WHERE  id in
      (SELECT id
      FROM student2 where name = '22')
```

table：表名

column：列名

alias_name：别名

WHERE [condition]

## 别名

SQL 中 使用 AS 来创建别名。（列的别名、表的别名）

```shell
SELECT column_name AS alias_name
FROM table_name
WHERE [condition];
```

```shell
SELECT column1, column2....
FROM table_name AS alias_name
WHERE [condition];
```

```shell
SELECT id as name, name as id
FROM student1
```

table_name：表名

column：列名

alias_name：别名

WHERE [condition]

## 常用函数

* COUNT 函数：用于计算数据库表中的行数。

* MAX 函数：用于查询某一特定列中最大值。

* MIN 函数：用于查询某一特定列中最小值。

* AVG 函数：用于计算某一特定列中平均值。

* SUM 函数：用于计算数字列所有值的总和。

* abs(x)函数：绝对值。

* mod(y, x)：取余。

* string 丨丨 string：字串连接。

* lower(string)、upper(string)函数：把字串转化为小写、把字串转化为大写。

* split_part(string text, delimiter text, field int)函数：根据delimiter分隔string返回生成的第field个子字串(1 Base)。

* to_char(‘’, ‘’)、to_date(‘’, ‘’)、to_number(‘’, ‘‘)函数：转化为字符串。

## 连接

![image-20230623204648435](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232046495.png)

```shell
SELECT table1.column1, table2.column2...
FROM table1
INNER JOIN table2
ON table1.common_filed = table2.common_field;
```

## UNION

UNION 操作符用于合并两个或多个 SELECT 语句的结果集。

​    请注意，UNION 内部的每个 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每个 SELECT 语句中的列的顺序必须相同。

```sh
SELECT column1 [, column2 ]
FROM table1 [, table2 ]
[WHERE condition]

UNION

SELECT column1 [, column2 ]
FROM table1 [, table2 ]
[WHERE condition]
```

```shell
SELECT ID,NAME
FROM student1
UNION
SELECT ID,NAME
FROM student2
```

UNION ALL 操作符可以连接两个有重复行的 SELECT 语句，默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。

## 运算符

![image-20230623204815668](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232048732.png)

![image-20230623204819125](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232048182.png)

![image-20230623204823153](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232048205.png)

![image-20230623204826835](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232048883.png)

## 更新数据

```shell
UPDATE table_name  
SET column1 = value1, column2 = value2...., columnN = valueN  
WHERE [condition];
```

```shell
UPDATE student1  SET name = '李四'  WHERE id = 2;
```

table_name：表名

column：列名

value：值

WHERE [condition]

## 删除数据

```shell
DELETE FROM table_name  
WHERE [condition];
```

```shell
DELETE FROM student1 WHERE id = 2;
```

table_name：表名

WHERE [condition]

## ORDER BY、GROUP BY、HAVING

```shell
SELECT column-list
FROM table_name
[WHERE condition]
GROUP BY column1, column2....columnN
ORDER BY column1, column2, .. columnN [ASC | DESC];
```

```shell
SELECT name,sum(sorce) sorce FROM student1  
GROUP BY name
ORDER BY sorce DESC
```

![image-20230623205006345](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232050396.png)

![image-20230623205019460](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232050505.png)

```shell
SELECT name FROM student1 GROUP BY name HAVING avg(sorce) >= 75
```

![image-20230623205032322](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232050361.png)

table_name：表名

WHERE [condition]

ASC：升序

DESC：降序

## LIMIT、OFFSET、LIKE

PostgreSQL 中的 limit 子句用于限制 SELECT 语句中查询的数据的数量。

```shell
SELECT column1, column2, columnN 
FROM table_name
LIMIT [no of rows] OFFSET [row num]
```

在 PostgreSQL 数据库中，我们如果要获取包含某些字符的数据，可以使用 LIKE 子句。

在 LIKE 子句中，通常与通配符结合使用，通配符表示任意字符，在 PostgreSQL 中，主要有以下两种通配符：

* 百分号 %

* 下划线 _

如果没有使用以上两种通配符，LIKE 子句和等号 = 得到的结果是一样的。

```shell
SELECT * FROM table_name WHERE name LIKE '%-%';
```

column：列名

table_name：表名

[no of rows]、[row num]：数字

## WITH

```shell
WITH
   name_for_summary_data AS (
      SELECT Statement)
   SELECT columns
   FROM name_for_summary_data
```

```shell
WITH
   with_test AS (
      SELECT name,sum(sorce) sorce  FROM student1 GROUP BY name)
   SELECT name,sorce
   FROM with_test
```

使用 RECURSIVE 关键字和 WITH 子句可以实现递归查询

![image-20230623205229554](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232052602.png)

![image-20230623205234792](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232052831.png)

## DISTINCT

```shell
SELECT DISTINCT column1, column2,.....columnN
FROM table_name
WHERE [condition]
```

DISTINCT 关键字与 SELECT 语句一起使用，用于去除重复记录，只获取唯一的记录。

```shell
SELECT DISTINCT name FROM student1;
```

![image-20230623205320210](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232053252.png)

![image-20230623205323563](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232053602.png)

table_name：表名

WHERE [condition]

ASC：升序

DESC：降序

# 常用ORM

1.1、create方法：记录创建方法。创建记录的orm函数。页面新建点击保存时触发调用。返回值为创建成功的记录集。

1.2、write方法：记录更新方法。修改记录的orm函数。页面编辑点击保存时触发调用。返回值为布尔，True修改成功，False修改失败。

1.3、unlink方法：记录删除方法。删除记录的orm函数。页面点击删除时触发调用。删除成功返回True

1.4、search方法：记录查询方法。根据domain条件返回对应记录集，符合查询条件的记录集。

1.5、search_count方法：记录查询统计行数方法。根据domain条件查询符合条件的记录条数，返回值为整型，条件查询结果的条数。

1.5、read方法：记录数据获取方法。返回值为字典列表。

1.6、search_read方法：数据查询方法。返回值为数据集列表，符合查询条件的字典列表。

1.7、name_search方法：many2one字段点击时调用的方法

1.8、browse方法：使用id查询记录集方法。

1.9、ids方法：获取记录集中的id列表。

1.10、exists方法：返回存在于数据库的记录。

1.11、ensure_one方法：校验记录集是否为单例。

1.12、mapped方法：读取记录集字段值。

1.13、filtered方法：记录集筛选。

1.14、filtered_domain方法：domian格式记录集筛选。

1.15、sorted方法：记录集排序

1.16、_auto_init方法：模块升级安装模型初始化方法。

1.17、init方法：模块升级安装模型初始化方法

1.18、fields_get_keys方法：模型字段名称获取方法。

1.19、copy方法：记录复制方法。

#### odoo中env的讲解

uid：当前用户的id，res_users表的id

user：当前用户的数据对象，res.users的数据对象

company：当前公司的数据对象

companys：用户允许访问的公司的数据对象

cr：链接postgresql数据的游标对象

context：上下文，字典格式，不可修改

su：是否有超级用户的权限，是个Boolean值

1、sudo方法：赋予超级权限。

2、with_user方法：替换记录集用户。

3、with_context方法：替换记录集上下文。调用的时候需要特别注意，不适当的调用方法会丢失上下文已有数据

4、env中的ref方法，作用是通过xml数据文件中定义的外部ID（模型名.record标签中的id名称）找到对应模型的数据记录

1、odoo中多公司的控制，用户当前公司env.company，用户当前已勾选公司allowed_company_ids

2、还可以通过上下文给字段赋默认值default_字段名，给搜索视图赋默认值search_default_搜索视图相关名称

3、One2many、Many2many字段快捷命令操作

#### Many2many

(0,0,{values}) 根据values里面的信息新建一个记录。

(1,ID,{values})更新id=ID的记录（写入values里面的数据）

(2,ID) 删除id=ID的数据（调用unlink方法，删除数据以及整个主从数据链接关系）

(3,ID) 切断主从数据的链接关系但是不删除这个数据

(4,ID) 为id=ID的数据添加主从链接关系。

(5) 删除所有的从数据的链接关系就是向所有的从数据调用(3,ID)

(6,0,[IDs]) 用IDs里面的记录替换原来的记录（就是先执行(5)再执行循环IDs执行（4,ID））

#### one2many

(0, 0,{ values })根据values里面的信息新建一个记录。

(1,ID,{values}) 更新id=ID的记录（对id=ID的执行write 写入values里面的数据）

(2,ID) 删除id=ID的数据（调用unlink方法，删除数据以及整个主从数据链接关系）

## 常用装饰器

2.1、api.constrains:

数据校验修饰器。输入参数为模型字段名称。例如@api.constrains('name', 'description')

绑定方法，用于字段值校验。

2.2、api.onchange:

数据变动修饰器。输入参数为模型字段名称。例如@api.onchange('partner_id')

绑定方法，当参数值字段变动时触发调用函数。用于页面数据变动，计算其他字段值。

2.3、api.depends:

计算依赖修饰器。输入参数为模型字段名称。例如@api.depends('name', 'partner_id.name', 'partner_id.is_company')

用于修饰计算字段的计算方法，参数值字段变化时触发计算。

2.4、api.model:

模型修饰器。使用该修饰器的方法，第一个参数self会去除记录集ids，只带有模型相关属性。

2.5、api.model_create_multi:

多例创建修饰器。用于对重新的create方法修饰，使函数入参变成list多例模式

## 搜索功能的用法

1、模型的_rec_name属性

2、模型自动创建的计算字段display_name，搜索源码_compute_display_name查看对应方法

3、name_get方法：返回“self”中记录的文本表示。 默认情况下，这是“display_name”字段的值

4、name_search方法：搜索字段与给定匹配的记录

5、search_read方法：执行 :meth:`search`，然后执行 :meth:`read`。

6、domain表达式详解：https://www.cnblogs.com/ygj0930/p/10826127.html

>domain表达式是一个条件列表，每个条件是一个形如('field_name', 'operator', value')的元组。
>
>filed_name 是需要筛选的字段，它可以使用点（.）来访问关系模块的字段。
>
>value 是一个Python表达式的值。它可以使用字符值，比如：字符串，数字，布尔值，或则列表、某个字段、用户在context中自定义的有效的值。
>
>operator 可以为：
>
>  常用的操作符：<,>,<=,>=,=,!=。
>
>  '=like'通配符，使用下划线(_)时，匹配一个任意字符，使用百分号(%)时，匹配多个字符。
>
>  'like'匹配一个’%value%’的字符串。’ilike’与此类似但不区分大小写。‘not like’和‘not ilike’也可以使用
>
>  'child of'在层级关系中，筛选子集
>
>  'in'和’not in’筛选是否在一个列表里面，所以给的值应该是个list。当在’to-many’的关系字段中，‘in’的作用和contains的作用一样

## 自带工具函数

**路径在odoo/odoo/tools中**

1、比较常用的小数工具float_utils.py

1.1、float_round

1.2、float_is_zero

1.3、float_compare

2、比较常用的日期处理工具date_utils.py

3、获取项目启动时加载的配置信息config.py

4、比较常用的分组数据的函数misc.py里的groupby。（和python里itertools.groupby的区别）

5、自动计算行号

6、序列初始化和调用

7、快码初始化和使用

## 前端常用挂件

1、tree视图字段链接：需要点击的字段添加，options="{'field_click': true, 'function_name': 'jump_to_writeoff_head'}"

2、行禁止打开：one2many字段上添加，options="{'no_edit_no_open':1}"

3、wizard动作在tree上生成按钮：

![image-20230622220817478](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222208578.png)

4、M2O字段选择去重：widget="o2m_unique"

5、行删除按钮前置：tree标签添加，delete_forward=”1”

6、复制，编辑，删除按钮按条件隐藏，form标签上添加，编辑按钮控制：edit_control，复制按钮控制：copy_control

删除按钮控制：delete_control，例如，edit_control="[('state','=','created')]"
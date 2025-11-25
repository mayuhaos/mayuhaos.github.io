# 开发模块
## 目录架构

![image-20230622204357571](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222043658.png)

必要目录及文件：

- __init__.py：每个模块均为一个包，需要标识导入。

- __manifest__.py：模块属性配置文件

- static：静态文件存放目录。存放js、css等文件

- i18n：翻译配置文件存放路径

+ model：模型存放包

+ views：视图数据文件存放目录

- security：权限配置文件存放目录

- data：数据文件存放目录

## 开发一个模型

上文中创建的类my_module是odoo中的标准实例化模型，会在数据库中对应生成一张数据表。_name：模型名称属性，全局唯一。默认会在数据库中创建名称为将英文句号.替换成下划线_的表。如_name = 'my_module.my_module'会创建表 my_module_my_module。description：模型描述。

![image-20230622204621773](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222046864.png)

## 模型字段

#### 一、常用字段类型

1.fields.Integer：整数类型

2.fields.Float：浮点数类型

3.fields.Char：字符串类型

4.fields.Date：日期类型。

5.fields.Selection：列表类型。

6.fields.Reference：参考字段类型。该类型是selection类型的延伸，用于存储关联表数据行

7.fields.Many2one：多对一字段类型。表关联多对一结构。

8.fields.One2many：一对多字段类型。和fields.Many2one多对一字段类型相对应

9.fields.Many2many：多对多字段类型。多对多表结构设置。

---



Odoo模型直接的关系可以理解成数据库表中间的关系，一般有如下三种：

1、多对一（many2one）

2、一对多（one2many）

3、多对多（many2many）

1和2一般是成对出现的，也对应了odoo中的三种字段类型：

1、Many2one：在数据库中相当于给表添加了一个外键关联另一个表，特有参数ondelete，特有参数domain

2、One2many：一对多字段类型。和fields.Many2one多对一字段类型相对应。

 特有参数comodel_name：关联模型。必输，设置使用当前模型为外键模型的Many2one字段所在模型。

 特有参数inverse_name：反向字段名称。必输，设置使用当前模型为外键模型的Many2one字段。

3、Many2many：多对多字段类型。多对多表结构设置。

特有参数comodel_name：关联模型。必输，设置字段关联的多对多模型。

特有参数relation：关系表。必输，多对多关系的中间表。

特有参数column1：关系表中存储当前表主键的字段名。

特有参数column2：关系表中存储当对方表主键的字段名。

特有参数domain：参考fields.Many2one。

#### 二、常用字段属性

1、string：页面显示的字段标签名称。缺省则显示字段本身

2、help页面显示的字段提示信息。缺省则显示字段本身。

3、readonly：字段只读参数。默认为False，设置为True时，页面该字段不可编辑。

4、required：字段必输参数。默认为False，设置为True时，页面该字段必输，数据表该字段不能为空。

5、index：字段索引参数。默认为False，设置为True时，数据表该字段建立索引。

6、default：字段默认值参数。缺省为空。可设置固定值或者带返回值方法。

7、store：可存储参数。普通字段默认为True，字段值存储数据库表中。computed字段，默认为False，不在数据库表中存储字段的值

8、compute：计算字段参数。设置该参数的字段为计算字段，该字段的值由配置的计算方法计算得出。

9、related：引用字段参数。设置了该参数的字段相当于是配置字段的一个复制字段

10、domain：domain表达式。通常用来筛选数据记录。它们使用特殊的语法，以便于Odoo ORM 将它们解析后生成对应的SQL WHERE数据库筛选语句。

## 开发tree视图

视图定义了模型数据如何显示, 每种类型的视图代表一种数据可视化模式，

基本的视图定义：一个视图是以一条ir.ui.view模型数据的形式定义的。

视图可以用于存储业务数据，用于向用户展现数据以及输入数据等。View的构成包括field，group，button，page，notebook，tree，form，footer等用户界面设计元素。

View每一个视图文件都需要在___manifest__.py文件中定义，视图的存储表是ir.ui.view, 一个view被声明为一个record，每一种视图的共有属性，model，name，arch,view的类型在视图arch字 段中设置，包含了:

  a. tree

  b. form

  c. search

  d. action

  e. menu

  f. data、kanban、日历、甘特

以列表形式展示多条数据，根元素是**tree**，其中包裹任意field，每一个field就是列表 中的一列

```xml
<!-员工tree视图-->
<record model="ir.ui.view"id="eno_employee tree">
    <field name="name">员工tree</field>
    <field name="model">eno.employee</field>
    <field name="type">tree</field>
    <field name="arch"type="xml">
        <tree string="员工">
            <field name="code"/>
            <field name="name"/>
            <field name="gender"/>
            <field name="email"/>
            <field name="telephone"/>
            <field name="company_id"/>
        </tree>
    </field>
</record>
```

editable：默认，选择列表视图的行打开对应的 表单视图。editable 属性让视图本身在原处可编辑。

有效的值有 top 和 bottom，让新记录分别出现在列表的顶部或底部。

default_order：重载视图的顺序，替换模型的默认顺序。值为一个字段的逗号分隔列表，后接 desc 来进行反向排序：

create, edit, delete, duplicate, import, export_xlsx：允许通过设置相应属性为 false来在视图中禁用相应的动作

attrs：基于记录值的动态属性。属性对作用域的映射，作用域在当前行记录的上下文中运行，如为True ，在单元格中设置相应属性。button：在列表单元格中显示按钮

context：在执行按钮的Odoo调用时合并入视图的上下文

confirm：在进行按钮的 Odoo 调用之前显示的（供用户接受的）确认消息

field：定义相应字段应针对每条记录显示的列（name、string、invisible、groups、widget、attrs、width、groupby、name、string、context括号中的属性均可使用）  

## 开发form视图

表单视图用于显示单条记录的数据。它们的根元素是**form**。它们由带有额外结构和语法组件的常规 HTML所组成。

```xml
<!-开启资产初始期间->
<record model="ir.ui.view"id="eno_asset_period_open_form">
    <field name="name">Eno Asset Period Open</field>
    <field name="model">eno.asset.period.open</field>
    <field name="arch"type="xml">
        <form string="开启资产初始期间">
            <group>
                <field required="1"name="company_id"options="{'no_open':1,'no_create_edit':1)"/>
                <field name="start_period_id"
                attrs="{'readonly':[('period_count','='True)])"
                required="1"
                options="{'no_open':1,'no_create_edit':1)"/>
                <field name="period_count"invisible="1"/>
            </group>
            <footer>
                <button name="open_period"attrs="{'invisible':[('period_count','='True)])"
                string=:"打开期间"type="object"c1ass="oc_highlight"/>
            </footer>
            <h5 style="color:orange"attrs="{'invisible':[('period_count','='False)])">
            提醒：该公司已经开启过资产期间，无法再次开启！
            </h5>
            <h5 style="color:orange"attrs="{'invisible':[('period_count','='True)]}">
            提醒：开启资产初始期间仅可执行一次，确认后无法取消开启，资产初始期间开启后，资产模块所有业务需从本期间开始。
            </h5>
        </form>
    </field>
</record>
```

notebook：定义标签区块。每个标签通过一个 page 子元素进行定义

page：页标签

group：用于定义表单中的列布局

newline：仅在 group元素中可用， 提前结束当前行并立即切换到新行 (不预先填入任何剩余列)

separator：小的横向空格，带 string 属性时作为区块的标题

sheet：可用于 form的直接子元素，针对更窄或更具响应式的表单布局

header：与sheet拼接，在表单上方提供全宽的位置，通常用于显示工作流按钮及状态小组件

button：对Odoo系统进行调用，类似于表单视图按钮。

field：渲染(并在可能时允许编辑)当前记录的单个字段（name、widget、options、class、oe_inline、groups、attrs、domain、context、readonly、required、nolabel、placeholder、password括号中的属性均可使用）  \

## 开发kanban视图

```xml
<record id="product_kanban_view"model="ir.ui.view">
    <field name="name">Product Kanban</field>
    <field name="model">product.product</field>
    <field name="arch"type="xml">
        <kanban>
            <templates>
                <t t-name="kanban-box">
                    <div class="oe_kanban_global_click">
                        <div class="o_kanban_image">
                            <img t-att-src="kanban_image('product.product','image_128',record.id.raw_value)"										alt="Product" class="o_image_64_contain"/>    					   
                        </div>
                        <div class="oe_kanban_details">
                        <strong class="o_kanban_record_title">
                            <field name="name"/>
                            <small t-if="record.default_code.value">[<field name="default_code"/>]</small>
                        </strong>
                        <div class="o_kanban_tags_section">
                            <field name="product_template_attribute_value_ids"																groups="product.group_product_variant"/>
                        </div>
                        <u1>
                             <li><strong>Price:<field name="1st_price"></field></strong></li>
                        </u1>
                        <div name="tags"/>
                        </div>
                    </div>
                </t>
            </templates>
        </kanban>
    </field>
</record>
```

kanban：定义看板视图。

templates：自定义展示模板

o_kanban_image：看板视图左侧图片区域样式定义

oe_kanban_details：看板视图右侧信息区域

field：渲染当前记录的单个字段  

## 开发搜索视图

搜索视图是此前那些视图类型的分解，在其中不显示内容，虽然它们应用于具体的模型，却用于过滤其它视图的内容(通常为 列表视图 或 图形视图等的聚合视图)。除用例的这种不同外，它们的定义方式相同。Search:在列表视图中提供搜索功能,根元素是**search**

```xml
<!--搜索视图-->
<record model="ir.ui.view" id="eno_asset_period_tree_search">
    <field name="name">eno_asset_period_tree_search</field>
    <field name="model">eno.asset.period</field>
    <field name="arch" type="xml">
        <search>
            <field name="name"/>
            <field name="asset_period_status"/>
            <field name="company_id" filter_domain="[('company_id.name','like',self)]"/>
            <filter string="" name="asset_period_status" domain="[('asset_period_status','=','open')]"/>
            <filter string="" name="asset_period_status" domain="[('asset_period_status','=''done')]"/
            <group>
                <filter name="period_id" string="" context="{'group_by':'period_id'}"/>
                <filter name="company_id" string="" context="{'group_by':'company_id'}"/>
            </group>
        </search>
    </field>
</record>
```

field：字段定义含用户提供值的域或上下文

name：待过滤的字段名

string：字段的标签

operator：属性允许根据字段类型重载默认运算符 (如针对浮点字段的= 、针对字符字段的ilike )

filter_domain：用作字段搜索作用域的完整域，可使用 self 变量来在自定义域中注入所提供的值。可用于生成比运算符 本身灵活得多的作用域 (如同时对多个字段的搜索)

groups：让字段仅有特定用户可用

filter：过滤器是搜索视图中预定义的切换，仅能启用或禁用。其主要目的是向搜索上下文添加数据(对搜索/过滤的数据视图传递的上下文)，或向搜索视图添加版块。

context：一个Python字典，合并入动作的作用域来生成搜索作用域

separator：可用于在简单搜索视图中分隔过滤器组

searchpanel：允许在任意多个记录视图的左侧显示搜索面板）  

## 开发动作

Action，在odoo中翻译成动作，顾名思义就是相当于一个连接菜单、按钮和前端页面跳转已经一些后台方法调用的开关，odoo中的动作有五种，分别是窗口动作、URL动作、报表动作、服务器动作以及客户端动作。

窗口动作定义如下：

```xml
 <record id="asset_card_act" model="ir.actions.act_window">
            <field name="name">固定资产</field>
            <field name="type">ir.actions.act_window</field>
            <field name="res_model">eno.asset.asset</field>
            <field name="view_mode">tree,form</field>
</record>
```

res_model：用于展示视图的模型

views:(view_id, view_type) 对的列表。每组的第二个元素是视图的分类 (tree, form, graph, …) ，第一个是可选的数据库 id (或 False)。若未提供 id，客户端应获取对所请求模型指定类型的默认视图(默认通过fields_view_get()来实现). 列表的第一个类型是默认视图类型列表，在动作执行时会默认打开。每个视图类型在列表中最多出现一次。

res_id :若默认视图为 form，指定要加载的记录(否则应创建一条新记录)

search_view_id :(id, name) 对， id 为针对动作所加载的指定搜索视图的数据库标识符。默认获取模型的默认搜索视图

target :是否应在主内容区 (current)中以全屏模式（fullscreen）或对话框/弹窗（new）中打开视图。使用 main 代替 current 来清除面包屑导航。默认为current

context、domain、limit：字面意思

view_mode ：(默认= tree,form )视图类型的逗号分隔列表作为字符串(/!\ 无空格 /!\)。所有这些类型会在生成的views 列表中出现 (至少有一个False view_id)

view_id：在类型是view_mode列表的一部分且没有由view_ids中的视图进行填充时，添加到 views 中的指定视图  

## 开发菜单

关联系统整体结构，进入查看详细层级数据页面。一级菜单，二级菜单...

父级菜单：不需要挂载动作

```xml
<!--一级菜莱单-->
<menuitem name=""id="eno_asset_menu"sequence="1"
		groups="eno_asset.eno_asset_manager_group,eno_asset.asset_user_dept_manager_group"/>
```

末级菜单：需要挂载动作

```xml
<!-资产卡片下->
<menuitem
        name="固定资产"id="eno_asset_asset1"
        action="eno_asset_asset_1_action"
        parent="eno_asset_asset_card"sequence="1"
        groups="eno_asset.eno_asset_manager_group,eno_asset.asset_user_dept_manager_group"/>
```

name：显示名称，如果没有设置 name 属性，那么就从这个 menu 对应的 action 的 name，如果没有 action，就使用 id

action：点击这个菜单所触发的动作

parent：层级关系，如果设置了 parent 属性，那么它的值应该是另一个 menu item 的 external id 如果没有设置 parent ，将会尝试从 name 属性中 按照 / 来分隔，找到对应的层级来创建，如果找不到，就依次创建对应的 menu item

sequence：排序

groups：指定哪个组可以看见此菜单

## 初始化数据

初始化数据文件一般放在data文件夹

**record**标签用可以初始化任何存储模型的数据

```xml
<record id="group_heyou_scm_related_user"model="res.groups">
        <field name="name">采购订单行-打开</field>
        <field name="category_id"ref="eno_scm.module_category_scm"/>
        <field name="comment">仅关联该组的用户才显示该按钮，初始化该组不关联任何用户</field>
        <field name="users"eval="[(4,ref('base.user_root')),(4,ref('base.user_admin'))]"/>
</record>
```

id：数据唯一外部ID

model：数据写入模型

field：初始化模型的字段值

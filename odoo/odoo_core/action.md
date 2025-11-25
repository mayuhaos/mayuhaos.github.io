#  Odoo动作

::: tip 动作

* 窗口动作ir.actions.act_window

* URL动作ir.actions.act_url

* 服务器动作ir.actions.server

* 客户端动作ir.actions.client

* 报表动作ir.actions.report 

:::

## 窗口动作

```xml
{
    "type":"ir.actions.act_window",
    "res_model":"product.product",
    "views":[[False,"form"]],
    "res_id":a_product_id,
    "target":"new",
}
```

```xml
<record model="ir.actions.act window" id="test action">
            <field name="name">A Test Action</field>
            <field name="res model">some.model</field>
            <field name="view_mode">graph</field>
            <field name="view id" ref="my_specific_view"/>
 </record>
```

res_model：用于展示视图的模型

res_id：若默认视图为 form，指定要加载的记录(否则应创建一条新记录)

search_view_id ：(id, name) 对， id 为针对动作所加载的指定搜索视图的数据库标识符。默认获取模型的默认搜索视图

target :是否应在主内容区 (current)中以全屏模式（fullscreen）或对话框/弹窗（new）中打开视图。

使用 main 代替 current 来清除面包屑导航。默认为current

context、domain、limit：字面意思

view_mode ：(默认= tree,form )视图类型的逗号分隔列表作为字符串(/!\ 无空格 /!\)。

所有这些类型会在生成的views 列表中出现 (至少有一个False view_id)

views:(view_id, view_type) 对的列表。每组的第二个元素是视图的分类 (tree, form, graph, …) ，第一个是可选的数据库 id (或 False)。若未提供 id，客户端应获取对所请求模型指定类型的默认视图(默认通过fields_view_get()来实现). 列表的第一个类型是默认视图类型列表，在动作执行时会默认打开。每个视图类型在列表中最多出现一次。

view_id：在类型是view_mode列表的一部分且没有由view_ids中的视图进行填充时，添加到 views 中的指定视图

## URL动作

```xml
{
    "type":"ir.actions.act_url",
    "url":"https://odoo.com",
    "target":"self"
}
```

```xml
<record model='ir.actions.act_url'id='action_third_party'>
        <field name='name'>Third-Party Apps</field>
        <field name='url'>https://www.odoo.com/apps/modules</field>
</record>
```

url：在激活动作时打开的url地址

target：若为 new在新窗口/页面打开该地址，若为 self使用该页面替换当前内容。默认值为 new

## 服务器动作

```xml
<record model="ir.actions.server"id="print instance">
        <field name="name">Res Partner Server Action</field>
        <field name="model_id"ref="model_res_partner"/>
        <field name="code">
        raise Warning(record.name)
        </field>
</record>
```

![image-20230622221547867](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222215931.png)

菜单路径在：***设置-技术-动作-服务器动作***

可直接访问上述路径在页面上创建对应的服务器动作，后置操作选择可执行python代码，可直接在python代码处

编写Odoo代码。编写完成后可点击创建上下文炒作，可在对应模型的视图的动作中看到相应动作，点击后就会执行

编写的代码逻辑。或者模型直接选择服务器动作页面上会有执行按钮，编写完成后可直接执行代码逻辑。

在安全中可以给服务器动作选择对应的组，只有有组权限的人才能看到创建的上下文操作。

## 客户端动作

```xml
{
    "type":"ir.actions.client",
    "tag":"pos.ui"
}
```

用于返回个性化的动作（个性化页面的时候会用到）

tag:动作的注册名称

params (可选):与客户端动作标记一起发送到客户端的附加数据的Python字典

target(可选)：若为 new在新窗口/页面打开该地址，若为 self使用该页面替换当前内容。默认值为 new

## odoo模型分类

#### 1.、models.Model

持久化实例模型，安装模块时会在数据库实例化一张持久化数据表。

常规数据表，需要数据持久化的使用该模型类型

#### 2.、models.TransientModel

临时实例模型，安装模块时会在数据库实例化一张数据表。表数据会定时清除。

具有简单的数据屏蔽，普通用户只能查询到自己创建的数据，超级用户可以查询到所以数据。

常用于临时弹窗参数录入等无需持久化数据的功能表单。

#### 3.、models.AbstractModel

抽象模型，不会在数据库中实例化数据表。

常用于多模型继承的共享超类和使用数据库视图的查询表单

### 临时模型/向导模型TransientModel的使用

1、主要用户和用户交互的弹窗中，临时记录用户的输入内容。

2、弹窗的form视图一般编写如下：

```xml
<record id="test_module_purchase_order_wizard_form" model="ir.ui.view">
    <field name="name">test_module_purchase_order_wizard_form</field>
    <field name="model">test.module.purchase.order.wizard</field>
    <field name="priority">5</field>
    <field name="arch" type="xml">
        <form>
            <group name="main">
                <group name="main_left">
                    <field name="user_id"/>
                    <field name="do_date"/>
                </group>
                <group name="main_right">
                    <field name="note"/>
                </group>
            </group>
            <footer>
                <button string="" name="do_action" type="object" class="btn-primary"/>
                <button string="" special="cancel" type="object" class="btn btn-secondary"/>
            </footer>
        </form>
    </field>
</record>
```

```python
 def form_action_button2(self):
        form_view_id = self.env.ref('test_module.test_module_purchase_order_wizard_form').id
		return{
            'name': "处理"，
            'type': 'ir.actions.act_window',
            'res_model': "test.module.purchase.order.wizard",
            'view_type': 'form',
            'view_mode': 'from',
            'target': 'new',
            'views': [(form_view_id, 'form')]
        }
```

## 数据对象的特性

1、可通过点号取字段值

2、可通过方括号取值

3、拥有序列对象的特征，可以循环、可以切片

4、可以看做一个集合，集合相关的特性都能实现，比如求并集、交集、差集

![image-20230622222658693](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222226812.png)
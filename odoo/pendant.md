
# odoo13前端挂件使用说明

## 树形查询组件	

#### 使用方法

本挂件为odoo13原生挂件，并在其基础上进行修改优化。

目前分为两种模式。

### Kanban,tree

---



效果图：

Kanban



![image-20230623004201845](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230042920.png)

Tree

![image-20230623004216705](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230042773.png)

调用方式：

 搜索视图中增加searchpanel标签：

```xml
<search>
      <searchpanel>
         <field name="budget_unit_id" string="预算单元"/>
      </searchpanel>
</search>
```

### Form

---



form视图下使用树形组件，需去除action中view_mode参数的tree类型，如有指定tree视图id的参数，也需要去除。

![image-20230623004439852](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230044912.png)

在搜索视图的searchpanel标签中使用id 字段

```xml
<search>
      <searchpanel>
         <field name="id"/>
      </searchpanel>
</search>
```

效果图

![image-20230623004506708](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230045766.png)

## tree视图字段链接	

#### 使用方法

 Tree视图字段新增option，如图

![image-20230623004523554](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230045599.png)

Function_name参数为当前模型所需调用的后台方法名，方法名自定，使用model装饰器。

后台方法定义：

![image-20230623004539625](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230045667.png)

vals中包含当前界面数据及上下文。

效果图：

![image-20230623004550961](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230045017.png)

## tree视图自定义搜索	

#### 使用方法

### xml配置

----

使用时在tree视图的字段上添加Context属性进行配置，具体参数使用说明如下

'field_filter':True, 基本搜索，会在搜索框内加载一个单输入框

'field_filter_range':True, 范围搜索，会在搜索框内加载一个范围搜索框

'field_filter_seq':12 ，对搜索框的位置进行限制左上角开始向后加载，对应seq从小到大

 

PS：不再需要**oe_need_field_filter_render**类名定义

![image-20230623004641767](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230046836.png)

### Py配置

---

后台方法定义：

![image-20230623004704295](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230047356.png)



## 批量添加明细行	

#### 使用方法

此挂件针对行上单个m2o进行配置。

![image-20230623004732602](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230047661.png)

res_model参数为该m2o字段模型，res_field为该m2o字段名。

效果图：

![image-20230623004742770](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230047821.png)

## 即时保存的添加明细行	

#### 使用方法

针对头行结构

行表tree视图中添加

```xml
<control> 
    <create string="add_and_save"/>
</control>
```

![image-20230623004822814](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230048870.png)

效果为点击添加明细行时保存整个页面。

## 行禁止打开	

#### 使用方法

![image-20230623004838507](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230048557.png)

行tree字段上增加options，内容为’no_edit_no_open’:1

## tree按钮

#### 使用方法

用于wizard动作在tree上生成按钮

![image-20230623004924540](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230049595.png)

On_tree为1时，会在tree视图上层区域生成按钮

![image-20230623004935829](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230049890.png)

On_tree为2时，会在创建按钮的区域生成按钮**（推荐）**

![image-20230623004949742](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230049799.png)

## M2O字段选择去重	

#### 使用方法

![image-20230623004958791](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230049853.png)

语句为widget=o2m_unique”,效果为筛选掉当前页面该字段已被选择过的值。

## 行删除按钮前置	

#### 使用方法

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230050460.png)

语句为delete_forward=”1”,效果为将行上的删除按钮移至第一列。

![image-20230623005029785](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230050860.png)

## HideZero	

#### 使用方法

Int,float类型字段值为0时显示为空

![image-20230623005045211](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230050268.png)

## 复制，编辑，删除按钮按条件隐藏	

#### 使用方法

![image-20230623005050774](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230050828.png)

::: tip 控制

* 复制按钮控制：copy_control

* 编辑按钮控制：edit_control

* 删除按钮控制：delete_control

:::

## one2many完全汇总	

#### 使用方法

汇总行上该列全部数据，当前系统挂件为汇总当前页数据

![image-20230623005208811](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230052888.png)

## Domain可视化	

#### 使用方法

使domian可以进行可视化选择，并生成对应domain字符串

![image-20230623005219838](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230052891.png)

效果如图

![image-20230623005230663](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230052725.png)

## Domian控制m2o,m2m创建并编辑

#### 使用方法	

按条件限制m2o,m2m字段的创建并编辑

![image-20230623005242239](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230052296.png)

## many2one字段搜索下拉框展示自定义字段	

#### 使用方法

```xml
/**
 * m2o下拉菜单table化组件
 * 挂件名：widget="m2o_table"
 * table字段定义：options="{'select_unique': 0, 'search_field_names': ['name'], 'table_fields':['display_name', 'phone', 'email']}"
 * search_field_names: 定义搜索时是按表的哪些字段搜索
 * select_unique: 在行表上搜索是否需要选过的不能再选标识，为1的时候不能选择重复的
 */
```

![image-20230623005327113](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230053160.png)

#### 备注：

可以用于notebook下的tree页签字段，也可以直接用在一个单独的tree的字段上。

## Form页签中tree上添加数据	

#### ![image-20230623005349514](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230053576.png)

![image-20230623005355498](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230053580.png)

```xml
widget="one2many_list"
```



## Form页签中tree上隐藏列	

#### ![image-20230623005414155](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306230054225.png)

如图所示，当头表中is_adjust_depreciation为假时，行表不显示depreciation_life_before_adjust字段列
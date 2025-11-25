# 权限控制

::: tip 权限控制

* 组权限控制
* 模型权限
* 记录规则

:::

## 组权限控制

权限组模型为res.groups。

菜单、视图、动作、模型访问权限、记录规则可以设置权限组。

未设置权限组时，对应权限设置适用全体内部用户；

设置权限组时，对应权限只有组内用户生效。

权限组必须保证优先创建。

菜单、视图、动作、模型访问权限、记录规则在初始化时可以设置groups属性添加组。

#### 1.初始化组

```xml
<!-模块分类->
<record id="module_category_asset" model="ir.module.category">
    <field name="name">资产</field>
    <field name="description">资产相关管理</field>
    <field name="sequence">5</field>
</record>
<!-资产模块系统管理员->
<record id="eno_asset_manager_group" model="res.groups">
    <field name:="name">资产模块系统管理员</field>
    <field name="category_id" ref="module_category_asset"/>
    <field name="users" eval="[(4,ref('base.user_root')),(4,ref('base.user_admin'))]"/>
</record>
```

#### 2.菜单添加组权限

```xml
<!--预算管理主菜单->
<menuitem id="eno_budget_manage_menu"name="Budget Manage"
	groups="eno_budget.budget_module_manager_group"/>
```

#### 3.动作添加组权限

```xml
<act_window id="change_password_wizard_action"
    name="Change Password"
    binding_model="res.users"
    res_model="change.password.wizard"
    view_mode="form"target="new"
    groups="base.group_erp_manager"/>
```

#### 4.视图添加组权限

```xml
<record id="view_product_template_purchase_buttons_from" model="ir.ui.view">
    <field name="name">product.template.purchase.button.inherit</field>
    <field name="model">product.template</field>
    <field name="inherit id" ref="product.product template only form view">
        <field name="groups_id"eval="[(4,ref('purchase.group_purchase_user'))]"/>
        <field name="arch" type="xml">
            <div name="button_box" position="inside">
                <button class="oe_stat_button" name="action_view_po"
                        type="object" icon="fa-shopping-cart" attrs="{'invisible':[('purchase_ok','='False)]}"
                        help="Purchased in
                        <div class=" o_field_widget o_stat_info">
                            <span class="o_stat_value">
                                <field name="purchased_product_qty" widget="statinfo" nolabel="1" class="mr4"/>
                                <field name="uom_name"/>
                            </span>
                    <span class="o_stat_text">Purchased</span>
                </div>
            </button>
        </div>
    </field>
</record>
```

#### 5.记录规则添加组权限

```xml
<record model="ir.rule" id="ir_default_user_rule">
        <field name="name">Defaults:alter personal defaults</field>
        <field name="modelid" ref="modelir_default"/>
        <field name="domain_force">[('user_id','=',user.id)]</field>
        field name="groups"eval="[(4,ref('base.group_user'))]"/
        <field name="perm_read" eval="False"/>
</record>
```

## 记录规则

1.记录规则设置

记录规则模型为ir.rule

记录规则的权限控制精准到表中的每一行数据的读写权限。

model_id字段配置控制的模型

domain_force字段配置数据的筛选，domain格式。

2.初始化设置

使用record标签方式初始化

实例如下

```xml
<record id="multi_company_1" model="ir.rule">
        <field name="name">需求单行多公司屏蔽</field>
        <field name="moccic" ref="model_eno_scm_requirement_order_line"/>
        <field name="global" eval="True"/>
        <field name="domain_force">['',('company_id','='False),('company_id','in',company_ids)]</field>
</record>
```

## 模型权限

控制模型访问权限的配置模型为ir.model.access，存储模型的增删改查权限设置。

初始化有两种方式：

1.使用csv文件

```xml
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlin
外部标识，名称，模型外部标识，权限组外部标识，读权限，写权限，新建权限，删除权限
```

2.使用xml文件格式

```xml
<!--预算管理员/预算任务查询权限-->
<record id="budget_model_access_group" model="ir.model.access">
        <field name="name">预算管理员/预算任务权限</field>
        <field name="model_id" model="ir.model" search="[('model',=''eno.budget.task.distribution')]"/
        <field name="group_id" ref="eno_budget.budget_module_manager_group"/>
        <field name="perm_read">1</field>
        <field name="perm_write">1</field>
        <field name="perm_create">1</field>
        <field name="perm_unlink">1</field>
</record>
```


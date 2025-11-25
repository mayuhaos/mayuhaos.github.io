# 继承机制 

::: tip 继承机制 

* 模型继承


- 视图继承

* 方法继承

:::

## 模型继承

模块化是Odoo一个非常重要的功能。一个模块通常定义一块业务内容，模块之间是可以交互的。所以从已有模块中去继承修改原有模块功能就很有必要。

Odoo中，模型之间也定义了一套继承的逻辑，目前有三种继承方

式，通过_inherit、_inherits来标识

![image-20230622223055474](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222230556.png)

通过_inherit属性来标识继承哪些模型，继承单个模型的话直接就是对应模型的模型名是个字符串。

```python
class User(models.Model):
    _inherit 'res.users'
```

同时继承多个模型的话inherit的值就是一个列表，这个时候要通过_name名称来指定继承的主模型是哪个。

```python
class EnoAssetPurchaseOrder (models.Model):
    _name ='eno.asset.purchase.order'
    _inherit ['eno.base.wkf.interface','eno.line.number.interface','eno.ir.attachment']
    -description='资产采购单'
```

委托继承是通过_inherits来标记的

```python
class StockValuationLayer(models.Model):
    _name ='eno.scm.stock.valuation.layer'
    _inherits {'stock.valuation.layer':'layer_id'}
```

如上图所示，委托继承中_inherits记录了继承的模型和关联模型的many2one字段名。

## 视图继承

视图继承的基本结构如下：

```xml
<record id="model=" ir.ui.view">
    <field name='name></field>
    <field name=''model'></field>
    <field name=''mode'>extension</field>
    <field name="inherit_id"ref="/>
    <field name="'arch'type=''xml">
        <xpath expr="//field [@name='name']" position=">
<!--Add your fields or attributes here -->
        </xpath>
    </field>
</record>
```

inherit_id：定义要继承的视图，是个关联视图的many2one字段。ref后面填写要继承视图的外部ID

model：指定视图的模型名

mode：视图继承有两种模式：扩展视图extension和基础视图primary。

扩展视图是会修改继承的视图的。基础视图不会修改继承的视图，只会依据继承的视图新生成一个新的视图。

arch：要继承修改的内容。

视图元素的定位：

1、通过xpath语法定位。

2、直接通过field标签定位，只适用于头表（model）指定的模型上的字段，不适应于行表字段。

position设置对应定位元素的处理：

inside（定位元素添加子元素）、replace（替换）、after（定位元素之后）、before（定位元素之后）、

attributes（修改定位元素属性）、move（移动定位元素）

## 方法继承重写

和python中子类重写父类的方法一样，通过super执行父类的逻辑

```python
@api.model
def create(self, vals):
    res=super(PurchaseOrder, self).create(vals)
    if not res.line_ids:
        raise ValidationError('请录入行数据信息！)
	return res

def write(self, vals):
    res=super(PurchaseOrder, self).write(vals)
    for record in self:
        if not record.line_ids:
            raise ValidationError('请录入行数据信息！)
	return res
```


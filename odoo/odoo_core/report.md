# 报表

::: tip  学习内容

* #### **pdf报表**

* #### excel**报表**

* #### **打开表**

:::

## pdf报表

#### 声明报表动作

在数据文件中(xml文件)，可以使用report元素定义报表动作。

report元素包含以下属性：

 1、id：外部记录id，全局唯一标识

 2、string：报表动作名称。

 3、name：会通过name值拼接“report.”来寻找模型，并通过该模型下的_get_report_values方法获取

 该报表的数据。

 4、model：报表的相关模型。

 5、report_type：指定报表的类型，qweb-pdf(pdf报表)、qweb-html(html报表)、xlsx(excel)

 6、groups：指定该报表动作哪个组可以访问。该字段是Many2many类型。所以可以添加多个组。

 7、attachment_use：若设置为True，使用attachment表达式所生成的名称存储为附件的报表

 8、attachment：定义报表名称的python表达式；记录可以作为object变量访问。

 9、paperformat：纸张格式，默认A4纸

 10、file：报表名称

#### 声明报表动作示例

```shell
<report
    id="account_invoices"
    model="account.invoice"
    string="发票"
    name="account.report_invoice"
    file="发票"
    report_type="qweb-pdf"
    attachment_use="True"
    attachment="(object.state in ('open','paid')) and
        ('INV'+(object.number or '').replace('/','')+'.pdf')”/>
```

report标签也就是给 ir.actions.report 添加了一条记录

ir.actions.report菜单：设置>技术>报表>报告

![image-20230623112542008](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231125099.png)

#### 自定义纸张

纸张格式是 report.paperformat 记录包含如下属性：

 1、name：纸张的名称

 2、description：格式的简短描述

 3、format：纸张尺寸

 4、page_height：纸张高度。当纸张尺寸选择了自定义时，需要填写，单位为毫米并且只能整数

 5、page_width：纸张宽度。当纸张尺寸选择了自定义时，需要填写，单位为毫米并且只能整数

 6、orientation：纸张方向。可选择参数：Landscape-纵向，Portrait-横向

 7、margin_top: 上边距，纸张上边缘到主体内容的距离，单位：毫米

 8、margin_buttom：下边距，纸张下边缘到主体内容的距离，单位：毫米

 9、margin_left：左边距，纸张左边缘到主体内容的距离，单位：毫米

 10、margin_right：右边距，纸张右边缘到主体内容的距离，单位：毫米

 11、header_line：标题行，布尔值

 12、header_spacing：页眉边距，主体到头部上方的距离，单位：毫米

 13、dpi：打印精度，打印机每英寸可打印的点数。

##### 纸张格式属性format可选参数

![image-20230623112656549](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231126608.png)

##### 纸张格式代码示例

```xml
<record id="paperformat_frenchcheck" model="report.paperformat">
    <field name="name">French Bank Check</field>
    <field name="default" eval="True"/>
    <field name="format">custom</field>
    <field name="page_height">80</field>
    <field name="page_width">175</field>
    <field name="orientation">Portrait</field>
    <field name="margin_top">3</field>
    <field name="margin_bottom">3</field>
    <field name="margin_left">3</field>
    <field name="margin_right">3</field>
    <field name="header_line" eval="False"/>
    <field name="header_spacing">3</field>
    <field name="dpi">80</field>
</record>
```

#### pdf报表结构图

![image-20230623112945744](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231129798.png)

#### 报表模板代码示例

```xml
<template id="report_invoice">
    <t t-call="web.html_container">
        <t t-foreach="docs" t-as="o">
            <div class="article">
                <div class="header">
                    Hello World
                </div>
                <div class="page">
                    <h2>Report title</h2>
                    <p>This Object's name is <span t-esc="o.name"/></p>
                </div>
                <div class="footer">
                    <span class="page"/>/
                    <span class="topage"/>
                </div>
            </div>
        </t>
    </t>
</template>
```

pdf报表模板使用的是 template标签包裹起来的内容。相当于是给 ir.ui.view模型添加了一条记录。报表内容分为三个部分：页眉、主体、页脚。

页面是由header类包裹起来的部分定义。

主体是由page类包裹起来的部分定义。

页脚是由footer类包裹起来的部分定义。

报表模板的样式通过html+css方式实现，逻辑和数据通过qweb、python方式、甚至是python函数。

该报表模板并没有使用自定义数据，所以会有一些默认数据可以选择：

docs：针对当前报表的记录

doc_ids：针对docs记录的id列表

doc_model：针对docs记录的模型

time：对python标准库time的引用

user：打印报表的用户的 res.user 记录

res_company：当前user的公司的记录

#### 自定义pdf报表数据

报表模型有默认的函数，会查找名为：’report’ + 报表动作的name字段的值的模型。若存在会使用他来调用QWeb引擎，并且会调用该模型下的_get_report_values方法获取数据；否则会使用一个通用函数。

代码示例

```python
from odoo import api, models
 
class ParticularReport(models.AbstractModel):
    _name = 'report.module.report_name'
 
    @api.model
    def _get_report_values(self, docids, data=None):
        report_obj = self.env['ir.actions.report']
        report = report_obj._get_report_from_name('module.report_name')
        docargs = {
            'doc_ids': docids,
            'doc_model': report.model,
            'docs': self
        }
        return docargs
```

#### **生成二维码及条形码**

二维码和条形码也就是通过访问/report/batcode路由生成出的，该路由需要增加参数来设置二维码的内容，即大小。

可选参数：

 1、type（必输）：条形码（'Codabar', 'Code11', 'Code128', 'EAN13', 'EAN8', 'Extended39',

​    'Extended93', 'FIM', 'I2of5', 'MSI', 'POSTNET', 'Standard39', 'Standard93',

​    'UPCA', 'USPS_4State'）不支持中文，二维码（'QR'）

 2、value（必输）：也就是扫描出来的所展示的数据

 3、width：设置生成图片的宽度，默认是 600

 4、height：设置生成图片的高度，默认是100

一般情况下都需使用werkzeug.url_encode()格式化出对应的参数。因为会涉及\n等特殊需转换。

示例代码：

```python
import werkzeug
data = {'type': 'QR','value': '资产编码： 343224 \n资产名称: 测试','width': 600,'height': 600}
werkzeug.url_encode(data)
```

#### QWeb

QWeb是XML模板引擎，主要用于生成HTML片段和页面。模板指令是写再xml标签中的，以t-开头。

常用Qweb语法：

```xml-dtd
常用Qweb语法：
设置变量语句
t-set是设置变量名称，t-value是设置值
<t t-set=”a” t-value=”1”/>
判断语句
<t t-if=”a == 1”>
	<t t-esc=”a”/>
</t>
<t t-elif=”a == 0”>
	<t t-esc=”a”/>
</t>
<t t-else=””>
	<t t-esc=”a”/>
</t>
```

```xml-dtd
for循环语句

<t t-foreach=”list” t-as=”l”>
	<t t-esc=’l’/>
</t>
```

设置属性

test是一个变量，假设test的值为 hello

```html
<div t-att-class=”test”/>
```

最终呈现

```html
<div class="hello"/>
```


## xlsx报表

#### 声明报表动作

同pdf报表一样，需要在数据文件中(xml文件)，使用report元素定义报表动作。只需要注意report_type字段的值需要设置为xlsx。

```xml
<report id="eno_asset_depreciation_report_report"
            model="eno.asset.depreciation.report"
            string="固定资产折旧月报表"
            report_type="xlsx"
            name="eno_asset.eno_asset_depreciation_report_xlsx"
            file="固定资产折旧月报表"
            attachment_use="False"/>
```

#### excel解析类

需要定义一个临时模型，该模型的命名规则与pdf报表相同，不同的是该模型需要继承 report.report_xlsx.abstract 模型

并且需要修改函数 generate_xlsx_report 定义格式以及数据，generate_xlsx_report参数有wb即excel对象，objs当前所选

择数据的对象。生成excel使用的是python的xlsxwriter包，所以里面构建excel的格式都是使用该包。

xlsxwriter官网：[The Format Class — XlsxWriter Documentation](https://xlsxwriter.readthedocs.io/format.html)

##### 常用xlsxwriter函数及属性以wb为例：

```shell
wb.add_format(properties)：设置excel格式，字体格式，展示格式（日期格式、数字、千分符）
	font_name：设置字体
	font_size：字体大小
	bold：是否加粗
	valign：上下对齐方式
	align：左右对齐方式
	bg_color：颜色
	bold：边框
	示例代码：wb.add_format({'font_name': '微软雅黑','font_size': 10,'valign': 'vcenter','border': 0,'text_wrap': True})
ws=wb.add_worksheet(name)：创建sheet页
ws.merge_range(first_row, first_col, last_row, last_col, data, cell_format=None)：合并单元格
	first_row：开始行坐标；first_col：开始列坐标；last_row：结束行坐标；last_col：结束列坐标；
	data：写入单元格的数据；cell_format：设置单元格样式
ws.write(row, column, cell_value, style=None)：给单元格写入数据
	row：行坐标；column：列坐标；cell_value：写入单元格的数据；style：设置单元格样式
```

#### 定义report视图

report视图和form视图几乎一样，只是他的type类型是report，并且arch里包的是report标签

```xml
<record id="eno_asset_depreciation_report_form" model="ir.ui.view">
    <field name="name">eno_asset_depreciation_report_form</field>
    <field name="model">eno.asset.depreciation.report</field>
    <field name="type">report</field>
    <field name="arch" type="xml">
        <report>
            <sheet>
                <group col="6">
                    <field name="company_id" required="1" options="{'no_create':'1', 'no_open': '1'}"
                       domain="[('id', 'in', allowed_company_ids)]"/>
                </group>
                <footer>
                    <span>固定资产折旧月报表</span>
                    <button name="report_search" type="object" string="查询" class="oe_highlight"/>
                    <button name="report_print" type="object" string="下载" class="oe_highlight"/>
				</footer>
            </sheet>
        </report>
    </field>
</record>
```

#### 普通函数的excel动作返回

该函数调用eno_base框架中后台任务下载excel报表，用户无需前台等待，此处为标准写法，

参数1：report_name；

参数2：报表类型；

参数3：当前临时模型记录;

参数4：当前模型；

参数5：上下文；

参数6：excel名称；

```python {4,5,6}
def report_print(self):
    context = self.env.context.copy()
    name = '固定资产折旧月报表'
    self.env['ir.actuator.user.list'].create_report_print('eno_asset.eno_asset_depreciation_report_xlsx', 'xlsx',
                                                          docids=self.ids, docmodel=self._name,
                                                          context=context, name=name)
    return {
            'type': 'ir.actions.act_window.message',
            'title': '信息',
            'message': "请在右上方任务列表查看下载情况。",
            'buttons': [
            ]
        }
```

## 打开表

#### 定义打开表动作

```python
    def report_search(self):
        report_data = self.get_data()
        if report_data:
            return {
                'type': 'ir.actions.eno.report',
                'tag': 'eno_scm_report_tag',
                'template': 'EnoScmGoodsSumMonthReport',
                'report_data': report_data,
                'name': '物资汇总月报',
                'target': 'self'
            }
        return {
            'type''ir.actions.act_window.message',
            "title':查询结果",
            'message':"没有找到相关数据，请修改查询条件！"
        }
```

#### 定义JS文件

![image-20230623115253891](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231152996.png)

#### 定义template

```xml
<template id="eno_fixed_assets_depreciation_report">
    <t t-call="web.html_container">
        <div class="portal_home eno_open_table" style="text-align:center">
            <!--表头-->
            <div class="header">固定资产折旧月报表
            </div>
            <!--表体-->
            <div class="article">
                <!--表头注-->
                <div class="text-center">
                    <h2 style="font-family: SimHei">
                        <strong>固定资产折旧月报表</strong>
                    </h2>
                </div>
                <div>
                    <div class="report_notes" style="display:inline-block;float: left;">
                        公司：
                        <t t-esc="docs[0]['head']['company_id']"/>
                    </div>

                </div>

                <!--表体-->
                <div class="text-center">
                    <table class="maindata" border="1px" cellspacing="0" style="width:100%;">
                        <thead>
                            <tr style="background-color:#D2D2FF;text-align: center">

                                <th style="width: 10%;">
                                    使用部门编码
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <t t-foreach="docs" t-as="mydocs">
                                <t t-foreach="mydocs['lines']" t-as="rec">
                                    <tr class="text-right">
                                        <t>
                                            <td style="font-size: 20px;font-weight: bold;text-align: center;">
                                                <t t-esc="rec['admin_dept_id']"/>
                                            </td>
                                        </t>

                                    </tr>
                                </t>
                            </t>
                        </tbody>
                    </table>
                </div>

                <!--表尾注-->
                <div>
                    <div>
                        <div class="report_notes" style="display:inline-block;float: left;">
                            制表人：
                            <t t-esc="docs[0]['people']"/>
                        </div>
                        <div class="report_notes" style="display:inline-block;float: right;margin-right:250px">
                            审核人：
                            <!--                                    <t t-esc="docs[0]['people']"/>-->
                        </div>
                        <br/>
                    </div>
                   
                </div>
            </div>

            <!--表尾-->
            <div class="footer">
                <div class="text-center">
                    <br/>
                    第<span class="page"/>页，共<span class="topage"/>页
                </div>
            </div>
        </div>
    </t>
</template>
```

#### 引入

以上定义的js文件，报表动作、视图、模板(template)文件，均需引入，只不过位置不同。

js与css文件需要定义在views/_template.xml下，并且此template文件需要引入在__manifest__.py中

动作视图模板文件直接在__manifest__.py的data值列表引入即可，不需在中间多引入一层。

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <template id="assets_backend" name="asset assets" inherit_id="web.assets_backend">
        <xpath expr="." position="inside">
            <script type="text/javascript" src="/bazhou_cost/static/src/js/bz_hospital_mz_dept_posted_rpt.js"/>
            <script type="text/javascript" src="/bazhou_cost/static/src/js/bz_hospital_zy_dept_posted_rpt.js"/>
        </xpath>
    </template>
</odoo>
```

#### 引入QWeb模板

![image-20230623120051750](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306231200824.png)

::: warning  ok！
okok！:stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:
:::
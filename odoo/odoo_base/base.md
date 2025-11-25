# 6.1

## 增删改查按钮

```
1. <from edit="false" create="false" duplicate="false" delete="false">
2.    
3. </form>
```

| edit="false"      | 禁止修改 |      |
| ----------------- | -------- | ---- |
| create="false"    | 禁止创建 |      |
| duplicate="false" | 禁止复制 |      |

## Odoo的数据约束抛错可分为三种情况

1. 手动判断约束(create/write)
2. ORM层约束(api constrains)
3. 数据库层约束(_sql_constrains)

[Odoo | 技巧 | 数据校验\约束的方式_odoo创建时校验_[Kenny\]的博客-CSDN博客](https://blog.csdn.net/qq_29654325/article/details/88566213)

## create

![image-20230601155513014](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306011555085.png)

# 6.2

<h2 style="color:red;">今日完成任务</h2>

- 取消many2one字段取消创建并编辑
- 1.1.2 按照类别代码正序排列
- 1.1.2 关联base模块的部门模型，用户选择时只能选到当前所选公司下的部门



## 创建并编辑

no_open：该字段是否可以打开（many2one这类字段） True :不可打开

no_create：该字段是否可以创建（many2one这类字段） True :不可创建

**many2one (FieldMany2One)**
支持的字段类型： many2one
属性:
can_create: 允许创建相关记录（优先于no_create选项）
can_write: 允许编辑相关记录（默认值：true）
选项:
quick_create: 允许快速创建相关记录（默认值：true）

<p style="color:#2b7cd3;">no_create:防止创建相关记录-隐藏“创建“xxx”和“创建并编辑…”下拉菜单项（默认值：false）</p>
no_quick_create: 防止快速创建相关记录-隐藏“创建“xxx”下拉菜单项（默认值：false）

<p style="color:#2b7cd3;">no_create_edit: 隐藏“创建并编辑…”下拉菜单项（默认值：false）</p>

create_name_field:创建相关记录时，如果设置了此选项，则create_name_field字段的值将填充输入值（默认值：name字段的值）
always_reload: 布尔值，默认值是false，如果为true，则widget将始终执行name_get去获取它的name值。

<p style="color:#2b7cd3;">no_open: 布尔值，默认值是false，如果设置为true， many2one 将不会打开相关记录。</p>

## Odoo 中的 domain 的解析及各种使用例子

![image-20230602145414167](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306021454259.png)

[Odoo 中的 domain 的解析及各种使用例子 - Oejia 技术栈，企业方案分享、Odoo顾问](http://www.oejia.net/blog/2018/08/31/odoo_domain_all.html)

## 6.3

# TreeView：列表视图

## 一般常用的

1. **create** 是否能够创建；
2. **edit** 是否能够编辑；
3. **delete** 是否能够删除；
4. **default_order** create_date desc,按照某个字段排序；
5. **string** 名称；

## 提示警示颜色不同修改

1. **decoration-bf** 加粗
2. **decoration-it** 斜体
3. **decoration-danger** 危险提示：红色,
4. **decoration-info** 信息提示：蓝色,
5. **decoration-muted** 轻柔提示：灰色,
6. **decoration-primary** 主要提示：紫色,
7. **decoration-success** 成功提示：绿色,
8. **decoration-warning** 警告提示：橙色

## 编辑

## 是的水电费水电费地方
## 大方的奋斗奋斗辅导费打发打发

#  二二二

editable=“bottom” 在tree视图底部创建
editable=“top”在tree视图顶部创建



# 作业

![image-20230615090446273](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306150904350.png)

行 nameget   onchange

![image-20230615090920047](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306150909114.png)

![image-20230615091658677](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306150916764.png)

conetxt传上下文

  加在 one2m字段


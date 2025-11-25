# 审批流



::: tip 审批流

* 审批流配置

* 审批流模型常用api

* 开发一个审批流

:::

## 审批流配置

### 审批流模板

一个完整的审批流应该包括：开始节点--》审批节点--》结束节点

审批节点需要有完整的流入流出节点

![image-20230622231957884](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222321077.png)

### 角色配置

角色：某一类审批用户的统称

审批角色配置：

![image-20230622232027267](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222321490.png)

审批角色的配置控制了该审批节点需要哪些用户审批

### 审批流条件

审批流条件配置，实现控制满足不同条件的数据走不同审批流

![image-20230622232207523](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222322589.png)

可添加多条，，最终是以domain形式作用到单据，判断单据是否满足该条件。如果同一条数据找到多条满足条件的审批流，则优先走sequence最小的审批流

### 审批流实例

每一个业务单据发起审批流之后，都会生成一个审批流实例，审批流实例记录了审批流的流程状态和节点信息

![image-20230622232233778](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222322850.png)

一个流程实例结束之后，重新发起审批流会重新生成流程实例，同一个单据不允许有多条进行中的实例

## 开发审批流

### 字段和继承

::: tip  字段和继承

1.所有需要开发审批流的单据，都需要继承基础审批流模块

2.审批状态字段命名必须为state字段，该字段为审批流保留字段

3.state字段值集为审批流标准化值集，单据可添加

:::

![image-20230622232351254](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222323341.png)

## 审批流模型常用api

> 1.提交

```python
def action_submitted(self):
for rec in self:
    rec.state rec._state_selection['submitted']
    self.env['eno.base.wkf'].create_or_restart_wkf(rec._name,rec.id)
```

> 2.审批通过

```python
@api.model
def complete_approve(self,id):
    rec self.browse(id)
    rec.state self._state_selection['approved']
```

> 3.审批拒绝

```python
@api.model
def refuse_approve(self,id):
    rec self.browse(id)
    rec.state self._state_selection['rejected']
```

> 4.撤回

```python
def action_withdraw(self):
    if self.wkf_task:
        if self.state !'submitted':
        raise ValidationError(_("The order is approved or approving,you can't reset it to draft!"))
    self.state self._state_selection['created']
    self.withdraw_time fields.Datetime.now()
    #工作流置为撤回状态
    self.env['eno.base.wkf'].set_wkf_back(self._name,self.id)
```

> 5.置为草稿

```python
def set_state_created(self):
if self._state_selection['created']:
	for rec in self:
		rec.state self._state_selection['created']
```

> 6.审批弹窗

```python
def action_approve_wizard(self):
	view self.env.ref('eno_base.wkf_action_approve_view_form')
    return{
        'name':_('Workflow Approve'),
        'type':'ir.actions.act_window',
        view_type':'form',
        'view_mode':'form',
        'res_model''wkf.action.approve',
        'vicws':[(view.id,'form')]
        'view_id':view.id,
        'target':'new',
        'context':{'is_disableReapprove':self.has_disableReapprove}
    }
```

> 7.审批拒绝弹窗

```python
def action_refuse_wizard(self):

	view self.env.ref('eno_base.wkf_action_refuse_view_form')
    return{
        'name':_('Workf1 ow Refuse'),
        'type':'ir.actions.act_window',
        'view_type':'form',
        'view_mode':'form',
        'res_model':'wkf.action.refuse',
        'views':[(view.id,'form')],
        'view_id':view.id,
        'target':'new'
      }
```

### 视图添加

1.因为审批流按钮受部分计算字段控制，所以需要添加部分计算字段到视图

2.不同审批状态下、不同用户看到的审批按钮屏蔽

![image-20230622233456224](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222334357.png)

### 审批进度

单据页面添加页签展示审批进度，wkf_task为继承的基础审批流模型字段

```xml
    <page string="审批进度">
        <field name="wkf task"
                context="{'_task_flag':True,
                'tree_view_ref':'eno_base.base_wkf_task_approval_process_view_tree'}"/>
    </page>
</notebook>
```


# 接口



::: tip 接口

* 自动化任务
* 接口开发

:::

## 自动化任务

### 初始化自动化并发

自动化并发定义了每间隔一定时间，系统会自动发起一个定时任务，执行相应程序 初始化自动化并发调度器

```xml
<data noupdate="1">
    <!--定时化任务-->
    <record id="sync_heyou_iflow_process_info_cron" model="ir.actuator.scheduler">
        <field name="name">部门接口自动化任务</field>
        <field name="model_name">eno.department.interface.abstract</field>
        <field name="times">-1</field>
        <field name="interval_number">5</field>
        <field name="interval_type">minutes</field>
        <field name="priority">5</field>
        <field name="next_datetime"
               eval="(DateTime.now().replace(hour=0,minute=0,second=0)+timedelta(days=1)).strftime('%Y-%m-%d 						%H:%M:%S')"/>
        <field name="method">create_department_data</field>
        <field name="method_args">()</field>
    </record>
</data>
```

## 内部接口开发

**内部接口：**对自身系统提供的接口（供系统内部调用的接口）

日常开发中，内部接口通常以RPC接口形式提供给外部系统调用

开发流程：

> 1.定义内部接口表，存储外部系统传过来的数据，通常必须包含以下固定字段：来源系统标志，数据唯一标志，操作类型（增/删/改），传输时间，处理状态，错误消息，处理状态和错误消息一般用来记录内部数据处理信息。

![image-20230622234107020](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222341133.png)

> 2.开发rpc接口，自定义接口数据传输格式，通常为json格式，并编写技术接口文档。接口方法一般写在后台数据表即或抽象类。
>
> 接口开发必须包含数据校验和报错返回。
>
> > 1）、任何必输字段需要校验是否传值，任何约定内容的主数据传输，必须先校验hrp系统是否存在该主数据，否则不允许插入成功。例如：
> >
> > ![image-20230622234210396](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222342498.png)
> >
> > 2）、数据处理逻辑，需要将对方传过来的原始数据存入接口表
> >
> > ![image-20230622234235270](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222342356.png)
> >
> > 3）、异常捕获及返回，接口发生的任务错误，包括校验错误和不可预知错误，需要加以捕获并返回给对方系统
> >
> > ![image-20230622234253341](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222342390.png)
>
> 3.将接口表原始数据内部整理，生成正式业务数据，这一步通常用自动化定时执行，例如：将接口原始数据生成到res.partner表
>
> > 1）、需要定义自动化调度程序
> >
> > ![image-20230622234324309](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222343367.png)
> >
> > 2）、开发自动化列表执行方法，将接口表数据处理，新增内部正式数据或更新，同样需要数据校验以及异常捕获。
> >
> > 处理成功的数据，需要将接口数据状态改为‘已处理’，将错误消息清空。
> >
> > 处理失败的数据，需要将接口数据置为’失败‘，并将错误信息写入接口表。内部数据处理一般为单条数据commit。
> >
> > ![image-20230622234352285](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222343357.png)
>
> 4、postman接口调试工具的使用，请求示例
>
> ![image-20230622234425535](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222344617.png)


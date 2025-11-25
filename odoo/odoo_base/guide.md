# 介绍
:::  tip 初心
####  一个针对ERP需求发展的开源Web框架，采用B/S架构。
:::

![image-20230622235730480](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222357545.png)

#### 整个社区有大量各类用途的开源模块、可以随意安装、卸载，随时扩展系统功能。

#### 依赖于开源的关系型数据库Postgresql。

#### 整个框架采用经典的MVC三层架构模式（Model-View-Controller/模型-视图-控制器）。

+ Model模型层：采用Python完全面向对象编程语言，处理应用程序数据逻辑部分。
+ View视图层：采用XML来定义界面，丰富的前端视图和小挂件，使不会前端技术的人员也可以进行页面开发。
+ Controller控制层：基于HTTP routing路由机制来控制用户请求与具体功能的交互。

### Odoo应用层的其他核心技术组件

- ORM(Object-Relational-Mapping)：对象关系映射技术。用于Odoo中面向对象模型与数据库之间的

  自动类型转换和一系列数据访问安全服务。在Odoo的编码过程中基本上无需编写任何的SQL语句来操作数

  据库，一切都由ORM自动完成。提高了编程效率。

- RPC(Remote Procedure Call)：远程程序调用协议。通过RPC技术，Odoo可以开放自己的数据、功能

  和API给外围系统满足集成需求。Odoo提供XML-RPC和JSON-RPC两种RPC，即外围系统可基于XML和JSON

  两种数据格式，以HTTP协议为基础来访问Odoo。

- CRON Worker：用于执行Odoo后台定时任务。


# 配置文件

相关配置的代码在odoo/odoo/tools/config.py中可以看到。

```python
addons_path：odoo模块文件的存放路径，和自定义模块的存放路径，配置多个路径时要使用逗号分隔
admin_passwd：数据库管理密码用于创建、还原和备份数据库等操作
data_dir：用于存放session数据、附件、缓存文件等的目录路径
db_host：数据库IP地址
db_port：访问数据库的端口号
db_user：访问数据库的用户名
db_password：访问数据库的用户密码
db_maxconn：数据库的最大连接数
log_handler：设置模块的日志级别，可以是一组module:log_level对, 默认值是“:INFO”(表示所有模块的默认日志级别为INFO)
logfile：指定用来存储日志的文件
xmlrpc_port：访问应用的端口号，默认8069
proxy_mode：是否使用反向代理模式
pg_path：数据库可执行文件的路径 limit_memory_hard：一个处理器允许使用的最大物理内存, 默认为2G
limit_memory_soft：一个处理器允许使用的最大虚拟内存
limit_request：一个处理器接受的最大请求数，默认8192
limit_time_cpu：一个请求最多占用多少处理器时间，默认60s
limit_time_real：一个请求允许的最长实时时间，默认240s
```



odoo.conf：

```python
[options]
; This is the password that allows database operations:
addons_path = E:\pythonProject\peixun\odoo\odoo\addons,E:\pythonProject\peixun\odoo\addons,E:\pythonProject\peixun\OCA\reporting-engine,E:\pythonProject\peixun\OCA\server-tools,E:\pythonProject\peixun\peixun_addons
data_dir = E:\pythonProject\peixun\data

; 数据库配置
;admin_passwd = 20010810
db_host = localhost
db_port = 5432
db_user = yuhao
db_password = 20010810
;db_name = jinxin_05_24,jinxin_05_25
http_port = 40001
;longpolling_port = 8072
; postgresql的路径
pg_path = D:\SoftwareDownload\PostgreSQL\15\bin
server_wide_modules = base,web,eno_base
;log_db = jinxin_test_09_27
;dbfilter = eno.* ;过滤显示的数据库名称
; 是否将log写入db的ir_logging
;log_db = False
;log_db_level = warning

; 日志配置
;log_handler = :INFO,odoo.addons.eno_accounting_platform:DEBUG
;,odoo.sql_db:DEBUG
; 可以是一组module:log_level对, 默认值是:INFO(表示所有模块的默认日志级别为INFO级别)
;log_level=debug_sql
; 日志的级别, 可选值包括debug_rpc_answer, debug_rpc, debug, debug_sql, info, warn, error,critical
;logfile = D:\odoo\Odoo 10.0\server\odoo.log ;指定用来储存日志的文件

;longpolling_port = 8072 ;长连接池使用的端口号
```


# 快速上手
## 卸载python

从所有程序卸载当前python版本，从所有程序中卸载即可中卸载即可

## 安装miniconda3

 卸载完成之后，首先安装miniconda3,方便创建多个python虚拟环境，安装成功之后，可以通过命令来查看自己已经有的虚拟环境（默认的是有base）

```shell {3}
conda env list  # 查看当前已有的虚拟环境
conda activate base  # 切换到base环境下
python -V # 查看当前环境下的python版本
```

![image-20230622195809596](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306221958650.png)

如果出现‘conda 不是内部或外部命令，也不是可运行的程序或批处理文件。’那就是未配置好环境变量，加上环境变量即可，解决办法，如图所示：

![image-20230622195834455](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306221958491.png)

接下来可以新建一个python的虚拟环境，指定不同的python版本

```python
conda creat -n [name] python=3.7.3 # 这样可以创建一个新的虚拟环境，name就是自己设置的名称
```

当创建好虚拟环境之后，我们也可以切换到创建好的python虚拟环境里，查看当前的python版本

![image-20230622200058060](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222000121.png)

## 下载模块

接下来要用pip下载来自于requirements.txt文件中的所有的模用命令可以快速下载;

```shell
pip install -r requirments.txt -I https://pypi.douban.com/simple
```

> **requirements.txt**
>
> ```python
> Babel==2.6.0
> chardet==3.0.4
> decorator==4.3.0
> docutils==0.14
> ebaysdk==2.1.5
> feedparser==5.2.1
> gevent==1.1.2 ; sys_platform != 'win32' and python_version < '3.7'
> gevent==1.3.7 ; sys_platform != 'win32' and python_version >= '3.7'
> gevent==1.4.0 ; sys_platform == 'win32'
> greenlet==0.4.10 ; python_version < '3.7'
> greenlet==0.4.15 ; python_version >= '3.7'
> html2text==2018.1.9
> Jinja2==2.10.1
> libsass==0.17.0
> lxml==3.7.1 ; sys_platform != 'win32' and python_version < '3.7'
> lxml==4.3.2 ; sys_platform != 'win32' and python_version >= '3.7'
> lxml ; sys_platform == 'win32'
> Mako==1.0.7
> MarkupSafe==1.1.0
> mock==2.0.0
> num2words==0.5.6
> ofxparse==0.19
> passlib==1.7.1
> Pillow==5.4.1 ; python_version < '3.7' or sys_platform != 'win32'
> Pillow==6.1.0 ; sys_platform == 'win32' and python_version >= '3.7'
> polib==1.1.0
> psutil==5.5.1
> psycopg2==2.7.7; sys_platform != 'win32' and python_version < '3.8'
> psycopg2==2.8.3; sys_platform == 'win32' or python_version >= '3.8'
> pydot==1.4.1
> python-ldap==3.1.0; sys_platform != 'win32'
> pyparsing==2.2.0
> PyPDF2==1.26.0
> pyserial==3.4
> python-dateutil==2.7.3
> pytz==2019.1
> pyusb==1.0.2
> qrcode==6.1
> reportlab==3.5.13
> requests==2.21.0
> zeep==3.2.0
> vatnumber==1.2
> vobject==0.9.6.1
> Werkzeug==0.14.1
> XlsxWriter==1.1.2
> xlwt==1.3.*
> xlrd==1.1.0
> pypiwin32 ; sys_platform == 'win32'
> pypinyin==0.37.0
> Cython==0.29.23
> cx-Oracle==8.0.1
> PyMySQL==0.9.3
> pymssql==2.1.4
> pinyin==0.4.0
> rsa==4.6
> suds-community==0.8.4
> numpy==1.17.4
> pandas==1.0.3
> xmltodict==0.13.0
> pysftp==0.2.8
> ```

  下载完成之后，可以用**conda list**查看自己安装所有的包：

![image-20230622201102821](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222011897.png)


## 安装postgresql12数据库

接下来安装postgresql12数据库，然后用navicat测试连接，如果能成功说明数据库已经安装成功，但是在安装数据库的过程中要记住所设置的密码。

## 配置pycharm环境

配置pycharm环境，第一个就是编辑配置

![image-20230622201609177](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222016277.png)

脚本路径是当前工作目录下的odoo-bin目录

形参是配置的odoo.conf文件，里面有一些数据库配置字段，还有data_dir,addons_path等

改变odoo.conf文件的编码为gbk

运行之前要下载，wkhtmltox工具，否则运行会报错

接下来就可以启动服务了

启动成功

![image-20230622201830826](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222018883.png)

本地服务的端口号是40001，打开之后，就会进入如下界面：

![image-20230622201846841](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306222018905.png)



::: warning  ok！
当看到这个界面时，表明所有的环境已经配置成功！
:::
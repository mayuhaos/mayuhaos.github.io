# Python基础

::: tip Look!

* 数据类型和变量

- 使用list、tuple、dict、set

- 条件判断

- 循环

:::

## 数据类型及变量赋值

### 基础数据类

```python
a = 7  # 整型型变量  
a1 = 7.0 # 浮点型           type()查看变量类型
b = '1' #字符串型变量，字符串格式化（%s，format）
c = False # 布尔值型变量，常用判断
```



### 变量

变量，变量名必须是大小写英文、数字和_的组合，且不能用数字开头

常量，不能变的变量，比如常用的数学常数π就是一个常量。在Python中，通常用全部大写的变量名表示常量

```python
int a = 10
PI = 3.14159265359
```



### 格式化

在字符串使用过程中，有时候字符串的内容要根据实际情况变化而变化，这个时候会用到格式化表达方式

在Python中，采用的格式化方式和C语言是一致的，用%实现

多个格式化表达内容在%后面加上（）用以表示，单个的话则直接在%后面新增参数即可

![image-20230623230941699](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232309751.png)

```python
def test_format():
    print("%5花费了%.2f元购买了%d个课程。”%('张三'，800.0,5)
test_format()
```

### 集合类型

a_list = [1，2，‘abc’，[1,2,3]]  # 列表，常用操作（append，del，pop，+，*，sort...）

b_tuple = (1,2,4) # 元祖，初始化候不能被修改，定义只有一个元素的tuple?

c_dict = {‘a’:1,’b’:2,’c’:3} #字典 ，（key-value）存储

d_set = set() # set函数创建的集合，元素不能重复，add、remove

### 使用list、tuple、dict、set

#### list常用内置方法

1.追加元素：append(obj)，追加obj整体到list

​    extend(obj)，包含的元素逐个添加到列表

​    insert(index,obj)，定对象插入列表的指定位置

2.删除元素：clear()，清空列表，类似于del list_obj[:]

​    remove()，移除列表中某个值的第一个匹配项

​    pop()，默认删除列表最后一个元素，pop(index)，删除指定位置元素

3.查找元素：list.count(obj)，统计某个元素在列表中出现的次数

​     list.index(obj,start,end)，找出某个值第一个匹配项的索引位置，没找到则抛出异常

4.排序：list.sort(key,reverse=false)，key：排序的元素或其他可调用对象；reverse=False(升序)

#### tuple常用内置方法

1.索引取值和切片：tuple[:3]

2.成员运算：in 和 not in

3. 查找元素：tuple.count(obj)，统计某个元素在列表中出现的次数

​     tuple.index(obj,start,end)，找出某个值第一个匹配项的索引位置，

​     没找到则抛出异常。

#### dict常用内置方法

1.删除键值对：dict.clear()，清除字典中所有键值对

​      dict.pop(key)，从字典中删除一个键，如果它存在，并返回它的值

2.获取值：dict.get(key)，如果键存在于字典中，则返回该键的值。如果未找到，则返回 None。   dict.items()，返回字典中的键值对列表。list(dict.items()) 。

   dict.keys()，dict.values()，返回键列表和值列表。

3.更新字典：dict.update()，将字典与另一个字典或可迭代的键值对合并.

​    dict1 = {‘a’:100,’b’:200},dict2 = {‘a’:300},dict1.update(dict2)  

#### 集合set的用法

集合（set）是⼀个⽆序的不重复元素的集，基本功能包括关系测试和消除重复元素。是可变的数据类型。集合数据类型的核⼼在于⾃动去重。

1.创建：a = set({1,2,3,4,1,2,3,4}) # # {1,2,3,4}

​       a = set([1,2,3,4,1,2,3]) # {1,2,3,4}

 a = set(‘hello world’)  # {'w','h','r','e','d','o','l',' '}，结果自动去重且无序

2.添加元素：setobj.add(key)，添加元素到set中

3.更新：setobj.update(obj)

4.删除元素：setobj.remove(key)，删除指定元素

​    setobj.pop()，：随机删除元素（）中⽆参数

::: danger 小提示

*集合不能取出元素，因为集合是⽆序的，不⽀持索引，也不⽀持字典那样读取键值*

:::

### 条件判断

在Python中使用 if 语句来实现条件判断：

```python
a = 50
b = 20
if a>b:
    print (“a is larger than b!”)
elif a==b:
    print (“a is equal to b!”)
else:
    print (“b is larger than a!”)
```

```python
a = 50
b = 20
if a>b:
    print (“a is larger than b!”)
print (“end of encoding!”)
```

if语句特点：从上往下判断，如果在某一个条件上判断为True,则执行该判断下的语句，忽略其余的 elif 和else

if操作运算符

| 操作符 |           描述           |
| :----: | :----------------------: |
|   <    |           小于           |
|   <=   |        小于或等于        |
|   >    |           大于           |
|   >=   |        大于或等于        |
|   ==   | 等于，比较两个值是否相等 |
|   !=   |          不等于          |

if嵌套

```python
if num%2==0:
    if num%3==0:
        print ("你输入的数字可以整除 2 和 3")
    else:
        print ("你输入的数字可以整除 2，但不能整除 3")
else:
    if num%3==0:
        print ("你输入的数字可以整除 3，但不能整除 2")
    else:
        print  ("你输入的数字不能整除 2 和 3")
```

### python常用数学运算符

![image-20230623231928736](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306232319799.png)

### python循环

循环是有着周而复始的运动或变化的规律；在 Python 中，循环的操作也叫做 **遍历**。

1.for循环：通过 for 关键字将列表、元组、字符串、字典中的每个元素按照序列顺序进行遍历，当读取到最后一个元素循环结束

*列表循环*

```python
foods= ['apple',’cake’,’tea’] 
for f in foods:
     print(f)
```

*字典利用 items 内置函数进行 for 循环*

```python
dict_obj = {‘a’:1,’b’:2,’c’:3} 
for key,value in dict_obj:
     print(key, value)
```

2.while循环：以一定条件为基础的循环，条件满足的情况下无限循环，条件不满足则退出循环。while 循环 不依赖可迭代的数据类型，而 for 循环依赖。

*while循环示例*

```python
test_int = 1 
while test_int < 5:
    print(test_int, end='\n')
    test_int += 1
```

3.列表推导式（元祖、字典、集合）

```python
print([x ** 2 for x in range(20) if x % 2 == 0])
```

4.循环的继续与退出(continue 与 break)

*continue的使用*

*循环遇到* *continue* *将停止本次数据循环，进行下一次循环*

```python
alist = [1,2,3,4,5,6]
for i in alist:
     if i %2 == 0:
           print (i)
     else:
           continue
print (‘end’)
```

*break的使用*

*循环遇到**break**停止循环，跳出循环往下执行*

```python
alist = [1,2,3,4,5,6]
for i in alist:
     if i <= 3:
           print (i)
     else:
           break
print (‘end’)
```

### 异常处理

在程序运行的过程中，如果发生了错误，可以事先约定返回一个错误代码，这样，就可以知道是否有错，以及出错的原因

一旦出错，还要一级一级上报，直到某个函数可以处理该错误

try...except...finally...

所有的错误类型都继承自 BaseException

```python
value '10'
try:
    print('try...')
    r=10/1nt(value)
    print('result:'r)
except ValueError as e:
	print('ValueError:',e)
except ZeroDivisionError as e:
	print('ZeroDivisionError:'e)
else:
	print("no error!")
finally:
    print('finally...')
print("END"）
```

## 函数

### 函数调用

如果你发现在编程的过程中，经常使用到重复的一段代码，不妨把它抽出来，用函数的形式进行存放。这段代码段，你可以在任何地方进行调用，调用任何的次数。

要调用一个函数，需要知道函数的名称和参数，比如求绝对值的函数abs，只有一个参数。可以在交互式命令行通过help(abs)查看abs函数的帮助信息。

一些基础的内置函数调用：

```python
abs()

float()

isinstance()
.....
```

Python内置函数查询 [Built-in Functions — Python 3.11.4 documentation](https://docs.python.org/3/library/functions.html#abs)

### 函数定义

1.python函数的定义规则：

（1）以 def 开头，后接定义函数的名称和圆括号（），以冒号结尾

（2）圆括号（）可为空，也可以传入参数

（3）定义函数的内容，与def有缩进关系

（4）调用自定义的函数的基本格式为：定义函数的名称（）；若圆括号（）为空，调用时，也为空，若若圆括号（）不为空，调用时需传入参数	

（5） return [表达式] 结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None。

```python
def print_name(name_list):
      for name in name_list:
	print name
print_name([‘Tom’,’Alex’,’Json’])
```

**空函数**	
如果想定义一个什么事也不做的空函数，可以用paSs语句，如果没有将会报错

### 函数入参

1.位置参数

```python
def sum_total(a,b):
       s = a+b
       return s
sum_total(10,20)  # 必须要给a，b赋值，不然报错
```

2.默认参数

```python
def sum_total(a=10,b=20):
       s = a+b
       return s
sum_total(100)  # 返回结果为120
```

3.可变参数：当函数设计时不确定会输入多少个参数，可使用可变参数，函数将所有入参打包为一个元组使用

可变参数习惯上都命名为*args，在函数内部使用时，将args视为元组

```python
def sum_total(*args):
       s = 0
       for x in args:
	s+=x
       return s
sum_total(10,20)  # 返回结果30
```

4.关键参数

可变参数是把参数组装成一个tuple，关键字参数是把参数组装成一个dict

关键字参数的表达方式是 **kw

```python
#2.2,2关键字参数
def test_kw(name,age,*kk):
	if 'police'in kk:
		print(kk.get('police'))
    if 'nickname'in kk:
		print(kk.get('nickname'))
	print("name:"name,age:",age,others:"kk)
    
test_kw("张三"，2o,nickname='kk',police=True)
test_kw("李四"，2&，nickname='wd')
```

### 递归

1.递归函数的特点：一个函数内部调用自己。函数内部可以调用其他函数，当然在函数内部也可以调用自己。

2.代码特点：函数内部的代码是相同的，只是针对参数不同，处理的结果不同。当参数满足一个条件时，函数不再执行。这个非常重要，通常被称为递归的出口，否则 会出现死循环！

```python
def sum_number(num):
      print (num)
      if num==1:
	return  # 出口
      # 自己调用自己
      sum_number(num-1)

sum_number(3)
```


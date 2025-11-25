# Python进阶

::: tip 目录

* 生成器

* 迭代器

:::

### 切片

针对list、tuple、字符；

在截取部分上述对象部分内容，传统实现使用循环遍历过于繁琐

切片使用索引截取实现

[0:3]表示，从索引0开始取，直到索引3为止，但不包括索引3

```python
#1,1切片
def test_slice():
    a_listlist(range(100))
    print(a_list)
    print(a_list[:10])
    print(a_list[-10:]
    print(a_list[10:20])
    print(a_list[:10:2])
    print(a_list[:]
    b_tuple tuple(range(0,10,3))
    print(b_tuple)
    print(b_tuple[:3])
    c_str 'printb_tuple'
    print(c_str[:3])
          
test_slice(J)
```

### 迭代

通过for循环来遍历这个list或tuple，这种遍历我们称为迭代（Iteration）

C语言，迭代list是通过下标完成的

Python的for循环抽象程度要高于C的for循环，因为Python的for循环不仅可以用在list或tuple上，还可以作用在其他可迭代对象上，例如：dict、str

通过collections.abc模块的Iterable类型判断是否是可迭代对象

使用enumerate获取下表循环

支持多变量循环

```python
#1.2送代
def test_iteration():
    from collections.abc import Iterable
    a_d1ct={"a":1,'b":2}
    bstr = 'isinstance'
    print(isinstance([1,2,3],Iterable))
    print(isinstance('sass',Iterable))
    print(isinstance(a_dict,Iterable))
    print(isinstance(12333,Iterable))
    for a,b in enumerate(b_str):
   		print(a,b)
    for a,b in a_dict.items():
    	print(a,b)
          
test_iteration()
```

## 生成器

生成器本质上也是迭代器,对于可以用某种算法推算得到的多个数据，生成器并不会一次性生成它们，而是什么时候需要，才什么时候生成。

#### 生成器的创建方式：

1.定义一个以 yield 关键字标识返回值的函数

2.调用刚刚创建的函数，即可创建一个生成器。

```python
def intNum():
    print("开始执行")
    for i in range(5):
        yield i
        print("继续执行")

num = intNum()  # 创建了一个 num 生成器对象
```

#### 生成器的调用和执行：

1.通过生成器调用 next() 内置函数或者 __next__() 方法

2.通过 for 循环遍历生成器。

```python
# 在左边程序的基础上，添加如下语句
print(next(num))    # 调用next内置函数

for i in num:       # for循环
    print(i）
```

和 return 相比，yield 除了可以返回相应的值，还有一个更重要的功能，即每当程序执行完该语句时，程序就会暂停执行。不仅如此，即便调用生成器函数，Python 解释器也不会执行函数中的代码，它只会返回一个生成器（对象）

```python
#1.4生成器
def test_generator1():
    a = [n for n in range(1,20,3)]
    print(a)
    b = (n for n in range(1,20,3))
    print(b)
    print('next:'next(b))
    print('next:'next(b))
for x in b:
	print(x)
```

## 迭代器

可以被next()函数调用并不断返回下一个值的对象称为迭代器。

#### 创建迭代器对象：

1.可以被next()函数调用并不断返回下一个值的对象称为迭代器：Iterator

2.迭代器有两个基本的方法：iter() 和 next()

```python
list=[1,2,3,4]
it = iter(list)    # 创建迭代器对象
print(next(it))    # 返回一个迭代器，并输出每个值	
```

#### 判断迭代器对象和可迭代对象

1.用isinstance()判断一个对象是否是Iterable（可迭代）对象

2.用isinstance()判断一个对象是否是Iterator（迭代器）对象：

```python
from collections.abc import Iterator
isinstance([], Iterable)  # True

isinstance([], Iterator)    # False
```

::: danger 小提示！

*集合数据类型如list、dict、str等是Iterable但不是Iterator，不过可以通过iter()函数获得一个Iterator对象*!

:::

## 迭代器和生成器的关系

* 生成器本质上就是一个迭代器
* 生成器中说明了可以用表达式和生成器函数来表示生成器
* 迭代器一类是生成器，一类是通过集合类可迭代对象进行构建

```python
#1.5选代器
def test_iterator():
    from collections.abc import Iterator,Generator
    b = (n for n in range(1,20,3))
    print(isinstance(b,Generator))
    print(isinstance(b,Iterator))
    
    a_l1st=[1,4,2,3]
    b = iter(a_list)
    print(next(b))
    print(next(b))

test_iterator()
```

![image-20230624000833954](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202306240008010.png)

## 函数式编程

::: tip 目录

* 高阶函数

* 返回函数

* 匿名函数

:::

### 高阶函数

* 变量可以指向函数
* 函数名也是变量，指向实际函数，如果调整函数名的指向，那么原先函数就无法被调用
* 传入函数，函数可以是变量，那么一个函数可以接收其他函数作为变量，这种函数称之为高阶函数

```python
#2.1高阶函数
def fun(x):
	return x*x

def test_higher_order_func(a,b,f):
	return f(a)+f(b)

print(test_higher_order_func(3,4,fun))
```

1.map函数：map()函数接收两个参数，一个是函数，一个是Iterable，map将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回。

比如我们有一个函数f(x)=x2，要把这个函数作用在一个list [1, 2, 3, 4, 5, 6, 7, 8, 9]上，就可以用map()实现如下

```python
def f(x):
     return x*x
r = map(f,[1,2,3,4,5,6,7,8,9])
a = list(r)
```

2.reduce函数：reduce把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算。其效果就是：

```python
reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
```

### 返回函数

返回函数：函数作为返回值。

```python
def lazy_sum(*args):
    def sum():
        ax = 0
        for n in args:
            ax = ax + n
        return ax
    return sum
```

当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数

```python
>>> f = lazy_sum(1, 3, 5, 7, 9)
>>> f
<function lazy_sum.<locals>.sum at 0x101c6ed90>
```

调用函数f时，才真正计算求和的结果

```python
>>> f()
25
```

### 匿名函数

匿名函数：当我们在传入函数时，有些时候，不需要显式地定义函数，直接传入匿名函数更方便。

```python
>>> list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

***关键字lambda表示匿名函数，冒号前面的x表示函数参数***

## 面相对象编程

::: tip 目录

* 类和实例

* 继承和多态

* 模块引入

:::

### 类和实例

面向对象最重要的概念就是类（Class）和实例（Instance），必须牢记类是抽象的模板。而实例是根据类创建出来的一个个具体的“对象”

在Python中，定义类是通过class关键字

```python
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score


tom = Student(‘Tom’,90)
```

> ①class后面紧接着是类名，类名通常是大写开头的单词，紧接着是(object)，表示该类是从哪个类继承下来。
>
> ②类可以起到模板的作用，因此，可以在创建实例的时候，通过定义一个特殊的__init__方法，把name，score等属性绑上去。
>
> ③有了__init__方法，在创建实例的时候，就不能传入空的参数了,必须传入与__init__方法匹配的参数。这样就初始化了一个名字叫Tom的学生实例。

### 继承

在OOP程序设计中，当我们定义一个class的时候，可以从某个现有的class继承，新的class称为子类，而被继承的class称为基类、父类或超类

animal类

```python
class Animal(object):
    def run(self):
        print('Animal is running...')
```

Dog和Cat类（继承nimal）

```python
class Dog(Animal):
    pass

class Cat(Animal):
    pass
```

Dog和Cat作为它的子类，什么事也没干，就自动拥有了run()方法

```python
dog = Dog()
dog.run()

cat = Cat()
cat.run()
class Dog(Animal):
    pass

class Cat(Animal):
    pass
```

### 多态

在面向对象程序设计中，除了封装和继承特性外，多态也是一个非常重要的特性。

我们都知道，[Python](http://c.biancheng.net/python/) 是弱类型语言，其最明显的特征是在使用变量时，无需为其指定具体的数据类型。这会导致一种情况，即同一变量可能会被先后赋值不同的类对象，例如：

```python
class CLanguage:
    def say(self):
        print("赋值的是 CLanguage 类的实例对象")
class CPython:
    def say(self):
        print("赋值的是 CPython 类的实例对象")
a = CLanguage()
a.say()
a = CPython()
a.say()
```

运行结果为：

```python
赋值的是 CLanguage 类的实例对象
赋值的是 CPython 类的实例对象
```

可以看到，a 可以被先后赋值为 CLanguage 类和 CPython 类的对象，但这并不是多态。类的多态特性，还要满足以下 2 个前提条件：

1. 继承：多态一定是发生在子类和父类之间；
2. 重写：子类重写了父类的方法。

下面程序是对上面代码的改写：

```python
class CLanguage:
    def say(self):
        print("调用的是 Clanguage 类的say方法")
class CPython(CLanguage):
    def say(self):
        print("调用的是 CPython 类的say方法")
class CLinux(CLanguage):
    def say(self):
        print("调用的是 CLinux 类的say方法")
a = CLanguage()
a.say()
a = CPython()
a.say()
a = CLinux()
a.say()	
```

程序执行结果为：

```python
调用的是 Clanguage 类的say方法
调用的是 CPython 类的say方法
调用的是 CLinux 类的say方法
```

可以看到，CPython 和 CLinux 都继承自 CLanguage 类，且各自都重写了父类的 say() 方法。从运行结果可以看出，同一变量 a 在执行同一个 say() 方法时，由于 a 实际表示不同的类实例对象，因此 a.say() 调用的并不是同一个类中的 say() 方法，这就是多态。

但是，仅仅学到这里，读者还无法领略 Python 类使用多态特性的精髓。其实，Python 在多态的基础上，衍生出了一种更灵活的编程机制。

继续对上面的程序进行改写：

```python
class WhoSay:
    def say(self,who):
        who.say()
class CLanguage:
    def say(self):
        print("调用的是 Clanguage 类的say方法")
class CPython(CLanguage):
    def say(self):
        print("调用的是 CPython 类的say方法")
class CLinux(CLanguage):
    def say(self):
        print("调用的是 CLinux 类的say方法")
a = WhoSay()
#调用 CLanguage 类的 say() 方法
a.say(CLanguage())
#调用 CPython 类的 say() 方法
a.say(CPython())
#调用 CLinux 类的 say() 方法
a.say(CLinux())
```

程序执行结果为：

```python
调用的是 Clanguage 类的say方法
调用的是 CPython 类的say方法
调用的是 CLinux 类的say方法
```

此程序中，通过给 WhoSay 类中的 say() 函数添加一个 who 参数，其内部利用传入的 who 调用 say() 方法。这意味着，当调用 WhoSay 类中的 say() 方法时，我们传给 who 参数的是哪个类的实例对象，它就会调用那个类中的 say() 方法。

> ***在其它教程中，Python 这种由多态衍生出的更灵活的编程机制，又称为“鸭子模型”或“鸭子类型”。***

### 模块引入及正则表达式

Python本身就内置了很多非常有用的模块，只要安装完毕，这些模块就可以立刻使用

```python
import re   # 引入re模块
# 调用re模块match方法匹配字符串
re.match(r'^\d{3}\-\d{3,8}$', '010-12345')   
```

*导入re模块后，我们就有了变量re指向该模块，利用re这个变量，就可以访问re模块的所有功能。*

**re模块*:*Python提供re模块，包含所有正则表达式的功能**[正则表达式 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1016959663602400/1017639890281664)


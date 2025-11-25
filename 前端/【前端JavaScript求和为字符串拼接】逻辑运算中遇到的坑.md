# 【前端JavaScript求和为字符串拼接】逻辑运算中遇到的坑

***目标：判定三角形

***问题：在输入三边后，控制台打印三边和出错？？？

***原因：我的前端表格数据返回的为字符串形式，在求和中，为字符串拼接模式，需要转化为数字Number类型

------

![image-20220427174042200](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427174042200.png)

![image-20220427173904443](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427173904443.png)

![image-20220427173944310](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427173944310.png)

这里，我的s1,s2,s3均为字符串！！！

------



### 一.问题图解：

```javascript
//任意两边和
const add1 = s1 + s2
const add2 = s1 + s3
const add3 = s2 + s3

console.log(add1)
console.log(add2)
console.log(add3)
```

![image-20220427172453887](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427172453887.png)

![image-20220427175615404](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427175615404.png)

![image-20220427172542373](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427172542373.png)

发现确实是拼接模式！！！

------



### 二.解决图解：

#### 1.parseInt( )转化法

```javascript
//任意两边
const add1 = parseInt(s1) + parseInt(s2)
const add2 = parseInt(s1) + parseInt(s3)
const add3 = parseInt(s2) + parseInt(s3)
 console.log(add1)
 console.log(add2)
 console.log(add3)
```

![image-20220427172822656](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427172822656.png)

![image-20220427173100290](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427173100290.png)

#### 2.隐式转化法

让变量乘以1变成Number类型的数就可以加了

```javascript
//任意两边和
const add1 = s1 * 1 + s2 * 1;
const add2 = s1 * 1 + s3 * 1;
const add3 = s2 * 1 + s3 * 1;
console.log(add1)
console.log(add2)
console.log(add3)
```

![image-20220427174550625](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427174550625.png)

![image-20220427174613593](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220427174613593.png)

## 三.总结

* 在JavaScript中
* 需要对两个或多个字符串进行加减
* 如果直接对字符串加减会导致字符串拼接
* 解决法1就是利用parseInt( )函数进行转换

- 解决法2就是利用给这个变量本身乘以1转换成Number类型

------

本人也不太懂前端，只是今天在做我们老师的作业的时候，突然发现了这个问题

有错的地方欢迎在评论区侃侃而谈！
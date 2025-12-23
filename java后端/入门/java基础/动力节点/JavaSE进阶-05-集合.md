# 1. 纲要

a) 主要集合概述  
b) Collection 和 Iterator  
c) List  
d) Set  
e) Map  
f) Collections工具类  
g) Comparable 与 Comparator

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435778.jpg)  
集合继承结构图_Collection 部分

集合继承结构图 Map 部分

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435779.jpg)

# 2. 内容

# 1.1 主要集合概述

Java 集合主要有 3 种重要的类型:

- List: 是一个有序集合，可以放重复的数据
- Set: 是一个无序集合，不允许放重复的数据
- Map: 是一个无序集合，集合中包含一个键对象，一个值对象，键对象不允许重复，值对象可以重复（身份证号—姓名）

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435780.jpg)

# 1.2 Collection 和 Iterator

Collection是List和Set的父接口，在Collection中定义了一些主要方法

<table><tr><td>boolean</td><td>add(E o)</td><td>确保此 collection 包含指定的元素（可选操作）。</td></tr><tr><td>boolean</td><td>addAll(Collection&lt;? extends E&gt; c)</td><td>将指定 collection 中的所有元素都添加到此 collection 中（可选操作）。</td></tr><tr><td>void</td><td>clear()</td><td>移除此 collection 中的所有元素（可选操作）。</td></tr><tr><td>boolean</td><td>contains(Object o)</td><td>如果此 collection 包含指定的元素，则返回 true。</td></tr><tr><td>boolean</td><td>containsAll(Collection&lt;??&gt; c)</td><td>如果此 collection 包含指定 collection 中的所有元素，则返回 true。</td></tr><tr><td>boolean</td><td>equals(Object o)</td><td>比较此 collection 与指定对象是否相等。</td></tr><tr><td>int</td><td>hashCode()</td><td>返回此 collection 的哈希码值。</td></tr><tr><td>boolean</td><td>isEmpty()</td><td>如果此 collection 不包含元素，则返回 true。</td></tr><tr><td>Iterator&lt;E&gt;</td><td>iterator()</td><td>返回在此 collection 的元素上进行迭代的迭代器。</td></tr><tr><td>boolean</td><td>remove(Object o)</td><td>从此 collection 中移除指定元素的单个实例，如果存在的话（可选操作）。</td></tr><tr><td>boolean</td><td>removeAll(Collection&lt;?&gt; c)</td><td>移除此 collection 中那些也包含在指定 collection</td></tr></table>

<table><tr><td></td><td>中的所有元素（可选操作）。</td></tr><tr><td>boolean</td><td>retainAll(Collection&lt;?&gt; c)仅保留此 collection 中那些也包含在指定collection 的元素（可选操作）。</td></tr><tr><td>int</td><td>size()返回此 collection 中的元素数。</td></tr><tr><td>Object[]</td><td>ToArray()返回包含此 collection 中所有元素的数组。</td></tr><tr><td>&lt;T&gt; T[]</td><td>ToArray(T[] a)返回包含此 collection 中所有元素的数组；返回数组的运行时类型与指定数组的运行时类型相同。</td></tr></table>

关于 Iterator 接口说明，Iterator 称为迭代接口，通过此接口可以遍历集合中的数据，此接口主要方法为：

<table><tr><td>boolean</td><td>hasNext()</td><td>如果仍有元素可以迭代，则返回 true。</td></tr><tr><td>E</td><td>next()</td><td>返回迭代的下一个元素。</td></tr></table>

# 1.3 List 接口

# 1.3.1 List 接口概述

List 接口下面主要有两个实现 ArrayList 和 LinkedList，他们都是有顺序的，也就是放进去是什么顺序，取出来还是什么顺序，也就是基于线性存储，可以看作是一个可变数组

■ArrayList: 查询数据比较快, 添加和删除数据比较慢(基于可变数组)  
■LinkedList：查询数据比较慢，添加和删除数据比较快（基于链表数据结构）  
■ Vector:Vector 已经不建议使用，Vector 中的方法都是同步的，效率慢，已经被 ArrayList 取代  
■Stack是继承Vector实现了一个栈，栈结构是后进先出，目前已经被LinkedList取代

```javascript
import java.util.*;
```

```txt
public class ArrayListTest01 {
```

```java
public static void main(String[] args) {
```

```txt
//最好不要这样写，这样属于面向具体编程了
```

```txt
//无法达到灵活互换
```

```txt
//最好面向接口编程
```

```javascript
ArrayList arrayList = new ArrayList();
```

```txt
//采用面向接口编程
```

```javascript
//使用Collection会更灵活，如果List不能满足要求
```

```txt
//那么可以采用HashSet，因为HashSet也实现了该接口
```

```txt
Collection c = new ArrayList();
```

```txt
//面向接口编程
```

```txt
//采用 list 接口可以使用 Collection 里的方法
```

```txt
//也可以使用list接口扩展的方法
```

```javascript
List1 = new ArrayList();
```

```txt
//自动装箱，适合于jdk1.5
```

```javascript
1.add(1);
```

```javascript
1.add(3);
```

```txt
//jdk1.5 以前，必须如下使用
```

```javascript
1.add(new Integer(2));
```

```javascript
1.add(new Integer(4));
```

```txt
//可以加入重复数据
```

```txt
1.add(2);  
//不能加入字符串  
//在强制转换时会出现ClassCastException错误  
//l.add("sadfdsfs");  
//可以采用List接口的中get()方法依次取得元素  
//输出结果为，不会打乱顺序  
/*  
1  
3  
2  
4  
2  
*/  
for (int i=0;i<1.size();i++) {  
//将Object强制转换为Integer  
Integer e = (Integer)l.get(i);  
System.out.println(e);  
}  
System.out.println("");  
//调用remove删除集合中的元素  
//如果元素重复会remove掉第一个匹配的  
l.remove(2);  
//采用Iterator遍历数据（while循环）  
//Iterator是一种模式，主要可以统一数据结构的访问方式  
//这样在程序中就不用关心各个数据结构的实现了  
//使对不同数据结构的遍历更加简单了，更加统一了
```

```txt
Iterator iter = l.iterator();  
while (iter.hasNext()) {  
    Integer v = (Integer)iter.next();  
    System.out.println(v);  
}  
System.out.println("");  
//采用 Iterator 遍历数据（for 循环）  
for (Iterator iter1 = l.iterator(); iter1.hasNext(); {  
    Integer v = (Integer)iter1.next();  
    System.out.println(v);  
}  
//在集合中是否包含 3，输出为：true  
System.out.println(l.contains(3));  
//集合是否为空，输出：false  
System.out.println(l.isEmpty());  
System.out.println("");  
//转换成对象数组  
Object[] oArray1 = l.toArray();  
for (int i = 0; i < oArray1.length; i++) {  
    Integer v = (Integer)oArray1[i];  
    System.out.println(v);  
}  
System.out.println("");  
//运行时自动创建相应类型的数组  
Integer[] iArray = new Integer[l.size'];  
l.toArray(iArray);  
for (int i = 0; i < iArray.length; i++) {
```

```txt
int  $\mathbf{v} =$  iArray[i]; System.out.println(v); } 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435781.jpg)

# 1.3.2 LinkedList

用法同 ArrayList

```java
importjava.util.\*;   
publicclassLinkedListTest01{ public static void main(String[] args){ //最好不要这样写，这样属于面向具体编程了 //无法达到灵活互换 //最好面向接口编程LinkedList arrayList  $\equiv$  newLinkedList(); //采用面向接口编程
```

```javascript
//使用Collection会更灵活，如果List不能满足要求 //那么可以采用HashSet，因为HashSet也实现了该接口 Collectionc  $=$  newLinkedList(); //面向接口编程 //采用list接口可以使用Collection里的方法 //也可以使用list接口扩展的方法 //List1  $\equiv$  newArrayList(); //因为LinkedList和ArrayList都实现了List接口，所以我们可以灵活互换 //直接修改为LinkedList,对我们的程序没有任何影响 List1  $\equiv$  newLinkedList(); //自动装箱，适合于jdk1.5 1.add(1); 1.add(3); //jdk1.5以前，必须如下使用 1.add(new Integer(2)); 1.add(new Integer(4)); //可以加入重复数据 1.add(2); for(inti=0;i<1.size();i++) { Integer e  $=$  (Integer)l.get(i); System.out.println(e); } System.out.println("");
```

```txt
l.remove(2);   
Iterator iter  $=$  l.iterator();   
while (iter.hasNext()){ Integer  $\mathrm{v} =$  (Integer)iter.next(); System.out.println(v);   
}   
System.out.println("");   
for (Iterator iter1=1.iterator(); iter1.hasNext(); { Integer  $\mathrm{v} =$  (Integer)iter1.next(); System.out.println(v);   
}   
System.out.println(l.contains(3));   
System.out.println(l.isEmpty());   
System.out.println("");   
Object[] oArray1  $= 1$  .toArray();   
for (int i=0; i<oArray1.length; i++) { Integer  $\mathrm{v} =$  (Integer)oArray1[i]; System.out.println(v);   
}   
System.out.println("");   
Integer[] iArray  $=$  new Integer[l.size();   
l.toArray(iArray);   
for (int i=0; i<iArray.length; i++) { int  $\mathrm{v} =$  iArray[i];
```

修改为HashSet 实现类，重点了解面向接口编程的好处

```txt
System.out.println(v); } 1
```

```java
import java.util.*;
public class LinkedListTest02 {
    public static void main(String[] args) {
        //采用面向接口编程
        //使用Collection会更灵活，如果List不能满足要求
        //那么可以采用HashSet，因为HashSet也实现了该接口
        //Collection c = new ArrayList();
        //可以修改为HashSet
        Collection c = newHashSet();
        //不能改为HashSet，因为HashSet不是List产品
        //List l = newHashSet();
        //自动装箱，适合于jdk1.5
        c.add(1);
        c.add(3);
        //jdk1.5以前，必须如下使用
        c.add(new Integer(2));
        c.add(new Integer(4));
```

```javascript
//可以加入重复数据  
c.add(2);  
/*  
for (int i = 0; i < c.size(); i++) {  
    //不能采用 get，因为 get 是 List 接口扩展的  
    //父类不能看到子类扩展的功能  
    //反过来子类可以看到父类的功能，因为子类继承了父类  
    Integer e = (Integer)c.get(i);  
    System.out.println(e);  
}  
*/  
System.out.println("");  
Iterator iter = c.iterator();  
while (iter.hasNext()) {  
    Integer v = (Integer)iter.next();  
    System.out.println(v);  
}  
System.out.println("");  
for (Iterator iter1 = c.iterator(); iter1.hasNext();) {  
    Integer v = (Integer)iter1.next();  
    System.out.println(v);  
}  
System.out.println(c.contains(3));  
System.out.println(c.isEmpty());  
System.out.println("");
```

```javascript
Object[] oArray1 = c.toArray(); for (int i=0; i<oArray1.length; i++) { Integer v = (Integer)oArray1[i]; System.out.println(v); } System.out.println(""); Integer[] iArray = new Integer[c.size(); c.toArray(iArray); for (int i=0; i<iArray.length; i++) { int v = iArray[i]; System.out.println(v); } } }
```

# 1.4 Set 接口

# 1.4.1 哈希表

哈希表是一种数据结构，哈希表能够提供快速存取操作。哈希表是基于数组的，所以也存在缺点，数组一旦创建将不能扩展。

正常的数组，如果需要查询某个值，需要对数组进行遍历，只是一种线性查找，查找的速度比较慢。如果数组中的元素值和下标能够存在明确的对应关系，那么通过数组元素的值就可以换算出数据元素的下标，通过下标就可以快数定位数组元素，这样的数组就是哈希表。一张哈希表：

<table><tr><td>元素值</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr><tr><td>元素下标</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr></table>

以上我们的示例元素值和下标的关系为:

元素下标=元素值-10，此时的示例hashcode就是和数组下标一致了,取得hashcode方法如下：

```txt
//取得 hashCode  
public int hashCode(int value) {  
    return value - 10;  
}
```

有了 hashCode 后，我们就可以快速的定位相应的元素，查找到相应的信息

# 1.4.2 HashSet

HashSet 中的数据是无序的不可重复的。HashSet 按照哈希算法存取数据的，具有非常好性能，它的工作原理是这样的，当向SETS
中插入数据的时候，他会调用对象的 hashCode 得到该对象的哈希码，然后根据哈希码计算出该对象插入到集合中的位置。

```java
import java.util.\*;   
public class HashSetTest01{ public static void main(String[] args){ //它是无序的，不重复 Set set  $=$  newHashSet(); set.add("a"); set.add("b"); set.add("c"); //输出是无序的 for (Iterator iter  $\equiv$  set.iterator();iter.hasNext();）{ System.out.println.Iter.next()); } //加入重复数据 set.add("a"); System.out.println(""); for (Iterator iter  $\equiv$  set.iterator();iter.hasNext();）{
```

```java
System.out.println.Iter.next());   
} Strings1  $=$  "abc"; String s2  $=$  "abc"; System.out.println("s1 equals s2,  $" +$  s1.equals(s2)); //equals相等，hashCode一定是相等的 System.out.println("s1.hashCode  $= "$  +s1.hashCode()); System.out.println("s2.hashCode  $= "$  +s2.hashCode()); String s3  $=$  "dddd"; System.out.println("s1 equlas s3,  $" +$  s1.equals(s3)); System.out.println("s3.hashCode  $= "$  +s3.hashCode()); }
```

```batch
D:\share\JavaProjects\2se\chapter07>java HashSetTest01
a
c
b
a
c
b
s1 equals s2 ,true
s1.hashCode=96354
s2.hashCode=96354
s1.equals s3,false
s3.hashCode=95438500
D:\share\JavaProjects\j2ce\chapter07>
```

# 1.4.3 equals 和 hashCode

```txt
importjava.util.\*;   
publicclassHashSetTest02{ public static void main(String[] args){ Personp1  $\equiv$  newPerson(); p1.name  $=$  "张三";
```

```txt
p1.age = 20;   
Person p2 = new Person();   
p2.name = "李四";   
p2.age = 30;   
Person p3 = new Person();   
p3.name = "张三";   
p3.age = 40;   
Set set = newHashSet();   
set.add(p1);   
set.add(p2);   
set.add(p3);   
for (Iterator iter = set.iterator(); iter.hasNext();){ Person p = (Person)iter.next(); System.out.println("name=" + p.name + ", age=" + p.age); } System.out.println("p1.hashCode=" + p1.hashCode()); System.out.println("p2.hashCode=" + p2.hashCode()); System.out.println("p3.hashCode=" + p3.hashCode()); } }   
class Person { String name;
```

```txt
int age;   
}
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435782.jpg)

加入了重复的数据，因为hashCode是不同的，所以会根据算出不同的位置，存储格式

<table><tr><td>Person{张三，20}</td><td>Person{李四，30}</td><td>Person{张三，40}</td></tr><tr><td>7699183</td><td>14285251</td><td>10267414</td></tr></table>

进一步完善，覆盖 equals

```java
import java.util.\*;   
public class HashSetTest03{ public static void main(String[] args){ Person p1  $=$  new Person(); p1.name  $=$  "张三"; p1.age  $= 20$  . Person p2  $=$  new Person(); p2.name  $=$  "李四"; p2.age  $= 30$  . Person p3  $=$  new Person(); p3.name  $=$  "张三"; p3.age  $= 40$  System.out.println("p1equals p2,  $" + p1$  equals(p2)); System.out.println("p1equals p3,"  $^+$  p1.equals(p3));
```

```groovy
Set set = new HashSet();  
set.add(p1);  
set.add(p2);  
set.add(p3);  
for (Iterator iter = set.iterator(); iter.hasNext()) {  
    Person p = (Person)iter.next();  
    System.out.println("name=" + p.name + ", age=" + p.age);  
}  
System.out.println("p1.hashCode=" + p1.hashCode());  
System.out.println("p2.hashCode=" + p2.hashCode());  
System.out.println("p3.hashCode=" + p3.hashCode());  
}  
}  
class Person {  
    String name;  
int age;  
//覆盖 equals  
public boolean equals(Object obj) {  
    if (this == obj) {  
        return true;  
    }  
    if (obj instanceof Person) {  
        Person p = (Person)obj;  
    }  
}
```

```javascript
return this.name.equals(p.name); } return false; 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435783.jpg)

以上仍然存在重复数据，在 Person 中覆盖了 hashCode 方法，能够正确的比较出两个 Person 是相等的还是不等的，但是为什么 HashSet
中还是放入了重复数据？因为 Person 对象的 hashCode 不同，所以它就换算出了不同的位置，让后就会把相关的值放到不同的位置上，就忽略
equulas，所以我们必须覆盖 hashCode 方法

<table><tr><td>Person{张三，20}</td><td>Person{李四，30}</td><td>Person{张三，40}</td></tr><tr><td>7699183</td><td>14285251</td><td>10267414</td></tr></table>

【代码示例】，只覆盖 hashCode，不覆盖 equals

```java
import java.util.\*;   
public class HashSetTest04{ public static void main(String[] args){ Person p1  $=$  new Person(); p1.name  $=$  "张三"; p1.age  $= 20$  · Personp2  $=$  new Person(); p2.name  $=$  "李四"; p2.age  $= 30$
```

```txt
Person p3 = new Person();  
p3.name = "张三";  
p3.age = 40;  
System.out.println("p1 equals p2," + p1.equals(p2));  
System.out.println("p1 equals p3," + p1.equals(p3));  
Set set = newHashSet();  
set.add(p1);  
set.add(p2);  
set.add(p3);  
for (Iterator iter = set.iterator(); iter.hasNext()) {  
    Person p = (Person)iter.next();  
    System.out.println("name=" + p.name + ", age=" + p.age);  
}  
System.out.println("p1.hashCode=" + p1.hashCode());  
System.out.println("p2.hashCode=" + p2.hashCode());  
System.out.println("p3.hashCode=" + p3.hashCode());  
}  
}  
class Person {  
    String name;  
    int age;  
//覆盖 hashCode
```

```txt
public int hashCode() { return (name==null)?0:name.hashCode(); }
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435784.jpg)

以上示例，张三的 hashCode 相同，当两个对象的 equals 不同，所以认为值是以不一样的，那么 java 会随机换算出一个新的位置，放重复数据

<table><tr><td>Person{张三，20}</td><td>Person{李四，30}</td><td>Person{张三，40}</td></tr><tr><td>774889-1</td><td>14285251</td><td>774889-2</td></tr></table>

【代码示例】，进一步改善，覆盖 equals，覆盖 hashCode

```java
import java.util.\*;   
public class HashSetTest05{ public static void main(String[] args){ Person p1  $=$  new Person(); p1.name  $=$  "张三"; p1.age  $= 20$  . Personp2  $=$  new Person(); p2.name  $=$  "李四"; p2.age  $= 30$  . Personp3  $=$  new Person(); p3.name  $=$  "张三"; p3.age  $= 40$
```

```txt
System.out.println("p1 equals p2," + p1.equals(p2)); System.out.println("p1 equals p3," + p1.equals(p3)); Set set = newHashSet(); set.add(p1); set.add(p2); set.add(p3); for (Iterator iter =set.iterator();iter.hasNext();){ Person  $\mathrm{p} =$  (Person)iter.next(); System.out.println("name=" + p.name + ", age=" + p.age); } System.out.println("p1.hashCode=" + p1.hashCode()); System.out.println("p2.hashCode=" + p2.hashCode()); System.out.println("p3.hashCode=" + p3.hashCode()); } } class Person { String name; int age; //覆盖 hashCode public int hashCode(){ return (name==null)?0:name.hashCode(); }
```

```javascript
//覆盖equals   
publicbooleanequals(Object obj){ if(this  $= =$  obj）{ return true; } if(objinstanceofPerson){ Person  $\mathfrak{p} =$  (Person)obj; return this.name.equals(p.name); 1 return false;   
1
```

```batch
D:\share\JavaProjects\j2se\chapter07>java HashSetTest05
p1 equals p2,false
p1 equals p3:true
name="张三", age=20
name="李四", age=30
p1.hashCode="774889"
p2.hashCode="842061"
p3.hashCode="774889"
D:\share\JavaProjects\j2se\chapter07>
```

以上输出完全正确的，因为覆盖了 equals 和 hashCode，当 hashCode 相同，它会调用 equals 进行比较，如果 equals 比较相等将不加把此元素加入到
Set 中，但 equals 比较不相等会重新根据 hashCode 换算位置仍然会将该元素加入进去的。

<table><tr><td>Person{张三，20}</td><td>Person{李四，30}</td><td></td></tr><tr><td>774889</td><td>842061</td><td></td></tr></table>

再次强调：特别是向HashSet或 HashMap中加入数据时必须同时覆盖equals和hashCode方法，应该养成一种习惯覆盖equals的同时最好同时覆盖hashCode

Java要求：

两个对象 equals 相等，那么它的 hashcode 相等

两个对象 equals 不相等，那么它的 hashcode 并不要求它不相等，但一般建议不相等 hashcode 相等不代表两个对象相等（采用 equals
比较）

# 1.4.4 TreeSet

TreeSet 可以对 Set 集合进行排序，默认自然排序（即升序），但也可以做客户化的排序

```java
import java.util.\*;   
public class TreeSetTest01{ public static void main(String[] args){ Set set  $=$  newTreeSet(); set.add(9); set.add(2); set.add(5); set.add(1); //不能放入重复数据 set.add(5); for (Iterator iter  $\equiv$  set.iterator();iter.hasNext();）{ Integer  $\mathrm{v} =$  （Integer）iter.next(); System.out.println(v); } 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435785.jpg)

以上没有输出重复的，是按自然顺序排序的（升序）

```java
import java.util.\*;   
public class TreeSetTest02{ public static void main(String[] args){ Set set  $=$  newTreeSet(); set.add(9); set.add(2); set.add(5); set.add(1); //不能放入重复数据 set.add(5); //不能加入abc，加入后无法排序 //排序只能对一种类型排序 //set.add("abc"); for (Iterator iter  $\equiv$  set.iterator();iter.hasNext();）{//Integer  $\mathbf{v} =$  （Integer)iter.next(); //System.out.println(v); System.out.println(iter.next()); } 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435786.jpg)

【代码示例】，对 Person 进行自然排序

```txt
import java.util.\*;   
public class TreeSetTest03{ public static void main(String[] args){ Person p1  $=$  new Person(); p1.name  $=$  "张三"; p1.age  $= 20$  . Person p2  $=$  new Person(); p2.name  $=$  "李四"; p2.age  $= 30$  . Person p3  $=$  new Person(); p3.name  $=$  "张三"; p3.age  $= 40$  . Set set  $=$  new TreeSet(); set.add(p1); set.add(p2); set.add(p3); for (Iterator iter  $\equiv$  set.iterator();iter.hasNext();）{ Person  $\mathfrak{p} =$  (Person)iter.next(); System.out.println("name  $\equiv$  "  $^+$  p.name  $^+$  ",age  $\equiv$  "  $^+$  p.age); } }
```

```dart
class Person { String name; int age; }
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435787.jpg)

出现错误，因为放到 TreeSet 中 TreeSet 会对其进行排序，那么必须实现 Comparable 接口，而我们的 Person
没有实现，所以出现了错误，如：基本类型的包装类和 String 他们都是可以排序的，他们都实现 Comparable 接口

# 1.4.5 实现Comparable接口完成排序

```txt
import java.util.\*;   
public class TreeSetTest04{ public static void main(String[] args){ Person p1  $=$  new Person(); p1.name  $=$  "张三"; p1.age  $= 20$  . Personp3  $\equiv$  new Person(); p3.name  $=$  "张三"; p3.age  $= 40$  . Personp2  $\equiv$  new Person(); p2.name  $=$  "李四";
```

```java
p2.age = 30;  
Set set = new TreeSet();  
set.add(p1);  
set.add(p2);  
set.add(p3);  
for (Iterator iter = set.iterator(); iter.hasNext()) {  
    Person p = (Person)iter.next();  
    System.out.println("name=" + p.name + ", age=" + p.age);  
}  
}  
}  
class Person implements Comparable {  
    String name;  
    int age;  
    //如果覆盖了 equals，最好保证 equals 和 compareTo 在  
    //相等情况下的比较规则是一致的  
    public int compareTo(Object o) {  
        if (o instanceof Person) {  
            Person p = (Person)o;  
            //升序  
            //return (this.age - p.age);  
            //降序  
            return (p.age - this.age);  
        }  
    }
```

```javascript
throw new IllegalArgumentException("非法参数，  $\mathrm{o} = {}^{\prime \prime} + \mathrm{o})$  1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435788.jpg)

# 1.4.6 实现 Comparator 接口完成排序

```java
import java.util.\*;   
public class TreeSetTest05{ public static void main(String[] args){ Person p1  $=$  new Person(); p1.name  $=$  "张三"; p1.age  $= 20$  . Personp3  $\equiv$  new Person(); p3.name  $=$  "张三"; p3.age  $= 40$  . Personp2  $\equiv$  new Person(); p2.name  $=$  "李四"; p2.age  $= 30$  ; ComparatorpersonComparator  $\equiv$  newPersonComparator(); Set set  $=$  newTreeSet(personComparator); set.add(p1);
```

```java
set.add(p2); set.add(p3); for (Iterator iter  $\equiv$  set.iterator();iter.hasNext();）{ Person  $p =$  (Person)iter.next(); System.out.println("name  $\equiv$  " + p.name + ", age  $\equiv$  " + p.age); } 1   
}   
class Person { String name; int age;   
}   
//实现Person的比较器   
//Comparator和Comparable的区别？   
//Comparable是默认的比较接口，Comparable和需要比较的对象紧密结合到一起 了   
//Comparator可以分离比较规则，所以它更具灵活性   
class PersonComparator implements Comparator{ public int compare(Object o1, Object o2){ if(!(o1 instanceof Person)){ throw new IllegalArgumentException("非法参数，o1  $\equiv$  " + o1); } if(!(o2 instanceof Person)){ throw new IllegalArgumentException("非法参数，o2  $\equiv$  " + o2);
```

```txt
}   
Person p1  $=$  (Person)o1; Person p2  $=$  (Person)o2; return p1.age - p2.age;   
}
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435789.jpg)

# 1.4.7 采用匿名类完成 Comparator 的实现

```txt
importjava.util.\*;   
publicclassTreeSetTest06{ public static void main(String[] args){ Personp1  $=$  newPerson(); p1.name  $=$  "张三"; p1.age  $= 20$  · Personp3  $\equiv$  newPerson(); p3.name  $=$  "张三"; p3.age  $= 40$  · Personp2  $\equiv$  newPerson(); p2.name  $=$  "李四"; p2.age  $= 30$  //采用匿名类实现比较器 Set set  $\equiv$  newTreeSet(newComparator() {
```

```txt
public int compare(Object o1, Object o2) { if(!(o1 instanceof Person)) { throw new IllegalArgumentException("非法参数，o1=" + o1); } if (!(o2 instanceof Person)) { throw new IllegalArgumentException("非法参数，o2=" + o2); } Person p1 = (Person)o1; Person p2 = (Person)o2; return p1.age - p2.age; } }; set.add(p1); set.add(p2); set.add(p3); for (Iterator iter =set.iterator();iter.hasNext()) { Person p = (Person)iter.next(); System.out.println("name=" + p.name + ", age=" + p.age); } } } class Person { String name; int age; }
```

# 1.4.8 Comparable 和 Comparator 的区别？

一个类实现了Camparable接口则表明这个类的对象之间是可以相互比较的，这个类对象组成的集合就可以直接使用sort方法排序。

Comparator 可以看成一种算法的实现，将算法和数据分离，Comparator 也可以在下面两种环境下使用：

1、类的没有考虑到比较问题而没有实现Comparable，可以通过 Comparator 来实现排序而不必改变对象本身  
2、可以使用多种排序标准，比如升序、降序等

# 1.5 Map 接口

Map 中可以放置键值对，也就是每一个元素都包含键对象和值对象，Map 实现较常用的为 HashMap，HashMap 对键对象的存取和(Set
一样，仍然采用的是哈希算法，所以如果使用自定类作为 Map 的键对象，必须复写 equals 和 hashCode 方法。

# 1.5.1 HashMap

```typescript
importjava.util.\*;   
publicclass HashMapTest01{ public static void main(String[] args){ Map map  $=$  new HashMap(); map.put("1001","张三"); map.put("1002","李四"); map.put("1003","王五"); //采用entrySet遍历Map Set entrySet  $\equiv$  map.Entry(); for(Iteratoriter  $\equiv$  entrySet.iterator();iter.hasNext();）{ Map.Entry entry  $=$  (Map.Entry)iter.next();
```

```java
System.out.println(entry.getKey() + ", " + entry.getValue());  
}  
System.out.println("");  
//取得map中指定的key  
Object v = map.get("1003");  
System.out.println("1003==" + v);  
System.out.println("");  
//如果存在相同的条目，会采用此条目替换  
//但map中始终保持的是不重复的数据  
//主要依靠key开判断是否重复，和value没有任何关系  
map.put("1003", "赵柳");  
//采用keySet和get取得map中的所有数据  
for (Iterator iter = map.keySet().iterator(); iter.hasNext()) {  
    String k = (String)iter.next();  
    System.out.println(k + ", " + map.get(k));  
}
```

```txt
C:\命令提示符
D:\share\JavaProjects\j2se\chapter07>java HashMapTest01
1002, 李四
1003, 王五
1001, 张三
1003==王五
1002, 李四
1003, 赵柳
1001, 张三
D:\share\JavaProjects\j2se\chapter07>
```

# 1.5.2 HashMap，采用自定义类作为key

```javascript
import java.util.\*;   
public class HashMapTest02{ public static void main(String[] args){ IdCard idCard1  $=$  new IdCard(); idCard1.cardNo  $= 223243244243243L$  Person person1  $=$  new Person(); person1.name  $=$  "张三"; IdCard idCard2  $=$  new IdCard(); idCard2.cardNo  $= 223243244244343L$  Person person2  $=$  new Person(); person2.name  $=$  "李四"; IdCard idCard3  $=$  new IdCard(); idCard3.cardNo  $= 223243244243243L$  Person person3  $=$  new Person(); person3.name  $=$  "张三"; Map map  $=$  new HashMap(); map.put(idCard1, person1); map.put(idCard2, person2); map.put(idCard3, person3);
```

```txt
for (Iterator iter  $=$  map.Entry().iterator();iter.hasNext();）{ Map.Entry entry  $=$  (Map.Entry)iter.next(); IdCard idCard  $=$  (IdCard)entry/key(); Person person  $=$  (Person)entry.getValue(); System.out.println(idCard.cardNo  $^+$  ", " + person.name); 1 } 1 class IdCard { long cardNo; //..... 1 class Person { String name; }
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435790.jpg)

加入了重复的数据，因为 HashMap 的底层实现采用的是 hash 表，所以 Map 的 key 必须覆盖 postcode 和 equals 方法

# 1.5.3 HashMap，覆盖 IdCard 的 equals 和 hashCode 方法

```javascript
import java.util.\*;   
public class HashMapTest03{ public static void main(String[] args){ IdCard idCard1  $=$  new IdCard(); idCard1.cardNo  $= 223243244243243L$  Person person1  $=$  new Person(); person1.name  $=$  "张三"; IdCard idCard2  $=$  new IdCard(); idCard2.cardNo  $= 223243244244343L$  Person person2  $=$  new Person(); person2.name  $=$  "李四"; IdCard idCard3  $=$  new IdCard(); idCard3.cardNo  $= 223243244243243L$  Person person3  $=$  new Person(); person3.name  $=$  "张三"; Map map  $=$  new HashMap(); map.put(idCard1, person1); map.put(idCard2, person2); map.put(idCard3, person3);
```

```javascript
for (Iterator iter  $=$  map.Entry().iterator();iter.hasNext();){Map.Entry entry  $=$  (Map.Entry)iter.next();IdCard idCard  $=$  (IdCard)entry/key();Person person  $=$  (Person)entry.getValue();System.out.println(idCard.cardNo  $^+$  ", " + person.name);1}class IdCard{long cardNo;//......publicbooleanequals(Object obj){if(obj  $= =$  this）{return true;}if(obj instanceof IdCard){IdCardidCard  $=$  (IdCard)obj;if(this.cardNo  $= =$  idCard.cardNo){return true;1}1return false;1
```

```txt
public int hashCode(){ return new Long_cardNo).hashCode();   
}   
class Person{ String name;
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435791.jpg)

以上没有加入重复的数据，因为覆盖了 equals 和 hashCode 方法

# 1.5.4 TreeMap

treeMap 可以对 Map 中的 key 进行排序，如果 map 中的 key 采用的是自定类那么需要实现 Comparator 或 Comparator 接口完成排序

```java
import java.util.\*;   
public class TreeMapTest01{ public static void main(String[] args){ Map map  $=$  new TreeMap(); map.put("1003","王五"); map.put("1001","张三"); map.put("1002","李四"); for (Iterator iter  $=$  map.Entry().iterator();iter.hasNext();）{ Map.Entry entry  $=$  (Map.Entry)iter.next(); System.out.println(entry.getKey() + ", " + entry.getValue());
```

```txt
} 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435792.jpg)

# 1.6 Collections 工具类

Collections 位于 java.util 包中，提供了一系列实用的方法，如：对集合排序，对集合中的内容查找等

```java
import java.util.\*;   
public class CollectionsTest01{ public static void main(String[] args){ List 1  $=$  new ArrayList(); 1.add(5); 1.add(1); 1.add(4); 1.add(2); for (Iterator iter  $\equiv$  l.iterator();iter.hasNext();）{ System.out.println_iter.next(); } System.out.println(""); Collections.sort(1); for (Iterator iter  $\equiv$  l.iterator();iter.hasNext();）{ System.out.println_iter.next();
```

```javascript
} System.out.println(""); Set set  $=$  newHashSet(); set.add(10); set.add(1); set.add(4); set.add(9); //不能直接对set排序 //Collections.sort(set); List setList  $=$  new ArrayList(set); Collections.sort(setList); for (Iterator iter  $=$  setList.iterator();iter.hasNext();）{ System.out.println(iter.next()); } System.out.println(""); int index  $=$  Collections.binarySearch(setList,9); System.out.println("index  $\equiv$  " + index); System.out.println(""); Collections.reverse(setList); for (Iterator iter  $=$  setList.iterator();iter.hasNext();）{ System.out.println(iter.next()); } } 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435793.jpg)

# 1.7 泛型初步

泛型能更早的发现错误，如类型转换错误，通常在运行期才会发现，如果使用泛型，那么在编译期将会发现，通常错误发现的越早，越容易调试，越容易减少成本

# 1.7.1 为什么使用泛型

```java
import java.util.\*;   
public class GenericTest01{ public static void main(String[] args){ List  $l =$  new ArrayList(); 1.add(1); 1.add(2); 1.add(3); for (Iterator iter  $\equiv$  l.iterator();iter.hasNext();）{ //出现了java.lang.ClassCastException异常 //这种转型错误时运行期发现了 //错误发现的越早越好，最好在编译器能发现类似的错误 //如果想在编译器发现类似的错误，必须使用泛型
```

```txt
String s = (String)iter.next(); System.out.println(s); } 1
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233435794.jpg)

# 1.7.2 使用泛型解决示例一

```java
import java.util.\*;   
public class GenericTest02{ public static void main(String[] args){ ListInteger>1  $\equiv$  new ArrayList[Integer>(); 1.add(1); 1.add(2); 1.add(3); //不能将abc放到集合中，因为使用泛型，在编译器就可以返现错误 //l.add("abc"); for (IteratorInteger>iter  $\equiv$  l.iterator();iter.hasNext();）{ //因为使用泛型，在编译器就可以发现错误 //String s  $=$  (String)iter.next(); //使用泛型可以不用进行强制转换
```

```javascript
//Integer s = (Integer)iter.next(); //可以直接取得相应的元素，使用泛型返回的是真正的类型 Integer s = iter.next(); System.out.println(s); } 1
```

# 1.7.3 采用泛型来改善自定义比较器

```java
import java.util.\*;   
public class GenericTest03{ public static void main(String[] args){ Person p1  $=$  new Person(); p1.name  $=$  "张三"; p1.age  $= 20$  . Personp3  $=$  new Person(); p3.name  $=$  "张三"; p3.age  $= 40$  . Personp2  $=$  new Person(); p2.name  $=$  "李四"; p2.age  $= 30$  . Set<Person> set  $=$  new TreeSet<Person>(); set.add(p1);
```

```txt
set.add(p2); set.add(p3); for (Iterator<Person> iter  $\equiv$  set.iterator();iter.hasNext();）{ Person p  $=$  iter.next(); System.out.println("name  $\coloneqq$  "  $^+$  p.name  $^+$  ",age  $\coloneqq$  "  $^+$  p.age); 1 }   
}   
class Person implements Comparable<Person> { String name; int age; //使用了泛型类似的instanceof就不用再写了 public int compareTo(Person o){ return (this.age - o.age); 1
```

# 1.7.4 采用泛型改造Map

```java
import java.util.\*;   
public class GenericTest04 { public static void main(String[] args) {
```

IdCard idCard1 = new IdCard();

idCard1.cardNo = 223243244243243L;

Person person1 = new Person();

person1.name = "张三";

IdCard idCard2 = new IdCard();

idCard2.cardNo = 223243244244343L;

Person person2 = new Person();

person2.name = "李四";

IdCard idCard3 = new IdCard();

idCard3.cardNo = 223243244243243L;

Person person3 = new Person();

person3.name = "张三";

Map<IdCard, Person> map = new HashMap<IdCard, Person>();

map.put(idCard1, person1);

map.put(idCard2, person2);

map.put(idCard3, person3);

//不能编译

//map.put("1001","王五");

for (Iterator<Map.Entry<IdCard, Person>> iter = map.entrySet().iterator();

iter.hasNext();}

/\*

Map.Entry entry = (Map.Entry)iter.next();

IdCard idCard = (IdCard)entry.getKey();

Person person = (Person)entry.getValue();

```txt
\*/ Map.Entry<IdCard, Person> entry = iter.next(); //不能转换 //String s = (String)entry.getKey(); IdCard idCard = entry.getKey(); Person person = entry.getValue(); System.out.println(idCard.cardNo + ", " + person.name); } 1 } 1 class IdCard { long cardNo; //...... public boolean equals(Object obj) { if (obj == this) { return true; } if (obj instanceof IdCard) { IdCard idCard = (IdCard)obj; if (this.cardNo == idCard.cardNo) { return true; }
```

```java
} return false;   
public int hashCode(){ return new Long_cardNo).hashCode();   
class Person{ String name;
```

# 1.7.5 自定义泛型

```java
import java.util.\*;   
public class GenericTest05{ private Object obj; public void setObj(Object obj){ thisobj  $\equiv$  obj; } public Object getObj(){ return obj; 1
```

【示例代码】，自定泛型

```java
public static void main(String[] args) { GenericTest05 g = new GenericTest05(); g.setObj("abcd"); //抛出java.lang.ClassCastException错误 //因为不知道Object到底是什么类型 Integer i  $=$  (Integer)g Obj(); }
```

```java
import java.util.\*;   
public class GenericTest06<T> { private T obj; public void setObj(Tobj) { thisobj  $\equiv$  obj; } public T getObj() { return obj; } public static void main(String[] args) { GenericTest06<String> g  $=$  new GenericTest06<String>();
```

```javascript
g.setObj("abcd"); //不能设置int类型 //因为使用泛型规定只能设置为String类型 //g.setObj(123); //不能转换，因为String类型 //Integer  $\mathrm{i} =$  (Integer)g Obj(); //使用泛型后不用再进行强制转换了 //它返回的就是真正的类型 Strings  $=$  g Obj(); }
```

【示例代码】，修改泛型标识

```java
import java.util.*;   
//泛型的标示符没有限制，只有符合java的标示符命名规范即可   
//最好和JDK的泛型标识一样   
public class GenericTest07<AAA> { private AAA obj; public void setObj(AAA obj) { thisobj  $\equiv$  obj; } public AAA getObj() {
```

```java
return obj;   
}   
public static void main(String[] args) { GenericTest07<String> g = new GenericTest07<String>(); g.setObj("abcd"); String s = g Obj();   
}
```

# 1.8 遗留类对比表

<table><tr><td>遗留类</td><td>缺点</td><td>取代类</td></tr><tr><td>Vector</td><td>方法都是同步的影响性能</td><td>ArrayList 和 LinkedList</td></tr><tr><td>Hashtable</td><td>方法都是同步的影响性能</td><td>HashMap</td></tr><tr><td>Stack</td><td>因为 Stack 继承了 Vector, 同样影响性能</td><td>LinkedList</td></tr><tr><td>Enumeration</td><td>只能与历史集合使用</td><td>Iterator</td></tr></table>
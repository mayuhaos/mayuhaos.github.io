# 集合框架

# 1、为什么使用集合框架？

假设，一个班级有30个人，我们需要存储学员的信息，是不是我们可以用一个一维数组就解决了？

那换一个问题，一个网站每天要存储的新闻信息，我们知道新闻是可以实时发布的，我们并不知道需要多大的空间去存储，我要是去设置一个很大的数组，要是没有存满，或者不够用，都会影响我们，前者浪费的空间，后者影响了业务！

如果并不知道程序运行时会需要多少对象，或者需要更复杂的方式存储对象，那我们就可以使用java的集合框架！

# 2、集合框架包含的内容

Java集合框架提供了一套性能优良，使用方便的接口和类，他们位于java.util包中。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319795.jpg)  
【接口和具体类】

# 【算法】

Collections 类提供了对集合进行排序，遍历等多种算法实现！

# 【重中之重】

- Collection 接口存储一组不唯一，无序的对象
- List 接口存储一组不唯一，有序的对象。
- Set 接口存储一组唯一，无序的对象
- Map 接口存储一组键值对象，提供key到value的映射
- ArrayList实现了长度可变的数组，在内存中分配连续的空间。遍历元素和随机访问元素的效率比较高

<table><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td></td></tr><tr><td>aaaa</td><td>dddd</td><td>cccc</td><td>aaaa</td><td>eeee</td><td>dddd</td><td></td></tr></table>

- LinkedIn采用链表存储方式。插入、删除元素时效率比较高

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319796.jpg)  
[  
1

- HashSet:采用哈希算法实现的Set

- HashSet的底层是用 HashMap实现的，因此查询效率较高，由于采用hashCode算法直接确定元素的内存地址，增删效率也挺高的。

# ArrayList 实践

问题：我们现在有4只小狗，我们如何存储它的信息，获取总数，并能够逐条打印狗狗信息！

分析：通过List接口的实现类ArrayList实现该需求

- 元素个数不确定
- 要求获得元素的实际个数
- 按照存储顺序获取并打印元素信息

```java
class Dog { private String name; //构造。。。set、get、。。。 toString() }   
public class TestArrayList { public static void main(String[] args) { //创建ArrayList对象，并存储狗狗 List dogs  $=$  new ArrayList(); dogs.add(new Dog("小狗一号")); dogs.add(new Dog("小狗二号")); dogs.add(new Dog("小狗三号")); dogs.add(2,new Dog("小狗四号”）);//添加到指定位置   
//.size():ArrayList大小 System.out.println("共计有"  $^+$  dogs.size(）+ "条狗狗。"); System.out.println("分别是：");   
//.get(i）：逐个获取个元素 for (int i  $= 0$  ；i  $<$  dogs.size();i++){ Dog dog  $=$  （Dog）dogs.get(i); System.out.println(dog.getName()); }   
}
```

# 问题联想：

- 删除第一个狗狗：remove (index)
- 删除指定位置的狗狗：remove (object)
- 判断集合中是否包含指定狗狗：contains (object)

分析：使用List接口提供的remove()、contains()方法

【常用方法】

<table><tr><td>boolean add(Object o)</td><td>在列表的末尾顺序添加元素, 起始索引位置从0开始</td></tr><tr><td>void add(int index,Object o)</td><td>在指定的索引位置添加元素。 索引位置必须介于0和列表中元素个数之间</td></tr><tr><td>int size(   )</td><td>返回列表中的元素个数</td></tr><tr><td>Object get(int index)</td><td>返回指定索引位置处的元素。取出的元素是 Object类型, 使用前需要进行强制类型转换</td></tr><tr><td>boolean contains(Object o)</td><td>判断列表中是否存在指定元素</td></tr><tr><td>boolean remove(Object o)</td><td>从列表中删除元素</td></tr><tr><td>Object remove(int index)</td><td>从列表中删除指定位置元素, 起始索引位置从0开始</td></tr></table>

【学员动手】

# ArrayList 源码分析

# 1、ArrayList概述

1. ArrayList是可以动态增长和缩减的索引序列，它是基于数组实现的List类。
2. 该类封装了一个动态再分配的Object[]数组，每一个类对象都有一个capacity【容量】属性，表示它们所封装的Object[]
   数组的长度，当向ArrayList中添加元素时，该属性值会自动增加。如果想ArrayList中添加大量元素，可使用ensureCapacity方法一次性增加capacity，可以减少增加重分配的次数提高性能。
3. ArrayList的用法和Vector向类似，但是Vector是一个较老的集合，具有很多缺点，不建议使用。

另外，ArrayList和Vector的区别是：ArrayList是线程不安全的，当多条线程访问同一个ArrayList集合时，程序需要手动保证该集合的同步性，而Vector则是线程安全的。

1. ArrayList和Collection的关系：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319797.jpg)

# 2、ArrayList的数据结构

分析一个类的时候，数据结构往往是它的灵魂所在，理解底层的数据结构其实就理解了该类的实现思路，具体的实现细节再具体分析。

ArrayList的数据结构是：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319798.jpg)

说明：底层的数据结构就是数组，数组元素类型为Object类型，即可以存放所有类型数据。我们对ArrayList类的实例的所有的操作底层都是基于数组的。

# 3、ArrayList源码分析

# 1、继承结构和层次关系

IDEA快捷键：Ctrl+H

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319799.jpg)

```java
1 public class ArrayList<E> extends AbstractList<E>
2 implements List<E>, RandomAccess, Cloneable, java.io.Serializable{3 }
4 }
```

我们看一下ArrayList的继承结构：

ArrayList extends AbstractList

AbstractList extends AbstractCollection

所有类都继承Object 所以ArrayList的继承结构就是上图这样。

# 【分析】

1. 为什么要先继承AbstractList，而让AbstractList先实现List？而不是让ArrayList直接实现List？

这里是有一个思想，接口中全都是抽象的方法，而抽象类中可以有抽象方法，还可以有具体的实现方法，正是利用了这一点，让AbstractList是实现接口中一些通用的方法，而具体的类，如ArrayList就继承这个AbstractList类，拿到一些通用的方法，然后自己在实现一些自己特有的方法，这样一来，让代码更简洁，就继承结构最底层的类中通用的方法都抽取出来，先一起实现了，减少重复代码。所以一般看到一个类上面还有一个抽象类，应该就是这个作用。

1. ArrayList实现了哪些接口？

List接口：我们会出现这样一个疑问，在查看了ArrayList的父类AbstractList也实现了List接口，那为什么子类ArrayList还是去实现一遍呢？

这是想不通的地方，所以我就去查资料，有的人说是为了查看代码方便，使观看者一目了然，说法不一，但每一个让我感觉合理的，但是在stackOverFlow中找到了答案，这里其实很有趣。

开发这个collection的作者Josh说：

狂神社群笔记资料，禁止外传，本人QQ：24736743

这其实是一个mistake[失误]，因为他写这代码的时候觉得这个会有用处，但是其实并没什么用，但因为没什么影响，就一直留到了现在。

RandomAccess接口：这个是一个标记性接口，通过查看api文档，它的作用就是用来快速随机存取，有关效率的问题，在实现了该接口的话，那么使用普通的for循环来遍历，性能更高，例如ArrayList。而没有实现该接口的话，使用Iterator来迭代，这样性能更高，例如LinkedList。所以这个标记性只是为了让我们知道我们用什么样的方式去获取数据性能更好。

Cloneable接口：实现了该接口，就可以使用Object Clone()方法了。

Serializable接口：实现该序列化接口，表明该类可以被序列化，什么是序列化？简单的说，就是能够从类变成字节流传输，然后还能从字节流变成原来的类。

# 2、类中的属性

```java
public class ArrayListE> extends AbstractListE> implements ListE>, RandomAccess, Cloneable, java.io.Serializable   
{ //版本号 private static final long serialversionUID  $=$  8683452581122892189L; //缺省容量 private static final int DEFAULT_CAPACITY  $= 10$  ： //空对象数组 private static final Object[] EMPTY_elementDATA  $\equiv$  {； //缺省空对象数组 private static final Object[] DEFAULTCAPACITYEMPTY-elementDATA  $\equiv$  {； //元素数组 transient object[] elementData; //实际元素大小，默认为0 private int size; //最大数组容量 private static final int MAX_ARRAY_SIZE  $\equiv$  Integer.MAX_VALUE-8; }
```

# 3、构造方法

通过IDEA查看源码，看到ArrayList有三个构造方法：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319800.jpg)

1. 无参构造方法

1. 有参构造方法 1

```txt
/* Constructs an empty list with an initial capacity of ten. 这里就说明了默认会给10的大小，所以说一开始ArrayList的容量是10. */
// ArrayList中储存数据的其实就是一个数组，这个数组就是elementData. public ArrayList() {
    super(); //调用父类中的无参构造方法，父类中的是个空的构造方法
    this.elementData = EMPTY_elementDATA;
    //EMPTY_elementDATA：是个空的对象[]，将data初始化，data也是个object[]类型。空的对象[]会给默认大小10，等会不会解释什么时候赋值的。
}
```

1. 有参构造方法2

```txt
/* 
Constructs an empty list with the specified initial capacity. 
构造具有指定初始容量的空列表。 
@param initialCapacity the initial capacity of the list 
初始容量列表的初始容量 
@throws.IllegalArgumentException if the specified initial capacity is negative 
如果指定的初始容量为负，则为IllegalArgumentException 
*/ 
public ArrayList(int initialCapacity) { 
    if (initialCapacity > 0) { 
        //将自定义的容量大小当成初始化 initialCapacity 的大小 
        this.elementData = new Object[initialCapacity]; 
    } else if (initialCapacity == 0) { 
        this.elementData = EMPTY(ElementDATA; //等同于无参构造方法 
    } else { 
        //判断如果自定义大小的容量小于0，则报下面这个非法数据异常 
        throw new IllegalArgumentException("Illegal Capacity: "+initialCapacity); 
    } 
}
```

```java
/* 
Constructs a list containing the elements of the specified collection, in the order they are returned by the collection's iterator. 
按照集合迭代器返回元素的顺序构造包含指定集合的元素的列表。 
@param c the collection whose elements are to be placed into this list 
@throws NullPointerException if the specified collection is null */ 
public ArrayList(Collection<? extends E> c) { 
    elementData = c.toArray(); //转换为数组 
//每个集合的ToArray()的实现方法不一样，所以需要判断一下，如果不是Object[].class类型，那么久需要使用ArrayList中的方法去改造一下。 
if ((size = elementData.length) != 0) { 
    // c.toArray might (incorrectly) not return object[] (see 6260652) 
    if (elementData.getClass() != object[].class) 
    elementData = Arrays.copyOf.elementData, size, object[].class); 
} else {
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

```txt
16 // replace with empty array.  
17 this.elementData = EMPTY_elementDATA;  
18 }  
19 }
```

这个构造方法不常用，举个例子就能明白什么意思

举个例子：Student exends
Person，ArrayList、Person这里就是泛型，我还有一个Collection、由于这个Student继承了Person，那么根据这个构造方法，我就可以把这个Collection转换为ArrayList，这就是这个构造方法的作用。

【总结】ArrayList的构造方法就做一件事情，就是初始化一下储存数据的容器，其实本质上就是一个数组，在其中就叫elementData。

# 4、核心方法-add

# 1. boolean add(E)

```java
1 /* 
2 * Appends the specified element to the end of this list.
3 * 添加一个特定的元素到list的末尾。
4 * @param e element to be appended to this list
5 * @return <tt>true</tt> (as specified by {@link Collection#add})
6 */
7 public boolean add(E e) {
8 //确定内部容量是否够了，size是数组中数据的个数，因为要添加一个元素，所以size+1，先判断size+1的这个个数数组能否放得下，就在这个方法中去判断是否数组.length是否够用了。
9 ensureCapacityInternal(size + 1); // Increments modCount!!
10 elementData[size++] = e; //在数据中正确的位置上放上元素e，并且size++
11 return true;
12 }
```

【分析：ensureCapacityInternal(xxx); 确定内部容量的方法】

```java
private void ensureCapacityInternal(int minCapacity) { ensureExplicitCapacity(calculateCapacity.elementData, minCapacity));   
}   
private static int calculateCapacity(Object[] elementData, int minCapacity) { //看，判断初始化的elementData是不是空的数组，也就是没有长度 if (elementData == DEFAULTCAPACITY_empty_elementDATA) { //因为如果是空的话，minCapacity=size+1；其实就是等于1，空的数组没有长度就存放不了，所以就将minCapacity变成10，也就是默认大小，但是在这里，还没有真正的初始化这个 elementData的大小。 return Math.max(DEFAULT_CAPACITY, minCapacity); } //确认实际的容量，上面只是将minCapacity=10，这个方法就是真正的判断elementData是否够用 return minCapacity;   
}   
private void ensureExplicitCapacity(int minCapacity) { modCount++;   
//overflow-conscious code
```

```txt
//minCapacity如果大于了实际elementData的长度，那么就说明elementData数组的长度不够用，不够用那么就要增加elementData的length。这里有的同学就会模糊minCapacity到底是什么呢，这里给你们分析一下  
/*第一种情况：由于elementData初始化时是空的数组，那么第一次add的时候，minCapacity  $=$  size+1；也就minCapacity  $\coloneqq 1$  ，在上一个方法(确定内部容量ensureCapacityInternal)就会判断出是空的数组，就会给将minCapacity  $\coloneqq 10$  ，到这一步为止，还没有改变elementData的大小。第二种情况：elementData不是空的数组了，那么在add的时候，minCapacity  $\coloneqq$  size+1；也就是minCapacity代表着elementData中增加之后的实际数据个数，拿着它判断elementData的length是否够用，如果length不够用，那么肯定要扩大容量，不然增加的这个元素就会溢出。\*/if(minCapacity-elementData.length>0) grow(minCapacity);  
}  
//ArrayList核心的方法，能扩展数组大小的真正秘密。  
private void grow(int minCapacity){//overflow-conscious code  
//将扩充前的elementData大小给oldCapacityint oldCapacity  $\equiv$  elementData.length;  
//newCapacity就是1.5倍的oldCapacityint newCapacity  $\equiv$  oldCapacity  $^+$  (oldCapacity>>1);  
//这句话就是适应于elementData就空数组的时候，length=0，那么oldCapacity=0,newCapacity=0，所以这个判断成立，在这里就是真正的初始化elementData的大小了，就是为10.前面的工作都是准备工作。if(newCapacity-minCapacity<0)newCapacity  $\equiv$  minCapacity;  
//如果newCapacity超过了最大的容量限制，就调用hugeCapacity，也就是将能给的最大值给newCapacityif(newCapacity-MAX_ARRAY_SIZE>0)newCapacity  $\equiv$  hugeCapacity(minCapacity);//minCapacityisusuallyclose to size,so thisisa win://新的容量大小已经确定好了，就copy数组，改变容量大小咯。elementData  $\equiv$  Arrays.copyof.elementData,newCapacity);  
}  
//这个就是上面用到的方法，很简单，就是用来赋最大值。private static int hugeCapacity(int minCapacity){if(minCapacity<0)//overflowthrow new OutOfMemoryError();  
//如果minCapacity都大于MAX_ARRAY_SIZE，那么就Integer.MAX_VALUE返回，反之将MAX_ARRAY_SIZE返回。因为maxCapacity是三倍的minCapacity，可能扩充的太大了，就用minCapacity来判断了。  
//Integer.MAX_VALUE:2147483647 MAX_ARRAY_SIZE:2147483639也就是说最大也就能给到第一个数值。还是超过了这个限制，就要溢出了。相当于arraylist给了两层防护。return(minCapacity  $\rightharpoondown$  MAX_ARRAY_SIZE)?Integer.MAX_VALUE :MAX_ARRAY_SIZE;
```

# 1.void add(int,E)

```txt
public void add(int index, E element) {
    //检查index也就是插入的位置是否合理。
    rangeCheckForAdd(index);
    ensureCapacityInternal(size + 1); // Increments modCount!!
    //这个方法就是用来在插入元素之后，要将index之后的元素都往后移一位，
        System.arraycopyelementData, index, elementData, index + 1,
        size - index);
    //在目标位置上存放元素
        elementData[index] = element;
        size++;
}
```

# 【分析：rangeCheckForAdd(index)】

```txt
1 private void rangeCheckForAdd(int index) {
2 //插入的位置肯定不能大于size和小于0
3 if (index > size || index < 0)
4 //如果是，就报这个越界异常
5 throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
6 }
```

# 【System.arraycopy(...): 就是将elementData在插入位置后的所有元素，往后面移一位.】

```txt
public static void arraycopy(object src, int srcPos, Object dest, int destPos, int length)   
src:源对象   
srcPos：源对象对象的起始位置   
dest:目标对象   
destPost：目标对象的起始位置   
length：从起始位置往后复制的长度。   
//这段的大概意思就是解释这个方法的用法，复制src到dest，复制的位置是从src的srcPost开始， 到srcPost+length-1的位置结束，复制到destPost上，从destPost开始到destPost+length-1 的位置上，   
Copies an array from the specified source array, beginning at the specified position,to the specified position of the destination array.A subsequence of array components are copied from   
the source array referenced by src to the destination array referenced by dest.The number of components copied is equal to the length argument.The components at positions srcPos through srcPos+length-1   
in the source array are copied into positions destPos through destPos+length-1,respectively,of the destination array.   
//告诉你复制的一种情况，如果A和B是一样的，那么先将A复制到临时数组C，然后通过C复制到B，用了一 一个第三方参数   
If the src and dest arguments refer to the same array object, then the copying is performed as if the components at positions srcPos through srcPos+length-1 were first copied to
```

<table><tr><td colspan="2">a temporary array with length components and then the contents of the temporary array were copied into positions destPos through destPos+length-1 of the destination array.</td></tr><tr><td colspan="2">//这一大段，就是来说明会出现的一些问题，NullPointerException和IndexOutOfBoundsException 还有ArrayStoreException 这三个异常出现的原因。</td></tr><tr><td colspan="2">If dest is null, then a NullPointerException is thrown.</td></tr><tr><td colspan="2">If src is null, then a NullPointerException is thrown and the destination array is not modified.</td></tr><tr><td colspan="2">Otherwise, if any of the following is true, an ArrayStoreException is thrown and the destination is not modified:</td></tr><tr><td colspan="2">The src argument refers to an object that is not an array.</td></tr><tr><td colspan="2">The dest argument refers to an object that is not an array.</td></tr><tr><td colspan="2">The src argument and dest argument refer to arrays whose component types are different primitive types.</td></tr><tr><td colspan="2">The src argument refers to an array with a primitive component type and the dest argument refers to an array with a reference component type.</td></tr><tr><td colspan="2">The src argument refers to an array with a reference component type and the dest argument refers to an array with a primitive component type.</td></tr><tr><td colspan="2">Otherwise, if any of the following is true, an IndexOutOfBoundsException is thrown and the destination is not modified:</td></tr><tr><td colspan="2">The srcPos argument is negative.</td></tr><tr><td colspan="2">The destPos argument is negative.</td></tr><tr><td colspan="2">The length argument is negative.</td></tr><tr><td colspan="2">srcPos+length is greater than src.length, the length of the source array.</td></tr><tr><td colspan="2">destPos+length is greater than dest.length, the length of the destination array.</td></tr><tr><td colspan="2">//这里描述了一种特殊的情况，就是当A的长度大于B的长度的时候，会复制一部分，而不是完全失败。</td></tr><tr><td colspan="2">Otherwise, if any actual component of the source array from position srcPos through srcPos+length-1 cannot be converted to the component type of the destination array by assignment conversion, an ArrayStoreException is thrown.</td></tr><tr><td colspan="2">In this case, let k be the smallest nonnegative integer less than length such that src[srcPos+k] cannot be converted to the component type of the destination array; when the exception is thrown, source array components from positions srcPos through srcPos+k-1 will already have been copied to destination array positions destPos through destPos+k-1 and no other positions of the destination array will have been modified. (Because of the restrictions already itemized,</td></tr><tr><td colspan="2">this paragraph effectively applies only to the situation where both arrays have component types that are reference types.)</td></tr><tr><td colspan="2">//这个参数列表的解释，一开始就说了，</td></tr><tr><td colspan="2">Parameters:</td></tr><tr><td colspan="2">src - the source array.</td></tr><tr><td colspan="2">srcPos - starting position in the source array.</td></tr><tr><td colspan="2">dest - the destination array.</td></tr><tr><td colspan="2">destPos - starting position in the destination data.</td></tr><tr><td colspan="2">length - the number of array elements to be copied.</td></tr></table>

# 【总结】

正常情况下会扩容1.5倍，特殊情况下（新扩展数组大小已经达到了最大值）则只取最大值。

当我们调用add方法时，实际上的函数调用如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319801.jpg)

说明：程序调用add，实际上还会进行一系列调用，可能会调用到grow，grow可能会调用hugeCapacity。

# 【举例】

```txt
1 ListInteger> lists  $=$  new ArrayList<Integer>; 2 lists.add(8);
```

说明：初始化lists大小为0，调用的ArrayList()型构造函数，那么在调用lists.add(8)
方法时，会经过怎样的步骤呢？下图给出了该程序执行过程和最初与最后的elementData的大小。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319802.jpg)  
[

说明：我们可以看到，在add方法之前开始elementData = {}; 调用add方法时会继续调用，直至
grow，最后elementData的大小变为10，之后再返回到add函数，把8放在elementData[0]中。

# 【举例说明二】

```dart
1 List<String> lists = new ArrayList<String>(6);  
2 lists.add(8);
```

说明：调用的ArrayList(int)型构造函数，那么elementData被初始化为大小为6的Object数组，在调用add(8)方法时，具体的步骤如下：

说明：我们可以知道，在调用add方法之前，elementData的大小已经为6，之后再进行传递，不会进行扩容处理。

# 5、核心方法-remove

其实这几个删除方法都是类似的。我们选择几个讲，其中fastRemove(int)方法是private的，是提供给remove(Object)这个方法用的。

1. remove(int): 通过删除指定位置上的元素

```txt
public E remove(int index) { rangeCheck(index);//检查index的合理性 modCount++; //这个作用很多，比如用来检测快速失败的一种标志。 E oldValue  $=$  elementData(index);//通过索引直接找到该元素 int numMoved  $=$  size - index - 1;//计算要移动的位数。 if (numMoved >0) //这个方法也已经解释过了，就是用来移动元素的。
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

```txt
System.arraycopyelementData,index+1, elementData,index numMoved);   
12 //将--size上的位置赋值为null，让gc(垃圾回收机制)更快的回收它。   
13 elementData[-size]  $=$  null; //clear to let GC do its work   
14 //返回删除的元素。   
15 return oldvalue;   
16 }
```

1. remove(Object): 这个方法可以看出来, ArrayList是可以存放null值得。

```txt
//感觉这个不怎么要分析吧，都看得懂，就是通过元素来删除该元素，就依次遍历，如果有这个元素， 就将该元素的索引传给fastRemove(index)，使用这个方法来删除该元素，   
//fastRemove(index)方法的内部跟remove(index)的实现几乎一样，这里最主要是知道   
arrayList可以存储null值   
public boolean remove(Object o){ if  $(\mathrm{o} = = \mathrm{null})$  { for (int index  $= 0$  ; index  $<$  size; index++) if (elementData[index]  $= =$  null）{ fastRemove(index); return true; } } else{ for (int index  $= 0$  ; index  $<$  size; index++) if (o.equals.elementData[index])){ fastRemove(index); return true; } } return false;   
16
```

1. clear(): 将elementData中每个元素都赋值为null，等待垃圾回收将这个给回收掉，所以叫clear

```txt
1 public void clear() {   
2 modCount++;   
3   
4 // clear to let GC do its work   
5 for (int i = 0; i < size; i++)   
6 elementData[i] = null;   
7   
8 size = 0;   
9 }
```

1. removeAll(collection c)

```java
public boolean removeAll(Collection<?> c) { return batchRemove(c, false); //批量删除 }
```

1. batchRemove(xx,xx): 用于两个方法，一个removeAll(): 它只清楚指定集合中的元素，retainAll()用来测试两个集合是否有交集。

```javascript
//这个方法，用于两处地方，如果complement为false，则用于removeAll如果为true，则给  
retainAll()用，retainAll（）是用来检测两个集合是否有交集的。  
private boolean batchRemove(Collection<?> c,boolean complement){final object[] elementData  $=$  this.elementData; //将原集合，记名为Aint  $\mathsf{r} = 0$  w=0:/r用来控制循环，w是记录有多少个交集
```

```javascript
boolean modified  $=$  false; try{ for  $(r <   size;r + + )$  //参数中的集合C一次检测集合A中的元素是否有， if(c.contains elementData[r])  $= =$  complement) //有的话，就给集合A elementData[w++]  $=$  elementData[r]; }finally{ //PreservebehavioralcompatibilitywithAbstractCollection, //evenifc.contains()throws. //如果contains方法使用过程报异常 if(r != size){ //将剩下的元素都赋值给集合A, System.arraycopyelementData,r, elementData,w, size-r); w+=size-r; 1 if(w!=size）{ //这里有两个用途，在removeAll()时，w一直为0，就直接跟clear一样，全是为 null。 //retainAll():没有一个交集返回true，有交集但不全交也返回true，而两个集合 相等的时候，返回false，所以不能根据返回值来确认两个集合是否有交集，而是通过原集合的大小是否 发生改变来判断，如果原集合中还有元素，则代表有交集，而元集合没有元素了，说明两个集合没有交 集。 //clear to let GC do its work for(inti=w;i<size;i++) elementData[i]=null; modCount  $+ =$  size-w; size=w; modified  $=$  true; } } return modified;
```

总结：remove函数，用户移除指定下标的元素，此时会把指定下标到数组末尾的元素向前移动一个单位，并且会把数组最后一个元素设置为null，这样是为了方便之后将整个数组不被使用时，会被GC，可以作为小的技巧使用。

# 6、其他方法

【set()方法】

说明：设定指定下标索引的元素值

```txt
1 public E set(int index, E element) {  
2 // 检验索引是否合法  
3 rangeCheck(index);  
4 // 旧值  
5 E oldValue = elementData(index);  
6 // 赋新值  
7 elementData[index] = element;  
8 // 返回旧值  
9 return oldValue;  
10 }
```

【indexOf()方法】

说明：从头开始查找与指定元素相等的元素，注意，是可以查找null元素的，意味着ArrayList中可以存放null元素的。与此函数对应的lastIndexOf，表示从尾部开始查找。

```txt
// 从首开始查找数组里面是否存在指定元素
public int indexof(object o) {
    if (o == null) { // 查找的元素为空
        for (int i = 0; i < size; i++) // 遍历数组，找到第一个为空的元素，返回下标
            if (elementData[i] == null)
                return i;
        } else { // 查找的元素不为空
            for (int i = 0; i < size; i++) // 遍历数组，找到第一个和指定元素相等的元素，返回下标
                if (o.equals.elementData[i]))
                    return i;
            }
        // 没有找到，返回空
        return -1;
}
```

# 【get()方法】

```txt
1 public E get(int index) {  
2 // 检验索引是否合法  
3 rangeCheck(index);  
4 return elementData(index);  
5 return elementData(index);  
6 }
```

说明：get函数会检查索引值是否合法（只检查是否大于size，而没有检查是否小于0），值得注意的是，在get函数中存在element函数，element函数用于返回具体的元素，具体函数如下：

```txt
1 E elementData(int index) {  
2 return (E) elementData[index];  
3 }
```

说明：返回的值都经过了向下转型（Object -> E），这些是对我们应用程序屏蔽的小细节。

# 4、总结

1）ArrayList可以存放null。  
2）ArrayList本质上就是一个elementData数组。  
3）ArrayList区别于数组的地方在于能够自动扩展大小，其中关键的方法就是gorw()方法。  
4）ArrayList中removeAll(collection c)和clear()的区别就是removeAll可以删除批量指定的元素，而clear是全是删除集合中的元素。  
5）ArrayList由于本质是数组，所以它在数据的查询方面会很快，而在插入删除这些方面，性能下降很多，有移动很多数据才能达到应有的效果

6) ArrayList实现了RandomAccess，所以在遍历它的时候推荐使用for循环。

# LinkedList实践

# 1、引入

问题：在集合的任何位置（头部，中间，尾部）添加，获取，删除狗狗对象！

分析：

插入，删除操作频繁时，可使用LinkedList来提高效率。

LinkedList提供对头部和尾部元素进行添加和删除操作的方法！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319803.jpg)

【LinkedList的特殊方法】

<table><tr><td>方法名</td><td>说 明</td></tr><tr><td>void addFirst(Object o)</td><td>在列表的首部添加元素</td></tr><tr><td>void addLast(Object o)</td><td>在列表的末尾添加元素</td></tr><tr><td>Object getFirst()</td><td>返回列表中的第一个元素</td></tr><tr><td>Object getLast()</td><td>返回列表中的最后一个元素</td></tr><tr><td>Object removeFirst()</td><td>删除并返回列表中的第一个元素</td></tr><tr><td>Object removeLast()</td><td>删除并返回列表中的最后一个元素</td></tr></table>

【小结】

集合框架有何好处？

Java集合框架中包含哪些接口和类？

ArrayList和LinkedList有何异同？

# 2、LinkedList源码分析

前面我们分析了ArrayList的源码，这一章是LinkedList。我们都知道它的底层是由链表实现的，所以我们要明白什么是链表？

# 1、LinkedList概述

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319804.jpg)

LinkedList是一种可以在任何位置进行高效地插入和移除操作的有序序列，它是基于双向链表实现的。

LinkedList 是一个继承于 AbstractSequentialList 的双向链表。它也可以被当作堆栈、队列或双端队列进行操作。

LinkedList 实现 List 接口，能对它进行队列操作。

LinkedList 实现 Deque 接口，即能将LinkedList当作双端队列使用。

LinkedList 实现了Cloneable接口，即覆盖了函数clone()，能克隆。

LinkedList 实现java.io.Serializable接口，这意味着LinkedList支持序列化，能通过序列化去传输。

LinkedList是非同步的。

# 2、LinkedList的数据结构

【基础知识补充】

# 单向链表：

element: 用来存放元素

next: 用来指向下一个节点元素

通过每个结点的指针指向下一个结点从而链接起来的结构，最后一个节点的next指向null。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319805.jpg)

# 单向循环链表：

element、next 跟前面一样

在单向链表的最后一个节点的next会指向头节点，而不是指向null，这样存成一个环

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319806.jpg)

# 双向链表：

element: 存放元素

pre: 用来指向前一个元素

next: 指向后一个元素

双向链表是包含两个指针的，pre指向前一个节点，next指向后一个节点，但是第一个节点head的pre指向null，最后一个节点的tail指向null。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319807.jpg)

# 双向循环链表：

element、pre、next跟前面的一样

第一个节点的pre指向最后一个节点，最后一个节点的next指向第一个节点，也形成一个“环”。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319808.jpg)

【LinkedList的数据结构】

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319809.jpg)

如上图所示，LinkedList底层使用的双向链表结构，有一个头结点和一个尾结点，双向链表意味着我们可以从头开始正向遍历，或者是从尾开始逆向遍历，并且可以针对头部和尾部进行相应的操作。

# 3、LinkedList的特性

在我们平常中，我们只知道一些常识性的特点：

# 1）是通过链表实现的

2）如果在频繁的插入，或者删除数据时，就用linksList性能会更好。

# 那我们通过API去查看它的一些特性

1) Doubly-linked list implementation of the `List` and `Deque` interfaces. Implements all optional list operations, and
   permits all elements (including `null`).

2这告诉我们，LinkedList是一个双向链表，并且实现了List和Deque接口中所有的列表操作，并且能存储任何元素，包括null，这里我们可以知道LinkedList除了可以当链表使用，还可以当作队列使用，并能进行相应的操作。  
4 2) All of the operations perform as could be expected for a doubly-linked list. Operations that index into the list
will traverse the list from the beginning or the end, whichever is closer to the specified index.  
7
这个告诉我们，LinkedList在执行任何操作的时候，都必须先遍历此列表来靠近通过index查找我们所需要的的值。通俗点讲，这就告诉了我们这个是顺序存取，每次操作必须先按开始到结束的顺序遍历，随机存取，就是ArrayList，能够通过index。随便访问其中的任意位置的数据，这就是随机列表的意思。

3）api中接下来讲的一大堆，就是说明listed是一个非线程安全的(异步)，其中在操作Interner时，如果改变列表结构(adddelete等)
，会发生fail-fast。

通过API再次总结一下LinkedList的特性：

1）异步，也就是非线程安全  
2）双向链表。由于实现了list和Deque接口，能够当作队列来使用。

链表：查询效率不高，但是插入和删除这种操作性能好。

3）是顺序存取结构（注意和随机存取结构两个概念搞清楚）

# 4、继承结构以及层次关系

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319810.jpg)

# 【分析】

我们可以看到，LinkedList在最底层，说明他的功能最为强大，并且细心的还会发现，ArrayList有四层，这里多了一层AbstractSequentialList的抽象类，为什么呢？

通过API我们会发现：

1）减少实现顺序存取（例如LinkedList）这种类的工作，通俗的讲就是方便，抽象出类似LinkedList这三种类的一些共同的方法

狂神社群笔记资料，禁止外传，本人QQ：24736743

2）既然有了上面这句话，那么以后如果自己想实现顺序存取这种特性的类(就是链表形式)
，那么就继承这个AbstractSequentialList抽象类，如果想像数组那样的随机存取的类，那么就去实现AbstractList抽象类。  
3）这样的分层，就很符合我们抽象的概念，越在高处的类，就越抽象，往在底层的类，就越有自己独特的个性。自己要慢慢领会这种思想。  
4）LinkedList的类继承结构很有意思，我们着重要看是Deque接口，Deque接口表示是一个双端队列，那么也意味着LinkedList是双端队列的一种实现，所以，基于双端队列的操作在LinkedList中全部有效。

```txt
public abstract class AbstractSequentialListE>   
extends AbstractListE>   
//这里第一段就解释了这个类的作用，这个类为实现list接口提供了一些重要的方法，   
//尽最大努力去减少实现这个“顺序存取”的特性的数据存储(例如链表)的什么鬼，对于   
//随机存取数据(例如数组)的类应该优先使用AbstractList   
//从上面就可以大概知道，AbstractSwsequentialList这个类是为了减少LinkedList这种顺序存取 的类的代码复杂度而抽象的一个类，   
This class provides a skeletal implementation of the List interface to minimize the effort required to implement this interface backed by a "sequential access" data store (such as a linked list). For random access data (such as an array), AbstractList should be used in preference to this class.   
//这一段大概讲的就是这个AbstractSequentialList这个类和AbstractList这个类是完全//相反 的。比如get、add这个方法的实现   
This class is the opposite of the AbstractList class in the sense that it implements the "random access" methods (get(int index), set(int index, E element), add(int index, E element) and remove(int index)) on top of the list's list iterator, instead of the other way around.   
//这里就是讲一些我们自己要继承该类，该做些什么事情，一些规范。   
To implement a list the programmer needs only to extend this class and provide implementations for the listIterator and size methods. For an unmodifiable list, the programmer need only implement the list iterator's hasNext, next, hasPrevious, previous and index methods.   
For a modifiable list the programmer should additionally implement the list iterator's set method. For a variable-size list the programmer should additionally implement the list iterator's remove and add methods.   
The programmer should generally provide a void (no argument) and collection constructor, as per the recommendation in the collection interface specification.
```

# 【接口实现分析】

```java
1 public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, java.io.Serializable {
5 }
```

(1) List接口: 列表, add、set、等一些对列表进行操作的方法  
2）Deque接口：有队列的各种特性，

狂神社群笔记资料，禁止外传，本人QQ：24736743

3）Cloneable接口：能够复制，使用那个copy方法。  
4）Serializable接口：能够序列化。  
5）应该注意到没有RandomAccess：那么就推荐使用iterator，在其中就有一个foreach，增强的for循环，其中原理也就是iterator，我们在使用的时候，使用foreach或者iterator都可以。

# 5、类的属性

```java
public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, java.io.Serializable {
    // 实际元素个数
    transient int size = 0;
    // 头结点
    transient Node<E> first;
    // 尾结点
    transient Node<E> last;
}
```

LinkedList的属性非常简单，一个头结点、一个尾结点、一个表示链表中实际元素个数的变量。注意，头结点、尾结点都有transient关键字修饰，这也意味着在序列化时该域是不会序列化的。

# 6、构造方法

两个构造方法(两个构造方法都是规范规定需要写的)

【空参构造函数】

```java
1 publicLinkedList() { 2 }
```

【有参构造函数】

```txt
//将集合c中的各个元素构建成LinkedList链表。  
public LinkedList(Collection<? extends E> c) {  
    // 调用无参构造函数  
    this();  
    // 添加集合中所有的元素  
    addAll(c);  
}
```

说明：会调用无参构造函数，并且会把集合中所有的元素添加到LinkedList中。

# 7、内部类 (Node)

```txt
//根据前面介绍双向链表就知道这个代表什么了，LinkedList的奥秘就在这里。  
private static class Node<E> {  
    E item; //数据域（当前节点的值）  
    Node<E> next; //后继（指向当前一个节点的后一个节点）  
    Node<E> prev; //前驱（指向当前节点的前一个节点）  
}
```

说明：内部类Node就是实际的结点，用于存放实际元素的地方。

# 8、核心方法

# 1、【add()方法】

```txt
1 public boolean add(E e) {
2 // 添加到末尾
3 linkLast(e);
4 return true;
5 }
```

说明：add函数用于向LinkedList中添加一个元素，并且添加到链表尾部。具体添加到尾部的逻辑是由linkLast函数完成的。

【LinkLast(XXXXXXXX)】

```txt
1 /* 
2 * Links e as last element. 
3 */
4 void linkLast(E e) {
5     final Node<E> l = last; //临时节点l(L的小写)保存last，也就是l指向了最后一个节点
6     final Node<E> newNode = newNode<>l, e, null); //将e封装为节点，并且e prevailed指向了最后一个节点
7     last = newNode; // newNode成为了最后一个节点，所以last指向了它
8     if (l == null) //判断是不是一开始链表中就什么都没有，如果没有，则 newNode就成为了第一个节点，first和last都要指向它
9     first = newNode;
10     else //正常的在最后一个节点后追加，那么原先的最后一个节点的next就要指向现在真正的最后一个节点，原先的最后一个节点就变成了倒数第二个节点
11     l.next = newNode;
12     size++; //添加一个节点，size自增
13     modCount++;
14 }
```

说明：对于添加一个元素至链表中会调用add方法 -> linkLast方法。

【举例一】

```javascript
1 ListInteger> lists  $=$  newLinkedListInteger();   
2 lists.add(5);   
3 lists.add(6);
```

首先调用无参构造函数，之后添加元素5，之后再添加元素6。具体的示意图如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319811.jpg)

上图的表明了在执行每一条语句后，链表对应的状态。

# 2、【addAll方法】

addAll有两个重载函数，addAll(Collection<? extends E>)型和addAll(int, Collection<? extends E>)型，我们平时习惯调用的addAll(
Collection<? extends E>)型会转化为addAll(int, Collection<? extends E>)型。

```txt
public boolean addAll(Collection<? extends E> c) { //继续往下看 return addAll(size, c); }
```

addAll(size, c): 这个方法，能包含三种情况下的添加，我们这里分析的只是构造方法，空链表的情况，看的时候只需要按照不同的情况分析下去就行了。

```txt
//真正核心的地方就是这里了，记得我们传过来的是size，c  
public boolean addAll(int index, Collection<? extends E> c) {  
//检查index这个是否为合理。这个很简单，自己点进去看下就明白了。  
checkPositionIndex(index);  
//将集合c转换为Object数组a  
object[] a = c.toArray();  
//数组a的长度numNew，也就是由多少个元素  
int numNew = a.length;  
if (numNew == 0)  
//集合c是个空的，直接返回false，什么也不做。  
return false;  
//集合c是非空的，定义两个节点(内部类)，每个节点都有三个属性，item、next、prev。注意：不要管这两个什么含义，就是用来做临时存储节点的。这个Node看下面一步的源码分析，Node就是LinkedList的最核心的实现，可以直接先跳下一个去看Node的分析  
Node<E> pred, succ;  
//构造方法中传过来的就是index==size  
if (index == size) {  
//LinkedList中三个属性：size、first、last。size：链表中的元素个数。  
first: 头节点 last：尾节点，就两种情况能进来这里
```

```javascript
//情况一、：构造方法创建的一个空的链表，那么size=0，last、和first都为null。  
LinkedList中是空的。什么节点都没有。succ=false、pred=false;  
//情况二、：链表中有节点，size就不是为0，first和last都分别指向第一个节点，和最后一个节点，在最后一个节点之后追加元素，就得记录一下最后一个节点是什么，所以把last保存到pred临时节点中。succ=false；pred=false;  
} else{  
//情况三、index!=size，说明不是前面两种情况，而是在链表中间插入元素，那么就得道index上的节点是谁，保存到succ临时节点中，然后将succ的前一个节点保存到pred中，这样保存了这两个节点，就能够准确的插入节点了  
//举个简单的例子，有2个位置，1、2、如果想插数据到第二个位置，双向链表中，就需要道第一个位置是谁，原位置也就是第二个位置上是谁，然后才能将自己插到第二个位置上。如果这里还明白，先看一下文章开头对于各种链表的删除，add操作是怎么实现的。succ node(index);predsucc prev;  
}  
//前面的准备工作做完了，将遍历数组a中的元素，封装为一个个节点。for (object o : a) {@SuppressWarnings("unchecked") E e = (E) o;//pred就是之前所构建好的，可能为null、也可能不为null，为null的话就是属于情况一、不为null则可能是情况二、或者情况三Node>E newNode=new Node<(pred,e,null);//如果pred==null，说明是情况一，构造方法，是刚创建的一个空链表，此时的newNode就当作第一个节点，所以把newNode给first头节点if (pred==null) first=newNode;else//如果pred!=null，说明可能是情况2或者情况3，如果是情况2，pred就是last，那么在最后一个节点之后追加到newNode，如果是情况3，在中间插入，pred为原index节点之前的一个节点，将它的next指向插入的节点，也是对的pred.next=newNode;//然后将pred换成newNode，注意，这个不在else之中，请看清楚了。pred=newNode;}if(succ==null){/*如果succ==null，说明是情况一或者情况二，情况一、构造方法，也就是刚创建的一个空链表，pred已经是newNode了，last=newNode，所以LinkedList的first、last都指向第一个节点。情况二、在最后节后之后追加节点，那么原先的last就应该指向现在的最后一个节点了，就是newNode.*/last=pred;}else{//如果succ!=null，说明可能是情况三、在中间插入节点，举例说明这几个参数的意义，有1、2两个节点，现在想在第二个位置插入节点newNode，根据前面的代码，pred=newNode,succ=2，并且1.next=newNode，已经构建好了，pred.next=succ，相当于在newNode.next=2；succ.next=pred,相当于2.next=neWnode，这样一来，这种指向关系就完成了。first和last不用变，因为头节点和尾节点没变pred.next=succ;//。。succprev=pred;  
}  
//增加了几个元素，就把size=size+numNew就可以了size+=numNew;modCount++;return true;
```

58}

说明：参数中的index表示在索引下标为index的结点（实际上是第index + 1个结点）的前面插入。

在addAll函数中，addAll函数中还会调用到node函数，get函数也会调用到node函数，此函数是根据索引下标找到该结点并返回，具体代码如下：

```txt
1 Node<E> node(int index) { //判断插入的位置在链表前半段或者是后半段 if(index < (size >> 1)) { //插入位置在前半段 Node<E> x = first; for (int i = 0; i < index; i++) //从头结点开始正向遍历 x = x.next; return x; //返回该结点 } else { //插入位置在后半段 Node<E> x = last; for (int i = size - 1; i > index; i--) //从尾结点开始反向遍历 x = xprev; return x; //返回该结点 } }
```

说明：在根据索引查找结点时，会有一个小优化，结点在前半段则从头开始遍历，在后半段则从尾开始遍历，这样就保证了只需要遍历最多一半结点就可以找到指定索引的结点。

举例说明调用addAll函数后的链表状态：

```txt
1 List<Integer> lists = new ArrayList<Integer>();  
2 lists.add(5);  
3 lists.addAll(0, Arrays.asList(2, 3, 4, 5));
```

上述代码内部的链表结构如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319812.jpg)

# addAll()中的一个问题：

在addAll函数中，传入一个集合参数和插入位置，然后将集合转化为数组，然后再遍历数组，挨个添加数组的元素，但是问题来了，为什么要先转化为数组再进行遍历，而不是直接遍历集合呢？

从效果上两者是完全等价的，都可以达到遍历的效果。关于为什么要转化为数组的问题，我的思考如下：

1. 如果直接遍历集合的话，那么在遍历过程中需要插入元素，在堆上分配内存空间，修改指针域，这个过程中就会一直占用着这个集合，考虑正确同步的话，其他线程只能一直等待。
2. 如果转化为数组，只需要遍历集合，而遍历集合过程中不需要额外的操作，所以占用的时间相对较短的，这样就利于其他线程尽快的使用这个集合。说白了，就是有利于提高多线程访问该集合的效率，尽可能短时间的阻塞。

3、remove(Object o)

```java
/* 
* Removes the first occurrence of the specified element from this list, 
* if it is present. If this list does not contain the element, it is 
* unchanged. More formally, removes the element with the lowest index 
* {@code i} such that 
* <tt>(o==null&nbsp:?&nbsp;get(i)--null&nbsp;:&nbsp;o.equals(get(i))) 
</tt> 
* (if such an element exists). Returns {@code true} if this list 
* contained the specified element (or equivalently, if this list 
* changed as a result of the call). 
* 
* @param o element to be removed from this list, if present 
* @return {@code true} if this list contained the specified element 
*/ 
//首先通过看上面的注释，我们可以知道，如果我们要移除的值在链表中存在多个一样的值，那么我们 
会移除index最小的那个，也就是最先找到的那个值，如果不存在这个值，那么什么也不做。 
public boolean remove(object o) {
    //这里可以看到，LinkedList也能存储null
    if (o == null) {
        //循环遍历链表，直到找到null值，然后使用unlink移除该值。下面的这个else中也一样
        for (Node<E> x = first; x != null; x = x.next) {
            if (x.item == null) {
                unlink(x);
            }
        }
    } else {
        for (Node<E> x = first; x != null; x = x.next) {
            if (o.equals(x.item)) {
                unlink(x);
            }
            return true;
        }
    }
} 
return false;
```

【unlink(xxxx)】

```txt
1 /\*\* \* unlinks non-null node x.   
3 \*/   
4 //不能传一个null值过，注意，看之前要注意之前的next、prev这些都是谁。   
5 E unlink(Node<x）{   
6 // assert  $x! =$  null;   
7 //拿到节点x的三个属性   
8 final E element=x.item;
```

【get(index)查询元素的方法】

```javascript
9 final Node  $\text{一} _ { \mathrm { E } } >$  next  $=$  x.next; final Node  $\text{一} _ { \mathrm { E } } >$  prev  $=$  xprev;   
12 //这里开始往下就进行移除该元素之后的操作，也就是把指向哪个节点搞定。 if (prev  $= =$  null）{ //说明移除的节点是头节点，则first头节点应该指向下一个节点 first  $=$  next; 1 else { //不是头节点，prev.next  $\equiv$  next：有1、2、3，将1.next指向3 prev.next  $=$  next; //然后解除x节点的前指向。 xprev  $=$  null;   
21 1 if (next  $= =$  null）{ //说明移除的节点是尾节点 last  $=$  prev; } else { //不是尾节点，有1、2、3，将3.pre指向1.然后将2.next  $\equiv$  解除指向。 next.pre  $=$  prev; x.next  $=$  null;   
30 1 /x的前后指向都为null了，也把item为null，让gc回收它 x.item  $=$  null; size--; //移除一个节点，size自减 modCount++; return element; //由于一开始已经保存了x的值到element，所以返回。   
36
```

# 4、get(index)

【node(index)】

```java
1 /* 
2 * Returns the element at the specified position in this list. 
3 * 
4 * @param index index of the element to return 
5 * @return the element at the specified position in this list 
6 * @throws IndexOutOfBoundsException (@inheritDoc) 
7 */
8 //这里没有什么，重点还是在node(index)中
9 public E get(int index) {
10 checkElementIndex(index); 
11 return node(index).item; 
12 }
```

```c
1 /* 
2 * Returns the (non-null) Node at the specified element index. 
3 */
4 //这里查询使用的是先从中间分一半查找
5 Node<E> node(int index) {
6     // assert isElementIndex(index);
7     //"<":*2的几次方“>>”:/2的几次方，例如：size<<1: size*2的1次方，
8     //这个if中就是查询前半部分
9         if (index < (size >> 1)) { //index<size/2
10         Node<E> x = first;
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

```lisp
for (int i = 0; i < index; i++)  
    x = x.next;  
return x;  
} else { //前半部分没找到，所以找后半部分  
Node<E> x = last;  
for (int i = size - 1; i > index; i--)  
    x = xprev;  
return x;  
}
```

# 5、indexOf(Object o)

```javascript
//这个很简单，就是通过实体元素来查找到该元素在链表中的位置。跟remove中的代码类似，只是返回类型不一样。  
public int indexof(object o）{int index  $= 0$  ：if（o  $\equiv =$  null）{for（Node  $\text{一} E >$  x  $\equiv$  first;  $\mathbf{x}$  != null;  $\mathbf{x} = \mathbf{x}$  .next）{if（x.item  $\equiv =$  null）return index;index++;1}else{for（Node  $\text{一} E >$  x  $\equiv$  first;  $\mathbf{x}$  != null;  $\mathbf{x} = \mathbf{x}$  .next）{if（o.equals(x.item))）return index;index++;1}18 return -1;
```

# 9、LinkedList的迭代器

在LinkedList中除了有一个Node的内部类外，应该还能看到另外两个内部类，那就是ListPtr，还有一个是DescendingIterator。

【Listltr内部类】

```txt
1 private class ListItr implements ListIterator<E> {
2 }
3 }
```

看一下他的继承结构，发现只继承了一个ListIterator，到ListIterator中一看：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319813.jpg)

看到方法名之后，就发现不止有向后迭代的方法，还有向前迭代的方法，所以我们就知道了这个ListPtr这个内部类干嘛用的了，就是能让LinkedList不光能像后迭代，也能向前迭代。

看一下Listltr中的方法，可以发现，在迭代的过程中，还能移除、修改、添加值得操作。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319814.jpg)

【DescendingIterator内部类】

```java
private class DescendingIterator implements Iterator<E> {
    //看一下这个类，还是调用的ListItr，作用是封装一下Itr中几个方法，让使用者以正常的思维去写代码，例如，在从后往前遍历的时候，也是跟从前往后遍历一样，使用next等操作，而不用使用特殊的previous。
    private final ListItr itr = new ListItr(size());
    public boolean hasNext() {
        return itr.hasNext();
    }
    public E next() {
        return itr.previous();
    }
    public void remove() {
        itr.remove();
    }
}
```

# 10、总结

1. linkedList本质上是一个双向链表，通过一个Node内部类实现的这种链表结构。
2. 能存储null值
3. 跟ArrayList相比较，就真正的知道了，LinkedList在删除和增加等操作上性能好，而ArrayList在查询的性能上好
4. 从源码中看，它不存在容量不足的情况
5. linkedList不光能够向前迭代，还能像后迭代，并且在迭代的过程中，可以修改值、添加值、还能移除值。
6. linkedList不光能当链表，还能当队列使用，这个就是因为实现了Deque接口。

# Vevtor和Stack

前面写了一篇关于的是LinkedList的除了它的数据结构稍微有一点复杂之外，其他的都很好理解的。这一篇讲的可能大家在开发中很少去用到。但是有的时候也可能是会用到的！

注意在学习这一篇之前，需要有多线程的知识：

1）锁机制：对象锁、方法锁、类锁

对象锁就是方法锁：就是在一个类中的方法上加上synchronized关键字，这就是给这个方法加锁了。

类锁：锁的是整个类，当有多个线程来声明这个类的对象的时候将会被阻塞，直到拥有这个类锁的对象被销毁或者主动释放了类锁。这个时候在被阻塞住的线程被挑选出一个占有该类锁，声明该类的对象。其他线程继续被阻塞住。例如：在类A上有关键字synchronized，那么就是给类A加了类锁，线程1第一个声明此类的实例，则线程1拿到了该类锁，线程2在想声明类A的对象，就会被阻塞。

2）在本文中，使用的是方法锁。  
3）每个对象只有一把锁，有线程A，线程B，还有一个集合C类，线程A操作C拿到了集合中的锁(在集合C中有用synchronized关键字修饰的)
，并且还没有执行完，那么线程A就不会释放锁，当轮到线程B去操作集合C中的方法时，发现锁被人拿走了，所以线程B只能等待那个拿到锁的线程使用完，然后才能拿到锁进行相应的操作。

# 1 Vector

# 1、Vector概述

java.util

# 类 Vector<E>

```java
java.lang.Object java.util.AbstractCollection<E> java.util.AbstractList<E> java.util.Vector<E>
```

# 所有己实现的接口：

Serializable, Cloneable, Iterator(E), Collection(E), List(E), RandomAccess

# 直接已知子类：

Stack

```txt
public class Vector<E>  
extends AbstractList<E>  
implements List<E>, RandomAccess, Cloneable,Serializable
```

Vector类可以实现可增长的对象数组。与数组一样，它包含可以使用整数索引进行访问的组件。但是，Vector的大小可以根据需要增大或缩小，以适应创建Vector后进行添加或移除项的操作。

每个向量会试图通过维护capacity和capacityIncrement来优化存储管理。capacity始终至少应与向量的大小相等；这个值通常比后者大些，因为随着将组件添加到向量中，其存储将按capacityIncrement的大小增加存储块。应用程序可以在插入大量组件前增加向量的容量；这样就减少了增加的重分配的量。

由 Vector 的 iterator 和 listIterator 方法所返回的迭代器是快速失败的；如果在迭代器创建后的任意时间从结构上修改了向量（通过迭代器自身的
remove 或 add 方法之外的任何其他方式），则迭代器将抛出
ConcurrentModificationException。因此，面对并发的修改，迭代器很快就完全失败，而不是冒着在将来不确定的时间任意发生不确定行为的风险。Vector
的 elements 方法返回的 Enumeration 不是快速失败的。

注意，迭代器的快速失败行为不能得到保证，一般来说，存在不同步的并发修改时，不可能作出任何坚决的保证。快速失败迭代器尽最大努力抛出
ConcurrentModificationException。因此，编写依赖于此异常的程序的方式是错误的，正确做法是：迭代器的快速失败行为应该仅用于检测
bug.

从Java2平台v1.2开始，此类改进为可以实现List接口，使它成为JavaCollections Framework的成员。与新collection实现不同，Vector是同步的。

# 通过API中可以知道：

1. Vector是一个可变化长度的数组
2. Vector增加长度通过的是capacity和capacityIncrement这两个变量，目前还不知道如何实现自动扩增的，等会源码分析
3. Vector也可以获得iterator和listIterator这两个迭代器，并且他们发生的是fail-fast，而不是fail-safe，注意这里，不要觉得这个vector是线程安全就搞错了，具体分析在下面会说
4. Vector是一个线程安全的类，如果使用需要线程安全就使用Vector，如果不需要，就使用ArrayList
5. Vector和ArrayList很类似，就少许的不一样，从它继承的类和实现的接口来看，跟ArrayList一模一样。

注意：现在的版本已经是jdk1.7，还有更高的jdk1.8了，在开发中，建议不用vector，原因在文章的结束会有解释，如果需要线程安全的集合类直接用java.util.concurrent包下的类。

# 2、Vector源码分析

【继承结构和层次关系】

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319815.jpg)

1556678314334.png

```java
public class VectorE> extends AbstractListE> implements ListE>，RandomAccess，Cloneable，java.io.Serializable {   
1
```

我们发现Vector的继承关系和层次结构和ArrayList中的一模一样，不懂的可以去前面的博客查看！

【构造方法】

构造方法作用：

1. 初始化存储元素的容器，也就是数组，elementData，
2. 初始化capacityIncrement的大小，默认是0，这个的作用就是扩展数组的时候，增长的大小，为0则每次扩展2倍

【Vector(): 空构造】

```txt
1 /***
2 * Constructs an empty vector so that its internal data array
3 * has size {@code 10} and its standard capacity increment is
4 * zero.
5 */
6 //看注释，这个是一个空的vector构造方法，所以让他使用内置的数组，这里还不知道什么是内置的数组，看它调用了自身另外一个带一个参数的构造器
7
8 public vector() {
9 this(10);
10 }
```

【Vector(int)】

```java
/* 
* Constructs an empty vector with the specified initial capacity and 
* with its capacity increment equal to zero. 
* 
* @param initialCapacity the initial capacity of the vector 
* @throws IllegalArgumentException if the specified initial capacity 
* is negative 
*/  
//注释说，给空的cctor构造器用和带有一个特定初始化容量用的，并且又调用了另外一个带两个参数的构造器，并且给容量增长值(capacityIncrement=0)为0，查看vector中的变量可以发现capacityIncrement是一个成员变量
public Vector(int initialCapacity) { 
    this(initialCapacity, 0); 
}
```

【ector(int, int)】

```c
/* 
* Constructs an empty vector with the specified initial capacity and 
* capacity increment. 
* 
* @param initialCapacity the initial capacity of the vector 
* @param capacityIncrement the amount by which the capacity is 
* increased when the vector overflows 
* @throws.IllegalArgumentException if the specified initial capacity 
* is negative 
*/
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

【Vector(Collection<? extends E>c)】

```txt
this.elementData = new Object[initialCapacity];//elementData是一个成员变量数组，初始化它，并给它初始化长度。默认就是10，除非自己给值。  
thiscapacityIncrement = capacityIncrement; //capacityIncrement的意思是如果要扩增数组，每次增长该值，如果该值为0，那数组就变为两倍的原长度，这个之后会分析到  
}
```

```java
1 /* 
2 * Constructs a vector containing the elements of the specified 
3 * collection, in the order they are returned by the collection's 
4 * iterator. 
5 * @param c the collection whose elements are to be placed into this 
6 * vector 
7 * @throws NullPointerException if the specified collection is null 
8 * @since 1.2 
9 * //将集合c变为Vector，返回Vector的迭代器。 
10 public Vector(Collection<? extends E> c) { 
11 elementData = c.toArray(); 
12 elementCount = elementData.length; 
13 // c.toArray might (incorrectly) not return Object[] (see 6260652) 
14 if (elementData.getClass() != object[].class) 
15 * elementData = Arrays.copyOf.elementData, elementCount, 
16 object[].class); 
17 }
```

# 3、核心方法

【add()方法】  
【ensureCapacityHelper(int)】

```java
1 /* 
2 * Appends the specified element to the end of this vector. 
3 * 
4 * @param e element to be appended to this Vector 
5 * @return {@code true} (as specified by {@link collection#add}) 
6 * @since 1.2 
7 */
8 
9 //就是在vector中的末尾追加元素。但是看方法，synchronized，明白了为什么vector是线程安全的，因为在方法前面加了synchronized关键字，给该方法加锁了，哪个线程先调用它，其它线程就得等着，如果不清楚的就去看看多线程的知识，到后面我也会一一总结的。  
10 
11 public synchronized boolean add(E e) {
12 modCount++;
13 //通过ArrayList的源码分析经验，这个方法应该是在增加元素前，检查容量是否够用
14 ensureCapacityHelper.elementCount + 1);
15 elementData.elementCount++ = e;
16 return true;
17 }
```

1 /**

【grow(int)】

```txt
\*Thisimplements the unsynchronized semantics of ensureCapacity. \*Synchronized methods in this class can internally call this \*method for ensuring capacity without incurring the cost of an \*extra synchronization. \* @see #ensureCapacity(int) \*/   
9 //这里注释解释，这个方法是异步(也就是能被多个线程同时访问)的，原因是为了让同步方法都能调用到这个检测容量的方法，比如add的同时，另一个线程调用了add的重载方法，那么两个都需要同时查询容量够不够，所以这个就不需要用synchronized修饰了。因为不会发生线程不安全的问题   
10 private void ensureCapacityHelper(int minCapacity){ //overflow-conscious code if (minCapacity-elementData.length>0) //容量不够，就扩增，核心方法 grow(minCapacity);   
15 }
```

```txt
//看一下这个方法，其实跟arrayList一样，唯一的不同就是在扩增数组的方式不一样，如果 capacityIncrement不为0，那么增长的长度就是capacityIncrement，如果为0，那么扩增为2倍的原容量  
private void grow(int minCapacity) { //overflow-conscious code int oldCapacity = elementData.length; int newCapacity = oldCapacity + ((capacityIncrement > 0) ? capacityIncrement : oldCapacity); if (newCapacity - minCapacity < 0) newCapacity = minCapacity; if (newCapacity - MAX_ARRAY_SIZE > 0) newCapacity = hugeCapacity(minCapacity); elementData = Arrays.copyOf.elementData, newCapacity); }
```

感觉只要你能看的懂ArrayList，这个就是在每个方法上比ArrayList多了一个synchronized，其他都一样。这里就不再分析了！

```java
1 public synchronized E get(int index) { 2 if (index >= elementCount) 3 throw new ArrayIndexOutOfBoundsException(index); 4 return elementData(index); 5 }
```

# 2 Stack

现在来看看Vector的子类Stack，学过数据结构都知道，这个就是栈的意思。那么该类就是跟栈的用法一样了

```txt
1 class Stack<E> extends Vector<E> {}
```

通过查看他的方法，和查看api文档，很容易就能知道他的特性。就几个操作，出栈，入栈等，构造方法也是空的，用的还是数组，父类中的构造，跟父类一样的扩增方式，并且它的方法也是同步的，所以也是线程安全。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319816.jpg)

# 3 总结Vector和Stack

# 【Vector总结（通过源码分析）】

1. Vector线程安全是因为它的方法都加了synchronized关键字
2. Vector的本质是一个数组，特点能是能够自动扩增，扩增的方式跟capacityIncrement的值有关
3. 它也会fail-fast，还有一个fail-safe两个的区别在下面的list总结中会讲到。

# 【Stack的总结】

1. 对栈的一些操作，先进后出
2. 底层也是用数组实现的，因为继承了Vector
3. 也是线程安全的

# 4 List总结

# 【ArrayList和LinkedList区别】

ArrayList底层是用数组实现的顺序表，是随机存取类型，可自动扩增，并且在初始化时，数组的长度是0，只有在增加元素时，长度才会增加。默认是10，不能无限扩增，有上限，在查询操作的时候性能更好

LinkedList底层是用链表来实现的，是一个双向链表，注意这里不是双向循环链表，顺序存取类型。在源码中，似乎没有元素个数的限制。应该能无限增加下去，直到内存满了在进行删除，增加操作时性能更好。

两个都是线程不安全的，在iterator时，会发生fail-fast：快速失效。

【ArrayList和Vector的区别】

ArrayList线程不安全，在用iterator，会发生fail-fast

Vector线程安全，因为在方法前加了Synchronized关键字。也会发生fail-fast

【fail-fast和fail-safe区别和什么情况下会发生】

简单的来说：在java.util下的集合都是发生fail-fast，而在java.util.concurrent下的发生的都是fail-safe。

1) fail-fast

快速失败，例如在ArrayList中使用迭代器遍历时，有另外的线程对ArrayList的存储数组进行了改变，比如add、delete、等使之发生了结构上的改变，所以Iterator就会快速报一个java.utilçoncurrentModificationException异常（并发修改异常），这就是快速失败。

2) fail-safe

安全失败，在java.util.concurrent下的类，都是线程安全的类，他们在迭代的过程中，如果有线程进行结构的改变，不会报异常，而是正常遍历，这就是安全失败。

3）为什么在java.util.concurrent包下对集合有结构的改变，却不会报异常？

在concurrent下的集合类增加元素的时候使用Arrays.copyOf()
来拷贝副本，在副本上增加元素，如果有其他线程在此改变了集合的结构，那也是在副本上的改变，而不是影响到原集合，迭代器还是照常遍历，遍历完之后，改变原引用指向副本，所以总的一句话就是如果在此包下的类进行增加删除，就会出现一个副本。所以能防止fail-fast，这种机制并不会出错，所以我们叫这种现象为fail-safe。

4) vector也是线程安全的，为什么是fail-fast呢？

这里搞清楚一个问题，并不是说线程安全的集合就不会报fail-fast，而是报fail-safe，你得搞清楚前面所说答案的原理，出现fail-safe是因为他们在实现增删的底层机制不一样，就像上面说的，会有一个副本，而像ArrayList、linekdList、verctor等，他们底层就是对着真正的引用进行操作，所以才会发生异常。

5）既然是线程安全的，为什么在迭代的时候，还会有别的线程来改变其集合的结构呢(也就是对其删除和增加等操作)?

首先，我们迭代的时候，根本就没用到集合中的删除、增加，查询的操作，就拿vector来说，我们都没有用那些加锁的方法，也就是方法锁放在那没人拿，在迭代的过程中，有人拿了那把锁，我们也没有办法，因为那把锁就放在那边。

【举例说明fail-fast和fail-safe的区别】

1. fail-fast

[

```java
10 public static void main(String[] args) {
11 fail-fast
12 Vector v = new Vector();
13 v.add(1);
14 v.add(2);
15 v.add(3);
16 Iterator iterator = v.iterator();
17 while(iterator.hasNext())
18 System.out.println(iterator.next());
19 v.add(4);
20 }
21 }
22 }
23 }
```

# 1. fail-safe

通过CopyOnWriteArrayList这个类来做实验，不用管这个类的作用，但是他确实没有报异常，并且还通过第二次打印，来验证了上面我们说创建了副本的事情。

原理是在添加操作时会创建副本，在副本上进行添加操作，等迭代器遍历结束后，会将原引用改为副本引用，所以我们在创建了一个list的迭代器，结果打印的就是123444了，

证明了确实改变成为了副本引用，后面为什么是三个4，原因是我们循环了3次，不久添加了3个4吗。如果还感觉不爽的话，看下add的源码。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319817.jpg)

```javascript
public boolean add(  $\varepsilon$  e) { final ReentrantLock lock  $=$  this.lock; lock.lock(); try { Object[] elements  $=$  getArray(); int len  $=$  elements.length; Object[]newElements  $=$  Arrays.copyOfelements,len  $+1$  newElements[len]  $= \mathrm{e}$  ： setArray(newElements); return true; }finally{ lock.unlock();
```

【为什么现在都不提倡使用vector了】

1）vector实现线程安全的方法是在每个操作方法上加锁，这些锁并不是必须要的，在实际开发中，一般都是通过锁一系列的操作来实现线程安全，也就是说将需要同步的资源放一起加锁来保证线程安全。  
2）如果多个Thread并发执行一个已经加锁的方法，但是在该方法中，又有vector的存在，vector本身实现中已经加锁了，那么相当于锁上又加锁，会造成额外的开销。  
3）就如上面第三个问题所说的，vector还有fail-fast的问题，也就是说它也无法保证遍历安全，在遍历时又得额外加锁，又是额外的开销，还不如直接用ArrayList，然后再加锁呢。

总结：Vector在你不需要进行线程安全的时候，也会给你加锁，也就导致了额外开销，所以在jdk1.5之后就被弃用了，现在如果要用到线程安全的集合，都是从java.util.concurrent包下去拿相应的类。

# 1 HashMap引入

问题：建立国家英文简称和中文全名间的键值映射，并通过key对value进行操作，应该如何实现数据的存储和操作呢？

分析：

Map接口专门处理键值映射数据的存储，可以根据键实现对值的操作。

最常用的实现类是HashMap。

【使用HashMap存储元素】

【Map接口常用方法】

# 2 HashMa数据结构

# 1、HashMap概述

HashMap是基于哈希表的Map接口实现的，它存储的是内容是键值对<key=value>
映射。此类不保证映射的顺序，假定哈希函数将元素适当的分布在各桶之间，可为基本操作(get和put)提供稳定的性能。

在API中给出了相应的定义：

1 //1、哈希表基于map接口的实现，这个实现提供了map所有的操作，并且提供了key和value，可以为null，(HashMap和HashMap大致上是一样的，除了
hashmap是异步的，和允许key和value为null)，  
2 //这个类不确定map中元素的位置，特别要提的是，这个类也不确定元素的位置随着时间会不会保持不变。  
3 Hash table based implementation of the Map interface. This implementation provides all of the optional map operations,
and permits null values and the null key.  
5 (The HashMap class is roughly equivalent to Hashtable, except that it is unsynchronized and permits nulls.) This class
makes no guarantees as to the order of the map;  
in particular, it does not guarantee that the order will remain constant over time.  
//假设哈希函数将元素合适的分到了每个桶(其实就是指的数组中位置上的链表)中，则这个实现为基本的操作(get、put)
提供了稳定的性能，迭代这个集合视图需要的时间跟hashMap实例(key-value映射的数量)的容量(在桶中)
成正比，因此，如果迭代的性能很重要的话，就不要将初始容量设置的太高或者loadfactor设置的太低，【这里的桶，相当于在数组中每个位置上放一个桶装元素】  
9 This implementation provides constant-time performance for the basic operations (get and put), assuming the hash
function disperses the elements properly among the buckets.  
10 Iteration over collection views requires time proportional to the "capacity" of the HashMap instance (the number of
buckets) plus its size (the number of key-value mappings  
11). Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration
performance is important.

12

13 // HashMap的实例有两个参数影响性能，初始化容量(initialCapacity)
和loadFactor加载因子，在哈希表中这个容量是桶的数量【也就是数组的长度】，一个初始化容量仅仅是在哈希表被创建时容量，在容量自动增长之前加载因子是衡量哈希表被允许达到的多少的。当entry的数量在哈希表中超过了加载因子乘以当前的容量，那么哈希表被修改(
内部的数据结构会被重新建立)所以哈希表有大约两倍的桶的数量.  
14 An instance of HashMap has two parameters that affect its performance: initial capacity and load factor. The capacity
is the number of buckets in the hash table,  
15 and the initial capacity is simply the capacity at the time the hash table is created. The load factor is a measure
of how full the hash table is allowed to get before  
its capacity is automatically increased. When the number of entries in the hash table exceeds the product of the load
factor and the current capacity, the hash table  
17 is rehashed (that is, internal data structures are rebuilt) so that the hash table has approximately twice the number
of buckets.  
18 //通常来讲，默认的加载因子(0.75)
能够在时间和空间上提供一个好的平衡，更高的值会减少空间上的开支但是会增加查询花费的时间（体现在HashMap类中get、put方法上），当设置初始化容量时，应该考虑到map中会存放entry的数量和加载因子，以便最少次数的进行rehash操作，如果初始容量大于最大条目数除以加载因子，则不会发生rehash操作。  
As a general rule, the default load factor (.75) offers a good tradeoff between time and space costs. Higher values
decrease the space overhead but increase the lookup  
21 cost (reflected in most of the operations of the HashMap class, including get and put). The expected number of
entries in the map and its load factor should be taken  
into account when setting its initial capacity, so as to minimize the number of rehash operations. If the initial
capacity is greater than the maximum number of  
23 entries divided by the load factor, no rehash operations will ever occur.  
24 //如果很多映射关系要存储在 HashMap 实例中，则相对于按需执行自动的 rehash
操作以增大表的容量来说，使用足够大的初始容量创建它将使得映射关系能更有效地存储。  
26 If many mappings are to be stored in a HashMap instance, creating it with a sufficiently large capacity will allow
the mappings to be stored more efficiently than letting  
27 it perform automatic rehashing as needed to grow the table

# 2、 HashMap在JDK1.8以前数据结构和存储原理

【链表散列】

首先我们要知道什么是链表散列？通过数组和链表结合在一起使用，就叫做链表散列。这其实就是hashmap存储的原理图。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319818.jpg)

【HashMap的数据结构和存储原理】

HashMap的数据结构就是用的链表散列。那HashMap底层是怎么样使用这个数据结构进行数据存取的呢？分成两个部分：

第一步： HashMap内部有一个entry的内部类，其中有四个属性，我们要存储一个值，则需要一个key和一个value，存到map中就会先将key和value保存在这个Entry类创建的对象中。

```txt
1 static class Entry<K, V> implements Map.Entry<K, V> {
2     final K key; //就是我们说的map的key
3     v value; //value值，这两个都不陌生
4         Entry<K, V> next; //指向下一个entry对象
5         int hash; //通过key算过来的你hashcode值。
6     }
```

Entry的物理模型图：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319819.jpg)

第二步：构造好了entry对象，然后将该对象放入数组中，如何存放就是thisHashMap的精华所在了。

大概的一个存放过程是：通过entry对象中的hash值来确定将该对象存放在数组中的哪个位置上，如果在这个位置上还有其他元素，则通过链表来存储这个元素。

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319820.jpg)  
[  
【Hash存放元素的过程】

通过key、value封装成一个entry对象，然后通过key的值来计算该entry的hash值，通过entry的hash值和数组的长度length来计算出entry放在数组中的哪个位置上面，

每次存放都是将entry放在第一个位置。在这个过程中，就是通过hash值来确定将该对象存放在数组中的哪个位置上。

# 3、JDK1.8后HashMap的数据结构

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319821.jpg)

上图很形象的展示了 HashMap的数据结构（数组+链表+红黑树），桶中的结构可能是链表，也可能是红黑树，红黑树的引入是为了提高效率。

# 4、HashMap的属性

HashMap的实例有两个参数影响其性能。

初始容量：哈希表中桶的数量

加载因子：哈希表在其容量自动增加之前可以达到多满，的一种尺度

当哈希表中条目数超出了当前容量*加载因子(其实就是 HashMap的实际容量)时，则对该哈希表进行rehash操作，将哈希表扩充至两倍的桶数。

Java中默认初始容量为16，加载因子为0.75。

1 static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16  
2 static final float DEFAULT_LOAD_FACTOR = 0.75f;

# 【loadFactor加载因子】

定义：loadFactor译为装载因子。装载因子用来衡量 HashMap满的程度。loadFactor的默认值为0.75f。计算
HashMap的实时装载因子的方法为：size/capacity，而不是占用桶的数量去除以capacity。

loadFactor加载因子是控制数组存放数据的疏密程度，loadFactor越趋近于1，那么数组中存放的数据 (entry)
也就越多，也就越密，也就是会让链表的长度增加，loadFactor越小，也就是趋近于0，那么数组中存放的数据也就越稀，也就是可能数组中每个位置上就放一个元素。那有人说，就把loadFactor变为1
最好吗，存的数据很多，但是这样会有一个问题，就是我们在通过key拿到我们的value时，是先通过key的hashcode值，找到对应数组中的位置，如果该位置中有很多元素，则需要通过equals来依次比较链表

狂神社群笔记资料，禁止外传，本人QQ：24736743

中的元素，拿到我们的value值，这样花费的性能就很高，如果能让数组上的每个位置尽量只有一个元素最好，我们就能直接得到value值了，所以有人又会说，那把loadFactor变得很小不就好了，但是如果变得太小，在数组中的位置就会太稀，也就是分散的太开，浪费很多空间，这样也不好，所以在hashMap中loadFactor的初始值就是0.75，一般情况下不需要更改它。

```txt
1 static final float DEFAULT_LOAD_FACTOR = 0.75f;
```

# 【桶】

根据前面画的
HashMap存储的数据结构图，你这样想，数组中每一个位置上都放有一个桶，每个桶里就是装一个链表，链表中可以有很多个元素(entry)
，这就是桶的意思。也就相当于把元素都放在桶中。

【capacity】

capacity译为容量代表的数组的容量，也就是数组的长度，同时也是 HashMap中桶的个数。默认值是16。

一般第一次扩容时会扩容到64，之后好像是2倍。总之，容量都是2的幂。

```txt
1 static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
```

【size的含义】

size就是在该HashMap的实例中实际存储的元素的个数

【threshold的作用】

```txt
1 int threshold;
```

threshold = capacity * loadFactor，当Size >= threshold的时候，那么就要考虑对数组的扩增了，也就是说，这个的意思就是衡量数组是否需要扩增的一个标准。

注意这里说的是考虑，因为实际上要扩增数组，除了这个size>=threshold条件外，还需要另外一个条件。

什么时候会扩增数组的大小？在put一个元素时先size>=threshold并且还要在对应数组位置上有元素，这才能扩增数组。

我们通过一张 HashMap的数据结构图来分析：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319822.jpg)  
[

# 3 HashMap的源码分析

# 1、HashMap的层次关系与继承结构

【HashMap继承结构】

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319823.jpg)

上面就继承了一个abstractMap，也就是用来减轻实现Map接口的编写负担。

【实现接口】

```java
1 public class HashMap<K, V> extends AbstractMap<K, V> {
2 implements Map<K, V>, Cloneable,Serializable {
3 }
4 }
```

Map<K,V>：在AbstractMap抽象类中已经实现过的接口，这里又实现，实际上是多余的。但每个集合都有这样的错误，也没过大影响

Cloneable：能够使用Clone()方法，在 HashMap中，实现的是浅层次拷贝，即对拷贝对象的改变会影响被拷贝的对象。

Serializable: 能够使之序列化，即可以将 HashMap对象保存至本地，之后可以恢复状态。

# 2、HashMap类的属性

```c
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable,Serializable{ //序列号 private static final long serialversionUID  $=$  362498820763181265L; //默认的初始容量是16 static final int DEFAULT_INITIAL_CAPACITY  $= 1 <   <   4$  · //最大容量 static final int MAXIMUM_CAPACITY  $= 1 <   <   30$  · //默认的填充因子 static final float DEFAULT_LOAD_FACTOR  $= 0.75f$  · //当桶(bucket)上的结点数大于这个值时会转成红黑树 static final int TREEIFY_threshold  $= 8$  ： //当桶(bucket)上的结点数小于这个值时树转链表 static final int UNTREEIFY_threshold  $= 6$  · //桶中结构转化为红黑树对应的table的最小大小 static final int MIN_TREEIFY_CAPACITY  $= 64$  ： //存储元素的数组，总是2的幂次倍 transient Node<k,v>[ ] table; //存放具体元素的集 transient Set<map.entry<k,v>> entrySet; //存放元素的个数，注意这个不等于数组的长度。 transient int size; //每次扩容和更改map结构的计数器 transient int modCount; //临界值当实际大小(容量\*填充因子)超过临界值时，会进行扩容 int threshold; //填充因子 final float loadFactor; }
```

# 3、HashMap的构造方法

有四个构造方法，构造方法的作用就是记录一下16这个数给threshold（这个数值最终会当作第一次数组的长度。）和初始化加载因子。注意，hashMap中table数组一开始就已经是个没有长度的数组了。

构造方法中，并没有初始化数组的大小，数组在一开始就已经被创建了，构造方法只做两件事情，一个是初始化加载因子，另一个是用threshold记录下数组初始化的大小。注意是记录。

【HashMap()】

```txt
//看上面的注释就已经知道，DEFAULT_INITIAL_CAPACITY=16，DEFAULT_LOAD_FACTOR=0.75  
//初始化容量：也就是初始化数组的大小  
//加载因子：数组上的存放数据疏密程度。  
public HashMap() {  
    this(DEFAULT_INITIAL_CAPACITY, DEFAULT_LOAD_FACTOR);  
}
```

【HashMap(int)】  
【HashMap(int,float)】

```java
1 public HashMap(int initialCapacity) {
2     this(initialCapacity, DEFAULT_LOAD_FACTOR);
3 }
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

```java
public HashMap(int initialCapacity, float loadFactor) {
    // 初始容量不能小于0，否则报错
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
    // 初始容量不能大于最大值，否则为最大值
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    // 填充因子不能小于或等于0，不能为非数字
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
    // 初始化填充因子
    this.loadFactor = loadFactor;
    // 初始化threshold大小
    thisthreshold = tableSizeFor(initialCapacity);
}
```

【HashMap(Map<? extends K, ? extends V> m))

```txt
public HashMap(Map<? extends K,？extends  $\mathsf{V}>$  m）{ //初始化填充因子 this.loadFactor  $=$  DEFAULT_LOAD_FACTOR; //将m中的所有元素添加至HashMap中 putMapEntries(m，false);   
1
```

【putMapEntries(Map<? extends K, ? extends V> m, boolean evict)函数将m的所有元素存入本 HashMap实例中】

```java
final void putMapEntries(Map<? extends K, ? extends v> m, boolean evict) {  
    int s = m.size();  
    if (s > 0) {  
        // 判断table是否已经初始化  
        if (table == null) { // pre-size  
            // 未初始化，s为m的实际元素个数  
            float ft = ((float)s / loadFactor) + 1.0F;  
            int t = ((ft < (float)MAXIMUM_CAPACITY) ? (int)ft : MAXIMUM_CAPacity);  
        }  
    // 计算得到的t大于阈值，则初始化阈值  
    if (t > threshold)  
        threshold = tableSizeFor(t);  
    }  
    // 已初始化，并且m元素个数大于阈值，进行扩容处理  
    else if (s > threshold)  
        resize();  
    // 将m中的所有元素添加至 HashMap中  
    for (Map.Entry<? extends K, ? extends v> e : m.entrySet()) {  
        K key = e.getKey();  
        v value = e.getValue();  
        putval(key), key, value, false, evict);  
    }  
}
```

# 4、常用方法

【put(K key,V value)】

```txt
1 public V put(K key, V value) {
2 return putVal(key), key, value, false, true);
3 }
```

【putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict)】

```txt
final v putval(int hash, k key, v value, boolean onlyIfAbsent, boolean evict) {
Node<K, V>[ ] tab; Node<K, V> p; int n, i;
// table未初始化或者长度为0，进行扩容
if ((tab = table) == null || (n = tab.length) == 0)
    n = (tab = resize()).length;
// (n - 1) & hash 确定元素存放在哪个桶中，桶为空，新生成结点放入桶中(此时，这个结点是放在数组中)
if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNodehashCode, key, value, null);
// 桶中已经存在元素
else {
    Node<K, V> e; K k;
// 比较桶中第一个元素(数组中的结点)的hash值相等，key相等
if (p.hashCode == hash && ((k = p.key) == key || (key != null && key.equals(k)))) // 将第一个元素赋值给e，用e来记录
    e = p;
// hash值不相等，即key不相等；为红黑树结点
else if (p instanceofTreeNode)
// 放入树中
    e = ((TreeNode<K, V>)p).putTreeVal(this, tab, hash, key, value);
// 为链表结点
else {
// 在链表最末插入结点
for (int binCount = 0; ; ++binCount) {
// 到达链表的尾部
if ((e = p.next) == null) {
// 在尾部插入新结点
p.next = newNodehashCode, key, value, null);
// 结点数量达到阈值，转化为红黑树
if (binCount >= TREEIFY_threshold - 1) // -1 for 1st treeifyBin_tab, hash);
// 跳出循环
break;
}
// 判断链表中结点的key值与插入的元素的key值是否相等
if (e.hashCode == hash && ((k = e.key) == key || (key != null && key.equals(k)))) // 相等，跳出循环
break;
// 用于遍历桶中的链表，与前面的e = p.next组合，可以遍历链表
p = e;
}
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

```txt
47 //记录e的value  
48 v oldvalue = e.value;  
49 //onlyIfAbsent为false或者旧值为null  
50 if (!onlyIfAbsent || oldValue == null)  
51 //用新值替换旧值  
52 e.value = value;  
53 //访问后回调  
54 afterNodeAccess(e);  
55 //返回旧值  
56 return oldvalue;  
57 }  
58 }  
59 //结构性修改  
60 ++modCount;  
61 //实际大小大于阈值则扩容  
62 if (++size > threshold)  
63 resize();  
64 //插入后回调  
65 afterNodeInsertion(evict);  
66 return null;  
67 }
```

HashMap并没有直接提供putVal接口给用户调用，而是提供的put函数，而put函数就是通过putVal来插入元素的。

【get(Object key)】

```java
1 public V get(Object key) {  
2 Node<K, V> e;  
3 return (e = getNodehashCode(key), key)) == null ? null : e.value;  
4 }
```

【getNode(int hash,Pbject key)】

```txt
1 final Node<K,V> getNode(int hash, object key) {
2     Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
3         // table已经初始化，长度大于0，根据hash寻找table中的项也不为空
4         if ((tab = table) != null && (n = tab.length) > 0 && 
5             (first = tab[(n - 1) & hash]) != null) {
6             // 桶中第一项(数组元素)相等
7             if (first.key == hash && // always check first node
8             ((k = first.key) == key || (key != null && key.equals(k)))) 
9             return first;
10         // 桶中不止一个结点
11         if ((e = first.next) != null) {
12         // 为红黑树结点
13         if (first instanceofTreeNode)
14         // 在红黑树中查找
15         return ((TreeNode<K,V>)first).getTreeNode(key, key);
16         // 否则，在链表中查找
17         do {
18         if (e.key == hash && 
19         ((k = e.key) == key || (key != null && key.equals(k)))) 
20         return e;
21         } while ((e = e.next) != null);
22
23
24
25
return null;
```

25}

HashMap并没有直接提供getNode接口给用户调用，而是提供的get函数，而get函数就是通过getNode来取得元素的。

# 【resize方法】

```diff
1 final Node<K,V>[ ] resize() {  
2 // 当前table保存  
3 Node<K,V>[ ] oldTab = table;  
4 // 保存table大小  
5 int oldCap = (oldTab == null) ? 0 : oldTab.length;  
6 // 保存当前阈值  
7 int oldThr = threshold;  
8 int newCap, newThr = 0;  
9 // 之前table大小大于0  
10 if (oldCap > 0) {  
11 // 之前table大于最大容量  
12 if (oldCap >= MAXIMUM_CAPACITY) {  
13 // 阈值为最大整形  
14 threshold = Integer.MAX_VALUE;  
15 return oldTab;  
16 }  
17 // 容量翻倍，使用左移，效率更高  
18 else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && oldCap >= DEFAULT_INITIAL_CAPACITY)  
19 // 阈值翻倍  
20 newThr = oldThr << 1; // double threshold  
21 }  
22 // 之前阈值大于0  
23 else if (oldThr > 0)  
24 newCap = oldThr;  
25 // oldCap = 0 并且 oldThr = 0，使用缺省值（如使用 HashMap()构造函数，之后再插入一个元素会调用resize函数，会进入这一步）  
26 if (newCap = DEFAULT_INITIAL_CAPACITY);  
27 else {  
28 newCap = DEFAULT_INITIAL_CAPACITY;  
29 newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);  
30 }  
31 // 新阈值为0  
32 if (newThr == 0) {  
33 float ft = (float) newCap * loadFactor;  
34 newThr = (newCap < MAXIMUM_CAPACITY && ft < (float) MAXIMUM_CAPACITY?  
35 (int)ft : Integer.MAX_VALUE);  
36 }  
37 threshold = newThr;  
38 @SuppressWarnings({"rawtypes", "unchecked"})  
39 // 初始化table  
40 Node<K,V>[ ] newTab = (Node<K,V>[ ]) new Node[新规];  
41 table =新规;  
42 // 之前的table已经初始化过  
43 if (oldTab != null) {  
44 // 复制元素，重新进行hash  
45 for (int j = 0; j < oldCap; ++j) {  
46 Node<K,V> e;  
47 if ((e = oldTab[j]) != null) {  
48 oldTab[j] = null;  
49 if (e.next == null)
```

```txt
50 newTab[ehash & (newCap - 1)] = e; else if (e instanceof TreeNode) ((TreeNode<K, V>)e).split(this, newVal, j, oldCap); else { // preserve order Node<K, V> loHead = null, loTail = null; Node<K, V> hiHead = null, hiTail = null; Node<K, V> next; //将同一桶中的元素根据(e hash & oldCap)是否为0进行分割，分成两个不同的链表，完成rehash do { next = e.next; if ((e hash & oldCap) == 0) { if (loTail == null) loHead = e; else loTail.next = e; loTail = e; } else { if (hiTail == null) hiHead = e; else hiTail.next = e; hiTail = e; } while ((e = next) != null); if (loTail != null) { loTail.next = null; newVal[j] = loHead; } if (hiTail != null) { newVal[j + oldCap] = hiHead; } } } } } } } } } }
```

进行扩容，会伴随着一次重新hash分配，并且会遍历hash表中所有的元素，是非常耗时的。在编写程序中，要尽量避免resize。

在resize前和resize后的元素布局如下:

[  
![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319824.jpg)  
上图只是针对了数组下标为2的桶中的各个元素在扩容后的分配布局，其他各个桶中的元素布局可以以此类推。

# 4总结

# 【关于数组扩容】

从putVal源代码中我们可以知道，当插入一个元素的时候size就加1，若size大于threshold的时候，就会进行扩容。假设我们的capacity大小为32，loadFator为0.75，则threshold为  $24 = 32 * 0.75$

此时，插入了25个元素，并且插入的这25个元素都在同一个桶中，桶中的数据结构为红黑树，则还有31个桶是空的，也会进行扩容处理，其实，此时，还有31个桶是空的，好像似乎不需要进行扩容处理，但是是需要扩容处理的，因为此时我们的capacity大小可能不适当。我们前面知道，扩容处理会遍历所有的元素，时间复杂度很高；前面我们还知道，经过一次扩容处理后，元素会更加均匀的分布在各个桶中，会提升访问效率。所以，说尽量避免进行扩容处理，也就意味着，遍历元素所带来的坏处大于元素在桶中均匀分布所带来的好处。

# 【总结】

1. 要知道hashMap在JDK1.8以前是一个链表散列这样一个数据结构，而在JDK1.8以后是一个数组加链表加红黑树的数据结构。
2. 通过源码的学习，hashMap是一个能快速通过key获取到value值得一个集合，原因是内部使用的是hash查找值得方法。

# 迭代器

所有实现了Collection接口的容器类都有一个iterator方法用以返回一个实现Iterator接口的对象

狂神社群笔记资料，禁止外传，本人QQ：24736743

Iterator对象称作为迭代器，用以方便的对容器内元素的遍历操作，Iterator接口定义了如下方法：

- boolean hashNext();//判断是否有元素没有被遍历
- Object next();//返回游标当前位置的元素并将游标移动到下一个位置
- void remove();//删除游标左边的元素，在执行完next之后该操作只能执行一次

# 问题：何遍历Map集合呢？

分析：

# 方法1：通过迭代器Iterator实现遍历

- 获取Iterator : Collection 接口的iterator()方法
- Iterator的方法：

boolean.hasNext(): 判断是否存在另一个可访问的元素  
○ Object next(): 返回要访问的下一个元素

```txt
1 Set keys  $\equiv$  dogMap.keySet(); //取出所有key的集合  
2 Iterator it  $\equiv$  keys.iterator(); //获取Iterator对象  
3 while(it.hasNext()){  
4 String key  $\equiv$  (String)it.next(); //取出key  
5 Dog dog  $\equiv$  (Dog) dogMap.get(key); //根据key取出对应的值  
6 System.out.println(key+""\t"+dog.getStrain());  
7 }
```

# 方法2：增强for循环

```txt
1 for(元素类型t 元素变量x : 数组或集合对象) {
2 引用了x的java语句
3 }
```

# 泛型

Java泛型（generics）是JDK5中引入的一个新特性，泛型提供了编译时类型安全检测机制，该机制允许程序员在编译时检测到非法的类型。

# 泛型的本质是参数化类型，也就是说所操作的数据类型被指定为一个参数。

如何解决以下强制类型转换时容易出现的异常问题？

List的get(int index)方法获取元素

Map的get(Object key)方法获取元素

Iterator的next()方法获取元素

分析：通过泛型，JDK1.5使用泛型改写了集合框架中的所有接口和类

[

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319825.jpg)

[

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128232319826.jpg)

？通配符：<？>

# Collections工具类

【前言】

Java提供了一个操作Set、List和Map等集合的工具类：Collections，该工具类提供了大量方法对集合进行排序、查询和修改等操作，还提供了将集合对象置为不可变、对集合对象实现同步控制等方法。

这个类不需要创建对象，内部提供的都是静态方法。

# 1、Collectios概述

java.util

# 类 Collections

[java.lang.Object

java.util.Collections

public class Collections

此类完全由在 collection 上进行操作或返回 collection 的静态方法组成。它包含在 collection 上操作的多态算法，即“包装器”，包装器返回由指定
collection 支持的新 collection，以及少数其他内容。如果为此类的方法所提供的 collection 或类对象为 null，则这些方法都将抛出
Null一直处于状态。

# 2、排序操作

【方法】

```txt
1）static void reverse(List<?> list):反转列表中元素的顺序。2）static void shuffle(List<?> list)：对List集合元素进行随机排序。3）static void sort(List<T> list)根据元素的自然顺序对指定列表按升序进行排序4）staticvoidsort(List<T>list，Comparator<?superT>c）：根据指定比较器产生的顺序对指定列表进行排序。5）staticvoid swap(List<？>list,inti,intj)在指定List的指定位置i,j处交换元素。6）static void rotate(List<？> list,int distance)当distance为正数时，将List集合的后distance个元素“整体”移到前面；当distance为负数时，将list集合的前distance个元素“整体”移到后边。该方法不会改变集合的长度。
```

【演示】

```java
import java.util.ArrayList;
import java.util.Collections;
public class CollectionsTest {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();
        list.add(3);
        list.add(-2);
        list.add(9);
        list.add(5);
        list.add(-1);
        list.add(6);
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

```txt
14 //输出：[3，-2，9，5，-1，6]  
15 System.out.println(list);  
16 //集合元素的次序反转  
17 collections.reverse(list);  
18 //输出：[6，-1，5，9，-2，3]  
19 System.out.println(list);  
20  
21 //排序：按照升序排序  
22 Collections.sort(list);  
23 //[-2，-1，3，5，6，9]  
24 System.out.println(list);  
25  
26 //根据下标进行交换  
27 Collections_swap(list，2，5);  
28 //输出：[-2，-1，9，5，6，3]  
29 System.out.println(list);  
30  
31 /*//随机排序  
32 Collections.Shuffle(list);  
33 //每次输出的次序不固定  
34 System.out.println(list);*/  
35  
36 //后两个整体移动到前边  
37 Collections rotations(list，2);  
38 //输出：[6，9，-2，-1，3，5]  
39 System.out.println(list);  
40 }  
41 }  
42 }
```

# 3、查找、替换操作

# 【方法】

```txt
1）static<T> int binarySearch(List<? extends Comparable<? super T>> list，Tkey) 使用二分搜索法搜索指定列表，以获得指定对象在List集合中的索引。 注意：此前必须保证List集合中的元素已经处于有序状态。   
2）staticobjectmax(Collectioncoll) 根据元素的自然顺序，返回给定collection的最大元素。   
3）staticobjectmax(Collectioncoll,Comparator comp): 根据指定比较器产生的顺序，返回给定collection的最大元素。   
4）static object min(Collection coll): 根据元素的自然顺序，返回给定collection的最小元素。   
5）staticobjectmin(Collection coll,Comparator comp):
```

狂神社群笔记资料，禁止外传，本人QQ：24736743

```txt
根据指定比较器产生的顺序，返回给定 collection 的最小元素。  
6）static <T> void fill(List<? super T> list, T obj)：使用指定元素替换指定列表中的所有元素。  
7）static int frequency(Collection<? c, Object o)返回指定 collection 中等于指定对象的出现次数。  
8）static int indexOfSubList(List<? source, List<? target)：返回指定源列表中第一次出现指定目标列表的起始位置；如果没有出现这样的列表，则返回-1。9）static int lastIndexOfSubList(List<? source, List<? target)返回指定源列表中最后一次出现指定目标列表的起始位置；如果没有出现这样的列表，则返回-1。10）static <T> boolean replaceAll(List<T> list, T oldVal, T newVal)使用一个新值替换List对象的所有旧值oldVal
```

【演示：实例使用查找、替换操作】

```java
import java.util.ArrayList;   
import java.util.Collections;   
public class CollectionsTest1 { public static void main(String[] args) { ArrayList list  $=$  new ArrayList(); list.add(3); list.add(-2); list.add(9); list.add(5); list.add(-1); list.add(6); //[3，-2，9，5，-1，6] System.out.println(list);   
//输出最大元素9 System.out.println(Collection.max(list));   
//输出最小元素：-2 System.out.println(Collection.min(list));   
//将list中的-2用1来代替 System.out.println(Collection.replaceAll(list，-2，1)); //[3，1，9，5，-1，6] System.out.println(list);   
list.add(9); //判断9在集合中出现的次数，返回2 System.out.println(Collection frequency(list，9));   
//对集合进行排序 collections.sort(list); //[-1，1，3，5，6，9，9] System.out.println(list);   
//只有排序后的List集合才可用二分法查询，输出2 System.out.println(CollectionbinarySearch(list,3));
```

```txt
37 }   
38 1
```

# 4、同步控制

Collectons提供了多个synchronizedXxx()方法·，该方法可以将指定集合包装成线程同步的集合，从而解决多线程并发访问集合时的线程安全问题。

正如前面介绍的HashSet，TreeSet，ArrayList,LinkedList, HashMap, TreeMap都是线程不安全的。Collections提供了多个静态方法可以把他们包装成线程同步的集合。

【方法】

```txt
1) static <T> Collection<T> synchronizedCollection(Collection<T> c)  
返回指定 collection 支持的同步（线程安全的）collection。  
2) static <T> List<T> synchronizedList(List<T> list)  
返回指定列表支持的同步（线程安全的）列表。  
3) static <K,V> Map<K,V> synchronizedMap(Map<K,V>m)  
返回由指定映射支持的同步（线程安全的）映射。  
4) static <T> Set<T> synchronizedSet(Set<T>s)  
返回指定 set 支持的同步（线程安全的）set。
```

【实例】

```java
import java.util.*;
public class TestSynchronized
{
    public static void main(String[] args)
    {
        //下面程序创建了四个同步的集合对象
        Collection c = Collections.synchronizedCollection(new ArrayList());
        List list = Collections.synchronizedList(new ArrayList());
        Set s = Collections.synchronizedSet(newHashSet());
        Map m = Collections.synchronizedMap(new HashMap());
    }
}
```

# 5、Collesction设置不可变集合

【方法】

```txt
1）emptyxxx()返回一个空的、不可变的集合对象，此处的集合既可以是List，也可以是Set，还可以是Map。2）singletonxxx():返回一个只包含指定对象（只有一个或一个元素）的不可变的集合对象，此处的集合可以是：List，Set，Map。3）unmodifiablexxx():返回指定集合对象的不可变视图，此处的集合可以是：List，Set，Map。
```

上面三类方法的参数是原有的集合对象，返回值是该集合的“只读”版本。

# 【实例】

```java
import java.util.*;   
public class TestUnmodifiable   
{ public static void main(String[] args) { //创建一个空的、不可改变的List对象 List<String> unmodifiableList  $=$  Collections.emptyList(); //unmodifiableList.add("java"); //添加出现异常：java.lang.UnsupportedOperationException System.out.println(unmodifiableList);//[] //创建一个只有一个元素，且不可改变的Set对象 Set unmodifiableSet  $=$  Collectionssingleton("Struts2权威指南"); //[Struts2权威指南] System.out.println(unmodifiableSet); //创建一个普通Map对象 Map scores  $=$  new HashMap(); scores.put("语文"，80); scores.put("Java"，82); //返回普通Map对象对应的不可变版本 Map unmodifiableMap  $=$  Collections.unmodifiableMap(scores); //下面任意一行代码都将引发UnsupportedOperationException异常 unmodifiableList.add("测试元素"); unmodifiableSet.add("测试元素"); unmodifiableMap.put("语文",90); }   
1
```

# 总结和测试

【JavaBean】

实体类：Pojo

```txt
1 import java.text.Format;   
2 import java.text.Exception;   
3 import java.textSimpleDateFormat;
```

```java
import java.util.Date;   
public class Employee { //Javabean, Enter实体类 private int id; private String name; private int salary; private String department; private Date hireDate; public Employee(int id, String name, int salary, String department, String hireDate) { super(); this.id = id; this.name = name; this_salary = salary; this.departmentDepartment = department; Calendar format = new SimpleDateFormat("yyyy-MM"); try { this.hireDate = format.parse(hireDate); } catch (ParseException e) { e.printStackTrace(); } public int getId() { return id; } public void setId(int id) { this.id = id; } public String getName() { return name; } public void setName(String name) { this.name = name; } public int getName() { return salary; } public void setSalary(int salary) { this_salary = salary; } public String getDepartment() { return department; } public void setDepartment(String department) { this.departmentDepartment = department; } public Date getHireDate() { return hireDate; } public void setHireDate(Date hireDate) { this=hireDate = hireDate; }
```

62}

【测试类代码如下】

```java
import java.util.ArrayList;   
import java.util.List;   
public class Test01 { public static void main(String[] args) throws Exception { //一个对象对应了一行记录！ Employee e = new Employee(0301,"狂神",3000,"项目部","2017-10"); Employee e2 = new Employee(0302,"小明",3500,"教学部","2016-10"); Employee e3 = new Employee(0303,"小红",3550,"教学部","2016-10"); List<Employee> list = new ArrayList<Employee>(); list.add(e); list.add(e2); list.add(e3); printEmpName(list); } public static void printEmpName(List<Employee> list){ for(int i=0;i<list.size();i++){ System.out.println(list.get(i).getName()); } } }
```
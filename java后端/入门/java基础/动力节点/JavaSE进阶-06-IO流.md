# 1. 纲要

a) Java流概述  
b) 文件流  
c) 缓冲流  
d) 转换流  
e) 打印流  
f) 对象流  
g) File 类  
h)zip格式

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522861.jpg)  
InputStream 和 OutputStream 继承结构图:

Reader 和 Writer 继承结构图:

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522862.jpg)

# 2. 内容

# 1.1 Java 流概述

文件通常是由一连串的字节或字符构成，组成文件的字节序列称为字节流，组成文件的字符序列称为字符流。Java中根据流的方向可以分为输入流和输出流。输入流是将文件或其它输入设备的数据加载到内存的过程；输出流恰恰相反，是将内存中的数据保存到文件或其他输出设备，详见下图：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522863.jpg)

文件是由字符或字节构成，那么将文件加载到内存或再将文件输出到文件，需要有输入和输出流的支持，那么在 Java
语言中又把输入和输出流分为了两个，字节输入和输出流，字符输入和输出流，见下表：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522864.jpg)

# 1.1.1 InputStream(字节输入流)

InputStream 是字节输入流，InputStream 是一个抽象类，所有继承了 InputStream 的类都是字节输入流，主要了解以下子类即可：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522865.jpg)

主要方法介绍：

<table><tr><td>void</td><td>close()</td><td>关闭此输入流并释放与该流关联的所有系统资源。</td></tr><tr><td>abstract int</td><td>read()</td><td>从输入流读取下一个数据字节。</td></tr><tr><td>int</td><td>read(byte[] b)</td><td>从输入流中读取一定数量的字节并将其存储在缓冲区数组b中。</td></tr></table>

int read(byte[] b, int off, int len)

将输入流中最多len个数据字节读入字节数组。

# 1.1.2 InputStream(字节输出流)

所有继承了 InputStream 都是字节输出流

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522866.jpg)

主要方法介绍

<table><tr><td>void</td><td>close()关闭此输出流并释放与此流有关的所有系统资源。</td></tr><tr><td>void</td><td>flush()刷新此输出流并强制写出所有缓冲的输出字节。</td></tr><tr><td>void</td><td>write(byte[] b)将b.length个字节从指定的字节数组写入此输出流。</td></tr><tr><td>void</td><td>write(byte[] b, int off, int len)将指定字节数组中从偏移量off开始的len个字节写入此输出流。</td></tr><tr><td>abstract void</td><td>write(int b)</td></tr><tr><td colspan="2">将指定的字节写入此输出流。</td></tr></table>

# 1.1.3 Reader(字符输入流)

所有继承了 Reader 都是字符输如流

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522867.jpg)

主要方法介绍

<table><tr><td>abstract void</td><td>close()关闭该流。</td></tr><tr><td>int</td><td>read()读取单个字符。</td></tr><tr><td>int</td><td>read(char[] cbuf)将字符读入数组。</td></tr><tr><td>abstract int</td><td>read(char[] cbuf, int off, int len)将字符读入数组的某一部分。</td></tr></table>

# 1.1.4 Writer(字符输出流)

所有继承了 Writer 都是字符输出流

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522868.jpg)

主要方法介绍

<table><tr><td>Writer</td><td>append(char c)将指定字符追加到此 writer。</td></tr><tr><td>abstract void</td><td>close()关闭此流,但要先刷新它。</td></tr><tr><td>abstract void</td><td>flush()刷新此流。</td></tr><tr><td>void</td><td>write(char[] cbuf)写入字符数组。</td></tr><tr><td>abstract void</td><td>write(char[] cbuf, int off, int len)写入字符数组的某一部分。</td></tr><tr><td>void</td><td>write(int c)写入单个字符。</td></tr><tr><td>void</td><td>write(String str)写入字符串。</td></tr><tr><td>void</td><td>write(String str, int off, int len)写入字符串的某一部分。</td></tr></table>

# 1.2 文件流

文件流主要分为：文件字节输入流、文件字节输出流、文件字符输入流、文件字符输出流

# 1.2.1 InputStream(文件字节输入流)

FileInputStream 主要按照字节方式读取文件，例如我们准备读取一个文件，该文件的名称为 test.txt

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522869.jpg)

# 【示例代码】

```java
import java.io.*;   
public class FileInputStreamTest01{ public static void main(String[] args){ InputStream is  $=$  null; try{ is  $=$  new FileInputStream("c:\\test.txt"); int  $\mathbf{b} = 0$  while  $(\mathrm{(b = is.read()})! = -1)$  { //直接打印
```

```java
//System.out.print(b); //输出字符 System.out.print((char)b); } }catch(FileNotFoundException e) { e.printStackTrace(); }catch(IOException e) { e.printStackTrace(); }finally { try { if (is != null) { is.close(); } } } catch(IOException e) {} } }
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522870.jpg)

文件可以正确的读取，但是我们的汉字乱码了，原因在于使用了字节输入流，它是一个字节一个字节读取的，而汉字是两个字节，所以读出一个字节就打印，那么汉字是不完整的，所以就乱码了

# 1.2.2FileOutputStream(文件字节输出流)

FileOutputStream 主要按照字节方式写文件，例如：我们做文件的复制，首先读取文件，读取后在将该文件另写一份保存到磁盘上，这就完成了备份

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522871.jpg)

# 【示例代码】

import java.io.*;

public class FileOutputStreamTest01 {

```java
public static void main(String[] args) { InputStream is  $=$  null; OutputStream os  $=$  null; try{ is  $=$  new FileInputStream("c:\\test.txt"); os  $=$  new FileInputStream("d:\\test.txt.bak"); int  $\mathrm{b} = 0$  while  $(\mathrm{(b = is.read()})! = -1)$  { os.write(b); } System.out.println("文件复制完毕！"); }catch(FileNotFoundException e){ e.printStackTrace();
```

```java
}catch(IOException e) { e.printStackTrace(); }finally { try { if (is != null) { is.close(); } if (os != null) { os.close(); } } catch(IOException e) {} } }
```

# 1.2.3FileReader(文件字符输入流)

FileReader 是一字符为单位读取文件，也就是一次读取两个字节，如：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522872.jpg)

【示例代码】

```java
import java.io.*;   
public class FileReaderTest01 { public static void main(String[] args){ Reader  $\mathbf{r} =$  null;
```

```txt
try{ r  $=$  newFileReader("c:\\test.txt"); int  $\mathrm{b} = 0$  while  $(\mathrm{b} = \mathrm{r}.$  read(）！=-1）{//输出字符 System.out.print((char)b); } catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally{ try{ if(r！  $=$  null）{ r.close(); } } catch(IOException e){ } }
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522873.jpg)

因为采用了字符输入流读取文本文件，所以汉字就不乱吗了，因为一次读取两个字节（即一个字符）

# 1.2.4 FileWriter(文件字符输出流)

【代码示例】

import java.io.*;

```txt
public static void main(String[] args) {   
    Writer w = null;   
    try { //以下方式会将文件的内容进行覆盖 //w = new FileWriter("c:\\test.txt"); //w = new FileWriter("c:\\test.txt", false); //以下为 true 表示，在文件后面追加 w = new FileWriter("c:\\test.txt", true); w.write("你好你好！！！！"); //换行 w.write("\\n"); }catch(FileNotFoundException e) { e.printStackTrace(); }catch(IOException e) { e.printStackTrace(); }finally { try { if (w != null){ w.close(); } } catch(IOException e) {} } }
```

# 1.3缓冲流

缓冲流主要是为了提高效率而存在的，减少物理读取次数，缓冲流主要有：BufferedInputStream、BufferedOutputStream、BufferedReader、BufferedWriter，并且
BufferedReader 提供了实用方法readLine()，可以直接读取一行，BufferWriter 提供了 newLine()可以写换行符。

# 1.3.1 采用字节缓冲流改造文件复制代码

示例如下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522874.jpg)

【示例代码】

```java
import java.io.*;   
public class BufferedStreamTest01 { public static void main(String[] args) { InputStream is  $=$  null; OutputStream os  $=$  null; try { is  $=$  new BufferedInputStream( new FileInputStream("c:\\test.txt)); os  $=$  new BufferedOutputStream( new FileInputStream("d:\\test.txt.bak")); int  $\mathtt{b} = 0$  while  $(\mathrm{(b = is.read()})! = -1)$  { os.write(b); } //手动调用flush，将缓冲区中的内容写入到磁盘 //也可以不用手动调用，缓存区满了自动回清楚了 //而当输出流关闭的时候也会先调用flush os.flush(); System.out.println("文件复制完毕！"); }catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally { try { if (is != null) {
```

```txt
is.close(); } if(os != null){ //在close前会先调用flush os.close(); } }catch(IOException e){ 1 } 1
```

//可以显示的调用 flush，flush 的含义是刷新缓冲区,也就是将缓存区中的数据写到磁盘上，不再放到内存里了,在执行 os.close()
时，其实默认执行了 os.flush(),我们在这里可以不用显示的调用

# 1.3.2 采用字符缓冲流改造文件复制代码

```txt
import java.io.*;   
public class BufferedReaderTest01 { public static void main(String[] args) { BufferedReader r  $=$  null; BufferedReader w  $=$  null; try{  $\mathrm{r} =$  new BufferedReader(newFileReader("c:\\test.txt));  $\mathrm{w} =$  new BufferedReader(newFileWriter("d:\\test.txt.bak")); String s  $=$  null; while  $(\mathrm{(s = r.readLine()}$ $! =$  null）{ w.write(s);
```

```java
//w.write("\n"); //可以采用如下方法换行 wLine(); } System.out.println("文件复制完毕！"); }catch(FileNotFoundException e) { e.printStackTrace(); }catch(IOException e) { e.printStackTrace(); }finally { try { if (r != null) { r.close(); } if (w != null) { //在close前会先调用flush w.close(); } } catch(IOException e){ } } }
```

# 1.4转换流

转换流主要有两个 InputStream 和 OutputStreamWriter

- InputStream主要是将字节流输入流转换成字符输入流
- OutputStreamWriter 主要是将字节流输出流转换成字符输出流

# 1.4.1 InputStreamReader

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522875.jpg)

【示例代码】，对 FileInputStreamTest01.java 进行改造，使用字符流

```txt
import java.io.*;   
public class InputStreamReaderTest01 { public static void main(String[] args) { BufferedReader br  $=$  null; try{ br  $=$  new BufferedReader( new InputStreamReader( new FileInputStream("c:\\test.txt")); String s  $=$  null; while  $(\mathrm{s} =$  br.readLine()) != null){ System.out.println(s); } catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally{ try{ if (br  $! =$  null){ br.close(); } } catch(IOException e){ }
```

```txt
} 1 1
```

# 1.4.2 OutputStreamWriter

```java
import java.io.*;   
public class OutputStreamWriterTest01 { public static void main(String[] args) { BufferedReader bw  $=$  null; try{ bw  $=$  new BufferedReader( new OutputStreamWriter( new FileInputStream("c:\\603.txt")); bw.write("asdfsdfsdf"); bw.newLine(); bw.write("风光风光风光好"); }catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally{ try{ if (bw  $\coloneqq$  null）{ bw.close(); } } catch(IOException e){ }
```

```txt
1 1
```

# 1.5打印流

打印流主要包含两个：PrintStream 和(PrintWriter，分别对应字节流和字符流

# 1.5.1 完成屏幕打印的重定向

System.out 其实对应的就是 InputStream，默认输出到控制台，我们可以重定向它的输出，可以定向到文件，也就是执行
System.out.println("hello") 不输出到屏幕，而输出到文件

# 【示例代码】

```java
import java.io.\*;   
public class InputStreamTest01{ public static void main(String[] args){ OutputStream os  $=$  null; try{ os  $=$  new FileInputStream("c:/console.txt"); System.out(new网络传播(os)); System.out.println("asdfkjfd;llfdfdfdrerere"); }catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally{ try{ if (os  $! =$  null） { os.close(); 1
```

```txt
}catch(IOException e){ } 1 1 1
```

# 1.5.2 接受屏幕输入

# 【示例代码】

System.in 可以接收屏幕输入

```java
import java.io.*;   
public class PrintStreamTest02 { public static void main(String[] args) { BufferedReader br  $=$  null; try{ br  $=$  new BufferedReader( new InputStreamReader(System.in)); String s  $=$  null; while  $(\mathrm{(s = br.readLine() != null)}$  { System.out.println(s); //为q退出循环 if("q".equals(s)) { break; } } catch(FileNotFoundException e){ e.printStackTrace();
```

```java
}catch(IOException e) { e.printStackTrace(); }finally { try { if (br != null) { br.close(); } } catch(IOException e) {} } }
```

# 1.6 对象流

对象流可以将 Java 对象转换成二进制写入磁盘，这个过程通常叫做序列化，并且还可以从磁盘读出完整的 Java 对象，而这个过程叫做反序列化。

对象流主要包括：ObjectInputStream 和 ObjectOutputStream

# 1.6.1 如何实现序列化和反序列化

如果实现序列化该类必须实现序列化接口 java.io.Serializable，该接口没有任何方法，该接口只是一种标记接口，标记这个类是可以序列化的

$\bullet$  序列化

```java
import java.io.\*;   
public class ObjectStreamTest01 { public static void main(String[] args) { ObjectOutputStream oos  $=$  null; try{ oos  $\equiv$  new ObjectOutputStream( new FileOutputStream("c:/Person.dat"));
```

```groovy
Person person = new Person();  
person.name = "张三";  
oos.writeObject(person);  
}catch(FileNotFoundException e) {  
    e.printStackTrace();  
}catch(IOException e) {  
    e.printStackTrace();  
}finally {  
    try {  
        if (oos != null) {  
            oos.close();  
        }  
    } catch(IOException e) {}  
}  
class Person {  
String name;  
}
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522876.jpg)

不能序列化，对序列化的类是有要求的，这个序列化的类必须实现一个接口Serializable，这个接口没有任何方法声明，它是一个标识接口，如：java中的克隆接口Cloneable,也是起到了一种标识性的作用

$\bullet$  序列化

```javascript
import java.io.*;
```

```java
public class InputStreamTest02 { public static void main(String[] args) { ObjectOutputStream oos = null; try { oos = new ObjectOutputStream( new FileInputStream("c:/Person.dat")); Person person = new Person(); person.name = "张三"; oos.writeObject(person); }catch(FileNotFoundException e) { e.printStackTrace(); }catch(IOException e) { e.printStackTrace(); }finally { try { if (oos != null) { oos.close(); } } catch(IOException e) {} } //实现序列化接口 class Person implementsSerializable { String name; }
```

以上可以完成序列化

- 反序列化

```txt
import java.io.\*;   
public class InputStreamTest03{ public static void main(String[] args){ ObjectInputStream ois  $=$  null; try{ ois  $\equiv$  new ObjectInputStream( new FileInputStream("c:/Person.dat"）); //反序列化 Person person  $=$  (Person)ois.readObject(); System.out.println(person.name); }catch(ClassNotFoundException e){ e.printStackTrace(); }catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally{ try{ if(ois  $! =$  null）{ ois.close(); } } catch(IOExceptione){ } }
```

```txt
//实现序列化接口  
class Person implementsSerializable{  
    String name;  
}
```

# 1.6.2 关于 transient 关键字

```java
import java.io.\*;   
public class ObjectStreamTest04{ public static void main(String[] args){ writeObject(); readObject(); } private static void readObject() { InputStream ois  $=$  null; try{ ois  $=$  new ObjectInputStream( new FileInputStream("c:/Person.dat")); //反序列化 Person person  $=$  (Person)ois.readObject(); System.out.println(person.name); System.out.println(person.age); }catch(ClassNotFoundException e){ e.printStackTrace(); }catch(FileNotFoundException e){ e.printStackTrace();
```

```java
}catch(IOException e) { e.printStackTrace(); }finally { try { if (ois != null) { ois.close(); } } catch(IOException e) {} } private static void writeObject() { ObjectOutputStream oos = null; try { oos = new ObjectOutputStream( new OutputStream("c:/Person.dat")); Person person = new Person(); person.name = "张三"; person.age = 20; oos.writeObject(person); }catch(FileNotFoundException e) { e.printStackTrace(); }catch(IOException e) { e.printStackTrace(); }finally { try { if (oos != null) { oos.close(); } }
```

```txt
}catch(IOException e){} } //实现序列化接口 class Person implements Serializable{ String name; //采用 transient 关键字修饰此属性，序列化时会忽略 transient int age; 1
```

# 1.6.3 关于serialversionUID属性

【示例代码】，在 person 中加入一个成员属性 sex，然后在读取 person.dat 文件

```java
import java.io.*;   
public class ObjectStreamTest05 { public static void main(String[] args) { //writeObject(); readObject(); } private static void readObject() {
```

```txt
ObjectInputStream ois = null;  
try {  
    ois = new ObjectInputStream(  
        new FileInputStream("c:/Person.dat"));  
//反序列化  
Person person = (Person)ois.readObject();  
System.out.println(person.name);  
System.out.println(person.age);  
} catch(ClassNotFoundException e) {  
    e.printStackTrace();  
} catch(FileNotFoundException e) {  
    e.printStackTrace();  
} catch(IOException e) {  
    e.printStackTrace();  
}finally {  
    try {  
        if (ois != null) {  
            ois.close();  
        }  
    } catch(IOException e) {}  
}  
}
```

```javascript
person.name  $=$  "张三"; person.age  $= 20$  oos.writeObject(person); }catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally { try{ if (oos != null) { oos.close(); } } catch(IOException e){ } } \*/   
//实现序列化接口 class Person implementsSerializable{ String name; int age; boolean sex;
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522877.jpg)

错误的原因：在序列化存储 Person 时，他会为该类生成一个 serialVersionUID= -6120276268074674235，而我们在该类中加入了一个 sex
属性后，那么在使用的时候他就会为该类生成一个新的 serialVersionUID= 1923863382018150382，这个两个 UID（-6120276268074674235
和 1923863382018150382）不同，所以 Java 认为是不兼容的两个类。如果解决呢？

通常在实现序列化的类中增加如下定义：

static final long serialVersionUID  $=$  -111111111111111111L;

如果在序列化类中定义了成员域serialVersionUID，系统会把当前serialVersionUID成员域的值作为类的序列号（类的版本号），这样不管你的类如何升级，那么他的序列号（版本号）都是一样的，就不会产生类的兼容问题。

【代码示例】，解决序列化版本冲突的问题

```java
import java.io.*;   
public class ObjectStreamTest06 { public static void main(String[] args) { //writeObject(); readObject(); } private static void readObject() { ObjectInputStream ois  $=$  null; try{ ois  $=$  new ObjectInputStream(
```

```java
new FileInputStream("c:/Person.dat"); //反序列化 Person person = (Person)ois.readObject(); System.out.println(person.name); System.out.println(person.age); }catch(ClassNotFoundException e) { e.printStackTrace(); }catch(FileNotFoundException e) { e.printStackTrace(); }catch(IOException e) { e.printStackTrace(); }finally { try { if (ois != null) { ois.close(); } } catch(IOException e) {} } } private static void writeObject() { ObjectOutputStream oos = null; try { oos = new ObjectOutputStream( new FileInputStream("c:/Person.dat")); Person person = new Person(); person.name = "张三"; person.age = 20; oos.writeObject(oos);
```

```java
}catch(FileNotFoundException e) { e.printStackTrace(); }catch(IOException e) { e.printStackTrace(); }finally { try { if (oos != null) { oos.close(); } } catch(IOException e) {} } //实现序列化接口 class Person implementsSerializable{ //加入版本号，防止序列化兼容问题 private static final long serialversionUID = -111111111111111111L; String name; int age; boolean sex; }
```

以上不再出现序列化的版本问题，因为他们有统一的版本号：-1111111111111111111L

# 进一步理解一下serialversionUID

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522878.jpg)

【代码示例】，将 Person 的版本号修改为-1111111111111111222L，该客户端与服务器通信会出现序列化版本兼容问题

```java
import java.io.*;   
public class ObjectStreamTest07 { public static void main(String[] args) { //writeObject(); readObject(); }
```

```java
private static void readObject() { ObjectInputStream ois = null; try { ois = new ObjectInputStream( new FileInputStream("c:/Person.dat")); //反序列化 Person person = (Person)ois.readObject(); System.out.println(person.name); System.out.println(person.age); } catch(ClassNotFoundException e) { e.printStackTrace(); } catch(FileNotFoundException e) { e.printStackTrace(); } catch(IOException e) { e.printStackTrace(); }finally { try { if (ois != null) { ois.close(); } } } catch(IOException e) {} } } private static void writeObject() { ObjectOutputStream oos = null; try { oos = new ObjectOutputStream( new OutputStream("c:/Person.dat")); Person person = new Person();
```

```java
person.name  $=$  "张三"; person.age  $= 20$  oos.writeObject(person); }catch(FileNotFoundException e){ e.printStackTrace(); }catch(IOException e){ e.printStackTrace(); }finally{ try{ if (oos != null) { oos.close(); } } catch(IOException e){ } } //实现序列化接口 class PersonimplementsSerializable{ //加入版本号，防止序列化兼容问题 private static final long serialversionUID  $\equiv$  -11111111111111111222L; String name; int age; }
```

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128233522879.jpg)

serialVersionUID 就和序列化有关

# 1.7 File 类

File 提供了大量的文件操作：删除文件，修改文件，得到文件修改日期，建立目录、列表文件等等。

如何递归读取目录及子目录下的文件

```java
import java.io.*;   
public class FileTest01 { public static void main(String[] args) { file(new File("D:\\share\\03-J2SE\\\\"，0); } //递归读取某个目录及子目录下的所有文件 private static void listing(Filef,int level){ String s  $=$  {" for(inti=0;i<level;i++)}  $\mathrm{s + = " - - "}$  ； } File[] files  $=$  f.listFiles(); for (int i=0;i<files.length;i++){ System.out.println(s+files[i].getName()); if (files[i].isDirectory()){
```

```txt
file files[i], level+1);  
}
```

# 1.8zip格式

参见：

java.util.zip.*包下的api
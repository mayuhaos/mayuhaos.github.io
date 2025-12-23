[//]: # (<A1-JavaSE零基础讲义/>)

# 网络编程:hatching_chick::hatching_chick::hatching_chick:

::: tip 🐣🐣🐣
这一节没时间的话可以不看哦<br>本节主要讲的是socket编程，也就是类似时时通信，微信QQ聊天<br>
我之所以学这节是因为我大二的时候，软件工程课设需要我们做一个“时间同步服务器”，
如下：<br>
[时间回响: 时间回响服务器+GUI (gitee.com)](https://gitee.com/yhstu/time-echo)
<br>
![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/202402061307669.png)
感兴趣可以学一下哦，在web开发工作中使用非常少~
<br/><br/>

- **看完本节配合下一节javaGUI可以开发一个聊天室哦！**
- **<p style="color:red">这一节没时间的话可以不看哦~</p>**

# 1、网络编程概述

# 1.1、概述

Java是Internet上的语言，它从语言级上提供了对网络应用程序的支持，程序员能够很容易开发常见的网络应用程序。Java提供的网络类库，可以实现无痛的网络连接，联网的底层细节被隐藏在Java的本机安装系统里，由JVM进行控制。并且Java实现了一个跨平台的网络库，程序员面对的是一个统一的网络编程环境。

# 计算机网络：

把分布在不同地理区域的计算机与专门的外部设备用通信线路互连成一个规模大，功能强的网络系统，从而使众多的计算机可以方便地互相传递信息，共享硬件，软件，数据信息等资源。

【百度：地球村】在几个世纪之前，你都不敢想你在北京说话，美国都能听到！

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704138.jpg)

# 网络编程的目的：

直接或间接地通过网络协议与其他计算机实现数据交换，进行通讯。

1. 如何准确的定位网络上的一台或多台主机，定位主机上的特定的应用
2. 找到主机后如何可靠高效地进行数据传输

【比喻：信件】

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704140.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704141.jpg)

网络编程！=网页编程（web开发）

B/S架构和C/S架构

# 1.2、网络通信两个要素

# 如何实现网络中的主机互相通信？

通信双方的地址：

- |P
- 端口号

【比如说我们这里上课使用的就是局域网，你们连接到我的电脑，就能查看到我电脑的画面了】一定的规则：（即，网络通信协议，有两套参考模型）

- OSI 参考模型：模型过于理想化，未能在因特网上进行广泛推广！
- TCP/IP 参考模型：TCP/IP协议，事实上的国际标准。

<table><tr><td>OSI参考模型</td><td>TCP/IP参考模型</td><td>TCP/IP参考模型各层对应协议</td></tr><tr><td>应用层</td><td rowspan="3">应用层</td><td rowspan="3">HTTP、FTP、Telnet、DNS...</td></tr><tr><td>表示层</td></tr><tr><td>会话层</td></tr><tr><td>传输层</td><td>传输层</td><td>TCP、UDP、...</td></tr><tr><td>网络层</td><td>网络层</td><td>IP、ICMP、ARP...</td></tr><tr><td>数据链路层</td><td rowspan="2">物理+数据链路层</td><td rowspan="2">Link</td></tr><tr><td>物理层</td></tr></table>

# 数据封装

# 数据拆封

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704142.jpg)

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704143.jpg)

# 小总结：

1. 网络编程中有两个主要的问题：

。如何准确的定位网络上一台或多台主机；定位主机上的特定的应用  
找到主机后如何可靠高效的进行数据传输

2. 网络编程中的两个要素：

ip和端口号  
o 提供网络通信协议。TCP/IP参考模型（应用层，传输层，网络层，物理+数据链路层），

# 1.3、Inet Adders

# ip地址：Inet Addersss

- 唯一的标识 internet 上的计算机（通信实体）
- 本地回环地址 (hostAddress) : 127.0.0.1 主机名 (HostName) : localhost

- IP地址分类方式一：IPV4 - IPV6

o IPV4: 4个字节组成, 4个0~255。大概42亿个, 30亿都在北美, 亚洲4亿。2011年初已经用尽。以点分十进制表示, 如192.168.0.1  
o IPV6: 128位 (16个字节), 写成8个无符号整数, 每个整数用四个十六进制位表示, 数之间用冒号隔开, 如: 2001:0db8:3c4d:0015:
0000:0000:1a2f:1a2b

- IP地址分类方式2：公网地址（万维网使用）和私有地址（局域网使用）。

192.168.开头的就是私有地址，范围即为  $192.168.0.0 \sim 192.168.255.255$ ，专门为组织机构内部使用

- 【查看 JDK 帮助文档=>InetAddress类, 代表IP】

- 特点：不便于记忆，我们常使用域名来访问：www.baidu.com
- https://blog.kuangstudy.com/ => DNS 域名解析（150.109.117.44） => 现在本机的hosts文件，判断是否有输入的域名地址，没有的话，再通过DNS服务器，找主机。

hosts文件地址： c:\windows\system32\drivers\etc\hosts

上代码：InsetAddressTest

```java
package com.kuang学业1;   
import java.net.InetAddress;   
import java.net.UnknownHostException;   
//IP这个东西，怎么用Java对象表示   
public class InetAddressTest{ public static void main(String[] args){ try{ //获得IP地址 InetAddress inetAddresses1  $\equiv$  InetAddress.getName("192.168.8.123"); System.out.printlnINETAddresses1); InetAddressINETAddresses2  $=$  InetAddress.getName("www.baidu.com"); System.out.printlnINETAddresses2); //获取本地IP InetAddressINETAddresses3  $\equiv$  InetAddress.getName("127.0.0.1"); System.out.printlnINETAddresses3); InetAddressINETAddresses4  $\equiv$  InetAddress.getName("localhost"); System.out.printlnINETAddresses4); InetAddressINETAddresses5  $\equiv$  InetAddress.getLocalHost(); System.out.printlnINETAddresses5); //getHostName System.out.printlnINETAddresses2.getHostName()); //getHostAddress System.out.printlnINETAddresses2.getHostAddress(); //Canonical：规范的 System.out.printlnINETAddresses2.getCanonicalHostName()); } catch (UnknownHostException e){ e.printStackTrace(); } }   
}
```

# 1.4、端口号

端口号标识正在计算机上运行的进程（程序）

- 不同的进程有不同的端口号，用来区分软件
- 被规定为一个16位的整数0~65535

- TCP 和 UDP 各有 65535 个端口, 单个协议下端口不能冲突
- 端口分类：

。公认端口：0~1023。被预先定义的服务通信占用端口。

- HTTP 默认端口：80
- HTTPS 默认端口：443  
  FTP默认端口：21  
  Telnet默认端口：23

注册端口：1024~49151、分配给用户进程或应用程序。

tomcat默认端口：8080

- MySQL 默认端口：3306  
  Oracle默认端口：1521

动态、私有端口：49152~65535

1 netstat -ano #查看所有端口  
2 netstat -ano|findstr "6732" #查看指定端口  
3 tasklist|findstr "6732" #查看指定进程  
4 # 使用任务管理器查看PID

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704144.jpg)

早年，QQ叫OICQ，windows本来绑定的MSN，但是当时中国法律也不太明确，微软那边的人就提议，要不要封掉QQ，对于他们来说非常简单，操作系统层面，只需要让QQ安装不成功即可。但是微软想了想，没这么去做，毕竟不好，所以说QQ能起来也是有一定的机遇的，但是QQ起来之后，明白了这个问题，所以说腾讯现在很多行业都是垄断式的，对不对。

端口号与IP地址的组合，得出一个网络套接字：Socket，所以说一些网络编程也被称为Socket编程

```java
1 package com.kuanglesson1;   
2   
3 import java.net.InetAddress;   
4   
5 public class InetAddressAddressTest {   
6 public static void main(String[] args) {   
7 InetAddress socketAddress = new   
8 InetAddress("127.0.0.1",8080);
```

```javascript
8
InetrSocketAddress
socketAddress2 = new
InetrSocketAddress("localhost", 9000);
9
System.out.println(socketAddress.getHostName());
10
System.out.println(socketAddress.getAddress());
11
System.out.println(socketAddress.getPort());
12
System.out.println(socketAddress.getPort());
13
System.out.println(socketAddress2.getHostName());
14
System.out.println(socketAddress2.getAddress(); //返回地址
15
System.out.println(socketAddress2.getPort(); //返回端口
16
}
17
}
18
}
19
```

# 1.5、网络通信协议

协议：就好比我们都说的普通话，大家才能听懂我讲的，但是我们还有自己的方言！

# 网络通信协议：

计算机网络中实现通信必须有一些约定，即通信协议，对速率，传输代码，代码结构，传输控制步骤，出错控制等制定标准。

# 问题：网路协议太复杂？

计算机网络通信涉及内容很多，比如指定源地址和目标地址，加密解密，压缩解压缩，差错控制，流量控制，路由控制，如何实现如此复杂的网络协议呢？

# 通信协议分层的思想

在制定协议时，把复杂成份分解成一些简单的成份，再将他们复合起来。最常用的复合方式是层次方式，即同层间可以通信，上一层调用下一层，而与再下一层不发生关系。各层互不影响，利于系统的开发和扩展。

# TCP/IP协议簇

- 传输层协议中有两个非常重要的协议：

用户传输协议 TCP (Transmission Control Protocol)  
用户数据报协议 (User Datagram Protocol)

- Tcp/IP 以其两个主要协议：传输控制协议：TCP，和网络互联协议：IP，而得名，实际上是一组协议，包括多个具有不同功能且互为关联的协议。
- IP（Internet Protocol）协议是网络层的主要协议，支持网间互联的数据通信。
- TCP/IP协议模型从更实用的角度出发，形成了高效的四层体系结构，即物理链路层，IP层，传输层和应用层

# TCP和UDP对比

- TCP协议

○ 使用TCP协议前，必须建立TCP连接，形成传输数据通道；  
○ 传输前，采用‘三次握手’方式，点对点通信，是可靠的。

o TCP协议进行通信的两个应用进程：客户端，服务端。  
在连接中可进行大数据量的传输  
○ 传输完毕，需要释放已建立的连接，效率低  
○ 举例：打电话

客户端发送syn报文，并置发送序号为X

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704145.jpg)  
TCP三次握手

主动方发送Fin+Ack报文，并置发送序号为X

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704146.jpg)  
TCP四次挥手

被动方发送ACK报文，并直发送序号为Z，在确认序号为X+1

被动方发送Fin+Ack报文，并且发送序号为Y，在确认序号为X

主动方发送ack报文，并直发送序号为x在确认序号为Y

4

${ACK} = Y,{seq} = X$

# UDP协议

将数据，源，目的封装成数据包，不需要建立连接  
每个数据报的大小限制在64K内  
○ 发送方不管对方是否准备好，接收方收到也不确认，故事不可靠的  
。可以广播发送  
发送数据结束时，无需释放资源，开销小，速度快。  
○ 举例：发短信，导弹（饱和攻击）

# 2、TCP网络编程

# 2.1、案例一

需求：客户端发送信息给服务端，服务端将数据显示在控制台上。

```java
package com.kuanglesson2;   
import java.io IOException;   
import java.ioOutputStream;   
import java.net.InetAddress;   
import java.net.Socket;   
import java.netpptUnknownHostException;   
//客户端   
public class TcpClientDemo01 { public static void main(String[] args) { Socket socket  $=$  null; OutputStream os  $=$  null; try { //1. 连接服务器的地址 InetAddress serverIP  $=$  InetAddress.getName("127.0.0.1"); int port  $= 8899$  . //2. 创建一个Socket socket  $=$  new Socket(serverIP,port); //3. 创建一个输出流，向外写东西 os  $=$  socket.getOutputStream(); os.write("你好，欢迎学习狂神说Java".getBytes()); } catch (UnknownException e){ e.printStackTrace(); } catch (IOException e){ e.printStackTrace(); }finally{ //4. 关闭资源 try{ if(os!=null){ os.close(); } if(socket!=null){ socket.close(); } } catch (IOException e){ e.printStackTrace(); } }
```

# 服务端

```java
1 package com.kuanglesson2;   
2   
3 import javax.swing;midi.Soundbank;   
4 import java.io.BytearrayOutputStream;   
5 import java.io.IOException;   
6 import java.io.InputStreamReader;   
7 import java.net ServerSocket;   
8 import java.net.Socket;   
9 import java.util.Base64;   
10   
11 //服务端   
12 public class TcpServerDemo01 {   
13 public static void main(String[] args) {
```

```txt
ServerSocket serverSocket = null;   
Socket accept = null;   
InputStream is = null;   
ByteArrayOutputStream baos = null;   
try { //1. 开放服务器端口，创建ServerSocket serverSocket = new ServerSocket(8899); //2. 等待客户端的连接 accept = serverSocket.accept(); //3. 读入客户端的消息, is = accept.getInputStream(); /* 回忆之前的IO流方案，弊端：存在中文，可能存在乱码。 byte[] buffer = new byte[1024]; int len; while ((len=is.read(buffer))!= -1) { String str = new String(buffer,0,len); System.out.println(str); } */ baos = new ArrayListOutputStream(); byte[] buffer = new byte[1024]; int len; while ((len=is.read(buffer))!= -1) { baos.write(buffer,0,len); } System.out.println(baos.toString()); System.out.println("数据来源地址：" +accept.getInetAddress().getHostName()); } catch (IOException e) { e.printStackTrace(); } finally { //4. 关闭资源 try { if (baos!=null) { baos.close(); } if (is!=null) { is.close(); } if (accept!=null) { accept.close(); } if (serverSocket!=null) { serverSocket.close(); } } catch (Exception e) { e.printStackTrace(); } }
```

生活举例：港口

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704147.jpg)

# 2.2、案例二

需求：客户端发送文件给服务器，服务端将文件保存在本地。

我们需要准备一个图片，放在项目目录下：

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704148.jpg)

编写代码：客户端

```java
package com.kuanglesson3;   
import java.io.File;   
import java.io.FileInputStream;   
import java.ioOutputStream;   
import java.net.InetAddress;   
import java.net.Socket;   
//客户端   
public class TcpClientDemo02 { public static void main(String[] args) throws Exception{ //1.创建socket连接 Socket socket  $=$  new Socket(InetAddress.getName("127.0.0.1")， 9090); //2.创建一个输出流   
OutputStream os  $=$  socket.getOutputStream(); //3.读取文件   
FileInputStream fis  $=$  new FileInputStream(new File("qinjiang.jpg")); //4.写出文件 byte[] buffer  $=$  new byte[1024];
```

服务端：

```txt
int len;
while ((len = fis.read(buffer)) != -1) {
    os.write(buffer, 0, len);
}
//5. 资源关闭，应该使用 try-catch-finally
fis.close();
os.close();
socket.close();
}
```

```java
package com.kuanglesson3;   
import java.io.*;   
import java.net ServerSocket;   
import java.net.Socket;   
//服务端   
public class TcpServerDemo02 {   
public static void main(String[] args) throws Exception { //1. 开启 ServerSocket ServerSocket serverSocket = new ServerSocket(9090); //2. 侦听 客户端 Socket Socket socket = serverSocket.accept(); //3. 获取输入流 InputStream is = socket.getInputStream(); //4. 读取接收的文件并保存 FileOutputStream fos = new FileOutputStream(new File("receive.jpg")); byte[] buffer = new byte[1024]; int len; while ((len=is.read(buffer))!= -1){ fos.write(buffer,0,len); }   
//5.关闭资源，应该使用 try-catch-finally fos.close(); is.close(); socket.close(); serverSocket.close();   
}
```

测试：启动服务端，启动客户端，图片接收成功！

# 2.3、案例三

需求：我们需要在案例二的基础上，接收成功后，返回给客户端，接收成功！然后客户端才关闭连接！

客户端

```java
1 package com.kuanglesson4;   
2   
3 import java.io.\*;
```

服务端

```java
import java.net.InetAddress;   
import java.net.Socket;   
//客户端   
public class TcpClientDemo03 { public static void main(String[] args) throws Exception{ //1.创建socket连接 Socket socket  $=$  new Socket(InetAddress.getName("127.0.0.1")， 9090); //2.创建一个输出流 OutputStream os  $=$  socket.getOutputStream(); //3.读取文件 FileInputStream fis  $=$  new FileInputStream(new File("qinjiang.jpg")); //4.写出文件 byte[] buffer  $=$  new byte[1024]; int len; while((len=fi.read(buffer))！=-1){ os.write(buffer,0,len); }   
//告诉服务器，我传输完了，关闭数据的输出，不然就会一直阻塞！ socket.shutdownOutput();   
//先别着急关，等待服务器响应，响应到控制台，注意重复的变量问题！ InputStream inputStream  $=$  socket.getInputStream();ByteArrayOutputStream baos  $=$  new ArrayListOutputStream(); byte[]buffer2  $=$  new byte[1024]; int len2; while((len2=InputStream.read(buffer2))！=-1){ baos.write(buffer2,0,len2); } System.out.println(baos.toString());   
//5.资源关闭，应该使用try-catch-finally baos.close(); InputStream.close(); fis.close(); os.close(); socket.close();   
}   
}
```

```java
package com.kuanglesson4;   
import java.io.File;   
import java.io.FileOutputStream;   
import java.io.InputStreamReader;   
import java.io.InputStreamReader;   
import java.net_serversocket;   
import java.net_SOCKET;   
//服务端   
public class TcpServerDemo03 {   
public static void main(String[] args) throws Exception { //1. 开启 ServerSocket
```

```javascript
15
ServerSocket
serverSocket = new ServerSocket(9090); //2.侦听客户端 Socket Socket socket = serverSocket.accept(); //3.获取输入流 InputStream is = socket.getInputStream(); //4.读取接收的文件并保存 FileOutputStream fos = new FileOutputStream(new File("receive2.jpg")); byte[] buffer = new byte[1024]; int len; while ((len=is.read(buffer)) != -1){ fos.write(buffer,0,len); } //通知客户端接收成功 OutputStream outputStream = socket.getOutputStream(); OutputStream.write("文件已经成功收到，OK".getBytes()); //5.关闭资源，应该使用try-catch-finally OutputStream.close(); fos.close(); is.close(); socket.close(); serverSocket.close(); }
```

# 2.4、练习作业

1. 服务端读取图片并发送给客户端，客户端保存图片到本地。
2. 客户端给服务端发送文本，服务端会将文本转成大写在返回给客户端。

# 2.5、初识Tomcat服务器

客户端

自定义

- 浏览器

服务端

自定义

- Tomcat服务器

1. 将提供的tomcat解压
2. 运行bin目录下的启动文件
3. 测试访问localhost:8080

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704149.jpg)

4. 现在，我们在里面的 \webapps\ROOT 目录下新建一个kuangshen.txt，编辑文件保存！

1 网络如此神奇，让你我相遇

5. 浏览器输入 http://localhost:8080/kuangshen.txt，发现可以访问到我们客户端的资源，OK
6. 这里，我们的浏览器，就相当于是一个客户端，而Tomcat 服务器，就相当于是服务端，具体的关于Tomcat的学习我们要到JavaWeb阶段会具体学习

# 3、UDP网络编程

# 3.1、说明

- DatagramSocket 和 DatagramPacket 两个类实现了基于UDP协议的网络程序。
- UDP数据报通过数据报套接字DatagramSocket发送和接收，系统不保证UDP数据报一定能够安全送到目的地，也不确定什么时候可以抵达。
- DatagramPacket 对象封装了UDP数据报，在数据报中包含了发送端的IP地址和端口号以及接收端的IP地址和端口号。
- UDP协议中每个数据报都给出了完整的地址信息，因此无需建立发送方和接收方的连接。如同发快递包裹一样。

# 3.2、案例一

# 发送方

![](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/pdf-ocr-images/20251128234704150.jpg)

接收方

```txt
11 DatagramSocket socket = new DatagramSocket();   
12   
13 //2.封装数据包 String msg = "UDPSender  $= = >$  "； byte[] data = msg.getBytes(); InetAddress inet = InetAddress.getName("127.0.0.1"); int port = 9090; DatagramPacket packet = new DatagramPacket(data,0,data.length,inet,port);   
19   
20 //3.通过Socket发送packet socket.send(batch);   
21   
22   
23 //4.关闭socket socket.close();   
24   
25 }   
26 }
```

```java
package com.kuanglesson5;   
import java.net.DatagramPacket;   
import java.net.DatagramSocket;   
public class UDPReceiverDemo01 { public static void main(String[] args) throws Exception { //1. 建立DatagramSocket,开放端口 DatagramSocket socket = new DatagramSocket(9090); //2. 接收数据 byte[] buffer = new byte[1024]; DatagramPacket packet = new DatagramPacket(buffer,0,buffer.length); socket.receive(socket); //3. 输出数据 //packet的数据()：获取packet中的数据 System.out.println(new Stringpacket的数据(),0, packet-Length());   
//4. 关闭socket socket.close();   
}   
}
```

测试：启动接收方，启动发送方，查看是否能够接收到！

# 3.3、案例二：在线咨询

客户端

```java
1 package com.kuang.udchat;   
2   
3 import java.io顺德Reader;   
4 import java.io.InputStreamReaderReader;
```

```java
import java.net.DatagramPacket;   
import java.net.DatagramSocket;   
import java.net.InetAddress;   
public class udpTalkClient { public static void main(String[] args) throws Exception { System.out.println("发送方启动中...."); //1.使用DatagramSocket指定端口，创建发送端 Datagramsocket socket  $=$  new DatagramSocket(8888); //2.准备数据，转成字节数组 BufferedReader reader  $=$  new BufferedReader(new InputStreamReader(System.in)); while(true){ String data  $=$  reader.readLine(); byte[] datas  $=$  data.getBytes(); //3.封装成DatagramPacket包裹，需要指定目的地 DatagramPacket packet  $=$  new DatagramPacket(datas,0,datas.length, new InetAddress("localhost",6666)); //4.发送包裹send socket.send(batch); //退出判断 if(data.equals("bye")){ break; } } 33   
//5.释放资源 socket.close();   
}
```

# 服务端

```java
1 package com.kuang.udpchat;   
2   
3 import java.net.DatagramPacket;   
4 import java.net.DatagramSocket;   
5   
6 public class UdpTalkServer {   
7 public static void main(String[] args) throws Exception {   
8 DatagramSocket socket  $=$  new DatagramSocket(6666);   
9 while (true) {   
10 try { //准备接收包裹；   
12 byte[] container  $=$  new byte[1024];   
13 DatagramPacket packet  $=$  new DatagramPacket/container,0, container.length);   
14 socket.receivepacket); //阻塞式接收包裹   
15   
16 byte[] datas  $=$  packet的数据();   
17 int len  $=$  packet-Length();   
18 String data  $=$  new String(datas,0,len);   
19 System.out.println(data);
```

发送端多线程

```javascript
//退出判断  
if (data.equals("bye")) {
    break;
}
}catch
(Exception
e
)
{
    e.printStackTrace();
}
}
socket.close();
}
```

问题：现在需要两遍需要接受和发送，我们可以使用多线程来解决！

```java
package com.kuang.udchat;   
import java.io顺德reader;   
import java.io.InputStreamReaderReader;   
import java.net.DatagramPacket;   
import java.net.DatagramSocket;   
import java.net.InetSocketAddress;   
import java.net.SocketException;   
//发送端   
public class TalkSend implements Runnable { private DatagramSocket socket; private BufferedReader reader; private String toIP; private int toPort; public TalkSend(int port,String toIP,int toPort) { this.toIP  $\equiv$  toIP; this.toPort  $\equiv$  toPort; try { socket  $=$  new DatagramSocket.port); reader  $=$  new BufferedReader(new InputStreamReader(System.in)); } catch (SocketException e){ e.printStackTrace(); 1   
}   
@override   
public void run() { while(true){ try{ String data  $\equiv$  reader.readLine(); byte[] datas  $\equiv$  data.getBytes(); //3.封装成DatagramPacket包裹，需要指定目的地 DatagramPacket packet  $\equiv$  new DatagramPacket(datas,0,datas.length, new InetSocketAddress(this.toIP,this.toPort));   
//4.发送包裹send socket.sendpacket);
```

接收端多线程

```javascript
//退出判断  
if (data.equals("bye")) {
    break;
}
}catch
(Exception
e
)
{
    e.printStackTrace();
}
}
//5. 释放资源  
socket.close();
}
```

```java
package com.kuang.udpchat;   
import java.net.DatagramPacket;   
import java.net.DatagramSocket;   
import java.net.SocketException;   
//接收端   
public class TalkReceive implements Runnable { private DatagramSocket socket; private String msgFrom; public TalkReceive(int port,String msgFrom) { this.msgFrom  $=$  msgFrom; try{ socket  $=$  new DatagramSocket.port); } catch (SocketException e){ e.printStackTrace(); 1 @override public void run() { while(true）{ try{ //准备接收包裹： byte[] container  $=$  new byte[1024]; DatagramPacket packet  $=$  new DatagramPacket/container,0, container.length); socket.receivepacket); //阻塞式接收包裹 byte[] datas  $=$  packet.getData(); int len  $=$  packet-Length(); String data  $=$  new String(datas,0,len); System.out.println(msgFrom+:" +data); //退出判断 if(data.equals("bye")){ break; } catch(Exception e){ e.printStackTrace();
```

学生端

```txt
42 }   
43 socket.close();   
44 }   
45   
46 }
```

老师端

```java
package com.kuang.udchat;   
public class TalkStudent { public static void main(String[] args){ new Thread(new TalkSend(7777, "localhost", 9999)).start(); new Thread(new TalkReceive(8888, "老师").start(); }   
}
```

实例化

```java
1 package com.kuang.udchat;   
2   
3 public class TalkTeacher { public static void main(String[] args) { new Thread(new TalkReceive(9999, "学生").start(); new Thread(new TalkSend(5555, "localhost", 8888)).start(); }   
4   
5   
6   
7   
8
```

# 4、URL编程

# 4.1、url类

- URL (Uniform Resource Locator)：统一资源定位符，它表示internet上某一资源的地址。
- 它是一种具体的URI，即URL可以用来标识一个资源，而且还指明了如何locate：定位这个资源。
- 通过URL我们可以访问Internet上的各种网络资源，比如最常见的www,ftp站点。浏览器通过解析给定的URL可以在网络上查找相应的文件或其他资源。
- URL 的基本结构由 5 部分组成:

1 传输协议：//主机名：端口号/文件名 #片段名？参数列表

例如：http://localhost:8080/helloworld/index.jsp#a?username=kuangshen&password=123  
。片段名，即锚链接，比如我们去一些小说网站，可以直接定位到某个章节位置  
参数列表格式：参数名=参数值&参数名=参数值...

1 package com.kuanglesson6;

```java
import java.net.MalformedURLException;   
import java.net(URL;   
public class URLDemo01 { public static void main(String[] args) { try { URL url  $=$  newURL("http://localhost:8080/helloworld/index.jsp? username  $\equiv$  kuangshen&password  $\equiv$  123"); System.out.println(url.getProtocol()); //获取URL的协议名 System.out.println(url.getHost()); //获取URL的主机名 System.out.println(url.getPort()); //获取URL的端口号 System.out.println(url.getPath()); //获取URL的文件路径 System.out.println(url.getFile()); //获取URL的文件名 System.out.println(url.getQuery()); //获取URL的查询名 } catch (MalformedURLException e){ e.printStackTrace(); } } }
```

# 4.2、下载tomcat下的文件

首先需要在tomcat中放入一个资源文件！

```java
package com.kuanglesson6;   
import java.io.FileOutputStream;   
import java.io.InputStreamReader;   
import java.net.HttpUrlConnection;   
import java.net(URL;   
public class URLDemo02 { public static void main(String[] args) { try { //1. 定位到服务器端的资源 URL url = new URL("http://localhost:8080/helloworld/qinjiang.jpg"); //2. 创建连接 HttpURLConnection connection = (HttpURLConnection) url.openConnection(); //3. 获取输入流 InputStream is = connection.getInputStream(); //4. 写出文件 FileOutputStream fos = new FileInputStream("qinjiang2.jpg"); byte[] buffer = new byte[1024]; int len; while ((len=is.read(buffer)) != -1) { fos.write(buffer,0,len); }   
//关闭资源
```

```txt
27 fos.close();   
28 is.close();   
29 connectiondisconnect(); //断开连接   
30   
31 } catch (Exception e) {   
32 e.printStackTrace();   
33 }   
34 }   
35 }
```
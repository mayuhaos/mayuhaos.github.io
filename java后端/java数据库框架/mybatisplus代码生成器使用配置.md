# 【Mybatis-Plus】 最新版代码生成器使用配置

------

由于很多朋友对新版的Mybatis-Plus中代码生成器不熟，这里我也是花了几个小时弄明白，给大家总结的模板，可以无脑使用！

项目基于maven和springboot

[TOC]



## 1.导入依赖

```java
	<!--  加载模板-->
    <dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
    </dependency>
    <!--启动mybatis-->
    <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.1</version>
    </dependency>
    <!--代码生成器-->
    <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.2</version>
	</dependency>
```



## 2.编写代码生成器文件

### 2.1静态设置

```java
package com.example;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import org.junit.jupiter.api.Test;

import java.util.Collections;

public class Get {

    String url = "jdbc:mysql://localhost:3306/Library_Management_System?serverTimezone=UTC&useUnicode=ture&characterEncoding=utf-8";

    @Test
    public void test() {
        String pkgPath = System.getProperty("user.dir") + "/src/main/java";
        String pkgXml = System.getProperty("user.dir") + "/src/main/resources/mapper";
        FastAutoGenerator.create(url, "root", "123456")
//                // 全局配置
                .globalConfig((scanner, builder) -> builder.outputDir(pkgPath).author("作者名").fileOverride())
//                // 包配置
                .packageConfig((scanner, builder) -> builder.parent("com.example")
                        .pathInfo(Collections.singletonMap(OutputFile.xml, pkgXml)))

//                // 策略配置
                .strategyConfig((scanner, builder) -> builder.addInclude("user")
                        .build())

                .execute();

    }
}

```

*  FastAutoGenerator.create(url, "root", "123456")
*  System.getProperty("user.dir")指的是获取当前项目路径
* url，root，密码为你的数据库配置
*  "/src/main/java";"/src/main/resources/mapper";为自定义导出配置路径
* com.example为导出的父包名
* "user"为数据库中的表名



### 2.2动态设置：

```java	
package com.example.utils;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.fill.Column;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author YHwinner
 */
public class CodeGenerator {

    public static void aaa() {
        String url = "jdbc:mysql://localhost:3306/Library_Management_System?serverTimezone=UTC&useUnicode=ture&characterEncoding=utf-8";
        String pkgPath = System.getProperty("user.dir") + "/src/main/java";
        String pkgXml = System.getProperty("user.dir") + "/src/main/resources/mapper";
        FastAutoGenerator.create(url, "root", "20010810")
                // 全局配置
                .globalConfig((scanner, builder) -> builder.outputDir(pkgPath).author(scanner.apply("请输入作者名称？")).fileOverride().disableOpenDir())
                // 包配置
                .packageConfig((scanner, builder) -> builder.parent(scanner.apply("请输入包名？"))
                        .pathInfo(Collections.singletonMap(OutputFile.xml, pkgXml)))
                // 策略配置
                .strategyConfig((scanner, builder) -> builder.addInclude(getTables(scanner.apply("请输入表名，多个英文逗号分隔？所有输入 all")))
                        .controllerBuilder().enableRestStyle().enableHyphenStyle()
                        .entityBuilder().enableLombok()
                        .addTableFills(new Column("create_time", FieldFill.INSERT)
                        ).build())
                .execute();
    }

    // 处理 all 情况

    /**
     * 
     * @param tables
     * @return
     */
    protected static List<String> getTables(String tables) {
        return "all".equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(","));
    }

    public static void main(String[] args) {
        aaa();
    }
}


```

好处就是可以按需导入

这是生成前：

![image-20220424191327907](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220424191327907.png)

运行中：

![image-20220424191445048](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220424191445048.png)

运行后：

![image-20220424191607690](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220424191607690.png)

```java
	<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    </dependency>
```

- [x] **也可以不使用lombok注解，只需去掉这句**

```java
.enableLombok()
```

![image-20220424191824861](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220424191824861.png)

![image-20220424192403407](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220424192403407.png)

![image-20220424192018831](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/image-20220424192018831.png)

那么就会使用最原始的get，set方法！！！

为大家节省了大量的时间！
docker pull镜像
docker run

```shell
docker run -d -p 9000:9000 -p 9090:9090 
--name=minio --restart=always 
-e "MINIO_ROOT_USER=minio" -e "MINIO_ROOT_PASSWORD=20010810" 
-v F:\DATA\DockerDesktop\Volume\minio\data:/data 
-v F:\DATA\DockerDesktop\Volume\minio\config:/root/.minio  minio/minio:RELEASE.2024-12-18T13-15-44Z server /data
 --console-address ":9090" --address ":9000"
```

> docker run: 这是用于运行一个新的容器的命令。
-d: 表示以分离模式（后台）运行容器。
-p 9000:9000 -p 9090:9090: 将主机的端口映射到容器内部的端口。这里将主机的9000端口映射到容器内的9000端口（MinIO的服务端口），以及将主机的9090端口映射到容器内的9090端口（MinIO控制台端口）。
--name=minio: 为容器指定一个名称，在这里是minio。
--restart=always: 设置容器的重启策略为总是重启，这意味着即使容器退出也会自动重启。
-e "MINIO_ROOT_USER=minio" -e "MINIO_ROOT_PASSWORD=20010810": 设置环境变量来配置 MinIO 的根用户和密码，这用于访问 MinIO 控制台和API。
-v F:\DATA\DockerDesktop\Volume\minio\data:/data: 绑定挂载一个卷，将主机路径 F:\DATA\DockerDesktop\Volume\minio\data 挂载到容器内的 /data 目录，这是 MinIO 存储对象数据的地方。
-v F:\DATA\DockerDesktop\Volume\minio\config:/root/.minio: 同样绑定挂载一个卷，但这次是为了持久化 MinIO 的配置文件，这样在容器重建或重启时可以保留配置。
minio: 这是指定要使用的镜像名称，这里使用的是官方的 MinIO 镜像。
server /data: 这是传递给 MinIO 容器的命令，告诉 MinIO 作为服务器运行，并指定 /data 作为数据目录。
--console-address ":9090": 指定 MinIO 控制台监听的地址和端口，这里指定了 :9090，即所有网络接口上的9090端口。
--address ":9000": 指定 MinIO 服务监听的地址和端口，这里指定了 :9000，即所有网络接口上的9000端口。

运行成功后访问：`http://localhost:9090/`
输入刚才设置的用户名和密码进行登录

![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241223161804190.png)

### 创建桶
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241223162236025.png)

![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241223162220659.png)

### 调整桶的访问权限

为 `public`
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241223162834956.png)

#### 在桶中上传图片或者文件 

#### 访问方式：localhost:9000/桶名/文件名 就可以访问成功！


## Springboot整合minio

### 引入依赖
minio版本更新比较快，建议使用最新版本

```xml
<!-- https://mvnrepository.com/artifact/io.minio/minio -->
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.5.14</version>
</dependency>
```

创建minio中的连接参数配置
![image.png](https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@main/images/20241223170143869.png)

### 配置文件yml

```yml
minio:  
  endpoint: http://localhost:9000  
  accessKey: kABCJRF90c2cw9uV2pxc  
  secretKey: 1N5hu5Er8rjOCSyXN017Dk4sqTc1dNaE7FI0QOCJ
```
### 配置类

```java
package com.worktable.config;  
  
import io.minio.MinioClient;  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
  
@Configuration  
public class MinioConfig {  
  
    /**  
     * 访问地址  
     */  
    @Value("${minio.endpoint}")  
    private String endpoint;  
  
    /**  
     * accessKey类似于用户ID，用于唯一标识你的账户  
     */  
    @Value("${minio.accessKey}")  
    private String accessKey;  
  
    /**  
     * secretKey是你账户的密码  
     */  
    @Value("${minio.secretKey}")  
    private String secretKey;  
  
    @Bean  
    public MinioClient minioClient() {  
        MinioClient minioClient = MinioClient.builder()  
                .endpoint(endpoint)  
                .credentials(accessKey, secretKey)  
                .build();  
        return minioClient;  
    }  
}
```

### 设置工具类

```java
package com.worktable.utils;  
  
import io.minio.*;  
import io.minio.Result;  
import io.minio.http.Method;  
import io.minio.messages.Bucket;  
import io.minio.messages.DeleteObject;  
import io.minio.messages.Item;  
import lombok.RequiredArgsConstructor;  
import lombok.SneakyThrows;  
import lombok.extern.slf4j.Slf4j;  
import org.apache.commons.lang3.StringUtils;  
import org.bouncycastle.util.encoders.Base64;  
import org.springframework.stereotype.Component;  
import org.springframework.web.multipart.MultipartFile;  
  
import java.io.ByteArrayInputStream;  
import java.io.InputStream;  
import java.io.UnsupportedEncodingException;  
import java.net.URLDecoder;  
import java.util.*;  
  
@Slf4j  
@Component  
@RequiredArgsConstructor  
public class MinioUtils {  
  
    private final MinioClient minioClient;  
  
    /******************************  Operate Bucket Start  ******************************/  
  
    /**     * 创建桶  
     *  
     * @param bucketName 桶名  
     */  
    @SneakyThrows(Exception.class)  
    public void createBucket(String bucketName) {  
        if (!bucketExists(bucketName)) {  
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());  
        }  
    }  
  
    /**  
     * 判断Bucket是否存在，true：存在，false：不存在  
     *  
     * @param bucketName 桶名  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public boolean bucketExists(String bucketName) {  
        return minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());  
    }  
  
    /**  
     * 获得Bucket的策略  
     *  
     * @param bucketName 桶名  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public String getBucketPolicy(String bucketName) {  
        return minioClient.getBucketPolicy(GetBucketPolicyArgs  
                .builder()  
                .bucket(bucketName)  
                .build());  
    }  
  
    /**  
     * 获得所有Bucket列表  
     *  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public List<Bucket> getAllBuckets() {  
        return minioClient.listBuckets();  
    }  
  
    /**  
     * 根据bucketName获取其相关信息  
     *  
     * @param bucketName  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public Optional<Bucket> getBucket(String bucketName) {  
        return getAllBuckets().stream().filter(b -> b.name().equals(bucketName)).findFirst();  
    }  
  
    /**  
     * 根据bucketName删除Bucket，true：删除成功； false：删除失败，文件或已不存在  
     *  
     * @param bucketName  
     * @throws Exception  
     */    @SneakyThrows(Exception.class)  
    public void removeBucket(String bucketName) {  
        minioClient.removeBucket(RemoveBucketArgs.builder().bucket(bucketName).build());  
    }  
  
    /******************************  Operate Bucket End  ******************************/  
  
  
    /******************************  Operate Files Start  ******************************/  
    /**     * 判断文件是否存在  
     *  
     * @param bucketName  
     * @param objectName  
     * @return  
     */  
    public boolean isObjectExist(String bucketName, String objectName) {  
        boolean exist = true;  
        try {  
            minioClient.statObject(StatObjectArgs.builder().bucket(bucketName).object(objectName).build());  
        } catch (Exception e) {  
            log.error("[Minio工具类]>>>> 判断文件是否存在, 异常：", e);  
            exist = false;  
        }  
        return exist;  
    }  
  
    /**  
     * 判断文件夹是否存在  
     *  
     * @param bucketName  
     * @param objectName  
     * @return  
     */  
    public boolean isFolderExist(String bucketName, String objectName) {  
        boolean exist = false;  
        try {  
            Iterable<io.minio.Result<Item>> results = minioClient.listObjects(  
                    ListObjectsArgs.builder().bucket(bucketName).prefix(objectName).recursive(false).build());  
            for (io.minio.Result<Item> result : results) {  
                Item item = result.get();  
                if (item.isDir() && objectName.equals(item.objectName())) {  
                    exist = true;  
                }  
            }  
        } catch (Exception e) {  
            log.error("[Minio工具类]>>>> 判断文件夹是否存在，异常：", e);  
            exist = false;  
        }  
        return exist;  
    }  
  
    /**  
     * 根据文件前置查询文件  
     *  
     * @param bucketName 存储桶  
     * @param prefix     前缀  
     * @param recursive  是否使用递归查询  
     * @return MinioItem 列表  
     */  
    @SneakyThrows(Exception.class)  
    public List<Item> getAllObjectsByPrefix(String bucketName,  
                                            String prefix,  
                                            boolean recursive) {  
        List<Item> list = new ArrayList<>();  
        Iterable<io.minio.Result<Item>> objectsIterator = minioClient.listObjects(  
                ListObjectsArgs.builder().bucket(bucketName).prefix(prefix).recursive(recursive).build());  
        if (objectsIterator != null) {  
            for (io.minio.Result<Item> o : objectsIterator) {  
                Item item = o.get();  
                list.add(item);  
            }  
        }  
        return list;  
    }  
  
    /**  
     * 获取文件流  
     *  
     * @param bucketName 存储桶  
     * @param objectName 文件名  
     * @return 二进制流  
     */  
    @SneakyThrows(Exception.class)  
    public InputStream getObject(String bucketName, String objectName) {  
        return minioClient.getObject(  
                GetObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .build());  
    }  
  
    /**  
     * 断点下载  
     *  
     * @param bucketName 存储桶  
     * @param objectName 文件名称  
     * @param offset     起始字节的位置  
     * @param length     要读取的长度  
     * @return 二进制流  
     */  
    @SneakyThrows(Exception.class)  
    public InputStream getObject(String bucketName, String objectName, long offset, long length) {  
        return minioClient.getObject(  
                GetObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .offset(offset)  
                        .length(length)  
                        .build());  
    }  
  
    /**  
     * 获取 bucketName 下文件列表  
     *  
     * @param bucketName 存储桶  
     * @param prefix     文件名称  
     * @param recursive  是否递归查找，false：模拟文件夹结构查找  
     * @return 二进制流  
     */  
    public Iterable<Result<Item>> listObjects(String bucketName, String prefix, boolean recursive) {  
        return minioClient.listObjects(  
                ListObjectsArgs.builder()  
                        .bucket(bucketName)  
                        .prefix(prefix)  
                        .recursive(recursive)  
                        .build());  
    }  
  
    /**  
     * 使用MultipartFile进行文件上传  
     *  
     * @param bucketName  存储桶  
     * @param file        文件名  
     * @param objectName  对象名  
     * @param contentType 类型  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public ObjectWriteResponse uploadFile(String bucketName, MultipartFile file, String objectName, String contentType) {  
        InputStream inputStream = file.getInputStream();  
        return minioClient.putObject(  
                PutObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .contentType(contentType)  
                        .stream(inputStream, inputStream.available(), -1)  
                        .build());  
    }  
  
    /**  
     * 图片上传  
     *  
     * @param bucketName  
     * @param imageBase64  
     * @param imageName  
     * @return  
     */  
    public ObjectWriteResponse uploadImage(String bucketName, String imageBase64, String imageName) {  
        if (!StringUtils.isEmpty(imageBase64)) {  
            InputStream in = base64ToInputStream(imageBase64);  
            String newName = System.currentTimeMillis() + "_" + imageName + ".jpg";  
            String year = String.valueOf(new Date().getYear());  
            String month = String.valueOf(new Date().getMonth());  
            return uploadFile(bucketName, year + "/" + month + "/" + newName, in);  
  
        }  
        return null;  
    }  
  
    public static InputStream base64ToInputStream(String base64) {  
        ByteArrayInputStream stream = null;  
        try {  
            byte[] bytes = Base64.decode(base64.trim());  
            stream = new ByteArrayInputStream(bytes);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return stream;  
    }  
  
  
    /**  
     * 上传本地文件  
     *  
     * @param bucketName 存储桶  
     * @param objectName 对象名称  
     * @param fileName   本地文件路径  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public ObjectWriteResponse uploadFile(String bucketName, String objectName, String fileName) {  
        return minioClient.uploadObject(  
                UploadObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .filename(fileName)  
                        .build());  
    }  
  
    /**  
     * 通过流上传文件  
     *  
     * @param bucketName  存储桶  
     * @param objectName  文件对象  
     * @param inputStream 文件流  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public ObjectWriteResponse uploadFile(String bucketName, String objectName, InputStream inputStream) {  
        return minioClient.putObject(  
                PutObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .stream(inputStream, inputStream.available(), -1)  
                        .build());  
    }  
  
    /**  
     * 创建文件夹或目录  
     *  
     * @param bucketName 存储桶  
     * @param objectName 目录路径  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public ObjectWriteResponse createDir(String bucketName, String objectName) {  
        return minioClient.putObject(  
                PutObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .stream(new ByteArrayInputStream(new byte[]{}), 0, -1)  
                        .build());  
    }  
  
    /**  
     * 获取文件信息, 如果抛出异常则说明文件不存在  
     *  
     * @param bucketName 存储桶  
     * @param objectName 文件名称  
     * @return  
     */  
    @SneakyThrows(Exception.class)  
    public String getFileStatusInfo(String bucketName, String objectName) {  
        return minioClient.statObject(  
                StatObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .build()).toString();  
    }  
  
    /**  
     * 拷贝文件  
     *  
     * @param bucketName    存储桶  
     * @param objectName    文件名  
     * @param srcBucketName 目标存储桶  
     * @param srcObjectName 目标文件名  
     */  
    @SneakyThrows(Exception.class)  
    public ObjectWriteResponse copyFile(String bucketName, String objectName, String srcBucketName, String srcObjectName) {  
        return minioClient.copyObject(  
                CopyObjectArgs.builder()  
                        .source(CopySource.builder().bucket(bucketName).object(objectName).build())  
                        .bucket(srcBucketName)  
                        .object(srcObjectName)  
                        .build());  
    }  
  
    /**  
     * 删除文件  
     *  
     * @param bucketName 存储桶  
     * @param objectName 文件名称  
     */  
    @SneakyThrows(Exception.class)  
    public void removeFile(String bucketName, String objectName) {  
        minioClient.removeObject(  
                RemoveObjectArgs.builder()  
                        .bucket(bucketName)  
                        .object(objectName)  
                        .build());  
    }  
  
    /**  
     * 批量删除文件  
     *  
     * @param bucketName 存储桶  
     * @param keys       需要删除的文件列表  
     * @return  
     */  
    public void removeFiles(String bucketName, List<String> keys) {  
        List<DeleteObject> objects = new LinkedList<>();  
        keys.forEach(s -> {  
            objects.add(new DeleteObject(s));  
            try {  
                removeFile(bucketName, s);  
            } catch (Exception e) {  
                log.error("[Minio工具类]>>>> 批量删除文件，异常：", e);  
            }  
        });  
    }  
  
    /**  
     * 获取文件外链  
     *  
     * @param bucketName 存储桶  
     * @param objectName 文件名  
     * @param expires    过期时间 <=7 秒 （外链有效时间（单位：秒））  
     * @return url  
     */    @SneakyThrows(Exception.class)  
    public String getPresignedObjectUrl(String bucketName, String objectName, Integer expires) {  
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder().expiry(expires).bucket(bucketName).object(objectName).build();  
        return minioClient.getPresignedObjectUrl(args);  
    }  
  
    /**  
     * 获得文件外链  
     *  
     * @param bucketName  
     * @param objectName  
     * @return url  
     */    @SneakyThrows(Exception.class)  
    public String getPresignedObjectUrl(String bucketName, String objectName) {  
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()  
                .bucket(bucketName)  
                .object(objectName)  
                .method(Method.GET).build();  
        return minioClient.getPresignedObjectUrl(args);  
    }  
  
    /**  
     * 将URLDecoder编码转成UTF8  
     *     * @param str  
     * @return  
     * @throws UnsupportedEncodingException  
     */    public String getUtf8ByURLDecoder(String str) throws UnsupportedEncodingException {  
        String url = str.replaceAll("%(?![0-9a-fA-F]{2})", "%25");  
        return URLDecoder.decode(url, "UTF-8");  
    }  
}

```
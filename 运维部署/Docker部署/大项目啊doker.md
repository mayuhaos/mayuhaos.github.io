```c
docker run -p 3306:3306 --privileged=true \
 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=20010810 \
-d mysql:5.7
docker run -d -p 3306:3306  --privileged=true --restart=always --name mysql -v /mydata/mysql/log:/var/log/mysql  -v /mydata/mysql/data:/var/lib/mysql  -v /mydata/mysql/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=20010810   mysql:5.7
docker run -dit -p 3306:3306 --name mysql  --restart=always  -v /mysqldata/mysql/log:/var/log/mysql  -v /mysqldata/mysql/data:/var/lib/mysql  -v /mysqldata/mysql/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=20010810     mysql:5.7
    docker run -dit -p 3306:3306 --name mysql  --restart=always  -e MYSQL_ROOT_PASSWORD=20010810     mysql:5.7
docker run -p 6379:6379 --name redis \
-d redis redis-server /etc/redis/redis.conf
docker run -itd --name redis -p 6379:6379 \
    --restart always redis

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

docker image inspect redis|grep -i version
    
mkdir /mydocker/mysql-5.7/data -p
mkdir /mydocker/mysql-5.7/conf -p
 docker run --name mysql -e MYSQL_ROOT_PASSWORD=20010810 -v /mydocker/mysql-5.7/data:/var/lib/mysql -v /mydocker/mysql-5.7/conf:/etc/mysql/conf.d -p 3306:3306 -d mysql:5.7

     
      mkdir /mydocker/redis-7.0.4/data -p
      mkdir /mydocker/redis-7.0.4/conf -p
     vi /mydocker/redis-7.0.4/conf/redis.conf
     appendonly yes

 docker run -p 6379:6379 --name redis --restart=always \
-v /mydocker/redis-7.0.4/data:/data \
-v /mydocker/redis-7.0.4/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf

    
    "registry-mirrors":["https://almtd3fa.mirror.aliyuncs.com"]
```


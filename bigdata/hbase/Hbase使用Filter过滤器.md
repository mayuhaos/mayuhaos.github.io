# Hbase中Filter过滤器的使用

为了方便对Hbase数据中的数据进行过滤和查看，我们使用Filter过滤器进行筛选。

查看Hbase支持的过滤器类型：

```shell
show_filters
```

使用过滤器的语法格式：

```shell
scan '表名',{FILTER => "过滤器(比较运算符,'比较器')"}
```

在使用过滤器时，如果不加上STARTROW和ENDROW，则默认为全表扫描。

比较运算符

| 比较运算符 | 描述     |
| ---------- | -------- |
| =          | 等于     |
| >          | 大于     |
| >=         | 大于等于 |
| <          | 小于     |
| <=         | 小于等于 |
| !=         | 不等于   |

>substring:包含的意思、binary:精确查询、regexstring:正则匹配、null:空值比较、long:数字比较

## 值过滤器

| 值过滤器                       | 描述                     |
| ------------------------------ | ------------------------ |
| ValueFilter                    | 找到符合值条件的键值对   |
| SingleColumnValueFilter        | 在指定列族和列中进行比较 |
| SingleColumnValueExcludeFilter | 排除匹配成功的值         |

### ValueFilter

查询GDT003_FAULT_online表中，值包含2的两条ROWKEY  （如不使用LIMIT则数据会很多）

```shell
scan 'GDT003_FAULT_online',{FILTER=>"ValueFilter(=,'substring:2')",LIMIT=>2}
```

（如需查找范围可使用STARTROW和ENDROW）  下同

```shell
scan 'GDT003_FAULT_online',{STARTROW=>'100001003991112',ENDROW=>'8317520499999|14036980300|1003',
                            FILTER=>"ValueFilter(=,'substring:2')",LIMIT=>2}
```



### SingleColumnValueFilter

查询GDT003_FAULT_online表中，列elevel中的值等于2的两条ROWKEY （如不使用LIMIT则数据会很多）

```shell
scan 'GDT003_FAULT_online',{FILTER=>"SingleColumnValueFilter('B','elevel',=,'binary:2')",LIMIT=>2}
```

### SingleColumnValueExcludeFilter

查询GDT003_FAULT_online表中，列中的值==不==等于2的两条ROWKEY （如不使用LIMIT则数据会很多）

```shell
scan 'GDT003_FAULT_online',{FILTER=>"SingleColumnValueExcludeFilter('B','elevel',=,'binary:2')",LIMIT=>2}
```

## 行键过滤器

| 行键过滤器         | 描述                                               |
| ------------------ | -------------------------------------------------- |
| RowFilter          | 行键过滤器，比较RowKey                             |
| PrefixFilter       | 行键前缀比较器，比较行键前缀                       |
| KeyOnlyFilter      | 只对单元格的健进行过滤和显示，不显示值             |
| FirstKeyOnlyFilter | 只扫描显示相同键的第一个单元格，其键值对会显示出来 |

### RowFilter

查询GDT003_FAULT_online表中，RowKey值包含2008的两条ROWKEY （如不使用LIMIT则数据会很多）

```shell
 scan 'GDT003_FAULT_online',{FILTER=>"RowFilter(=,'substring:2020')",LIMIT=>2}
```

### PrefixFilter

查询GDT003_FAULT_online表中，RowKey的开头为8318的两条ROWKEY （如不使用LIMIT则数据会很多）

***注意：使用PrefixFilter查询时，无运算符条件！***

```shell
 scan 'GDT003_FAULT_online',{FILTER=>"PrefixFilter('8318')",LIMIT=>2}
```

### KeyOnlyFilter

查询GDT003_FAULT_online表中的两条ROWKEY  不显示value信息 （如不使用LIMIT则数据会很多）

```shell
 scan 'GDT003_FAULT_online',{FILTER=>"KeyOnlyFilter()",LIMIT=>2}
```

### FirstKeyOnlyFilter 

查询GDT003_FAULT_online表中的两条ROWKEY，***只展示相同键的第一个键值对*** （如不使用LIMIT则数据会很多）

```shell
 scan 'GDT003_FAULT_online',{FILTER=>"FirstKeyOnlyFilter ()",LIMIT=>2}
```

## **列族与列过滤器**

| 行键过滤器                 | 描述                               |
| -------------------------- | ---------------------------------- |
| FamilyFilter               | 列族过滤器，对列族名称进行过滤     |
| QualifierFilter            | 列标识过滤器，只显示对应列名的数据 |
| MultipleColumnPrefixFilter | 可以指定多个前缀对列名称过滤       |

### FamilyFilter

查询GDT003_FAULT_online表中列族等于B的两条ROWKEY（如不使用LIMIT则数据会很多）

```shell
scan 'GDT003_FAULT_online',{FILTER=>"FamilyFilter(=,'binary:B')",LIMIT=>2}
```

### QualifierFilter 

查询GDT003_FAULT_online表中列等于type的两条ROWKEY（如不使用LIMIT则数据会很多）

```shell
scan 'GDT003_FAULT_online',{FILTER=>"QualifierFilter(=,'binary:type')",LIMIT=>2}
```

### MultipleColumnPrefixFilter 

查询GDT003_FAULT_online表中列为devid和type的两条ROWKEY（如不使用LIMIT则数据会很多）

```shell
scan 'GDT003_FAULT_online',{FILTER=>"MultipleColumnPrefixFilter('devid','type')",LIMIT=>2}
```

## 其他过滤器

| 过滤器              | 描述                               |
| ------------------- | ---------------------------------- |
| InclusiveStopFilter | 设置停止行，且包含停止的行展示数据 |
| PageFilter          | 对一个逻辑行的所有列进行分页显示   |

### InclusiveStopFilter

查询GDT003_FAULT_online表中开始为100001003991112结尾为8315019999999|11005980514|2008的ROWKEY

```shell
scan 'GDT003_FAULT_online',{STARTROW=>'100001003991112',ENDROW=>'8317520499999|14042990400|1003',
						 FILTER=>"InclusiveStopFilter('8315019999999|11005980514|2008')"}
```

### PageFilter 

查询GDT003_FAULT_online表中筛选范围内的ROWKEY（分页显示3条）

```shell
scan 'GDT003_FAULT_online',{STARTROW=>'100001003991112',ENDROW=>'8317520499999|14042990400|1003',
						 FILTER=>"PageFilter(3)"}
```

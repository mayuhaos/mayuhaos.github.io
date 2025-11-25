- ✅ ChromaDB 0.5+ 版本

- ✅ 启用多租户（multi-tenancy）

- ✅ 使用 `default_tenant` 和 `default_database`

- ✅ 支持元数据过滤、语义搜索、时间范围查询

- 文档）整理的完整、结构清晰、可直接使用的 **Markdown 接口文档**。

  

# 📚 ChromaDB v2 HTTP API 官方接口文档

> 基于 ChromaDB `0.5.x+` 版本
>  支持多租户（Multi-Tenancy）与多数据库（Multi-Database）架构
>  Base URL: `http://localhost:8000/api/v2`

------

## 🔑 多租户与多数据库说明

所有请求路径均需包含以下参数：

| 参数       | 默认值             | 说明                                |
| ---------- | ------------------ | ----------------------------------- |
| `tenant`   | `default_tenant`   | 租户名称，用于逻辑隔离不同用户/项目 |
| `database` | `default_database` | 数据库名，一个租户下可有多个数据库  |

> 示例路径：
>  `/tenants/default_tenant/databases/default_database/collections`

------

## 🚀 常用核心接口（推荐优先使用）

------

### 1️⃣ 创建集合（Create Collection）

创建一个新的向量集合，用于存储嵌入向量和元数据。

#### 🔗 请求地址

http

```
POST /tenants/{tenant}/databases/{database}/collections
```

#### 📥 请求参数（Body - JSON）

| 字段        | 类型    | 必填 | 说明                           |
| ----------- | ------- | ---- | ------------------------------ |
| `name`      | string  | ✅    | 集合名称，必须唯一             |
| `metadata`  | object  | ❌    | 可选配置，如距离度量方式       |
| `dimension` | integer | ❌    | 向量维度（通常由模型自动推断） |

##### 示例请求体：

json

```
{
  "name": "test_call_records",
  "metadata": {
    "hnsw:space": "cosine"
  }
}
```

> 💡 `hnsw:space` 可选值：`l2`, `ip` (内积), `cosine`（推荐语义搜索）

#### 📤 响应（201 Created）



```json
{
  "id": "401b3204-82ce-466d-b032-949b89c0b642",
  "name": "test_call_records",
  "metadata": {
    "hnsw:space": "cosine"
  },
  "dimension": null,
  "topic": "test_call_records",
  "tenant": "default_tenant",
  "database": "default_database",
  "count": 0
}
```

| 字段    | 类型          | 说明                           |
| ------- | ------------- | ------------------------------ |
| `id`    | string (UUID) | 系统生成的集合唯一标识         |
| `name`  | string        | 用户定义的集合名称             |
| `count` | integer       | 当前集合中记录数量（初始为 0） |

#### ⚠️ 错误码

| 状态码            | 原因                                  |
| ----------------- | ------------------------------------- |
| `409 Conflict`    | 集合已存在                            |
| `400 Bad Request` | 参数格式错误或 tenant/database 不存在 |

------

### 2️⃣ 获取集合信息（Get Collection）

获取指定集合的详细信息。

#### 🔗 请求地址

http

```
GET /tenants/{tenant}/databases/{database}/collections/{collection_name}
```

#### 📥 路径参数

| 参数              | 类型   | 必填 | 说明              |
| ----------------- | ------ | ---- | ----------------- |
| `tenant`          | string | ✅    | 租户名            |
| `database`        | string | ✅    | 数据库名          |
| `collection_name` | string | ✅    | 集合名称（非 ID） |

#### 📤 响应（200 OK）

同上 `Create Collection` 成功响应，若集合不存在返回 `404 Not Found`。

------

### 3️⃣ 批量插入数据（Add Records）

向集合中添加一批新的记录（支持向量、文档、元数据）。

#### 🔗 请求地址

http

```
POST /tenants/{tenant}/databases/{database}/collections/{collection_id}/add
```

#### 📥 请求参数（Body - JSON）

| 字段         | 类型                | 必填 | 说明                               |
| ------------ | ------------------- | ---- | ---------------------------------- |
| `ids`        | array[string]       | ✅    | 每条记录的唯一字符串 ID            |
| `embeddings` | array[array[float]] | ✅    | 对应的向量列表，形状为 `(N, D)`    |
| `documents`  | array[string]       | ❌    | 原始文本内容（可选）               |
| `metadatas`  | array[object]       | ❌    | 每条记录的元数据（如时间、分类等） |

> ⚠️ 数组长度必须一致：`len(ids) == len(embeddings) == len(documents?) == len(metadatas?)`

##### 示例请求体：

json

```json
{
  "ids": ["rec_001", "rec_002"],
  "embeddings": [
    [0.1, -0.3, 0.8, ...],
    [0.2, 0.4, -0.7, ...]
  ],
  "documents": ["客户回访问题是否解决", "办理5G套餐优惠活动"],
  "metadatas": [
    {
      "call_start_time": 1729737600,
      "category": "follow_up"
    },
    {
      "call_start_time": 1729824000,
      "category": "promotion"
    }
  ]
}
```

#### 📤 响应（201 Created）

无返回体，成功则状态码为 `201`。

#### ⚠️ 错误码

| 状态码                     | 原因                         |
| -------------------------- | ---------------------------- |
| `404 Not Found`            | 集合不存在                   |
| `422 Unprocessable Entity` | 数据格式错误（如维度不匹配） |
| `409 Conflict`             | ID 已存在（不允许重复插入）  |

------

### 4️⃣ 查询：语义相似搜索（Query by Embedding）

根据输入的向量进行近似最近邻搜索，并支持元数据过滤。

#### 🔗 请求地址

http

```
POST /tenants/{tenant}/databases/{database}/collections/{collection_id}/query
```

#### 📥 请求参数（Body - JSON）

| 字段               | 类型                | 必填 | 说明                                                    |
| ------------------ | ------------------- | ---- | ------------------------------------------------------- |
| `query_embeddings` | array[array[float]] | ✅    | 查询向量列表，支持批量查询                              |
| `n_results`        | integer             | ❌    | 返回最相似的前 N 条结果，默认 `10`                      |
| `where`            | object              | ❌    | 元数据过滤条件（支持 `$and`, `$or`, `$gte`, `$lt` 等）  |
| `include`          | array[string]       | ❌    | 返回字段类型：`["metadatas", "documents", "distances"]` |

> 📝 `include` 不包含 `"ids"`，ID 总是默认返回。

##### 示例请求体：

json

编辑





```
{
  "query_embeddings": [[0.12, -0.33, 0.77, ...]],
  "n_results": 5,
  "where": {
    "$and": [
      { "call_start_time": { "$gte": 1729737600 } },
      { "category": "follow_up" }
    ]
  },
  "include": ["metadatas", "documents", "distances"]
}
```

#### 📤 响应（200 OK）

json

编辑





```
{
  "ids": [["rec_001", "rec_003"]],
  "distances": [[0.08, 0.15]],
  "metadatas": [[
    { "call_start_time": 1729824000, "category": "follow_up" }
  ]],
  "documents": [["客户回访问题是否解决"]],
  "queries": [...]
}
```

| 字段                      | 说明                                                  |
| ------------------------- | ----------------------------------------------------- |
| `ids`                     | 每个查询对应的匹配 ID 列表（嵌套数组）                |
| `distances`               | 相似度距离，越小越相似（`similarity ≈ 1 - distance`） |
| `metadatas` / `documents` | 根据 `include` 决定是否返回                           |

------

### 5️⃣ 查询：按元数据获取记录（Get Records）

仅根据元数据条件筛选记录，不涉及向量计算，适合全量导出或范围查询。

#### 🔗 请求地址

http

编辑





```
POST /tenants/{tenant}/databases/{database}/collections/{collection_id}/get
```

#### 📥 请求参数（Body - JSON）

| 字段      | 类型          | 必填 | 说明                                   |
| --------- | ------------- | ---- | -------------------------------------- |
| `where`   | object        | ❌    | 元数据过滤条件                         |
| `limit`   | integer       | ❌    | 最大返回数量，默认 `100`               |
| `offset`  | integer       | ❌    | 分页偏移                               |
| `include` | array[string] | ❌    | 返回内容：`["metadatas", "documents"]` |

##### 示例：查询促销类通话

json

编辑





```
{
  "where": {
    "category": "promotion"
  },
  "limit": 10,
  "include": ["metadatas", "documents"]
}
```

#### 📤 响应（200 OK）

json

编辑





```
{
  "ids": ["rec_002", "rec_004"],
  "metadatas": [
    { "call_start_time": 1729824000, "category": "promotion" },
    { "call_start_time": 1729910400, "category": "promotion" }
  ],
  "documents": ["办理5G套餐优惠", "流量包续订提醒"]
}
```

------

### 6️⃣ 删除集合（Delete Collection）

永久删除一个集合及其所有数据。

#### 🔗 请求地址

http

编辑





```
DELETE /tenants/{tenant}/databases/{database}/collections/{collection_name}
```

#### 📥 路径参数

| 参数              | 类型   | 必填 | 说明     |
| ----------------- | ------ | ---- | -------- |
| `tenant`          | string | ✅    | 租户名   |
| `database`        | string | ✅    | 数据库名 |
| `collection_name` | string | ✅    | 集合名称 |

#### 📤 响应（200 OK）

无返回体，删除成功返回 `200`。

#### ⚠️ 注意事项

- 此操作不可逆，请谨慎调用。
- 若集合不存在，返回 `404`。

------

### 7️⃣ 列出所有集合（List Collections）

获取当前 tenant/database 下的所有集合。

#### 🔗 请求地址

http

编辑





```
GET /tenants/{tenant}/databases/{database}/collections
```

#### 📤 响应（200 OK）

json

编辑





```
[
  {
    "id": "401b3204-...",
    "name": "test_call_records",
    "count": 42,
    "metadata": { "hnsw:space": "cosine" }
  },
  {
    "id": "6f8e7aed-...",
    "name": "user_profiles",
    "count": 150
  }
]
```

------

### 8️⃣ 更新记录（Update Records）

更新已有记录的向量、文档或元数据。

#### 🔗 请求地址

http

编辑





```
PUT /tenants/{tenant}/databases/{database}/collections/{collection_id}/update
```

#### 📥 请求参数（Body - JSON）

| 字段         | 类型                | 必填 | 说明                 |
| ------------ | ------------------- | ---- | -------------------- |
| `ids`        | array[string]       | ✅    | 要更新的记录 ID 列表 |
| `embeddings` | array[array[float]] | ❌    | 新的向量             |
| `documents`  | array[string]       | ❌    | 新的文档内容         |
| `metadatas`  | array[object]       | ❌    | 新的元数据           |

> ⚠️ 至少提供 `embeddings`, `documents`, `metadatas` 中的一项。

##### 示例：

json

编辑





```
{
  "ids": ["rec_001"],
  "metadatas": [
    { "status": "resolved", "updated_at": 1729827600 }
  ]
}
```

#### 📤 响应（200 OK）

无返回体，成功即 `200`。

#### ⚠️ 错误码

| 状态码                     | 原因             |
| -------------------------- | ---------------- |
| `404 Not Found`            | 集合或 ID 不存在 |
| `422 Unprocessable Entity` | 数据格式错误     |

------

### 9️⃣ 删除记录（Delete Records）

从集合中删除指定 ID 的记录。

#### 🔗 请求地址

http

编辑





```
POST /tenants/{tenant}/databases/{database}/collections/{collection_id}/delete
```

#### 📥 请求参数（Body - JSON）

| 字段    | 类型          | 必填 | 说明                                 |
| ------- | ------------- | ---- | ------------------------------------ |
| `ids`   | array[string] | ❌    | 要删除的 ID 列表                     |
| `where` | object        | ❌    | 元数据删除条件（如批量删除某类数据） |

> ⚠️ `ids` 和 `where` 可同时使用，表示“或”关系。

##### 示例：删除特定类别数据

json

编辑





```
{
  "where": {
    "category": "temp_data"
  }
}
```

#### 📤 响应（200 OK）

无返回体。

------

## 🧩 辅助接口（系统级）

------

### 🔍 获取服务器健康状态

#### 🔗 请求地址

http

编辑





```
GET /heartbeat
```

#### 📤 响应（200 OK）

json

编辑





```
{ "nanosecond heartbeat": 123456789 }
```

> 返回纳秒级时间戳，用于健康检查。

------

### 📊 获取版本信息

#### 🔗 请求地址

http

编辑





```
GET /version
```

#### 📤 响应（200 OK）

json

编辑





```
{ "version": "0.5.7" }
```

------

### 📋 获取 OpenAPI/Swagger 文档

#### 🔗 访问地址

text

编辑





```
http://localhost:8000/docs
```

> 提供交互式 API 测试界面（Swagger UI）

------

## ✅ 使用建议总结

| 场景       | 推荐接口                        |
| ---------- | ------------------------------- |
| 初始化集合 | `POST /collections`             |
| 插入数据   | `POST /collections/{id}/add`    |
| 语义搜索   | `POST /collections/{id}/query`  |
| 过滤查询   | `POST /collections/{id}/get`    |
| 更新数据   | `PUT /collections/{id}/update`  |
| 删除数据   | `POST /collections/{id}/delete` |
| 清空集合   | `DELETE /collections/{name}`    |

------

## 🧪 curl 示例汇总

### 创建集合

bash

编辑





```
curl -X POST "http://localhost:8000/api/v2/tenants/default_tenant/databases/default_database/collections" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "my_collection",
           "metadata": {"hnsw:space": "cosine"}
         }'
```

### 插入数据

bash

编辑





```
curl -X POST "http://localhost:8000/api/v2/tenants/default_tenant/databases/default_database/collections/<COLLECTION_ID>/add" \
     -H "Content-Type: application/json" \
     -d '{
           "ids": ["id1"],
           "embeddings": [[0.1, -0.2, 0.3]],
           "documents": ["hello world"],
           "metadatas": [{"tag": "test"}]
         }'
```

### 语义查询

bash

编辑





```
curl -X POST "http://localhost:8000/api/v2/tenants/default_tenant/databases/default_database/collections/<COLLECTION_ID>/query" \
     -H "Content-Type: application/json" \
     -d '{
           "query_embeddings": [[0.1, -0.2, 0.3]],
           "n_results": 5,
           "include": ["metadatas", "documents", "distances"]
         }'
```

------

✅ 此文档可直接保存为 `CHROMA_API_DOCS.md` 作为团队内部参考。
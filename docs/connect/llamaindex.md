---
title: LlamaIndex 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [LlamaIndex, Python, RAG, 知识库]
---

## 什么是 LlamaIndex

LlamaIndex 是专注于 RAG（检索增强生成）的 AI 框架，特别擅长处理复杂文档结构、多文件知识库和高级检索策略，是构建企业知识库的首选框架之一。

## 安装依赖

```bash
pip install llama-index llama-index-llms-openai llama-index-embeddings-openai
```

## 基础配置

```python
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core import Settings

# 配置 LLM
Settings.llm = OpenAI(
    model="claude-sonnet-4-6",
    api_key="你的熊猫算力Key",
    api_base="https://c.pandatoken.com/v1",
    temperature=0.7
)

# 配置 Embedding
Settings.embed_model = OpenAIEmbedding(
    model="text-embedding-3-small",
    api_key="你的熊猫算力Key",
    api_base="https://c.pandatoken.com/v1"
)
```

## 快速建立文档索引

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 加载文档目录（支持 PDF、Word、TXT、Markdown）
documents = SimpleDirectoryReader("./docs").load_data()

# 建立索引
index = VectorStoreIndex.from_documents(documents)

# 创建查询引擎
query_engine = index.as_query_engine(similarity_top_k=3)

# 提问
response = query_engine.query("这份文档讲了什么？")
print(response)
```

## 多文档问答

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter

# 加载多个文档
documents = SimpleDirectoryReader(
    input_files=["doc1.pdf", "doc2.pdf", "doc3.txt"]
).load_data()

# 自定义分块策略
parser = SentenceSplitter(chunk_size=1024, chunk_overlap=200)
nodes = parser.get_nodes_from_documents(documents)

# 建立索引
index = VectorStoreIndex(nodes)
query_engine = index.as_query_engine(
    similarity_top_k=5,
    response_mode="tree_summarize"  # 适合长文档总结
)

response = query_engine.query("总结所有文档的核心观点")
print(response)
```

## 持久化存储索引

```python
import os
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage
)

PERSIST_DIR = "./index_storage"

if not os.path.exists(PERSIST_DIR):
    # 首次：建立索引并保存
    documents = SimpleDirectoryReader("./docs").load_data()
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=PERSIST_DIR)
    print("索引建立完成")
else:
    # 后续：直接加载已有索引
    storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
    index = load_index_from_storage(storage_context)
    print("索引加载完成")

query_engine = index.as_query_engine()
response = query_engine.query("你的问题")
print(response)
```

::: tip
LlamaIndex 适合文档量大、结构复杂的知识库场景。建议用 `claude-sonnet-4-6` 做问答，`text-embedding-3-small` 做向量化，两者配合性价比最高。
:::

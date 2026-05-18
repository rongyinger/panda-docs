---
title: LangChain Python 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [LangChain, Python, 开发框架]
---

## 什么是 LangChain

LangChain 是最流行的 AI 应用开发框架，提供链式调用、RAG、Agent、Memory 等高级功能，极大简化 AI 应用开发。

## 安装依赖

```bash
pip install langchain langchain-openai
```

## 基础配置

```python
from langchain_openai import ChatOpenAI

# 配置熊猫算力
llm = ChatOpenAI(
    model="claude-sonnet-4-6",
    api_key="你的熊猫算力Key",
    base_url="https://c.pandatoken.com/v1",
    temperature=0.7
)

# 简单对话
response = llm.invoke("你好，介绍一下 LangChain")
print(response.content)
```

## Chain 链式调用

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(
    model="claude-sonnet-4-6",
    api_key="你的熊猫算力Key",
    base_url="https://c.pandatoken.com/v1"
)

# 创建提示词模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个专业的{role}"),
    ("user", "{question}")
])

# 构建链
chain = prompt | llm | StrOutputParser()

# 执行
result = chain.invoke({
    "role": "Python 开发专家",
    "question": "解释一下装饰器的原理"
})
print(result)
```

## RAG 知识库问答

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA

# 配置模型
llm = ChatOpenAI(
    model="claude-sonnet-4-6",
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1"
)

# 配置向量模型
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1"
)

# 加载文档
loader = TextLoader("your_document.txt", encoding="utf-8")
documents = loader.load()

# 分块
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(documents)

# 建立向量库
vectorstore = FAISS.from_documents(chunks, embeddings)

# 创建问答链
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)

# 提问
answer = qa_chain.invoke({"query": "这份文档的主要内容是什么？"})
print(answer["result"])
```

## 流式输出

```python
from langchain_openai import ChatOpenAI
from langchain_core.callbacks import StreamingStdOutCallbackHandler

llm = ChatOpenAI(
    model="claude-sonnet-4-6",
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1",
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()]
)

llm.invoke("写一首关于 AI 的诗")
```

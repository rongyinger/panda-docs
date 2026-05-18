---
title: Spring AI 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Spring AI, Java, Spring Boot]
---

## 什么是 Spring AI

Spring AI 是 Spring 官方推出的 AI 集成框架，让 Java/Spring Boot 开发者可以用熟悉的方式集成 AI 能力，支持多种模型提供商，API 风格与 Spring 生态一致。

## 添加依赖

`pom.xml`：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
        <version>1.0.0</version>
    </dependency>
</dependencies>

<repositories>
    <repository>
        <id>spring-milestones</id>
        <url>https://repo.spring.io/milestone</url>
    </repository>
</repositories>
```

## 配置 application.yml

```yaml
spring:
  ai:
    openai:
      api-key: 你的熊猫算力Key
      base-url: https://c.pandatoken.com
      chat:
        options:
          model: claude-sonnet-4-6
          temperature: 0.7
          max-tokens: 2048
      embedding:
        options:
          model: text-embedding-3-small
```

## 基础对话

```java
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final ChatClient chatClient;

    public AiService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    // 简单对话
    public String chat(String userMessage) {
        return chatClient.prompt()
                .user(userMessage)
                .call()
                .content();
    }

    // 带系统提示词
    public String chatWithSystem(String systemPrompt, String userMessage) {
        return chatClient.prompt()
                .system(systemPrompt)
                .user(userMessage)
                .call()
                .content();
    }
}
```

## 流式输出（SSE）

```java
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping(value = "/chat/stream", produces = "text/event-stream")
    public Flux<String> streamChat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }
}
```

## 结构化输出

```java
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

record PersonInfo(String name, String phone, String email) {}

@Service
public class ExtractionService {

    private final ChatClient chatClient;

    public ExtractionService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public PersonInfo extractPerson(String text) {
        return chatClient.prompt()
                .user("从以下文本提取联系人信息：\n" + text)
                .call()
                .entity(PersonInfo.class);  // 自动映射到 Java 对象
    }
}
```

## RAG 知识库集成

```java
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RagService {

    private final ChatClient chatClient;
    private final SimpleVectorStore vectorStore;

    public RagService(ChatClient.Builder chatBuilder, EmbeddingModel embeddingModel) {
        this.chatClient = chatBuilder.build();
        this.vectorStore = new SimpleVectorStore(embeddingModel);
    }

    // 添加文档到知识库
    public void addDocuments(List<String> texts) {
        List<Document> docs = texts.stream()
                .map(Document::new)
                .toList();
        vectorStore.add(docs);
    }

    // 基于知识库问答
    public String query(String question) {
        List<Document> relevant = vectorStore.similaritySearch(question);
        String context = relevant.stream()
                .map(Document::getContent)
                .reduce("", (a, b) -> a + "\n" + b);

        return chatClient.prompt()
                .system("根据以下资料回答问题：\n" + context)
                .user(question)
                .call()
                .content();
    }
}
```

::: tip Java 开发者建议
Spring AI 的 API 风格和 Spring 生态完全一致，迁移成本极低。如果你已有 Spring Boot 项目，接入熊猫算力只需修改 `application.yml` 中的 `api-key` 和 `base-url`，其他代码无需改动。
:::

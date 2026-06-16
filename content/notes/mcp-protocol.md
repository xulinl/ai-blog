---
title: "MCP 协议详解"
date: "2026-06-05"
tag: "MCP"
---

Model Context Protocol (MCP) 是 Anthropic 推出的开放协议，为 AI 模型与外部工具和数据源之间建立了标准化的通信接口。

## MCP 的核心概念

### 为什么需要 MCP？

在 MCP 出现之前，每个 AI 应用都需要为自己的工具集成编写定制的胶水代码。这导致了：

- 重复造轮子
- 工具间缺乏互操作性
- 安全模型不一致

MCP 解决了这些问题，提供了一个统一的协议层。

### 架构概览

MCP 采用客户端-服务器架构：

- **MCP Host**：AI 应用（如 Claude Desktop）
- **MCP Client**：运行在 Host 内部的协议客户端
- **MCP Server**：暴露特定能力的轻量服务

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    }
  }
}
```

这个简洁的配置让 AI 获得了文件系统的读写能力，无需任何额外的集成代码。

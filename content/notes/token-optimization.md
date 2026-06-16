---
title: "Token 优化完全指南"
date: "2026-05-28"
tag: "性能"
---

Token 是 LLM 的计价单位和上下文容量单位。高效的 Token 管理直接影响应用的成本、延迟和输出质量。

## Token 预算的四个维度

### 1. 缓存策略

现代 LLM API 普遍支持 prompt 缓存。合理利用缓存可以将成本降低 90%：

- 将系统提示词放在 prompt 开头
- 保持静态内容的稳定性
- 利用 Anthropic 的 Prompt Caching 功能

### 2. 上下文压缩

当对话历史超过一定长度时，主动压缩历史对话：

```typescript
function compressHistory(messages: Message[]): Message[] {
  const SYSTEM_TOKENS = 2000;
  const RECENT_WINDOW = 8000;
  const totalBudget = SYSTEM_TOKENS + RECENT_WINDOW;

  // 保留最近的对话在完整形式
  // 对更早的对话进行摘要压缩
  return optimizeTokens(messages, totalBudget);
}
```

### 3. 智能路由

不同复杂度的任务应该使用不同能力的模型：

- 简单分类任务 → 小模型
- 代码生成 → 中等模型
- 复杂推理 → 最强模型

---
title: "Claude Code 调度循环"
date: "2026-06-10"
tag: "Agent 架构"
---

Claude Code 的核心是一个精密的调度循环（Scheduling Loop），它在用户意图、工具执行和上下文管理之间持续编排。

## 调度循环的三个阶段

### 1. 理解阶段

Agent 首先解析用户输入，结合系统提示词（System Prompt）和当前上下文，生成对任务的语义理解。这个阶段的关键是：

- **意图识别**：判断用户想要什么——是写代码、审查代码、还是提问
- **上下文组装**：将当前会话历史、项目文件、CLAUDE.md 等上下文拼接成完整的 prompt
- **工具筛选**：根据意图预筛选可能需要的工具集

### 2. 执行阶段

理解用户的意图后，Agent 进入执行阶段。这里有两种核心模式：

```typescript
// Tool Use 循环的简化模型
async function schedulingLoop(context: Context) {
  while (!taskComplete) {
    const response = await llm.generate(context);
    if (response.toolCalls) {
      const results = await executeTools(response.toolCalls);
      context.addResults(results);
    } else {
      return response.text;
    }
  }
}
```

### 3. 反思阶段

每次工具调用完成后，Agent 会评估结果：
- 是否满足用户意图？
- 是否需要额外的工具调用？
- 是否产生了错误需要修正？

这三个阶段构成了一个完整的调度循环，确保 Agent 能够自主地、迭代地完成复杂任务。

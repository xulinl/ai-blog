---
title: "Claude Code 概览"
date: "2026-06-12"
tag: "快速入门"
---

Claude Code 是 Anthropic 推出的终端原生 AI 编程 Agent。它不只是一个代码补全工具——而是一个能理解项目全貌、自主执行复杂工程任务的 AI 协作者。

## Claude Code 是什么？

Claude Code 运行在你的终端里，直接与你的代码库交互。它可以：

- 阅读和分析整个项目结构
- 编写、编辑、重构代码
- 运行 shell 命令和脚本
- 管理 Git 操作
- 搜索和理解代码逻辑

## 核心理念

### Agentic First

Claude Code 采用 Agent 优先的设计理念。你不需要精确指定每一步操作——描述目标，Claude 会自主规划并执行。

### Terminal Native

Claude Code 天然适配开发者的工作流。它不强迫你切换到另一个 IDE 或编辑器——就在你熟悉的终端环境中工作。

### Context Aware

通过 CLAUDE.md 文件，Claude Code 能够理解项目的架构决策、编码规范和团队约定，提供高度定制化的协作体验。

## 快速开始

```bash
# 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 在项目中初始化
cd your-project
claude init

# 开始协作
claude "帮我重构这个模块的错误处理逻辑"
```

只需要这三步，你就有了一个能理解你整个项目的 AI 编程伙伴。

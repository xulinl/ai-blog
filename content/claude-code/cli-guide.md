---
title: "CLI 命令完全指南"
date: "2026-06-08"
tag: "核心功能"
---

掌握 Claude Code 的 CLI 命令是高效使用它的基础。本文系统性地介绍所有核心命令及其使用场景。

## 基础命令

### claude init

初始化 Claude Code 配置，创建 .claude 目录和默认的 CLAUDE.md：

```bash
claude init --template typescript
```

### claude chat

启动交互式对话会话：

```bash
claude chat
```

### claude run

单次执行模式，适合脚本化和 CI/CD 场景：

```bash
claude run "检查 PR #42 的代码质量并生成审查报告"
```

## 高级用法

### 自定义模型选择

```bash
claude run --model sonnet "重构这个函数"
```

### 会话管理

```bash
# 恢复上次会话
claude chat --resume

# 列出最近的会话
claude sessions list
```

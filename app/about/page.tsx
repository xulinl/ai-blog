import { Globe, MessageCircle, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 xl:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-8">
        关于
      </h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          嘿，我是 Xulin —— 一个专注于 AI-Native 工程实践的软件工程师。
        </p>

        <p className="text-muted-foreground leading-relaxed">
          这个博客记录我在 AI 工程化道路上的探索：从 Claude Code 的深度使用，
          到 Agent 架构的设计思考，从 MCP 协议的实践，到 Prompt Engineering
          的系统化方法。我相信 AI 不仅是工具，更是重新定义软件工程范式的力量。
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-10 mb-4">
          关于本站
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          本站使用 Next.js + Tailwind CSS + shadcn/ui 构建，部署于 GitHub Pages。
          所有内容以 Markdown 编写，构建时静态生成。设计风格致敬 Tailwind CSS
          官方文档，力求简洁、清晰、高效。
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-10 mb-4">
          找到我
        </h2>
      </div>

      <div className="flex gap-3 mt-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <Globe className="h-4 w-4" />
          GitHub
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Twitter
        </a>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      </div>
    </div>
  );
}

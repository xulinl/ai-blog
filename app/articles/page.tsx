import { PostList } from "@/components/post-list";

const ARTICLES = [
  {
    slug: "rag-to-agent",
    title: "从 RAG 到 Agent：AI 应用架构的范式转移",
    desc: "回顾过去两年 AI 应用架构的演进路径——从简单的检索增强生成到自主 Agent 系统的技术跃迁。",
    date: "2026-06-01",
    tag: "观点",
  },
  {
    slug: "why-prompt-engineering",
    title: "为什么每个开发者都应该学会写 Prompt",
    desc: "Prompt Engineering 不是魔法，而是一门可学习的工程技能。探讨它对软件开发未来的影响。",
    date: "2026-05-22",
    tag: "观点",
  },
  {
    slug: "open-source-ai-tools",
    title: "开源 AI 工具的现状与未来",
    desc: "盘点 2026 年值得关注的开源 AI 开发工具，从模型服务到 Agent 框架的生态全景。",
    date: "2026-05-08",
    tag: "综述",
  },
];

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 xl:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          文章
        </h1>
        <p className="mt-1 text-muted-foreground">
          技术观点、思考与行业观察
        </p>
      </div>
      <PostList posts={ARTICLES} />
    </div>
  );
}

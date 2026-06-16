import Link from "next/link";
import { ArrowRight, Code2, Cpu, Layers } from "lucide-react";
import { getPosts } from "@/lib/content";

const ICONS = [Code2, Cpu, Layers];

export default function Home() {
  const featured = getPosts("notes").slice(0, 3);
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 xl:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              Exploring AI-Native Engineering
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-tight">
              AI-Native 工程的
              <br />
              <span className="text-primary">探索、记录、构建</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              一个软件工程师的 AI 工程实践笔记。记录 Claude Code、Agent
              架构、MCP 协议、Prompt Engineering
              等前沿技术的学习过程与工程落地经验。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-emerald-600 transition-colors"
              >
                开始阅读
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/claude-code"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Claude Code 专题
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
      </section>

      {/* Featured posts */}
      <section className="mx-auto max-w-7xl px-6 pb-24 xl:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            精选笔记
          </h2>
          <Link
            href="/notes"
            className="text-sm font-medium text-primary hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
          >
            查看全部
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((post, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Link
                key={post.slug}
                href={`/notes/${post.slug}`}
                className="group rounded-xl border border-border bg-card p-6 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {post.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

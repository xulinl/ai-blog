import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPost, getPosts } from "@/lib/content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getPosts("notes").map((post) => ({ slug: post.slug }));
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("notes", slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 xl:px-8">
      {/* Back */}
      <Link
        href="/notes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        返回笔记
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {post.tag}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            约 {Math.max(1, Math.round(post.content.length / 400))} 分钟阅读
          </span>
        </div>
      </div>

      {/* Content - simple Markdown rendering */}
      <article className="prose prose-slate dark:prose-invert max-w-none">
        {post.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) {
            return (
              <h2 key={i} className="text-xl font-bold text-foreground mt-10 mb-4">
                {line.slice(3)}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={i} className="text-lg font-semibold text-foreground mt-8 mb-3">
                {line.slice(4)}
              </h3>
            );
          }
          if (line.startsWith("```")) {
            return (
              <pre key={i} className="bg-slate-950 dark:bg-slate-900 text-slate-50 rounded-lg p-4 text-sm font-mono overflow-x-auto my-4">
                <code>{line.slice(3)}</code>
              </pre>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <li key={i} className="text-muted-foreground ml-4 list-disc">
                {line.slice(2)}
              </li>
            );
          }
          if (line.trim() === "") return <br key={i} />;
          return (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {line}
            </p>
          );
        })}
      </article>
    </div>
  );
}

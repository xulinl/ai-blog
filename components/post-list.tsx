import Link from "next/link";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  desc: string;
  date: string;
  tag: string;
}

export function PostList({
  posts,
  basePath = "",
}: {
  posts: Post[];
  basePath?: string;
}) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`${basePath}/${post.slug}`}
          className="group block rounded-xl border border-border bg-card p-5 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {post.tag}
            </span>
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {post.desc}
          </p>
        </Link>
      ))}
    </div>
  );
}

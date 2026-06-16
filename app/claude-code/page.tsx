import { TreeSidebar } from "@/components/tree-sidebar";
import { PostList } from "@/components/post-list";
import { getPosts, generateTree } from "@/lib/content";

export default function ClaudeCodePage() {
  const posts = getPosts("claude-code");
  const tree = generateTree("claude-code");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 xl:px-8">
      <div className="flex gap-10">
        <TreeSidebar items={tree} searchPlaceholder="搜索 Claude Code 笔记..." />
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Claude Code
            </h1>
            <p className="mt-1 text-muted-foreground">
              Claude Code 使用指南、进阶技巧与工程实践
            </p>
          </div>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}

import { TreeSidebar } from "@/components/tree-sidebar";
import { PostList } from "@/components/post-list";
import { getPosts, generateTree } from "@/lib/content";

export default function NotesPage() {
  const posts = getPosts("notes");
  const tree = generateTree("notes");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 xl:px-8">
      <div className="flex gap-10">
        <TreeSidebar items={tree} />
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              学习笔记
            </h1>
            <p className="mt-1 text-muted-foreground">
              AI 工程实践的技术笔记与思考
            </p>
          </div>
          <PostList posts={posts} basePath="/notes" />
        </div>
      </div>
    </div>
  );
}

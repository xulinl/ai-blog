import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tag: string;
  desc: string;
}

export interface Post extends PostMeta {
  content: string;
}

export interface TreeNode {
  label: string;
  href?: string;
  children?: TreeNode[];
  defaultOpen?: boolean;
}

export function generateTree(dir: string): TreeNode[] {
  const posts = getPosts(dir);
  const groups = new Map<string, Post[]>();

  for (const post of posts) {
    const tag = post.tag || "未分类";
    if (!groups.has(tag)) groups.set(tag, []);
    groups.get(tag)!.push(post);
  }

  return Array.from(groups.entries()).map(([tag, items]) => ({
    label: tag,
    defaultOpen: true,
    children: items.map((p) => ({
      label: p.title,
      href: `/${dir}/${p.slug}`,
    })),
  }));
}

export function getAvailableTags(dir: string): string[] {
  const posts = getPosts(dir);
  return [...new Set(posts.map((p) => p.tag || "未分类"))];
}

function getFirstParagraph(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("```")) {
      return trimmed.slice(0, 120) + (trimmed.length > 120 ? "..." : "");
    }
  }
  return "";
}

export function getPosts(dir: string): Post[] {
  const fullPath = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(fullPath, filename), "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.md$/, "");
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        tag: data.tag ?? "",
        desc: getFirstParagraph(content),
        content,
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPost(dir: string, slug: string): Post | null {
  const filePath = path.join(process.cwd(), "content", dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    tag: data.tag ?? "",
    desc: getFirstParagraph(content),
    content,
  };
}

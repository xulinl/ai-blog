"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface TreeNode {
  label: string;
  href?: string;
  children?: TreeNode[];
  defaultOpen?: boolean;
}

interface TreeSidebarProps {
  items: TreeNode[];
  searchPlaceholder?: string;
}

function TreeItem({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(node.defaultOpen ?? true);

  if (node.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center gap-1.5 w-full rounded-lg px-2 py-1.5 text-sm font-medium transition-colors",
            "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          <ChevronRight
            className={cn(
              "h-3 w-3 shrink-0 transition-transform duration-200",
              open && "rotate-90"
            )}
          />
          {node.label}
        </button>
        {open && (
          <div className="ml-3 space-y-0.5">
            {node.children.map((child) => (
              <TreeItem key={child.label} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={node.href ?? "#"}
      className={cn(
        "block rounded-lg px-2 py-1.5 text-sm transition-colors",
        pathname === node.href
          ? "text-primary bg-emerald-50 dark:bg-emerald-950/20 font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      {node.label}
    </Link>
  );
}

export function TreeSidebar({
  items,
  searchPlaceholder = "搜索...",
}: TreeSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-28 space-y-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        {/* Tree */}
        <nav className="space-y-0.5">
          {items.map((node) => (
            <TreeItem key={node.label} node={node} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

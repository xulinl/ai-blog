const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

function getAvailableTags(dir) {
  const fullPath = path.join(__dirname, "..", "content", dir);
  if (!fs.existsSync(fullPath)) return [];
  const tags = new Set();
  fs.readdirSync(fullPath)
    .filter((f) => f.endsWith(".md"))
    .forEach((f) => {
      const raw = fs.readFileSync(path.join(fullPath, f), "utf-8");
      const match = raw.match(/^tag:\s*"?(.+)"?\s*$/m);
      if (match && match[1]) tags.add(match[1].trim());
    });
  return [...tags];
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w一-鿿]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  console.log("\n📝 新建笔记\n");

  const category = process.argv[2] || (await ask("Tab (notes / claude-code): "));
  if (!["notes", "claude-code"].includes(category)) {
    console.log("❌ 分类只能是 notes 或 claude-code");
    process.exit(1);
  }

  const existingTags = getAvailableTags(category);
  if (existingTags.length > 0) {
    console.log("\n📂 已有的标签（用于左侧树状菜单分组）：");
    existingTags.forEach((t, i) => console.log(`   ${i + 1}. ${t}`));
    console.log("   (直接回车 = 使用第1个, 输入新名称 = 创建新分类)\n");
  }

  const tag = process.argv[3] || (await ask(`标签（分组）${existingTags.length > 0 ? ` [${existingTags[0]}]` : ""}: `));
  const finalTag = tag.trim() || existingTags[0] || "未分类";

  const title = process.argv[4] || (await ask("标题: "));
  if (!title.trim()) {
    console.log("❌ 标题不能为空");
    process.exit(1);
  }

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(title);

  const frontmatter = `---
title: "${title.trim()}"
date: "${date}"
tag: "${finalTag}"
---

${title.trim()}

`;

  const dir = path.join(__dirname, "..", "content", category);
  const filePath = path.join(dir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`⚠  文件已存在: content/${category}/${slug}.md`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, frontmatter);
  console.log(`\n✅ 已创建: content/${category}/${slug}.md`);
  console.log(`   Tab:  ${category}`);
  console.log(`   分组: ${finalTag}`);
  console.log(`   日期: ${date}`);
  console.log(`\n   写内容 → content/${category}/${slug}.md`);
  console.log(`   本地预览 → npm run dev`);
  console.log(`   部署 → git push\n`);

  rl.close();
}

main();

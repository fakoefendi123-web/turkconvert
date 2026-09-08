const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync('app').filter(d => 
  fs.statSync(path.join('app', d)).isDirectory() && 
  !['hakkimizda', 'gizlilik', 'iletisim', 'kullanim-kosullari'].includes(d)
);

console.log(`Found ${dirs.length} tool directories.`);

let updatedCount = 0;

for (const slug of dirs) {
  const p = path.join('app', slug, 'page.tsx');
  if (!fs.existsSync(p)) {
    console.warn(`File does not exist: ${p}`);
    continue;
  }

  let content = fs.readFileSync(p, 'utf8');

  // 1. Ensure getToolMetadata is imported
  if (!content.includes('getToolMetadata')) {
    if (content.includes('from "@/components/ui/ToolPageLayout";')) {
      content = content.replace(
        'import { ToolPageLayout } from "@/components/ui/ToolPageLayout";',
        'import { ToolPageLayout } from "@/components/ui/ToolPageLayout";\nimport { getToolMetadata } from "@/lib/constants/tool-seo";'
      );
    } else {
      content = 'import { getToolMetadata } from "@/lib/constants/tool-seo";\n' + content;
    }
  }

  // 2. Replace metadata export with getToolMetadata(slug)
  content = content.replace(
    /export const metadata: Metadata = \{[\s\S]*?\};/,
    `export const metadata: Metadata = getToolMetadata("${slug}");`
  );

  // 3. Replace <ToolPageLayout ...> with <ToolPageLayout toolId="slug">
  content = content.replace(
    /<ToolPageLayout(?:\s+title="[^"]*")?(?:\s+description="[^"]*")?\s*>/,
    `<ToolPageLayout toolId="${slug}">`
  );

  // In case title and description were in reverse order or multi-line:
  content = content.replace(
    /<ToolPageLayout[\s\S]*?>/,
    `<ToolPageLayout toolId="${slug}">`
  );

  fs.writeFileSync(p, content, 'utf8');
  updatedCount++;
  console.log(`Updated: ${slug}/page.tsx`);
}

console.log(`Successfully updated ${updatedCount} tool pages.`);

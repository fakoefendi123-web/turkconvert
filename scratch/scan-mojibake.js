const fs = require('fs');
const path = require('path');

const suspiciousPatterns = ['Ã¶', 'Ã¼', 'Ã§', 'Ã½', 'ÄŸ', 'ÅŸ', 'Ã–', 'Ãœ', 'Ã‡', 'Ä°', 'Åž', 'Äž', 'â”€', 'â†’', 'âœ“', 'Ã—'];

function walk(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (['node_modules', '.next', '.git', 'out', 'scratch'].includes(file)) return;
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (/\.(tsx|ts|js|jsx|json|md|css|html)$/.test(file)) {
      files.push(full);
    }
  });
  return files;
}

const allFiles = walk('.');
let foundCount = 0;
const affectedFiles = new Set();
allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  suspiciousPatterns.forEach(pat => {
    if (content.includes(pat)) {
      console.log(`Suspicious pattern "${pat}" in ${f}`);
      foundCount++;
      affectedFiles.add(f);
    }
  });
});

console.log(`Scan finished. Total findings: ${foundCount} across ${affectedFiles.size} files.`);

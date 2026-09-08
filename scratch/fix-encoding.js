const fs = require('fs');
const path = require('path');

const replacementMap = [
  // Double-encoded Turkish characters
  ['Ã¶', 'ö'],
  ['Ã¼', 'ü'],
  ['Ã§', 'ç'],
  ['Ä±', 'ı'],
  ['ÄŸ', 'ğ'],
  ['ÅŸ', 'ş'],
  ['Ä°', 'İ'],
  ['Ã–', 'Ö'],
  ['Ãœ', 'Ü'],
  ['Ã‡', 'Ç'],
  ['Äž', 'Ğ'],
  ['Åž', 'Ş'],
  ['Ã¢', 'â'],
  ['Ã®', 'î'],
  ['Ã»', 'û'],
  ['Ã©', 'é'],

  // Double-encoded punctuation & symbols
  ['â†’', '→'],
  ['âœ“', '✓'],
  ['â€“', '–'],
  ['â€”', '—'],
  ['â€™', '’'],
  ['â€˜', '‘'],
  ['â€œ', '“'],
  ['â€\u009d', '”'],
  ['â€¢', '•'],
  ['ğŸš€', '🚀'],

  // Any remaining old domain references
  ['https://turkconvert.com', 'https://turkconvert.online'],
  ['http://turkconvert.com', 'https://turkconvert.online'],
  ['http://turkconvert.online', 'https://turkconvert.online'],
  ['turkconvert.com', 'turkconvert.online'],
];

function fixContent(content) {
  let updated = content;
  for (const [from, to] of replacementMap) {
    if (updated.includes(from)) {
      updated = updated.split(from).join(to);
    }
  }
  return updated;
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        processDirectory(fullPath);
      }
    } else if (
      entry.isFile() &&
      /\.(tsx?|jsx?|json|md|html|css)$/i.test(entry.name)
    ) {
      const original = fs.readFileSync(fullPath, 'utf8');
      const fixed = fixContent(original);
      if (original !== fixed) {
        fs.writeFileSync(fullPath, fixed, 'utf8');
        console.log('Fixed:', fullPath);
      }
    }
  }
}

const targetDirs = ['app', 'components', 'lib'];
const rootDir = process.cwd();

for (const d of targetDirs) {
  const p = path.join(rootDir, d);
  if (fs.existsSync(p)) {
    processDirectory(p);
  }
}

console.log('Encoding & domain cleanup complete.');

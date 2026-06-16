/**
 * Add loading="lazy" to all <img> tags in JSX files that don't already have it
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dirs = ['./src/pages', './src/components'];
let totalUpdated = 0;

for (const dir of dirs) {
  const files = readdirSync(dir).filter(f => f.endsWith('.jsx'));
  for (const file of files) {
    const fp = join(dir, file);
    let content = readFileSync(fp, 'utf8');

    // Add loading="lazy" to <img tags that don't already have loading=
    const updated = content.replace(
      /<img\s(?![^>]*loading=)/g,
      '<img loading="lazy" '
    );

    if (content !== updated) {
      writeFileSync(fp, updated);
      console.log(`  ✅ lazy added: ${fp}`);
      totalUpdated++;
    }
  }
}

console.log(`\n📊 Updated ${totalUpdated} file(s) with loading="lazy"\n`);

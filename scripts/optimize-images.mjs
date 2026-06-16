/**
 * Image optimization script for Trustera
 * Converts PNG → WebP (40-70% smaller) and keeps original PNG as fallback
 * Requires: npm install sharp --save-dev
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const IMG_DIR = './public/img';

const files = readdirSync(IMG_DIR).filter(f => extname(f).toLowerCase() === '.png');

let totalPng = 0;
let totalWebp = 0;

console.log(`\n🔧 Converting ${files.length} PNG → WebP...\n`);

for (const file of files) {
  const inputPath = join(IMG_DIR, file);
  const name = basename(file, '.png');
  const outputPath = join(IMG_DIR, `${name}.webp`);

  const pngSize = statSync(inputPath).size;
  totalPng += pngSize;

  try {
    await sharp(inputPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const webpSize = statSync(outputPath).size;
    totalWebp += webpSize;
    const saving = Math.round((1 - webpSize / pngSize) * 100);
    const pngKB = Math.round(pngSize / 1024);
    const webpKB = Math.round(webpSize / 1024);

    console.log(`  ✅ ${file.padEnd(38)} ${String(pngKB + ' KB').padStart(7)} → ${String(webpKB + ' KB').padStart(7)}  (-${saving}%)`);
  } catch (err) {
    console.error(`  ❌ ${file}: ${err.message}`);
  }
}

const totalPngKB = Math.round(totalPng / 1024);
const totalWebpKB = Math.round(totalWebp / 1024);
const totalSaving = Math.round((1 - totalWebp / totalPng) * 100);
const savedKB = Math.round((totalPng - totalWebp) / 1024);

console.log(`\n📊 Total PNG: ${totalPngKB} KB → WebP: ${totalWebpKB} KB  (-${totalSaving}% / economie ${savedKB} KB)\n`);
console.log('🎉 Done! Update products.js and components to use .webp paths.\n');

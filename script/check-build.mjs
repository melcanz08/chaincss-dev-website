#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Checking production build...\n');

const distDir = 'dist';
const cssPath = path.join(distDir, 'assets', 'chaincss.css');

// Check 1: Does the CSS file exist?
if (!fs.existsSync(cssPath)) {
  console.error('❌ chaincss.css not found!');
  process.exit(1);
}
console.log('  ✅ chaincss.css exists');

// Check 2: Does it contain hover styles?
const css = fs.readFileSync(cssPath, 'utf8');
const hoverCount = (css.match(/:hover/g) || []).length;
if (hoverCount === 0) {
  console.error('❌ No :hover styles found in production CSS!');
  console.error('   This will break on Vercel.');
  process.exit(1);
}
console.log(`  ✅ Found ${hoverCount} :hover styles`);

// Check 3: Does it contain responsive styles?
const mediaCount = (css.match(/@media/g) || []).length;
if (mediaCount === 0) {
  console.warn('  ⚠️ No @media queries found (responsive styles missing?)');
} else {
  console.log(`  ✅ Found ${mediaCount} @media queries`);
}

// Check 4: Does index.html reference the CSS?
const htmlPath = path.join(distDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes('chaincss.css')) {
  console.error('❌ index.html does not reference chaincss.css!');
  process.exit(1);
}
console.log('  ✅ index.html references chaincss.css');

console.log('\n✅ Production build looks good!\n');
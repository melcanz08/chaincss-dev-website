import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Run chaincss CLI to generate .css files alongside .chain.ts files
execSync('npx chaincss build -c "src/**/*.chain.ts"', { 
  cwd: root, 
  stdio: 'inherit' 
});

// Combine all generated .css files into one
const stylesDir = path.join(root, 'src', 'styles');
const publicDir = path.join(root, 'public');
const cssFiles = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css'));

let combined = '/* ChainCSS Generated — DO NOT EDIT */\n\n';
for (const file of cssFiles) {
  const content = fs.readFileSync(path.join(stylesDir, file), 'utf8');
  combined += `/* ${file} */\n${content}\n\n`;
}

fs.writeFileSync(path.join(publicDir, 'chaincss.css'), combined);
console.log(`✅ Combined ${cssFiles.length} CSS files → public/chaincss.css (${combined.length}B)`);

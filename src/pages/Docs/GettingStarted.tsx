import { useLocation } from 'react-router-dom';
import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function GettingStarted() {
  const location = useLocation();
  const isInstall = location.pathname.includes('installation');
  const isQuick = location.pathname.includes('quickstart');

  if (isInstall) {
    return (
      <>
        <h1 className={contentTitle}>Installation</h1>
        <p className={contentDesc}>Install ChainCSS and its peer dependencies for your framework.</p>

        <h2 className={sectionHeading}>Base Install</h2>
        <pre className={codeBlock}>{`npm install chaincss`}</pre>
        <p className={paragraph}>
          ChainCSS ships with TypeScript types included. No additional <span className={inlineCode}>@types/</span> packages needed.
        </p>

        <h2 className={sectionHeading}>Peer Dependencies</h2>
        <p className={paragraph}>
          ChainCSS optionally supports React, Vue, and Svelte as peer dependencies. Only install what you use:
        </p>
        <pre className={codeBlock}>{`npm install chaincss react     # React
npm install chaincss vue       # Vue 3
npm install chaincss svelte    # Svelte 4+`}</pre>

        <h2 className={sectionHeading}>Vite Plugin (Recommended)</h2>
        <pre className={codeBlock}>{`// vite.config.ts
import chaincss from 'chaincss/plugin/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [chaincss(), react()]
})`}</pre>
        <p className={paragraph}>
          The Vite plugin handles <span className={inlineCode}>.chain.ts</span> file discovery, 
          compilation, CSS generation, class name exports, and HMR — automatically.
        </p>

        <h2 className={sectionHeading}>Requirements</h2>
        <p className={paragraph}>
          Node.js 18+, TypeScript 5+ (optional but recommended).
          ChainCSS is <span className={inlineCode}>"type": "module"</span> — ESM only.
        </p>
      </>
    );
  }

  if (isQuick) {
    return (
      <>
        <h1 className={contentTitle}>Quick Start</h1>
        <p className={contentDesc}>Create your first chainable style in under a minute.</p>

        <h2 className={sectionHeading}>1. Create a style file</h2>
        <pre className={codeBlock}>{`// src/styles/button.chain.ts
import { chain } from 'chaincss'

export const btn = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('12px 24px')
  .rounded(8)
  .fontSize(16)
  .fontWeight(600)
  .hover()
    .bg('#4f46e5')
    .transform('translateY(-2px)')
  .end()
  .$el('button')`}</pre>

        <h2 className={sectionHeading}>2. Import and use</h2>
        <pre className={codeBlock}>{`// Button.tsx
import { btn } from '../styles/button.chain'

export default function Button() {
  return <button className={btn}>Click me</button>
}
// btn is a string: 'chain-button'`}</pre>

        <p className={paragraph}>
          That's it. <span className={inlineCode}>btn</span> is a plain string — the CSS was extracted
          at build time. Zero JavaScript ships for these styles.
        </p>

        <div className={note}>
          <strong>How it works:</strong> The Vite plugin finds <span className={inlineCode}>.chain.ts</span> files,
          evaluates the <span className={inlineCode}>chain()</span> calls at build time, generates CSS,
          and replaces the module with string exports. Your bundle only sees the final class names.
        </div>
      </>
    );
  }

  // Default: Introduction
  return (
    <>
      <h1 className={contentTitle}>ChainCSS</h1>
      <p className={contentDesc}>
        The CSS-in-JS library that compiles to zero. Write styles as a chainable API. 
        Ship static CSS with zero runtime cost. Dynamic values? Only the parts that need 
        to be dynamic stay in JS.
      </p>

      <h2 className={sectionHeading}>The Problem</h2>
      <p className={paragraph}>
        CSS-in-JS libraries like styled-components ship a ~14KB runtime that constructs 
        stylesheets in the browser. Utility CSS libraries like Tailwind work at build time 
        but can't handle dynamic values. ChainCSS gives you both — static compilation with 
        dynamic escape hatches.
      </p>

      <h2 className={sectionHeading}>The ChainCSS Solution</h2>
      <p className={paragraph}>
        ChainCSS introduces <strong>auto-detection mixed mode</strong>. Strings and numbers 
        compile to static CSS at build time. Functions stay in JS and resolve at runtime. 
        No manual configuration, no mode switching — one API handles both.
      </p>

      <pre className={codeBlock}>{`// Static only — compiles to CSS, zero runtime
const btn = chain()
  .bg('#6366f1')
  .padding(16)
  .$el('btn')

// Mixed mode — static compiles to CSS, dynamic stays in JS
const btn = chain.dynamic()
  .bg('#6366f1')                              // → static CSS
  .opacity(() => isActive ? 1 : 0.5)          // → runtime
  .$el('btn')`}</pre>

      <h2 className={sectionHeading}>Key Features</h2>
      <p className={paragraph}>
        • <strong>Zero runtime by default</strong> — static values become plain CSS files<br />
        • <strong>Mixed mode when needed</strong> — dynamic functions resolve at runtime<br />
        • <strong>5-stage compiler pipeline</strong> — normalize, validate, analyze, optimize, lower<br />
        • <strong>500+ CSS properties</strong> as camelCase chainable methods<br />
        • <strong>Built-in macros</strong>: center(), pill(), glass(), truncate(), and more<br />
        • <strong>Design tokens</strong> with theme contracts and validation<br />
        • <strong>React, Vue, Svelte, SolidJS</strong> — optional peer dependencies<br />
        • <strong>Vite + Webpack plugins</strong> — zero-config setup
      </p>
    </>
  );
}

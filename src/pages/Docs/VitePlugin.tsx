import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function VitePlugin() {
  return (
    <>
      <h1 className={contentTitle}>Vite Plugin</h1>
      <p className={contentDesc}>Deep integration with Vite's module graph for automatic compilation, HMR, and inspector injection.</p>
      <h2 className={sectionHeading}>Features</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2.5, color: '#cbd5e1', fontSize: 15 }}>
        <li><strong>Auto-Compilation</strong> — Compiles .chain.ts files on save</li>
        <li><strong>HMR via handleHotUpdate</strong> — Properly invalidates module graph for JS + CSS sync</li>
        <li><strong>Memory Cache</strong> — Stitches CSS from cache, no double filesystem scan</li>
        <li><strong>Inspector Injection</strong> — Ctrl+Shift+I available in dev mode</li>
        <li><strong>Dynamic Base Path</strong> — Respects Vite's <code className={inlineCode}>config.base</code> for asset paths</li>
      </ul>
      <pre className={codeBlock}>{`import chaincss from 'chaincss/vite'
export default defineConfig({
  plugins: [chaincss({ verbose: true }), react()]
})`}</pre>
    </>
  );
}

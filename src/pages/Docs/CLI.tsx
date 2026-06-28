import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode
} from '../../styles/docs.chain.ts';

export default function CLI() {
  return (
    <>
      <h1 className={contentTitle}>CLI</h1>
      <p className={contentDesc}>
        ChainCSS includes a command-line interface for building styles outside of Vite/Webpack.
      </p>

      <h2 className={sectionHeading}>Commands</h2>
      <pre className={codeBlock}>{`npx chaincss build     # Build once
npx chaincss watch     # Watch for changes
npx chaincss init      # Initialize config`}</pre>

      <h2 className={sectionHeading}>Configuration</h2>
      <p className={paragraph}>
        Create <span className={inlineCode}>chaincss.config.js</span>:
      </p>
      <pre className={codeBlock}>{`export default {
  inputs: ['src/**/*.chain.ts'],
  output: {
    outputDir: 'dist',
    minify: true
  },
  atomic: { enabled: true },
  tokens: {
    colors: { primary: '#6366f1' }
  }
}`}</pre>
    </>
  );
}

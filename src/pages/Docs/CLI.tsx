import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function CLI() {
  return (
    <>
      <h1 className={contentTitle}>CLI Commands</h1>
      <p className={contentDesc}>
        ChainCSS includes a command-line interface for building, watching, auditing, and managing your styles.
      </p>

      <h2 className={sectionHeading}>Development Server</h2>
      <p className={paragraph}>Start a dev server with live reload and automatic CSS compilation:</p>
      <pre className={codeBlock}>{`npx chaincss dev              # Start dev server on port 3000
npx chaincss dev --port 8080  # Custom port
npx chaincss dev --config prod.chaincss.config.js`}</pre>

      <h2 className={sectionHeading}>Build for Production</h2>
      <pre className={codeBlock}>{`npx chaincss build              # Build once (CI/CD)
npx chaincss build --watch      # Watch mode
npx chaincss build --minify     # Minified output`}</pre>

      <h2 className={sectionHeading}>Accessibility Audit</h2>
      <pre className={codeBlock}>{`npx chaincss check              # Run WCAG 2.2 audit
npx chaincss check --fix        # Auto-fix contrast, touch targets, font sizes
npx chaincss check --verbose    # Detailed per-file report`}</pre>

      <h2 className={sectionHeading}>Project Setup</h2>
      <pre className={codeBlock}>{`npx chaincss init               # Create chaincss.config.js`}</pre>

      <h2 className={sectionHeading}>Compilation Timeline</h2>
      <pre className={codeBlock}>{`npx chaincss timeline list      # View compilation history
npx chaincss timeline inspect   # Detailed per-file timeline`}</pre>

      <h2 className={sectionHeading}>Cache Management</h2>
      <pre className={codeBlock}>{`npx chaincss cache stats        # Show cache statistics (entries, size, hit rate)
npx chaincss cache list         # List all cache entries
npx chaincss cache clear        # Clear all cache data
npx chaincss cache prune        # Remove expired entries
npx chaincss cache validate     # Validate cache integrity
npx chaincss cache backup       # Backup cache to file
npx chaincss cache inspect --key <key>  # Inspect a specific entry
npx chaincss cache delete --key <key>   # Delete a specific entry`}</pre>
      <p className={paragraph}>
        <strong>Cache options:</strong> <code className={inlineCode}>--key</code>, <code className={inlineCode}>--force</code>, <code className={inlineCode}>--max-age</code>, <code className={inlineCode}>--max-size</code>, <code className={inlineCode}>--output</code>, <code className={inlineCode}>--verbose</code>
      </p>
    </>
  );
}

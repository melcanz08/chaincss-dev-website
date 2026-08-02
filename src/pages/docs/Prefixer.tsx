import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Prefixer() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Vendor Prefixer</h1>
      <p className={contentDesc}>
        ChainCSS includes a dual-mode vendor prefixer — full Autoprefixer integration
        via PostCSS for complete coverage, or a built-in lightweight mode covering the
        most common properties with zero dependencies.
      </p>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
export default defineConfig({
  prefixer: {
    enabled: true,
    mode: 'lightweight',     // 'lightweight' | 'full' | 'auto'
    browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
  }
})`}</code></pre>

      <h2 className={sectionHeading}>Two Modes</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}></th>
            <th className={docTh}>Lightweight</th>
            <th className={docTh}>Full (Autoprefixer)</th>
          </tr></thead>
          <tbody>{[
            ['Dependencies', 'None (built-in)', 'postcss + autoprefixer'],
            ['Coverage', '10 common properties', 'Full CSS property coverage'],
            ['Speed', 'Sub-millisecond', '~5-10ms (PostCSS overhead)'],
            ['Browser targeting', 'Not configurable', 'Full browserslist support'],
            ['Flexbox prefixes', 'No', "Yes (including -webkit- 2009 spec)"],
            ['Grid prefixes', 'No', 'Yes (with autoplace mode)'],
            ['Keyframe duplication', 'Yes (@-webkit-keyframes)', 'Yes (full)'],
            ['Value prefixes', 'Yes (position: sticky)', 'Yes (full)'],
          ].map(([aspect, lightweight, full], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{aspect}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{lightweight}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{full}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Lightweight Mode: Properties Covered</h2>
      <p className={paragraph}>
        The built-in mode covers the 10 most commonly prefixed CSS properties.
        No dependencies, no PostCSS overhead, runs in under a millisecond:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Property</th>
            <th className={docTh}>Prefix</th>
            <th className={docTh}>Prefixed Property</th>
          </tr></thead>
          <tbody>{[
            ['backdrop-filter', '-webkit-', '-webkit-backdrop-filter'],
            ['user-select', '-webkit-', '-webkit-user-select'],
            ['appearance', '-webkit-', '-webkit-appearance'],
            ['background-clip', '-webkit-', '-webkit-background-clip'],
            ['mask-image', '-webkit-', '-webkit-mask-image'],
            ['mask-size', '-webkit-', '-webkit-mask-size'],
            ['mask-repeat', '-webkit-', '-webkit-mask-repeat'],
            ['mask-position', '-webkit-', '-webkit-mask-position'],
            ['text-fill-color', '-webkit-', '-webkit-text-fill-color'],
            ['text-stroke', '-webkit-', '-webkit-text-stroke'],
          ].map(([prop, prefix, prefixed], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{prop}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{prefix}</td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{prefixed}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Value Prefixes</h2>
      <p className={paragraph}>
        The lightweight mode also handles value-level prefixes:
      </p>

      <pre className={codeBlock}><code className="language-css">{`/* Input */
.sticky-header {
  position: sticky;
  top: 0;
}

/* Output — value prefix auto-added */
.sticky-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}`}</code></pre>

      <h2 className={sectionHeading}>Auto Keyframe Duplication</h2>
      <p className={paragraph}>
        Both modes automatically duplicate <code className={inlineCode}>@keyframes</code> blocks
        with the <code className={inlineCode}>@-webkit-keyframes</code> prefix. Already-prefixed
        keyframes are not duplicated:
      </p>

      <pre className={codeBlock}><code className="language-css">{`/* Input */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Output — @-webkit-keyframes auto-added */
@-webkit-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`}</code></pre>

      <h2 className={sectionHeading}>Full Mode: Autoprefixer Integration</h2>
      <p className={paragraph}>
        Install PostCSS and Autoprefixer for complete CSS property coverage:
      </p>

      <pre className={codeBlock}><code className="language-bash">{`npm install -D postcss autoprefixer`}</code></pre>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
export default defineConfig({
  prefixer: {
    enabled: true,
    mode: 'full',
    browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
    flexbox: true,           // Add -webkit- prefixes for flexbox (2009 spec)
    grid: 'autoplace',       // 'autoplace' | 'no-autoplace' | false
    remove: true,            // Remove unnecessary prefixes
    add: true,               // Add missing prefixes
    sourceMap: true,         // Generate source maps
    sourceMapInline: false,  // Inline source maps
    verbose: false,          // Log prefixing activity
  }
})`}</code></pre>

      <h2 className={sectionHeading}>Configuration Reference</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['enabled', 'boolean', 'true', 'Enable or disable prefixing'],
            ['mode', "'lightweight' | 'full' | 'auto'", "'lightweight'", 'Prefixing mode. auto is deprecated — use lightweight'],
            ['browsers', 'string[]', "['> 0.5%', 'last 2 versions', 'not dead']", 'Browserslist query (full mode only)'],
            ['flexbox', 'boolean | "no-2009"', 'true', 'Add flexbox prefixes (full mode only)'],
            ['grid', "'autoplace' | 'no-autoplace' | 'false' 'autoplace'", 'Add grid prefixes (full mode only)'],
            ['remove', 'boolean', 'true', 'Remove unnecessary prefixes'],
            ['add', 'boolean', 'true', 'Add missing prefixes'],
            ['sourceMap', 'boolean', 'true', 'Generate source maps'],
            ['sourceMapInline', 'boolean', 'false', 'Inline source maps in CSS'],
            ['verbose', 'boolean', 'false', 'Log prefixing activity'],
          ].map(([opt, type, def, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{opt}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{def}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Recommendation:</strong> Use lightweight mode during development for speed.
        Switch to full mode in production if you need complete browser coverage. The lightweight
        mode handles 95% of real-world prefixing needs with zero dependencies.
      </div>
    </>
  );
}
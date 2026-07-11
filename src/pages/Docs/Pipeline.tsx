import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

export default function Pipeline() {
  return (
    <>
      <h1 className={contentTitle}>The 5-Stage Compiler Pipeline</h1>
      <p className={contentDesc}>
        Every <code className={inlineCode}>.chain.ts</code> file goes through five stages at build time.
        Understanding the pipeline helps you debug styles and choose the right preset.
      </p>

      <h2 className={sectionHeading}>Pipeline Overview</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Stage</th><th className={docTh}>What It Does</th><th className={docTh}>Example</th></tr></thead>
          <tbody>
            <tr><td className={docTd}><strong>1. Normalization</strong></td><td className={docTd}>Intent detection, unit normalization, layout macros</td><td className={docTd}><code className={inlineCode}>flexbox</code> → <code className={inlineCode}>display: flex</code></td></tr>
            <tr><td className={docTd}><strong>2. Validation</strong></td><td className={docTd}>WCAG 2.2 checks, conflict detection, z-index validation</td><td className={docTd}>Flags font-size below 12px</td></tr>
            <tr><td className={docTd}><strong>3. Analysis</strong></td><td className={docTd}>Responsive patterns, layout recognition, dead code detection</td><td className={docTd}>Detects duplicate card-layout patterns</td></tr>
            <tr><td className={docTd}><strong>4. Optimization</strong></td><td className={docTd}>Token resolution, compression, specificity sorting</td><td className={docTd}><code className={inlineCode}>$colors.primary</code> → <code className={inlineCode}>#6366f1</code></td></tr>
            <tr><td className={docTd}><strong>5. Lowering</strong></td><td className={docTd}>CSS emission from IR</td><td className={docTd}>IR → plain CSS string</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Presets</h2>
      <p className={paragraph}>
        Choose a preset based on your environment. Presets control which passes run in each stage:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Preset</th><th className={docTh}>Use Case</th><th className={docTh}>Passes</th></tr></thead>
          <tbody>
            <tr><td className={docTd}><code className={inlineCode}>default</code></td><td className={docTd}>Development</td><td className={docTd}>Normalize + Compress + Lower</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>production</code></td><td className={docTd}>Build</td><td className={docTd}>+ Specificity + Dead-code + Media pack</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>ci</code></td><td className={docTd}>CI / Linting</td><td className={docTd}>Full validation + analysis + optimization</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>lint</code></td><td className={docTd}>Validate only</td><td className={docTd}>Normalize + Validate + Emit</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>atomic</code></td><td className={docTd}>Utility CSS</td><td className={docTd}>Normalize + Atomic extract + Emit</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Configuring the Pipeline</h2>
      <pre className={codeBlock}>{`// chaincss.config.js
export default {
  // Choose a preset
  pipeline: 'production',

  // Or customize individual stages
  pipeline: {
    normalization: ['intent-normalizer', 'unit-normalizer'],
    validation: ['accessibility-validator'],
    optimization: ['css-compressor', 'dead-code-eliminator'],
  },
}`}</pre>

      <h2 className={sectionHeading}>Pipeline in Vite Plugin</h2>
      <pre className={codeBlock}>{`// vite.config.ts
import chaincss from 'chaincss/vite'

export default defineConfig({
  plugins: [
    chaincss({
      pipeline: 'production',  // Use production preset for builds
      verbose: true,           // See pipeline report in console
    }),
    react()
  ]
})`}</pre>

      <h2 className={sectionHeading}>Reading the Pipeline Report</h2>
      <p className={paragraph}>
        When <code className={inlineCode}>verbose: true</code>, ChainCSS prints a pipeline report:
      </p>
      <pre className={codeBlock}>{`═══════════════════════════════════════════
  ChainCSS Pipeline Report
═══════════════════════════════════════════

  [NORMALIZATION]
    ✓ intent-normalizer            0ms
    ✓ unit-normalizer              0ms

  [OPTIMIZATION]
    ✓ token-resolver               0ms
    ✓ css-compressor               0ms
      📦 Saved 3 bytes, 0 rules eliminated

  [LOWERING]
    ✓ css-emitter                  0ms
═══════════════════════════════════════════`}</pre>

      <h2 className={sectionHeading}>Feature Detection & Skipping</h2>
      <p className={paragraph}>
        The pipeline detects which features your styles use and skips irrelevant passes.
        If no <code className={inlineCode}>$token</code> references exist, the token-resolver pass is skipped.
        This keeps compilation fast even with the full CI preset.
      </p>
      <pre className={codeBlock}>{`[ChainCSS] ℹ️  Skipped 1 pass(es) — no relevant features detected`}</pre>

      <h2 className={sectionHeading}>Custom Passes</h2>
      <p className={paragraph}>
        You can write custom pipeline passes. Each pass is a function that receives the IR and returns transformed IR:
      </p>
      <pre className={codeBlock}>{`import { createPipeline } from 'chaincss/compiler'

const myPipeline = createPipeline('default', {
  optimization: [
    {
      name: 'my-custom-pass',
      cost: 'cheap',
      requiredFor: ['css'],
      optimize(ir, context) {
        // Transform the IR here
        return { ir, savings: { rulesEliminated: 0, declarationsEliminated: 0, bytesSaved: 0 }, changes: 0 }
      }
    },
  ],
})`}</pre>
    </>
  );
}

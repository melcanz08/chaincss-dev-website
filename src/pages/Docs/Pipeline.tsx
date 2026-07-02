import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

export default function Pipeline() {
  return (
    <>
      <h1 className={contentTitle}>Compiler Pipeline</h1>
      <p className={contentDesc}>
        Every style runs through a 5-stage compiler pipeline at build time. 
        No configuration needed — it just works.
      </p>

      <h2 className={sectionHeading}>The 5 Stages</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Stage</th><th className={docTh}>Pass</th><th className={docTh}>What It Does</th></tr></thead>
          <tbody>
            <tr><td className={docTd} rowSpan={2} style={{fontWeight:600}}>1. Normalize</td><td className={docTd}>Intent Normalizer</td><td className={docTd}>Fixes patterns (e.g., flexbox → flex, abs → absolute), adds defaults</td></tr>
            <tr><td className={docTd}>Unit Normalizer</td><td className={docTd}>Adds px to bare numbers, normalizes values</td></tr>
            <tr><td className={docTd} rowSpan={2} style={{fontWeight:600}}>2. Validate</td><td className={docTd}>Accessibility Validator</td><td className={docTd}>WCAG 2.2 contrast, font-size, touch target, focus checks</td></tr>
            <tr><td className={docTd}>Conflict Validator</td><td className={docTd}>z-index on static, flex/grid properties without display:flex/grid</td></tr>
            <tr><td className={docTd} rowSpan={3} style={{fontWeight:600}}>3. Analyze</td><td className={docTd}>Responsive Analyzer</td><td className={docTd}>Flags fixed widths on mobile, 100vh issues, large typography</td></tr>
            <tr><td className={docTd}>Layout Analyzer</td><td className={docTd}>Detects repeated layout patterns, suggests macros</td></tr>
            <tr><td className={docTd}>Pattern Detector</td><td className={docTd}>Finds repeated style clusters, recommends recipes</td></tr>
            <tr><td className={docTd} rowSpan={4} style={{fontWeight:600}}>4. Optimize</td><td className={docTd}>CSS Compressor</td><td className={docTd}>Shortens hex colors, removes redundant values, collapses shorthands</td></tr>
            <tr><td className={docTd}>Dead Code Eliminator</td><td className={docTd}>Removes unreferenced and duplicate rules</td></tr>
            <tr><td className={docTd}>Specificity Sorter</td><td className={docTd}>Sorts rules by specificity for predictable cascade</td></tr>
            <tr><td className={docTd}>Media Query Packer</td><td className={docTd}>Merges duplicate media queries, sorts mobile-first</td></tr>
            <tr><td className={docTd} rowSpan={3} style={{fontWeight:600}}>5. Lower</td><td className={docTd}>Intent Resolver</td><td className={docTd}>Resolves intent() calls to CSS declarations</td></tr>
            <tr><td className={docTd}>Token Resolver</td><td className={docTd}>Resolves design tokens to CSS values</td></tr>
            <tr><td className={docTd}>CSS Emitter</td><td className={docTd}>Prints final CSS output</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Pipeline Presets</h2>
      <p className={paragraph}>
        Choose a preset that matches your workflow:
      </p>
      <pre className={codeBlock}>{`import { createPipeline } from 'chaincss'

// Fast, zero-config — the default for everyday use
const pipeline = createPipeline('default')

// Full optimization for production builds
const pipeline = createPipeline('production')

// Validation + analysis + optimization — use in CI
const pipeline = createPipeline('ci')

// Validation only — fast feedback in development
const pipeline = createPipeline('lint')

// Atomic CSS extraction
const pipeline = createPipeline('atomic')`}</pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Preset</th><th className={docTh}>Includes</th></tr></thead>
          <tbody>
            <tr><td className={docTd}><span className={inlineCode}>default</span></td><td className={docTd}>Normalize + Compress + Lower</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>production</span></td><td className={docTd}>Default + Specificity + Dead Code + Media Query + Source</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>ci</span></td><td className={docTd}>Validation + Analysis + All optimizations + Accessibility</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>lint</span></td><td className={docTd}>Normalize + Validators only — no optimization</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>atomic</span></td><td className={docTd}>Normalize + Atomic Extractor + CSS Emitter</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Disable the Pipeline</h2>
      <pre className={codeBlock}>{`const compiler = new ChainCSSCompiler({
  experimental: { enablePipeline: false }
})`}</pre>

      <h2 className={sectionHeading}>Pipeline Report</h2>
      <p className={paragraph}>
        Enable verbose mode to see a timing report for each pass:
      </p>
      <pre className={codeBlock}>{`// Vite plugin
chaincss({ verbose: true })

// Compiler
const compiler = new ChainCSSCompiler({ verbose: true })
compiler.printPipelineReport()`}</pre>
    </>
  );
}
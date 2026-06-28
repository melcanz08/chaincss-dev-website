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
            <tr><td className={docTd} rowSpan={2} style={{fontWeight:600}}>Normalize</td><td className={docTd}>Intent Normalizer</td><td className={docTd}>Fixes patterns (e.g., flexbox → flex, abs → absolute), adds defaults</td></tr>
            <tr><td className={docTd}>Unit Normalizer</td><td className={docTd}>Adds px to bare numbers, normalizes values</td></tr>
            <tr><td className={docTd} rowSpan={1} style={{fontWeight:600}}>Optimize</td><td className={docTd}>CSS Compressor</td><td className={docTd}>Shortens hex colors (#ff6633 → #f63), minifies values</td></tr>
            <tr><td className={docTd} rowSpan={3} style={{fontWeight:600}}>Lower</td><td className={docTd}>Intent Resolver</td><td className={docTd}>Resolves intent() calls to CSS declarations</td></tr>
            <tr><td className={docTd}>Token Resolver</td><td className={docTd}>Resolves design tokens to CSS values</td></tr>
            <tr><td className={docTd}>CSS Emitter</td><td className={docTd}>Prints final CSS output</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Opt-in Passes</h2>
      <p className={paragraph}>
        Additional passes are available for projects that want build-time linting or advanced optimization:
      </p>
      <pre className={codeBlock}>{`import { accessibilityValidator } from 'chaincss/compiler'
import { createDefaultPipeline } from 'chaincss'

const pipeline = createDefaultPipeline()
pipeline.addValidation(accessibilityValidator)`}</pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Import</th><th className={docTh}>Passes</th></tr></thead>
          <tbody>
            <tr><td className={docTd}><span className={inlineCode}>chaincss/compiler</span></td><td className={docTd}>accessibility-validator, conflict-validator, accessibility-optimizer</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>chaincss/compiler</span></td><td className={docTd}>pattern-detector, responsive-analyzer, layout-analyzer</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>chaincss/compiler</span></td><td className={docTd}>specificity-sorter, dead-code-eliminator, media-query-packer, source-optimizer</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>chaincss/compiler</span></td><td className={docTd}>atomic-extractor</td></tr>
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

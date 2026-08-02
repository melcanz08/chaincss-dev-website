import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from "./Docs/docs.chain.ts";
import { docTable, docTh, docTd } from "./Docs/docs.chain.ts";
import { usePrism } from "../../lib/usePrism";

export default function Inspector() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Live Inspector</h1>
      <p className={contentDesc}>
        A real-time, interactive compiler observability dashboard. Hover over any component
        to see its complete journey through the 23-pass pipeline. Click to lock. Step through
        every pass with auto-playing replay. All powered by the <code className={inlineCode}>/__chaincss-ir.json</code> endpoint.
      </p>

      <h2 className={sectionHeading}>How to Open</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Method</th>
            <th className={docTh}>Shortcut</th>
          </tr></thead>
          <tbody>{[
            ['Keyboard shortcut', 'Ctrl + Shift + I'],
            ['Floating button', '🔍 Inspect button (bottom-right corner)'],
            ['Lock component', 'Click on any highlighted component'],
            ['Unlock', 'Esc or click Unlock button'],
          ].map(([method, shortcut], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{method}</strong></td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{shortcut}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Four View Modes</h2>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>1. Properties View</h3>
      <p className={paragraph}>
        Shows computed CSS properties alongside their IR declaration history. Properties with
        IR data are marked with a ● indicator. Click any property to expand its full transformation
        history — every pass that touched it, what changed, and why.
      </p>

      <pre className={codeBlock}><code className="language-text">{`padding: 12px  ●  ← has IR data
  ┌─ History ─────────────────────────────────┐
  │ 1. parser: created                         │
  │    Parsed from StyleDefinition              │
  │ 2. unit-normalizer: added-unit             │
  │    Added px unit to number value            │
  │    was: 12                                  │
  │ 3. css-compressor: optimized               │
  │    Value already optimal — no change        │
  └────────────────────────────────────────────┘`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>2. Passes View</h3>
      <p className={paragraph}>
        Grouped by pipeline stage. Each pass shows a colored dot (green = changes made, red = errors,
        gray = no changes). Expand any pass to see exactly which declarations were affected:
      </p>

      <pre className={codeBlock}><code className="language-text">{`Normalize · 3 passes
  ● intent-normalizer         1 change  2.12ms  ▶
  ● unit-normalizer           2 changes 1.45ms  ▶
  ● token-lowering-bridge     0 changes 3.21ms

Validate · 3 passes
  ● accessibility-validator   0 changes 5.67ms
    ⚠️ Contrast ratio 3.2:1 below AA threshold
       → Darken text color or lighten background

Optimize · 9 passes
  ● atomic-extractor          3 changes 18.23ms ▼
    ┌─ Affected ───────────────────────────────┐
    │ display: flex → flex                     │
    │   Extracted to atomic class .flex         │
    │ background-color: #6366f1 → #6366f1      │
    │   Extracted to atomic class .bg-6366f1    │
    └──────────────────────────────────────────┘`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>3. Timeline View</h3>
      <p className={paragraph}>
        Chronological list of all 23 passes with stage badges. Each pass shows its position
        in the pipeline, duration, and whether it made changes. Expand for affected declarations.
      </p>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>4. Step-Through Replay</h3>
      <p className={paragraph}>
        Click the <strong>▶ Replay</strong> button to enter step-through mode. The inspector
        shows each pass one at a time with:
      </p>

      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Progress bar</strong> — visual indicator of position in the pipeline</li>
        <li><strong>Pass details</strong> — stage badge, pass name, duration</li>
        <li><strong>Before/after diff</strong> — declarations that changed, with old values in red (struck through) and new values in green</li>
        <li><strong>Snapshot preview</strong> — the state of all CSS at this point in the pipeline, with changed properties highlighted in green</li>
        <li><strong>Auto Play</strong> — automatically advance through passes at 800ms intervals</li>
        <li><strong>Manual navigation</strong> — ◀ and ▶ buttons to step forward/backward</li>
      </ul>

      <h2 className={sectionHeading}>Cross-View Linking</h2>
      <p className={paragraph}>
        Properties and passes are bidirectionally linked. Click a property in Properties view
        and switch to Passes view — the passes that affected that property are highlighted
        with a purple border. Click a pass's affected declaration to see it in Properties view.
      </p>

      <h2 className={sectionHeading}>Live Hover + Lock</h2>
      <p className={paragraph}>
        Hover over any component in the page to:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>See a <strong>purple outline</strong> around the component</li>
        <li>View its <strong>computed CSS properties</strong> (only non-default values shown)</li>
        <li>See <strong>IR declaration count</strong> and <strong>estimated bytes</strong></li>
        <li>Check <strong>accessibility score</strong> (errors, warnings, infos)</li>
        <li>See <strong>reuse count</strong> — how many components share this style</li>
        <li>View the <strong>source file</strong> and <strong>selector</strong></li>
      </ul>
      <p className={paragraph}>
        <strong>Click to lock</strong> — the component gets a green outline and the inspector
        stays fixed on it while you interact with the page. Press <strong>Esc</strong> to unlock.
      </p>

      <h2 className={sectionHeading}>Suggestions Panel</h2>
      <p className={paragraph}>
        The inspector collects suggestions from five analysis and validation passes.
        Click the <strong>💡 Suggestions</strong> header to expand:
      </p>

      <pre className={codeBlock}><code className="language-text">{`💡 Suggestions (3)
┌──────────────────────────────────────────────┐
│ Pattern "flexCenter" found 47 times          │
│ → Consider extracting: center()              │
├──────────────────────────────────────────────┤
│ Layout pattern "card-layout" detected        │
│ → Replace with card() macro                  │
├──────────────────────────────────────────────┤
│ Fixed width 1200px will overflow on mobile   │
│ → Use min(100%, 1200px)                      │
└──────────────────────────────────────────────┘`}</code></pre>

      <h2 className={sectionHeading}>Accessibility at a Glance</h2>
      <p className={paragraph}>
        The inspector shows a color-coded accessibility summary for every component:
      </p>

      <pre className={codeBlock}><code className="language-text">{`♿ Accessibility  2 err  1 warn  3 info
  ❌ Contrast ratio 3.2:1 below AA threshold
  ❌ outline: none without :focus-visible override
  ⚠️ Touch target 32px below 44px minimum`}</code></pre>

      <h2 className={sectionHeading}>Page Layout Integration</h2>
      <p className={paragraph}>
        When the inspector panel opens, the page content shifts left by 360px with
        a smooth transition. Navigation elements also adjust. Closing the panel
        restores the original layout.
      </p>

      <h2 className={sectionHeading}>Data Source</h2>
      <p className={paragraph}>
        The inspector fetches data from the <code className={inlineCode}>/__chaincss-ir.json</code> endpoint
        (Vite dev server) or <code className={inlineCode}>/assets/chaincss-ir.json</code> (production build).
        The data is serialized by <code className={inlineCode}>serializeForInspector()</code> from the compiler core,
        which captures:
      </p>

      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Every rule's declarations</strong> with full transformation history</li>
        <li><strong>All diagnostics</strong> from all validation passes</li>
        <li><strong>Per-pass timing</strong> with affected declarations</li>
        <li><strong>Step-by-step snapshots</strong> of declaration state</li>
        <li><strong>Suggestions</strong> from pattern, layout, responsive, and accessibility analyzers</li>
        <li><strong>Metrics</strong> per rule (declaration count, estimated bytes, hover state)</li>
      </ul>

      <div className={note}>
        <strong>💡 Devtools-grade observability:</strong> The inspector is a full compiler
        debugging tool built into the dev server. Step through every pass, see exactly what
        changed and why, and catch accessibility issues before they reach production.
        See <a href="/docs/pipeline" style={{ color: '#818cf8' }}>5-Stage Pipeline</a> for the
        full pass breakdown and <a href="/docs/cli/cache-timeline" style={{ color: '#818cf8' }}>Cache & Timeline</a> for
        historical snapshot diffing across builds.
      </div>
    </>
  );
}
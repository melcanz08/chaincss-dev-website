import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function MultiTarget() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Multi-Target Emission</h1>
      <p className={contentDesc}>
        A single <code className={inlineCode}>.chain.ts</code> file compiles to six different output formats
        simultaneously — CSS, Atomic CSS, Tailwind config, Design Tokens, Figma tokens, and
        a dependency graph for visualization. One source of truth. Every platform covered.
      </p>

      <h2 className={sectionHeading}>The Problem: One Design, Many Outputs</h2>
      <p className={paragraph}>
        A modern design system needs to ship to multiple targets. Your web app needs standard CSS.
        Your performance-critical pages need atomic CSS. Your Tailwind-based projects need a config.
        Your React Native app needs design tokens. Your design team needs Figma-compatible tokens.
        Your devtools need a dependency graph for debugging.
      </p>
      <p className={paragraph}>
        Without multi-target emission, you maintain separate toolchains for each output — Style Dictionary
        for tokens, a PostCSS plugin for atomic extraction, a manual Tailwind config, and a Figma plugin
        for design sync. ChainCSS does all of this from a single IR in a single command.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-bash">{`# Emit all six targets from the same source files
chaincss build --target css,atomic-css,tailwind,design-tokens,figma,graph-json

# Or pick specific targets
chaincss build --target css,design-tokens

# Watch mode — re-emits on every change
chaincss watch --target css,figma

# In your config file
export default defineConfig({
  output: {
    targets: ['css', 'tailwind', 'design-tokens', 'figma']
  }
})`}</code></pre>

      <h2 className={sectionHeading}>The Six Targets</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Target</th>
            <th className={docTh}>Output File</th>
            <th className={docTh}>Content Type</th>
            <th className={docTh}>Use Case</th>
          </tr></thead>
          <tbody>{[
            ['css', 'styles.css', 'text/css', 'Standard CSS for any web app. All optimizations applied.'],
            ['atomic-css', 'atomic.css', 'text/css', 'Utility-first atomic classes. Only extracted rules.'],
            ['tailwind', 'tailwind.config.generated.js', 'application/javascript', 'Tailwind theme extension with colors, spacing, shadows, fonts.'],
            ['design-tokens', 'design-tokens.json', 'application/json', 'Platform-agnostic token export for React Native, iOS, Android.'],
            ['figma', 'figma-tokens.json', 'application/json', 'Figma Tokens Studio format with {value, type} objects.'],
            ['graph-json', 'chaincss-graph.json', 'application/json', 'Dependency graph for Cytoscape/D3 visualization in devtools.'],
          ].map(([target, file, type, useCase], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{target}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{file}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{useCase}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Target: CSS</h2>
      <p className={paragraph}>
        The default target. Produces standard CSS with all 9 optimization passes applied.
        Includes source map comments in development mode.
      </p>

      <pre className={codeBlock}><code className="language-css">{`/* source: src/components/button.chain.ts */
.chain-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background-color: #6366f1;
  cursor: pointer;
  transition: all 0.2s ease;
}
.chain-btn:hover {
  background-color: #4f46e5;
  transform: scale(1.02);
}

@media (max-width: 640px) {
  .chain-btn {
    padding: 8px 16px;
    font-size: 12px;
  }
}`}</code></pre>

      <h2 className={sectionHeading}>Target: Atomic CSS</h2>
      <p className={paragraph}>
        Extracts repeated declarations into utility classes. The extraction threshold
        is 3 usages — declarations used fewer than 3 times stay inline. This gives you
        the benefits of atomic CSS (smaller bundles through reuse) without forcing
        every single property into a separate class.
      </p>

      <pre className={codeBlock}><code className="language-css">{`/* Extracted atomic classes (appear at top of stylesheet) */
.flex { display: flex }
.inline-flex { display: inline-flex }
.items-center { align-items: center }
.justify-center { justify-content: center }
.rounded-8 { border-radius: 8px }
.border-none { border: none }
.text-14 { font-size: 14px }
.font-600 { font-weight: 600 }
.text-white { color: #ffffff }
.bg-6366f1 { background-color: #6366f1 }
.cursor-pointer { cursor: pointer }
.transition-all { transition: all 0.2s ease }
.bg-4f46e5 { background-color: #4f46e5 }

/* Remaining unique declarations stay in component rules */
.chain-btn {
  padding: 12px 24px;
}
.chain-btn:hover {
  transform: scale(1.02);
}`}</code></pre>

      <p className={paragraph}>
        Notice how <code className={inlineCode}>padding: 12px 24px</code> and{' '}
        <code className={inlineCode}>transform: scale(1.02)</code> stayed inline — they're used only once.
        The atomic extractor knows when to extract and when to leave declarations alone.
      </p>

      <h2 className={sectionHeading}>Target: Tailwind</h2>
      <p className={paragraph}>
        Generates a Tailwind config that extends the default theme with your design tokens.
        CSS custom properties from your token system are mapped to Tailwind's theme structure.
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// tailwind.config.generated.js — ChainCSS
module.exports = {
  theme: {
    extend: {
      colors: {
        "primary-500": "#6366f1",
        "primary-100": "#e0e7ff",
        "primary-600": "#4f46e5",
        "gray-50": "#f9fafb",
        "gray-100": "#f7fafc",
        "gray-900": "#1a202c"
      },
      spacing: {
        "xs": "0.5rem",
        "sm": "1rem",
        "md": "1.5rem",
        "lg": "2rem",
        "xl": "3rem"
      },
      borderRadius: {
        "sm": "0.125rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      },
      fontFamily: {
        "sans": "system-ui, -apple-system, sans-serif",
        "mono": "SFMono-Regular, Menlo, Monaco, monospace"
      },
      fontSize: {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem"
      }
    }
  }
};`}</code></pre>

      <div className={note}>
        <strong>💡 Hybrid approach:</strong> Use ChainCSS for your design tokens and component styles.
        Generate the Tailwind config for spacing, colors, and typography. Use Tailwind utility classes
        alongside ChainCSS components — they share the same token values.
      </div>

      <h2 className={sectionHeading}>Target: Design Tokens</h2>
      <p className={paragraph}>
        Platform-agnostic JSON export. Includes token derivation information from the entanglement
        engine so other platforms can understand the relationships between tokens.
      </p>

      <pre className={codeBlock}><code className="language-json">{`{
  "colors": {
    "primary": {
      "500": "#6366f1",
      "100": "#e0e7ff",
      "600": "#4f46e5"
    },
    "gray": {
      "50": "#f9fafb",
      "100": "#f7fafc",
      "900": "#1a202c"
    }
  },
  "spacing": {
    "xs": "0.5rem",
    "sm": "1rem",
    "md": "1.5rem"
  },
  "_relationships": [
    { "token": "colors.primary.100", "ruleId": "rule-abc", "selector": ".chain-card" },
    { "token": "colors.primary.600", "ruleId": "rule-def", "selector": ".chain-btn" }
  ],
  "_derivations": [
    {
      "source": "colors.primary.500",
      "target": "colors.primary.100",
      "method": "mix-white 80%"
    },
    {
      "source": "colors.primary.500",
      "target": "colors.primary.600",
      "method": "shade 20%"
    }
  ]
}`}</code></pre>

      <h2 className={sectionHeading}>Target: Figma</h2>
      <p className={paragraph}>
        Outputs tokens in Figma Tokens Studio format — each token is a{' '}
        <code className={inlineCode}>{"{ value, type }"}</code> object. Colors get{' '}
        <code className={inlineCode}>type: "color"</code>, dimensions get{' '}
        <code className={inlineCode}>type: "dimension"</code>, strings get{' '}
        <code className={inlineCode}>type: "string"</code>. Ready for round-trip sync.
      </p>

      <pre className={codeBlock}><code className="language-json">{`{
  "colors": {
    "primary": {
      "500": { "value": "#6366f1", "type": "color" },
      "100": { "value": "#e0e7ff", "type": "color" },
      "600": { "value": "#4f46e5", "type": "color" }
    },
    "gray": {
      "50": { "value": "#f9fafb", "type": "color" },
      "900": { "value": "#1a202c", "type": "color" }
    }
  },
  "spacing": {
    "xs": { "value": "0.5rem", "type": "dimension" },
    "md": { "value": "1.5rem", "type": "dimension" }
  },
  "typography": {
    "fontFamily": {
      "sans": { "value": "system-ui, -apple-system, sans-serif", "type": "string" }
    }
  }
}`}</code></pre>

      <h2 className={sectionHeading}>Target: Graph JSON</h2>
      <p className={paragraph}>
        Exports the full dependency graph for visualization in tools like Cytoscape.js,
        D3.js, or Graphviz. Each node has its selector, specificity, dependency count,
        and dead/alive status. Each edge has its type (extends, overrides, references,
        animates, derives, contains).
      </p>

      <pre className={codeBlock}><code className="language-json">{`{
  "version": "1.0",
  "generatedAt": "2026-07-31T...",
  "stats": {
    "totalNodes": 892,
    "totalEdges": 1247,
    "rootNodes": 47,
    "leafNodes": 312,
    "maxDepth": 8,
    "edgeTypes": {
      "extends": 89,
      "contains": 234,
      "overrides": 156,
      "references": 412,
      "animates": 23,
      "derives": 47
    }
  },
  "nodes": [
    {
      "id": "rule-abc",
      "selector": ".chain-btn",
      "type": "rule",
      "isDead": false,
      "specificity": 10,
      "dependencyCount": 3,
      "dependentCount": 12
    }
  ],
  "edges": [
    {
      "from": "rule-primary-token",
      "to": "rule-abc",
      "type": "references",
      "metadata": { "token": "colors.primary.500" }
    }
  ]
}`}</code></pre>

      <h2 className={sectionHeading}>How It Works</h2>
      <p className={paragraph}>
        All six targets emit from the <strong>same Intermediate Representation (IR)</strong>.
        The pipeline compiles your source to optimized IR once, then the emitter registry
        runs each target's emitter on that IR:
      </p>

      <pre className={codeBlock}><code className="language-text">{`Source (.chain.ts)
    ↓
Collector → Parser → Pipeline (23 passes) → Optimized IR
    ↓
Emitter Registry
    ├── cssEmitter          → styles.css
    ├── atomicCSSEmitter    → atomic.css
    ├── tailwindEmitter     → tailwind.config.generated.js
    ├── designTokensEmitter → design-tokens.json
    ├── figmaEmitter        → figma-tokens.json
    └── graphJSONEmitter    → chaincss-graph.json`}</code></pre>

      <p className={paragraph}>
        The emitters are pluggable — you can register custom emitters for any output format:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`import { registerEmitter } from 'chaincss'

registerEmitter({
  target: 'react-native',
  fileName: 'tokens.native.ts',
  contentType: 'application/typescript',
  emit(ir, options) {
    // Transform IR to React Native StyleSheet format
    return generateReactNativeStyles(ir)
  }
})`}</code></pre>

      <div className={note}>
        <strong>💡 Pro tip:</strong> Use <code className={inlineCode}>chaincss watch --target css,figma</code> during
        development. Your CSS updates via HMR while Figma tokens stay in sync automatically.
        Combined with <a href="/docs/tokens/entanglement" style={{ color: '#818cf8' }}>Token Entanglement</a>,
        changing one color propagates to every output target.
      </div>
    </>
  );
}
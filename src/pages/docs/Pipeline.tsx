import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Pipeline() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>5-Stage Compiler Pipeline</h1>
      <p className={contentDesc}>
        ChainCSS is a real compiler — not a string transformer. Your styles become an
        Intermediate Representation (IR), pass through 23 specialized passes across 5 stages,
        and emerge as optimized, validated, production-ready CSS. Every pass is independent,
        testable, and observable.
      </p>

      {/* ================================================================ */}
      {/* ARCHITECTURE OVERVIEW */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Architecture Overview</h2>

      <pre className={codeBlock}><code className="language-text">{`Source (.chain.ts)
    ↓
┌─────────────────────────────────────────┐
│          COLLECTOR                       │
│  Fluent API → StyleObject               │
│  • 16 typed methods                     │
│  • 142 macros                           │
│  • Property-level static/dynamic split  │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│           PARSER                         │
│  StyleObject → Intermediate Rep.        │
│  • Property normalization (kebab-case)  │
│  • Pseudo-class extraction              │
│  • At-rule structuring                  │
│  • Nested rule resolution               │
│  • CSS if() condition parsing           │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│     GRAPH BUILDER + SYMBOL TABLE        │
│  • Inverted index for O(n) edge detect  │
│  • 6 edge types                         │
│  • 8 symbol kinds indexed               │
│  • Bidirectional dependency tracking    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│   PASS SCHEDULER                         │
│  • Topological sort                     │
│  • Parallel group detection             │
│  • Pass elision (skip unused passes)    │
│  • Plugin integration                   │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│        5-STAGE PIPELINE                  │
│                                          │
│  NORMALIZE (3 passes)                    │
│    → VALIDATE (3 passes, 14 checks)     │
│    → ANALYZE (3 passes)                 │
│    → OPTIMIZE (9 passes)                │
│    → LOWER (4 passes)                   │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│       EMITTER REGISTRY                   │
│  CSS • Atomic CSS • Tailwind            │
│  • Design Tokens • Figma • Graph JSON   │
└─────────────────────────────────────────┘`}</code></pre>

      {/* ================================================================ */}
      {/* INTERMEDIATE REPRESENTATION */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Intermediate Representation (IR)</h2>
      <p className={paragraph}>
        The IR is the canonical data structure that every pass reads and writes.
        It's not a string — it's a typed object graph that represents every aspect
        of your styles in a machine-friendly format.
      </p>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>IR Node Types</h3>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Node</th>
            <th className={docTh}>Contains</th>
            <th className={docTh}>Purpose</th>
          </tr></thead>
          <tbody>{[
            ['StyleIR', 'rules[], diagnostics[], meta{}', 'Top-level container for the entire stylesheet'],
            ['IRRule', 'selector, declarations[], pseudoClasses[], atRules[], nestedRules[], conditions[]', 'A single CSS rule (e.g., .chain-btn { ... })'],
            ['IRDeclaration', 'property, value, source, history[], meta{}', 'A single property:value pair'],
            ['IRPseudoClass', 'name, parentId, declarations[]', 'A pseudo-class block (:hover, :focus, etc.)'],
            ['IRAtRule', 'type, query, name, declarations[], nestedRules[], keyframes[]', 'An at-rule block (@media, @keyframes, @font-face, etc.)'],
            ['IRCondition', 'property, variable, conditions{}, defaultValue', 'CSS if() conditional style'],
            ['IRKeyframeFrame', 'keyText, declarations[]', 'A keyframe step (0%, 50%, 100%)'],
            ['IRGraph', 'nodes (Map), edges[], rootNodes[], leafNodes[]', 'The dependency graph between rules'],
            ['IRGraphEdge', 'from, to, type, metadata', 'A directed edge in the dependency graph'],
          ].map(([node, contains, purpose], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{node}</code></td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{contains}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{purpose}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>CSS Value AST</h3>
      <p className={paragraph}>
        Every declaration value is parsed into a typed AST — not stored as a raw string.
        This enables algebraic optimization, semantic comparison, and intelligent compression.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>AST Node</th>
            <th className={docTh}>Example Input</th>
            <th className={docTh}>Representation</th>
          </tr></thead>
          <tbody>{[
            ['dimension', '16px', '{ kind: "dimension", value: 16, unit: "px" }'],
            ['number', '1.5', '{ kind: "number", value: 1.5 }'],
            ['percentage', '50%', '{ kind: "percentage", value: 50 }'],
            ['color', '#6366f1', '{ kind: "color", hex: "#6366f1" }'],
            ['keyword', 'flex', '{ kind: "keyword", value: "flex" }'],
            ['function', 'calc(100% - 20px)', '{ kind: "function", name: "calc", args: [...] }'],
            ['binary', '50px + 50px', '{ kind: "binary", operator: "+", left, right }'],
            ['variable', 'var(--color)', '{ kind: "variable", name: "--color" }'],
            ['list', '0 4px 12px', '{ kind: "list", items: [...], separator: " " }'],
          ].map(([node, input, repr], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{node}</code></td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{input}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{repr}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* ================================================================ */}
      {/* DEPENDENCY GRAPH */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Dependency Graph</h2>
      <p className={paragraph}>
        The graph builder creates a complete map of relationships between every rule
        in your stylesheet. This is what powers incremental compilation, dead code
        elimination, and token change propagation.
      </p>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>How the Graph Is Built</h3>
      <p className={paragraph}>
        Construction happens in three phases:
      </p>

      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Phase 1: Node Collection</strong> — Recursively traverses the IR, extracting every rule, at-rule, keyframe, and nested rule into graph nodes. Builds explicit edges for parent-child and containment relationships.</li>
        <li><strong>Phase 2: Implicit Relationship Detection</strong> — Uses inverted indexes to detect selector overlaps, shared token references, animation→keyframe connections, and token derivation chains. Hot-spot filtering caps overly generic selectors and global tokens to prevent combinatorial explosion.</li>
        <li><strong>Phase 3: Root/Leaf Identification</strong> — Identifies root nodes (no dependencies) and leaf nodes (no dependents) for graph traversal and dead code detection.</li>
      </ol>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>6 Edge Types</h3>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Edge Type</th>
            <th className={docTh}>Meaning</th>
            <th className={docTh}>Used For</th>
          </tr></thead>
          <tbody>{[
            ['extends', 'Parent → Child rule', 'Cascade analysis, inheritance tracking'],
            ['contains', 'AtRule → Nested content', 'Media query scoping, layer containment'],
            ['overrides', 'Selector overlap with specificity', 'Conflict detection, cascade correctness'],
            ['references', 'Shared token references', 'Token change propagation, impact analysis'],
            ['animates', 'Rule → Keyframe definition', 'Tree-shaking unused animations'],
            ['derives', 'Token source → Derived token', 'Entanglement cascading, auto-update'],
          ].map(([type, meaning, usedFor], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{type}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{meaning}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{usedFor}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Inverted Index Optimization</h3>
      <p className={paragraph}>
        Instead of O(n²) pairwise comparison, the graph builder uses inverted indexes
        for O(n + k) edge detection — where k is the number of actual overlaps, not
        all possible pairs:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Build index: property → [rules using it]
const selectorIndex = new Map<string, IRRule[]>()
for (const rule of rules) {
  for (const part of rule.selectorParts) {
    if (!selectorIndex.has(part)) selectorIndex.set(part, [])
    selectorIndex.get(part)!.push(rule)
  }
}

// Query: only check rules sharing a selector token
for (const rule of rules) {
  const candidates = new Set<IRRule>()
  for (const part of rule.selectorParts) {
    const matches = selectorIndex.get(part) || []
    if (matches.length <= 100) {  // Hot-spot filter
      for (const m of matches) candidates.add(m)
    }
  }
  // Only compare against candidates, not all rules
}`}</code></pre>

      {/* ================================================================ */}
      {/* SYMBOL TABLE */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Symbol Table</h2>
      <p className={paragraph}>
        The symbol table indexes every named entity in your stylesheet — tokens,
        variables, components, selectors, animations, and more. Each symbol tracks
        what it depends on and what depends on it, enabling precise impact analysis.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Symbol Kind</th>
            <th className={docTh}>Example</th>
            <th className={docTh}>Tracks</th>
          </tr></thead>
          <tbody>{[
            ['token', '$colors.primary.500', 'Which rules reference this token, which tokens derive from it'],
            ['variable', '--chain-btn-color', 'Where defined, where referenced via var()'],
            ['component', 'Button', 'Which rules belong to this component'],
            ['selector', '.chain-btn', 'Specificity, dependencies, dependents'],
            ['animation', 'fadeIn', 'Keyframe definitions, rules that animate with this name'],
            ['keyframe', '@keyframes fadeIn', 'Parent animation, frame steps'],
            ['media-query', '(max-width: 768px)', 'Which rules are scoped to this query'],
            ['alias', '(cross-reference)', 'Token → token references'],
          ].map(([kind, example, tracks], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{kind}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{example}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{tracks}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={paragraph}>
        The symbol table is used to find unused tokens (dead code elimination), trace
        token dependency chains (for IDE hover tooltips), and determine the full impact
        of a design token change before recompiling.
      </p>

      {/* ================================================================ */}
      {/* INCREMENTAL COMPILATION */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Incremental Compilation</h2>
      <p className={paragraph}>
        When a file changes, ChainCSS doesn't recompile everything. It uses the
        dependency graph to find exactly which rules are affected and only recompiles
        those — typically 4-5% of your stylesheet.
      </p>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>How It Works</h3>

      <pre className={codeBlock}><code className="language-text">{`File changed: src/components/button.chain.ts
    ↓
1. MARK DIRTY
   graph.isDirty(nodeId) → true
   markChangedRules(state, changedRuleIds)
    ↓
2. FIND AFFECTED (BFS through dependents)
   changedRuleIds = [rule-btn-1, rule-btn-2]
   findAffectedNodes(graph, rule-btn-1) → [rule-btn-3, rule-card-7, rule-modal-2]
   Total dirty: 47 rules (4.2% of 1,124 total)
    ↓
3. COMPOUND CACHE KEY
   SHA-256(source + dependencyHashes)
   If source hasn't changed AND no dependency hash changed → cache hit (skip)
    ↓
4. FILTER & COMPILE
   filterDirtyIR(ir, dirtyIds) → reduced IR with only 47 rules
   pipeline.execute(filteredIR) → compile
    ↓
5. UPDATE STATE
   cache.setByHash(key, result) → store for next time
   graph.markClean(nodeId) → reset dirty flag
   state.stats.incrementalCompiles++

Result: 47 rules recompiled instead of 1,124 — 96% faster`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Cold-Start Recovery</h3>
      <p className={paragraph}>
        The compiler state (IR + per-rule metadata + compiled files + stats) is serialized
        to disk on shutdown and restored on startup. If no files changed while the dev server
        was off, compilation is skipped entirely:
      </p>

      <pre className={codeBlock}><code className="language-text">{`# First start — full compilation
$ chaincss dev
[ChainCSS] Pre-compiling 47 file(s)...
✅ Compiled 47 file(s) in 1,247ms

# After restart — cold-start incremental
$ chaincss dev
[ChainCSS] Restored compiler state from cache.
📦 Restored state (1,247 compiles, 845 live rules)
[ChainCSS] No files changed — skipping compilation
🚀 Dev Server: http://localhost:3000`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>50% Threshold</h3>
      <p className={paragraph}>
        If more than 50% of rules are dirty, ChainCSS falls back to a full compilation.
        The tracking overhead of incremental mode becomes slower than just recompiling
        everything at that threshold. The compiler makes this decision automatically:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Automatic decision in the compiler
const impact = compiler.getIncrementalImpact(filePath)
// → { affectedRules: 612, totalRules: 892, affectedPercent: 68, shouldIncremental: false }

if (impact.shouldIncremental) {
  // Recompile only affected rules
} else {
  // Full recompile (faster than tracking 68% of rules)
}`}</code></pre>

      {/* ================================================================ */}
      {/* 5-STAGE PIPELINE (existing content preserved) */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Stage 1: Normalization (3 passes)</h2>
      <p className={paragraph}>
        The normalization stage fixes common mistakes, infers missing units,
        and resolves early token references. These passes run first so every
        subsequent stage operates on clean, consistent data.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Pass</th>
            <th className={docTh}>What It Does</th>
            <th className={docTh}>Example</th>
          </tr></thead>
          <tbody>{[
            ['intent-normalizer', 'Auto-corrects typos and misspellings using Levenshtein distance. Maps semantic values to correct CSS.', 'flx-direction → flex-direction, display: flexbox → flex, rounded → border-radius: 9999px'],
            ['unit-normalizer', 'Adds px to bare numbers. Preserves unitless properties (lineHeight, opacity, zIndex, fontWeight).', 'width: 300 → 300px, lineHeight: 1.5 → stays 1.5, 0 → stays 0'],
            ['token-lowering-bridge', 'Early resolution of static $token references. Unresolvable tokens become var() placeholders.', '$colors.primary.500 → #6366f1 (if resolvable), otherwise var(--colors-primary-500)'],
          ].map(([pass, what, example], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{pass}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{what}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{example}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Stage 2: Validation (3 passes, 14 checks)</h2>
      <p className={paragraph}>
        The validation stage catches errors and warnings before CSS is generated.
        Some checks are auto-fixable — the accessibility optimizer applies fixes
        in the optimization stage.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Pass</th>
            <th className={docTh}>Checks</th>
            <th className={docTh}>Severity</th>
          </tr></thead>
          <tbody>{[
            ['accessibility-validator', 'Contrast ratio (WCAG 1.4.3 AA), Font size minimum (1.4.4 AA), Touch target size (2.5.8 AA), Focus visible (2.4.7 AA), Reduced motion (2.3.3 AAA), Hover without focus (1.4.13 AA)', 'Errors + Warnings'],
            ['conflict-validator', 'z-index on position:static, Flex props without display:flex, Grid props without display:grid, display:inline + position:absolute override, Duplicate selectors', 'Warnings + Info'],
            ['ide-diagnostics', 'Missing transitions on hover, margin-inline/padding-inline opportunities, border-inline opportunities, Redundant max-width, Unused tokens/variables/animations, Token dependency chains', 'Hints + Warnings + Info'],
          ].map(([pass, checks, severity], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{pass}</code></td>
              <td className={docTd} style={{ fontSize: 12 }}>{checks}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{severity}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Stage 3: Analysis (3 passes)</h2>
      <p className={paragraph}>
        The analysis stage examines the stylesheet as a whole — finding patterns,
        flagging responsive issues, and detecting repeated style clusters that
        could be extracted as macros or recipes.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Pass</th>
            <th className={docTh}>What It Detects</th>
            <th className={docTh}>Suggestion</th>
          </tr></thead>
          <tbody>{[
            ['layout-analyzer', '15 known layout patterns (flex-center, card-layout, hero-section, sticky-top, glass-effect, pill-element, sr-only, etc.)', 'Replace 8+ properties with a single macro call. E.g., 47 instances of flex-center → use center()'],
            ['responsive-analyzer', 'Fixed widths overflowing viewports, Too many grid columns without mobile fallback, Large typography/padding/gaps, 100vh usage (suggests 100dvh)', 'width: min(100%, 1200px), font-size: clamp(24px, 4.7vw, 48px), grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))'],
            ['pattern-detector', 'Repeated style clusters across files using fingerprint hashing. Scores by frequency × property count', 'Extract as chain.recipe() or register as custom intent. E.g., 31 instances of identical truncate pattern'],
          ].map(([pass, detects, suggestion], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{pass}</code></td>
              <td className={docTd} style={{ fontSize: 12 }}>{detects}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{suggestion}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Stage 4: Optimization (9 passes)</h2>
      <p className={paragraph}>
        The optimization stage transforms the IR for performance — removing dead code,
        extracting atomic utilities, compressing values, and applying auto-fixes.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Pass</th>
            <th className={docTh}>What It Does</th>
            <th className={docTh}>Savings</th>
          </tr></thead>
          <tbody>{[
            ['ast-optimizer', 'Parses CSS values to AST, simplifies calc() expressions via constant folding, eliminates identity operations', 'calc(50px + 50px) → 100px, x + 0 → x, x * 1 → x, 0 * anything → 0'],
            ['duplicate-declaration-detector', 'Removes overridden duplicate declarations. Uses AST comparison. Preserves intentional fallbacks.', 'padding: 12px; padding: 16px → keeps only the last one'],
            ['dead-code-eliminator', 'Removes rules with no declarations and no dependents using graph analysis.', '47 rules eliminated from 892-rule stylesheet'],
            ['css-compressor', 'Shortens hex colors, removes zero units, converts font-weight keywords, compresses box-model shorthands', '~25% size reduction'],
            ['accessibility-optimizer', 'Auto-fixes font size, touch targets, focus rings flagged by validators', 'Zero manual a11y fixes needed'],
            ['atomic-extractor', 'Extracts repeated declarations (3+ usages) to utility classes', 'Rules reference shared utilities'],
            ['media-query-packer', 'Merges identical media queries via AST comparison. Sorts by breakpoint', '3 identical @media blocks → 1'],
            ['source-optimizer', 'Deduplicates identical rules across files using content hashing', 'Copy-paste eliminated'],
            ['specificity-sorter', 'Calculates 3-part CSS specificity, sorts lowest to highest. WeakMap cache for O(1)', 'Correct cascade order'],
          ].map(([pass, what, savings], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{pass}</code></td>
              <td className={docTd} style={{ fontSize: 12 }}>{what}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{savings}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Stage 5: Lowering (4 passes)</h2>
      <p className={paragraph}>
        The lowering stage is the final transformation — resolving design intents,
        token references, layout constraints, and emitting the final CSS string.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Pass</th>
            <th className={docTh}>What It Does</th>
            <th className={docTh}>Example</th>
          </tr></thead>
          <tbody>{[
            ['intent-resolver', 'Expands design intents to CSS properties. Resolves semantic references via the semantic token system.', 'intent: "card" → display:flex; flex-direction:column; border-radius:12px; hover states; responsive; a11y'],
            ['token-resolver', 'Resolves $token references to values or var() placeholders. Handles semantic intents with theme awareness.', '$colors.primary.500 → #6366f1, unresolved → var(--colors-primary-500)'],
            ['constraint-resolver', 'Resolves layout constraints to CSS properties. Converts algebraic expressions to aspect-ratio.', 'width <= parent → max-width:100%, height = width * 0.5 → aspect-ratio: 2'],
            ['css-emitter', 'Generates the final CSS string from the optimized IR. Handles minification and source maps.', 'IR rules → .chain-btn { padding: 12px 24px; ... }'],
          ].map(([pass, what, example], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{pass}</code></td>
              <td className={docTd} style={{ fontSize: 12 }}>{what}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{example}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Pass Scheduling</h2>
      <p className={paragraph}>
        Passes declare their dependencies, outputs, and costs. The scheduler
        performs topological sort, detects parallel execution groups, and
        elides passes whose outputs aren't needed:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Each pass declares:
{
  name: 'atomic-extractor',
  phase: 'optimize',
  requires: ['eliminated-dead-rules'],    // Must run after DCE
  produces: ['atomic-classes'],           // Output for other passes
  invalidates: [],                        // What it changes
  cost: 'moderate'                        // cheap | moderate | expensive
}

// The scheduler:
// 1. Validates all requirements exist
// 2. Topologically sorts for correct order
// 3. Groups independent passes for parallel execution
// 4. Elides passes whose produces aren't consumed`}</code></pre>

      <h2 className={sectionHeading}>Pipeline Presets</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Preset</th>
            <th className={docTh}>Passes</th>
            <th className={docTh}>Use Case</th>
          </tr></thead>
          <tbody>{[
            ['default', 'Normalize + light optimize + lower', 'Development — fast feedback'],
            ['production', 'Normalize + aggressive optimize (DCE + specificity + source dedup) + lower', 'Production builds — smallest output'],
            ['ci', 'Full pipeline: validate + analyze + heavy optimize + lower', 'CI/CD — catch everything'],
            ['lint', 'Normalize + validate only + lower', 'Quick linting — no optimization overhead'],
          ].map(([preset, passes, useCase], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{preset}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{passes}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{useCase}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Observability</h2>
      <p className={paragraph}>
        Every pass is timed, traced, and metered. The pipeline generates
        a diagnostics report showing exactly where time was spent:
      </p>

      <pre className={codeBlock}><code className="language-text">{`══════════════════════════════════════════════════════════════
  ChainCSS Pipeline Diagnostics Report
══════════════════════════════════════════════════════════════
  Total time: 93.06ms
  Passes run: 23
  Slowest pass: atomic-extractor (18.23ms)

  Pass Timings:
    intent-normalizer              2.12ms █
    unit-normalizer                1.45ms 
    token-lowering-bridge          3.21ms █
    accessibility-validator        5.67ms ██
    conflict-validator             1.89ms 
    ide-diagnostics                4.32ms ██
    layout-analyzer                3.45ms █
    responsive-analyzer            6.78ms ███
    pattern-detector               8.91ms ████
    ast-optimizer                  2.34ms █
    duplicate-declaration-detector 1.56ms 
    dead-code-eliminator           3.12ms █
    css-compressor                 4.89ms ██
    accessibility-optimizer        2.67ms █
    atomic-extractor              18.23ms █████████
    media-query-packer             3.45ms █
    source-optimizer               7.89ms ███
    specificity-sorter             4.12ms ██
    intent-resolver                5.34ms ██
    token-resolver                 3.78ms █
    constraint-resolver            1.23ms 
    css-emitter                    4.67ms ██
══════════════════════════════════════════════════════════════`}</code></pre>

      <div className={note}>
        <strong>💡 Plugin extensibility:</strong> Every stage supports third-party plugins
        via the Plugin API. Plugins declare their phase, dependencies, and capabilities.
        The unified scheduler integrates them into the correct position in the pipeline.
        See the <a href="/docs/api" style={{ color: '#818cf8' }}>API Reference</a> for
        the plugin interface, or <a href="/docs/inspector" style={{ color: '#818cf8' }}>Live Inspector</a> to
        explore the pipeline visually.
      </div>
    </>
  );
}
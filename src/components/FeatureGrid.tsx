import {
  section, sectionLabel, sectionTitle, sectionSubtitle,
  grid, card, cardIcon, cardTitle, cardText, cardCode
} from '../styles/features.chain.ts';

const features = [
  {
    icon: '⚡',
    title: 'Zero-Runtime by Default',
    text: 'Every static string and number is extracted at build time into plain CSS files. No JavaScript shipped for styles that never change.',
    code: `chain().bg("#6366f1").padding(16).$el("btn")\n// → .chain-btn { background:#6366f1; padding:16px }`,
  },
  {
    icon: '🔄',
    title: 'Auto-Detection Mixed Mode',
    text: 'Use chain.dynamic() and ChainCSS automatically splits your styles — static values to CSS, dynamic functions to runtime. No manual partitioning.',
    code: `chain.dynamic()\n  .bg("#6366f1")          // → CSS\n  .opacity(() => active ? 1 : 0.5) // → runtime`,
  },
  {
    icon: '🔬',
    title: '5-Stage Compiler Pipeline',
    text: 'Every style runs through Normalize → Validate → Analyze → Optimize → Lower stages at build time. Dead code elimination, CSS compression, intent resolution included.',
    code: `// Pipeline runs automatically\n// No configuration needed`,
  },
  {
    icon: '🎯',
    title: 'One Chainable API',
    text: 'Same fluent API for both static and dynamic modes. 500+ CSS properties as camelCase methods, plus shorthands, macros, states, and selectors.',
    code: `chain()\n  .bg("red").hover().bg("darkred").end()\n  .media("(min-width: 768px)", c => c.flexDir("row"))`,
  },
  {
    icon: '📦',
    title: 'Design Tokens & Themes',
    text: 'Built-in design token system with theme contracts. Define tokens once, use everywhere. Themes validate automatically at build time.',
    code: `const tokens = createTokens({\n  colors: { primary: "#6366f1" }\n})\nchain().bg("$colors.primary")`,
  },
  {
    icon: '🧩',
    title: 'Framework Agnostic',
    text: 'First-class support for React, Vue, Svelte, and SolidJS. Vite and Webpack plugins included. Works with any framework — or none.',
    code: `// React\nimport { btn } from "./button.chain"\n<button className={btn}>Click</button>`,
  },
];

export default function FeatureGrid() {
  return (
    <section className={section}>
      <div className={sectionLabel}>Features</div>
      <h2 className={sectionTitle}>Built for production</h2>
      <p className={sectionSubtitle}>
        ChainCSS compiles your styles at build time — not in the browser. 
        Zero runtime, maximum performance.
      </p>
      <div className={grid}>
        {features.map((f, i) => (
          <div key={i} className={card}>
            <div className={cardIcon}>{f.icon}</div>
            <h3 className={cardTitle}>{f.title}</h3>
            <p className={cardText}>{f.text}</p>
            <pre className={cardCode}>{f.code}</pre>
          </div>
        ))}
      </div>
    </section>
  );
}

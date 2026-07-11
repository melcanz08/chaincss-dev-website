import {
  section, sectionLabel, sectionTitle, sectionSubtitle,
  grid, card, cardIcon, cardTitle, cardText
} from '../styles/features.chain.ts';

const features = [
  {
    icon: '⚡',
    title: 'Zero-Runtime CSS',
    text: 'Every static property is extracted at build time into plain CSS files. The compiler never ships to the browser — your users download zero JavaScript for styles.',
  },
  {
    icon: '🎨',
    title: 'Mixed Mode',
    text: 'Use chain.dynamic() for interactive styles. Static properties compile away, dynamic functions run at runtime via CSS custom properties — no DOM injection.',
  },
  {
    icon: '🔒',
    title: 'Type-Safe API',
    text: 'Full TypeScript support with autocomplete. Catch typos and invalid values at compile time, not in production. Theme contracts validate your design tokens.',
  },
  {
    icon: '♿',
    title: 'Built-in Accessibility',
    text: 'WCAG 2.2 audit checks contrast ratios, font sizes, touch targets, and focus indicators. Auto-fix common issues with chaincss check --fix.',
  },
  {
    icon: '🔬',
    title: 'Live Compiler Inspector',
    text: 'Press Ctrl+Shift+I on any ChainCSS site. See every pass, every transformation, before/after diffs, and step-through replay of how your styles were generated.',
  },
  {
    icon: '🧩',
    title: 'Recipe Variants',
    text: 'Type-safe component variants like Stitches or CVA. Define size, color, and state variants declaratively — all compiled to zero-runtime CSS at build time.',
  },
  {
    icon: '🎯',
    title: 'Design Tokens',
    text: 'Reference colors, spacing, and typography with $token.path syntax. Resolved at build time. Theme contracts catch missing tokens before they reach production.',
  },
  {
    icon: '⚙️',
    title: 'Atomic CSS Extraction',
    text: 'Opt-in utility class generation. ChainCSS detects repeated property:value pairs and extracts them into reusable atomic classes — like Tailwind, but automated.',
  },
  {
    icon: '🌐',
    title: 'Framework Agnostic',
    text: 'Outputs plain CSS strings. Works with React, Vue, Svelte, Solid, or vanilla HTML. Dedicated hooks for dynamic styles in each framework.',
  },
];

export default function FeatureGrid() {
  return (
    <section className={section}>
      <div className={sectionLabel}>Features</div>
      <h2 className={sectionTitle}>Everything you need to ship fast</h2>
      <p className={sectionSubtitle}>
        ChainCSS combines the developer experience of CSS-in-JS with the performance of static CSS.
      </p>
      <div className={grid}>
        {features.map(f => (
          <div key={f.title} className={card}>
            <div className={cardIcon}>{f.icon}</div>
            <h3 className={cardTitle}>{f.title}</h3>
            <p className={cardText}>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { grid, card, cardIcon, cardTitle, cardText } from '../styles/features.chain.ts';

const features = [
  {
    icon: '🧬',
    title: 'Token Dependency Graph',
    text: 'Tokens are a connected graph, not flat variables. Change primary.500 in Figma — every derived shade, hover state, and contrast ratio propagates automatically via topological sort.',
  },
  {
    icon: '♿',
    title: 'Accessibility Auto-Fix',
    text: 'Detects WCAG 2.2 contrast failures and fixes them automatically. Preserves hue, adjusts lightness via binary search, rewrites tokens. Compliance as a build step.',
  },
  {
    icon: '🔗',
    title: 'Relationship Macros',
    text: 'peerDim(), entangleFocus(), hasCount() — express design intent, not selector mechanics. 32+ macros that generate CSS relationships, not just properties.',
  },
  {
    icon: '🎯',
    title: 'Mixed Mode',
    text: 'Static properties compile to CSS at build time. Dynamic functions run at runtime via CSS custom properties. One API. Zero compromises. No runtime library.',
  },
  {
    icon: '🔍',
    title: 'Live Compiler Inspector',
    text: 'Inspect every stage of the 5-stage pipeline. See normalization, validation, analysis, lowering, and optimization in real time. No black box.',
  },
  {
    icon: '⚡',
    title: 'Figma → Browser in 80ms',
    text: 'Designer saves in Figma → Tokens Studio syncs to GitHub → ChainCSS polls, propagates, and HMRs to the browser. The design-to-code loop, closed.',
  },
];

export default function FeatureGrid() {
  return (
    <section style={{ padding: '100px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
          Why ChainCSS
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f4f4f5', marginBottom: 16, letterSpacing: '-0.5px' }}>
          Not another CSS-in-JS library
        </h2>
        <p style={{ fontSize: 17, color: '#a1a1aa', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
          ChainCSS is a design-aware compiler. It understands the relationships between your tokens, 
          styles, and accessibility constraints — not just individual CSS declarations.
        </p>
      </div>
      <div className={grid}>
        {features.map((f) => (
          <div key={f.title} className={card}>
            <div className={cardIcon}>{f.icon}</div>
            <div className={cardTitle}>{f.title}</div>
            <div className={cardText}>{f.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const spacingMacros = [
  { name: 'mx()', desc: 'Horizontal margin', css: 'margin-left + margin-right' },
  { name: 'my()', desc: 'Vertical margin', css: 'margin-top + margin-bottom' },
  { name: 'px()', desc: 'Horizontal padding', css: 'padding-left + padding-right' },
  { name: 'py()', desc: 'Vertical padding', css: 'padding-top + padding-bottom' },
  { name: 'mxi()', desc: 'Inline margin', css: 'margin-inline' },
  { name: 'myb()', desc: 'Block margin', css: 'margin-block' },
  { name: 'pxi()', desc: 'Inline padding', css: 'padding-inline' },
  { name: 'pyb()', desc: 'Block padding', css: 'padding-block' },
  { name: 'size()', desc: 'Equal width + height', css: 'width + height' },
  { name: 'square()', desc: 'Perfect square', css: 'width + height + flex centering' },
  { name: 'circle()', desc: 'Perfect circle', css: 'width + height + border-radius:50% + flex centering' },
  { name: 'inset()', desc: 'All sides inset', css: 'top + right + bottom + left (or object syntax)' },
  { name: 'insetX()', desc: 'Horizontal inset', css: 'left + right' },
  { name: 'insetY()', desc: 'Vertical inset', css: 'top + bottom' },
  { name: 'insetInline()', desc: 'Inline inset', css: 'inset-inline' },
  { name: 'insetBlock()', desc: 'Block inset', css: 'inset-block' },
  { name: 'borderX()', desc: 'Horizontal border', css: 'border-left + border-right' },
  { name: 'borderY()', desc: 'Vertical border', css: 'border-top + border-bottom' },
  { name: 'borderInline()', desc: 'Inline border', css: 'border-inline' },
  { name: 'borderBlock()', desc: 'Block border', css: 'border-block' },
];

const layoutMacros = [
  { name: 'center()', desc: 'Flexbox centering', css: 'display:flex; align-items:center; justify-content:center' },
  { name: 'flexCenter()', desc: 'Flex centering', css: 'display:flex; align-items:center; justify-content:center' },
  { name: 'gridCenter()', desc: 'Grid centering', css: 'display:grid; place-items:center' },
  { name: 'zStack()', desc: 'Stack children', css: 'display:grid; place-items:center; children overlap' },
  { name: 'stack()', desc: 'Vertical stack', css: 'display:flex; flex-direction:column; gap' },
  { name: 'hstack()', desc: 'Horizontal stack', css: 'display:flex; flex-direction:row; align-items:center; gap' },
  { name: 'vstack()', desc: 'Vertical stack', css: 'display:flex; flex-direction:column; gap' },
  { name: 'cluster()', desc: 'Wrapping cluster', css: 'display:flex; flex-wrap:wrap; gap' },
  { name: 'switcher()', desc: 'Switching layout', css: 'flex-wrap:wrap with calc() breakpoint' },
  { name: 'cover()', desc: 'Cover section', css: 'flex column with min-height and centered heading' },
  { name: 'frame()', desc: 'Aspect ratio frame', css: 'aspect-ratio with overflow:hidden + object-fit' },
  { name: 'reel()', desc: 'Horizontal scroll', css: 'overflow-x:auto + scroll-snap' },
  { name: 'imposter()', desc: 'Absolute centering', css: 'position:absolute; top:50%; left:50%; translate(-50%,-50%)' },
  { name: 'cols()', desc: 'Grid columns', css: 'grid-template-columns: repeat(n, minmax(0, 1fr))' },
  { name: 'rows()', desc: 'Grid rows', css: 'grid-template-rows: repeat(n, minmax(0, 1fr))' },
  { name: 'container()', desc: 'Centered container', css: 'width:100%; max-width; margin-inline:auto; padding-inline' },
  { name: 'containerMacro()', desc: 'Container with px padding', css: 'width:100%; max-width; mx:auto; px' },
  { name: 'fullScreen()', desc: 'Full screen overlay', css: 'position:fixed; inset:0; z-index' },
  { name: 'hero()', desc: 'Hero section', css: 'display:flex; flex-direction:column; min-height:60vh; text-align:center' },
  { name: 'gridList()', desc: 'Auto-fit grid', css: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))' },
  { name: 'autoGrid()', desc: 'No-MQ auto grid', css: 'grid-template-columns: repeat(auto-fit, minmax(min(280px,100%),1fr))' },
  { name: 'fluidGrid()', desc: 'Fluid grid', css: 'grid-template-columns: repeat(auto-fit, minmax(280px,1fr))' },
  { name: 'masonry()', desc: 'CSS masonry', css: 'columns with break-inside:avoid' },
  { name: 'gridTable()', desc: 'Table-like grid', css: 'grid-template-columns: repeat(auto-fit, minmax)' },
  { name: 'bento()', desc: 'Bento grid', css: 'grid + subgrid + container queries' },
  { name: 'sidebar()', desc: 'Sidebar layout (from layout macros)', css: 'grid: 280px 1fr with mobile collapse' },
];

const positioningMacros = [
  { name: 'absolute()', desc: 'Position absolute', css: 'position:absolute + optional coords' },
  { name: 'fixed()', desc: 'Position fixed', css: 'position:fixed + optional coords' },
  { name: 'sticky()', desc: 'Position sticky', css: 'position:sticky + optional coords' },
  { name: 'relative()', desc: 'Position relative', css: 'position:relative + optional coords' },
  { name: 'dock()', desc: 'Dock to top', css: 'position:sticky; top:0; z-index:10' },
  { name: 'dockTop()', desc: 'Dock to top edge', css: 'position:sticky; top:0; left:0; right:0' },
  { name: 'dockBottom()', desc: 'Dock to bottom', css: 'position:fixed; bottom:0; left:0; right:0' },
  { name: 'bleed()', desc: 'Negative margin', css: 'margin-inline: calc(size * -1)' },
  { name: 'bleedX()', desc: 'Horizontal bleed', css: 'margin-inline: calc(size * -1)' },
  { name: 'coverFull()', desc: 'Cover container', css: 'position:absolute; inset:0' },
];

const visibilityMacros = [
  { name: 'hide()', desc: 'Completely hidden', css: 'opacity:0; visibility:hidden; pointer-events:none' },
  { name: 'show()', desc: 'Completely visible', css: 'opacity:1; visibility:visible; pointer-events:auto' },
  { name: 'invisible()', desc: 'Hidden but in flow', css: 'visibility:hidden' },
  { name: 'srOnly()', desc: 'Screen-reader only', css: 'position:absolute; 1px; overflow:hidden; clip:rect(0,0,0,0)' },
  { name: 'notSrOnly()', desc: 'Reset srOnly', css: 'position:static; width:auto; height:auto' },
  { name: 'unselectable()', desc: 'Prevent selection', css: 'user-select:none + vendor prefixes' },
  { name: 'selectable()', desc: 'Allow selection', css: 'user-select:text' },
  { name: 'scrollable()', desc: 'Scroll container', css: 'overflow:auto + -webkit-overflow-scrolling:touch' },
  { name: 'scrollbarHide()', desc: 'Hide scrollbar', css: 'scrollbar-width:none + ::-webkit-scrollbar' },
  { name: 'scrollbarThin()', desc: 'Thin scrollbar', css: 'scrollbar-width:thin + scrollbar-color' },
  { name: 'snapX()', desc: 'Horizontal snap', css: 'scroll-snap-type:x mandatory + overflow-x:auto' },
  { name: 'snapY()', desc: 'Vertical snap', css: 'scroll-snap-type:y mandatory + overflow-y:auto' },
];

const typographyMacros = [
  { name: 'prose()', desc: 'Prose text', css: 'max-width:65ch; line-height:1.75; margin-block for p' },
  { name: 'heading()', desc: 'Heading style', css: 'font-weight:800; line-height:1.1; fluid font-size' },
  { name: 'eyebrow()', desc: 'Eyebrow text', css: 'font-size:0.75rem; font-weight:600; letter-spacing; uppercase' },
  { name: 'caption()', desc: 'Caption text', css: 'font-size:0.875rem; line-height:1.4; opacity:0.75' },
  { name: 'truncate()', desc: 'Single-line ellipsis', css: 'overflow:hidden; text-overflow:ellipsis; white-space:nowrap' },
  { name: 'lineClamp()', desc: 'Multi-line clamp', css: '-webkit-line-clamp; overflow:hidden' },
  { name: 'textBalance()', desc: 'Balanced text', css: 'text-wrap:balance' },
  { name: 'textPretty()', desc: 'Pretty text wrap', css: 'text-wrap:pretty' },
  { name: 'hyphenate()', desc: 'Hyphenation', css: 'hyphens:auto; word-break:break-word' },
  { name: 'fontSmoothing()', desc: 'Font smoothing', css: '-webkit-font-smoothing + -moz-osx-font-smoothing' },
  { name: 'ligatures()', desc: 'Font ligatures', css: 'font-variant-ligatures; font-feature-settings' },
  { name: 'linkUnderline()', desc: 'Styled underline', css: 'text-decoration: underline; text-underline-offset' },
  { name: 'selection()', desc: 'Selection color', css: '::selection { background-color; color }' },
  { name: 'aspect()', desc: 'Aspect ratio', css: 'aspect-ratio from named presets or custom value' },
  { name: 'pill()', desc: 'Pill shape', css: 'border-radius:9999px; padding; display:inline-flex' },
  { name: 'badge()', desc: 'Badge style', css: 'border-radius:9999px; padding; font-size; background; color' },
  { name: 'kbd()', desc: 'Keyboard key', css: 'font-family:monospace; padding; border; background; border-bottom' },
];

const effectMacros = [
  { name: 'glass()', desc: 'Frosted glass', css: 'backdrop-filter:blur(16px); background:rgba(255,255,255,0.1)' },
  { name: 'frosted()', desc: 'Frosted glass saturate', css: 'backdrop-filter:blur(12px) saturate(1.5)' },
  { name: 'glow()', desc: 'Outer glow', css: 'box-shadow: 0 0 size/3px color, 0 0 size color' },
  { name: 'innerGlow()', desc: 'Inner glow', css: 'box-shadow: inset 0 1px 2px color, inset 0 -1px 1px color' },
  { name: 'textGradient()', desc: 'Text gradient', css: 'background-image:linear-gradient; -webkit-background-clip:text' },
  { name: 'meshGradient()', desc: 'Mesh gradient', css: 'radial-gradient layers for organic gradient effect' },
  { name: 'noise()', desc: 'Noise texture', css: 'background-image with SVG noise data URI' },
  { name: 'skeleton()', desc: 'Loading skeleton', css: 'Animated gradient sweep with auto-generated @keyframes' },
  { name: 'shimmer()', desc: 'Shimmer effect', css: 'Light sweep animation with auto-generated @keyframes' },
  { name: 'paper()', desc: 'Paper surface', css: 'background:white; border-radius:8px; box-shadow:layered' },
  { name: 'card()', desc: 'Card surface', css: 'background:white; border-radius:12px; border; box-shadow' },
  { name: 'elevated()', desc: 'Elevated surface', css: 'box-shadow based on elevation level (0-3)' },
  { name: 'ring()', desc: 'Ring outline', css: 'box-shadow: 0 0 0 N var(--ring-color)' },
  { name: 'ringInset()', desc: 'Inset ring', css: 'box-shadow: inset 0 0 0 N var(--ring-color)' },
  { name: 'ringOffset()', desc: 'Ring offset', css: '--ring-offset-width custom property' },
  { name: 'divideX()', desc: 'Horizontal dividers', css: 'border-left on > * + *' },
  { name: 'divideY()', desc: 'Vertical dividers', css: 'border-top on > * + *' },
  { name: 'hairline()', desc: 'Hairline border', css: 'border-width:0.5px' },
];

const interactionMacros = [
  { name: 'pressable()', desc: 'Interactive element', css: 'cursor:pointer; user-select:none; active:scale(0.97); hover:opacity(0.85)' },
  { name: 'clickScale()', desc: 'Scale on click', css: '&:active { transform: scale(0.95) }' },
  { name: 'hoverLift()', desc: 'Lift on hover', css: '&:hover { transform:translateY(-4px); box-shadow elevated }' },
  { name: 'hoverGlow()', desc: 'Glow on hover', css: '&:hover { box-shadow: 0 0 20px color }' },
  { name: 'focusRing()', desc: 'Focus indicator', css: '&:focus-visible { outline:2px solid; outline-offset:2px }' },
  { name: 'focusVisible()', desc: 'Custom focus style', css: '&:focus-visible with callback styles' },
  { name: 'onHover()', desc: 'Custom hover styles', css: '&:hover with callback styles' },
  { name: 'onActive()', desc: 'Custom active styles', css: '&:active with callback styles' },
  { name: 'onInteracting()', desc: 'All interactions', css: 'Applies to &:hover, &:focus-visible, &:active' },
  { name: 'peerDim()', desc: 'Dim siblings', css: '.group:has(> :hover) > &:not(:hover) { opacity, scale, blur }' },
  { name: 'peerHover()', desc: 'Style on sibling hover', css: '.peer:hover ~ & + .group:has(.peer:hover) &:not(.peer:hover)' },
  { name: 'groupHasHover()', desc: 'Parent reacts', css: '&:has(> :hover) with callback styles' },
  { name: 'hasCount()', desc: 'Child count based', css: '&:has(> :nth-child(N)) with styles' },
  { name: 'entangleFocus()', desc: 'Floating label', css: '&:focus-within label, &:has(input:not(:placeholder-shown)) label' },
  { name: 'children()', desc: 'Direct children', css: '& > * with callback styles' },
  { name: 'childHover()', desc: 'Child on hover', css: '&:hover > * with callback styles' },
  { name: 'dark()', desc: 'Dark mode', css: '@media (prefers-color-scheme: dark) with callback styles' },
  { name: 'light()', desc: 'Light mode', css: '@media (prefers-color-scheme: light) with callback styles' },
];

const animationMacros = [
  { name: 'float()', desc: 'Floating animation', css: 'translateY oscillation with auto-generated @keyframes' },
  { name: 'spin()', desc: 'Rotating animation', css: 'Continuous rotation with auto-generated @keyframes' },
  { name: 'pulse()', desc: 'Pulsing opacity', css: 'Opacity oscillation with auto-generated @keyframes' },
  { name: 'bounce()', desc: 'Bouncing animation', css: 'translateY bounce with auto-generated @keyframes' },
  { name: 'marquee()', desc: 'Marquee scroll', css: 'translateX animation with auto-generated @keyframes' },
];

const utilityMacros = [
  { name: 'fluidText()', desc: 'Fluid typography', css: 'font-size: clamp(min, vw, max)' },
  { name: 'safeArea()', desc: 'Safe area padding', css: 'env(safe-area-inset-*) for notched devices' },
  { name: 'gpu()', desc: 'GPU acceleration', css: 'transform:translateZ(0); will-change:transform' },
  { name: 'outlineDebug()', desc: 'Debug outlines', css: 'Red outlines on self and children for layout debugging' },
  { name: 'debugGrid()', desc: 'Debug grid', css: 'background-image grid pattern overlay' },
  { name: 'parallax()', desc: 'Parallax container', css: 'transform-style:preserve-3d; perspective; nested parallax' },
  { name: 'viewTransition()', desc: 'View transition', css: 'view-transition-name for page transitions' },
  { name: 'willChange()', desc: 'Will-change hint', css: 'will-change property for compositor optimization' },
  { name: 'contentVisAuto()', desc: 'Content visibility', css: 'content-visibility:auto; contain-intrinsic-size' },
  { name: 'containLayout()', desc: 'Layout containment', css: 'contain:layout paint for performance isolation' },
  { name: 'touchAction()', desc: 'Touch action', css: 'touch-action for gesture control' },
  { name: 'frostedNav()', desc: 'Frosted navigation', css: 'fixed + glass + safeArea top + z-index' },
];

export default function Macros() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Macros (100+)</h1>
      <p className={contentDesc}>
        100+ macros across 8 categories — spacing, layout, positioning, visibility,
        typography, effects, interaction, and animation. Express design intent, not
        CSS mechanics. All compile to plain CSS at build time with zero runtime overhead.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .glass()            // frosted glass effect (8+ properties)
  .center()           // flexbox centering (3 properties)
  .truncate()         // text ellipsis (3 properties)
  .pressable()        // cursor + active + hover (5 properties)
  .hoverLift()        // translateY + shadow on hover
  .$el('card')

// Compiles to plain CSS at build time. Zero runtime.`}</code></pre>

      {/* ============================================================ */}
      {/* SPACING */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Spacing Macros</h2>
      <p className={paragraph}>
        Directional margin, padding, inset, and border shorthands. Every macro accepts
        a number (auto-converted to px), a string value, or a Dynamic function.
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .mx('auto')       // margin-left: auto; margin-right: auto
  .py(24)           // padding-top: 24px; padding-bottom: 24px
  .size(48)         // width: 48px; height: 48px
  .circle(48)       // perfect circle with flex centering
  .$el('avatar')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>{spacingMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* LAYOUT */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Layout Macros</h2>
      <p className={paragraph}>
        High-level layout primitives — stacks, grids, containers, and compositional patterns.
        Many come from the Every Layout library of robust CSS layout algorithms.
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .stack({ dir: 'row', spacing: 16 })   // horizontal stack
  .switcher('30rem')                     // switches layout at breakpoint
  .cover('60vh')                         // cover section with centered heading
  .bento({ cols: 4, gap: 16 })          // bento grid layout
  .$el('layout')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>{layoutMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* POSITIONING */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Positioning Macros</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .absolute({ top: 0, right: 0 })    // position: absolute + coords
  .dock()                              // sticky top with z-index
  .bleed('2rem')                       // negative margin breakout
  .$el('overlay')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>{positioningMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* VISIBILITY */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Visibility Macros</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .hide()           // completely hidden (opacity + visibility + pointer-events)
  .srOnly()         // visible to screen readers only
  .scrollable('x')  // horizontal scroll container
  .$el('utility')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>{visibilityMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* TYPOGRAPHY */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Typography Macros</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .prose()            // readable prose with max-width + line-height
  .heading(1)         // responsive heading with fluid font-size
  .truncate()         // single-line ellipsis
  .lineClamp(3)       // clamp to 3 lines
  .$el('article')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>{typographyMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* EFFECTS */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Effect Macros</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .glass()                        // frosted glass with backdrop-filter
  .glow({ color: '#6366f1', size: 24 })  // outer glow
  .textGradient(['#6366f1', '#a78bfa'])  // gradient text
  .noise(0.05)                    // SVG noise texture overlay
  .$el('effects')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>{effectMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* INTERACTION */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Interaction Macros</h2>
      <p className={paragraph}>
        Relationship macros that generate CSS selectors — not properties.
        Express what you want to happen, not how to select the elements.
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .pressable()         // cursor + active scale + hover opacity
  .peerDim()           // dim siblings when one is hovered
  .entangleFocus()     // floating label pattern
  .hasCount({ count: 5, styles: { color: 'red' } })  // style when 5+ children
  .$el('interactive')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated Selectors / CSS</th></tr></thead>
          <tbody>{interactionMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* ANIMATION */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Animation Macros</h2>
      <p className={paragraph}>
        Animation macros auto-generate <code className={inlineCode}>@keyframes</code> exactly once —
        even if the same macro is used across multiple components. Accept duration as a number
        (in seconds) or a string value.
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .skeleton()     // loading skeleton with gradient sweep
  .float(6)       // floating animation, 6s cycle
  .spin('2s')     // rotating animation, 2s cycle
  .$el('animated')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Effect</th></tr></thead>
          <tbody>{animationMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12 }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* UTILITY */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Utility Macros</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .fluidText({ min: '16px', max: '24px', vw: '2vw' })  // responsive typography
  .safeArea('top')                                       // iPhone notch padding
  .gpu()                                                 // GPU acceleration hint
  .outlineDebug()                                        // red debug outlines
  .$el('utilities')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>{utilityMacros.map(m => (
            <tr key={m.name}><td className={docTd}><code className={inlineCode}>{m.name}</code></td><td className={docTd}>{m.desc}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 All macros compile to plain CSS at build time.</strong> Zero runtime overhead.
        Keyframe macros (<code className={inlineCode}>skeleton()</code>, <code className={inlineCode}>shimmer()</code>,{' '}
        <code className={inlineCode}>float()</code>, <code className={inlineCode}>spin()</code>,{' '}
        <code className={inlineCode}>pulse()</code>, <code className={inlineCode}>bounce()</code>,{' '}
        <code className={inlineCode}>marquee()</code>) auto-register their <code className={inlineCode}>@keyframes</code>{' '}
        definitions exactly once — even across multiple components.
        See <a href="/docs/properties" style={{ color: '#818cf8' }}>Styling API</a> for structured
        shorthands and <a href="/docs/tokens/semantic-intents" style={{ color: '#818cf8' }}>Semantic Intents</a> for
        higher-level design abstractions.
      </div>
            <h2 className={sectionHeading}>Custom Macros</h2>
      <p className={paragraph}>
        Register your own macros to encapsulate repeated patterns specific to your
        design system. Custom macros chain automatically and work identically to
        built-in macros:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
import { registerCustomMacros } from 'chaincss'

registerCustomMacros({
  // A simple macro that sets multiple properties at once
  brandCard: (value, styles) => {
    styles.borderRadius = '16px'
    styles.boxShadow = '0 4px 24px rgba(0,0,0,0.08)'
    styles.backgroundColor = value || '#ffffff'
  },
  
  // A macro that uses nested rules for hover state
  withHover: (color, styles) => {
    styles.backgroundColor = color
    if (!styles.nestedRules) styles.nestedRules = []
    styles.nestedRules.push({
      selector: '&:hover',
      styles: { filter: 'brightness(1.1)' }
    })
  },
  
  // A macro that accepts a callback for complex patterns
  section: (fn, styles, useTokens) => {
    styles.display = 'flex'
    styles.flexDirection = 'column'
    styles.gap = '24px'
    if (typeof fn === 'function') {
      // fn receives a child collector for nested styles
    }
  }
})

// Now use them anywhere:
chain()
  .brandCard('#f8fafc')   // sets border-radius + shadow + background
  .withHover('#6366f1')    // sets background + adds hover brightness
  .$el('featured-card')`}</code></pre>

      <div className={note}>
        <strong>💡 Custom macros chain automatically.</strong> They're stored in the same
        registry as built-in macros, so the proxy returns the chain after every macro call.
        Use <code className={inlineCode}>allowOverride: true</code> as the second argument to{' '}
        <code className={inlineCode}>registerCustomMacros</code> if you need to replace a
        built-in macro. Custom macros are also recognized by the suggestions engine and
        intent normalizer.
      </div>
    </>
  );
}
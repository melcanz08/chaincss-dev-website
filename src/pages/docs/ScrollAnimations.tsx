import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function ScrollAnimations() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Scroll-Driven Animations</h1>
      <p className={contentDesc}>
        Native CSS scroll-driven animations with zero JavaScript. 7 built-in presets,
        custom keyframe generation, and automatic <code className={inlineCode}>@supports</code> fallbacks.
        Powered by the <code className={inlineCode}>animation-timeline: scroll()</code> and{' '}
        <code className={inlineCode}>view()</code> CSS APIs.
      </p>

      <h2 className={sectionHeading}>The Problem: Scroll Animations Without Libraries</h2>
      <p className={paragraph}>
        Scroll-driven animations traditionally require JavaScript: Intersection Observer,
        scroll event listeners, requestAnimationFrame loops, and libraries like GSAP or
        Framer Motion. These add bundle size, consume main thread time, and often break
        accessibility (ignoring <code className={inlineCode}>prefers-reduced-motion</code>).
      </p>
      <p className={paragraph}>
        Modern CSS supports scroll-driven animations natively via{' '}
        <code className={inlineCode}>animation-timeline: scroll()</code> and{' '}
        <code className={inlineCode}>view()</code>. ChainCSS compiles a simple macro call
        into the full CSS setup — keyframes, timeline, range, and fallback.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

// A single macro call generates everything
chain()
  .entangle('scroll', {
    opacity: '0->1',       // fade in
    y: '20px->0',          // slide up
    timeline: 'view',       // animation-timeline: view()
    range: 'entry 0% cover 50%'
  })
  .$el('hero-section')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Generated CSS — zero JavaScript required */
@keyframes scroll-1-kf {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.chain-hero-section {
  animation: scroll-1-kf linear both;
  animation-timeline: view(block);
  animation-range: entry 0% cover 50%;
  will-change: transform, opacity;
  transform: translateZ(0);  /* GPU acceleration */
}

/* Graceful fallback for unsupported browsers */
@supports not (animation-timeline: view()) {
  .chain-hero-section {
    animation: none;
  }
}`}</code></pre>

      <h2 className={sectionHeading}>7 Built-in Presets</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Preset</th>
            <th className={docTh}>Effect</th>
            <th className={docTh}>Timeline</th>
            <th className={docTh}>Keyframes</th>
          </tr></thead>
          <tbody>{[
            ['fadeIn', 'Fade in + slide up', 'view', 'opacity: 0→1, translateY: 20px→0'],
            ['fadeOut', 'Fade out on exit', 'view', 'opacity: 1→0'],
            ['scaleIn', 'Scale up + fade', 'view', 'opacity: 0→1, scale: 0.8→1'],
            ['slideLeft', 'Slide from left', 'view', 'opacity: 0→1, translateX: -40px→0'],
            ['slideRight', 'Slide from right', 'view', 'opacity: 0→1, translateX: 40px→0'],
            ['parallax', 'Parallax scroll', 'scroll', 'translateY: 0→-20% (relative to scroll)'],
            ['stickyReveal', 'Reveal with clip-path', 'view', 'clipPath: inset(0 0 100% 0)→inset(0)'],
          ].map(([preset, effect, timeline, keyframes], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{preset}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{effect}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 12 }}>{timeline}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{keyframes}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Using Presets</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { createScrollAnimation } from 'chaincss'

// Use a preset with a custom selector
const fadeInHero = createScrollAnimation('fadeIn', '.hero-section')

// Override preset properties
const customFade = createScrollAnimation('fadeIn', '.card', {
  timeline: { range: 'entry 20% cover 80%' },
  duration: 'auto'  // Scroll-driven animations use the scroll position
})

// Get all available presets
import { getScrollPresets } from 'chaincss'
console.log(getScrollPresets())  // ['fadeIn', 'fadeOut', 'scaleIn', ...]`}</code></pre>

      <h2 className={sectionHeading}>Custom Scroll Animations</h2>
      <p className={paragraph}>
        Define custom keyframes and timeline configuration for unique effects:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`import { compileScrollAnimation } from 'chaincss'

const result = compileScrollAnimation({
  selector: '.parallax-bg',
  timeline: {
    name: 'parallax-bg',
    source: 'scroll',
    scroller: 'root',
    axis: 'block'
  },
  keyframes: [
    { offset: '0%', properties: { transform: 'translateY(0) scale(1.1)' } },
    { offset: '100%', properties: { transform: 'translateY(-10%) scale(1)' } }
  ]
})

// result.css contains the full animation + fallback
// result.keyframesName → 'parallax-bg'
// result.needsFallback → true (with @supports block)`}</code></pre>

      <h2 className={sectionHeading}>The entangle() API</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>.entangle('scroll', opts)</code> macro supports
        range-based animation for individual properties without writing keyframes:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Example</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['opacity', 'string', '"0->1"', 'Fade from 0 to 1'],
            ['y', 'string', '"20px->0"', 'Slide vertically'],
            ['x', 'string', '"-40px->0"', 'Slide horizontally'],
            ['scale', 'string', '"0.8->1"', 'Scale up'],
            ['rotate', 'string', '"0deg->360deg"', 'Rotate'],
            ['timeline', "'scroll' | 'view'", "'view'", 'Scroll-linked or view-timeline'],
            ['range', 'string', "'entry 0% cover 50%'", 'Animation range'],
            ['axis', "'block' | 'inline'", "'block'", 'Scroll axis'],
          ].map(([option, type, example, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{option}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 12 }}>{example}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Range Values</h2>
      <p className={paragraph}>
        Properties like <code className={inlineCode}>y</code>, <code className={inlineCode}>x</code>,{' '}
        <code className={inlineCode}>opacity</code>, and <code className={inlineCode}>scale</code> accept
        range strings with the <code className={inlineCode}>from→to</code> syntax:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .entangle('scroll', {
    // Single property → 0% and 100% keyframe values
    opacity: '0->1',
    
    // Multi-property → all animated together
    opacity: '0->1',
    y: '40px->0',
    scale: '0.9->1',
    
    // Explicit keyframe percentages (advanced)
    // Use createScrollAnimation for fine-grained control
  })
  .$el('animated')`}</code></pre>

      <h2 className={sectionHeading}>Accessibility: prefers-reduced-motion</h2>
      <p className={paragraph}>
        The accessibility validator flags scroll animations that don't wrap in{' '}
        <code className={inlineCode}>prefers-reduced-motion</code>. The generated{' '}
        <code className={inlineCode}>@supports</code> fallback also serves as a
        graceful degradation path:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// The validator will warn if you don't handle this
chain()
  .entangle('scroll', { opacity: '0->1', y: '20px->0' })
  .media('(prefers-reduced-motion: no-preference)', (c) => c
    // Scroll animation only applies when user hasn't requested reduced motion
  )
  .$el('accessible-hero')`}</code></pre>

      <h2 className={sectionHeading}>Browser Support</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Browser</th>
            <th className={docTh}>animation-timeline</th>
            <th className={docTh}>Fallback</th>
          </tr></thead>
          <tbody>{[
            ['Chrome 115+', '✅ Supported', 'Not used'],
            ['Edge 115+', '✅ Supported', 'Not used'],
            ['Firefox', '✅ Supported (scroll only)', 'view() falls back'],
            ['Safari 18+', '✅ Supported', 'Not used'],
            ['iOS Safari 18+', '✅ Supported', 'Not used'],
            ['Older browsers', '❌ Not supported', 'animation: none'],
          ].map(([browser, support, fallback], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{browser}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{support}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{fallback}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Zero JavaScript, zero runtime:</strong> Scroll-driven animations compile
        to pure CSS. No Intersection Observer, no scroll event listeners, no requestAnimationFrame
        loops. The browser's compositor handles everything on the GPU — smooth 60fps animations
        even on low-end devices. The <code className={inlineCode}>@supports</code> fallback
        ensures every browser renders correctly, even if animations are disabled.
        See <a href="/docs/accessibility" style={{ color: '#818cf8' }}>Accessibility Audit</a> for
        automatic <code className={inlineCode}>prefers-reduced-motion</code> detection.
      </div>
    </>
  );
}
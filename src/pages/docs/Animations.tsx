import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const presets = [
  'fadeIn', 'fadeOut', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight',
  'fadeOutUp', 'fadeOutDown', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight',
  'slideOutUp', 'slideOutDown', 'zoomIn', 'zoomOut', 'zoomInUp', 'zoomInDown',
  'bounce', 'bounceIn', 'bounceOut', 'pulse', 'pulseGlow',
  'shake', 'shakeX', 'shakeY', 'spin', 'spinReverse', 'wiggle', 'wobble',
  'flip', 'flipX', 'blink', 'typing', 'cursor', 'shimmer', 'ripple',
  'float', 'sink', 'swing', 'flash', 'textReveal', 'textGlitch'
];

export default function Animations() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Animations & Keyframes</h1>
      <p className={contentDesc}>
        44 built-in animation presets, custom keyframe generation, staggered delays,
        animation composition, and typo-tolerant fuzzy suggestions. All compile to
        pure CSS with auto-generated <code className={inlineCode}>@keyframes</code>.
      </p>

      <h2 className={sectionHeading}>Using Built-in Presets</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

// Reference a preset by name — keyframes auto-generated
chain()
  .animation({
    name: 'fadeIn',
    duration: '0.3s',
    timing: 'ease'
  })
  .$el('modal')

// Shorthand with the full animation string
chain()
  .animation({ a: 'fadeIn 0.3s ease' })
  .$el('modal')`}</code></pre>

      <h2 className={sectionHeading}>Animation Macro Presets</h2>
      <p className={paragraph}>
        Several presets are available as chainable macros that auto-generate keyframes
        and accept duration as a number (seconds) or string:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .float(6)         // floating animation, 6s cycle
  .spin('2s')       // rotating animation, 2s cycle
  .pulse('1.5s')    // pulsing opacity, 1.5s cycle
  .bounce('0.8s')   // bouncing animation, 0.8s cycle
  .marquee(20)      // marquee scroll, 20s cycle
  .$el('animated')`}</code></pre>

      <h2 className={sectionHeading}>Custom Keyframes</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { createKeyframesCSS } from 'chaincss'

// Define custom keyframe steps
const pulse = {
  '0%, 100%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' }
}

// Generate CSS with optional vendor prefixing
const css = createKeyframesCSS('pulse', pulse, true)  // true = add -webkit-

// Or use the macro approach
chain()
  .keyframes('pulse', pulse)
  .animation({ name: 'pulse', duration: '2s', iterationCount: 'infinite' })
  .$el('pulsing-element')`}</code></pre>

      <h2 className={sectionHeading}>Combining Animations</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { combineAnimations, createAnimationSequence } from 'chaincss'

// Run multiple animations in parallel
const combined = combineAnimations([
  { name: 'fadeIn', duration: '0.3s', timing: 'ease' },
  { name: 'slideInUp', duration: '0.5s', timing: 'ease-out' }
])
// → { animation: 'fadeIn 0.3s ease 0s, slideInUp 0.5s ease-out 0s' }

// Create a sequenced animation
const sequence = createAnimationSequence([
  { name: 'fadeIn', duration: '0.3s' },
  { name: 'pulse', duration: '2s', delay: '0.3s' }
])`}</code></pre>

      <h2 className={sectionHeading}>Staggered Children</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { staggerChildren, msToTime } from 'chaincss'

// Generate staggered delays for list items
const delays = staggerChildren('0s', '0.1s', 5)
// → { 0: '0ms', 1: '100ms', 2: '200ms', 3: '300ms', 4: '400ms' }

// Apply in a component
const items = [1, 2, 3, 4, 5]
items.map((item, i) => (
  <div style={{ animationDelay: delays[i] }} className="list-item">
    {item}
  </div>
))`}</code></pre>

      <h2 className={sectionHeading}>Registering Custom Presets</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { registerAnimationPreset, registerAnimationPresets } from 'chaincss'

// Register a single preset
registerAnimationPreset('glowPulse', {
  '0%, 100%': { 
    boxShadow: '0 0 5px rgba(99,102,241,0.5)',
    transform: 'scale(1)'
  },
  '50%': { 
    boxShadow: '0 0 20px rgba(99,102,241,0.8)',
    transform: 'scale(1.02)'
  }
})

// Register multiple presets at once
registerAnimationPresets({
  slideIn: {
    '0%': { transform: 'translateX(-20px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' }
  },
  slideOut: {
    '0%': { transform: 'translateX(0)', opacity: '1' },
    '100%': { transform: 'translateX(20px)', opacity: '0' }
  }
})`}</code></pre>

      <h2 className={sectionHeading}>Typo-Tolerant Suggestions</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { getAnimationSuggestion, isValidAnimation } from 'chaincss'

isValidAnimation('fadeIn')     // → true
isValidAnimation('fadein')     // → false (case-sensitive)

getAnimationSuggestion('fadein')
// → 'fadeIn'  (auto-corrected via Levenshtein distance)

getAnimationSuggestion('slidLeft')
// → 'slideLeft'  (caught the missing 'e')

getAnimationSuggestion('bounse')
// → 'bounce'  (transposition error)`}</code></pre>

      <h2 className={sectionHeading}>Timing Functions</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Name</th>
            <th className={docTh}>Value</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['linear', 'linear', 'Constant speed throughout'],
            ['ease', 'ease', 'Default — slow start, fast middle, slow end'],
            ['ease-in', 'ease-in', 'Slow start'],
            ['ease-out', 'ease-out', 'Slow end'],
            ['ease-in-out', 'ease-in-out', 'Slow start and end'],
            ['bounce', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'Bouncy overshoot effect'],
            ['elastic', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'Elastic snap effect'],
            ['smooth', 'cubic-bezier(0.25, 0.1, 0.25, 1)', 'Smooth deceleration'],
            ['sharp', 'cubic-bezier(0.4, 0, 0.6, 1)', 'Sharp acceleration'],
          ].map(([name, value, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 12 }}>{value}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>All 44 Presets</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
        {presets.map(p => (
          <code key={p} className={inlineCode} style={{ padding: '5px 12px', fontSize: 13 }}>
            {p}
          </code>
        ))}
      </div>

      <div className={note}>
        <strong>💡 Zero runtime:</strong> All animation presets compile to static{' '}
        <code className={inlineCode}>@keyframes</code> blocks in your CSS. Keyframe macros
        auto-deduplicate — if <code className={inlineCode}>float()</code> is used in 12 components,
        the <code className={inlineCode}>@keyframes float</code> block is emitted exactly once.
        See <a href="/docs/compiler/scroll-animations" style={{ color: '#818cf8' }}>Scroll Animations</a> for
        scroll-driven animations with zero JavaScript.
      </div>
    </>
  );
}
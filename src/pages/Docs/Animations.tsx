import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';
const presets = ['fadeIn','fadeOut','fadeInUp','fadeInDown','fadeInLeft','fadeInRight','slideInUp','slideInDown','slideInLeft','slideInRight','zoomIn','zoomOut','bounce','bounceIn','pulse','pulseGlow','shake','shakeX','spin','spinReverse','wiggle','wobble','flip','flipX','blink','typing','shimmer','ripple','float','sink','swing','flash','textReveal','textGlitch'];

export default function Animations() {
  usePrism([]);
  return (
    <>
      <h1 className={contentTitle}>Animations & Keyframes</h1>
      <p className={contentDesc}>38 built-in animation presets, custom keyframes, staggered delays, and fuzzy suggestions.</p>
      <h2 className={sectionHeading}>Using Presets</h2>
      <pre className={codeBlock}>{`import { createAnimation, getAnimationPreset } from 'chaincss'

chain()
  .animation('fadeIn 0.3s ease')
  .$el('modal')`}</pre>
      <h2 className={sectionHeading}>Custom Keyframes</h2>
      <pre className={codeBlock}>{`import { createKeyframesCSS } from 'chaincss'

const pulse = { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' } }
const css = createKeyframesCSS('pulse', pulse)`}</pre>
      <h2 className={sectionHeading}>Staggered Children</h2>
      <pre className={codeBlock}>{`import { staggerChildren } from 'chaincss'
staggerChildren('0s', '0.1s', 5) // { 0: '0ms', 1: '100ms', 2: '200ms', ... }`}</pre>
      <h2 className={sectionHeading}>All 38 Presets</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {presets.map(p => <code key={p} className={inlineCode} style={{ padding: '4px 10px' }}>{p}</code>)}
      </div>
    </>
  );
}

import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function MixedMode() {
  return (
    <>
      <h1 className={contentTitle}>Mixed Mode</h1>
      <p className={contentDesc}>
        ChainCSS automatically detects which values are static and which are dynamic.
        No manual mode switching required.
      </p>

      <h2 className={sectionHeading}>How Auto-Detection Works</h2>
      <p className={paragraph}>
        <strong>Strings and numbers</strong> are always static — they compile to CSS at build time.<br />
        <strong>Functions</strong> are always dynamic — they stay in JS and resolve at runtime.<br />
        This detection happens automatically. You don't configure it.
      </p>

      <pre className={codeBlock}>{`import { chain } from 'chaincss'

// Static mode: chain()
const btn = chain()
  .bg('#6366f1')          // static string → CSS
  .color('#ffffff')        // static string → CSS
  .padding('12px 24px')   // static string → CSS
  .fontSize(16)            // static number → CSS (16px)
  .$el('btn')
// Output: .chain-btn { background: #6366f1; color: #fff; padding: 12px 24px; font-size: 16px; }

// Mixed mode: chain.dynamic()
const card = chain.dynamic()
  .bg('#ffffff')                                       // static → CSS
  .padding(24)                                         // static → CSS
  .rounded(12)                                         // static → CSS
  .opacity(() => isLoading ? 0.5 : 1)                  // dynamic → runtime
  .shadow(() => elevated ? '0 10px 40px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)')
  .$el('card')                                         // dynamic → runtime`}</pre>

      <h2 className={sectionHeading}>Using Dynamic Styles in Components</h2>
      <pre className={codeBlock}>{`// styles/card.chain.ts
export const card = chain.dynamic()
  .bg('#ffffff')
  .opacity(() => isLoading ? 0.5 : 1)
  .$el('card')

// Card.tsx
import { card, cardClass } from '../styles/card.chain'
import { useChainStyles } from 'chaincss/runtime'

export default function Card({ isLoading, elevated }) {
  const classes = useChainStyles({ card }, [isLoading, elevated])
  return <div className={\`\${cardClass} \${classes.card}\`}>Content</div>
}`}</pre>

      <p className={paragraph}>
        <span className={inlineCode}>card</span> is the original style object (needed for runtime resolution).{' '}
        <span className={inlineCode}>cardClass</span> is the static class name string.{' '}
        <span className={inlineCode}>useChainStyles</span> computes the dynamic styles and returns class names.
      </p>

      <h2 className={sectionHeading}>partitionForBuild</h2>
      <p className={paragraph}>
        For custom build tooling, use <span className={inlineCode}>partitionForBuild</span> to 
        split static and dynamic values programmatically:
      </p>
      <pre className={codeBlock}>{`import { partitionForBuild } from 'chaincss'

const { css, dynamicValues, hasDynamic } = partitionForBuild(styleObject, {
  scopeSelector: '.card'
})
// css: '.card { background: #fff; padding: 24px; ... }'
// dynamicValues: { opacity: [Function], shadow: [Function] }
// hasDynamic: true`}</pre>

      <h2 className={sectionHeading}>When to Use Each Mode</h2>
      <div className={note}>
        <strong>Use chain()</strong> when all your values are known at build time — colors, spacing, typography, layout. This gives you zero runtime overhead.<br /><br />
        <strong>Use chain.dynamic()</strong> when you need values that change based on component state — opacity toggles, theme-based colors, animation states, conditional shadows. Only the dynamic parts stay in JS.
      </div>
    </>
  );
}

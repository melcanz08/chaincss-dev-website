import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode
} from '../../styles/docs.chain.ts';

export default function FrameworkIntegration() {
  return (
    <>
      <h1 className={contentTitle}>Framework Integration</h1>
      <p className={contentDesc}>
        ChainCSS works with any framework. React, Vue, Svelte, and SolidJS have optional peer dependencies.
      </p>

      <h2 className={sectionHeading}>React</h2>
      <pre className={codeBlock}>{`// Static styles — just import the class name
import { btn } from '../styles/button.chain'
<button className={btn}>Click</button>

// Dynamic styles
import { card, cardClass } from '../styles/card.chain'
import { useChainStyles } from 'chaincss/runtime'

function Card({ isLoading }) {
  const classes = useChainStyles({ card }, [isLoading])
  return <div className={\`\${cardClass} \${classes.card}\`}>...</div>
}`}</pre>

      <h2 className={sectionHeading}>Vue</h2>
      <pre className={codeBlock}>{`// Static styles
import { btn } from '../styles/button.chain'
// <button :class="btn">Click</button>

// Dynamic styles
import { card, cardClass } from '../styles/card.chain'
import { useChainStyles } from 'chaincss/runtime'

// In setup():
const classes = useChainStyles({ card }, [isLoading])`}</pre>

      <h2 className={sectionHeading}>Svelte</h2>
      <pre className={codeBlock}>{`// Static styles
import { btn } from '../styles/button.chain'
// <button class={btn}>Click</button>

// Dynamic styles
import { card, cardClass } from '../styles/card.chain'
import { useChainStyles } from 'chaincss/runtime'

const classes = useChainStyles({ card }, [isLoading])`}</pre>

      <h2 className={sectionHeading}>SolidJS</h2>
      <pre className={codeBlock}>{`import { btn } from '../styles/button.chain'
import { useChainStyles } from 'chaincss/runtime'

function Button() {
  const classes = useChainStyles({ btn })
  return <button class={btn}>Click</button>
}`}</pre>

      <h2 className={sectionHeading}>Vite Plugin</h2>
      <pre className={codeBlock}>{`// vite.config.ts
import chaincss from 'chaincss/plugin/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    chaincss({
      verbose: true,
      minify: true,
      atomic: true,
      breakpoints: { sm: '(max-width: 640px)' },
      tokens: { colors: { primary: '#6366f1' } }
    }),
    react()
  ]
})`}</pre>

      <h2 className={sectionHeading}>Webpack Plugin</h2>
      <pre className={codeBlock}>{`// webpack.config.js
const ChainCSSPlugin = require('chaincss/plugin/webpack')

module.exports = {
  plugins: [new ChainCSSPlugin({ minify: true })]
}`}</pre>
    </>
  );
}

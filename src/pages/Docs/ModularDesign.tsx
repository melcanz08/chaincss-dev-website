import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ModularDesign() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Modular Design</h1>
        <p className="docs-description">
          Separate your styles from components for better organization and reusability
        </p>
      </div>

      <h2>Why Modular?</h2><br />
      <p>
        ChainCSS allows you to separate your styles from your components, making your codebase:
      </p><br />
      <ul>
        <li><strong>More organized</strong> - Styles in dedicated files</li>
        <li><strong>More reusable</strong> - Import styles anywhere</li>
        <li><strong>Easier to maintain</strong> - Change styles without touching components</li>
        <li><strong>Better performance</strong> - Static styles compiled to CSS, dynamic styles only where needed</li>
      </ul><br />

      <div className="tip">
        <strong>Core Principle:</strong> Static styles → <code className="inline-code">.jcss</code> files (build mode)<br />
        Dynamic styles → <code className="inline-code">.chain.js</code> files (runtime mode)<br />
        Components → <code className="inline-code">.tsx</code> files (import both)
      </div>

      <h2>Before vs After</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('before')}
          style={{
            padding: '0.5rem 1rem',
            background: activeTab === 'before' ? '#667eea' : '#e2e8f0',
            color: activeTab === 'before' ? 'white' : '#475569',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Before (All in Component)
        </button>
        <button
          onClick={() => setActiveTab('after')}
          style={{
            padding: '0.5rem 1rem',
            background: activeTab === 'after' ? '#667eea' : '#e2e8f0',
            color: activeTab === 'after' ? 'white' : '#475569',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          After (Separated)
        </button>
      </div>

      {activeTab === 'before' ? (
        <>
          <h3>Before: All styles in Component</h3>
          <div className="code-block">
            <pre>{`// Hero.tsx - All styles inside component
import { useChainStyles } from 'chaincss/react';

const Hero = () => {
  const styles = useChainStyles(() => ({
    primaryButton: $()
      .backgroundColor('white')
      .color('#667eea')
      .padding('0.875rem 2rem')
      .borderRadius('9999px')
      .hover()
        .backgroundColor('#f1f5f9')
        .scale(1.05)
        .end()
      .block(),
    secondaryButton: $()
      .backgroundColor('transparent')
      .color('white')
      .border('2px solid white')
      .padding('0.875rem 2rem')
      .hover()
        .backgroundColor('rgba(255,255,255,0.1)')
        .scale(1.05)
        .end()
      .block()
  }), []);

  return (
    <div>
      <button className={styles.primaryButton}>Primary</button>
      <button className={styles.secondaryButton}>Secondary</button>
    </div>
  );
};`}</pre>
          </div>
          <div className="warning">
            <strong>Problems:</strong>
            <ul>
              <li>  Long, hard-to-read component</li>
              <li>  Styles can't be reused elsewhere</li>
              <li>  Difficult to test styles separately</li>
              <li>  Mixed concerns (UI + styling)</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <h3>After: Separated Styles</h3>
          
          <h4>Step 1: Create <code className="inline-code">hero.chain.js</code></h4>
          <div className="code-block">
            <pre>{`// hero.chain.js - Pure style definitions
import { $ } from 'chaincss';

export const primaryButton = $()
  .backgroundColor('white')
  .color('#667eea')
  .padding('0.875rem 2rem')
  .borderRadius('9999px')
  .border('none')
  .boxShadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .hover()
    .backgroundColor('#f1f5f9')
    .scale(1.05)
    .translateY('-2px')
    .end()
  .transition('all 0.2s ease')
  .cursor('pointer')
  .block();

export const secondaryButton = $()
  .backgroundColor('transparent')
  .color('white')
  .border('2px solid white')
  .padding('0.875rem 2rem')
  .fontWeight('600')
  .borderRadius('9999px')
  .hover()
    .backgroundColor('rgba(255,255,255,0.1)')
    .scale(1.05)
    .end()
  .transition('all 0.2s ease')
  .cursor('pointer')
  .block();`}</pre>
          </div>

          <h4>Step 2: Clean Component</h4>
          <div className="code-block">
            <pre>{`// Hero.tsx - Clean, focused component
import { useChainStyles } from 'chaincss/react';
import { primaryButton, secondaryButton } from './hero.chain.js';

const Hero = () => {
  const dynamicStyles = useChainStyles(() => ({
    primary: primaryButton,
    secondary: secondaryButton
  }), []);

  return (
    <div>
      <button className={dynamicStyles.primary}>Primary</button>
      <button className={dynamicStyles.secondary}>Secondary</button>
    </div>
  );
};`}</pre>
          </div>

          <div className="tip">
            <strong>Benefits:</strong>
            <ul>
              <li>Components are clean and focused on UI</li>
              <li>Styles are reusable across components</li>
              <li>Easier to test styles independently</li>
              <li>Better separation of concerns</li>
            </ul>
          </div>
        </>
      )}

      <h2>Modular Architecture Pattern</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <strong><code className="inline-code">*.chain.js</code></strong>
          <p>Reusable style definitions (runtime mode)</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">*.static.jcss</code></strong>
          <p>Static styles compiled to CSS (build mode)</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">*.tsx</code></strong>
          <p>Components that import and use styles</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">tokens.js</code></strong>
          <p>Design tokens for consistent theming</p>
        </div>
      </div>

      <h2>Reusing Styles Across Components</h2>
      <div className="code-block">
        <pre>{`// styles/buttons.chain.js - Shared button styles
export const primaryButton = $().backgroundColor('blue').color('white').block();
export const secondaryButton = $().backgroundColor('gray').color('white').block();

// components/SubmitButton.tsx
import { primaryButton } from '../styles/buttons.chain';

// components/CancelButton.tsx  
import { secondaryButton } from '../styles/buttons.chain';`}</pre>
      </div>

      <div className="note">
        <strong>Best Practice:</strong> Keep your styles in a <code className="inline-code">styles/</code> folder and import them where needed. This creates a true separation of concerns and makes your codebase more scalable.
      </div>
    </>
  );
}
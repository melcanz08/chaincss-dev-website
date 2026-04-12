import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

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

      <h2>Why Modular?</h2>
      <p>
        ChainCSS v2 allows you to separate your styles from your components, making your codebase:
      </p>
      <ul>
        <li><strong>More organized</strong> - Styles in dedicated files</li>
        <li><strong>More reusable</strong> - Import styles anywhere</li>
        <li><strong>Easier to maintain</strong> - Change styles without touching components</li>
        <li><strong>Better performance</strong> - Static styles compiled to CSS, dynamic styles only where needed</li>
      </ul>

      <h2>Core Principle</h2>
      <div className="tip">
        <strong>v2 Structure:</strong><br />
        Static styles → <code className="inline-code">src/components/Component/styles/component.chain.js</code><br />
        Generated class names → <code className="inline-code">src/components/Component/styles/component.class.js</code><br />
        Generated CSS → <code className="inline-code">src/components/Component/styles/component.css</code>
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
          <CodeBlock 
            language="tsx"
            code={`// Hero.tsx - All styles inside component (v2)
import { useChainStyles } from 'chaincss/runtime';

const Hero = () => {
  const styles = useChainStyles({
    primaryButton: {
      backgroundColor: 'white',
      color: '#667eea',
      padding: '0.875rem 2rem',
      borderRadius: '9999px',
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      hover: {
        backgroundColor: '#f1f5f9',
        transform: 'scale(1.05) translateY(-2px)'
      }
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '0.875rem 2rem',
      fontWeight: '600',
      borderRadius: '9999px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      hover: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        transform: 'scale(1.05)'
      }
    }
  });

  return (
    <div>
      <button className={styles.primaryButton}>Primary</button>
      <button className={styles.secondaryButton}>Secondary</button>
    </div>
  );
};`}
          />
          <div className="warning">
            <strong>Problems:</strong>
            <ul>
              <li>Long, hard-to-read component</li>
              <li>Styles can't be reused elsewhere</li>
              <li>Difficult to test styles separately</li>
              <li>Mixed concerns (UI + styling)</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <h3>After: Separated Styles</h3>
          
          <h4>Step 1: Create <code className="inline-code">button.chain.js</code></h4>
          <CodeBlock 
            language="javascript"
            code={`// src/components/Button/styles/button.chain.js
import { $ } from 'chaincss';

export const primaryButton = $
  .bg('white')
  .c('#667eea')
  .p('0.875rem 2rem')
  .rounded('9999px')
  .border('none')
  .shadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .transition('all 0.2s ease')
  .cursor('pointer')
  .hover()
    .bg('#f1f5f9')
    .transform('scale(1.05) translateY(-2px)')
  .end()
  .$el('.primary-btn');

export const secondaryButton = $
  .bg('transparent')
  .c('white')
  .border('2px solid white')
  .p('0.875rem 2rem')
  .weight('600')
  .rounded('9999px')
  .transition('all 0.2s ease')
  .cursor('pointer')
  .hover()
    .bg('rgba(255,255,255,0.1)')
    .transform('scale(1.05)')
  .end()
  .$el('.secondary-btn');`}
          />

          <h4>Step 2: Generate CSS</h4>
          <CodeBlock 
            language="bash"
            code={`npx chaincss build

# Output:
# ✓ Generated: src/components/Button/styles/button.class.js
# ✓ Generated: src/components/Button/styles/button.css`}
          />

          <h4>Step 3: Clean Component</h4>
          <CodeBlock 
            language="tsx"
            code={`// Hero.tsx - Clean, focused component
import { primaryButton, secondaryButton } from './styles/button.class.js';
import './styles/button.css';

const Hero = () => {
  return (
    <div>
      <button className={primaryButton}>Primary</button>
      <button className={secondaryButton}>Secondary</button>
    </div>
  );
};`}
          />

          <div className="tip">
            <strong>Benefits:</strong>
            <ul>
              <li>Components are clean and focused on UI</li>
              <li>Styles are reusable across components</li>
              <li>Easier to test styles independently</li>
              <li>Better separation of concerns</li>
              <li>Zero runtime overhead (build mode)</li>
            </ul>
          </div>
        </>
      )}

      <h2>Modular Architecture Pattern</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <strong><code className="inline-code">*.chain.js</code></strong>
          <p>Source style definitions (v2)</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">*.class.js</code></strong>
          <p>Generated class name exports</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">*.css</code></strong>
          <p>Generated CSS styles</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">*.tsx</code></strong>
          <p>Components that import and use styles</p>
        </div>
      </div>

      <h2>Reusing Styles Across Components</h2>
      <CodeBlock 
        language="javascript"
        code={`// src/styles/buttons.chain.js - Shared button styles
import { $ } from 'chaincss';

export const primaryBtn = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .$el('.primary-btn');

export const secondaryBtn = $
  .bg('transparent')
  .c('#3b82f6')
  .border('2px solid #3b82f6')
  .p('12px 24px')
  .rounded('8px')
  .$el('.secondary-btn');

// components/SubmitButton.tsx
import { primaryBtn } from '../styles/buttons.class.js';
import '../styles/buttons.css';

// components/CancelButton.tsx  
import { secondaryBtn } from '../styles/buttons.class.js';
import '../styles/buttons.css';`}
      />

      <div className="note">
        <strong>Best Practice:</strong> Keep your styles in a <code className="inline-code">styles/</code> folder next to your components. Each component gets its own <code className="inline-code">.chain.js</code> file, and ChainCSS generates the <code className="inline-code">.class.js</code> and <code className="inline-code">.css</code> files automatically.
      </div>

      <div className="tip">
        <strong>v2 Migration Notes:</strong>
        <ul>
          <li><code>.block()</code> → <code>.$el()</code></li>
          <li><code>.backgroundColor()</code> → <code>.bg()</code></li>
          <li><code>.color()</code> → <code>.c()</code></li>
          <li><code>.padding()</code> → <code>.p()</code></li>
          <li><code>.borderRadius()</code> → <code>.rounded()</code></li>
        </ul>
      </div>
    </>
  );
}
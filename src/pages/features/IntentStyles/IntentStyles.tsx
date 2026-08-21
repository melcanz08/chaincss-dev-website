// src/pages/features/IntentStyles/IntentStyles.tsx
import { useState } from 'react';
import { 
  intentContainer, 
  intentTitle, 
  intentSubtitle, 
  intentCard, 
  intentPreviewBox 
} from './intent.chain';

const intents = [
  { id: 'primary', name: 'Primary Action', desc: 'Standard high-priority user flow element.', color: '#6366f1', hex: '#6366f1', borderHex: '#4338ca' },
  { id: 'warning', name: 'Caution / Warning', desc: 'Requires attention before proceeding.', color: '#f59e0b', hex: '#f59e0b', borderHex: '#d97706' },
  { id: 'success', name: 'Success State', desc: 'Confirms completion or safe operation.', color: '#10b981', hex: '#10b981', borderHex: '#059669' },
  { id: 'danger', name: 'Destructive / Danger', desc: 'Irreversible or high-risk actions.', color: '#f43f5e', hex: '#f43f5e', borderHex: '#e11d48' },
];

export default function IntentStyles() {
  const [activeIntent, setActiveIntent] = useState('primary');
  const current = intents.find(i => i.id === activeIntent) || intents[0];

  return (
    <div className={intentContainer} data-theme={activeIntent}>
      <h1 className={intentTitle}>
        Intent-Driven <span style={{ color: '#818cf8' }}>Styles</span>
      </h1>
      <p className={intentSubtitle}>
        Design systems shouldn't just store static values; they should express purpose. 
        ChainCSS allows you to declare semantic <strong>Intents</strong> that automatically resolve to accessible contrast, focus states, and styling rules at build time.
      </p>

      {/* Sandbox Card */}
      <div className={intentCard}>
        <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '8px', fontWeight: 600 }}>
          Interactive Intent Sandbox
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
          Select a semantic intent below to see how components shift behavior and appearance based on purpose:
        </p>

        {/* Intent Selectors */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {intents.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveIntent(item.id)}
              style={{
                backgroundColor: activeIntent === item.id ? '#0f172a' : 'rgba(255, 255, 255, 0.03)',
                border: `2px solid ${activeIntent === item.id ? item.color : '#334155'}`,
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color }} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Live Preview Box */}
        <div className={intentPreviewBox}>
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', opacity: 0.8 }}>
            Current Intent: {activeIntent.toUpperCase()}
          </div>
          <div style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
            {current.desc}
          </div>
          <div style={{ fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: '6px', fontFamily: 'monospace' }}>
            Compiled output maps intent semantics directly to zero-runtime CSS selectors.
          </div>
        </div>
      </div>

      {/* Dual Cards: Code vs Compiled Output */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
        
        {/* Card 1: ChainCSS Source */}
        <div style={{
          backgroundColor: '#090d16',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f1f5f9' }}>ChainCSS Source</span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>intent.chain.ts</span>
          </div>
          <pre style={{ margin: 0, padding: '16px', backgroundColor: '#020617', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.5 }}>{`export const myBox = chain()
  .box({ padding: 24, borderRadius: 12 })
  .intent({ purpose: '${activeIntent}' })
  .$el('intent-card');`}</pre>
        </div>

        {/* Card 2: Compiled CSS Output */}
        <div style={{
          backgroundColor: '#090d16',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f1f5f9' }}>Compiled CSS Output</span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>Zero-Runtime</span>
          </div>
          <pre style={{ margin: 0, padding: '16px', backgroundColor: '#020617', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#34d399', fontFamily: 'monospace', lineHeight: 1.5 }}>{`.chain-intent-card {
  padding: 24px;
  border-radius: 12px;
  background-color: ${current.hex};
  border: 1px solid ${current.borderHex};
}`}</pre>
        </div>

      </div>
    </div>
  );
}
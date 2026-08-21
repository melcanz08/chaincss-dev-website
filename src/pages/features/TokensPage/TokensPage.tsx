// src/pages/features/TokensPage/TokensPage.tsx
import { useState } from 'react';
import { 
  tokensContainer, 
  tokensTitle, 
  tokensSubtitle, 
  sandboxCard, 
  derivedCard, 
  actionButton 
} from './tokens.chain';

const themes = [
  { id: 'indigo', name: 'Indigo (Default)', bgHex: '#1e293b', borderHex: '#334155', derivedBg: '#eef2ff', derivedText: '#312e81', primary: '#6366f1' },
  { id: 'emerald', name: 'Emerald (Success)', bgHex: '#064e3b', borderHex: '#065f46', derivedBg: '#ecfdf5', derivedText: '#065f46', primary: '#10b981' },
  { id: 'rose', name: 'Rose (Vibrant)', bgHex: '#4c0519', borderHex: '#881337', derivedBg: '#fff1f2', derivedText: '#881337', primary: '#f43f5e' },
  { id: 'amber', name: 'Amber (Warm)', bgHex: '#451a03', borderHex: '#78350f', derivedBg: '#fffbeb', derivedText: '#78350f', primary: '#f59e0b' },
];

export default function TokensPage() {
  const [activeTheme, setActiveTheme] = useState('indigo');
  const current = themes.find(t => t.id === activeTheme) || themes[0];

  return (
    <div className={tokensContainer} data-theme={activeTheme}>
      <h1 className={tokensTitle}>
        Tokens Know Their <span style={{ color: '#818cf8' }}>Relationships</span>
      </h1>
      <p className={tokensSubtitle}>
        Unlike static variables, ChainCSS links tokens into semantic graphs compiled at build time. 
        Clicking a parent theme shifts all derived surface colors, borders, and typography instantly via <code style={{ color: '#818cf8' }}>data-theme</code> scoping.
      </p>

      {/* Main Sandbox Card */}
      <div className={sandboxCard}>
        <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '8px', fontWeight: 600 }}>
          Interactive Token Propagation Sandbox
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
          Select a parent theme token below to experience zero-runtime token cascading:
        </p>

        {/* Theme Selector Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              style={{
                backgroundColor: activeTheme === t.id ? '#0f172a' : 'rgba(255, 255, 255, 0.03)',
                border: `2px solid ${activeTheme === t.id ? t.primary : '#334155'}`,
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
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: t.primary }} />
              {t.name}
            </button>
          ))}
        </div>

        {/* Live Derived Component Card */}
        <div className={derivedCard}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Derived Component State ({activeTheme} theme active)
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '16px' }}>
            This card container, border, text tint, and button are fully driven by static CSS rules generated for the <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>{activeTheme}</code> variant.
          </p>
          <button className={actionButton}>
            Derived Action Button
          </button>
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
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>tokens.chain.ts</span>
          </div>
          <pre style={{ margin: 0, padding: '16px', backgroundColor: '#020617', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.5 }}>{`export const sandboxCard = chain()
  .box({ borderRadius: 16, padding: 32 })
  .background({ color: { theme: { 
    ${activeTheme}: '${current.bgHex}' 
  } } })
  .$el('tokens-sandbox');`}</pre>
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
          <pre style={{ margin: 0, padding: '16px', backgroundColor: '#020617', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#34d399', fontFamily: 'monospace', lineHeight: 1.5 }}>{`[data-theme="${activeTheme}"] .chain-tokens-sandbox {
  border-radius: 16px;
  padding: 32px;
  background-color: ${current.bgHex};
  border: 1px solid ${current.borderHex};
}`}</pre>
        </div>

      </div>
    </div>
  );
}
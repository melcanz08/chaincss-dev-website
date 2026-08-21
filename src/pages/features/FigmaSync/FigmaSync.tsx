// src/pages/features/FigmaSync/FigmaSync.tsx
import { useState } from 'react';
import { 
  figmaContainer, 
  figmaTitle, 
  figmaSubtitle, 
  figmaCard, 
  figmaButton 
} from './figmaSync.chain';

export default function FigmaSync() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [tokenCount, setTokenCount] = useState(48);

  const handleSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setTokenCount(prev => prev + Math.floor(Math.random() * 5));
    }, 1200);
  };

  const statusConfig = {
    idle: { label: 'Ready to Sync', color: '#6366f1', desc: 'Connected to Figma File Key: figma.com/file/chaincss-ds' },
    syncing: { label: 'Pulling Variables...', color: '#a855f7', desc: 'Parsing design tokens and validating contrast ratios...' },
    synced: { label: 'Successfully Compiled', color: '#10b981', desc: `${tokenCount} tokens mapped to type-safe contracts at build time.` },
  }[syncStatus];

  return (
    <div className={figmaContainer} data-theme={syncStatus}>
      <h1 className={figmaTitle}>
        Figma-to-Code <span style={{ color: '#818cf8' }}>Sync</span>
      </h1>
      <p className={figmaSubtitle}>
        Design tokens shouldn't live in a silo. ChainCSS features a zero-runtime build plugin that listens to Figma Variable changes, transforming design decisions directly into immutable CSS variables and TypeScript contracts.
      </p>

      {/* Main Sandbox Card */}
      <div className={figmaCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '4px', fontWeight: 600 }}>
              Live Figma Plugin Simulator
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              {statusConfig.desc}
            </p>
          </div>
          <button 
            className={figmaButton} 
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            style={{ 
              backgroundColor: syncStatus === 'syncing' ? '#475569' : '#6366f1',
              opacity: syncStatus === 'syncing' ? 0.7 : 1 
            }}
          >
            {syncStatus === 'syncing' ? 'Syncing...' : '🔄 Pull from Figma'}
          </button>
        </div>

        {/* Status Badge Display */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          background: 'rgba(0,0,0,0.25)', 
          padding: '16px 20px', 
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <span style={{ 
            width: 14, 
            height: 14, 
            borderRadius: '50%', 
            backgroundColor: statusConfig.color,
            boxShadow: `0 0 12px ${statusConfig.color}`
          }} />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>
              {statusConfig.label}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', marginTop: '2px' }}>
              {tokenCount} active tokens registered in build pipeline
            </div>
          </div>
        </div>
      </div>

      {/* Dual Cards: Code vs Compiled Output */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
        
        {/* Card 1: ChainCSS Plugin Config */}
        <div style={{
          backgroundColor: '#090d16',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f1f5f9' }}>Plugin Configuration</span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>chain.config.ts</span>
          </div>
          <pre style={{ margin: 0, padding: '16px', backgroundColor: '#020617', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.5 }}>{`export default defineConfig({
  figma: {
    fileKey: process.env.FIGMA_FILE_KEY,
    accessToken: process.env.FIGMA_TOKEN,
    output: './src/tokens/figma.chain.ts'
  }
});`}</pre>
        </div>

        {/* Card 2: Generated Token Output */}
        <div style={{
          backgroundColor: '#090d16',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f1f5f9' }}>Compiled CSS Variables</span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>Zero-Runtime</span>
          </div>
          <pre style={{ margin: 0, padding: '16px', backgroundColor: '#020617', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#34d399', fontFamily: 'monospace', lineHeight: 1.5 }}>{`:root {
  --figma-color-primary: #6366f1;
  --figma-color-surface: #1e293b;
  --figma-spacing-base: 16px;
  --figma-radius-box: 16px;
}`}</pre>
        </div>

      </div>
    </div>
  );
}
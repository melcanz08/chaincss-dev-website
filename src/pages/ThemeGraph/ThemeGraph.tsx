import { useState, useCallback } from 'react';
import { generateTheme, extractDominantColor, generateChainCSSConfig, type ThemeReport } from '../../lib/theme-engine';
import {
  page, header, title, subtitle,
  controls, controlGroup, controlLabel,
  paletteSection, sectionTitle, paletteGrid,
  previewGrid, semanticTokens,
  exportSection, exportBtn, exportHint,
  modeBtn,
} from './themeGraph.chain';
import './themeGraph.css';

console.log('page:', page);
console.log('controls:', controls);

const SAMPLE_COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6', '#ef4444'];

function PaletteSwatch({ color, label, isLarge }: { color: string; label: string; isLarge?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: isLarge ? 2 : 1 }}>
      <div style={{
        width: isLarge ? 48 : 36, height: isLarge ? 48 : 36,
        borderRadius: 8, backgroundColor: color,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: isLarge ? '0 4px 12px rgba(0,0,0,0.3)' : undefined,
      }} />
      <span style={{ fontSize: 10, color: '#71717a' }}>{label}</span>
      <span style={{ fontSize: 9, color: '#52525b', fontFamily: 'monospace' }}>{color}</span>
    </div>
  );
}

function PreviewCard({ theme }: { theme: ThemeReport }) {
  const s = theme.semantic;
  return (
    <div style={{
      padding: 32, borderRadius: 16,
      backgroundColor: s.surface, border: `1px solid ${s.border}`,
      maxWidth: 400, margin: '0 auto', transition: 'all 0.3s ease',
    }}>
      <h3 style={{ color: s.textPrimary, marginBottom: 8, fontSize: 20, fontWeight: 700 }}>Preview Card</h3>
      <p style={{ color: s.textSecondary, marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
        This card updates live as you change the primary color. Every token is derived from your brand color.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button style={{ padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: s.buttonBg, color: s.buttonText, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Primary</button>
        <button style={{ padding: '10px 24px', borderRadius: 8, border: `1px solid ${s.border}`, backgroundColor: 'transparent', color: s.textPrimary, fontWeight: 500, cursor: 'pointer', fontSize: 14 }}>Secondary</button>
        <button style={{ padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: s.dangerBg, color: s.dangerText, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Danger</button>
      </div>
      <div style={{ marginTop: 20, padding: 12, borderRadius: 8, backgroundColor: s.successBg + '20', border: `1px solid ${s.successBg}40`, color: s.successBg, fontSize: 13, fontWeight: 600 }}>
        ✅ WCAG AA: {theme.accessibility.passesAA ? 'Pass' : 'Fail'} ({theme.accessibility.buttonContrast}:1)
      </div>
    </div>
  );
}

export default function ThemeGraph() {
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [isDark, setIsDark] = useState(false);
  const theme = generateTheme(primaryColor, isDark);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        setPrimaryColor(extractDominantColor(ctx.getImageData(0, 0, img.width, img.height)));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const bgColor = isDark ? '#0a0a0f' : '#fafafa';
  const textColor = isDark ? '#e4e4e7' : '#18181b';

  return (
    <div className={page as string} style={{ backgroundColor: bgColor, color: textColor, transition: 'all 0.3s ease' }}>
      
      {/* Header */}
      <div className={header as string}>
        <h1 className={title as string}>Theme Graph Editor</h1>
        <p className={subtitle as string}>
          Change one color. Watch 50+ tokens propagate through the dependency graph.
          Powered by ChainCSS token engine.
        </p>
      </div>

      {/* Controls */}
      <div className={controls as string}>
        <div className={controlGroup as string}>
          <label className={controlLabel as string}>Brand Color</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="color" value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: 40, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', backgroundColor: 'transparent' }}
            />
            <input type="text" value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#e4e4e7', fontSize: 14, fontFamily: 'monospace', width: 100 }}
            />
          </div>
        </div>

        <div className={controlGroup as string}>
          <label className={controlLabel as string}>Quick Picks</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {SAMPLE_COLORS.map(c => (
              <button key={c} onClick={() => setPrimaryColor(c)} style={{
                width: 32, height: 32, borderRadius: 8, backgroundColor: c,
                border: primaryColor === c ? '2px solid white' : '2px solid transparent',
                cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>

        <div className={controlGroup as string}>
          <label className={controlLabel as string}>Logo Upload</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload}
            style={{ fontSize: 13, color: '#a1a1aa' }} />
        </div>

        <div className={controlGroup as string}>
          <label className={controlLabel as string}>Mode</label>
          <button className={modeBtn as string}
            onClick={() => setIsDark(!isDark)}
            style={{
              backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
              color: isDark ? '#e2e8f0' : '#0f172a',
            }}>
            {isDark ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>

      {/* Palette */}
      <div className={paletteSection as string}>
        <h2 className={sectionTitle as string}>Derived Palette (100–900)</h2>
        <div className={paletteGrid as string}>
          {Object.entries(theme.palette).map(([key, color]) => (
            <PaletteSwatch key={key} color={color} label={key} isLarge={key === '500'} />
          ))}
        </div>
      </div>

      {/* Preview + Semantic Tokens */}
      <div className={previewGrid as string}>
        <div>
          <h2 className={sectionTitle as string}>Live Preview</h2>
          <PreviewCard theme={theme} />
        </div>
        <div>
          <h2 className={sectionTitle as string}>Semantic Tokens</h2>
          <div className={semanticTokens as string}>
            {Object.entries(theme.semantic).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#a1a1aa' }}>{key}</span>
                <span style={{ color: '#e4e4e7' }}>
                  <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, backgroundColor: value, marginRight: 8, verticalAlign: 'middle', border: '1px solid rgba(255,255,255,0.1)' }} />
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export */}
      <div className={exportSection as string}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className={exportBtn as string} onClick={() => {
            const json = JSON.stringify(theme, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'theme.json'; a.click();
            URL.revokeObjectURL(url);
          }}>
            📦 Export Theme JSON
          </button>
          <button className={exportBtn as string} onClick={() => {
            const config = generateChainCSSConfig(primaryColor, 'custom');
            const json = JSON.stringify(config, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'chaincss.config.json'; a.click();
            URL.revokeObjectURL(url);
          }}>
            ⛓️ Export ChainCSS Config
          </button>
        </div>
        <p className={exportHint as string}>
          ChainCSS config includes token relationships for automatic shade derivation and contrast validation.
        </p>
      </div>
    </div>
  );
}
import { useState, useCallback, useEffect, useRef } from 'react';
import { chain } from 'chaincss';
import {
  pgContainer, pgHeader, pgTitle, pgDesc,
  pgGrid, pgPanel, pgPanelHeader, pgPanelTitle,
  pgEditor, pgOutput, pgRunBtn, pgCopyBtn, pgPreview
} from '../styles/playground.chain.ts';

function styleToCSS(obj: any, className: string): string {
  if (!obj || !obj.selectors) return '';
  const props: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'selectors' || key === '_classes' || key === '_atRules' || key === '_nestedRules' || key === '_mixed') continue;
    if (key === '&:hover') continue;
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    props.push(`  ${cssKey}: ${value};`);
  }
  let css = `.${className} {\n${props.join('\n')}\n}`;
  if (obj['&:hover']) {
    const hoverProps: string[] = [];
    for (const [key, value] of Object.entries(obj['&:hover'])) {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      hoverProps.push(`  ${cssKey}: ${value};`);
    }
    css += `\n\n.${className}:hover {\n${hoverProps.join('\n')}\n}`;
  }
  return css;
}

const DEFAULT_CODE = `const btn = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('12px 24px')
  .rounded(8)
  .fontSize(16)
  .fontWeight('600')
  .border('none')
  .cursor('pointer')
  .hover()
    .bg('#4f46e5')
    .transform('translateY(-2px)')
  .end()
  .$el('button');`;

const TEMPLATES: Record<string, { code: string; html: string }> = {
  button: {
    code: DEFAULT_CODE,
    html: '<button class="chain-button">Click Me</button>',
  },
  card: {
    code: `const card = chain()
  .bg('#1a1a2e')
  .rounded(12)
  .padding(24)
  .shadow('0 2px 8px rgba(0,0,0,0.3)')
  .maxWidth(320)
  .hover()
    .shadow('0 10px 30px rgba(0,0,0,0.5)')
    .transform('translateY(-2px)')
  .end()
  .$el('card');`,
    html: '<div class="chain-card"><h3 style="color:#e4e4e7;margin:0 0 8px;font-family:Inter,system-ui,sans-serif">Card Title</h3><p style="color:#a1a1aa;margin:0;font-family:Inter,system-ui,sans-serif">Hover over this card to see the lift effect.</p></div>',
  },
  layout: {
    code: `const container = chain()
  .display('flex')
  .gap(16)
  .padding(24)
  .$el('container');

const box = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('20px 32px')
  .rounded(8)
  .fontWeight('600')
  .textAlign('center')
  .flex(1)
  .$el('box');`,
    html: '<div class="chain-container"><div class="chain-box">Box 1</div><div class="chain-box">Box 2</div><div class="chain-box">Box 3</div></div>',
  },
  dynamic: {
    code: `const btn = chain.dynamic()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('12px 24px')
  .rounded(8)
  .fontSize(16)
  .fontWeight('600')
  .border('none')
  .cursor('pointer')
  .opacity(() => 1)
  .$el('btn');`,
    html: '<button class="chain-btn">Dynamic Button</button>',
  },
};

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('button');
  const [previewCSS, setPreviewCSS] = useState('');
  const [previewHTML, setPreviewHTML] = useState(TEMPLATES.button.html);

  const runCode = useCallback(() => {
    try {
      const capturedExports: any = {};
      const processedCode = code
        .replace(/import\s+\{[^}]*\}\s+from\s+['"]chaincss['"];?\s*/g, '')
        .replace(/const\s+(\w+)\s*=\s*/g, 'capturedExports.$1 = ')
        .trim();
      
      const fn = new Function('chain', 'capturedExports', processedCode);
      fn(chain, capturedExports);
      
      const results: string[] = [];
      let allCSS = '';
      for (const [name, obj] of Object.entries(capturedExports)) {
        if (obj && typeof obj === 'object' && obj.selectors) {
          const className = obj.selectors[0]?.replace(/^\./, '') || name;
          const css = styleToCSS(obj, className);
          results.push(css);
          allCSS += css + '\n';
        }
      }
      setOutput(results.join('\n\n') || '/* No output */');
      setPreviewCSS(allCSS);
    } catch (e: any) {
      setOutput('Error:\n' + e.message);
    }
  }, [code]);

  useEffect(() => {
    runCode();
  }, []);

  const handleTemplate = (name: string) => {
    setActiveTemplate(name);
    const tmpl = TEMPLATES[name];
    setCode(tmpl.code);
    setPreviewHTML(tmpl.html);
    setTimeout(() => {
      try {
        const capturedExports: any = {};
        const processedCode = tmpl.code
          .replace(/import\s+\{[^}]*\}\s+from\s+['"]chaincss['"];?\s*/g, '')
          .replace(/const\s+(\w+)\s*=\s*/g, 'capturedExports.$1 = ')
          .trim();
        
        const fn = new Function('chain', 'capturedExports', processedCode);
        fn(chain, capturedExports);
        
        const results: string[] = [];
        let allCSS = '';
        for (const [n, obj] of Object.entries(capturedExports)) {
          if (obj && typeof obj === 'object' && obj.selectors) {
            const className = obj.selectors[0]?.replace(/^\./, '') || n;
            const css = styleToCSS(obj, className);
            results.push(css);
            allCSS += css + '\n';
          }
        }
        setOutput(results.join('\n\n') || '/* No output */');
        setPreviewCSS(allCSS);
      } catch (e: any) {
        setOutput('Error:\n' + e.message);
      }
    }, 50);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={pgContainer}>
      <div className={pgHeader}>
        <h1 className={pgTitle}>Playground</h1>
        <p className={pgDesc}>
          Write ChainCSS, see the compiled CSS, and preview the result live.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
          {Object.keys(TEMPLATES).map(name => (
            <button
              key={name}
              onClick={() => handleTemplate(name)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: activeTemplate === name ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                background: activeTemplate === name ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: activeTemplate === name ? '#a5b4fc' : '#a1a1aa',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className={pgGrid}>
        <div className={pgPanel}>
          <div className={pgPanelHeader}>
            <span className={pgPanelTitle}>ChainCSS</span>
            <button className={pgRunBtn} onClick={runCode}>
              ▶ Run
            </button>
          </div>
          <textarea
            className={pgEditor}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                runCode();
              }
            }}
          />
        </div>

        <div className={pgPanel}>
          <div className={pgPanelHeader}>
            <span className={pgPanelTitle}>CSS Output</span>
            <button className={pgCopyBtn} onClick={handleCopy}>
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
          <pre className={pgOutput}>{output || 'Click Run to compile...'}</pre>
        </div>

        <div className={pgPanel}>
          <div className={pgPanelHeader}>
            <span className={pgPanelTitle}>Live Preview</span>
          </div>
          <div className={pgPreview}>
            <style>{previewCSS}</style>
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
          </div>
        </div>
      </div>
    </div>
  );
}

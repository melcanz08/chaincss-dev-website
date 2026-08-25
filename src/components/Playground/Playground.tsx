// ============================================================================
// FILE: src/components/Playground/Playground.tsx (RESPONSIVE - CORRECTED)
// ============================================================================

import { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { compileString } from 'chaincss/playground';

interface PlaygroundResult {
  css: string;
  ast: any;
  diagnostics: any[];
  error?: string;
}

const defaultCode = `import { chain } from 'chaincss';

export const card = chain()
  .describe("A frosted glass card with centered content")
  .$el('card');

export const button = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff', fontWeight: '600' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover(c => c
    .background({ color: '#4f46e5' })
  )
  .$el('button');`;

export default function Playground() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [cssOutput, setCssOutput] = useState('');
  const [astOutput, setAstOutput] = useState('');
  const [diagnostics, setDiagnostics] = useState<any[]>([]);
  const [tableViewMode, setTableViewMode] = useState(true);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState<'editor' | 'css' | 'ast'>('editor');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function checkMobile() {
    setIsMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: defaultCode,
        extensions: [basicSetup, css(), oneDark],
      }),
      parent: editorRef.current,
    });

    setEditorView(view);
    runCompiler(view.state.doc.toString());

    // Add keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleCompile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      view.destroy();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function runCompiler(code: string) {
    try {
      const result = compileString(code) as PlaygroundResult;
      setCssOutput(result.css);
      setAstOutput(JSON.stringify(result.ast, null, 2));
      setDiagnostics(result.diagnostics || []);
    } catch (e: any) {
      setCssOutput(`/* Compilation Error */\n/* ${e.message} */`);
      setAstOutput(JSON.stringify({ error: e.message }, null, 2));
      setDiagnostics([]);
    }
  }

  function handleCompile() {
    if (editorView) {
      runCompiler(editorView.state.doc.toString());
    }
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function renderASTTable(ast: any) {
    if (!ast || !ast.rules) {
      return '<p style="color: #94a3b8; padding: 20px;">No AST data available.</p>';
    }

    let html = `
      <div style="overflow-x: auto;">
      <table style="width: 100%; min-width: 600px; border-collapse: collapse; background: #0f172a; border-radius: 8px; overflow: hidden; font-size: 13px;">
        <thead>
          <tr>
            <th style="background: #1e293b; padding: 10px 12px; text-align: left; color: #94a3b8; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; border-bottom: 2px solid #313244;">Type</th>
            <th style="background: #1e293b; padding: 10px 12px; text-align: left; color: #94a3b8; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; border-bottom: 2px solid #313244;">Selector / Property</th>
            <th style="background: #1e293b; padding: 10px 12px; text-align: left; color: #94a3b8; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; border-bottom: 2px solid #313244;">Value / Details</th>
            <th style="background: #1e293b; padding: 10px 12px; text-align: left; color: #94a3b8; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; border-bottom: 2px solid #313244;">Status</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const rule of ast.rules) {
      const isDead = rule.isDead || false;
      const deadStyle = isDead ? 'opacity: 0.5; text-decoration: line-through;' : '';
      
      html += `
        <tr style="${deadStyle} border-bottom: 1px solid #313244;">
          <td style="padding: 8px 12px; color: #e2e8f0; font-weight: 600;">Rule</td>
          <td style="padding: 8px 12px; color: #e2e8f0;"><strong>${rule.selector}</strong></td>
          <td style="padding: 8px 12px; color: #94a3b8;">ID: ${rule.id}</td>
          <td style="padding: 8px 12px;">${isDead ? '💀 Dead' : '✅ Alive'}</td>
        </tr>
      `;

      for (const decl of rule.declarations || []) {
        html += `
          <tr style="background: #1e293b; border-bottom: 1px solid #313244;">
            <td style="padding: 8px 12px; color: #94a3b8;">Declaration</td>
            <td style="padding: 8px 12px; padding-left: 30px; color: #e2e8f0;">${decl.property}</td>
            <td style="padding: 8px 12px; color: #4ade80;">${decl.value}</td>
            <td style="padding: 8px 12px;">—</td>
          </tr>
        `;
      }

      for (const pc of rule.pseudoClasses || []) {
        html += `
          <tr style="border-bottom: 1px solid #313244;">
            <td style="padding: 8px 12px; color: #94a3b8;">Pseudo</td>
            <td style="padding: 8px 12px; color: #e2e8f0;"><strong>${rule.selector}:${pc.name}</strong></td>
            <td style="padding: 8px 12px; color: #94a3b8;">Declarations: ${pc.declarations?.length || 0}</td>
            <td style="padding: 8px 12px;">—</td>
          </tr>
        `;
      }

      for (const atRule of rule.atRules || []) {
        html += `
          <tr style="background: #111827; border-bottom: 1px solid #313244;">
            <td style="padding: 8px 12px; color: #94a3b8;">@${atRule.type}</td>
            <td style="padding: 8px 12px; color: #e2e8f0;"><strong>@${atRule.type}</strong></td>
            <td style="padding: 8px 12px; color: #94a3b8;">Declarations: ${atRule.declarations?.length || 0}</td>
            <td style="padding: 8px 12px;">—</td>
          </tr>
        `;
      }
    }

    for (const diag of ast.diagnostics || []) {
      html += `
        <tr style="background: #1e1e2e; border-bottom: 1px solid #313244;">
          <td style="padding: 8px 12px; color: #94a3b8;">Diagnostic</td>
          <td style="padding: 8px 12px; color: ${diag.severity === 'error' ? '#f87171' : diag.severity === 'warning' ? '#fbbf24' : '#60a5fa'};">[${diag.severity.toUpperCase()}] ${diag.message}</td>
          <td style="padding: 8px 12px; color: #94a3b8;">${diag.suggestion || '—'}</td>
          <td style="padding: 8px 12px; color: #94a3b8;">${diag.pass || '—'}</td>
        </tr>
      `;
    }

    html += '</tbody></table></div>';
    return html;
  }

  const panelButtonStyle = (isActive: boolean) => ({
    flex: 1,
    padding: '12px 16px',
    background: isActive ? '#6366f1' : '#1e293b',
    color: isActive ? '#ffffff' : '#94a3b8',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'Inter, sans-serif',
      padding: '80px 16px 40px',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 16,
        background: '#1e293b',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: 12,
        marginBottom: 16,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: 'clamp(16px, 4vw, 24px)', 
            fontWeight: 700, 
            color: '#e2e8f0' 
          }}>
            ChainCSS Playground
          </h2>
          <button
            onClick={handleCompile}
            style={{
              background: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 'clamp(12px, 3vw, 14px)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#4f46e5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#6366f1')}
          >
            ⚡ Compile
          </button>
        </div>
        <div style={{ fontSize: 12, color: '#64748b' }}>
          Keyboard shortcut: Ctrl+Enter (or Cmd+Enter on Mac)
        </div>
      </div>

      {/* Mobile Panel Switcher - ONLY visible on mobile */}
      {isMobile && (
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
        }}>
          <button
            onClick={() => setActiveMobilePanel('editor')}
            style={panelButtonStyle(activeMobilePanel === 'editor')}
          >
            📝 Editor
          </button>
          <button
            onClick={() => setActiveMobilePanel('css')}
            style={panelButtonStyle(activeMobilePanel === 'css')}
          >
            🎨 CSS
          </button>
          <button
            onClick={() => setActiveMobilePanel('ast')}
            style={panelButtonStyle(activeMobilePanel === 'ast')}
          >
            🔍 AST
          </button>
        </div>
      )}

      {/* Main Grid - Editor & CSS side by side on desktop, stacked on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 600px), 1fr))',
        gap: 16,
        marginBottom: 16,
      }}>
        {/* Editor Panel */}
        <div style={{
          display: !isMobile || activeMobilePanel === 'editor' ? 'block' : 'none',
          background: '#0f172a',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 12,
          overflow: 'hidden',
          minHeight: isMobile ? '60vh' : 400,
        }}>
          <div style={{
            padding: '12px 16px',
            background: '#1e293b',
            borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#94a3b8',
          }}>
            ChainCSS Input
          </div>
          <div 
            ref={editorRef} 
            style={{
              minHeight: isMobile ? 'calc(60vh - 48px)' : 350,
              fontSize: 'clamp(12px, 3vw, 14px)',
            }}
          />
        </div>

        {/* CSS Output Panel */}
        <div style={{
          display: !isMobile || activeMobilePanel === 'css' ? 'block' : 'none',
          background: '#0f172a',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 12,
          overflow: 'hidden',
          minHeight: isMobile ? '60vh' : 400,
        }}>
          <div style={{
            padding: '12px 16px',
            background: '#1e293b',
            borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#94a3b8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <span>Compiled CSS</span>
            <button
              onClick={() => handleCopy(cssOutput)}
              style={{
                background: copied ? '#10b981' : '#1e293b',
                color: '#ffffff',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
          <pre style={{
            margin: 0,
            padding: 16,
            maxHeight: isMobile ? 'calc(60vh - 48px)' : 400,
            minHeight: isMobile ? 'calc(60vh - 48px)' : 350,
            overflow: 'auto',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: '#4ade80',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            WebkitOverflowScrolling: 'touch',
          }}>
            {cssOutput}
          </pre>
        </div>
      </div>

      {/* Diagnostics Panel */}
      {diagnostics.length > 0 && (
        <div style={{
          background: '#0f172a',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#94a3b8',
            marginBottom: 12,
          }}>
            Diagnostics ({diagnostics.length})
          </div>
          {diagnostics.map((d, i) => (
            <div
              key={i}
              style={{
                padding: '8px 12px',
                marginBottom: 6,
                borderRadius: 6,
                background: d.severity === 'error' ? '#1e1e2e' : '#1e293b',
                borderLeft: `3px solid ${
                  d.severity === 'error' ? '#f87171' :
                  d.severity === 'warning' ? '#fbbf24' :
                  d.severity === 'info' ? '#60a5fa' : '#4ade80'
                }`,
              }}
            >
              <span style={{
                fontWeight: 600,
                color: d.severity === 'error' ? '#f87171' :
                       d.severity === 'warning' ? '#fbbf24' :
                       d.severity === 'info' ? '#60a5fa' : '#4ade80',
              }}>
                [{d.severity.toUpperCase()}]
              </span>{' '}
              <span style={{ color: '#e2e8f0' }}>{d.message}</span>
              {d.suggestion && (
                <span style={{ color: '#94a3b8', fontStyle: 'italic', marginLeft: 8 }}>
                  {d.suggestion}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* AST / IR Inspector - Always visible on desktop, toggle on mobile */}
      <div style={{
        display: !isMobile || activeMobilePanel === 'ast' ? 'block' : 'none',
        background: '#0f172a',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 16px',
          background: '#1e293b',
          borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#94a3b8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span>AST / IR Inspector</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {!tableViewMode && (
              <button
                onClick={() => handleCopy(astOutput)}
                style={{
                  background: copied ? '#10b981' : '#1e293b',
                  color: '#ffffff',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {copied ? '✅' : '📋'}
              </button>
            )}
            <button
              onClick={() => setTableViewMode(!tableViewMode)}
              style={{
                background: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 12,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tableViewMode ? '📝 JSON' : '📊 Table'}
            </button>
          </div>
        </div>
        {tableViewMode ? (
          <div
            style={{ 
              padding: 16, 
              overflow: 'auto', 
              maxHeight: isMobile ? '60vh' : 500,
              WebkitOverflowScrolling: 'touch',
            }}
            dangerouslySetInnerHTML={{ __html: renderASTTable(JSON.parse(astOutput || '{}')) }}
          />
        ) : (
          <pre style={{
            margin: 0,
            padding: 16,
            maxHeight: isMobile ? '60vh' : 500,
            overflow: 'auto',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: '#e2e8f0',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            WebkitOverflowScrolling: 'touch',
          }}>
            {astOutput}
          </pre>
        )}
      </div>
    </div>
  );
}
// ============================================================================
// FILE: src/components/Playground/Playground.tsx (REPLACEMENT)
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

    return () => {
      view.destroy();
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

  function handleCopy() {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function renderASTTable(ast: any) {
    if (!ast || !ast.rules) {
      return '<p style="color: #94a3b8; padding: 20px;">No AST data available.</p>';
    }

    let html = `
      <table style="width: 100%; border-collapse: collapse; background: #0f172a; border-radius: 8px; overflow: hidden; font-size: 13px;">
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

    html += '</tbody></table>';
    return html;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'Inter, sans-serif',
      padding: '100px 24px 60px',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: '#1e293b',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: 12,
        marginBottom: 24,
      }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>
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
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#4f46e5')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#6366f1')}
        >
          Compile (Ctrl+Enter)
        </button>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 16,
      }}>
        {/* Editor Panel */}
        <div style={{
          background: '#0f172a',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '8px 16px',
            background: '#1e293b',
            borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#94a3b8',
          }}>
            ChainCSS Input
          </div>
          <div ref={editorRef} />
        </div>

        {/* CSS Output Panel */}
        <div style={{
          background: '#0f172a',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '8px 16px',
            background: '#1e293b',
            borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#94a3b8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            Compiled CSS
            <button
              onClick={handleCopy}
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
            maxHeight: 400,
            overflow: 'auto',
            fontSize: 13,
            color: '#4ade80',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
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

      {/* AST / IR Inspector */}
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '8px 16px',
          background: '#1e293b',
          borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#94a3b8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          AST / IR Inspector
          <div style={{ display: 'flex', gap: 8 }}>
            {!tableViewMode && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(astOutput);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
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
                {copied ? '✅ Copied!' : '📋 Copy JSON'}
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
              }}
            >
              {tableViewMode ? '📝 JSON View' : '📊 Table View'}
            </button>
          </div>
        </div>
        {tableViewMode ? (
          <div
            style={{ padding: 16, overflow: 'auto', maxHeight: 500 }}
            dangerouslySetInnerHTML={{ __html: renderASTTable(JSON.parse(astOutput || '{}')) }}
          />
        ) : (
          <pre style={{
            margin: 0,
            padding: 16,
            maxHeight: 500,
            overflow: 'auto',
            fontSize: 13,
            color: '#e2e8f0',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
          }}>
            {astOutput}
          </pre>
        )}
      </div>
    </div>
  );
}
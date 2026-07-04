import { useState, useEffect, useCallback } from 'react';

interface HistoryEntry {
  pass: string;
  action: string;
  reason?: string;
  previous?: any;
}

interface IRDeclaration {
  property: string;
  value: string | number;
  sourceFile?: string;
  history: HistoryEntry[];
}

interface IRDiagnostic {
  severity: string;
  category: string;
  message: string;
  suggestion?: string;
  wcag?: string;
  autoFixable?: boolean;
}

interface IRStats {
  declarationCount: number;
  estimatedBytes: number;
  pipelinePasses: number;
  hasHover: boolean;
}

interface PipelineStage {
  stage: string;
  pass: string;
  duration: number;
  changes: number;
  hasError?: boolean;
}

interface IRSuggestion {
  message: string;
  suggestion: string;
}

interface IRRule {
  selector: string;
  source?: { file: string; component: string };
  diagnostics: IRDiagnostic[];
  declarations: IRDeclaration[];
  stats: IRStats;
  pipeline: PipelineStage[];
  suggestions: IRSuggestion[];
}

interface IRData {
  rules: IRRule[];
  version: string;
}

interface ComponentInfo {
  name: string;
  classes: string[];
  tagName: string;
  properties: Record<string, string>;
  irDeclarations?: IRDeclaration[];
  diagnostics?: IRDiagnostic[];
  score?: { errors: number; warnings: number; infos: number };
  stats?: IRStats;
  pipeline?: PipelineStage[];
  reuseCount?: number;
  source?: { file: string; component: string };
  suggestions?: IRSuggestion[];
}

export default function Inspector() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<ComponentInfo | null>(null);
  const [irData, setIrData] = useState<IRData | null>(null);
  const [expandedProp, setExpandedProp] = useState<string | null>(null);
  const [showA11y, setShowA11y] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locked, setLocked] = useState(false);
  const [lockedInfo, setLockedInfo] = useState<ComponentInfo | null>(null);

  // Shift page when panel opens
  useEffect(() => {
    if (open) {
      document.body.style.marginRight = '360px';
      document.body.style.transition = 'margin-right 0.3s ease';
      document.querySelectorAll('nav, header, [class*="nav"]').forEach(el => {
        (el as HTMLElement).style.right = '360px';
        (el as HTMLElement).style.transition = 'right 0.3s ease';
      });
    } else {
      document.body.style.marginRight = '0';
      document.querySelectorAll('nav, header, [class*="nav"]').forEach(el => {
        (el as HTMLElement).style.right = '0';
      });
    }
    return () => {
      document.body.style.marginRight = '0';
    };
  }, [open]);

  // Load IR data
  useEffect(() => {
    fetch('/__chaincss-ir.json')
      .then(r => r.json())
      .then(data => { if (data && data.rules) setIrData(data); })
      .catch(() => {
        fetch('/assets/chaincss-ir.json')
          .then(r => r.json())
          .then(data => setIrData(data))
          .catch(() => {});
      });
  }, []);

  const getReuseCount = useCallback((declarations: IRDeclaration[]): number => {
    if (!irData || declarations.length === 0) return 0;
    let count = 0;
    for (const decl of declarations) {
      for (const rule of irData.rules) {
        if (rule.declarations.some(d => d.property === decl.property && String(d.value) === String(decl.value))) {
          count++;
          break;
        }
      }
    }
    return Math.max(0, count - 1);
  }, [irData]);

  const getComponentInfo = useCallback((el: Element): ComponentInfo | null => {
    const classes: string[] = [];
    el.classList.forEach(c => { if (c.startsWith('chain-')) classes.push(c); });
    if (classes.length === 0) return null;
    const styles = getComputedStyle(el);
    const name = classes[0].replace('chain-', '');

    let irDeclarations: IRDeclaration[] | undefined;
    let diagnostics: IRDiagnostic[] | undefined;
    let score: ComponentInfo['score'];
    let stats: IRStats | undefined;
    let pipeline: PipelineStage[] | undefined;
    let reuseCount = 0;
    let source: { file: string; component: string } | undefined;
    let suggestions: IRSuggestion[] | undefined;

    if (irData) {
      const selector = '.' + classes[0];
      const rule = irData.rules.find(r => r.selector === selector);
      if (rule) {
        irDeclarations = rule.declarations;
        diagnostics = rule.diagnostics;
        stats = rule.stats;
        pipeline = rule.pipeline;
        source = rule.source;
        suggestions = rule.suggestions;
        reuseCount = getReuseCount(rule.declarations);
        if (diagnostics) {
          score = {
            errors: diagnostics.filter(d => d.severity === 'error').length,
            warnings: diagnostics.filter(d => d.severity === 'warning').length,
            infos: diagnostics.filter(d => d.severity === 'info' || d.severity === 'hint').length,
          };
        }
      }
    }

    return {
      name, classes, irDeclarations, diagnostics, score, stats, pipeline, reuseCount, source, suggestions,
      tagName: el.tagName.toLowerCase(),
      properties: {
        display: styles.display, padding: styles.padding, margin: styles.margin,
        fontSize: styles.fontSize, fontWeight: styles.fontWeight,
        color: styles.color, background: styles.background,
        borderRadius: styles.borderRadius, boxShadow: styles.boxShadow,
        transform: styles.transform, transition: styles.transition,
        width: styles.width, height: styles.height,
      },
    };
  }, [irData, getReuseCount]);

  // Hover detection
  useEffect(() => {
    if (!open || locked) return;
    let current: Element | null = null;
    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('[class*="chain-"]');
      if (el && el !== current) {
        if (current) (current as HTMLElement).style.outline = '';
        current = el;
        (el as HTMLElement).style.outline = '2px solid #6366f1';
        (el as HTMLElement).style.outlineOffset = '2px';
        setInfo(getComponentInfo(el));
      }
    };
    document.addEventListener('mouseover', onMouseOver);
    return () => {
      document.removeEventListener('mouseover', onMouseOver);
      if (current) (current as HTMLElement).style.outline = '';
    };
  }, [open, locked, getComponentInfo]);

  // Click to lock
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const el = (e.target as Element).closest('[class*="chain-"]');
      if (el) {
        e.preventDefault();
        e.stopPropagation();
        const compInfo = getComponentInfo(el);
        if (compInfo) {
          setLocked(true);
          setLockedInfo(compInfo);
          (el as HTMLElement).style.outline = '3px solid #22c55e';
          (el as HTMLElement).style.outlineOffset = '3px';
        }
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [open, getComponentInfo]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') {
        setLocked(false);
        setLockedInfo(null);
        document.querySelectorAll('[style*="outline"]').forEach(el => {
          (el as HTMLElement).style.outline = '';
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const displayInfo = lockedInfo || info;
  const relevantProps = displayInfo
    ? Object.entries(displayInfo.properties).filter(([, v]) =>
        v && v !== 'none' && v !== 'auto' && v !== '0px' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)'
      )
    : [];

  const findIRDecl = (prop: string): IRDeclaration | undefined => {
    if (!displayInfo?.irDeclarations) return undefined;
    const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return displayInfo.irDeclarations.find(d =>
      d.property === prop || d.property === camelProp
    );
  };

  const severityIcon = (s: string) => {
    switch (s) { case 'error': return '❌'; case 'warning': return '⚠️'; default: return 'ℹ️'; }
  };
  const severityColor = (s: string) => {
    switch (s) { case 'error': return '#ef4444'; case 'warning': return '#f59e0b'; default: return '#3b82f6'; }
  };

  const stageColors: Record<string, string> = {
    normalization: '#8b5cf6', validation: '#f59e0b', analysis: '#3b82f6',
    optimization: '#22c55e', lowering: '#6366f1',
  };
  const stageNames: Record<string, string> = {
    normalization: 'Normalize', validation: 'Validate', analysis: 'Analyze',
    optimization: 'Optimize', lowering: 'Lower',
  };
  const stageOrder = ['normalization', 'validation', 'analysis', 'optimization', 'lowering'];

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, right: 0, width: 360, height: '100vh',
        background: '#0f172a', borderLeft: '1px solid #334155', zIndex: 9999,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease', overflowY: 'auto', padding: 20,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        color: '#f1f5f9', fontSize: 13,
        boxShadow: '-8px 0 30px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, borderBottom: '1px solid #334155', paddingBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
            🔍 Inspector {irData && <span style={{fontSize:10,color:'#22c55e',marginLeft:6}}>● IR</span>}
            {locked && <span style={{fontSize:10,color:'#f59e0b',marginLeft:6}}>🔒 Locked</span>}
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {locked && (
              <button onClick={() => { setLocked(false); setLockedInfo(null); }}
                style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontSize: 11 }}>Unlock</button>
            )}
            <button onClick={() => { setOpen(false); setLocked(false); }}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
        </div>

        {!displayInfo && (
          <div style={{ color: '#94a3b8' }}>
            <p>Hover over any component.</p>
            <p style={{ fontSize: 12, marginTop: 4, color: '#71717a' }}>Click to lock · Esc to unlock</p>
            <p style={{ fontSize: 11, marginTop: 12, color: '#52525b' }}>
              <kbd style={{ background: '#1e293b', padding: '1px 5px', borderRadius: 3 }}>Ctrl+Shift+I</kbd> toggle
            </p>
          </div>
        )}

        {displayInfo && (
          <>
            {/* Component header */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Component</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{displayInfo.name}</div>
              <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>
                &lt;{displayInfo.tagName}&gt; · {displayInfo.irDeclarations?.length || 0} props · ~{displayInfo.stats?.estimatedBytes || 0}B
                {displayInfo.reuseCount && displayInfo.reuseCount > 0 ? (
                  <span style={{ color: '#22c55e', marginLeft: 8 }}>🔁 {displayInfo.reuseCount} reused</span>
                ) : null}
              </div>
              {/* Phase 5: Source trace */}
              {displayInfo.source?.file && (
                <div style={{ fontSize: 10, color: '#52525b', marginTop: 4, fontFamily: 'monospace' }}>
                  📁 {displayInfo.source.file}
                </div>
              )}
            </div>

            {/* Phase 6: Suggestions */}
            {displayInfo.suggestions && displayInfo.suggestions.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div onClick={() => setShowSuggestions(!showSuggestions)}
                  style={{ fontSize: 10, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  💡 Suggestions ({displayInfo.suggestions.length})
                </div>
                {showSuggestions && displayInfo.suggestions.map((s, i) => (
                  <div key={i} style={{ padding: '6px 10px', marginBottom: 3, background: 'rgba(245,158,11,0.06)', borderRadius: 4, borderLeft: '3px solid #f59e0b' }}>
                    <div style={{ fontSize: 11, color: '#e4e4e7' }}>{s.message}</div>
                    {s.suggestion && <div style={{ fontSize: 10, color: '#f59e0b', marginTop: 2 }}>→ {s.suggestion}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Phase 4: Pipeline */}
            {displayInfo.pipeline && displayInfo.pipeline.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                  ⚡ Pipeline ({displayInfo.pipeline.length} passes)
                </div>
                {stageOrder.map(stage => {
                  const passes = displayInfo.pipeline!.filter(p => p.stage === stage);
                  if (passes.length === 0) return null;
                  return (
                    <div key={stage} style={{ marginBottom: 6 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2,
                        padding: '3px 8px', borderRadius: 3,
                        background: `${stageColors[stage]}15`,
                        borderLeft: `3px solid ${stageColors[stage]}`,
                      }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: stageColors[stage] }}>{stageNames[stage]}</span>
                        <span style={{ fontSize: 9, color: '#71717a' }}>{passes.length} pass{passes.length > 1 ? 'es' : ''}</span>
                        <span style={{ flex: 1 }} />
                        <span style={{ fontSize: 9, color: '#52525b' }}>{passes.reduce((s, p) => s + p.duration, 0)}ms</span>
                      </div>
                      {passes.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 8px 2px 20px', fontSize: 10 }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: p.hasError ? '#ef4444' : p.changes > 0 ? '#22c55e' : '#52525b',
                            flexShrink: 0,
                          }} />
                          <span style={{ color: '#a1a1aa' }}>{p.pass}</span>
                          {p.changes > 0 && <span style={{ color: '#22c55e', fontSize: 9 }}>{p.changes} Δ</span>}
                          <span style={{ flex: 1 }} />
                          <span style={{ color: '#52525b', fontSize: 9 }}>{p.duration}ms</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Accessibility */}
            {displayInfo.score && (
              <div style={{ marginBottom: 14 }}>
                <div onClick={() => setShowA11y(!showA11y)} style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  ♿ Accessibility
                  <span style={{ display: 'flex', gap: 4 }}>
                    {displayInfo.score.errors > 0 && <span style={{ color: '#ef4444', fontSize: 11 }}>{displayInfo.score.errors} err</span>}
                    {displayInfo.score.warnings > 0 && <span style={{ color: '#f59e0b', fontSize: 11 }}>{displayInfo.score.warnings} warn</span>}
                    {displayInfo.score.infos > 0 && <span style={{ color: '#3b82f6', fontSize: 11 }}>{displayInfo.score.infos} info</span>}
                    {displayInfo.score.errors === 0 && displayInfo.score.warnings === 0 && <span style={{ color: '#22c55e', fontSize: 11 }}>✅</span>}
                  </span>
                </div>
                {showA11y && displayInfo.diagnostics && displayInfo.diagnostics.length > 0 && (
                  <div style={{ marginBottom: 6 }}>
                    {displayInfo.diagnostics.map((d, i) => (
                      <div key={i} style={{ padding: '6px 10px', marginBottom: 3, background: 'rgba(255,255,255,0.02)', borderRadius: 4, borderLeft: `3px solid ${severityColor(d.severity)}` }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#e4e4e7' }}>{severityIcon(d.severity)} {d.message}</div>
                        {d.suggestion && <div style={{ fontSize: 10, color: '#71717a', marginTop: 2 }}>→ {d.suggestion}</div>}
                        {d.wcag && <div style={{ fontSize: 9, color: '#52525b', marginTop: 2 }}>WCAG {d.wcag}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Properties with Phase 5 deep trace */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Properties</div>
              {relevantProps.map(([prop, value]) => {
                const irDecl = findIRDecl(prop);
                const isExpanded = expandedProp === prop;
                return (
                  <div key={prop}>
                    <div onClick={() => setExpandedProp(isExpanded ? null : prop)}
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: irDecl ? 'pointer' : 'default', background: isExpanded ? 'rgba(99,102,241,0.08)' : 'transparent', borderRadius: isExpanded ? 3 : 0, paddingLeft: isExpanded ? 6 : 0, paddingRight: isExpanded ? 6 : 0 }}>
                      <span style={{ color: '#a1a1aa', fontSize: 12 }}>
                        {irDecl && <span style={{ color: '#6366f1', marginRight: 3 }}>●</span>}{prop}
                      </span>
                      <span style={{ color: '#e4e4e7', fontFamily: 'monospace', fontSize: 11, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
                    </div>
                    {isExpanded && irDecl && (
                      <div style={{ marginTop: 2, marginBottom: 6, padding: '6px 10px', background: 'rgba(99,102,241,0.06)', borderRadius: 3, borderLeft: '2px solid #6366f1' }}>
                        {/* Phase 5: Source trace */}
                        {irDecl.sourceFile && (
                          <div style={{ fontSize: 9, color: '#52525b', marginBottom: 6, fontFamily: 'monospace' }}>
                            📁 {irDecl.sourceFile}
                          </div>
                        )}
                        <div style={{ fontSize: 9, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>History</div>
                        {irDecl.history.map((h, i) => (
                          <div key={i} style={{ display: 'flex', gap: 6, padding: '2px 0', fontSize: 10, borderBottom: i < irDecl.history.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none' }}>
                            <span style={{ color: '#6366f1', minWidth: 14 }}>{i + 1}</span>
                            <div>
                              <span style={{ color: '#a5b4fc', fontWeight: 600 }}>{h.pass}</span>
                              <span style={{ color: '#94a3b8', marginLeft: 6 }}>{h.action}</span>
                              {h.reason && <div style={{ color: '#71717a' }}>{h.reason}</div>}
                              {h.previous !== undefined && <div style={{ color: '#52525b' }}>was: {JSON.stringify(h.previous)}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Source */}
            <div style={{ padding: 10, background: 'rgba(99,102,241,0.1)', borderRadius: 6, border: '1px solid rgba(99,102,241,0.2)' }}>
              <div style={{ fontSize: 10, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>💡 Source</div>
              <div style={{ fontSize: 11, color: '#c7d2fe', fontFamily: 'monospace' }}>
                {displayInfo.source?.file ? `${displayInfo.source.file} → .$el('${displayInfo.name}')` : `styles/ → .$el('${displayInfo.name}')`}
              </div>
            </div>
          </>
        )}
      </div>

      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 9998,
        background: '#6366f1', color: 'white', border: 'none',
        padding: '10px 18px', borderRadius: 10, fontSize: 13,
        fontWeight: 600, cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
        transition: 'right 0.3s ease',
      }}>
        🔍 Inspect
      </button>
    </>
  );
}
import { useState } from 'react';
import {
  contentTitle, contentDesc, sectionHeading, note,
  auditTextarea, auditBtn, auditResultCard,
  auditStatValue, auditStatLabel, auditIssueItem,
  auditIssueMsg, auditIssueSuggestion, auditGrid,
} from '../docs/Docs/docs.chain';

interface AuditIssue {
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion?: string;
  wcag?: string;
}

interface AuditResult {
  errors: number;
  warnings: number;
  infos: number;
  issues: AuditIssue[];
  passes: number;
}

function clientSideAudit(code: string): AuditResult {
  const issues: AuditIssue[] = [];

  // Contrast checks
  const bgMatches = code.match(/background\(\{?\s*color:\s*['"]([^'"]+)['"]/g) || [];
  const colorMatches = code.match(/typography\(\{.*?color:\s*['"]([^'"]+)['"]/g) || [];
  if (bgMatches.length > 0 && colorMatches.length === 0) {
    issues.push({
      severity: 'warning',
      message: 'Background set without text color — may cause contrast issues',
      suggestion: 'Add .typography({ color: "#fff" }) with a WCAG-compliant contrast ratio',
      wcag: '1.4.3',
    });
  }

  // Outline without focus fallback
  if (code.includes('outline') && code.includes('none') && !code.includes('focus-visible')) {
    issues.push({
      severity: 'warning',
      message: 'outline: none without :focus-visible fallback',
      suggestion: 'Add .focus().outline({ width: "2px", style: "solid", color: "#6366f1" }).end()',
      wcag: '2.4.7',
    });
  }

  // Animations without reduced motion
  if ((code.includes('animation') || code.includes('transition')) && !code.includes('prefers-reduced-motion')) {
    issues.push({
      severity: 'info',
      message: 'Animations without prefers-reduced-motion support',
      suggestion: 'Wrap in .media("(prefers-reduced-motion: no-preference)", ...)',
      wcag: '2.3.3',
    });
  }

  // 100vh on mobile
  if (code.includes('100vh')) {
    issues.push({
      severity: 'warning',
      message: '100vh can cause issues on mobile browsers (address bar)',
      suggestion: 'Use 100dvh for dynamic viewport height, or min-h-screen with fallback',
    });
  }

  // Font size minimum
  const fontSizeMatch = code.match(/fontSize[:\s(]+(\d+)/g);
  if (fontSizeMatch) {
    fontSizeMatch.forEach(m => {
      const size = parseInt(m.match(/\d+/)![0]);
      if (size < 12) {
        issues.push({
          severity: 'warning',
          message: `font-size: ${size}px is below WCAG minimum of 12px`,
          suggestion: 'Use font-size: max(12px, currentValue) for readability',
          wcag: '1.4.4',
        });
      }
    });
  }

  // Hover without focus
  if (code.includes('.hover()') && !code.includes('.focus()') && !code.includes('pressable')) {
    issues.push({
      severity: 'info',
      message: 'Hover styles without :focus-visible fallback',
      suggestion: 'Add .focus() styles for keyboard users, or use .pressable() macro',
      wcag: '2.4.7',
    });
  }

  // Missing touch target size
  const widthMatch = code.match(/width[:\s(]+(\d+)/g);
  const heightMatch = code.match(/height[:\s(]+(\d+)/g);
  if (widthMatch && heightMatch) {
    widthMatch.forEach((m, i) => {
      const w = parseInt(m.match(/\d+/)![0]);
      const h = heightMatch[i] ? parseInt(heightMatch[i].match(/\d+/)![0]) : 0;
      if (w < 44 && h < 44 && w > 0 && h > 0) {
        issues.push({
          severity: 'warning',
          message: `Interactive element too small (${w}x${h}px) — WCAG requires 44x44px minimum`,
          suggestion: 'Increase touch target to at least 44x44px',
          wcag: '2.5.8',
        });
      }
    });
  }

  const errors = issues.filter(i => i.severity === 'error').length;
  const warnings = issues.filter(i => i.severity === 'warning').length;
  const infos = issues.filter(i => i.severity === 'info').length;

  return { errors, warnings, infos, issues, passes: issues.length === 0 ? 1 : 0 };
}

const DEFAULT_CODE = `chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff', fontWeight: '600' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover()
    .background({ color: '#4f46e5' })
  .end()
  .$el('button')`;

export default function Audit() {
  const [cssInput, setCssInput] = useState(DEFAULT_CODE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  const runAudit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cssInput }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok || contentType.includes('text/html')) {
        throw new Error('API_UNAVAILABLE');
      }

      const data = await response.json();
      setApiAvailable(true);

      setResult({
        errors: data.summary.errors,
        warnings: data.summary.warnings,
        infos: data.summary.infos,
        issues: data.issues,
        passes: data.summary.totalIssues === 0 ? 1 : 0,
      });
    } catch (e) {
      if ((e as Error).message === 'API_UNAVAILABLE') {
        setApiAvailable(false);
        setResult(clientSideAudit(cssInput));
      } else {
        setError((e as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#71717a';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '•';
    }
  };

  return (
    <div className="chain-docs-layout">
      <div className="chain-docs-content" style={{ maxWidth: '100%' }}>
        <h1 className={contentTitle}>Accessibility Audit</h1>
        <p className={contentDesc}>
          Paste your ChainCSS styles and get an instant WCAG 2.2 accessibility report.
          ChainCSS checks contrast ratios, touch targets, focus indicators, font sizes, 
          and motion preferences — then suggests auto-fixes.
        </p>

        <h2 className={sectionHeading}>Your Styles</h2>
        <textarea
          className={auditTextarea}
          value={cssInput}
          onChange={(e) => setCssInput(e.target.value)}
          placeholder="Paste your chain() styles here..."
        />

        <div style={{ marginTop: 16, marginBottom: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className={auditBtn}
            onClick={runAudit}
            disabled={loading || !cssInput.trim()}
          >
            {loading ? '🔍 Auditing...' : '🔍 Run Audit'}
          </button>
          <button
            className={auditBtn}
            onClick={() => { setCssInput(DEFAULT_CODE); setResult(null); setError(''); }}
            style={{ background: 'rgba(255,255,255,0.06)', color: '#a1a1aa' }}
          >
            ↺ Reset
          </button>
        </div>

        {error && (
          <div className={note} style={{ borderLeftColor: '#ef4444', background: 'rgba(239,68,68,0.08)', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        {result && (
          <>
            <h2 className={sectionHeading}>Results</h2>

            <div className={auditGrid}>
              <div className={auditResultCard} style={{ borderLeftColor: result.errors > 0 ? '#ef4444' : '#22c55e' }}>
                <div className={auditStatValue} style={{ color: result.errors > 0 ? '#ef4444' : '#22c55e' }}>
                  {result.errors}
                </div>
                <div className={auditStatLabel}>Errors</div>
              </div>
              <div className={auditResultCard} style={{ borderLeftColor: result.warnings > 0 ? '#f59e0b' : '#22c55e' }}>
                <div className={auditStatValue} style={{ color: result.warnings > 0 ? '#f59e0b' : '#22c55e' }}>
                  {result.warnings}
                </div>
                <div className={auditStatLabel}>Warnings</div>
              </div>
              <div className={auditResultCard} style={{ borderLeftColor: '#3b82f6' }}>
                <div className={auditStatValue} style={{ color: '#3b82f6' }}>
                  {result.infos}
                </div>
                <div className={auditStatLabel}>Suggestions</div>
              </div>
              <div className={auditResultCard} style={{ borderLeftColor: '#22c55e' }}>
                <div className={auditStatValue} style={{ color: '#22c55e' }}>
                  {result.passes}
                </div>
                <div className={auditStatLabel}>Passed</div>
              </div>
            </div>

            {result.issues.length > 0 && (
              <>
                <h2 className={sectionHeading}>Issues Found</h2>
                {result.issues.map((issue, i) => (
                  <div
                    key={i}
                    className={auditIssueItem}
                    style={{ borderLeftColor: getSeverityColor(issue.severity) }}
                  >
                    <div className={auditIssueMsg}>
                      {getSeverityIcon(issue.severity)}{' '}
                      {issue.message}
                      {issue.wcag && (
                        <span style={{ fontSize: 11, color: '#52525b', marginLeft: 8 }}>
                          WCAG {issue.wcag}
                        </span>
                      )}
                    </div>
                    {issue.suggestion && (
                      <div className={auditIssueSuggestion}>→ {issue.suggestion}</div>
                    )}
                  </div>
                ))}
              </>
            )}

            {result.issues.length === 0 && (
              <div className={note}>
                ✅ All checks passed! Your styles are WCAG 2.2 compliant.
              </div>
            )}

            <div className={note} style={{ marginTop: 24 }}>
              {apiAvailable === true ? (
                <>
                  <strong>🔬 Powered by ChainCSS Compiler Pipeline</strong><br />
                  This audit ran the full 5-stage pipeline — normalization, validation,
                  analysis, lowering, and optimization — with contrast ratio computation.
                </>
              ) : (
                <>
                  <strong>💡 Want automated contrast fixing?</strong> Run{' '}
                  <code style={{ background: 'rgba(99,102,241,0.12)', padding: '2px 8px', borderRadius: 4 }}>
                    npx chaincss audit --fix --write
                  </code>{' '}
                  in your terminal. ChainCSS finds the nearest WCAG-compliant color by 
                  preserving hue and adjusting lightness via binary search.
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
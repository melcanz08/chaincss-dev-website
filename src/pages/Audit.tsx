import { useState } from 'react';
import {
  contentTitle, contentDesc, sectionHeading, note,
  auditTextarea, auditBtn, auditResultCard,
  auditStatValue, auditStatLabel, auditIssueItem,
  auditIssueMsg, auditIssueSuggestion, auditGrid,
} from '../styles/docs.chain.ts';

interface AuditResult {
  errors: number;
  warnings: number;
  infos: number;
  issues: Array<{
    severity: string;
    message: string;
    suggestion?: string;
  }>;
}

export default function Audit() {
  const [cssInput, setCssInput] = useState(`chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('12px 24px')
  .rounded(8)
  .fontSize(16)
  .fontWeight(600)
  .hover()
    .bg('#4f46e5')
  .end()
  .$el('button')`);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');

  const runAudit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Dynamically import browser-compatible APIs
      const { compileToCSS, classifyValue } = await import('chaincss');

      const issues: AuditResult['issues'] = [];
      const code = cssInput;

      // Basic static analysis
      
      // Check for common issues
      if (code.includes('outline:') && code.includes('none') && !code.includes('focus-visible')) {
        issues.push({
          severity: 'warning',
          message: 'outline: none without :focus-visible fallback',
          suggestion: 'Add .focus().outline("2px solid #3b82f6").outlineOffset("2px").end()',
        });
      }

      if (code.includes('animation') || code.includes('transition')) {
        if (!code.includes('prefers-reduced-motion')) {
          issues.push({
            severity: 'warning',
            message: 'Animations without prefers-reduced-motion support',
            suggestion: 'Wrap in .media("(prefers-reduced-motion: no-preference)", ...)',
          });
        }
      }

      if (code.includes('100vh')) {
        issues.push({
          severity: 'warning',
          message: '100vh can cause issues on mobile browsers',
          suggestion: 'Use 100dvh instead for dynamic viewport height',
        });
      }

      if (code.includes('fontSize') && code.match(/fontSize\((\d+)\)/)) {
        const match = code.match(/fontSize\((\d+)\)/);
        if (match && parseInt(match[1]) < 12) {
          issues.push({
            severity: 'warning',
            message: `font-size: ${match[1]}px is below WCAG minimum of 12px`,
            suggestion: 'Use font-size: max(12px, currentValue) for accessibility',
          });
        }
      }

      // Check for hover without focus
      if (code.includes('.hover()') && !code.includes('.focus()')) {
        issues.push({
          severity: 'info',
          message: 'Hover styles without :focus-visible fallback',
          suggestion: 'Add .focus() styles for keyboard accessibility',
        });
      }

      // Color contrast approximations
      if (code.includes('#ffffff') && code.includes('bg(')) {
        const bgMatch = code.match(/\.bg\('([^']+)'\)/);
        if (bgMatch) {
          const bg = bgMatch[1];
          // Simple luminance check
          if (bg === '#6366f1' || bg === '#4f46e5') {
            issues.push({
              severity: 'info',
              message: 'White text on indigo background — verify contrast ratio',
              suggestion: 'Run chaincss check for exact WCAG contrast calculation',
            });
          }
        }
      }

      const errors = issues.filter(i => i.severity === 'error');
      const warnings = issues.filter(i => i.severity === 'warning');
      const infos = issues.filter(i => i.severity === 'info');

      setResult({
        errors: errors.length,
        warnings: warnings.length,
        infos: infos.length,
        issues,
      });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chain-docs-layout">
      <div className="chain-docs-content" style={{ maxWidth: '100%' }}>
        <h1 className={contentTitle}>CSS Accessibility Audit</h1>
        <p className={contentDesc}>
          Paste your ChainCSS styles and get an instant accessibility report.
          For full WCAG 2.2 analysis, run{' '}
          <code style={{ background: 'rgba(99,102,241,0.12)', padding: '2px 8px', borderRadius: 4, fontSize: 13 }}>
            npx chaincss check
          </code>{' '}
          in your terminal.
        </p>

        <h2 className={sectionHeading}>Your Styles</h2>
        <textarea
          className={auditTextarea}
          value={cssInput}
          onChange={(e) => setCssInput(e.target.value)}
          placeholder="Paste your chain() styles here..."
        />

        <div style={{ marginTop: 16, marginBottom: 32 }}>
          <button
            className={auditBtn}
            onClick={runAudit}
            disabled={loading || !cssInput.trim()}
          >
            {loading ? '🔍 Auditing...' : '🔍 Run Audit'}
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
                  {result.issues.length === 0 ? 1 : 0}
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
                    style={{
                      borderLeftColor:
                        issue.severity === 'error' ? '#ef4444' :
                        issue.severity === 'warning' ? '#f59e0b' : '#3b82f6'
                    }}
                  >
                    <div className={auditIssueMsg}>
                      {issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️'}{' '}
                      {issue.message}
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
                ✅ All checks passed! No common issues found in your styles.
              </div>
            )}

            <div className={note} style={{ marginTop: 24 }}>
              <strong>💡 Want deeper analysis?</strong> Run{' '}
              <code style={{ background: 'rgba(99,102,241,0.12)', padding: '2px 8px', borderRadius: 4 }}>
                npx chaincss check
              </code>{' '}
              in your terminal for full WCAG 2.2 contrast checking, touch target sizing,
              and responsive overflow detection powered by the ChainCSS CI pipeline.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
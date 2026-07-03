// api/audit.ts
// Vercel serverless function — runs the full ChainCSS CI pipeline
// and returns a WCAG accessibility audit report as JSON.



import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ChainCSSCompiler, createPipeline } from 'chaincss/compiler';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body || {};

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Missing "code" field in request body' });
    }

    if (code.length > 50000) {
      return res.status(400).json({ error: 'Code too long. Maximum 50,000 characters.' });
    }

    // Initialize compiler with CI preset
    const compiler = new ChainCSSCompiler({
      verbose: true,
      silent: true,
      prefixer: { enabled: false },  // ← Disable PostCSS import
    });

    const ciPipeline = createPipeline('ci');
    (compiler as any).pipeline = ciPipeline;

    // Create a temporary style definition
    const styleDef = {
      selectors: ['.audit-target'],
    };

    // Parse any inline styles from the pasted code
    const propertyMatches = code.matchAll(/\.(\w+)\(([^)]+)\)/g);
    for (const match of propertyMatches) {
      const [, prop, value] = match;
      // Skip non-CSS methods
      if (['hover', 'focus', 'active', 'end', 'media', 'nest', 'children', 'when', 'supports', 'container', 'layer', 'placeholder', 'checked', 'disabled', 'before', 'after', 'debug', 'explain', 'addClass'].includes(prop)) continue;
      (styleDef as any)[prop] = tryParseValue(value);
    }

    // Compile through the pipeline
    const compileResult = compiler.compileStyle('audit', styleDef);
    const diags = (compileResult as any)._diagnostics || [];
    const pipelineReport = (compileResult as any)._pipelineReport || [];

    // Filter out internal noise
    const relevantDiags = diags.filter((d: any) => {
      if (!d.message) return false;
      if (d.message.includes('Skipped') && d.message.includes('pass(es)')) return false;
      return true;
    });

    // Categorize
    const errors = relevantDiags.filter((d: any) => d.severity === 'error');
    const warnings = relevantDiags.filter((d: any) => d.severity === 'warning');
    const infos = relevantDiags.filter((d: any) => d.severity === 'info' || d.severity === 'hint');

    // WCAG criteria mapping
    const wcagMap: Record<string, string> = {
      'contrast': '1.4.3 Contrast (Minimum) — AA',
      'font-size': '1.4.4 Resize Text — AA',
      'touch-target': '2.5.8 Target Size — AA',
      'focus': '2.4.7 Focus Visible — AA',
      'motion': '2.3.3 Animation from Interactions — AAA',
      'hover-only': '1.4.13 Content on Hover or Focus — AA',
      'responsive': '1.4.10 Reflow — AA',
      'css-conflict': '4.1.1 Parsing — A',
    };

    const issues = relevantDiags.map((d: any) => ({
      severity: d.severity,
      message: d.message || '',
      suggestion: d.suggestion || '',
      wcag: d.wcagCriterion || wcagMap[d.category] || '',
      pass: d.pass || '',
    }));

    res.json({
      url: 'pasted-code',
      timestamp: new Date().toISOString(),
      summary: {
        errors: errors.length,
        warnings: warnings.length,
        infos: infos.length,
        totalIssues: relevantDiags.length,
        score: Math.max(0, 100 - (errors.length * 10) - (warnings.length * 2)),
        pipelinePasses: pipelineReport.length,
      },
      issues,
    });
  } catch (error) {
    console.error('Audit failed:', error);
    res.status(500).json({
      error: 'Audit failed',
      message: (error as Error).message,
    });
  }
}

// Try to parse a value — handle strings, numbers, and simple expressions
function tryParseValue(raw: string): any {
  const trimmed = raw.trim();
  // Remove surrounding quotes
  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) ||
      (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return trimmed.slice(1, -1);
  }
  // Try number
  const num = Number(trimmed);
  if (!isNaN(num)) return num;
  // Return as string
  return trimmed;
}
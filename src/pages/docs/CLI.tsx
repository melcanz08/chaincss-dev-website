import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function CLI() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>CLI Reference</h1>
      <p className={contentDesc}>
        ChainCSS includes a full-featured CLI for project scaffolding, development,
        production builds, accessibility auditing, token management, and cache inspection.
        Every feature of the compiler is accessible from the terminal.
      </p>

      {/* ============================================================ */}
      {/* PROJECT SCAFFOLDING */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Project Scaffolding</h2>

      <pre className={codeBlock}><code className="language-bash">{`# Create config file
chaincss init

# Create config with TypeScript
chaincss init --typescript

# Force overwrite existing config
chaincss init --force

# Scaffold a complete project
chaincss create app my-app

# With framework and package manager
chaincss create app my-app --template react --pm pnpm

# Available templates: minimal, entangled, react`}</code></pre>

      <p className={paragraph}>
        <code className={inlineCode}>chaincss create app</code> generates a complete project with
        Vite config, TypeScript setup, design tokens, Figma sync workflow, and example components.
      </p>

      {/* ============================================================ */}
      {/* DEVELOPMENT */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Development</h2>

      <pre className={codeBlock}><code className="language-bash">{`
# Start dev server with HMR + error overlay
chaincss dev

# Custom port
chaincss dev --port 5173

# With specific config
chaincss dev --config chaincss.production.config.ts

# Watch mode (file watcher with incremental rebuilds)
chaincss watch

# Watch with verbose output
chaincss watch --verbose

# Watch with custom debounce (default: 200ms)
chaincss watch --debounce 300`}</code></pre>

      {/* ============================================================ */}
      {/* PRODUCTION BUILD */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Production Build</h2>

      <pre className={codeBlock}><code className="language-bash">{`# Standard build
chaincss build

# Production build with all optimizations
chaincss build --minify --atomic

# Enable persistent compiler state (cold-start recovery)
chaincss build --persistent

# Watch mode (continuous rebuild on file changes)
chaincss build --watch

# Multi-target emission
chaincss build --target css,atomic-css,tailwind,design-tokens,figma,graph-json

# Specific targets
chaincss build --target css,design-tokens

# All targets
chaincss build --target all

# With custom config
chaincss build --config chaincss.production.config.ts --verbose`}</code></pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Flag</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['--minify', 'Compress final CSS output'],
            ['--atomic', 'Extract repeated declarations to utility classes'],
            ['--persistent', 'Save compiler state for cold-start recovery'],
            ['--watch', 'Continuous rebuild on file changes'],
            ['--target', 'Emission targets: css, atomic-css, tailwind, design-tokens, figma, graph-json, all'],
            ['--config', 'Path to custom config file'],
            ['--verbose', 'Verbose output with per-pass timing'],
          ].map(([flag, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{flag}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* QUALITY */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Quality Assurance</h2>

      <pre className={codeBlock}><code className="language-bash">{`# Run accessibility audit (CI-ready — fails on errors)
chaincss check --strict

# Auto-fix where possible
chaincss check --fix

# Verbose per-file report
chaincss check --verbose

# WCAG contrast audit with specific level
chaincss audit --fail-on AA      # AA compliance (default)
chaincss audit --fail-on AAA     # AAA compliance (strict)

# Auto-fix and write to token files
chaincss audit --fix --write

# Export JSON report
chaincss audit --json ./reports/a11y.json

# With custom contrast threshold
chaincss audit --target 7.0

# Strict mode — treat warnings as errors
chaincss audit --strict`}</code></pre>

      {/* ============================================================ */}
      {/* TOKEN MANAGEMENT */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Token Management</h2>

      <pre className={codeBlock}><code className="language-bash">{`# Propagate token changes and fix contrast
chaincss entanglement --input tokens.json --fix

# Watch mode — re-propagate on file changes
chaincss entanglement --input tokens.json --watch --fix

# With Figma-compatible output
chaincss entanglement --input tokens.json --figma --fix

# Verbose output
chaincss entanglement --input tokens.json --watch --fix --verbose

# Custom debounce (default: 150ms)
chaincss entanglement --input tokens.json --watch --debounce 300

# Setup Figma sync pipeline
chaincss figma init --repo org/design-tokens

# With specific Figma file
chaincss figma init --repo org/design-tokens --fileId ABC123xyz

# Non-interactive mode
chaincss figma init --repo org/design-tokens --yes`}</code></pre>

      {/* ============================================================ */}
      {/* CACHE MANAGEMENT */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Cache Management</h2>

      <pre className={codeBlock}><code className="language-bash">{`# View cache statistics
chaincss cache stats

# List all cached entries
chaincss cache list

# Inspect a specific entry
chaincss cache inspect --key <hash>

# Validate cache integrity
chaincss cache validate

# Remove expired entries
chaincss cache prune

# Clear all cache (requires --force)
chaincss cache clear --force

# Delete specific entry (requires --force)
chaincss cache delete --key <hash> --force

# Backup cache to directory
chaincss cache backup --output ./cache-backup`}</code></pre>

      {/* ============================================================ */}
      {/* TIMELINE */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Style Timeline</h2>

      <pre className={codeBlock}><code className="language-bash">{`# View all snapshots
chaincss timeline list

# Compare two snapshots
chaincss timeline diff --snapshot1 0 --snapshot2 5

# View individual property changes
chaincss timeline changes

# Timeline statistics
chaincss timeline stats

# Export to JSON
chaincss timeline export --output timeline.json

# Clear history
chaincss timeline clear

# Watch for live updates
chaincss timeline watch`}</code></pre>

      {/* ============================================================ */}
      {/* QUICK REFERENCE */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Quick Reference</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Command</th>
            <th className={docTh}>Purpose</th>
            <th className={docTh}>Common Flags</th>
          </tr></thead>
          <tbody>{[
            ['init', 'Create chaincss.config.ts', '--force, --typescript, --framework'],
            ['create app', 'Scaffold full project', '--template, --pm, --no-install'],
            ['dev', 'Dev server with HMR', '--port, --config'],
            ['watch', 'File watcher + rebuild', '--verbose, --debounce, --config'],
            ['build', 'Production build', '--minify, --atomic, --persistent, --watch, --target'],
            ['check', 'Validate styles (CI)', '--strict, --fix, --verbose'],
            ['audit', 'WCAG contrast audit', '--fail-on, --fix, --write, --json, --strict'],
            ['entanglement', 'Token propagation', '--input, --watch, --fix, --figma, --verbose'],
            ['figma init', 'Setup Figma sync', '--repo, --fileId, --branch, --yes'],
            ['cache', 'Cache management', 'stats, list, inspect, validate, prune, clear, delete, backup'],
            ['timeline', 'Style history', 'list, diff, changes, stats, export, clear, watch'],
          ].map(([cmd, purpose, flags], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>chaincss {cmd}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{purpose}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{flags}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 All commands support <code className={inlineCode}>--verbose</code></strong> for
        detailed output and <code className={inlineCode}>--config</code> for custom config paths.
        The <code className={inlineCode}>build</code>, <code className={inlineCode}>watch</code>, and{' '}
        <code className={inlineCode}>entanglement</code> commands support persistent mode for
        cold-start incremental compilation. See the individual doc pages for deep dives
        on each subsystem.
      </div>
    </>
  );
}
import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function FigmaIntegration() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Figma Integration</h1>
      <p className={contentDesc}>
        Bidirectional sync between Figma and your codebase. Designers change colors
        in Figma → Tokens Studio pushes to GitHub → ChainCSS propagates derived tokens
        and fixes contrast → developers pull updated tokens → browser updates via HMR.
        One command to set up the entire pipeline.
      </p>

      <h2 className={sectionHeading}>The Problem: Design-Development Drift</h2>
      <p className={paragraph}>
        Design tokens live in Figma. Code lives in your repository. Without automation,
        keeping them in sync means manual copy-paste, Slack messages asking "what's the
        hex for the new primary?", and design reviews catching color mismatches that
        could have been prevented.
      </p>
      <p className={paragraph}>
        ChainCSS automates the entire pipeline: Figma → GitHub → token propagation →
        contrast fixing → code generation → HMR. Designers own the tokens. Developers
        consume them. The compiler ensures consistency.
      </p>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-bash">{`# One command to set up the entire pipeline
chaincss figma init --repo your-org/design-tokens

# With specific Figma file
chaincss figma init --repo your-org/design-tokens --fileId ABC123xyz

# Custom branch and token path
chaincss figma init \\
  --repo your-org/design-tokens \\
  --branch tokens/v2 \\
  --path design/tokens.json \\
  --yes  # Skip interactive prompts`}</code></pre>

      <p className={paragraph}>
        This single command creates everything you need:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><code className={inlineCode}>tokens/global.json</code> — starter token definitions</li>
        <li><code className={inlineCode}>tokens/$metadata.json</code> — Token Studio metadata</li>
        <li><code className={inlineCode}>tokens/$themes.json</code> — theme definitions (light/dark)</li>
        <li><code className={inlineCode}>.github/workflows/chaincss-tokens.yml</code> — auto-fix on push</li>
        <li><code className={inlineCode}>chaincss.config.ts</code> — pre-configured with relationships</li>
        <li><code className={inlineCode}>.env</code> — <code className={inlineCode}>FIGMA_TOKEN</code> placeholder</li>
      </ul>

      <h2 className={sectionHeading}>Architecture: The Full Pipeline</h2>

      <pre className={codeBlock}><code className="language-text">{`┌─────────────────────────────────────────────────────────┐
│                     FIGMA                                │
│                                                          │
│  Designer changes "primary.500" from #6366f1 to #7c3aed │
│  Tokens Studio plugin detects change                     │
│  Pushes to GitHub (via Personal Access Token)            │
└──────────────────────┬──────────────────────────────────┘
                       │ git push
                       ▼
┌─────────────────────────────────────────────────────────┐
│                     GITHUB                               │
│                                                          │
│  tokens/global.json updated                              │
│  GitHub Action triggers: chaincss-tokens.yml            │
│  Runs: chaincss entanglement --input tokens.json --fix  │
│                                                          │
│  Propagates derived tokens:                              │
│    primary.100: #e0e7ff → #ede9fe (mix-white 80%)       │
│    primary.600: #4f46e5 → #6d28d9 (shade 20%)           │
│                                                          │
│  Auto-fixes contrast:                                    │
│    text.onPrimary: adjusts for 4.5:1 on new primary.500 │
│                                                          │
│  Commits fixed tokens back:                              │
│    "chore(tokens): auto-fix entanglement [skip ci]"     │
└──────────────────────┬──────────────────────────────────┘
                       │ git pull
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   DEVELOPER MACHINE                      │
│                                                          │
│  git pull → tokens.json updated                          │
│  chaincss watch detects change                           │
│  Incremental recompile: only affected rules (4.2%)       │
│  Browser updates via HMR                                 │
│                                                          │
│  All 47 components using primary.500 now show new color  │
│  All derived shades are correct                          │
│  All text-on-primary contrast ratios pass WCAG AA        │
└─────────────────────────────────────────────────────────┘`}</code></pre>

      <h2 className={sectionHeading}>The Generated GitHub Action</h2>
      <p className={paragraph}>
        The workflow file created by <code className={inlineCode}>chaincss figma init</code>:
      </p>

      <pre className={codeBlock}><code className="language-yaml">{`# .github/workflows/chaincss-tokens.yml
name: ChainCSS Entanglement

on:
  push:
    paths:
      - 'tokens/**'
      - 'tokens.json'
  workflow_dispatch:  # Manual trigger from GitHub UI

jobs:
  entanglement:
    runs-on: ubuntu-latest
    permissions:
      contents: write  # Needed to commit fixes back
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci || npm install
      
      # The magic — auto-propagate and fix
      - run: npx chaincss entanglement --input tokens/global.json --fix --output tokens/global.json
      
      # Commit any fixes back
      - name: Commit fixes
        run: |
          if [[ -n "$(git status --porcelain)" ]]; then
            git config user.name "chaincss-bot"
            git config user.email "bot@chaincss.dev"
            git add tokens/global.json
            git commit -m "chore(tokens): auto-fix entanglement [skip ci]"
            git push
          fi`}</code></pre>

      <div className={note}>
        <strong>🔑 Permissions:</strong> The workflow needs <code className={inlineCode}>contents: write</code> to
        commit fixed tokens back. The <code className={inlineCode}>[skip ci]</code> in the commit message
        prevents infinite loops — the push won't trigger another workflow run.
      </div>

      <h2 className={sectionHeading}>Figma Tokens Studio Setup</h2>
      <p className={paragraph}>
        For designers using Figma's Tokens Studio plugin, the setup instructions
        are generated in <code className={inlineCode}>.tokensstudio/README.md</code>:
      </p>

      <pre className={codeBlock}><code className="language-text">{`# Tokens Studio Sync Setup

1. Open Figma → Tokens Studio → Settings → Sync → Add new → GitHub
2. Repo: your-org/design-tokens
3. Branch: main
4. File: tokens/global.json
5. Personal Access Token: create at https://github.com/settings/tokens
   - Required scope: repo
6. Enable "Commit changes" and "Push on change"

ChainCSS will then watch:
  https://raw.githubusercontent.com/your-org/design-tokens/main/tokens/global.json

Or use Figma Variables API mode:
  - Figma File ID: your-file-id
  - FIGMA_TOKEN env var required`}</code></pre>

      <h2 className={sectionHeading}>Two Sync Modes</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Mode</th>
            <th className={docTh}>Source</th>
            <th className={docTh}>Best For</th>
            <th className={docTh}>Setup</th>
          </tr></thead>
          <tbody>{[
            ['Tokens Studio', 'GitHub raw URL', 'Teams using Figma Tokens Studio plugin', 'GitHub PAT + plugin settings'],
            ['Figma Variables API', 'Figma REST API', 'Teams using native Figma variables', 'FIGMA_TOKEN + file ID'],
          ].map(([mode, source, best, setup], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{mode}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{source}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{best}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{setup}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Vite Plugin Integration</h2>
      <p className={paragraph}>
        For real-time sync during development, the Figma sync plugin polls for changes
        and triggers recompilation automatically:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// vite.config.ts
import { defineConfig } from 'vite'
import chaincss from 'chaincss/vite'
import figmaSync from 'chaincss/figma-sync'

export default defineConfig({
  plugins: [
    // Tokens Studio mode (GitHub URL)
    figmaSync({
      mode: 'url',
      url: 'https://raw.githubusercontent.com/your-org/design-tokens/main/tokens/global.json',
      output: 'tokens/global.json',
      pollMs: 3000,        // Check every 3 seconds
      autoFix: true,       // Auto-propagate + fix contrast
      verbose: true
    }),
    
    // Figma Variables API mode
    // figmaSync({
    //   mode: 'figmaVariables',
    //   fileId: 'ABC123xyz',
    //   token: process.env.FIGMA_TOKEN!,
    //   output: 'tokens/global.json',
    //   pollMs: 3000,
    //   autoFix: true
    // }),
    
    chaincss({
      tokens: {
        relationships: [
          { type: 'derived', source: 'colors.primary.500', target: 'colors.primary.100', method: 'mix-white 80%' },
          { type: 'contrast', foreground: 'colors.text.onPrimary', background: 'colors.primary.500', target: 4.5 },
        ]
      }
    })
  ]
})`}</code></pre>

      <h2 className={sectionHeading}>CLI Watch Mode</h2>
      <p className={paragraph}>
        For projects not using Vite, the CLI provides standalone watch mode with
        entanglement propagation:
      </p>

      <pre className={codeBlock}><code className="language-bash">{`# Watch tokens file for changes — propagate + fix on every change
chaincss entanglement --input tokens/global.json --watch --fix

# With Figma format compatibility
chaincss entanglement --input figma-tokens.json --figma --watch --fix

# Verbose output to see every propagation
chaincss entanglement --input tokens.json --watch --fix --verbose

# Custom debounce (default: 150ms)
chaincss entanglement --input tokens.json --watch --fix --debounce 300`}</code></pre>

      <h2 className={sectionHeading}>Round-Trip: Figma → Code → Figma</h2>
      <p className={paragraph}>
        The multi-target emitter can output back to Figma-compatible format,
        enabling round-trip workflows:
      </p>

      <pre className={codeBlock}><code className="language-bash">{`# Export tokens from your codebase to Figma format
chaincss build --target figma

# This produces figma-tokens.json with proper {value, type} objects:
# {
#   "colors": {
#     "primary": {
#       "500": { "value": "#6366f1", "type": "color" },
#       "100": { "value": "#e0e7ff", "type": "color" }
#     }
#   }
# }

# Designers can import this back into Figma Tokens Studio
# to see the current state of tokens in the codebase`}</code></pre>

      <h2 className={sectionHeading}>Environment Variables</h2>
      <p className={paragraph}>
        The init command sets up <code className={inlineCode}>.env</code> with the required tokens:
      </p>

      <pre className={codeBlock}><code className="language-bash">{`# .env
FIGMA_TOKEN=figd_xxxxxxxxxxxxxxxx    # Figma Personal Access Token
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx    # GitHub PAT (for push-back integration)

# .env.example (safe to commit)
FIGMA_TOKEN=figd_xxx
GITHUB_TOKEN=ghp_xxx
TOKENS_URL=https://raw.githubusercontent.com/your-org/design-tokens/main/tokens.json`}</code></pre>

      <h2 className={sectionHeading}>Token Format Compatibility</h2>
      <p className={paragraph}>
        ChainCSS handles the differences between token formats automatically:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Format</th>
            <th className={docTh}>Structure</th>
            <th className={docTh}>Detection</th>
          </tr></thead>
          <tbody>{[
            ['Figma Tokens Studio', '{"primary": {"500": {"value": "#6366f1", "type": "color"}}}', 'Object with "value" and "type" keys'],
            ['Figma Variables API', '{"primary/500": {"value": "#6366f1"}}', 'Flat keys with "/" separators'],
            ['ChainCSS native', '{"primary": {"500": "#6366f1"}}', 'Nested objects with string values'],
            ['Style Dictionary', '{"primary": {"500": {"value": "#6366f1"}}}', '"value" key, no "type"'],
          ].map(([format, structure, detection], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{format}</strong></td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{structure}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{detection}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={paragraph}>
        The <code className={inlineCode}>importFigmaTokens()</code> function in the design orchestrator
        handles the conversion automatically. Any format with <code className={inlineCode}>value</code> keys
        is detected and normalized to ChainCSS's native nested object format.
      </p>

      <div className={note}>
        <strong>💡 Complete workflow:</strong> Designer changes a color in Figma → Tokens Studio
        pushes to GitHub → GitHub Action runs <code className={inlineCode}>chaincss entanglement --fix</code> →
        derived tokens update + contrast auto-fixes → developers pull →{' '}
        <code className={inlineCode}>chaincss watch</code> recompiles → browser updates via HMR.
        The entire cycle takes under 30 seconds from Figma to browser.
        See <a href="/docs/tokens/entanglement" style={{ color: '#818cf8' }}>Token Entanglement</a> and{' '}
        <a href="/docs/tokens/theme-contracts" style={{ color: '#818cf8' }}>Theme Contracts</a> for
        the underlying systems.
      </div>
    </>
  );
}
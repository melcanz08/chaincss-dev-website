import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function CacheTimeline() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Cache & Timeline</h1>
      <p className={contentDesc}>
        ChainCSS maintains a two-tier compilation cache and a full history of every
        style change. Inspect cache hit rates, validate integrity, prune expired entries,
        and diff snapshots to understand exactly what changed between builds.
      </p>

      <h2 className={sectionHeading}>Cache Architecture</h2>
      <p className={paragraph}>
        Two independent cache layers serve different purposes:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}></th>
            <th className={docTh}>L1: CacheManager</th>
            <th className={docTh}>L2: PersistentCache</th>
          </tr></thead>
          <tbody>{[
            ['Storage', 'Single JSON file (.chaincss-cache)', 'File-per-entry directory (.chaincss/persistent-cache/)'],
            ['Key', 'Arbitrary string (styleId:hash)', 'SHA-256 content hash'],
            ['Lifetime', 'Active dev session', 'Cross-build, cross-session (survives restarts)'],
            ['Invalidation', 'TTL + size-based LRU eviction', 'Content change + max age (30 days default)'],
            ['Concurrency', 'Single process', 'Multi-worker safe (atomic writes)'],
            ['Lookup speed', 'O(1) object access', 'Memory LRU → disk file read'],
            ['Max size', '100 MB (default)', '500 MB (default)'],
          ].map(([aspect, l1, l2], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{aspect}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{l1}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{l2}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Cache Commands</h2>

      <pre className={codeBlock}><code className="language-bash">{`# View cache statistics
chaincss cache stats

# List all cached entries
chaincss cache list

# Inspect a specific entry
chaincss cache inspect --key <hash>

# Validate all entries (checks expiry + file integrity)
chaincss cache validate

# Remove expired entries
chaincss cache prune

# Clear everything
chaincss cache clear --force

# Delete a specific entry
chaincss cache delete --key <hash> --force

# Backup cache to a directory
chaincss cache backup --output ./cache-backup`}</code></pre>

      <h2 className={sectionHeading}>Cache Statistics</h2>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss cache stats

📊 Cache Statistics

Persistent Cache:
  Status: Active
  Entry count: 1,247
  Total size: 34.2 MB
  Oldest entry: 2026-07-24 (3 days ago)
  Newest entry: 2026-07-31 (2 minutes ago)
  Cache hit rate: 94.6%

Regular Cache:
  Status: Active
  File count: 47
  Total size: 2.1 MB

Settings:
  Max age: 30 days
  Max size: 500 MB
  Cache directory: .chaincss/persistent-cache`}</code></pre>

      <h2 className={sectionHeading}>Cache Validation</h2>
      <p className={paragraph}>
        Validates every cache entry against its expiry and checks file integrity.
        Uses a concurrency limit of 50 to prevent EMFILE errors on large caches:
      </p>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss cache validate

🔍 Validating Cache Integrity

  ✗ Invalid entry: abc123def456... (expired)
  ✗ Invalid entry: 789ghi012jkl... (corrupted)

Results:
  Valid entries: 1,245
  Invalid entries: 2
  Total size: 33.8 MB

⚠️  Found 2 invalid entries. Run 'chaincss cache prune' to clean them.`}</code></pre>

      <h2 className={sectionHeading}>Timeline: Style Change History</h2>
      <p className={paragraph}>
        Every compilation records a snapshot of the IR. The timeline tracks
        what changed, when, and by how much. Useful for debugging, performance
        analysis, and understanding the impact of token changes.
      </p>

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

      <h2 className={sectionHeading}>Timeline List</h2>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss timeline list

📊 Style Timeline History

    Total Snapshots: 47
    Total Changes: 312
    Duration: 3h 24m

    Snapshots:

[0] .chain-btn
    ID: rule-abc123
    Time: 2026-07-31 14:23:01
    Source: src/components/button.chain.ts
    Properties: 12
    Hash: a1b2c3d4...

[1] .chain-card
    ID: rule-def456
    Time: 2026-07-31 14:23:01
    Source: src/components/card.chain.ts
    Properties: 8
    Hash: e5f6g7h8...`}</code></pre>

      <h2 className={sectionHeading}>Timeline Diff</h2>
      <p className={paragraph}>
        Compare any two snapshots to see exactly which properties changed.
        Uses git-style markers for added, removed, and modified properties:
      </p>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss timeline diff --snapshot1 0 --snapshot2 5

🔍 Diff: .chain-btn → .chain-btn

    Changes: 3
    Time between: 1h 12m

  ~ background-color: #6366f1 → #7c3aed
  + box-shadow: 0 4px 12px rgba(0,0,0,0.1)
  − border: 1px solid #e2e8f0

    Legend: − removed  + added  ~ modified`}</code></pre>

      <h2 className={sectionHeading}>Timeline Changes</h2>
      <p className={paragraph}>
        View individual property-level changes grouped by selector:
      </p>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss timeline changes

📝 Style Change History

  .chain-btn
    ~ background-color: #6366f1 → #7c3aed [14:25:32]
    + box-shadow: 0 4px 12px rgba(0,0,0,0.1) [14:25:32]
    ~ border-radius: 8px → 12px [15:12:18]

  .chain-card
    ~ padding: 16px → 24px [14:48:05]
    − border: 1px solid #e2e8f0 [15:30:42]`}</code></pre>

      <h2 className={sectionHeading}>Timeline Statistics</h2>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss timeline stats

📈 Timeline Statistics

    Total Snapshots: 47
    Total Changes: 312
    First Recorded: 2026-07-31 14:23:01
    Last Recorded: 2026-07-31 17:47:23
    Duration: 3h 24m

    Changes by Type:
      Added: 89
      Removed: 34
      Modified: 189

    Most Active Selectors:
      .chain-btn: 47 changes
      .chain-card: 38 changes
      .chain-input: 29 changes
      .chain-modal: 22 changes
      .chain-badge: 18 changes

    File Size: 156 KB`}</code></pre>

      <h2 className={sectionHeading}>Live Timeline Watch</h2>
      <p className={paragraph}>
        Watch the timeline update in real-time during a development session.
        Useful for understanding the impact of design token changes:
      </p>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss timeline watch

👁️  Watching timeline changes...
    Press Ctrl+C to stop

📝 Timeline updated - 15:48:12
    New snapshot count: 48
    Latest: .chain-btn
    Properties: 14

📝 Timeline updated - 15:48:15
    New snapshot count: 49
    Latest: .chain-card
    Properties: 9`}</code></pre>

      <h2 className={sectionHeading}>Cache + Incremental Compilation</h2>
      <p className={paragraph}>
        The cache and timeline work together to power incremental compilation.
        On a file change, the compiler checks the graph to find affected rules,
        checks the cache for previously compiled results, and only recompiles
        what's actually dirty:
      </p>

      <pre className={codeBlock}><code className="language-text">{`File changed: src/components/button.chain.ts
    ↓
graph.isDirty('button.chain.ts') → true
    ↓
findAffectedNodes(graph, changedRuleIds) → 47 rules (4.2% of stylesheet)
    ↓
For each affected rule:
  cache.getByHash(compoundKey) → miss (source changed)
    ↓
pipeline.execute(filteredIR) → compile only 47 rules
    ↓
cache.setByHash(compoundKey, result) → store for next time
    ↓
timeline snapshot recorded → 48 total snapshots`}</code></pre>

      <div className={note}>
        <strong>💡 Pro tip:</strong> Run <code className={inlineCode}>chaincss cache stats</code> after a long
        development session to see your cache hit rate. Above 90% means your incremental
        compilation is working well. Below 50% might indicate your file structure is
        causing cache misses (e.g., generated content in source files).
        See <a href="/docs/pipeline" style={{ color: '#818cf8' }}>5-Stage Pipeline</a> for
        how the compiler uses cached state to skip unnecessary work.
      </div>
    </>
  );
}
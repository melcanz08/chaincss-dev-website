import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Caching() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Cache System</h1>
      <p className={contentDesc}>
        Two-tier compilation cache — in-memory for active sessions, content-addressed
        persistent storage for cross-session recovery. Atomic writes, multi-worker safe,
        and automatic eviction keep builds fast without unbounded disk usage.
      </p>

      <h2 className={sectionHeading}>Architecture: Two Independent Layers</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}></th>
            <th className={docTh}>L1: CacheManager</th>
            <th className={docTh}>L2: PersistentCache</th>
          </tr></thead>
          <tbody>{[
            ['Storage', 'Single JSON file (.chaincss-cache)', 'File-per-entry directory (.chaincss/persistent-cache/)'],
            ['Key type', 'Arbitrary string (styleId:contentHash)', 'SHA-256 content hash'],
            ['Lifetime', 'Active dev session', 'Cross-build, cross-session'],
            ['Invalidation', 'TTL + size-based LRU eviction', 'Content change + max age (30 days)'],
            ['Concurrency', 'Single process', 'Multi-worker safe via atomic writes'],
            ['Lookup speed', 'O(1) object access', 'Memory LRU (100 entries) → disk file read'],
            ['Max size', '100 MB', '500 MB'],
            ['Write strategy', 'Auto-save every 5 seconds', 'Atomic write (temp file + rename)'],
          ].map(([aspect, l1, l2], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{aspect}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{l1}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{l2}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>How Caching Works</h2>

      <pre className={codeBlock}><code className="language-text">{`File change detected
    ↓
1. Content-addressable key generated:
   SHA-256(source + dependency hashes)
    ↓
2. L1 check (in-memory, sub-millisecond):
   cache.get(key) → hit? return cached result
    ↓ (miss)
3. L2 check (persistent disk, ~1ms):
   persistentCache.getByHash(key) → hit? return + promote to L1
    ↓ (miss)
4. Full pipeline execution:
   pipeline.execute(ir) → compile
    ↓
5. Store result:
   L1: cache.set(key, result)
   L2: persistentCache.setByHash(key, result)
    ↓
6. Next compilation with same source:
   Step 2 returns instantly — zero compilation time`}</code></pre>

      <h2 className={sectionHeading}>Compound Cache Keys</h2>
      <p className={paragraph}>
        The cache key isn't just a hash of the source file — it includes{' '}
        <strong>all transitive dependency hashes</strong>. If an imported token changes,
        the cache key changes, and the file is recompiled:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Cache key = SHA-256(source + dependencyHashes)
const depHashes = graph.getDependencies(nodeId)
  .map(id => graph.getNodeHash(id))
  .join(',')

const compoundKey = hash(source + '::' + depHashes)

// If button.chain.ts imports $colors.primary.500:
//   source changed? → new hash → recompile
//   $colors.primary.500 changed? → dep hash changed → new compound key → recompile
//   neither changed? → same compound key → cache hit`}</code></pre>

      <h2 className={sectionHeading}>Atomic Writes</h2>
      <p className={paragraph}>
        Both cache layers use atomic write strategies to prevent corruption
        if the process crashes mid-write:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// L1: CacheManager
const tmp = cachePath + '.tmp'
fs.writeFileSync(tmp, data, 'utf8')   // Write to temp file
fs.renameSync(tmp, cachePath)          // Atomic rename

// L2: PersistentCache
const tmpPath = cachePath + '.' + Date.now() + '.' + Math.random().toString(16).slice(2) + '.tmp'
await fs.promises.writeFile(tmpPath, data, 'utf8')
await fs.promises.rename(tmpPath, cachePath)  // Atomic rename`}</code></pre>

      <p className={paragraph}>
        The L2 cache uses unique temp filenames with timestamps and random suffixes.
        This prevents two parallel workers from colliding on the same temp file —
        critical for build tools like Vite that use worker threads.
      </p>

      <h2 className={sectionHeading}>Multi-Worker Safety</h2>
      <p className={paragraph}>
        The metadata file uses a read-merge-write pattern to prevent state clobbering
        when multiple workers write cache entries simultaneously:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Instead of: write(metadata)  ← overwrites other workers' writes
// The cache does:
const diskMeta = JSON.parse(await fs.readFile(metadataPath, 'utf8'))
this.metadata.entries = { ...diskMeta.entries, ...this.metadata.entries }
//                            ↑ preserve other workers' entries
await fs.writeFile(tmpPath, JSON.stringify(this.metadata))
await fs.rename(tmpPath, metadataPath)`}</code></pre>

      <h2 className={sectionHeading}>Eviction Strategies</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Layer</th>
            <th className={docTh}>Strategy</th>
            <th className={docTh}>Trigger</th>
            <th className={docTh}>Behavior</th>
          </tr></thead>
          <tbody>{[
            ['L1', 'TTL-based', 'Entry age > maxAge (7 days)', 'Entry deleted on next get()'],
            ['L1', 'Size-based LRU', 'Total size > maxSize (100 MB)', 'Evict 30% of oldest entries'],
            ['L2', 'TTL-based', 'Entry age > maxAge (30 days)', 'Entry skipped, file deleted'],
            ['L2', 'Size-based FIFO', 'Total size > maxSize (500 MB)', 'Evict oldest entries until under limit'],
            ['L2', 'Memory LRU', 'In-memory entries > 100', 'Evict least recently used from memory (disk copy preserved)'],
          ].map(([layer, strategy, trigger, behavior], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{layer}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{strategy}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{trigger}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{behavior}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>CLI Commands</h2>

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

# Clear everything (requires --force)
chaincss cache clear --force

# Delete a specific entry (requires --force)
chaincss cache delete --key <hash> --force

# Backup cache to a directory
chaincss cache backup --output ./cache-backup`}</code></pre>

      <h2 className={sectionHeading}>Cache Statistics Output</h2>

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

      <h2 className={sectionHeading}>Cold-Start Recovery</h2>
      <p className={paragraph}>
        When the dev server restarts, the persistent compiler state is restored from
        the L2 cache. Files that haven't changed since the last session skip compilation
        entirely:
      </p>

      <pre className={codeBlock}><code className="language-text">{`# First start — full compilation
$ chaincss dev
[ChainCSS] Pre-compiling 47 file(s)...
✅ Compiled 47 file(s) in 1,247ms
🚀 Dev Server: http://localhost:3000

# Second start — cold-start recovery
$ chaincss dev
[ChainCSS] Restored compiler state from cache.
📦 Restored state (1247 compiles, 845 live rules)
[ChainCSS] No files changed — skipping compilation
🚀 Dev Server: http://localhost:3000`}</code></pre>

      <div className={note}>
        <strong>💡 Pro tip:</strong> Run <code className={inlineCode}>chaincss cache stats</code> after a long
        development session. A hit rate above 90% means your incremental compilation
        is working well. Below 50% might indicate generated content in source files
        causing cache misses. Run <code className={inlineCode}>chaincss cache validate</code> periodically
        to check for corrupted entries — it uses a concurrency limit of 50 to prevent
        EMFILE errors on large caches.
      </div>
    </>
  );
}
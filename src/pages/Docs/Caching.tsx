import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function Caching() {
  return (
    <>
      <h1 className={contentTitle}>Compiler Cache</h1>
      <p className={contentDesc}>
        ChainCSS caches compiled styles for instant rebuilds. In-memory LRU cache + persistent file cache.
      </p>

      <h2 className={sectionHeading}>How It Works</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2.5, color: '#cbd5e1', fontSize: 15 }}>
        <li><strong>SHA256 Hashing</strong> — Deterministic cache keys from style content</li>
        <li><strong>In-Memory LRU</strong> — 500-entry cache with automatic eviction</li>
        <li><strong>Persistent Cache</strong> — File-based (.chaincss-cache) survives restarts</li>
        <li><strong>Cross-Session</strong> — Warm cache on second dev server start</li>
        <li><strong>Auto-Save</strong> — Writes to disk after each compilation</li>
        <li><strong>Max Age</strong> — 7-day default TTL for cache entries</li>
        <li><strong>Max Size</strong> — 100MB default cache limit</li>
      </ul>

      <h2 className={sectionHeading}>All Cache Commands</h2>
      <pre className={codeBlock}>{`npx chaincss cache stats        # Show cache statistics (entries, size, hit rate)
npx chaincss cache list         # List all cache entries with keys and timestamps
npx chaincss cache clear        # Clear all cache data immediately
npx chaincss cache prune        # Remove expired entries (older than max-age)
npx chaincss cache validate     # Validate cache integrity (check for corruption)
npx chaincss cache backup       # Backup cache to a file (--output <path>)
npx chaincss cache inspect --key <key>  # Inspect a specific cache entry
npx chaincss cache delete --key <key>   # Delete a specific cache entry`}</pre>

      <h2 className={sectionHeading}>Command Options</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8' }}>Option</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8' }}>Applies To</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['--key <key>', 'inspect, delete', 'Cache key to inspect or delete'],
              ['--force', 'clear, prune, delete', 'Skip confirmation prompts'],
              ['--max-age <days>', 'prune', 'Max age for cache entries (default: 7)'],
              ['--max-size <MB>', 'prune', 'Max cache size in MB (default: 100)'],
              ['--output <path>', 'backup', 'Output file path for backup'],
              ['--verbose', 'all', 'Verbose output with details'],
            ].map(([opt, applies, desc]) => (
              <tr key={opt} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px 12px' }}><code className={inlineCode}>{opt}</code></td>
                <td style={{ padding: '8px 12px' }}>{applies}</td>
                <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Cache Configuration</h2>
      <pre className={codeBlock}>{`// chaincss.config.js
export default {
  cacheEnabled: true,           // Enable/disable caching
  cachePath: '.chaincss-cache', // Cache directory
  persistentCachePath: '.chaincss-cache', // Persistent cache path
  cacheMaxAgeDays: 7,           // Max age for cache entries
  cacheMaxSizeMB: 100,          // Max cache size
}`}</pre>

      <div className={note}>
        <strong>💡 Tip:</strong> Cache is automatically managed during compilation. Use CLI commands for manual inspection or cleanup when debugging.
      </div>
    </>
  );
}

// ChainCSS Configuration
// Generated: 2026-03-29T21:43:24.372Z

module.exports = {
  atomic: {
    enabled: true,          // Enable atomic CSS optimization
    threshold: 3,            // Minimum usage count for atomic conversion
    naming: 'hash',          // 'hash' (c_3b82f6) or 'readable' (bg-blue-500)
    cache: true,             // Cache atomic classes between builds
    cachePath: './.chaincss-cache',
    minify: true,            // Minify CSS output
    mode: 'hybrid',          // 'atomic' | 'standard' | 'hybrid'
    alwaysAtomic: [],        // Force these properties to be atomic
    neverAtomic: [           // Never make these properties atomic
      'content', 'animation', 'transition', 'keyframes',
      'counterIncrement', 'counterReset'
    ],
    outputStrategy: 'component-first',
    frameworkOutput: {
      react: false,          // Generate React hooks
      vue: false,            // Generate Vue composables
      vanilla: true          // Generate vanilla JS class map
    },
    preserveSelectors: false, // Keep original selector names in comments
    verbose: true            // Show detailed atomic optimization stats
  },
  prefixer: {
    enabled: true,
    mode: 'auto',            // 'auto' | 'always' | 'never'
    browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
    sourceMap: true,
    sourceMapInline: false
  }
};

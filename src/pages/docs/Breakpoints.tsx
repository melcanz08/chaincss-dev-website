import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Breakpoints() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Breakpoints</h1>
      <p className={contentDesc}>
        26 built-in breakpoints covering device sizes, orientations, color schemes,
        motion preferences, pointer types, and print. Custom breakpoints merge with defaults.
        Used automatically by the responsive analyzer to flag mobile-first issues.
      </p>

      <h2 className={sectionHeading}>Built-in Breakpoints</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Category</th>
            <th className={docTh}>Breakpoints</th>
            <th className={docTh}>Example Query</th>
          </tr></thead>
          <tbody>{[
            ['Device Sizes', 'sm, md, lg, xl, 2xl', '(min-width: 640px), (min-width: 768px), (min-width: 1024px), (min-width: 1280px), (min-width: 1536px)'],
            ['Device Categories', 'mobile, tablet, desktop', '(max-width: 767px), (min-width: 768px) and (max-width: 1023px), (min-width: 1024px)'],
            ['Mobile Sub-sizes', 'mobile-sm, mobile-md', '(max-width: 375px), (min-width: 376px) and (max-width: 767px)'],
            ['Tablet Sub-sizes', 'tablet-sm, tablet-lg', '(min-width: 768px) and (max-width: 834px), (min-width: 835px) and (max-width: 1024px)'],
            ['Desktop Sub-sizes', 'desktop-sm, desktop-md, desktop-lg', '(min-width: 1025px) and (max-width: 1280px), (min-width: 1281px) and (max-width: 1440px), (min-width: 1441px)'],
            ['Orientation', 'portrait, landscape', '(orientation: portrait), (orientation: landscape)'],
            ['Color Scheme', 'dark, light', '(prefers-color-scheme: dark), (prefers-color-scheme: light)'],
            ['Accessibility', 'reducedMotion, highContrast', '(prefers-reduced-motion: reduce), (prefers-contrast: high)'],
            ['Media Type', 'print', 'print'],
            ['Interaction', 'hover, no-hover', '(hover: hover), (hover: none)'],
            ['Pointer', 'fine, coarse', '(pointer: fine), (pointer: coarse)'],
          ].map(([cat, bps, query], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{cat}</strong></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{bps}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{query}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Using Breakpoints</h2>

      <pre className={codeBlock}><code className="language-ts">{`// In media queries
chain()
  .box({ padding: 16 })
  .media('(min-width: 768px)', (c) => c
    .box({ padding: 24 })
  )
  .$el('responsive-container')

// Using the responsive() helper
import { responsive } from 'chaincss'

const styles = responsive({
  base: { fontSize: '14px', padding: '12px' },
  md: { fontSize: '16px', padding: '16px' },
  lg: { fontSize: '18px', padding: '24px' },
})`}</code></pre>

      <h2 className={sectionHeading}>Custom Breakpoints</h2>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
export default defineConfig({
  breakpoints: {
    '3xl': '1920px',                      // Add new
    'mobile': '(max-width: 639px)',       // Override default
    'tablet': '(min-width: 640px) and (max-width: 1023px)',
  }
})

// Or use the API directly
import { setBreakpoints, addBreakpoint, removeBreakpoint } from 'chaincss'

setBreakpoints({
  wide: '1440px',
  ultra: '2560px',
})

addBreakpoint('sidebar', '(min-width: 1024px)')
removeBreakpoint('mobile-sm')`}</code></pre>

      <h2 className={sectionHeading}>Programmatic Breakpoint API</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { 
  getAllBreakpoints, getBreakpoint, hasBreakpoint,
  getBreakpointValue, getBreakpointRange, getBreakpointForWidth,
  getSortedBreakpoints, createMediaQuery, generateResponsiveCSS
} from 'chaincss'

// Get a breakpoint query
getBreakpoint('md')  // → '(min-width: 768px)'

// Get the numeric value
getBreakpointValue('md')  // → 768

// Get min/max range
getBreakpointRange('md')  // → { min: 768, max: Infinity }

// Find which breakpoint matches a viewport width
getBreakpointForWidth(900)  // → 'md'

// Create custom media query
createMediaQuery(640, 1024)  // → '(min-width: 640px) and (max-width: 1024px)'

// Generate responsive CSS
generateResponsiveCSS('.hero', {
  base: { padding: '24px', fontSize: '16px' },
  md: { padding: '48px', fontSize: '20px' },
  lg: { padding: '64px', fontSize: '24px' },
})`}</code></pre>

      <h2 className={sectionHeading}>Responsive Style Helpers</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { responsive, mergeResponsiveStyles } from 'chaincss'

// Wrap any value in breakpoint-aware structure
const padding = responsive('16px')         // → { base: '16px' }
const responsivePadding = responsive({     // → { base: '12px', md: '16px', lg: '24px' }
  base: '12px',
  md: '16px', 
  lg: '24px'
})

// Merge multiple responsive styles
const merged = mergeResponsiveStyles(
  { base: { padding: '12px' }, md: { padding: '16px' } },
  { base: { fontSize: '14px' }, lg: { fontSize: '18px' } }
)
// → { base: { padding: '12px', fontSize: '14px' }, md: { padding: '16px' }, lg: { fontSize: '18px' } }`}</code></pre>

      <div className={note}>
        <strong>💡 Used by the responsive analyzer:</strong> The breakpoints system feeds into
        the responsive analyzer pass, which flags fixed widths that overflow viewports, too many
        grid columns without mobile fallbacks, and large typography/padding values that need
        responsive scaling. Custom breakpoints are automatically picked up by the analyzer.
      </div>
    </>
  );
}
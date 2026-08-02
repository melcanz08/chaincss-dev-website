import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function MathEngine() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Math Engine</h1>
      <p className={contentDesc}>
        A complete CSS unit arithmetic engine. Add, subtract, multiply, and divide
        values across all CSS units. Static resolution when units are compatible,
        automatic <code className={inlineCode}>calc()</code> fallback when they're not.
        Fluid typography, unit conversion, clamping, and precision control.
      </p>

      <h2 className={sectionHeading}>Four Arithmetic Operations</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { math } from 'chaincss'

// Addition — same units resolve statically
math.add('16px', '8px')           // → 24px (static)
math.add('1rem', '2rem')          // → 3rem (static)

// Subtraction
math.subtract('100%', '32px')     // → calc(100% - 32px) (dynamic — incompatible units)
math.subtract('50px', '10px')     // → 40px (static)

// Multiplication — scalar
math.multiply('8px', 2)           // → 16px (static)
math.multiply('1.5rem', 3)        // → 4.5rem (static)

// Division — scalar
math.divide('100px', 2)           // → 50px (static)
math.divide('3rem', 1.5)          // → 2rem (static)`}</code></pre>

      <h2 className={sectionHeading}>Static vs Dynamic Resolution</h2>
      <p className={paragraph}>
        When both operands share compatible units, the math engine resolves the value
        at build time. When units are incompatible (e.g., percentage + pixels), it falls
        back to generating a <code className={inlineCode}>calc()</code> expression:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Same unit → static resolution
math.add('16px', '8px')           // → 24px (emitted as 24px in CSS)

// Cross-unit but same category → converted to common base, then resolved
math.add('1rem', '16px')          // → 32px (1rem = 16px at default root font size)

// Incompatible units → dynamic calc() fallback
math.add('100%', '32px')          // → calc(100% + 32px)

// Viewport units with different bases → calc()
math.add('50vw', '50vh')          // → calc(50vw + 50vh)`}</code></pre>

      <h2 className={sectionHeading}>Sum Folding</h2>
      <p className={paragraph}>
        Add multiple values at once — static values are aggregated, dynamic parts
        are combined into a single <code className={inlineCode}>calc()</code> expression:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Mix of static and dynamic
math.sum('16px', '1rem', '2vw', 'calc(100% - 20px)')
// → calc(32px + 2vw + 100% - 20px)

// All static → fully resolved
math.sum('16px', '8px', '24px')
// → 48px

// All same relative unit → aggregated
math.sum('1rem', '2rem', '0.5rem')
// → 3.5rem`}</code></pre>

      <h2 className={sectionHeading}>Unit Categories</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Category</th>
            <th className={docTh}>Units</th>
            <th className={docTh}>Convertible</th>
          </tr></thead>
          <tbody>{[
            ['Absolute', 'px, in, cm, mm, pt, pc', 'Yes (to common px base)'],
            ['Relative', 'rem, em, ch, ex', 'Yes (context-aware: rootFontSize, parentFontSize)'],
            ['Viewport', 'vw, vh, vmin, vmax', 'Yes (context-aware: viewportWidth, viewportHeight)'],
            ['Angle', 'deg, rad, turn, grad', 'Yes (to common deg base)'],
            ['Time', 's, ms', 'Yes (to common ms base)'],
            ['Resolution', 'dpi, dpcm, dppx', 'Yes'],
          ].map(([cat, units, convertible], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{cat}</strong></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{units}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{convertible}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Unit Conversion</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { math } from 'chaincss'

// Convert between absolute units
math.convert('1in', 'px')     // → 96px
math.convert('2.54cm', 'in')  // → 1in

// Convert relative to absolute
math.convert('1rem', 'px')    // → 16px (at default 16px root)
math.convert('1em', 'px', { parentFontSize: 20 })  // → 20px

// Convert absolute to viewport
math.convert('960px', 'vw', { viewportWidth: 1920 })  // → 50vw

// Convert angle units
math.convert('180deg', 'rad') // → 3.1416rad
math.convert('1turn', 'deg')  // → 360deg

// Convert time units
math.convert('1s', 'ms')      // → 1000ms
math.convert('500ms', 's')    // → 0.5s

// Quick conversion helpers
math.toPx('1.5rem')           // → 24 (number)
math.toRem('32px')            // → '2rem'
math.toEm('24px', { parentFontSize: 16 })  // → '1.5em'`}</code></pre>

      <h2 className={sectionHeading}>Fluid Typography</h2>
      <p className={paragraph}>
        Generate responsive <code className={inlineCode}>clamp()</code> expressions that scale
        smoothly between minimum and maximum sizes:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`import { math } from 'chaincss'

// Default viewport range: 320px – 1280px
math.fluidType({ minSize: 16, maxSize: 24 })
// → clamp(16px, 12.8px + 1vw, 24px)

// Custom viewport range
math.fluidType({ 
  minSize: 14, 
  maxSize: 32, 
  minWidth: 375,    // iPhone SE
  maxWidth: 1440    // MacBook Pro
})
// → clamp(14px, 8.9px + 1.36vw, 32px)

// In rem units
math.fluidType({ 
  minSize: 16, 
  maxSize: 24, 
  unit: 'rem',
  rootFontSize: 16 
})
// → clamp(1rem, 0.8rem + 0.5vw, 1.5rem)`}</code></pre>

      <h2 className={sectionHeading}>Scale, Clamp, Min, Max</h2>

      <pre className={codeBlock}><code className="language-ts">{`// Scale a value by a factor
math.scale('16px', 1.5)           // → 24px
math.scale('2rem', 0.5)           // → 1rem

// Static clamp — resolves if all values are compatible
math.clampValue('16px', '12px', '24px')  // → 16px (clamped statically)

// Dynamic clamp — falls back to CSS clamp()
math.clampValue('50%', '200px', '800px') // → clamp(200px, 50%, 800px)

// CSS min() and max() helpers
math.cssMin('100%', '1200px')     // → min(100%, 1200px)
math.cssMax('50vw', '320px')      // → max(50vw, 320px)

// Precision control
math.precision(1.23456, 2)        // → '1.23'
math.precision(1.23456, 3)        // → '1.235'`}</code></pre>

      <h2 className={sectionHeading}>Compatibility Checking</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { math } from 'chaincss'

// Check if two values can be statically resolved
math.compatible('16px', '24px')     // → true (both absolute)
math.compatible('1rem', '16px')     // → true (relative ↔ absolute — convertible)
math.compatible('50%', '100px')     // → false (percentage + absolute)
math.compatible('2s', '500ms')      // → true (both time)

// Check unit category
math.unitCategory('px')             // → 'absolute'
math.unitCategory('rem')            // → 'relative'
math.unitCategory('vw')             // → 'viewport'
math.unitCategory('deg')            // → 'angle'`}</code></pre>

      <h2 className={sectionHeading}>Helper Functions</h2>
      <p className={paragraph}>
        The helpers module wraps the math engine with convenience functions used by macros:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`import { px, rem, em, percent, vw, vh } from 'chaincss'

// Suffix adders — convert numbers to CSS values
px(16)      // → '16px'
rem(1.5)    // → '1.5rem'
em(0.75)    // → '0.75em'
percent(50) // → '50%'
vw(100)     // → '100vw'
vh(50)      // → '50vh'

// Dynamic viewport units
import { dvw, dvh, svw, svh, lvw, lvh } from 'chaincss'
dvh(100)    // → '100dvh'
svh(100)    // → '100svh'

// Rounding helpers
import { round, ceil, floor } from 'chaincss'
round('16.567px', 2)  // → '16.57px'
ceil('16.1px')        // → '17px'
floor('16.9px')       // → '16px'`}</code></pre>

      <h2 className={sectionHeading}>Configuration Context</h2>
      <p className={paragraph}>
        All relative and viewport conversions accept a context object for
        accurate resolution in different environments:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Default context (used when no context is passed)
const DEFAULT_CONTEXT = {
  rootFontSize: 16,        // 1rem = 16px
  viewportWidth: 1920,     // 100vw = 1920px
  viewportHeight: 1080,    // 100vh = 1080px
  parentFontSize: 16,      // 1em = 16px
  dpi: 96,                 // Standard screen DPI
}

// Override per operation
math.toPx('1.5rem', { rootFontSize: 14 })        // → 21px
math.convert('50vw', 'px', { viewportWidth: 375 }) // → 187.5px (iPhone SE)
math.fluidType({ minSize: 16, maxSize: 24 }, { rootFontSize: 14 })`}</code></pre>

      <div className={note}>
        <strong>💡 Used throughout the compiler:</strong> The math engine powers the unit
        normalizer (adding px to numbers), the responsive analyzer (converting values for
        comparison), the fluidType macro, and every helper function used by the 142 macros.
        See <a href="/docs/compiler/constraints" style={{ color: '#818cf8' }}>Constraint Resolver</a> for
        how constraints use the math engine to generate aspect-ratio values.
      </div>
    </>
  );
}
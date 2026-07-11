import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode } from '../../styles/docs.chain.ts';

export default function MathEngine() {
  return (
    <>
      <h1 className={contentTitle}>Math Engine</h1>
      <p className={contentDesc}>Perform arithmetic on CSS values and generate fluid typography at build time.</p>
      <h2 className={sectionHeading}>Arithmetic</h2>
      <pre className={codeBlock}>{`import { math } from 'chaincss'
chain()
  .fs(math.add('16px', '0.5rem'))      // → 24px
  .width(math.subtract('100%', '32px')) // → calc(100% - 32px)
  .padding(math.multiply('8px', 2))     // → 16px`}</pre>
      <h2 className={sectionHeading}>Fluid Typography</h2>
      <pre className={codeBlock}>{`chain()
  .fs(math.fluidType({ minSize: 16, maxSize: 24 }))
  // → clamp(16px, 1rem + 0.5vw, 24px)`}</pre>
      <h2 className={sectionHeading}>Unit Conversion</h2>
      <pre className={codeBlock}>{`math.convert('16px', 'rem')  // → 1rem (at 16px root)
math.convert('1rem', 'px')  // → 16px`}</pre>
    </>
  );
}

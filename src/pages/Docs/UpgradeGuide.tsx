import CodeBlock from '../../components/CodeBlock';

export default function UpgradeGuide() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Upgrade Guide</h1>
        <p className="docs-description">
          Migrate from other CSS-in-JS libraries
        </p>
      </div>

      <h2>From Styled Components</h2>
      <CodeBlock 
        language="javascript"
        code={`// Before (Styled Components)
const Button = styled.button\`
  background: blue;
  color: white;
  &:hover {
    background: darkblue;
  }
\`;

// After (ChainCSS)
const button = $()
  .backgroundColor('blue')
  .color('white')
  .hover()
    .backgroundColor('darkblue')
    .end()
  .block();`}
      />

      <h2>From Emotion</h2>
      <CodeBlock 
        language="javascript"
        code={`// Before (Emotion)
const button = css\`
  background: blue;
  color: white;
  &:hover {
    background: darkblue;
  }
\`;

// After (ChainCSS)
const button = $()
  .backgroundColor('blue')
  .color('white')
  .hover()
    .backgroundColor('darkblue')
    .end()
  .block();`}
      />

      <h2>From Tailwind</h2>
      <CodeBlock 
        language="jsx"
        code={`// Before (Tailwind)
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">

// After (ChainCSS)
const button = $()
  .backgroundColor('blue')
  .color('white')
  .padding('1rem 2rem')
  .borderRadius('4px')
  .hover()
    .backgroundColor('darkblue')
    .end()
  .block();

<button className={button}>`}
      />

      <div className="tip">
        <strong>Migration Tip:</strong> Start with runtime mode, then enable build mode for production!
      </div>
    </>
  );
}
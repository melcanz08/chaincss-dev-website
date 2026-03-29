import CodeBlock from '../CodeBlock';

export default function ParadigmSection() {
  return (
    <section className="paradigm-section">
      <div className="container">
        <h2 className="section-title">The New Paradigm</h2>
        <p className="section-subtitle">
          What was impossible with CSS becomes natural with ChainCSS. It makes styling programmable.
        </p>
        <div className="paradigm-grid">
          {/* 1. True Dynamic Theming */}
          <div className="paradigm-card">
            <h3>True Dynamic Theming</h3>
            <p className="card-comparison">
              <span className="before">Before:</span> Multiple CSS files, manual switching
            </p>
            <CodeBlock language="javascript" code={`const theme = getSystemTheme();
const styles = $()
  .backgroundColor(theme === 'dark' ? '#0f172a' : '#ffffff')
  .color(theme === 'dark' ? '#f1f5f9' : '#1e293b')
  .block('.app');`} />
            <p className="card-result">
              Now: One style, runtime variables, automatic adaptation
            </p>
          </div>
          
          {/* 2. Programmatic Design Systems */}
          <div className="paradigm-card">
            <h3>Programmatic Design Systems</h3>
            <p className="card-comparison">
              <span className="before">Before:</span> Static JSON tokens
            </p>
            <CodeBlock language="javascript" code={`const generateSpacing = (base = 4) => ({
  xs: base + 'px',
  sm: (base * 2) + 'px',
  md: (base * 4) + 'px',
  lg: (base * 6) + 'px',
  xl: (base * 8) + 'px'
});`} />
            <p className="card-result">
              Now: Computed tokens, dynamic scales, mathematical precision
            </p>
          </div>
          
          {/* 3. Conditional Component Libraries */}
          <div className="paradigm-card">
            <h3>Conditional Component Libraries</h3>
            <p className="card-comparison">
              <span className="before">Before:</span> Fixed components, limited adaptation
            </p>
            <CodeBlock language="jsx" code={`<Button 
  variant="primary" 
  size={isMobile ? 'small' : 'large'}
  theme={userPreference}
/>`} />
            <p className="card-result">
              Now: Components that adapt to ANY context, runtime, or device
            </p>
          </div>
          
          {/* 4. Build-Time Intelligence */}
          <div className="paradigm-card">
            <h3>Build-Time Intelligence</h3>
            <p className="card-comparison">
              <span className="before">Before:</span> Manual optimization, duplicate CSS
            </p>
            <CodeBlock language="bash" code={`# ChainCSS learns from your codebase
npx chaincss styles.jcss dist/ --atomic
# Properties used 3+ times → atomic utilities
# 75%+ CSS size reduction automatically`} />
            <p className="card-result">
              Now: Automatic atomic CSS, smarter builds, smaller bundles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState, useRef, useEffect } from 'react';
import CodeBlock from '../../components/CodeBlock';
import { $, run, compile } from 'chaincss/runtime';

export default function YourFirstStyle() {
  const [code, setCode] = useState(`const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .fontSize('16px')
  .fontWeight('600')
  .border('none')
  .cursor('pointer')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .transition('all 0.2s')
  .$el('.btn');`); 
  
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [error, setError] = useState('');
  const [liveStyles, setLiveStyles] = useState<React.CSSProperties>({
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });
  const [hoverStyles, setHoverStyles] = useState<React.CSSProperties>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const chaincssLoadedRef = useRef(false);

  // Helper to generate CSS from style object (runtime)
  const generateCSSFromStyle = (styleObj: any): string => {
    if (!styleObj) return '';
    
    let css = '';
    const className = 'btn';
    
    // Normal styles
    let normalStyles = '';
    for (const [key, value] of Object.entries(styleObj)) {
      if (key === 'selectors' || key === 'hover') continue;
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      normalStyles += `  ${kebabKey}: ${value};\n`;
    }
    
    if (normalStyles) {
      css += `.${className} {\n${normalStyles}}\n`;
    }
    
    // Hover styles
    if (styleObj.hover && typeof styleObj.hover === 'object') {
      let hoverStylesContent = '';
      for (const [key, value] of Object.entries(styleObj.hover)) {
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        hoverStylesContent += `  ${kebabKey}: ${value};\n`;
      }
      if (hoverStylesContent) {
        css += `.${className}:hover {\n${hoverStylesContent}}\n`;
      }
    }
    
    return css;
  };

  // Parse CSS string to React styles
  const parseCSSToStyles = (css: string) => {
    const styles: React.CSSProperties = {};
    const hoverStylesObj: React.CSSProperties = {};
    
    const styleMatch = css.match(/\.btn\s*{([^}]*)}/);
    if (styleMatch) {
      const properties = styleMatch[1].split(';');
      properties.forEach(prop => {
        const [key, value] = prop.split(':').map(s => s.trim());
        if (key && value) {
          const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          styles[camelKey as any] = value;
        }
      });
    }
    
    const hoverMatch = css.match(/\.btn:hover\s*{([^}]*)}/);
    if (hoverMatch) {
      const properties = hoverMatch[1].split(';');
      properties.forEach(prop => {
        const [key, value] = prop.split(':').map(s => s.trim());
        if (key && value) {
          const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          hoverStylesObj[camelKey as any] = value;
        }
      });
    }
    
    return { styles, hoverStyles: hoverStylesObj };
  };

  // Execute user code and get style object
  const executeCode = (codeToRun: string): any => {
    // Create a sandbox function that returns the style object
    const sandbox: any = {};
    
    const fn = new Function('$', 'sandbox', `
      try {
        ${codeToRun}
        if (typeof button !== 'undefined') sandbox.button = button;
      } catch(e) {
        sandbox.error = e.message;
      }
    `);
    
    fn($, sandbox);
    
    if (sandbox.error) {
      throw new Error(sandbox.error);
    }
    
    return sandbox.button;
  };

  // Load ChainCSS into iframe (runtime only)
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const initializeChainCSS = async () => {
      try {
        await new Promise<void>((resolve) => {
          if (iframe.contentWindow) {
            resolve();
          } else {
            iframe.addEventListener('load', () => resolve(), { once: true });
          }
        });

        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) return;
        
        // Only expose runtime functions, not compiler
        iframeWindow.$ = $;
        iframeWindow.run = run;
        iframeWindow.compile = compile;
        
        chaincssLoadedRef.current = true;
        
        // Run initial code
        runCode();
      } catch (err) {
        console.error('Failed to load ChainCSS:', err);
        setError('Failed to load ChainCSS runtime. Please refresh the page.');
      }
    };

    initializeChainCSS();
  }, []);

  const runCode = () => {
    if (!chaincssLoadedRef.current) return;

    try {
      // Execute code and get style object
      let codeToRun = code.trim();
      
      // Ensure the code defines a 'button' variable
      if (!codeToRun.includes('const button') && !codeToRun.includes('let button') && !codeToRun.includes('var button')) {
        codeToRun = `const button = ${codeToRun}`;
      }
      
      const styleObj = executeCode(codeToRun);
      
      if (!styleObj) {
        setError('No style defined. Make sure you create a variable named "button" with $.$el(\'.btn\')');
        setGeneratedCSS('');
        return;
      }
      
      // Generate CSS from the style object
      const css = generateCSSFromStyle(styleObj);
      
      console.log('Generated CSS:', css);
      setGeneratedCSS(css);
      
      if (css) {
        const { styles, hoverStyles: parsedHoverStyles } = parseCSSToStyles(css);
        setLiveStyles(prev => ({ ...prev, ...styles }));
        setHoverStyles(parsedHoverStyles);
        setError('');
      } else {
        setError('No CSS generated. Make sure you use .$el(\'.btn\') to define the selector.');
      }
    } catch (err: any) {
      console.error('Execution error:', err);
      setError(err.message);
      setGeneratedCSS('');
    }
  };

  // Auto-run on code change (debounced)
  useEffect(() => {
    if (!chaincssLoadedRef.current) return;
    
    const timer = setTimeout(() => {
      if (code.trim()) {
        runCode();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <>
      <iframe
        ref={iframeRef}
        src="about:blank"
        sandbox="allow-same-origin allow-scripts"
        style={{ display: 'none' }}
        title="ChainCSS Sandbox"
      />

      <div className="docs-header">
        <h1 className="docs-title">Your First Style</h1>
        <p className="docs-description">
          Create your first ChainCSS style and see it in action. In less than 5 minutes, 
          you'll have a beautiful button styled with JavaScript.
        </p>
      </div>
      
      {/* Step 1: Create the file */}
      <h2>Step 1: Create your first .chain.js file</h2>
      <p>
        Create a new file called <code className="inline-code">button.chain.js</code> in your project:
      </p>
      <CodeBlock language="bash" code={`mkdir -p src/components/Button/styles
touch src/components/Button/styles/button.chain.js`} />
      
      {/* Step 2: Write your first style */}
      <h2>Step 2: Write your first style</h2>
      <p>
        Open <code className="inline-code">button.chain.js</code> and add the following code:
      </p>
      <CodeBlock language="javascript" code={`import { $ } from 'chaincss';

export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .cursor('pointer')
  .hover()
    .bg('#2563eb')
  .end()
  .$el('.btn');`} />
      
      <div className="tip">
        <strong>What's happening?</strong><br />
        • <code className="inline-code">$</code> starts a new style chain<br />
        • <code className="inline-code">.bg()</code> sets the background color<br />
        • <code className="inline-code">.$el('.btn')</code> assigns the style to a CSS class<br />
        • The style will be compiled at build time
      </div>
      
      {/* Step 3: Run the CLI */}
      <h2>Step 3: Generate CSS</h2>
      <p>Run ChainCSS to compile your styles:</p>
      <CodeBlock language="bash" code={`npx chaincss build`} />

      <div className="tip">
        <strong>You should see output like:</strong><br />
        • ✓ Generated <code className="inline-code">src/components/Button/styles/button.class.js</code><br />
        • ✓ Generated <code className="inline-code">src/components/Button/styles/button.css</code><br />
        • ✓ Generated <code className="inline-code">global.css (minified)</code> <br />
      </div>
      
      {/* Step 4: Use in React */}
      <h2>Step 4: Use your style in React</h2>
      <p>
        Import the generated class name and CSS in your component:
      </p>
      <CodeBlock language="tsx" code={`import { button } from './styles/button.class.js';
function MyButton() {
  return <button className={button}>Click Me!</button>;
}`} />
      
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginTop: '12px' }}>
         <strong>Live Preview:</strong> The button below updates automatically as you type!
      </div>
      
      {/* Step 5: Live Preview Button */}
      <h2>Step 5: See your styled button!</h2>
      <p>
        Try editing the code below and watch the button change instantly:
      </p>
      
      {/* LIVE PREVIEW BUTTON - Updates as you type */}
      <div style={{ 
        padding: '32px', 
        backgroundColor: '#f8fafc', 
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <button 
          style={liveStyles}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, hoverStyles);
          }}
          onMouseLeave={(e) => {
            const resetStyles: React.CSSProperties = {};
            Object.keys(liveStyles).forEach(key => {
              resetStyles[key as any] = liveStyles[key as any];
            });
            Object.assign(e.currentTarget.style, resetStyles);
          }}
        >
          Click Me!
        </button>
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#64748b' }}>
          The button updates instantly as you edit the code below!
        </p>
      </div>
      
      {/* Interactive Editor */}
      <h2>Try it yourself</h2>
      <p>Edit the code below and watch the button above change instantly:</p>
      
      <div style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px', 
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{ 
          backgroundColor: '#f1f5f9', 
          padding: '8px 12px', 
          borderBottom: '1px solid #e2e8f0',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#475569'
        }}>
          Edit ChainCSS Code (auto-updates)
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: '100%',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            border: 'none',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            resize: 'vertical',
            minHeight: '250px',
            outline: 'none'
          }}
        />
      </div>
      
      {/* Generated CSS Output */}
      {generatedCSS && !error && (
        <div className="tip" style={{ backgroundColor: '#ecfdf5', borderLeftColor: '#10b981' }}>
          <strong>Generated CSS (auto-updated):</strong>
          <CodeBlock language="css" code={generatedCSS} />
        </div>
      )}
      
      {error && (
        <div className="tip" style={{ backgroundColor: '#fee2e2', borderLeftColor: '#ef4444' }}>
          <strong>Error:</strong>
          <pre style={{ marginTop: '8px', color: '#991b1b', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {error}
          </pre>
        </div>
      )}
      
      {/* Tips for experimentation */}
      <div className="note" style={{ marginTop: '24px' }}>
        <strong>Try experimenting:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Change <code className="inline-code">.backgroundColor('#3b82f6')</code> to <code className="inline-code">.backgroundColor('#ef4444')</code> → Button turns red instantly!</li>
          <li>Modify <code className="inline-code">.padding('12px 24px')</code> to <code className="inline-code">.padding('20px 40px')</code> → Button gets bigger!</li>
          <li>Add <code className="inline-code">.boxShadow('0 4px 6px rgba(0,0,0,0.1)')</code> → Button gets a shadow!</li>
          <li>Change hover color to <code className="inline-code">.backgroundColor('#dc2626')</code> → Hover becomes darker red!</li>
          <li>Change the selector: <code className="inline-code">.$el('.btn')</code> → to <code className="inline-code">.$el('.my-button')</code></li>
        </ul>
      </div>
      
      {/* What's next */}
      <div className="note" style={{ backgroundColor: '#eff6ff', borderLeftColor: '#3b82f6' }}>
        <strong>What's next?</strong>
        <p>
          Now that you've created your first style, learn about the{' '}
          <a href="/docs/chainable-api" style={{ color: '#667eea' }}>Chainable API</a> 
          to understand how to chain multiple properties, or explore{' '}
          <a href="/docs/responsive" style={{ color: '#667eea' }}>Responsive Design</a> 
          to make your styles mobile-friendly.
        </p>
      </div>
    </>
  );
}
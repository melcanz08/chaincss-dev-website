import { useState, useRef, useEffect } from 'react';
import CodeBlock from '../../components/CodeBlock';
import { $, run, compile,chain } from 'chaincss';

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
  .block('.btn');`);
  
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

  // Load ChainCSS into iframe
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

        
        iframeWindow.$ = $;
        iframeWindow.run = run;
        iframeWindow.compile = compile;
        iframeWindow.chain = chain;
        
        iframeWindow.chain.cssOutput = '';
        
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

  const runCode = () => {
    if (!chaincssLoadedRef.current) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const iframeWindow = iframe.contentWindow;
      if (!iframeWindow || !iframeWindow.chain) return;

      iframeWindow.chain.cssOutput = '';

      let codeToRun = code.trim();
      if (!codeToRun.includes('run(') && !codeToRun.includes('compile(')) {
        codeToRun = `${codeToRun}\nrun(button);`;
      }

      iframeWindow.eval(codeToRun);
      
      const css = iframeWindow.chain.cssOutput || '';

      console.log('Generated CSS:', css);
      setGeneratedCSS(css);
      
      if (css) {
        const { styles, hoverStyles: parsedHoverStyles } = parseCSSToStyles(css);
        setLiveStyles(prev => ({ ...prev, ...styles }));
        setHoverStyles(parsedHoverStyles);
      }
      
      if (!css) {
        setError('No CSS generated. Make sure you have run() or compile() in your code.');
      } else {
        setError('');
      }
    } catch (err) {
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
    }, 300); // Even faster response: 300ms
    
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
      <h2>Step 1: Create your first .jcss file</h2>
      <p>
        Create a new file called <code className="inline-code">styles.jcss</code> in your project:
      </p>
      <CodeBlock language="bash" code={`mkdir styles
touch styles/styles.jcss`} />
      
      {/* Step 2: Write your first style */}
      <h2>Step 2: Write your first style</h2>
      <p>
        Open <code className="inline-code">styles.jcss</code> and add the following code:
      </p>
      <CodeBlock language="javascript" code={`<@
const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .block('.btn');

run(button);
@>`} />
      
      <div className="tip">
        <strong>What's happening?</strong><br />
        • <code className="inline-code">$()</code> starts a new style chain<br />
        • <code className="inline-code">.backgroundColor()</code> sets the background color<br />
        • <code className="inline-code">.block('.btn')</code> assigns the style to a CSS class<br />
        • <code className="inline-code">run(button)</code> generates the CSS
      </div>
      
      {/* Step 3: Run the CLI */}
      <h2>Step 3: Generate CSS</h2>
      <p>Run ChainCSS to compile your styles:</p>
      <CodeBlock language="bash" code={`npx chaincss styles/styles.jcss dist/`} />
      <p>You should see output like:</p>
      <CodeBlock language="bash" code={`CSS generated: dist/global.css
 Source map: dist/global.css.map`} />
      
      {/* Step 4: Use in HTML */}
      <h2>Step 4: Use your style in HTML</h2>
      <p>
        Create an <code className="inline-code">index.html</code> file and link your CSS:
      </p>
      <CodeBlock language="html" code={`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/global.css">
</head>
<body>
  <button class="btn">Click Me!</button>
</body>
</html>`} />
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginTop: '12px' }}>
         <strong>Live Preview:</strong> The button below updates automatically as you type!
      </div>
      
      {/* Step 5: Live Preview Button */}
      <h2>Step 5: See your styled button!</h2>
      <p>
        Open <code className="inline-code">index.html</code> in your browser. Or try it live below:
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
      
      {/* Interactive Editor - No Run Button Needed */}
      <h2> Try it yourself</h2>
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
          <strong> Generated CSS (auto-updated):</strong>
          <CodeBlock language="css" code={generatedCSS} />
        </div>
      )}
      
      {error && (
        <div className="tip" style={{ backgroundColor: '#fee2e2', borderLeftColor: '#ef4444' }}>
          <strong> Error:</strong>
          <pre style={{ marginTop: '8px', color: '#991b1b', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {error}
          </pre>
        </div>
      )}
      
      {/* Tips for experimentation */}
      <div className="note" style={{ marginTop: '24px' }}>
        <strong> Try experimenting:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Change <code className="inline-code">.backgroundColor('#3b82f6')</code> to <code className="inline-code">.backgroundColor('#ef4444')</code> → Button turns red instantly!</li>
          <li>Modify <code className="inline-code">.padding('12px 24px')</code> to <code className="inline-code">.padding('20px 40px')</code> → Button gets bigger!</li>
          <li>Add <code className="inline-code">.boxShadow('0 4px 6px rgba(0,0,0,0.1)')</code> → Button gets a shadow!</li>
          <li>Change hover color to <code className="inline-code">.backgroundColor('#dc2626')</code> → Hover becomes darker red!</li>
        </ul>
      </div>
      
      {/* What's next */}
      <div className="note" style={{ backgroundColor: '#eff6ff', borderLeftColor: '#3b82f6' }}>
        <strong> What's next?</strong>
        <p>
          Now that you've created your first style, learn about the{' '}
          <a href="/docs/chainable-api" style={{ color: '#667eea' }}>Chainable API</a> 
          to understand how to chain multiple properties, or explore{' '}
          <a href="/docs/selectors" style={{ color: '#667eea' }}>Selectors</a> 
          to style multiple elements at once.
        </p>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/installation" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Installation
        </a>
        <a href="/docs/chainable-api" style={{ color: '#667eea', textDecoration: 'none' }}>
          Chainable API →
        </a>
      </div>*/}
    </>
  );
}
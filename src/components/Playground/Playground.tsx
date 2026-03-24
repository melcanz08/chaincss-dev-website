import { useState, useEffect, useRef } from 'react';
import { $ } from 'chaincss';
import { useChainStyles } from 'chaincss/react';
import { Copy, Check, AlertCircle } from 'lucide-react';

const templates = {
  button: `const buttonStyle = $()
  .backgroundColor('#667eea')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .fontSize('16px')
  .fontWeight('600')
  .border('none')
  .cursor('pointer')
  .hover()
    .backgroundColor('#5a67d8')
    .transform('scale(1.05)')
  .end()
  .transition('all 0.2s ease')
  .block();`,

  card: `const cardStyle = $()
  .backgroundColor('white')
  .borderRadius('12px')
  .padding('24px')
  .boxShadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .hover()
    .boxShadow('0 20px 25px -5px rgba(0,0,0,0.15)')
    .transform('translateY(-4px)')
  .end()
  .transition('all 0.3s ease')
  .block();`,

  gradient: `const headingStyle = $()
  .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  .backgroundClip('text')
  .color('transparent')
  .fontSize('2rem')
  .fontWeight('800')
  .block();`,
};

const Playground = () => {
  const [code, setCode] = useState(templates.button);
  const [activeTemplate, setActiveTemplate] = useState('button');
  const [copied, setCopied] = useState(false);
  const [cssOutput, setCssOutput] = useState('');
  const [error, setError] = useState('');
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const uiStyles = useChainStyles(() => ({
    copyBtn: $()
      .backgroundColor('transparent')
      .border('none')
      .color('#9ca3af')
      .cursor('pointer')
      .padding('0.25rem 0.5rem')
      .borderRadius('0.25rem')
      .display('flex')
      .alignItems('center')
      .gap('0.25rem')
      .hover()
        .color('#ffffff')
        .backgroundColor('rgba(255,255,255,0.1)')
      .end()
      .block(),
  }), []);

  const loadTemplate = (template: string) => {
    setActiveTemplate(template);
    if (template === 'button') setCode(templates.button);
    if (template === 'card') setCode(templates.card);
    if (template === 'gradient') setCode(templates.gradient);
    setError('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Evaluation logic - generate CSS from ChainCSS code
  useEffect(() => {
    try {
      const sandbox: any = {
        $: $,
        buttonStyle: null,
        cardStyle: null,
        headingStyle: null,
      };
      
      const fn = new Function('$', 'sandbox', `
        try {
          ${code}
          if (typeof buttonStyle !== 'undefined') sandbox.buttonStyle = buttonStyle;
          if (typeof cardStyle !== 'undefined') sandbox.cardStyle = cardStyle;
          if (typeof headingStyle !== 'undefined') sandbox.headingStyle = headingStyle;
        } catch(e) {
          sandbox.error = e.message;
        }
      `);
      
      fn($, sandbox);
      
      if (sandbox.error) {
        setError(sandbox.error);
        setCssOutput('');
        return;
      }
      
      let styleObj = null;
      if (activeTemplate === 'button') styleObj = sandbox.buttonStyle;
      if (activeTemplate === 'card') styleObj = sandbox.cardStyle;
      if (activeTemplate === 'gradient') styleObj = sandbox.headingStyle;
      
      if (!styleObj) {
        setError('No style defined. Make sure to assign to buttonStyle, cardStyle, or headingStyle');
        setCssOutput('');
        return;
      }
      
      // Generate CSS from the style object
      let generatedCSS = '';
      const className = activeTemplate === 'button' ? 'chaincss-button' : 
                        activeTemplate === 'card' ? 'chaincss-card' : 'chaincss-gradient';
      
      // Generate base styles
      generatedCSS = `.${className} {\n`;
      for (let prop in styleObj) {
        if (prop !== 'selectors' && prop !== 'hover') {
          const kebabProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
          generatedCSS += `  ${kebabProp}: ${styleObj[prop]};\n`;
        }
      }
      generatedCSS += `}\n`;
      
      // Generate hover styles
      if (styleObj.hover && typeof styleObj.hover === 'object') {
        generatedCSS += `.${className}:hover {\n`;
        for (let prop in styleObj.hover) {
          const kebabProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
          generatedCSS += `  ${kebabProp}: ${styleObj.hover[prop]};\n`;
        }
        generatedCSS += `}\n`;
      }
      
      setCssOutput(generatedCSS);
      setError('');
      
      // Remove old style element
      if (styleRef.current) {
        styleRef.current.remove();
      }
      
      // Add new style element
      const styleElement = document.createElement('style');
      styleElement.textContent = generatedCSS;
      styleElement.setAttribute('data-playground', className);
      document.head.appendChild(styleElement);
      styleRef.current = styleElement;
      
    } catch (err: any) {
      setError(err.message);
      setCssOutput('');
    }
    
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
      }
    };
  }, [code, activeTemplate]);

  return (
    <div id="playground" className="playground-container">
      <div className="playground-header">
        <h1 className="playground-title">Interactive Playground</h1>
        <p className="playground-description">Write ChainCSS code and see the results in real-time</p>
      </div>

      <div className="template-buttons">
        <button 
          className={`template-btn ${activeTemplate === 'button' ? 'template-btn-active' : ''}`}
          onClick={() => loadTemplate('button')}
        >
          Button
        </button>
        <button 
          className={`template-btn ${activeTemplate === 'card' ? 'template-btn-active' : ''}`}
          onClick={() => loadTemplate('card')}
        >
          Card
        </button>
        <button 
          className={`template-btn ${activeTemplate === 'gradient' ? 'template-btn-active' : ''}`}
          onClick={() => loadTemplate('gradient')}
        >
          Gradient Text
        </button>
      </div>

      <div className="playground-grid">
        <div className="editor-section">
          <div className="section-header">
            <span>📝 ChainCSS Code</span>
            <button className={uiStyles.copyBtn} onClick={copyCode}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="preview-section">
          <div className="section-header">
            <span>🎨 Live Preview</span>
          </div>
          <div className="preview-area">
            {error ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '2rem', 
                color: '#dc2626', 
                textAlign: 'center' 
              }}>
                <AlertCircle size={24} />
                <p style={{ fontSize: '0.875rem' }}>{error}</p>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                minHeight: '300px'
              }}>
                {activeTemplate === 'button' && (
                  <button className="chaincss-button">
                    ChainCSS Button
                  </button>
                )}
                {activeTemplate === 'card' && (
                  <div className="chaincss-card">
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                      ChainCSS Card
                    </h3>
                    <p style={{ color: '#64748b' }}>Styled with ChainCSS</p>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '1rem' }}>
                      Hover to see animation
                    </p>
                  </div>
                )}
                {activeTemplate === 'gradient' && (
                  <h2 className="chaincss-gradient">
                    ChainCSS Gradient Text
                  </h2>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {cssOutput && !error && (
        <div className="css-output">
          <div className="section-header">
            <span>🎨 Generated CSS</span>
            <button className={uiStyles.copyBtn} onClick={copyCSS}>
              <Copy size={14} /> Copy CSS
            </button>
          </div>
          <pre className="css-content">
            <code>{cssOutput}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default Playground;
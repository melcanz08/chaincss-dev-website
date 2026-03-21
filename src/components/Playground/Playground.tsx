import { useState, useEffect, useRef } from 'react';
import { $, useChainStyles, createTokens, responsive, compile } from '@melcanz85/chaincss/react';
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
    .scale(1.05).end()
  .transition('all 0.2s ease')
  .block();`,

  card: `const cardStyle = $()
  .backgroundColor('white')
  .borderRadius('12px')
  .padding('24px')
  .boxShadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .hover()
    .boxShadow('0 20px 25px -5px rgba(0,0,0,0.15)')
    .translateY('-4px').end()
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

// Convert camelCase to kebab-case
const toKebabCase = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};

// Generate CSS from style object
const generateCSSFromStyle = (styleObj: any, className: string): string => {
  if (!styleObj || typeof styleObj !== 'object') return '';
  
  let normalStyles: string[] = [];
  let hoverStyles: string[] = [];
  
  Object.entries(styleObj).forEach(([key, value]) => {
    if (key === 'selectors') return;
    
    // Check if this is a hover property (from .hover() method)
    if (key === 'hover' && typeof value === 'object') {
      Object.entries(value).forEach(([hoverKey, hoverValue]) => {
        if (hoverKey !== 'selectors') {
          const cssProp = toKebabCase(hoverKey);
          hoverStyles.push(`  ${cssProp}: ${hoverValue};`);
        }
      });
    } 
    // Regular styles
    else if (key !== 'hover') {
      const cssProp = toKebabCase(key);
      normalStyles.push(`  ${cssProp}: ${value};`);
    }
  });
  
  let css = '';
  if (normalStyles.length > 0) {
    css += `.${className} {\n${normalStyles.join('\n')}\n}\n`;
  }
  if (hoverStyles.length > 0) {
    css += `.${className}:hover {\n${hoverStyles.join('\n')}\n}\n`;
  }
  
  return css;
};

// Evaluate ChainCSS code using the actual compile function
const evaluateChainCSS = (code: string, styleName: string): any => {
  try {
    // Create a temporary object to store compiled styles
    const tempStyles: any = {};
    
    // Create a sandbox with ChainCSS functions that capture to tempStyles
    const sandbox = {
      $: $,
      tokens: createTokens({
        colors: {
          primary: '#667eea',
          primaryDark: '#5a67d8',
          accent: '#764ba2',
        },
        spacing: {
          sm: '0.5rem',
          md: '1rem',
          lg: '2rem',
        },
      }),
      createTokens,
      responsive,
    };
    
    // Execute the code to get the style object
    const fn = new Function('$', 'tokens', 'createTokens', 'responsive', `
      ${code}
      return ${styleName};
    `);
    
    const result = fn(sandbox.$, sandbox.tokens, sandbox.createTokens, sandbox.responsive);
    
    // The result should already have the hover property from .block()
    // Let's inspect what we got
    console.log('Raw result from .block():', result);
    
    return result;
  } catch (error) {
    console.error('Evaluation error:', error);
    return null;
  }
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
      .block(),
  }));

  useEffect(() => {
    if (styleRef.current) {
      styleRef.current.remove();
    }
    
    const styleName = activeTemplate === 'button' ? 'buttonStyle' : 
                      activeTemplate === 'card' ? 'cardStyle' : 'headingStyle';
    
    const styleObj = evaluateChainCSS(code, styleName);
    
    if (!styleObj) {
      setError('Failed to parse ChainCSS code. Check your syntax.');
      setCssOutput('');
      return;
    }
    
    console.log('Final style object:', styleObj);
    console.log('Has hover?', styleObj.hover ? 'YES' : 'NO');
    if (styleObj.hover) {
      console.log('Hover styles:', styleObj.hover);
    }
    
    const css = generateCSSFromStyle(styleObj, styleName);
    
    if (css) {
      setCssOutput(css);
      setError('');
      
      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      styleElement.setAttribute('data-playground', styleName);
      document.head.appendChild(styleElement);
      styleRef.current = styleElement;
      
      console.log('Generated CSS:\n', css);
    } else {
      setError('No valid styles generated.');
    }
    
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
      }
    };
  }, [code, activeTemplate]);

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

  return (
    <div className="playground-container">
      <div className="playground-header">
        <h1 className="playground-title">Interactive Playground</h1>
        <p className="playground-description">Write ChainCSS code and see the results in real-time</p>
      </div>

      <div className="template-buttons">
        <button className={`template-btn ${activeTemplate === 'button' ? 'template-btn-active' : ''}`} onClick={() => loadTemplate('button')}>
          Button
        </button>
        <button className={`template-btn ${activeTemplate === 'card' ? 'template-btn-active' : ''}`} onClick={() => loadTemplate('card')}>
          Card
        </button>
        <button className={`template-btn ${activeTemplate === 'gradient' ? 'template-btn-active' : ''}`} onClick={() => loadTemplate('gradient')}>
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem', color: '#dc2626', textAlign: 'center' }}>
                <AlertCircle size={24} />
                <p style={{ fontSize: '0.875rem' }}>{error}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {activeTemplate === 'button' && (
                  <button className="buttonStyle">ChainCSS Button</button>
                )}
                {activeTemplate === 'card' && (
                  <div className="cardStyle">
                    <h3 style={{ marginBottom: '0.5rem' }}>ChainCSS Card</h3>
                    <p style={{ color: '#64748b' }}>Styled with ChainCSS</p>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '1rem' }}>
                      Hover to see animation
                    </p>
                  </div>
                )}
                {activeTemplate === 'gradient' && (
                  <h2 className="headingStyle">ChainCSS Gradient Text</h2>
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
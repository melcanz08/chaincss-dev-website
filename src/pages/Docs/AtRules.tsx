import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function AtRules() {
  const [activeDemo, setActiveDemo] = useState('media');
  const [screenSize, setScreenSize] = useState('desktop');
  
  const demos = {
    media: {
      title: 'Media Queries',
      description: 'Create responsive designs that adapt to different screen sizes',
      code: `const responsiveCard = $()
  .backgroundColor('white')
  .borderRadius('12px')
  .padding('20px')
  .boxShadow('0 1px 3px rgba(0,0,0,0.1)')
  .width('100%')
  // Mobile first - base styles
  .media('(min-width: 640px)', (css) => {
    css.width('calc(50% - 16px)')
  })
  .media('(min-width: 1024px)', (css) => {
    css.width('calc(33.333% - 16px)')
  })
  .media('(min-width: 1280px)', (css) => {
    css.width('calc(25% - 16px)')
  })
  .block('.card');`,
      css: `.card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 100%;
}
@media (min-width: 640px) {
  .card {
    width: calc(50% - 16px);
  }
}
@media (min-width: 1024px) {
  .card {
    width: calc(33.333% - 16px);
  }
}
@media (min-width: 1280px) {
  .card {
    width: calc(25% - 16px);
  }
}`,
      preview: (size: string) => {
        const widths = { mobile: '100%', tablet: 'calc(50% - 16px)', desktop: 'calc(33.333% - 16px)', large: 'calc(25% - 16px)' };
        return {
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          width: widths[size],
          transition: 'width 0.3s'
        };
      }
    },
    keyframes: {
      title: 'Keyframes Animations',
      description: 'Create custom animations with keyframes',
      code: `// Define the animation
const slideIn = $()
  .keyframes('slideIn', (kf) => {
    kf.from({ 
      opacity: 0, 
      transform: 'translateX(-50px)' 
    });
    kf.to({ 
      opacity: 1, 
      transform: 'translateX(0)' 
    });
  })
  .block();

// Use the animation
const animatedElement = $()
  .animation('slideIn 0.5s ease-out')
  .block('.animated');`,
      css: `@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animated {
  animation: slideIn 0.5s ease-out;
}`,
      preview: () => ({
        animation: 'slideIn 0.5s ease-out',
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        display: 'inline-block'
      })
    },
    container: {
      title: 'Container Queries',
      description: 'Style elements based on their container size',
      code: `const card = $()
  .container('(min-width: 400px)', (css) => {
    css.display('flex')
      .gap('20px')
      .select('img')
        .width('150px')
        .height('150px')
        .block()
      .select('.content')
        .flex('1')
        .block();
  })
  .block('.card');`,
      css: `.card {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 20px;
  }
  .card img {
    width: 150px;
    height: 150px;
  }
  .card .content {
    flex: 1;
  }
}`,
      preview: (size: string) => ({
        display: size === 'large' ? 'flex' : 'block',
        gap: size === 'large' ? '20px' : '0',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #e2e8f0'
      })
    },
    fontFace: {
      title: 'Custom Fonts',
      description: 'Load and use custom fonts with @font-face',
      code: `const customFont = $()
  .fontFace((css) => {
    css.fontFamily('CustomFont')
      .src("url('/fonts/custom.woff2') format('woff2')")
      .fontWeight('400')
      .fontStyle('normal')
      .fontDisplay('swap');
  })
  .block();

const text = $()
  .fontFamily('CustomFont, system-ui')
  .fontSize('24px')
  .block('.custom-text');`,
      css: `@font-face {
  font-family: CustomFont;
  src: url('/fonts/custom.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
.custom-text {
  font-family: CustomFont, system-ui;
  font-size: 24px;
}`,
      preview: () => ({
        fontFamily: 'system-ui',
        fontSize: '24px',
        backgroundColor: '#f8fafc',
        padding: '20px',
        borderRadius: '8px'
      })
    },
    supports: {
      title: 'Feature Detection',
      description: 'Apply styles only when certain CSS features are supported',
      code: `const gridLayout = $()
  .supports('display: grid', (css) => {
    css.display('grid')
      .gridTemplateColumns('repeat(3, 1fr)')
      .gap('20px')
      .select('.item')
        .padding('20px')
        .backgroundColor('#f8fafc')
        .borderRadius('8px')
        .block();
  })
  .block('.grid-container');`,
      css: `@supports (display: grid) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .grid-container .item {
    padding: 20px;
    background-color: #f8fafc;
    border-radius: 8px;
  }
}`,
      preview: () => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f8fafc'
      })
    },
    layers: {
      title: 'CSS Layers',
      description: 'Control CSS cascade order with layers',
      code: `// Define layers in order of precedence
const base = $()
  .layer('base', (css) => {
    css.select('button')
      .padding('8px 16px')
      .borderRadius('4px')
      .border('none')
      .block();
  })
  .block();

const components = $()
  .layer('components', (css) => {
    css.select('.btn-primary')
      .backgroundColor('#3b82f6')
      .color('white')
      .block();
  })
  .block();`,
      css: `@layer base, components;
@layer base {
  button {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
  }
}
@layer components {
  .btn-primary {
    background-color: #3b82f6;
    color: white;
  }
}`,
      preview: () => ({
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#3b82f6',
        color: 'white'
      })
    }
  };
  
  const currentDemo = demos[activeDemo];
  
  const getPreviewStyles = () => {
    if (activeDemo === 'media') return currentDemo.preview(screenSize);
    if (activeDemo === 'keyframes') return currentDemo.preview();
    if (activeDemo === 'container') return currentDemo.preview(screenSize === 'mobile' ? 'small' : 'large');
    if (activeDemo === 'fontFace') return currentDemo.preview();
    if (activeDemo === 'supports') return currentDemo.preview();
    if (activeDemo === 'layers') return currentDemo.preview();
    return {};
  };
  
  const previewStyles = getPreviewStyles();
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">At-Rules</h1>
        <p className="docs-description">
          Powerful CSS at-rules for responsive design, animations, custom fonts, and more.
        </p>
      </div>
      
      {/* Basic Usage */}
      <h2>What are At-Rules?</h2>
      <p>
        At-rules are CSS statements that start with <code className="inline-code">@</code>. ChainCSS provides
        a fluent API for all major at-rules, making them as easy to use as regular CSS properties.
      </p><br />
      
      {/* Interactive Examples */}
      <h2>At-Rule Types</h2>
      <p>Choose an at-rule to see an example:</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveDemo('media')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'media' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'media' ? '#eef2ff' : 'white',
            color: activeDemo === 'media' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Media Queries
        </button>
        <button
          onClick={() => setActiveDemo('keyframes')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'keyframes' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'keyframes' ? '#eef2ff' : 'white',
            color: activeDemo === 'keyframes' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Keyframes
        </button>
        <button
          onClick={() => setActiveDemo('container')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'container' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'container' ? '#eef2ff' : 'white',
            color: activeDemo === 'container' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Container Queries
        </button>
        <button
          onClick={() => setActiveDemo('fontFace')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'fontFace' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'fontFace' ? '#eef2ff' : 'white',
            color: activeDemo === 'fontFace' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Font Face
        </button>
        <button
          onClick={() => setActiveDemo('supports')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'supports' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'supports' ? '#eef2ff' : 'white',
            color: activeDemo === 'supports' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Feature Detection
        </button>
        <button
          onClick={() => setActiveDemo('layers')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'layers' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'layers' ? '#eef2ff' : 'white',
            color: activeDemo === 'layers' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          CSS Layers
        </button>
      </div>
      
      <CodeBlock language="javascript" code={currentDemo.code} />
      
      <div className="tip">
        <strong>Generated CSS:</strong>
        <CodeBlock language="css" code={currentDemo.css} />
      </div>
      
      {/* Live Preview */}
      <div style={{ 
        marginTop: '24px',
        padding: '24px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Live Preview
        </h3>
        
        {activeDemo === 'media' && (
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setScreenSize('mobile')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: screenSize === 'mobile' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}
              >
                Mobile (100%)
              </button>
              <button
                onClick={() => setScreenSize('tablet')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: screenSize === 'tablet' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}
              >
                Tablet (50%)
              </button>
              <button
                onClick={() => setScreenSize('desktop')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: screenSize === 'desktop' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}
              >
                Desktop (33%)
              </button>
              <button
                onClick={() => setScreenSize('large')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: screenSize === 'large' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}
              >
                Large (25%)
              </button>
            </div>
            <div style={previewStyles}>
              <p>Responsive Card</p>
              <small>Width adjusts based on screen size</small>
            </div>
          </div>
        )}
        
        {activeDemo === 'keyframes' && (
          <div style={{ textAlign: 'center' }}>
            <div 
              style={previewStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.animation = 'none';
                setTimeout(() => {
                  e.currentTarget.style.animation = 'slideIn 0.5s ease-out';
                }, 10);
              }}
            >
              Hover to replay animation →
            </div>
          </div>
        )}
        
        {activeDemo === 'container' && (
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setScreenSize('mobile')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: screenSize === 'mobile' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}
              >
                Small Container
              </button>
              <button
                onClick={() => setScreenSize('large')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: screenSize === 'large' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}
              >
                Large Container
              </button>
            </div>
            <div style={{ ...previewStyles, width: screenSize === 'mobile' ? '250px' : '500px' }}>
              <img src="https://via.placeholder.com/150" alt="Placeholder" style={{ width: '100%', maxWidth: '150px', borderRadius: '8px' }} />
              <div className="content">
                <h4>Container Query Demo</h4>
                <p>Layout changes when container is larger than 400px</p>
              </div>
            </div>
          </div>
        )}
        
        {activeDemo === 'fontFace' && (
          <div style={previewStyles}>
            <p>This text uses a custom font (simulated)</p>
            <p style={{ fontFamily: 'monospace' }}>Custom fonts are loaded via @font-face</p>
          </div>
        )}
        
        {activeDemo === 'supports' && (
          <div style={{ ...previewStyles, display: 'grid' }}>
            <div className="item">Grid Item 1</div>
            <div className="item">Grid Item 2</div>
            <div className="item">Grid Item 3</div>
          </div>
        )}
        
        {activeDemo === 'layers' && (
          <div>
            <button style={previewStyles}>
              Layered Button
            </button>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
              CSS layers control the cascade order
            </p>
          </div>
        )}
      </div>
      
      {/* At-Rules Reference */}
      <h2>At-Rules Reference</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.media()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Responsive design based on viewport size
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.keyframes()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Define custom animations
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.container()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Style based on container size
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.fontFace()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Load custom web fonts
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.supports()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Feature detection
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.layer()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Control CSS cascade order
          </p>
        </div>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/nested-selectors" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Nested Selectors
        </a>
        <a href="/docs/design-tokens" style={{ color: '#667eea', textDecoration: 'none' }}>
          Design Tokens →
        </a>
      </div>*/}
    </>
  );
}
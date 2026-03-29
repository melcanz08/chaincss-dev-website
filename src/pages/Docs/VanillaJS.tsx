import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function VanillaJS() {
  const [activeExample, setActiveExample] = useState('basic');
  
  // State for basic example
  const [hovered, setHovered] = useState(false);
  
  // State for dynamic example
  const [theme, setTheme] = useState('light');
  
  // State for classmap example
  const [variant, setVariant] = useState('primary');
  
  // Class map for classmap example
  const classMap = {
    '.btn-primary': 'c_3b82f6 c_ffffff c_1224 c_8px',
    '.btn-secondary': 'c_6b7280 c_ffffff c_1224 c_8px',
    '.btn-danger': 'c_ef4444 c_ffffff c_1224 c_8px'
  };
  
  const getClass = (selector: string) => classMap[selector as keyof typeof classMap] || '';
  const btnClass = getClass(`.btn-${variant}`);
  
  const examples = {
    basic: {
      title: 'Basic Usage',
      description: 'Use ChainCSS directly in vanilla JavaScript',
      code: `// styles.jcss
<@
const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .transition('all 0.2s')
  .block('.btn');

run(button);
@>

// Run the CLI
// npx chaincss styles.jcss dist/

// index.html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/global.css">
</head>
<body>
  <button class="btn">Click Me</button>
</body>
</html>`,
      preview: () => (
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              backgroundColor: hovered ? '#2563eb' : '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Click Me
          </button>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
            Styled with ChainCSS in vanilla JS
          </p>
        </div>
      )
    },
    dynamic: {
      title: 'Dynamic Styles',
      description: 'Create dynamic styles with JavaScript logic',
      code: `// dynamic-styles.js
import { $, run } from 'chaincss';

// Get theme from localStorage or system preference
const getTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const theme = getTheme();

// Create dynamic styles based on theme
const appStyles = $()
  .backgroundColor(theme === 'dark' ? '#0f172a' : '#ffffff')
  .color(theme === 'dark' ? '#f1f5f9' : '#1e293b')
  .minHeight('100vh')
  .block('.app');

run(appStyles);

// Theme switcher
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  window.location.reload();
});`,
      preview: () => (
        <div style={{
          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
          color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          transition: 'all 0.3s',
          textAlign: 'center'
        }}>
          <h3>Dynamic Theme</h3>
          <p>Theme is: <strong>{theme}</strong></p>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '8px 16px',
              backgroundColor: theme === 'dark' ? '#3b82f6' : '#e2e8f0',
              color: theme === 'dark' ? 'white' : '#1e293b',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      )
    },
    classmap: {
      title: 'Using Class Maps',
      description: 'Access generated atomic classes programmatically',
      code: `// After running with --atomic flag
// npx chaincss styles.jcss dist/ --atomic

// global.classes.js is generated
import { classMap, getClass, applyClasses } from './dist/global.classes.js';

// Get classes for a selector
const btnClasses = classMap['.btn'];
// "c_3b82f6 c_ffffff c_1224 c_8px"

// Apply classes to an element
const button = document.querySelector('.btn');
button.className = btnClasses;

// Using helper function
applyClasses(button, '.btn');

// Dynamic class application
const createButton = (variant) => {
  const btn = document.createElement('button');
  const classes = classMap[\`.btn-\${variant}\`] || classMap['.btn'];
  btn.className = classes;
  btn.textContent = variant;
  return btn;
};`,
      preview: () => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button onClick={() => setVariant('primary')} style={{ padding: '4px 12px', cursor: 'pointer' }}>Primary</button>
            <button onClick={() => setVariant('secondary')} style={{ padding: '4px 12px', cursor: 'pointer' }}>Secondary</button>
            <button onClick={() => setVariant('danger')} style={{ padding: '4px 12px', cursor: 'pointer' }}>Danger</button>
          </div>
          <button
            style={{
              backgroundColor: variant === 'primary' ? '#3b82f6' : variant === 'secondary' ? '#6b7280' : '#ef4444',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {variant} Button
          </button>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
            Class: <code className="inline-code">{btnClass}</code>
          </p>
        </div>
      )
    },
    build: {
      title: 'Build Setup',
      description: 'Set up a vanilla JS project with ChainCSS',
      code: `// package.json
{
  "scripts": {
    "build:css": "chaincss src/styles/main.jcss dist/ --atomic",
    "build": "npm run build:css && cp src/index.html dist/",
    "dev": "npm run build:css -- --watch & live-server dist/"
  },
  "devDependencies": {
    "chaincss": "^2.0.0",
    "live-server": "^1.2.0"
  }
}

// Project structure
my-project/
├── src/
│   ├── styles/
│   │   └── main.jcss
│   └── index.html
├── dist/
│   ├── global.css
│   └── index.html
├── package.json
└── chaincss.config.cjs

// Run development
npm run dev

// Build for production
npm run build`,
      preview: () => (
        <div style={{
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
          padding: '16px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          <pre style={{ margin: 0 }}>
{`$ npm run dev

> chaincss src/styles/main.jcss dist/ --atomic --watch
CSS generated: dist/global.css
Class map: dist/global.map.json

> live-server dist/
Serving dist/ at http://localhost:8080

✓ Ready for development!`}
          </pre>
        </div>
      )
    }
  };
  
  const currentExample = examples[activeExample as keyof typeof examples];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Vanilla JavaScript</h1>
        <p className="docs-description">
          Use ChainCSS with plain JavaScript. No frameworks required.
        </p>
      </div>
      
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install chaincss --save-dev`} />
      
      <h2>Basic Workflow</h2>
      <div className="tip" style={{ marginBottom: '24px' }}>
        <ol style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Create a <code className="inline-code">.jcss</code> file with your styles</li>
          <li>Run the ChainCSS CLI to generate CSS</li>
          <li>Link the generated CSS in your HTML</li>
          <li>Use the generated class names in your HTML/JS</li>
        </ol>
      </div>
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('basic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'basic' ? '#eef2ff' : 'white',
            color: activeExample === 'basic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Basic Usage
        </button>
        <button
          onClick={() => setActiveExample('dynamic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'dynamic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'dynamic' ? '#eef2ff' : 'white',
            color: activeExample === 'dynamic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Dynamic Styles
        </button>
        <button
          onClick={() => setActiveExample('classmap')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'classmap' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'classmap' ? '#eef2ff' : 'white',
            color: activeExample === 'classmap' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Class Maps
        </button>
        <button
          onClick={() => setActiveExample('build')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'build' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'build' ? '#eef2ff' : 'white',
            color: activeExample === 'build' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Build Setup
        </button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="javascript" code={currentExample.code} />
        
        <div className="tip" style={{ marginTop: '16px' }}>
          <strong>🎬 Live Preview:</strong>
          <div style={{ marginTop: '12px' }}>
            {currentExample.preview()}
          </div>
        </div>
      </div>
      
      <h2>Runtime API (Browser)</h2>
      <p>You can also use ChainCSS directly in the browser without build step:</p>
      <CodeBlock language="html" code={`<!DOCTYPE html>
<html>
<head>
  <script type="importmap">
    {
      "imports": {
        "chaincss": "https://unpkg.com/chaincss@latest/browser/index.js"
      }
    }
  </script>
</head>
<body>
  <button id="btn">Click Me</button>
  
  <script type="module">
    import { $, run } from 'chaincss';
    
    const button = $()
      .backgroundColor('#3b82f6')
      .color('white')
      .padding('12px 24px')
      .borderRadius('8px')
      .hover()
        .backgroundColor('#2563eb')
        .end()
      .transition('all 0.2s')
      .block('.btn');
    
    run(button);
    
    // Styles are injected automatically
    document.getElementById('btn').className = 'btn';
  </script>
</body>
</html>`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use build-time compilation for production to minimize runtime overhead</li>
          <li>Enable atomic CSS with <code className="inline-code">--atomic</code> for smaller bundles</li>
          <li>Use class maps for dynamic class generation</li>
          <li>Store generated CSS in <code className="inline-code">dist/</code> and serve statically</li>
          <li>Use watch mode during development for automatic rebuilds</li>
        </ul>
      </div>
      
      {/*
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/css-variables" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← CSS Variables
        </a>
        <a href="/docs/react" style={{ color: '#667eea', textDecoration: 'none' }}>
          React →
        </a>
      </div>*/}
    </>
  );
}
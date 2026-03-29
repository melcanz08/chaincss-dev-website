import { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark.css';

// Import languages
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

// Simple bash highlighter for terminal commands
function highlightBashCommand(code: string): string {
  // Split into parts: command, arguments, flags
  const parts = code.split(/\s+/);
  return parts.map(part => {
    if (part.startsWith('--') || part.startsWith('-')) {
      return `<span style="color: #9cdcfe">${part}</span>`;
    }
    if (part === 'npx' || part === 'npm' || part === 'yarn' || part === 'pnpm') {
      return `<span style="color: #569cd6">${part}</span>`;
    }
    if (part.includes('.') || part.includes('/')) {
      return `<span style="color: #ce9178">${part}</span>`;
    }
    return `<span style="color: #d4d4d4">${part}</span>`;
  }).join(' ');
}

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
}

export default function CodeBlock({ code, language = 'javascript', showCopy = true }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      let lang = language;
      if (lang === 'shell' || lang === 'sh') lang = 'bash';
      if (lang === 'html') lang = 'xml';
      
      if (lang === 'bash') {
        // Use our custom highlighter for bash commands
        codeRef.current.innerHTML = highlightBashCommand(code);
        codeRef.current.classList.add('hljs');
      } else {
        codeRef.current.textContent = code;
        delete codeRef.current.dataset.highlighted;
        hljs.highlightElement(codeRef.current);
      }
    }
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block" style={{ position: 'relative' }}>
      {showCopy && (
        <button
          onClick={copyToClipboard}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#334155',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px',
            zIndex: 10
          }}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      )}
      <pre>
        <code ref={codeRef} className={`language-${language}`} />
      </pre>
    </div>
  );
}
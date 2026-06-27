// src/components/Playground/Playground.tsx
import { useState, useCallback } from 'react';
import { chain } from 'chaincss';
import { useChainStyles } from 'chaincss/runtime';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { CodeInput } from '@srsholmes/react-code-input';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';
import CodeBlock from '../CodeBlock';

hljs.registerLanguage('javascript', javascript);

import {
  container,
  header,
  title,
  description,
  templateButtons,
  templateBtn,
  activeTemplateBtn,
  playgroundGrid,
  editorSection,
  sectionHeader,
  codeInputDark,
  previewSection,
  previewArea,
  cssOutputSection,
  chaincssButton,
  chaincssCard,
  chaincssGradient,
  copyBtn,
} from './styles/playground.class.js';

// ============================================================================
// Mixed Mode Demo Component (inline, since it needs hooks)
// ============================================================================
const MixedModeDemo = () => {
  const [isActive, setIsActive] = useState(false);

  const dynamicStyles = useChainStyles(() => ({
    btn: (chain as any).dynamic()
      .opacity(() => isActive ? 1 : 0.5)
      .shadow(() => isActive
        ? '0 8px 25px rgba(99,102,241,0.6)'
        : '0 2px 8px rgba(0,0,0,0.3)')
      .scale(() => isActive ? 1.05 : 1)
      .transition('all 0.3s ease')
      .$el('mixed-state')
  }), [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <button
        className={`${chaincssButton} ${dynamicStyles.btn}`}  // ← combine static + dynamic classes
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Active ✓' : 'Click to Toggle'}
      </button>
      {/* ... rest unchanged ... */}
    </div>
  );
};

// ============================================================================
// Template definitions
// ============================================================================
const templates = {
  button: {
    label: 'Button',
    source: `chain()
  .bg('#667eea').c('white').pressable()
  .py('12px').px('24px').rounded(8)
  .textSize(16).weight('600')
  .transition('all 0.2s ease')
  .hover().bg('#5a67d8').scale(1.05).end()
  .$el('.chaincss-button')`,
    css: `.chaincss-button {
  background-color: #667eea;
  color: white;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 8px;
  border-style: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.chaincss-button:hover {
  background-color: #5a67d8;
  transform: scale(1.05);
}`,
    className: chaincssButton,
    preview: <button className={chaincssButton}>ChainCSS Button</button>,
  },
  card: {
    label: 'Card',
    source: `chain()
  .bg('white').rounded(12).p(24).cursor('pointer')
  .shadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .transition('all 0.3s ease')
  .hover()
    .shadow('0 20px 25px -5px rgba(0,0,0,0.15)')
    .transform('translateY(-4px)')
  .end()
  .$el('.chaincss-card')`,
    css: `.chaincss-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.chaincss-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
  transform: translateY(-4px);
}`,
    className: chaincssCard,
    preview: (
      <div className={chaincssCard}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>ChainCSS Card</h3>
        <p style={{ color: '#64748b' }}>Hover to see animation</p>
      </div>
    ),
  },
  gradient: {
    label: 'Gradient Text',
    source: `chain()
  .bg('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  .bgClip('text').c('transparent')
  .textSize('2rem').weight('800')
  .$el('.chaincss-gradient')`,
    css: `.chaincss-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
  font-weight: 800;
}`,
    className: chaincssGradient,
    preview: <h2 className={chaincssGradient}>ChainCSS Gradient Text</h2>,
  },
  mixed: {
    label: 'Mixed Mode',
    source: `chain.dynamic()
  .bg('#6366f1').c('white').pressable()
  .py('12px').px('24px').rounded(8)
  .textSize(16).weight('600')
  .transition('all 0.3s ease')
  .opacity(() => isActive ? 1 : 0.5)
  .shadow(() => isActive
    ? '0 8px 25px rgba(99,102,241,0.6)'
    : '0 2px 8px rgba(0,0,0,0.3)')
  .scale(() => isActive ? 1.05 : 1)
  .$el('mixed-btn')`,
    css: `.chain-mixed-btn {
  background-color: #6366f1;
  color: white;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 8px;
  border-style: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  /* opacity, box-shadow, transform → resolved at runtime */\n}`,
    className: '',
    preview: <MixedModeDemo />,
  },
};

// ============================================================================
// Playground Component
// ============================================================================
const Playground = () => {
  const [activeTemplate, setActiveTemplate] = useState('button');
  const [copied, setCopied] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  const current = templates[activeTemplate as keyof typeof templates];

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(current.source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [current.source]);

  const copyCSS = useCallback(() => {
    navigator.clipboard.writeText(current.css);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  }, [current.css]);

  return (
    <div id="playground" className={container}>
      <div className={header}>
        <h1 className={title}>Interactive Playground</h1>
        <p className={description}>
          Explore ChainCSS's chainable API — static styles compile to zero-runtime CSS, dynamic values resolve at runtime
        </p>
      </div>

      <div className={templateButtons}>
        {Object.entries(templates).map(([key, tmpl]) => (
          <button
            key={key}
            className={`${templateBtn} ${activeTemplate === key ? activeTemplateBtn : ''}`}
            onClick={() => setActiveTemplate(key)}
          >
            {tmpl.label}
          </button>
        ))}
      </div>

      <div className={playgroundGrid}>
        {/* Editor */}
        <div className={editorSection}>
          <div className={sectionHeader}>
            <span>ChainCSS Code</span>
            <button className={copyBtn} onClick={copyCode}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className={codeInputDark}>
            <CodeInput
              value={current.source}
              language="javascript"
              highlightjs={hljs}
              autoHeight={true}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className={previewSection}>
          <div className={sectionHeader}>
            <span>Live Preview</span>
          </div>
          <div className={previewArea}>
            {current.preview}
          </div>
        </div>
      </div>

      {/* Compiled CSS */}
      <div className={cssOutputSection}>
        <div className={sectionHeader}>
          <span>Compiled CSS (build-time output)</span>
          <button className={copyBtn} onClick={copyCSS}>
            {copiedCSS ? <Check size={14} /> : <Copy size={14} />}
            {copiedCSS ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
        <CodeBlock code={current.css} language="css" showCopy={false} />
      </div>
    </div>
  );
};

export default Playground;
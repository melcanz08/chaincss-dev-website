import { chain } from 'chaincss';

// ============================================================================
// Layout
// ============================================================================
export const container = chain()
  .maxW('80rem').m('0 auto').p('2rem 1.5rem')
  .media('(max-width: 768px)', css => css.p('1rem'))
  .$el('.playground-container');

export const header = chain()
  .textAlign('center').mb('2rem')
  .$el('.playground-header');

export const title = chain()
  .textSize('2rem').weight('700').mb('0.5rem')
  .media('(max-width: 768px)', css => css.textSize('1.5rem'))
  .$el('.playground-title');

export const description = chain()
  .c('#64748b').textSize('1rem')
  .media('(max-width: 768px)', css => css.textSize('0.875rem'))
  .$el('.playground-description');

// ============================================================================
// Template buttons
// ============================================================================
export const templateButtons = chain()
  .flex().gap('1rem').justify('center').mb('1.5rem').flexWrap('wrap')
  .media('(max-width: 768px)', css => css.gap('0.5rem'))
  .$el('.template-buttons');

export const templateBtn = chain()
  .py('0.5rem').px('1rem').rounded('0.5rem')
  .borderStyle('none').textSize('0.875rem').weight('500')
  .cursor('pointer').transition('all 0.2s')
  .bg('#f1f5f9').c('#475569')
  .hover().bg('#e2e8f0').end()
  .media('(max-width: 768px)', css => css.py('0.4rem').px('0.8rem').textSize('0.75rem'))
  .$el('.template-btn');

export const activeTemplateBtn = chain()
  .bg('#667eea').c('white')
  .hover().bg('#5a67d8').end()
  .$el('.template-btn-active');

// ============================================================================
// Playground grid (editor + preview)
// ============================================================================
export const playgroundGrid = chain()
  .grid().gridCols('1fr 1fr').gap('1.5rem').w('100%')
  .media('(max-width: 768px)', css => css.gridCols('1fr').gap('1rem'))
  .$el('.playground-grid');

export const editorSection = chain()
  .rounded('1rem').overflow('hidden')
  .shadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .$el('.editor-section');

export const previewSection = chain()
  .bg('#f8fafc').rounded('1rem').overflow('hidden')
  .shadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .$el('.preview-section');

export const sectionHeader = chain()
  .bg('#1e1e1e').p('0.75rem 1rem').c('#9ca3af')
  .textSize('0.875rem').weight('500')
  .flex().justify('space-between').items('center')
  .borderBottom('1px solid #2d2d2d')
  .$el('.section-header');

export const codeInputDark = chain()
  .bg('#1e1e1e').c('#d4d4d4').font('monospace')
  .textSize('14px').p('16px').border('none').outline('none')
  .w('100%').minH('400px').resize('vertical')
  .$el('.code-input-dark');

export const previewArea = chain()
  .p('2rem').minH('400px')
  .flex().flexDir('column').items('center').justify('center').gap('1.5rem')
  .bg('#f8fafc')
  .media('(max-width: 768px)', css => css.p('1rem').minH('250px'))
  .$el('.preview-area');

// ============================================================================
// CSS output section
// ============================================================================
export const cssOutputSection = chain()
  .mt('1.5rem').bg('#1e1e1e').rounded('0.5rem').overflow('hidden')
  .$el('.css-output');

// ============================================================================
// Preview components — built with macros
// ============================================================================
export const chaincssButton = chain()
  .bg('#667eea').c('white').pressable()
  .py('12px').px('24px').rounded(8)
  .textSize(16).weight('600')
  .transition('all 0.2s ease')
  .hover().bg('#5a67d8').scale(1.05).end()
  .$el('.chaincss-button');

export const chaincssCard = chain()
  .bg('white').rounded(12).p(24)
  .shadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .transition('all 0.3s ease')
  .hover()
    .shadow('0 20px 25px -5px rgba(0,0,0,0.15)')
    .transform('translateY(-4px)')
  .end()
  .$el('.chaincss-card');

export const chaincssGradient = chain()
  .bg('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  .bgClip('text').c('transparent')
  .textSize('2rem').weight('800')
  .$el('.chaincss-gradient');

export const copyBtn = chain()
  .bg('transparent').border('none').c('#9ca3af')
  .cursor('pointer').p('0.25rem 0.5rem').rounded('0.25rem')
  .flex().items('center').gap('0.25rem')
  .hover().c('white').bg('rgba(255,255,255,0.1)').end()
  .$el('.copy-btn');
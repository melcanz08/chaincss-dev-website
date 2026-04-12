import { $ } from 'chaincss';

// ========== LAYOUT ==========
export const docsContainer = $
  .maxW('80rem')
  .m('0 auto')
  .p('2rem 1rem')
  .display('grid')
  .gridCols('1fr')
  .gap('2rem')
  .alignItems('start')
  .desktop((css) => css
    .gridCols('280px 1fr')
    .gap('3rem')
    .p('3rem 1.5rem')
  )
  .$el('.docs-container');

export const docsSidebar = $
  .display('none')
  .desktop((css) => css.display('block'))
  .pos('sticky')
  .top('5rem')
  .height('calc(100vh - 5rem)')
  .overflowY('auto')
  .pr('1rem')
  .$el('.docs-sidebar');

export const docsSidebarOpen = $
  .display('block')
  .$el('.docs-sidebar.open');

export const mobileMenuBtn = $
  .display('flex')
  .alignItems('center')
  .justifyContent('center')
  .gap('0.5rem')
  .width('auto')
  .height('40px')
  .paddingLeft('1rem')
  .paddingRight('1rem')
  .backgroundColor('#667eea')
  .color('white')
  .borderRadius('8px')
  .border('none')
  .cursor('pointer')
  .fontSize('14px')
  .fontWeight('500')
  .marginBottom('1rem')
  .desktop((css) => css.display('none'))
  .hover()
    .backgroundColor('#5a67d8')
  .end()
  .transition('all 0.2s')
  .$el('.mobile-menu-btn');

export const sidebarSection = $
  .mb('2rem')
  .$el('.docs-sidebar-section');

export const sidebarTitle = $
  .textSize('0.75rem')
  .weight('600')
  .textTransform('uppercase')
  .letterSpacing('0.05em')
  .c('#64748b')
  .mb('1rem')
  .$el('.docs-sidebar-title');

export const sidebarLink = $
  .display('block')
  .p('0.5rem 0.75rem')
  .c('#475569')
  .rounded('0.5rem')
  .transition('all 0.2s')
  .mb('0.25rem')
  .hover()
    .bg('#f1f5f9')
    .c('#667eea')
  .end()
  .$el('.docs-sidebar-link');

export const sidebarLinkActive = $
  .bg('#eef2ff')
  .c('#667eea')
  .weight('500')
  .$el('.docs-sidebar-link-active');

export const content = $
  .minW('0')
  .w('100%')
  .overflowX('hidden')
  .$el('.docs-content');

// ========== TYPOGRAPHY ==========
export const docsHeader = $
  .mb('1.5rem')
  .borderBottom('1px solid #e2e8f0')
  .pb('1rem')
  .tablet((css) => css.mb('2rem'))
  .$el('.docs-header');

export const docsTitle = $
  .textSize('2rem')
  .weight('700')
  .mb('0.5rem')
  .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  .backgroundClip('text')
  .c('transparent')
  .tablet((css) => css.textSize('2.5rem'))
  .$el('.docs-title');

export const docsDescription = $
  .textSize('1rem')
  .c('#64748b')
  .tablet((css) => css.textSize('1.125rem'))
  .$el('.docs-description');

// ========== PLAYGROUND STYLES ==========
export const playgroundContainer = $
  .maxW('80rem')
  .m('0 auto')
  .p('2rem 1rem')
  .tablet((css) => css.p('2rem 1.5rem'))
  .$el('.playground-container');

export const playgroundHeader = $
  .textAlign('center')
  .mb('2rem')
  .$el('.playground-header');

export const playgroundTitle = $
  .textSize('1.5rem')
  .weight('700')
  .mb('0.5rem')
  .tablet((css) => css.textSize('2rem'))
  .$el('.playground-title');

export const playgroundDescription = $
  .c('#64748b')
  .textSize('0.875rem')
  .tablet((css) => css.textSize('1rem'))
  .$el('.playground-description');

export const playgroundGrid = $
  .display('grid')
  .gridCols('1fr')
  .gap('1rem')
  .tablet((css) => css.gridCols('1fr 1fr').gap('1.5rem'))
  .$el('.playground-grid');

export const editorSection = $
  .rounded('1rem')
  .overflow('hidden')
  .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .$el('.editor-section');

export const previewSection = $
  .bg('#f8fafc')
  .rounded('1rem')
  .overflow('hidden')
  .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .$el('.preview-section');

export const previewArea = $
  .p('1rem')
  .minH('250px')
  .display('flex')
  .flexDir('column')
  .items('center')
  .justify('center')
  .gap('1.5rem')
  .bg('#f8fafc')
  .tablet((css) => css.p('2rem').minH('400px'))
  .$el('.preview-area');

export const sectionHeader = $
  .bg('#1e1e1e')
  .p('0.75rem 1rem')
  .c('#9ca3af')
  .textSize('0.875rem')
  .weight('500')
  .display('flex')
  .justify('space-between')
  .items('center')
  .borderBottom('1px solid #2d2d2d')
  .$el('.section-header');

export const templateBtn = $
  .p('0.5rem 1rem')
  .rounded('0.5rem')
  .borderStyle('none')
  .textSize('0.75rem')
  .weight('500')
  .cursor('pointer')
  .transition('all 0.2s')
  .bg('#f1f5f9')
  .c('#475569')
  .tablet((css) => css.p('0.5rem 1rem').textSize('0.875rem'))
  .hover()
    .bg('#e2e8f0')
  .end()
  .$el('.template-btn');

export const templateBtnActive = $
  .bg('#667eea')
  .c('white')
  .hover()
    .bg('#5a67d8')
  .end()
  .$el('.template-btn-active');

export const templateButtons = $
  .display('flex')
  .gap('0.5rem')
  .justify('center')
  .mb('1.5rem')
  .flexWrap('wrap')
  .tablet((css) => css.gap('1rem'))
  .$el('.template-buttons');

// ========== CODE ==========
export const codeblock = $
  .bg('#1e1e1e')
  .c('#d4d4d4')
  .p('1rem')
  .rounded('0.5rem')
  .overflowX('auto')
  .font('monospace')
  .textSize('0.75rem')
  .mb('1.5rem')
  .tablet((css) => css.textSize('0.875rem'))
  .$el('.code-block');

export const inlineCode = $
  .bg('#f1f5f9')
  .p('0.125rem 0.25rem')
  .rounded('0.25rem')
  .font('monospace')
  .textSize('0.75rem')
  .c('#e11d48')
  .tablet((css) => css.textSize('0.875rem'))
  .$el('.inline-code');

// ========== FEATURE GRID ==========
export const featureGrid = $
  .display('grid')
  .gridCols('1fr')
  .gap('1rem')
  .mb('2rem')
  .sm((css) => css.gridCols('repeat(auto-fill, minmax(280px, 1fr))'))
  .$el('.feature-grid');

export const featureCard = $
  .p('1rem')
  .bg('#f8fafc')
  .rounded('0.5rem')
  .border('1px solid #e2e8f0')
  .transition('all 0.2s')
  .hover()
    .transform('translateY(-2px)')
    .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .end()
  .$el('.feature-card');

// ========== CALL OUTS ==========
export const tip = $
  .bg('#e0f2fe')
  .borderLeft('4px solid #3b82f6')
  .p('1rem')
  .rounded('0.5rem')
  .mb('1.5rem')
  .$el('.tip');

export const note = $
  .bg('#fef9e3')
  .borderLeft('4px solid #f59e0b')
  .p('1rem')
  .rounded('0.5rem')
  .mb('1.5rem')
  .$el('.note');

export const warning = $
  .bg('#fee2e2')
  .borderLeft('4px solid #ef4444')
  .p('1rem')
  .rounded('0.5rem')
  .mb('1.5rem')
  .$el('.warning');

// ========== COMPARISON TABLE ==========
export const comparisonTableWrapper = $
  .m('2rem 0')
  .rounded('1rem')
  .border('1px solid #e2e8f0')
  .overflow('auto')
  .$el('.comparison-table-wrapper');

export const comparisonTable = $
  .w('100%')
  .borderCollapse('collapse')
  .minW('500px')
  .$el('.comparison-table');

export const comparisonTableThead = $
  .bg('#f8fafc')
  .borderBottom('2px solid #e2e8f0')
  .$el('thead');

export const comparisonTableTh = $
  .p('0.75rem 1rem')
  .textAlign('left')
  .weight('600')
  .c('#1e293b')
  .textSize('0.875rem')
  .textTransform('uppercase')
  .letterSpacing('0.05em')
  .tablet((css) => css.p('1rem 1.5rem').textSize('1rem'))
  .$el('th');

export const comparisonRow = $
  .transition('all 0.2s')
  .borderBottom('1px solid #f1f5f9')
  .hover()
    .bg('#faf9ff')
    .transform('translateX(2px)')
  .end()
  .$el('.comparison-row');

export const problemCell = $
  .p('0.75rem 1rem')
  .weight('500')
  .c('#1e293b')
  .textSize('0.875rem')
  .tablet((css) => css.p('1rem 1.5rem').textSize('1rem'))
  .$el('.problem-cell');

export const solutionCell = $
  .p('0.75rem 1rem')
  .c('#475569')
  .textSize('0.875rem')
  .lineHeight('1.5')
  .tablet((css) => css.p('1rem 1.5rem').textSize('1rem'))
  .$el('.solution-cell');

export const solutionBadge = $
  .display('inline-block')
  .bg('#667eea')
  .c('white')
  .p('0.25rem 0.5rem')
  .rounded('9999px')
  .textSize('0.65rem')
  .weight('500')
  .ml('0.5rem')
  .verticalAlign('middle')
  .tablet((css) => css.p('0.375rem 0.875rem').textSize('0.75rem').ml('1rem'))
  .$el('.solution-badge');

// ========== LISTS ==========
export const unorderedList = $
  .pl('1.25rem')
  .mb('1rem')
  .tablet((css) => css.pl('1.5rem'))
  .$el('ul');

export const listItem = $
  .mb('0.25rem')
  .$el('li');
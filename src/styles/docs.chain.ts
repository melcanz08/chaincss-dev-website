import { chain } from 'chaincss';

export const docsLayout = chain()
  .display('flex')
  .maxWidth(1300)
  .margin('0 auto')
  .padding('80px 24px 40px')
  .gap(48)
  .media('(max-width: 768px)', (c) => c
    .flexDirection('column')
    .padding('80px 16px 40px')
    .gap(24)
  )
  .$el('docs-layout');

export const sidebar = chain()
  .width(260)
  .flexShrink(0)
  .position('sticky')
  .top(88)
  .height('fit-content')
  .maxHeight('calc(100vh - 120px)')
  .overflow('auto')
  .paddingRight(16)
  .media('(max-width: 768px)', (c) => c
    .width('100%')
    .position('static')
    .maxHeight('none')
    .overflow('visible')
    .paddingRight(0)
    .paddingBottom(16)
    .borderBottom('1px solid rgba(255,255,255,0.06)')
    .marginBottom(16)
  )
  .$el('docs-sidebar');

export const sidebarTitle = chain()
  .fontSize(12)
  .fontWeight("600")
  .color('#52525b')
  .textTransform('uppercase')
  .letterSpacing('1px')
  .marginBottom(12)
  .$el('sidebar-title');

export const sidebarLink = chain()
  .display('block')
  .padding('8px 12px')
  .rounded(6)
  .fontSize(14)
  .color('#a1a1aa')
  .cursor('pointer')
  .transition('all 0.1s ease')
  .marginBottom(2)
  .textDecoration('none')
  .hover()
    .bg('rgba(255,255,255,0.04)')
    .color('#e4e4e7')
  .end()
  .$el('sidebar-link');

export const sidebarLinkActive = chain()
  .bg('rgba(99,102,241,0.12)')
  .color('#c7d2fe')
  .fontWeight("500")
  .$el('sidebar-link-active');

export const content = chain()
  .flexGrow(1)
  .minWidth(0)
  .maxWidth('calc(100% - 308px)')
  .media('(max-width: 768px)', (c) => c
    .maxWidth('100%')
  )
  .$el('docs-content');

export const contentTitle = chain()
  .fontSize(36)
  .fontWeight("700")
  .color('#f4f4f5')
  .marginBottom(8)
  .letterSpacing('-1px')
  .media('(max-width: 640px)', (c) => c
    .fontSize(28)
  )
  .$el('content-title');

export const contentDesc = chain()
  .fontSize(17)
  .color('#a1a1aa')
  .marginBottom(40)
  .lineHeight("1.7")
  .$el('content-desc');

export const sectionHeading = chain()
  .fontSize(22)
  .fontWeight("600")
  .color('#e4e4e7')
  .marginTop(48)
  .marginBottom(16)
  .paddingBottom(8)
  .borderBottom('1px solid rgba(255,255,255,0.06)')
  .media('(max-width: 640px)', (c) => c
    .fontSize(18)
    .marginTop(32)
  )
  .$el('section-heading');

export const paragraph = chain()
  .fontSize(15)
  .color('#c4c4cc')
  .lineHeight("1.8")
  .marginBottom(20)
  .$el('docs-paragraph');

export const codeBlock = chain()
  .bg('rgba(0,0,0,0.4)')
  .rounded(12)
  .padding('20px 24px')
  .overflow('auto')
  .fontFamily("'JetBrains Mono', 'Fira Code', monospace")
  .fontSize(14)
  .lineHeight("1.7")
  .marginBottom(24)
  .border('1px solid rgba(255,255,255,0.06)')
  .color('#e4e4e7')
  .whiteSpace('pre-wrap')
  .wordBreak('break-word')
  .media('(max-width: 640px)', (c) => c
    .fontSize(13)
    .padding('16px')
  )
  .$el('code-block');

export const inlineCode = chain()
  .bg('rgba(99,102,241,0.12)')
  .color('#c7d2fe')
  .padding('2px 8px')
  .rounded(4)
  .fontSize(13)
  .fontFamily("'JetBrains Mono', 'Fira Code', monospace")
  .whiteSpace('nowrap')
  .$el('inline-code');

export const note = chain()
  .bg('rgba(99,102,241,0.08)')
  .borderLeft('3px solid #6366f1')
  .padding('16px 20px')
  .rounded('0 8px 8px 0')
  .marginBottom(24)
  .fontSize(14)
  .color('#c7d2fe')
  .lineHeight("1.7")
  .$el('docs-note');

export const tableWrapper = chain()
  .overflow('auto')
  .marginBottom(24)
  .rounded(10)
  .border('1px solid rgba(255,255,255,0.06)')
  .$el('docs-table-wrap');

export const docTable = chain()
  .width('100%')
  .borderCollapse('collapse')
  .fontSize(14)
  .media('(max-width: 640px)', (c) => c
    .fontSize(12)
  )
  .$el('doc-table');

export const docTh = chain()
  .padding('12px 16px')
  .textAlign('left')
  .color('#a1a1aa')
  .fontWeight("600")
  .fontSize(13)
  .textTransform('uppercase')
  .letterSpacing('0.5px')
  .borderBottom('1px solid rgba(255,255,255,0.08)')
  .bg('rgba(255,255,255,0.02)')
  .media('(max-width: 640px)', (c) => c
    .padding('8px 10px')
    .fontSize(11)
  )
  .$el('doc-th');

export const docTd = chain()
  .padding('12px 16px')
  .color('#d4d4d8')
  .borderBottom('1px solid rgba(255,255,255,0.04)')
  .fontSize(14)
  .media('(max-width: 640px)', (c) => c
    .padding('8px 10px')
    .fontSize(12)
  )
  .$el('doc-td');

  export const auditTextarea = chain()
  .width('100%')
  .minHeight(300)
  .bg('rgba(0,0,0,0.4)')
  .rounded(12)
  .padding('20px 24px')
  .fontFamily("'JetBrains Mono', 'Fira Code', monospace")
  .fontSize(14)
  .lineHeight("1.7")
  .color('#e4e4e7')
  .border('1px solid rgba(255,255,255,0.06)')
  .outline('none')
  .resize('vertical')
  .focus()
    .borderColor('#6366f1')
  .end()
  .$el('audit-textarea');

export const auditBtn = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('14px 32px')
  .rounded(10)
  .fontSize(15)
  .fontWeight("600")
  .cursor('pointer')
  .border('none')
  .transition('all 0.15s ease')
  .hover()
    .bg('#4f46e5')
  .end()
  .$el('audit-btn');

export const auditResultCard = chain()
  .bg('rgba(0,0,0,0.3)')
  .rounded(12)
  .padding(24)
  .border('1px solid rgba(255,255,255,0.06)')
  .marginBottom(16)
  .$el('audit-result-card');

export const auditStatValue = chain()
  .fontSize(32)
  .fontWeight("700")
  .lineHeight("1")
  .$el('audit-stat-value');

export const auditStatLabel = chain()
  .fontSize(12)
  .color('#71717a')
  .textTransform('uppercase')
  .letterSpacing('0.5px')
  .marginTop(8)
  .$el('audit-stat-label');

export const auditIssueItem = chain()
  .padding('14px 18px')
  .rounded(8)
  .marginBottom(8)
  .borderLeft('3px solid')
  .bg('rgba(255,255,255,0.02)')
  .$el('audit-issue-item');

export const auditIssueMsg = chain()
  .fontSize(14)
  .fontWeight("500")
  .color('#e4e4e7')
  .marginBottom(4)
  .$el('audit-issue-msg');

export const auditIssueSuggestion = chain()
  .fontSize(13)
  .color('#71717a')
  .$el('audit-issue-suggestion');

export const auditGrid = chain()
  .display('grid')
  .gridTemplateColumns('repeat(4, 1fr)')
  .gap(16)
  .marginBottom(32)
  .media('(max-width: 640px)', (c) => c
    .gridTemplateColumns('repeat(2, 1fr)')
  )
  .$el('audit-grid');

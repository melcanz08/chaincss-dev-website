import { chain } from 'chaincss';

export const pgContainer = chain()
  .padding('100px 24px 60px')
  .maxWidth(1400)
  .margin('0 auto')
  .$el('pg-container');

export const pgHeader = chain()
  .textAlign('center')
  .marginBottom(48)
  .$el('pg-header');

export const pgTitle = chain()
  .fontSize(40)
  .fontWeight("700")
  .color('#ffffff')
  .marginBottom(12)
  .$el('pg-title');

export const pgDesc = chain()
  .fontSize(16)
  .color('#71717a')
  .$el('pg-desc');

export const pgGrid = chain()
  .display('grid')
  .gridTemplateColumns('1fr 1fr 1fr')
  .gap(24)
  .$el('pg-grid');

export const pgPanel = chain()
  .bg('rgba(0,0,0,0.3)')
  .border('1px solid rgba(255,255,255,0.06)')
  .rounded(16)
  .overflow('hidden')
  .display('flex')
  .flexDirection('column')
  .$el('pg-panel');

export const pgPanelHeader = chain()
  .display('flex')
  .alignItems('center')
  .justifyContent('space-between')
  .padding('14px 20px')
  .borderBottom('1px solid rgba(255,255,255,0.06)')
  .flexShrink(0)
  .$el('pg-panel-header');

export const pgPanelTitle = chain()
  .fontSize(13)
  .fontWeight("600")
  .color('#71717a')
  .textTransform('uppercase')
  .letterSpacing('0.5px')
  .$el('pg-panel-title');

export const pgEditor = chain()
  .padding(20)
  .minHeight(350)
  .fontFamily("'JetBrains Mono', monospace")
  .fontSize(14)
  .lineHeight("1.7")
  .color('#e4e4e7')
  .outline('none')
  .border('none')
  .bg('transparent')
  .width('100%')
  .resize('none')
  .$el('pg-editor');

export const pgOutput = chain()
  .padding(20)
  .minHeight(350)
  .fontFamily("'JetBrains Mono', monospace")
  .fontSize(14)
  .lineHeight("1.7")
  .color('#22c55e')
  .whiteSpace('pre-wrap')
  .overflow('auto')
  .flex(1)
  .$el('pg-output');

export const pgPreview = chain()
  .display("flex")
  .alignItems("center")
  .justifyContent("center")
  .minHeight(350)
  .border('none')
  .width('100%')
  .bg('transparent')
  .$el('pg-preview');

export const pgRunBtn = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('8px 18px')
  .rounded(8)
  .fontSize(13)
  .fontWeight("600")
  .cursor('pointer')
  .border('none')
  .transition('background 0.15s ease')
  .hover()
    .bg('#4f46e5')
  .end()
  .$el('pg-run-btn');

export const pgCopyBtn = chain()
  .bg('transparent')
  .color('#71717a')
  .padding('6px 12px')
  .rounded(6)
  .fontSize(12)
  .cursor('pointer')
  .border('1px solid rgba(255,255,255,0.1)')
  .transition('all 0.15s ease')
  .hover()
    .color('#e4e4e7')
    .borderColor('rgba(255,255,255,0.2)')
  .end()
  .$el('pg-copy-btn');

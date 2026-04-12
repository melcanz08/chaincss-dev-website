import { $ } from 'chaincss';

export const container = $
  .maxWidth('80rem')
  .margin('0 auto')
  .padding('2rem 1.5rem')
  .media('(max-width: 768px)', (css) => {
    return css.padding('1rem').$el();
  })
  .$el('.playground-container');

export const header = $
  .textAlign('center')
  .marginBottom('2rem')
  .$el('.playground-header');

export const title = $
  .fontSize('2rem')
  .fontWeight('700')
  .marginBottom('0.5rem')
  .media('(max-width: 768px)', (css) => {
    return css.fontSize('1.5rem').$el();
  })
  .$el('.playground-title');

export const description = $
  .color('#64748b')
  .fontSize('1rem')
  .media('(max-width: 768px)', (css) => {
    return css.fontSize('0.875rem').$el();
  })
  .$el('.playground-description');

export const templateButtons = $
  .display('flex')
  .gap('1rem')
  .justifyContent('center')
  .marginBottom('1.5rem')
  .flexWrap('wrap')
  .media('(max-width: 768px)', (css) => {
    return css.gap('0.5rem').$el();
  })
  .$el('.template-buttons');

export const templateBtn = $
  .padding('0.5rem 1rem')
  .borderRadius('0.5rem')
  .borderStyle('none')
  .fontSize('0.875rem')
  .fontWeight('500')
  .cursor('pointer')
  .transition('all 0.2s')
  .backgroundColor('#f1f5f9')
  .color('#475569')
  .hover()
    .backgroundColor('#e2e8f0')
  .end()
  .media('(max-width: 768px)', (css) => {
    return css.padding('0.4rem 0.8rem').fontSize('0.75rem').$el();
  })
  .$el('.template-btn');

export const activeTemplateBtn = $
  .backgroundColor('#667eea !important')
  .color('white !important')
  .hover()
    .backgroundColor('#5a67d8 !important')
  .end()
  .$el('.template-btn-active');

export const playgroundGrid = $
  .display('grid')
  .gridTemplateColumns('1fr 1fr')
  .gap('1.5rem')
  .width('100%')
  .media('(max-width: 768px)', (css) => {
    return css.gridTemplateColumns('1fr').gap('1rem').$el();
  })
  .$el('.playground-grid');

export const editorSection = $
  .borderRadius('1rem')
  .overflow('hidden')
  .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .$el('.editor-section');

export const sectionHeader = $
  .backgroundColor('#1e1e1e')
  .padding('0.75rem 1rem')
  .color('#9ca3af')
  .fontSize('0.875rem')
  .fontWeight('500')
  .display('flex')
  .justifyContent('space-between')
  .alignItems('center')
  .borderBottom('1px solid #2d2d2d')
  .$el('.section-header');

export const codeEditor = $
  .width('100%')
  .backgroundColor('#1e1e1e')
  .color('#d4d4d4')
  .fontFamily('monospace')
  .fontSize('14px')
  .lineHeight('1.5')
  .padding('1rem')
  .border('none')
  .outline('none')
  .resize('vertical')
  .minHeight('400px')
  .media('(max-width: 768px)', (css) => {
    return css.fontSize('12px').minHeight('300px').$el();
  })
  .$el('.code-editor');

export const previewSection = $
  .backgroundColor('#f8fafc')
  .borderRadius('1rem')
  .overflow('hidden')
  .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .$el('.preview-section');

export const previewArea = $
  .padding('2rem')
  .minHeight('400px')
  .display('flex')
  .flexDirection('column')
  .alignItems('center')
  .justifyContent('center')
  .gap('1.5rem')
  .backgroundColor('#f8fafc')
  .media('(max-width: 768px)', (css) => {
    return css.padding('1rem').minHeight('250px').$el();
  })
  .$el('.preview-area');

export const cssOutputSection = $
  .marginTop('1.5rem')
  .backgroundColor('#1e1e1e')
  .borderRadius('0.5rem')
  .overflow('hidden')
  .$el('.css-output');

export const cssContent = $
  .padding('1rem')
  .color('#d4d4d4')
  .fontFamily('monospace')
  .fontSize('12px')
  .overflow('auto')
  .maxHeight('200px')
  .media('(max-width: 768px)', (css) => {
    return css.fontSize('10px').maxHeight('150px').$el();
  })
  .$el('.css-content');

export const chaincssButton = $
  .display('inline-block')
  .cursor('pointer')
  .backgroundColor('#667eea')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .borderStyle('none')
  .fontSize('16px')
  .fontWeight('600')
  .transition('all 0.2s ease')
  .hover()
    .backgroundColor('#5a67d8')
    .transform('scale(1.05)')
  .end()
  .$el('.chaincss-button');

export const chaincssCard = $
  .display('block')
  .cursor('pointer')
  .backgroundColor('white')
  .borderRadius('12px')
  .padding('24px')
  .boxShadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .transition('all 0.3s ease')
  .hover()
    .boxShadow('0 20px 25px -5px rgba(0,0,0,0.15)')
    .transform('translateY(-4px)')
  .end()
  .$el('.chaincss-card');

export const chaincssGradient = $
  .display('inline-block')
  .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  .backgroundClip('text')
  .color('transparent')
  .fontSize('2rem')
  .fontWeight('800')
  .$el('.chaincss-gradient');

export const copyBtn = $
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
  .$el('.copy-btn');

export const codeInputDark = $
  .backgroundColor('#1e1e1e')
  .color('#d4d4d4')
  .fontFamily('monospace')
  .fontSize('14px')
  .padding('16px')
  .border('none')
  .outline('none')
  .width('100%')
  .minHeight('400px')
  .resize('vertical')
  .$el('.code-input-dark');
import { $ } from 'chaincss';

export const demoNav = $
  .bg('#1e293b')
  .p('16px')
  .rounded('8px')
  .$el('.demo-nav');

export const demoNavLink = $
  .c('white')
  .textDecoration('none')
  .p('8px 16px')
  .display('inline-block')
  .hover()
    .bg('#3b82f6')
    .rounded('4px')
  .end()
  .$el('.demo-nav a');

export const demoMenu = $
  .bg('#f8fafc')
  .border('1px solid #e2e8f0')
  .rounded('8px')
  .listStyle('none')
  .m('0')
  .p('0')
  .$el('.demo-menu');

export const demoMenuItem = $
  .p('12px 16px')
  .borderBottom('1px solid #e2e8f0')
  .hover()
    .bg('#f1f5f9')
  .end()
  .$el('.demo-menu > li');

export const demoMenuLink = $
  .c('#1e293b')
  .textDecoration('none')
  .$el('.demo-menu > li > a');

export const demoLabel = $
  .weight('600')
  .mb('4px')
  .display('block')
  .$el('.demo-label');

export const demoInput = $
  .border('1px solid #e2e8f0')
  .rounded('6px')
  .p('8px 12px')
  .mb('16px')
  .w('100%')
  .focus()
    .borderC('#3b82f6')
    .outline('none')
    .shadow('0 0 0 3px rgba(59,130,246,0.1)')
  .end()
  .$el('.demo-input');

export const demoTItle = $
  .textSize('24px')
  .weight('bold')
  .mb('16px')
  .$el('.demo-title');

export const demoParagraph = $
  .ml('20px')
  .c('#475569')
  .$el('.demo-paragraph');

export const demoCard = $
  .bg('white')
  .rounded('12px')
  .p('20px')
  .shadow('0 1px 3px rgba(0,0,0,0.1)')
  .hover()
    .transform('translateY(-4px)')
    .shadow('0 12px 24px -12px rgba(0,0,0,0.2)')
  .end()
  .$el('.demo-card');

export const demoCardTitle = $
  .textSize('18px')
  .weight('600')
  .mb('8px')
  .hover()
    .c('#3b82f6')
  .end()
  .$el('.demo-card-title');
import { $ } from 'chaincss';

export const demoBtn = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .border('none')
  .cursor('pointer')
  .textSize('14px')
  .weight('500')
  .hover()
    .bg('#2563eb')
  .end()
  .transition('all 0.2s')
  .$el('.demo-btn');

export const demoCard = $
  .bg('white')
  .rounded('12px')
  .p('20px')
  .shadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .border('1px solid #e2e8f0')
  .cursor('pointer')
  .hover()
    .transform('translateY(-4px)')
    .shadow('0 12px 24px -12px rgba(0,0,0,0.2)')
  .end()
  .transition('all 0.2s')
  .$el('.demo-card');

export const demoInput = $
  .border('1px solid #e2e8f0')
  .rounded('6px')
  .p('8px 12px')
  .outline('none')
  .focus()
    .borderC('#3b82f6')
    .shadow('0 0 0 3px rgba(59,130,246,0.1)')
  .end()
  .transition('all 0.2s')
  .$el('.demo-input');
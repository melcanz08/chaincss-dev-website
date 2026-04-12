import { $ } from 'chaincss';
export const hero = $
  .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  .color('white')
  .padding('8rem 1.5rem 6rem')
  .textAlign('center')
  .position('relative')
  .overflow('hidden')
  .$el('.hero');
  
export const container = $
  .maxWidth('80rem')
  .margin('0 auto')
  .padding('0 1.5rem')
  .position('relative')
  .zIndex('10')
  .$el('.hero-container');

export const title = $
  .fontSize('3.5rem')
  .fontWeight('800')
  .marginBottom('1rem')
  .letterSpacing('-0.02em')
  .$el('.hero-title');

export const subtitle = $
  .fontSize('1.25rem')
  .marginBottom('2rem')
  .opacity('0.9')
  .maxWidth('36rem')
  .margin('0 auto 2rem')
  .$el('.hero-subtitle');

export const buttonGroup = $
  .display('flex')
  .gap('1rem')
  .justifyContent('center')
  .flexWrap('wrap')
  .$el('.hero-button-group');

export const badge = $
  .backgroundColor('rgba(255,255,255,0.2)')
  .color('white')
  .padding('0.5rem 1rem')
  .borderRadius('9999px')
  .fontSize('0.875rem')
  .marginTop('2rem')
  .display('inline-block')
  .$el('.hero-badge');

export const primaryBtn = $
  .backgroundColor('white')
  .color('#667eea')
  .padding('0.875rem 2rem')
  .fontWeight('700')
  .borderRadius('9999px')
  .border('none')
  .boxShadow('0 10px 15px -3px rgba(0,0,0,0.1)')
  .hover()
    .backgroundColor('#f1f5f9')
    .scale(1.05)
    .translateY('-2px')
    .end()
  .transition('all 0.2s ease')
  .cursor('pointer')
  .$el('.primary-btn');

export const secondaryBtn = $
  .backgroundColor('transparent')
  .textDecoration('none')
  .color('white')
  .border('2px solid white')
  .padding('0.875rem 2rem')
  .fontWeight('600')
  .borderRadius('9999px')
  .hover()
    .backgroundColor('rgba(255,255,255,0.1)')
    .scale(1.05)
    .end()
  .transition('all 0.2s ease')
  .cursor('pointer')
  .$el('.secondary-btn');
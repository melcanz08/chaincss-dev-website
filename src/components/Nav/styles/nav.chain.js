import { $ } from 'chaincss';

export const nav = $
  .backgroundColor('rgba(255,255,255,0.95)')
  .backdropFilter('blur(12px)')
  .borderBottom('1px solid #e2e8f0')
  .position('sticky')
  .top('0')
  .zIndex('50')
  .$el('.nav');

export const navContainer = $
  .maxWidth('80rem')
  .margin('0 auto')
  .padding('1rem 1.5rem')
  .display('flex')
  .justifyContent('space-between')
  .alignItems('center')
  .flexWrap('wrap')
  .gap('1rem')
  .media('(max-width: 768px)', (css) => {
    return css.padding('0.75rem 1rem');
  })
  .$el('.nav-container');

export const logo = $
  .fontSize('1.5rem')
  .fontWeight('800')
  .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  .backgroundClip('text')
  .color('transparent')
  .cursor('pointer')
  .order('1')
  .$el('.logo');

export const showOnMobile = $
  .display('none')
  .order('2')
  .marginLeft('auto')      // Push to right
  .background('none')
  .border('none')
  .fontSize('1.5rem')
  .cursor('pointer')
  .color('#4a5568')
  .media('(max-width: 768px)', (css) => {
    return css.display('block').$el();
  })
  .$el('.show-on-mobile');

export const navLinks = $
  .display('flex')           // ← These are the base desktop styles
  .gap('2rem')               // ← These are missing from your CSS!
  .alignItems('center')      // ← These are missing!
  .flexWrap('wrap')          // ← These are missing!
  .order('3')                // ← These are missing!
  .marginLeft('auto')        // ← Add this to push to the right
  .media('(max-width: 768px)', (css) => {
    return css
      .display('none')
      .flexDirection('column')
      .width('100%')
      .order('3')
      .marginLeft('0')       // ← Reset margin on mobile
      .marginTop('1rem')
      .backgroundColor('white')
      .padding('1rem')
      .borderRadius('0.5rem')
      .boxShadow('0 4px 6px rgba(0,0,0,0.1)')
      .zIndex('1000')
      .$el();
  })
  .$el('.nav-links');

export const navLinksOpen = $
  .display('flex')
  .flexDirection('column')
  .width('100%')
  .order('3')
  .marginTop('1rem')
  .backgroundColor('white')
  .padding('1rem')
  .borderRadius('0.5rem')
  .boxShadow('0 4px 6px rgba(0,0,0,0.1)')
  .zIndex('1000')
  .$el('.nav-links-open');

export const link = $
  .color('#4a5568')
  .textDecoration('none')
  .fontWeight('500')
  .transition('color 0.2s')
  .cursor('pointer')
  .hover()
    .color('#667eea')
  .end()
  .$el('.nav-link');

export const activeLink = $
  .color('#667eea')
  .fontWeight('600')
  .$el('.nav-link-active');

export const hideOnMobile = $
  .display('flex')
  .media('(max-width: 768px)', (css) => {
    return css.display('none').$el();
  })
  .$el('.hide-on-mobile');
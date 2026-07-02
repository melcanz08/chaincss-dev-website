import { chain } from 'chaincss';

export const nav = chain()
  .position('fixed')
  .top(0)
  .left(0)
  .right(0)
  .zIndex("100")
  .bgc('rgba(10, 10, 15, 0.8)')
  .backdropFilter('blur(12px)')
  .borderBottom('1px solid rgba(255, 255, 255, 0.06)')
  .$el('nav');

export const navInner = chain()
  .maxWidth(1200)
  .margin('0 auto')
  .padding('0 24px')
  .display('flex')
  .alignItems('center')
  .justifyContent('space-between')
  .height(64)
  .media('(max-width: 640px)', (c) => c
    .padding('0 16px')
    .height(56)
  )
  .$el('nav-inner');

export const logo = chain()
  .fontSize(20)
  .fontWeight("700")
  .color('#ffffff')
  .letterSpacing('-0.5px')
  .cursor('pointer')
  .media('(max-width: 640px)', (c) => c
    .fontSize(17)
  )
  .$el('nav-logo');

export const logoAccent = chain()
  .color('#6366f1')
  .$el('nav-logo-accent');

export const navLinks = chain()
  .overflow("hidden")
  .display('flex')
  .gap(32)
  .alignItems('center')
  .media('(max-width: 640px)', (c) => c
    .gap(16)
  )
  .$el('nav-links');

export const navLink = chain()
  .fontSize(14)
  .fontWeight("500")
  .color('#a1a1aa')
  .cursor('pointer')
  .transition('color 0.15s ease')
  .hover()
    .color('#ffffff')
  .end()
  .media('(max-width: 640px)', (c) => c
    .fontSize(13)
  )
  .$el('nav-link');

export const navCta = chain()
  .bgc('#6366f1')
  .color('#ffffff')
  .padding('8px 20px')
  .rounded(8)
  .fontSize(14)
  .fontWeight("600")
  .cursor('pointer')
  .border('none')
  .transition('background 0.15s ease')
  .hover()
    .bg('#4f46e5')
  .end()
  .media('(max-width: 640px)', (c) => c
    .padding('6px 14px')
    .fontSize(12)
  )
  .$el('nav-cta');

import { chain } from 'chaincss';

export const nav = chain()
  .position('fixed')
  .top(0)
  .left(0)
  .right(0)
  .zIndex("100")
  .bg('rgba(10, 10, 15, 0.8)')
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
  .$el('nav-inner');

export const logo = chain()
  .fontSize(20)
  .fontWeight("700")
  .color('#ffffff')
  .letterSpacing('-0.5px')
  .cursor('pointer')
  .$el('nav-logo');

export const logoAccent = chain()
  .color('#6366f1')
  .$el('nav-logo-accent');

export const navLinks = chain()
  .display('flex')
  .gap(32)
  .alignItems('center')
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
  .$el('nav-link');

export const navCta = chain()
  .bg('#6366f1')
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
  .$el('nav-cta');

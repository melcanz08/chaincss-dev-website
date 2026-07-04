import { chain } from 'chaincss';

export const heroSection = chain()
  .padding('140px 24px 100px')
  .textAlign('center')
  .maxWidth(900)
  .margin('0 auto')
  .media('(max-width: 640px)', (c) => c
    .padding('100px 16px 60px')
  )
  .$el('hero');

export const heroBadge = chain()
  .display('inline-flex')
  .alignItems('center')
  .gap(8)
  .bg('rgba(99, 102, 241, 0.1)')
  .color('#a5b4fc')
  .padding('6px 16px')
  .rounded(9999)
  .fontSize(13)
  .fontWeight("500")
  .marginBottom(32)
  .media('(max-width: 640px)', (c) => c
    .fontSize(12)
    .padding('4px 12px')
    .marginBottom(24)
  )
  .$el('hero-badge');

export const heroTitle = chain()
  .fontSize(60)
  .fontWeight("800")
  .color('#f4f4f5')
  .lineHeight("1.1")
  .letterSpacing('-2px')
  .marginBottom(24)
  .media('(max-width: 640px)', (c) => c
    .fontSize(36)
    .letterSpacing('-1px')
    .marginBottom(16)
  )
  .$el('hero-title');

export const heroGradient = chain()
  .background('linear-gradient(135deg, #818cf8, #a78bfa, #f472b6)')
  .backgroundClip('text')
  .textFillColor('transparent')
  .$el('hero-gradient');

export const heroSubtitle = chain()
  .fontSize(18)
  .color('#a1a1aa')
  .lineHeight("1.7")
  .maxWidth(650)
  .margin('0 auto 48px')
  .media('(max-width: 640px)', (c) => c
    .fontSize(15)
    .margin('0 auto 32px')
    .padding('0 8px')
  )
  .$el('hero-subtitle');

export const heroCtaGroup = chain()
  .display('flex')
  .gap(16)
  .justifyContent('center')
  .media('(max-width: 640px)', (c) => c
    .flexDirection('column')
    .alignItems('center')
    .gap(12)
  )
  .$el('hero-cta-group');

export const heroPrimaryBtn = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('14px 32px')
  .rounded(12)
  .fontSize(16)
  .fontWeight("600")
  .cursor('pointer')
  .border('none')
  .transition('all 0.2s ease')
  .hover()
    .bg('#4f46e5')
    .transform('translateY(-1px)')
    .shadow('0 4px 20px rgba(99, 102, 241, 0.3)')
  .end()
  .media('(max-width: 640px)', (c) => c
    .width('100%')
    .maxWidth(300)
    .padding('14px 24px')
    .fontSize(15)
  )
  .$el('hero-primary-btn');

export const heroSecondaryBtn = chain()
  .bg('rgba(255, 255, 255, 0.04)')
  .color('#d4d4d8')
  .padding('14px 32px')
  .rounded(12)
  .fontSize(16)
  .fontWeight("500")
  .cursor('pointer')
  .border('1px solid rgba(255, 255, 255, 0.1)')
  .transition('all 0.2s ease')
  .hover()
    .bg('rgba(255, 255, 255, 0.08)')
    .borderColor('rgba(255, 255, 255, 0.2)')
  .end()
  .media('(max-width: 640px)', (c) => c
    .width('100%')
    .maxWidth(300)
    .padding('14px 24px')
    .fontSize(15)
  )
  .$el('hero-secondary-btn');

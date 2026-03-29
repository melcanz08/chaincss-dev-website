// ========== PARADIGM SECTION ==========
const paradigmSection = $()
  .padding('80px 0')
  .backgroundColor('#f8fafc')
  .block('.paradigm-section');

const paradigmContainer = $()
  .maxWidth('1200px')
  .margin('0 auto')
  .padding('0 20px')
  .block('.paradigm-section .container');

const sectionTitle = $()
  .fontSize('36px')
  .fontWeight('700')
  .textAlign('center')
  .marginBottom('16px')
  .block('.section-title');

const sectionSubtitle = $()
  .fontSize('18px')
  .textAlign('center')
  .color('#64748b')
  .marginBottom('48px')
  .maxWidth('600px')
  .margin('0 auto 48px')
  .block('.section-subtitle');

const paradigmGrid = $()
  .display('grid')
  .gridTemplateColumns('repeat(auto-fill, minmax(320px, 1fr))')
  .gap('32px')
  .marginTop('48px')
  .block('.paradigm-grid');

const paradigmCard = $()
  .backgroundColor('white')
  .borderRadius('16px')
  .padding('24px')
  .border('1px solid #e2e8f0')
  .transition('all 0.2s')
  .hover()
    .transform('translateY(-4px)')
    .boxShadow('0 12px 24px -12px rgba(0,0,0,0.1)')
    .end()
  .block('.paradigm-card');

const cardComparison = $()
  .fontSize('14px')
  .marginBottom('12px')
  .color('#64748b')
  .block('.card-comparison');

const before = $()
  .color('#ef4444')
  .fontWeight('500')
  .block('.before');

const cardResult = $()
  .fontSize('14px')
  .color('#10b981')
  .marginTop('12px')
  .paddingTop('12px')
  .borderTop('1px solid #e2e8f0')
  .block('.card-result');

const paradigmQuote = $()
  .marginTop('48px')
  .padding('32px')
  .backgroundColor('#eef2ff')
  .borderRadius('16px')
  .textAlign('center')
  .block('.paradigm-quote');

const quote = $()
  .fontSize('20px')
  .fontWeight('500')
  .color('#1e293b')
  .fontStyle('italic')
  .lineHeight('1.5')
  .block('blockquote');

module.exports = { 
  paradigmSection,
  paradigmContainer,
  sectionTitle,
  sectionSubtitle,
  paradigmGrid,
  paradigmCard,
  cardComparison,
  before,
  cardResult,
  paradigmQuote,
  quote
 };
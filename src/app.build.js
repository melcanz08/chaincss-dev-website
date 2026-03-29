// ========== MODE SECTION ==========
const modeSection = $()
  .padding('4rem 1.5rem')
  .textAlign('center')
  .backgroundColor('#ffffff')
  .borderTop('1px solid #e2e8f0')
  .block('.mode-section');

const modeContainer = $()
  .maxWidth('800px')
  .margin('0 auto')
  .block('.mode-container');

const modeTitle = $()
  .fontSize('2rem')
  .fontWeight('700')
  .marginBottom('1rem')
  .block('.mode-title');

const modeTitleSpan = $()
  .color('#667eea')
  .block('.mode-title span');

const modeDescription = $()
  .fontSize('1.125rem')
  .color('#64748b')
  .marginBottom('2rem')
  .lineHeight('1.5')
  .block('.mode-description');

module.exports = { 
  modeSection,
  modeContainer,
  modeTitle,
  modeTitleSpan,
  modeDescription 
};
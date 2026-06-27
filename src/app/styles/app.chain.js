import { chain } from 'chaincss';

export const modeSection = chain()
  .padding('4rem 1.5rem')
  .textAlign('center')
  .backgroundColor('#ffffff')
  .borderTop('1px solid #e2e8f0')
  .$el('.mode-section');

export const modeContainer = chain()
  .maxWidth('900px')
  .margin('0 auto')
  .$el('.mode-container');

export const modeTitle = chain()
  .fontSize('2rem')
  .fontWeight('700')
  .marginBottom('1rem')
  .$el('.mode-title');

export const modeTitleSpan = chain()
  .color('#667eea')
  .$el('.mode-title span');

export const modeDescription = chain()
  .fontSize('1.125rem')
  .color('#64748b')
  .marginBottom('3rem')
  .lineHeight('1.6')
  .maxWidth('650px')
  .margin('0 auto 3rem')
  .$el('.mode-description');

export const featureGrid = chain()
  .display('grid')
  .gridTemplateColumns('repeat(auto-fit, minmax(280px, 1fr))')
  .gap('1.5rem')
  .maxWidth('900px')
  .margin('0 auto')
  .$el('.mode-feature-grid');

export const featureCard = chain()
  .backgroundColor('#f8fafc')
  .border('1px solid #e2e8f0')
  .borderRadius('1rem')
  .padding('1.5rem')
  .textAlign('left')
  .$el('.mode-feature-card');

export const featureIcon = chain()
  .fontSize('2rem')
  .marginBottom('0.75rem')
  .$el('.mode-feature-icon');

export const featureTitle = chain()
  .fontSize('1.125rem')
  .fontWeight('700')
  .marginBottom('0.5rem')
  .color('#1e293b')
  .$el('.mode-feature-title');

export const featureText = chain()
  .fontSize('0.875rem')
  .color('#64748b')
  .lineHeight('1.6')
  .$el('.mode-feature-text');

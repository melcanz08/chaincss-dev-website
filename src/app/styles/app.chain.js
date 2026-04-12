// ========== MODE SECTION ==========
import { $ } from 'chaincss';
export const modeSection = $
  .padding('4rem 1.5rem')
  .textAlign('center')
  .backgroundColor('#ffffff')
  .borderTop('1px solid #e2e8f0')
  .$el('.mode-section');

export const modeContainer = $
  .maxWidth('800px')
  .margin('0 auto')
  .$el('.mode-container');

export const modeTitle = $
  .fontSize('2rem')
  .fontWeight('700')
  .marginBottom('1rem')
  .$el('.mode-title');

export const modeTitleSpan = $
  .color('#667eea')
  .$el('.mode-title span');

export const modeDescription = $
  .fontSize('1.125rem')
  .color('#64748b')
  .marginBottom('2rem')
  .lineHeight('1.5')
  .$el('.mode-description');
// src/components/Stats/stats.chain.js
import { $ } from 'chaincss';

export const statsContainer = $
  .display('flex')
  .gap('1.5rem')
  .justifyContent('center')
  .padding('1rem')
  .borderTop('1px solid #e2e8f0')
  .backgroundColor('#f8fafc')
  .$el('.stats-container');

export const statsStat = $
  .fontSize('0.875rem')
  .color('#64748b')
  .$el('.stats-stat');
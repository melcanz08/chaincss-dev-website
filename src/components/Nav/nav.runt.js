import { $ } from 'chaincss';
export const _link = $()
      .color('#1e293b')
      .fontWeight('500')
      .hover()
        .color('#667eea')
      .end()
      .transition('color 0.2s')
      .cursor('pointer')
      .textDecoration('none')
      .block();

export const _activeLink = $()
      .color('#667eea')
      .fontWeight('600')
      .block();

export const _modeButton = $()
      .padding('0.5rem 1rem')
      .borderRadius('0.5rem')
      .fontSize('0.875rem')
      .fontWeight('500')
      .transition('all 0.2s')
      .cursor('pointer')
      .border('none')
      .fontFamily('inherit')
      .block();

export const _activeMode = $()
      .backgroundColor('#667eea')
      .color('white')
      .hover()
        .backgroundColor('#5a67d8')
      .end()
      .block();

export const _inactiveMode = $()
      .backgroundColor('#f1f5f9')
      .color('#475569')
      .hover()
        .backgroundColor('#e2e8f0')
      .end()
      .block();
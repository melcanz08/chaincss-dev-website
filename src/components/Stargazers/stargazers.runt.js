import {$} from 'chaincss';
export const _container = $()
  .display('flex')
  .flexDirection('column')
  .alignItems('center')
  .padding('2rem 1.5rem')
  .backgroundColor('#f8fafc')
  .borderTop('1px solid #e2e8f0')
  .block();

export const _title = $()
  .fontSize('1rem')
  .fontWeight('600')
  .color('#1e293b')
  .marginBottom('1rem')
  .block();

export const _avatarContainer = $()
  .display('flex')
  .gap('0.75rem')
  .flexWrap('wrap')
  .justifyContent('center')
  .block();

export const _avatar = $() 
  .width('40px')
  .height('40px')
  .borderRadius('50%')
  .transition('all 0.2s')
  .hover()
    .transform('scale(1.1)')
    .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .end()
  .block();

export const _link = $()
  .textDecoration('none')
  .block();

export const _loadingText = $()
  .fontSize('0.875rem')
  .color('#64748b')
  .block();

export const _errorText = $()
  .fontSize('0.875rem')
  .color('#dc2626')
  .block();
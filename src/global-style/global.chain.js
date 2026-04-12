import { $ } from 'chaincss';

// Global reset
export const reset = $.margin('0').padding('0').boxSizing('border-box').$el('*');

// Body styles
export const body = $.fontFamily("system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif").backgroundColor('#f8fafc').color('#1e293b').lineHeight('1.5').$el('body');

// Root styles
export const root = $.minHeight('100vh').$el('#root');

// List styles
export const list = $.paddingLeft('1.5rem').marginBottom('1rem').$el('ul');

export const listItem = $.marginBottom('0.25rem').lineHeight('1.5').$el('li');


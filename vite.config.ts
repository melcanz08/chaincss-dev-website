import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Prevent Vite from pre-bundling ChainCSS's React entry during dev
    // This lets it resolve imports at runtime like a normal ESM module
    exclude: ['@melcanz85/chaincss'],
  },
})

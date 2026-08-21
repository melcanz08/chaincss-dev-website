import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chaincss from 'chaincss/vite'

export default defineConfig({
  plugins: [
    chaincss({
      verbose: true,
      minify: true,
      atomic: false,
      cssOutput: 'assets/chaincss.css',
    }),
    react(),
  ],
  optimizeDeps: {
    exclude: ['vue']
  }
})
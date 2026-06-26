import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chaincss from 'chaincss/plugin/vite'

export default defineConfig({
  plugins: [
    react(),
    chaincss({
      verbose: true,
      minify: true,
    })
  ],
  optimizeDeps: {
    exclude: ['vue']
  }
})

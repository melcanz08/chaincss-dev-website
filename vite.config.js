import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chaincss from 'chaincss/vite'

export default defineConfig({
  plugins: [
    chaincss({
      verbose: true,
      minify: true,
    }),
    react(),
    // Force recompile .chain.ts files on change
    {
      name: 'chaincss-force-recompile',
      configureServer(server) {
        server.watcher.on('change', async (file) => {
          if (file.endsWith('.chain.ts')) {
            // Touch the file's .class.js to trigger Vite's native HMR
            const classFile = file.replace('.chain.ts', '.class.js')
            const cssFile = file.replace('.chain.ts', '.css')
            const { writeFileSync, readFileSync } = await import('fs')
            try {
              // Force the chaincss plugin to recompile by touching the source
              const content = readFileSync(file, 'utf8')
              writeFileSync(file, content) // re-write to trigger watcher
            } catch (e) {
              console.warn('[chaincss] Failed to trigger recompile:', e)
            }
          }
        })
      }
    }
  ],
  optimizeDeps: {
    exclude: ['vue', 'chaincss']
  },
  ssr: {
    noExternal: ['chaincss']
  }
})
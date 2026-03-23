import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'chaincss-ignore',
      enforce: 'pre',
      transform(code, id) {
        // Skip processing .jcss files - they should be handled by ChainCSS CLI
        if (id.endsWith('.jcss')) {
          return {
            code: 'export default {};',
            map: null
          };
        }
        return null;
      }
    }
  ],
  optimizeDeps: {
    // Exclude ChainCSS from optimization - let React handle the JSX
    exclude: ['@melcanz85/chaincss'],
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
})
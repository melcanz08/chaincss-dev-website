import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chaincssv2', 'caniuse-db']
  },
  ssr: {
    noExternal: ['chaincssv2']
  },
  build: {
    rollupOptions: {
      external: ['chaincssv2', 'caniuse-db']
    }
  },
  server: {
    watch: {
      ignored: ['**/*.chain.js']  // Ignore .chain.js files
    }
  }
});
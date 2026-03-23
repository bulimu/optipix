import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html',
      template: 'treemap',
    }),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // IMPORTANT: check more-specific strings BEFORE less-specific ones.
          // e.g. 'lucide-react/dist/...' contains 'react/' as a substring,
          // so lucide-react MUST be checked before react-dom / react/.
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('react-router')) return 'router-vendor';
          if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor';
          if (id.includes('fflate')) return 'compress-vendor';
          // upng-js + pako: dynamically imported, but explicitly named so they don't
          // pollute the general vendor chunk. Loaded on demand (PNG quality < 1.0 only).
          if (id.includes('upng-js') || id.includes('/pako/') || id.includes('\\pako\\'))
            return 'png-vendor';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n-vendor';
          return 'vendor';
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
  },
});

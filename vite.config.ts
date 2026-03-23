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
          // Dynamically loaded heavy dependencies are split out
          if (id.includes('fflate')) return 'compress-vendor';
          if (id.includes('upng-js') || id.includes('/pako/') || id.includes('\\pako\\'))
            return 'png-vendor';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n-vendor';

          // Everything else (React, Lucide, Router) stays in default vendor chunk
          // to prevent circular dependency / undefined exports errors like the 'Activity' bug.
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

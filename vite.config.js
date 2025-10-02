import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5000,
    allowedHosts: [
      'ebf9225c-b964-4c21-952c-998fe5c2d896-00-2slx3zbg7kzyn.picard.replit.dev',
      // you can add other allowed hosts here if needed
    ],
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000', // using 0.0.0.0 for compatibility
        changeOrigin: true,
      },
    },
  },
  build: {
    emptyOutDir: true,
  },
});
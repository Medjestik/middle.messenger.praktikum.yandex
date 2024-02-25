import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: { index: '/index.html' },
    },
  },
});

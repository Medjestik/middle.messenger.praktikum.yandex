import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: { index: '/index.html' },
    },
  },
  plugins: [
    handlebars({}),
  ],
});

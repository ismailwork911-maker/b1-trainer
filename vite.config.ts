import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Change to your GitHub Pages repo name, e.g. '/my-repo/'
  base: '/b1-trainer/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: "./",
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        car: resolve(__dirname, 'index-car.html'),
        buildings: resolve(__dirname, 'index-buildings.html'),
        graph: resolve(__dirname, 'index-graph.html')
      }
    }
  }
});

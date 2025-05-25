import { defineConfig } from 'vite';

export default defineConfig({
  base: "/selfDrivingCar/",
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true
  },
});

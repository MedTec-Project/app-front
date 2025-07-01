import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const apiUrl = process.env.VITE_API_URL || 'http://localhost:9001';
const wsUrl = process.env.VITE_WS_URL || 'ws://localhost:9001';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/ws': {
        target: wsUrl,
        changeOrigin: true,
        ws: true
      },
      '/api': {
        target: apiUrl,
        changeOrigin: true,
      }
    }
  }
})

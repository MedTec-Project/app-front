import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // permite acesso externo (fora do container)
    port: 5173,       // porta padrão do Vite
  }
})

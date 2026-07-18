import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Netlify 部署，base 用根路径
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
})

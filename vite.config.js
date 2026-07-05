import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署：base 设为仓库名，根路径用 '/'
  base: '/qiuzhi-xiaodui/',
  server: {
    port: 3000,
  },
})
